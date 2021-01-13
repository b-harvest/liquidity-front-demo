import Axios from "axios";
const { SigningCosmosClient, coins, coin } = require("cosmjs-amm/launchpad");

export const getPoolList = async () => {
	try {
		const response = await Axios.get(
			"https://dev.bharvest.io/rest/liquidity/pools"
		);
		const poolListData = response.data.pools;
		console.log("getPoolList", poolListData);
		return poolListData;
	} catch (error) {
		console.error("getPoolList", error);
	}
};

export const getWalletTokenList = async () => {
	try {
		const response = await Axios.get(
			`https://dev.bharvest.io/rest/bank/balances/${localStorage.getItem(
				"walletAddress"
			)}`
		);
		const walletTokenList = response.data.result;
		console.log("getWalletTokenList", walletTokenList);
		return walletTokenList;
	} catch (error) {
		console.error("getWalletTokenList", error);
	}
};

export const txGenerator = async (
	type,
	msgData,
	feeData = {
		denom: "uatom",
		amount: 2000,
		gas: "180000"
	}
) => {
	//check wallet connection
	if (!localStorage.walletAddress) {
		return Promise.reject(
			"Please connect your wallet with Keplr extension in order to continue"
		);
	}

	// set config
	const chainId = "swap-testnet-2001";
	await window.keplr.enable(chainId);
	const offlineSigner = window.getOfflineSigner(chainId);
	const accounts = await offlineSigner.getAccounts();

	// Initialize the gaia api with the offline signer that is injected by Keplr extension.
	const cosmJS = new SigningCosmosClient(
		"https://dev.bharvest.io/rest/",
		accounts[0].address,
		offlineSigner
	);

	// getMsg, getFee(custom functions, see below)
	const msg = getMsg(type, msgData);
	const fee = getFee(feeData);

	console.log("msg : ", msg);
	console.log("fee : ", fee);

	// signAndBroadcast
	try {
		const response = await cosmJS.signAndBroadcast([msg], fee);
		console.log(response);
		if (response.code) {
			// fail
			return Promise.reject(getErrorMsg(response.code));
		} else {
			// success
			return response;
		}
	} catch (error) {
		console.error(type, error);
		return error;
	}

	// helpers
	function getMsg(type, msgData) {
		switch (type) {
			case "MsgCreateLiquidityPool":
				return {
					type: "liquidity/MsgCreateLiquidityPool",
					value: {
						pool_creator_address: accounts[0].address,
						pool_type_index: msgData.pool_type_index,
						//reserve_coin_denoms: msgData.reserve_coin_denoms,
						deposit_coins: [
							coin(
								msgData.deposit_coins.amounts[0],
								msgData.deposit_coins.denoms[0]
							),
							coin(
								msgData.deposit_coins.amounts[1],
								msgData.deposit_coins.denoms[1]
							)
						]
					}
				};
			case "MsgDepositToLiquidityPool":
				return {
					type: "liquidity/MsgDepositToLiquidityPool",
					value: {
						depositor_address: accounts[0].address,
						pool_id: String(msgData.pool_id),
						deposit_coins: [
							coin(
								msgData.deposit_coins.amounts[0],
								msgData.deposit_coins.denoms[0]
							),
							coin(
								msgData.deposit_coins.amounts[1],
								msgData.deposit_coins.denoms[1]
							)
						]
					}
				};
			case "MsgSwap":
				return {
					type: "liquidity/MsgSwap",
					value: {
						swap_requester_address: accounts[0].address,
						pool_id: String(msgData.poolId),
						//pool_type_index: msgData.poolTypeIndex,
						swap_type: msgData.swapType,
						offer_coin: msgData.offerCoin,
						demand_coin_denom: msgData.demandCoinDenom,
						order_price: String(msgData.orderPrice)
					}
				};
			case "MsgWithdrawFromLiquidityPool":
				return {
					type: "liquidity/MsgWithdrawFromLiquidityPool",
					value: {
						withdrawer_address: accounts[0].address,
						pool_id: msgData.poolId,
						pool_coin: msgData.poolCoin
					}
				};
			default:
				console.log("getMsg Error");
				return;
		}
	}

	function getFee(feeData) {
		return {
			amount: coins(feeData.amount, feeData.denom),
			gas: feeData.gas
		};
	}

	function getErrorMsg(codeNum) {
		const errors = {
			1: "ErrPoolNotExists : pool not exists",
			2: "ErrPoolTypeNotExists : pool type not exists",
			3: "ErrEqualDenom : reserve coin denomination are equal",
			4: "ErrInvalidDenom : invalid denom",
			5: "ErrNumOfReserveCoin : invalid number of reserve coin",
			6: "ErrNumOfPoolCoin : invalid number of pool coin",
			7: "ErrInsufficientPool : insufficient pool",
			8: "ErrInsufficientBalance : insufficient coin balance to escrow",
			9: "ErrLessThanMinInitDeposit : deposit coin less than MinInitDepositToPool",
			10: "ErrNotImplementedYet : not implemented yet",
			11: "ErrPoolAlreadyExists : the pool already exists",
			12: "ErrPoolBatchNotExists : pool batch not exists",
			13: "ErrOrderBookInvalidity : orderbook is not validity",
			14: "ErrBatchNotExecuted : the liquidity pool batch is not executed",
			15: "ErrEmptyPoolCreatorAddr : empty pool creator address",
			16: "ErrEmptyDepositorAddr : empty pool depositor address",
			17: "ErrEmptyWithdrawerAddr : empty pool withdrawer address",
			18: "ErrEmptySwapRequesterAddr : empty pool swap requester address",
			19: "ErrBadPoolCoinAmount : invalid pool coin amount",
			20: "ErrBadDepositCoinsAmount : invalid pool coin amount",
			21: "ErrBadOfferCoinAmount : invalid offer coin amount",
			22: "ErrBadOrderingReserveCoin : reserve coin denoms not ordered alphabetical",
			23: "ErrBadOderPrice : invalid order price",
			24: "ErrNumOfReserveCoinDenoms : invalid reserve coin denoms",
			25: "ErrEmptyReserveAccountAddres : empty reserve account address",
			26: "ErrEmptyPoolCoinDenom : empty pool coin denom",
			27: "ErrBadOrderingReserveCoinDen : bad ordering reserve coin denoms",
			28: "ErrBadReserveAccountAddress : bad reserve account address",
			29: "ErrBadPoolCoinDenom : bad pool coin denom",
			30: "ErrInsufficientPoolCreationF : insufficient balances for pool creation fee",
			31: "ErrExceededMaxOrderable : can not exceed max order ratio  of reserve coins that can be ordered at a order",
			32: "ErrBadBatchMsgIndex : bad msg index of the batch",
			33: "ErrSwapTypeNotExists : swap type not exists",
			34: "ErrLessThanMinOfferAmount : offer amount should over 1000 micro",
			35: "ErrNotMatchedReserveCoin : does not match the reserve coin of the pool"
		};
		return `${errors[codeNum]} (code${codeNum})`;
	}
};
