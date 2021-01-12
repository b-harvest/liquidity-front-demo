import { Component } from "react";
import { CoinImgShower } from "../design/elements/CoinImageShower";

class CoinImageShower extends Component {
	setTokenName = (name) => {
		if (name.length > 10) {
			return "pool";
		} else {
			return name.toLowerCase();
		}
	};

	render() {
		return (
			<CoinImgShower
				style={this.props.style}
				src={`/assets/${this.setTokenName(String(this.props.coin))}.png`}
			/>
		);
	}
}

export default CoinImageShower;
