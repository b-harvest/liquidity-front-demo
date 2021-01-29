import { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { toastGenerator, mobileCheck } from "../../common/global-functions";
import { Layout, HeaderPlaceholder, Header, Brand, Connect } from "../../design/components/layouts/BasicLayout";
import Wallet from "../Wallet";
import { GaiaApi } from "@chainapsis/cosmosjs/gaia/api";
import { chainInfo } from "../../common/config";
import Axios from "axios";

class BasicLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStyle: {
				backgroundColor: "#ffaa0d"
			},
			isSent: false,
			isWallet: false
		};
	}

	componentDidMount() {
		window.onload = () => {
			this.connectWallet();
		};
	}

	connectWallet = async (isClick) => {
		if (!window.cosmosJSWalletProvider) {
			if (mobileCheck()) {
				toastGenerator("info", "🙏  functions are available on the desktop");
			} else {
				toastGenerator("info", "🙏  Please install the Keplr extension");
			}
			return;
		}

		if (!window.keplr?.experimentalSuggestChain) {
			toastGenerator("info", "🙏 Please use the latest version of Keplr extension");
			return;
		}

		await window.keplr.experimentalSuggestChain(chainInfo);

		const cosmosJS = new GaiaApi({
			chainId: chainInfo.chainId,
			rpc: chainInfo.rpc,
			rest: chainInfo.rest,
			walletProvider: window.cosmosJSWalletProvider
		});

		await cosmosJS.enable();

		const keys = await cosmosJS.getKeys();

		if (keys.length === 0) {
			throw new Error("there is no key");
		}
		this.bech32Address = keys[0].bech32Address;
		if (!localStorage.walletAddress) {
			toastGenerator("connect");
		}
		if (isClick && localStorage.walletAddress) {
			this.modalHandler();
			return;
		}
		localStorage.setItem("walletAddress", this.bech32Address);
		this.setState({
			cosmosJS,
			address: this.bech32Address
		});
	};

	getModifiedAddress = (address) => {
		return `${address.substr(0, 10)}...${address.substr(-5)}`;
	};

	sendFaucetRequest = async () => {
		if (localStorage.walletAddress) {
			try {
				toastGenerator("info", "Request has been sent successfully. This may take up to 2 seconds. ⏳");
				this.setState({ isSent: true });
				const response = await Axios.get(`https://dev.bharvest.io/faucet/?address=${localStorage.getItem("walletAddress")}`);
				toastGenerator("", response.data);
				this.setState({ isSent: false });
				console.log("Faucet response", response);
			} catch (error) {
				toastGenerator("error", error.data);
				this.setState({ isSent: false });
				console.log(error);
			}
		} else {
			toastGenerator("info", "🙏 Please connect your wallet with Keplr extension in order to continue");
		}
	};

	modalHandler = () => {
		this.setState({
			isWallet: !this.state.isWallet
		});
	};

	render() {
		return (
			<Layout>
				<HeaderPlaceholder />
				<Header>
					<Brand>
						<a href="https://bharvest.io/">
							<img src="/assets/bh-logo.png" alt="B-Harvest" />
						</a>
						<img src="/assets/amm-demo.png" alt="AMM Demo" />
					</Brand>
					<Social>
						<div>
							<a href="https://t.me/b_harvest">
								<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="telegram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="telegram svg-inline--fa fa-telegram fa-w-16" data-v-553dc280="">
									<path fill="#838589" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" data-v-553dc280=""></path>
								</svg>
								<small>Telegram</small>
							</a>
						</div>
						<div>
							<a href="mailto:contact@bharvest.io">
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="telegram svg-inline--fa fa-envelope fa-w-16" data-v-553dc280="">
									<path fill="#838589" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" data-v-553dc280=""></path>
								</svg>
								<small>contact@bharvest.io</small>
							</a>
						</div>
					</Social>
					<NavLink exact to={"/"} activeStyle={this.state.activeStyle}>
						Pools
					</NavLink>
					<NavLink exact to={"/swap"} activeStyle={this.state.activeStyle}>
						Swap
					</NavLink>
					<NavLink exact to={"/deposit"} activeStyle={this.state.activeStyle}>
						Deposit
					</NavLink>
					<NavLink exact to={"/withdraw"} activeStyle={this.state.activeStyle}>
						Withdraw
					</NavLink>

					<span onClick={this.sendFaucetRequest} style={this.state.isSent ? { color: "#a7a7a7", pointerEvents: "none" } : {}}>
						{this.state.isSent ? "Waiting... 💸" : "Faucet 💸"}
					</span>

					<Connect onClick={this.connectWallet}>
						{this.state.address && this.props.isWalletEvent ? <Alarm>New</Alarm> : ""}
						{this.state.address ? `${this.getModifiedAddress(this.state.address)}` : "CONNECT WALLET"}
					</Connect>

					{this.state.isWallet ? <Wallet data={this.props.data} modalHandler={this.modalHandler} walletEventHandler={this.props.walletEventHandler} /> : ""}
				</Header>

				{this.props.children}
			</Layout>
		);
	}
}

const Social = styled.div`
position:absolute;
width: 240px;
top: 155px;
display: flex;
justify-content: space-around;

a {
	text-decoration: none;
}

	div {
		cursor: pointer;
		
		svg {
			width: 30px;
			path {
				transition: fill 0.2s;
			}
			
		}
		
		small {
			color: #838589;
			font-size: 14px;
			text-align:center;
			margin-top: 4px;
			display: block;
			transition: color 0.2s;
		}
	}

	div:hover {
		svg {
			path {
			fill: #fff;
			}
		}
		small {
			color:#fff;
		}
	}


	@media (max-width: 959px) {
		position: fixed;
		top: unset;
		bottom: 0px;
		width: 100%;
		height: 60px;
		margin-top: 30px;
		padding: 10px;
		background-color:#1e2129;

		div {
			small {
				font-size: 12px;
			}
			svg {
				width: 20px;	
			}
		}
	}

	
`

const Alarm = styled.div`
	position: absolute;
	left: 14px;
	top: -6px;
	font-size: 14px;
	font-weight: bold;
	color: #00ffa3;

	animation: blink 2s infinite;
	@keyframes blink {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
`;

export default BasicLayout;
