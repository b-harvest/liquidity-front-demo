import styled from "styled-components";
import { Component } from "react";
import { txGenerator } from "../../common/cosmos-amm";
import { currencies } from "../../common/config";
import BlackOverLay from "../overlays/BlackOverLay";
import TokenSetter from "../../elements/TokenSetter";
import BasicButtonCard from "../../elements/BasicButtonCard";

class CreatePoolModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenA: currencies[1].coinMinimalDenom,
			tokenB: currencies[0].coinMinimalDenom,
			tokenAAmount: "",
			tokenBAmount: "",
			isLoading: false
		};
	}

	componentDidMount() {
		console.log(currencies);
	}
	componentWillUnmount() { }
	// 로직 함수 시작
	createPool = async () => {
		console.log(`X : ${this.state.tokenA} ${this.state.tokenAAmount}`);
		console.log(`Y : ${this.state.tokenB} ${this.state.tokenBAmount}`);

		const tokenA = this.state.tokenA;
		const tokenB = this.state.tokenB;
		const amountX = Math.floor(Number(this.state.tokenAAmount) * 1000000);
		const amountY = Math.floor(Number(this.state.tokenBAmount) * 1000000);

		const arrangedReserveCoinDenoms = sortReserveCoinDenoms(tokenA, tokenB);

		const msgData = {
			pool_type_index: 1,
			reserve_coin_denoms: arrangedReserveCoinDenoms,
			deposit_coins: getDepositCoins(arrangedReserveCoinDenoms, {
				[tokenA]: amountX,
				[tokenB]: amountY
			})
		};

		const feeData = {
			denom: "ustake",
			amount: 2000,
			gas: "180000"
		};

		try {
			this.setState({ isLoading: true });
			const response = await txGenerator(
				"MsgCreateLiquidityPool",
				msgData,
				feeData
			);
			this.setState({ isLoading: false });
			if (response.includes("TypeError")) {
				throw response;
			}
			alert("Pool Create Success!");
			this.props.modalHandler();
		} catch (error) {
			alert(error);
			this.setState({ isLoading: false });
		}

		// helpers
		function sortReserveCoinDenoms(x, y) {
			return [x, y];
		}

		function getDepositCoins(denoms, amounts) {
			return {
				denoms: [denoms[0], denoms[1]],
				amounts: [amounts[denoms[0]], amounts[denoms[1]]]
			};
		}
	};
	// 로직 함수 끝

	createOptions(data) {
		return data.map((item) => {
			return (
				<option value={item.coinMinimalDenom} key={item.coinDenom}>
					{item.coinDenom}
				</option>
			);
		});
	}
	tokenSelectorChangeHandler = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	amountChangeHandler = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	getTokenPrice = () => {
		const price = this.state.tokenAAmount / this.state.tokenBAmount;
		if (price && price !== Infinity) {
			return (
				<span>
					{parseFloat(price.toFixed(6))}{" "}
					{this.state.tokenA.substr(1).toUpperCase()} = 1{" "}
					{this.state.tokenB.substr(1).toUpperCase()}
				</span>
			);
		} else {
			return "0";
		}
	};

	render() {
		return (
			<>
				<BlackOverLay modalHandler={this.props.modalHandler} />
				<Modal>
					<TokenSetter
						currencies={currencies}
						leftTitle="Token A"
						rightTitle="Amount"
						cssId="A"
						token={this.state.tokenA}
						tokenAmount={this.tokenAAmount}
						selectorHandler={this.tokenSelectorChangeHandler}
						amountHandler={this.amountChangeHandler}
						cssStyle={{ marginBottom: "20px" }}
					/>

					<TokenSetter
						currencies={currencies}
						leftTitle="Token B"
						rightTitle="Amount"
						cssId="B"
						token={this.state.tokenB}
						tokenAmount={this.tokenBAmount}
						selectorHandler={this.tokenSelectorChangeHandler}
						amountHandler={this.amountChangeHandler}
					/>

					<BasicButtonCard
						function={this.createPool}
						buttonName="CREATE POOL"
						isLoading={this.state.isLoading}
					>
						<Detail>
							<div>Initial Pool Price</div>
							<div>{this.getTokenPrice()}</div>
						</Detail>
					</BasicButtonCard>
				</Modal>
			</>
		);
	}
}

const Modal = styled.div`
	position: absolute;
	width: 460px;
	height: 340px;
	padding: 20px;
	background-color: #fff;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	border-radius: 8px;
`;

const Detail = styled.div`
	display: flex;
	font-weight: bold;
	div {
		flex: 1;
		text-align: right;
	}
	div:first-child {
		text-align: left;
	}
`;

export default CreatePoolModal;
