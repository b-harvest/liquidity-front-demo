import { Component } from "react";
import { Modal, Detail } from "../../design/components/modal/CreatePoolModal";

import { txGenerator } from "../../common/cosmos-amm";
import { getMyTokenBalance } from "../../common/global-functions";
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
			isExceeded: false,
			isLoading: false
		};
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
			if (JSON.stringify(response).includes("TypeError")) {
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
						rightTitle={getMyTokenBalance(
							this.state.tokenA,
							this.props.data.tokenIndexer
						)}
						cssId="A"
						token={this.state.tokenA}
						tokenAmount={this.tokenAAmount}
						selectorHandler={this.tokenSelectorChangeHandler}
						amountHandler={this.amountChangeHandler}
					/>

					<TokenSetter
						currencies={currencies}
						leftTitle="Token B"
						rightTitle={getMyTokenBalance(
							this.state.tokenB,
							this.props.data.tokenIndexer
						)}
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
						isDisabled={this.state.isExceeded}
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

export default CreatePoolModal;
