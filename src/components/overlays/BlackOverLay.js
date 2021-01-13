import { Component } from "react";
import { OverLay } from "../../design/components/overlays/BlackOverLay";

class BlackOverLay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAnimation: true
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				isAnimation: false
			});
		}, 50);
	}
	render() {
		return (
			<>
				<OverLay
					style={this.state.isAnimation ? { opacity: "0" } : {}}
					onClick={this.props.modalHandler}
				>
					{this.props.children}
				</OverLay>
			</>
		);
	}
}

export default BlackOverLay;
