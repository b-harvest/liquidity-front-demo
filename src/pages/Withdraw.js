import { Component } from "react";
import {
	Wrapper,
	SectionHead,
	Detail,
	DepositCard
} from "../design/pages/Withdraw";

import { getMyTokenBalance } from "../common/global-functions";
import { txGenerator } from "../common/cosmos-amm";

import TokenSetter from "../elements/TokenSetter";
import BasicButtonCard from "../elements/BasicButtonCard";

class Withdraw extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenA: "",
			tokenAAmount: "",
			tokenAPoolAmount: "",
			poolTokenData: null,
			poolTokenDataIndexer: null,
			isLoading: false,
			isExceeded: false
		};
	}

	componentDidMount() {
		if (localStorage.walletAddress) {
			this.setPoolToken();
		} else {
			alert("Please connect the wallet");
			window.location = "/";
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data.walletTokenList !== this.props.data.walletTokenList) {
			this.setPoolToken();
		}
	}

	setPoolToken = () => {
		try {
			const poolTokenData = getPoolToken(
				this.props.data.poolsData,
				this.props.data.walletTokenList
			);
			let poolTokenDataIndexer = {};
			console.log("poolTokenData", poolTokenData);
			poolTokenData.forEach((ele, index) => {
				poolTokenDataIndexer[ele.coinMinimalDenom] = index;
			});
			console.log("poolTokenDataIndex", poolTokenDataIndexer);
			this.setState({
				poolTokenData: poolTokenData,
				poolTokenDataIndexer: poolTokenDataIndexer,
				tokenA: this.state.tokenA ? this.state.tokenA : poolTokenData[0].coinMinimalDenom
			});
		} catch (error) {
			console.error(error);
		}

		//helper
		function getPoolToken(pl, wt) {
			let myPoolTokens = {};
			wt.forEach((ele) => {
				if (ele.denom.length > 10) {
					myPoolTokens[ele.denom] = ele.amount;
				}
			});
			return pl.map((ele) => {
				let myTokenAmount = 0;
				if (myPoolTokens[ele.liquidity_pool.pool_coin_denom]) {
					myTokenAmount = myPoolTokens[ele.liquidity_pool.pool_coin_denom];
				}
				return {
					coinDenom: `${ele.liquidity_pool.reserve_coin_denoms[0]
						.substr(1)
						.toUpperCase()}-${ele.liquidity_pool.reserve_coin_denoms[1]
							.substr(1)
							.toUpperCase()}`,
					tokenDenom: [
						ele.liquidity_pool.reserve_coin_denoms[0],
						ele.liquidity_pool.reserve_coin_denoms[1]
					],
					poolTokenAmount:
						ele.liquidity_pool_metadata.pool_coin_total_supply.amount,
					coinMinimalDenom: ele.liquidity_pool.pool_coin_denom,
					reserveCoins: ele.liquidity_pool_metadata.reserve_coins,
					myTokenAmount: myTokenAmount,
					poolId: ele.liquidity_pool.pool_id
				};
			});
		}
	};

	// 로직 함수 시작
	createPool = async () => {
		console.log(`X : ${this.state.tokenA} ${this.state.tokenAAmount}`);

		const tokenA = this.state.tokenA;
		const amountA = Math.floor(Number(this.state.tokenAAmount) * 1000000);

		console.log(this.state.poolTokenDataIndexer);
		const msgData = {
			poolId: this.state.poolTokenData[this.state.poolTokenDataIndexer[tokenA]]
				.poolId,
			poolCoin: {
				denom: tokenA,
				amount: String(amountA)
			}
		};

		const feeData = {
			denom: "uatomswap",
			amount: 2000,
			gas: "180000"
		};

		try {
			this.setState({ isLoading: true });
			const response = await txGenerator(
				"MsgWithdrawFromLiquidityPool",
				msgData,
				feeData
			);
			this.setState({ isLoading: false });
			if (String(response).includes("Error")) {
				throw response;
			}
			alert("Withdraw Success!");
		} catch (error) {
			alert(error);
			this.setState({ isLoading: false });
		}
	};
	// 로직 함수 끝

	tokenSelectorChangeHandler = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
		console.log(e.target.value);
	};

	amountChangeHandler = (e) => {
		let isExceeded = false;

		if (
			e.target.value >
			Number(
				getMyTokenBalance(this.state.tokenA, this.props.data.tokenIndexer)
					.split(":")[1]
					.trim()
			)
		) {
			isExceeded = true;
		}

		this.setState({
			[e.target.id]: e.target.value,
			isExceeded: isExceeded
		});
	};

	getMyPoolTokenInfo = () => {
		const tokenData = this.state.poolTokenData[
			this.state.poolTokenDataIndexer[this.state.tokenA]
		];
		const amount =
			(this.state.tokenAAmount * 1000000) / tokenData.myTokenAmount;
		const myRatio = Number(
			(tokenData.myTokenAmount / tokenData.poolTokenAmount) * 100
		).toFixed(4);
		let returns = null;
		if (tokenData.myTokenAmount <= 0) {
			returns = `0${String(tokenData.reserveCoins[0].denom)
				.substr(1)
				.toUpperCase()} + 0${String(tokenData.reserveCoins[1].denom)
					.substr(1)
					.toUpperCase()}`;
		} else {
			returns = `${Number(
				(tokenData.reserveCoins[0].amount / 100000000) *
				amount *
				myRatio *
				amount
			).toFixed(2)}${String(tokenData.reserveCoins[0].denom)
				.substr(1)
				.toUpperCase()} + ${Number(
					(tokenData.reserveCoins[1].amount / 100000000) *
					amount *
					myRatio *
					amount
				).toFixed(2)}${String(tokenData.reserveCoins[1].denom)
					.substr(1)
					.toUpperCase()}`;
		}
		return { myRatio: `${myRatio}%`, returns: returns };
	};

	render() {
		if (this.state.poolTokenData) {
			return (
				<Wrapper>
					<SectionHead>
						<div>Withdraw</div>
					</SectionHead>
					<DepositCard>
						<TokenSetter
							currencies={this.state.poolTokenData}
							leftTitle="Pool Token"
							cssId="A"
							rightTitle={getMyTokenBalance(
								this.state.tokenA,
								this.props.data.tokenIndexer
							)}
							token={this.state.tokenA}
							tokenAmount={this.tokenAAmount}
							selectorHandler={this.tokenSelectorChangeHandler}
							amountHandler={this.amountChangeHandler}
							cssStyle={{ marginBottom: "20px" }}
						/>

						<BasicButtonCard
							function={this.createPool}
							buttonName="WITHDRAW"
							isLoading={this.state.isLoading}
							isDisabled={this.state.isExceeded}
						>
							<Detail>
								<div>Your Pool Share</div>
								<div>{this.getMyPoolTokenInfo().myRatio}</div>
							</Detail>
							<Detail>
								<div>Estimated Output</div>
								<div>{this.getMyPoolTokenInfo().returns}</div>
							</Detail>
						</BasicButtonCard>
					</DepositCard>
				</Wrapper>
			);
		} else {
			return <Wrapper>No Pool Token Data</Wrapper>;
		}
	}
}

export default Withdraw;
