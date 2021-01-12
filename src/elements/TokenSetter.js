import { Component } from "react";
import {
	DepositInput,
	TokenSelector,
	ArrowEraser,
	Right,
	Left,
	Title,
	TokenCard
} from "../design/elements/TokenSetter";

import CoinImgShower from "../elements/CoinImageShower";

class TokenSetter extends Component {
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

	render() {
		return (
			<>
				<TokenCard>
					<Left>
						<Title>
							{this.props.leftTitle ? this.props.leftTitle : "leftTitle"}
						</Title>
						<div>
							<CoinImgShower coin={String(this.props.token).substr(1)} />
							<TokenSelector
								id={`token${this.props.cssId}`}
								value={this.props.token}
								onChange={this.props.selectorHandler}
								style={{
									pointerEvents: `${this.props.readOnly ? "none" : ""}`
								}}
							>
								{this.createOptions(this.props.currencies)}
							</TokenSelector>
							{this.props.readOnly ? <ArrowEraser /> : ""}
						</div>
					</Left>
					<Right>
						<Title>
							{this.props.rightTitle ? `${this.props.rightTitle}` : "amount"}{" "}
						</Title>
						<DepositInput
							autoComplete="off"
							id={`token${this.props.cssId}Amount`}
							placeholder="0"
							value={this.props.tokenAmount}
							onChange={this.props.amountHandler}
						></DepositInput>
					</Right>
				</TokenCard>
			</>
		);
	}
}

export default TokenSetter;
