import { Component } from "react";
import { mobileCheck } from "../common/global-functions";
import { CoinImgShower } from "../design/elements/CoinImageShower";

class CoinImageShower extends Component {
	getTokenName = (name) => {
		if (name.length > 10) {
			return "pool";
		} else {
			return name.toLowerCase();
		}
	};

	render() {
		const isMobile = mobileCheck()
		const coinName = this.getTokenName(String(this.props.coin))

		return (isMobile && coinName === "pool" ? '' : <CoinImgShower
			style={this.props.style}
			src={`/assets/${coinName}.png`}
		/>
		)

	}
}

export default CoinImageShower;
