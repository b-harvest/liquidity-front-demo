import Axios from 'axios';
const { SigningCosmosClient, coins, coin } = require("cosmjs-amm/launchpad");

export const getPoolList = async () => {
    try {
        const response = await Axios.get('https://dev.bharvest.io/rest/liquidity/pools')
        const poolListData = response.data.pools
        console.log('getPoolList', poolListData)
        return poolListData
    } catch (error) {
        console.error("getPoolList", error)
    }
}

export const getWalletTokenList = async () => {
    try {
        const response = await Axios.get(`https://dev.bharvest.io/rest/bank/balances/${localStorage.getItem('walletAddress')}`)
        const walletTokenList = response.data.result
        console.log('getWalletTokenList', walletTokenList)
        return walletTokenList
    } catch (error) {
        console.error("getWalletTokenList", error)
    }
}

export const txGenerator = async (type, msgData, feeData) => {
    // set config
    const chainId = "amm";
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
    const msg = getMsg(type, msgData)
    const fee = getFee(feeData)


    console.log("msg : ", msg);
    // const result2 = await cosmJS.signAndBroadcast([msg], fee)
    cosmJS.signAndBroadcast([msg], fee)
        .then((res) => {
            alert('Success')
            console.log(res)
        })
        .catch((e => {
            alert("ERROR: check console!")
            console.log(e)
        })
        )

    // helpers
    function getMsg(type, msgData) {
        switch (type) {
            case "MsgCreateLiquidityPool":
                return {
                    type: "liquidity/MsgCreateLiquidityPool",
                    value: {
                        pool_creator_address: accounts[0].address,
                        pool_type_index: msgData.pool_type_index,
                        reserve_coin_denoms: msgData.reserve_coin_denoms,
                        deposit_coins: [coin(msgData.deposit_coins.amounts[0], msgData.deposit_coins.denoms[0]), coin(msgData.deposit_coins.amounts[1], msgData.deposit_coins.denoms[1])]
                    },
                };
            default:
                console.log('getMsg Error')
                return
        }
    }

    function getFee(feeData) {
        return {
            amount: coins(feeData.amount, feeData.denom),
            gas: feeData.gas,
        };
    }
}