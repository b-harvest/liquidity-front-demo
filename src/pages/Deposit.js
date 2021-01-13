import { Component } from "react";
import {
	Wrapper,
	Detail,
	ResetButton,
	DepositCard
} from "../design/pages/Deposit";

import { txGenerator } from "../common/cosmos-amm";
import { currencies } from "../common/config";
import {
	getMyTokenBalance,
	sortReserveCoinDenoms,
	getDepositCoins,
	calculateCounterPairAmount
} from "../common/global-functions";

import PoolList from "../components/PoolList";
import TokenSetter from "../elements/TokenSetter";
import BasicButtonCard from "../elements/BasicButtonCard";

class Deposit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenA: "",
			tokenB: "",
			tokenAAmount: "",
			tokenBAmount: "",
			tokenAPoolAmount: "",
			tokenBPoolAmount: "",
			tokenIndexer: "",
			poolId: "",
			priceBForA: 0,
			isLoading: false,
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
		const amountX = Math.floor(Number(this.state.tokenAAmount) * 1000000);
		const amountY = Math.floor(Number(this.state.tokenBAmount) * 1000000);

		const arrangedReserveCoinDenoms = sortReserveCoinDenoms(tokenA, tokenB);

		const msgData = {
			pool_id: this.state.poolId,
			deposit_coins: getDepositCoins(arrangedReserveCoinDenoms, {
				[tokenA]: amountX,
				[tokenB]: amountY
			})
		};

		const feeData = {
			denom: "uatomswap",
			amount: 2000,
			gas: "180000"
		};

		try {
			this.setState({ isLoading: true });
			const response = await txGenerator(
				"MsgDepositToLiquidityPool",
				msgData,
				feeData
			);
			this.setState({ isLoading: false });
			if (String(response).includes("TypeError")) {
				throw response;
			}
			alert("Your tokens have been deposited successfully");
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
		const { counterPair, counterPairAmount } = calculateCounterPairAmount(
			e,
			this.state,
			0,
			"deposit"
		);
		let isExceeded = false;

		if (
			e.target.value >
			Number(
				getMyTokenBalance(this.state.tokenA, this.state.tokenIndexer)
					.split(":")[1]
					.trim()
			)
		) {
			isExceeded = true;
		}
		this.setState({
			[e.target.id]: e.target.value,
			[counterPair]: counterPairAmount,
			isExceeded: isExceeded
		});
	};

	getTokenPrice = () => {
		const price = this.state.tokenBPoolAmount / this.state.tokenAPoolAmount;
		if (price && price !== Infinity) {
			return (
				<span>
					1 {this.state.tokenA.substr(1).toUpperCase()} ={" "}
					{parseFloat(price.toFixed(4))}{" "}
					{this.state.tokenB.substr(1).toUpperCase()}
				</span>
			);
		} else {
			return "?";
		}
	};

	selectPool = (item) => {
		console.log(item.liquidity_pool_metadata?.reserve_coins);
		if (item.liquidity_pool_metadata?.reserve_coins) {
			this.setState({
				isPoolSelected: !this.state.isPoolSelected,
				poolId: item.liquidity_pool.pool_id,
				tokenA: item.liquidity_pool.reserve_coin_denoms[0],
				tokenB: item.liquidity_pool.reserve_coin_denoms[1],
				tokenAPoolAmount: item.liquidity_pool_metadata.reserve_coins[0]?.amount,
				tokenBPoolAmount: item.liquidity_pool_metadata.reserve_coins[1]?.amount
			});
		} else {
			this.setState({
				isPoolSelected: !this.state.isPoolSelected,
				tokenAAmount: "",
				tokenBAmount: ""
			});
		}
	};

	render() {
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

						<div
							style={{
								outline: "none",
								backgroundColor: "#ffffff",
								width: "36px",
								border: "none",
								fontSize: "30px",
								fontWeight: 700,
								margin: "15px 0 18px 0",
								cursor: "default"
							}}
						>
							+
						</div>

						<TokenSetter
							currencies={currencies}
							leftTitle="To"
							rightTitle={getMyTokenBalance(
								this.state.tokenB,
								this.state.tokenIndexer
							)}
							cssId="B"
							token={this.state.tokenB}
							tokenAmount={this.state.tokenBAmount}
							selectorHandler={this.tokenSelectorChangeHandler}
							readOnly={true}
							amountHandler={this.amountChangeHandler}
						/>

						<BasicButtonCard
							function={this.createPool}
							buttonName="DEPOSIT"
							isLoading={this.state.isLoading}
							isDisabled={this.state.isExceeded}
						>
							<Detail>
								<div>Pool Price</div>
								<div>{this.getTokenPrice()}</div>
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
					actionType="Deposit"
				/>
			);
		}
	}
}

export default Deposit;
