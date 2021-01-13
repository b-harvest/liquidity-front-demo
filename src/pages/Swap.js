import { Component } from "react";
import {
	Wrapper,
	Detail,
	ResetButton,
	DepositCard
} from "../design/pages/Swap";

import { currencies } from "../common/config";
import { txGenerator } from "../common/cosmos-amm";
import {
	getMyTokenBalance,
	calculateCounterPairAmount,
	calculateSlippage
} from "../common/global-functions";

import PoolList from "../components/PoolList";
import TokenSetter from "../elements/TokenSetter";
import ChangeButton from "../elements/ChangeButton";
import BasicButtonCard from "../elements/BasicButtonCard";

class Swap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenA: "",
			tokenB: "",
			tokenAAmount: "",
			tokenBAmount: "",
			tokenAPoolAmount: "",
			tokenBPoolAmount: "",
			poolId: "",
			poolTypeIndex: "",
			tokenIndexer: this.props.data.tokenIndexer,
			slippage: 0,
			isLoading: false,
			isExceeded: false,
			isPoolSelected: false
		};
	}

	componentDidMount() {
		if (this.props.data.tokenIndexer !== null) {
			try {
				this.setState({ tokenIndexer: this.props.data.tokenIndexer });
			} catch (error) {
				console.error(error);
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data.tokenIndexer !== this.props.data.tokenIndexer) {
			try {
				this.setState({ tokenIndexer: this.props.data.tokenIndexer });
			} catch (error) {
				console.error(error);
			}
		}
	}

	// 로직 함수 시작
	createPool = async () => {
		console.log(`From : ${this.state.tokenA} ${this.state.tokenAAmount}`);
		console.log(`To : ${this.state.tokenB} ${this.state.tokenBAmount}`);

		const tokenA = this.state.tokenA;
		const tokenB = this.state.tokenB;
		const amountA = Math.floor(Number(this.state.tokenAAmount) * 1000000);

		const msgData = {
			poolId: this.state.poolId,
			poolTypeIndex: this.state.poolTypeIndex,
			swapType: 1,
			offerCoin: {
				denom: tokenA,
				amount: String(amountA)
			},
			demandCoinDenom: tokenB,
			orderPrice: Number((Number(this.state.tokenBPoolAmount) / Number(this.state.tokenAPoolAmount) * 1.1)).toFixed(18)
		};
		console.log(msgData.orderPrice);

		const feeData = {
			denom: "uatom",
			amount: 2000,
			gas: "180000"
		};

		try {
			this.setState({ isLoading: true });
			const response = await txGenerator("MsgSwap", msgData, feeData);
			this.setState({ isLoading: false });
			if (String(response).includes("Error")) {
				throw response;
			}
			this.reset();
			alert("Your tokens have been swapped successfully");
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
	};

	amountChangeHandler = (e) => {
		let slippage = calculateSlippage(e.target.value * 1000000, this.state.tokenAPoolAmount)
		if (slippage > 0.997) {
			slippage = 0.997;
		}

		let isExceeded = false;
		if (e.target.value > Number(getMyTokenBalance(this.state.tokenA, this.state.tokenIndexer).split(":")[1].trim())) {
			isExceeded = true;
		}

		const { counterPair, counterPairAmount } = calculateCounterPairAmount(e, this.state, slippage, "swap");

		this.setState({
			[e.target.id]: e.target.value,
			[counterPair]: Number(counterPairAmount).toFixed(2),
			slippage: slippage,
			isExceeded: isExceeded
		});
	};

	setSlippageColor = (slippage) => {
		let color = "";
		if (slippage <= 1) {
			color = "rgb(39, 174, 96)";
		} else if (slippage <= 3) {
			color = "";
		} else if (slippage <= 5) {
			color = "rgb(243, 132, 30)";
		} else {
			color = "rgb(255, 104, 113)";
		}
		return { color: color };
	};

	getTokenPrice = (a, b, reverse = false) => {
		const price = b / a;
		if (price && price !== Infinity) {
			if (reverse) {
				return (
					<span>
						1 {this.state.tokenB.substr(1).toUpperCase()} ={" "}
						{parseFloat(price.toFixed(2))}{" "}
						{this.state.tokenA.substr(1).toUpperCase()}
					</span>
				);
			} else {
				return (
					<span>
						1 {this.state.tokenA.substr(1).toUpperCase()} ={" "}
						{parseFloat(price.toFixed(2))}{" "}
						{this.state.tokenB.substr(1).toUpperCase()}
					</span>
				);
			}
		} else {
			return "?";
		}
	};

	reset = () => {
		this.setState({
			tokenAAmount: "",
			tokenBAmount: ""
		});
	};

	selectPool = (item) => {
		console.log(item);
		if (item.liquidity_pool_metadata?.reserve_coins) {
			this.setState({
				isPoolSelected: !this.state.isPoolSelected,
				poolId: item.liquidity_pool.pool_id,
				poolTypeIndex: item.liquidity_pool.pool_type_index,
				tokenA: item.liquidity_pool_metadata.reserve_coins[0].denom,
				tokenB: item.liquidity_pool_metadata.reserve_coins[1].denom,
				tokenAPoolAmount: item.liquidity_pool_metadata.reserve_coins[0].amount,
				tokenBPoolAmount: item.liquidity_pool_metadata.reserve_coins[1].amount,
				slippage: 0,
				isExceeded: false
			});
		} else {
			this.reset();
			this.setState({
				poolId: "",
				poolTypeIndex: "",
				tokenA: "",
				tokenB: "",
				tokenAAmount: "",
				tokenBAmount: "",
				tokenAPoolAmount: "",
				tokenBPoolAmount: "",
				slippage: 0,
				isExceeded: false,
				isPoolSelected: !this.state.isPoolSelected
			});
		}
	};

	tokenChange = () => {
		let tokenA = this.state.tokenB;
		let tokenB = this.state.tokenA;
		let tokenAAmount = "";
		let tokenBAmount = "";
		let tokenAPoolAmount = this.state.tokenBPoolAmount;
		let tokenBPoolAmount = this.state.tokenAPoolAmount;
		this.setState({
			slippage: 0,
			tokenA: tokenA,
			tokenB: tokenB,
			tokenAAmount: tokenAAmount,
			tokenBAmount: tokenBAmount,
			tokenAPoolAmount: tokenAPoolAmount,
			tokenBPoolAmount: tokenBPoolAmount
		});
	};

	render() {
		const slippage = (this.state.slippage * 100).toFixed(2);

		if (this.state.isPoolSelected) {
			return (
				<Wrapper>
					<DepositCard>
						<ResetButton onClick={this.selectPool}>{`< Back`}</ResetButton>
						<TokenSetter
							currencies={currencies}
							leftTitle="From"
							rightTitle={getMyTokenBalance(
								this.state.tokenA,
								this.state.tokenIndexer
							)}
							cssId="A"
							token={this.state.tokenA}
							tokenAmount={this.state.tokenAAmount}
							selectorHandler={this.tokenSelectorChangeHandler}
							amountHandler={this.amountChangeHandler}
							readOnly={true}
						/>
						<ChangeButton func={this.tokenChange} />
						<TokenSetter
							currencies={currencies}
							leftTitle="To (estimated)"
							rightTitle={getMyTokenBalance(
								this.state.tokenB,
								this.state.tokenIndexer
							)}
							cssId="B"
							token={this.state.tokenB}
							tokenAmount={this.state.tokenBAmount}
							selectorHandler={this.tokenSelectorChangeHandler}
							amountHandler={this.amountChangeHandler}
							readOnly={true}
						/>

						<BasicButtonCard
							function={this.createPool}
							buttonName="SWAP"
							isLoading={this.state.isLoading}
							isDisabled={this.state.isExceeded}
						>
							<Detail>
								<div>Pool Price</div>
								<div>
									{this.getTokenPrice(this.state.tokenAPoolAmount, this.state.tokenBPoolAmount)}
								</div>
							</Detail>
							<Detail>
								<div>Estimated Slippage</div>
								<div style={this.setSlippageColor(slippage)}>{slippage}%</div>
							</Detail>
						</BasicButtonCard>
					</DepositCard>
				</Wrapper>
			);
		} else {
			return (
				<PoolList
					poolsData={this.props.data.poolsData}
					selectPool={this.selectPool}
					actionType="Swap"
				/>
			);
		}
	}
}

export default Swap;
