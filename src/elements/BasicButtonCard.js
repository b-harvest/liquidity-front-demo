import { Component } from "react";
import { Card, Button } from "../design/elements/BasicButtonCard";

import DotLoader from "./animations/DotLoader";

class BasicButtonCard extends Component {
	render() {
		return (
			<>
				<Card>
					{this.props.children}
					<Button
						onClick={this.props.function}
						style={
							(this.props.isLoading ? { pointerEvents: "none" } : {},
							this.props.isDisabled
								? {
										backgroundColor: "#fa543e",
										color: "#ffffff",
										pointerEvents: "none"
								  }
								: {})
						}
					>
						{this.props.isLoading ? (
							<DotLoader />
						) : this.props.buttonName ? (
							this.props.isDisabled ? (
								"Insufficient Balance"
							) : (
								this.props.buttonName
							)
						) : (
							"Button"
						)}
					</Button>
				</Card>
			</>
		);
	}
}

export default BasicButtonCard;
