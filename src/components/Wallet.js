import { Component } from "react";
import styled from "styled-components";
import CoinImgShower from "../elements/CoinImageShower";
import BlackOverLay from "./overlays/BlackOverLay";
import { getPoolToken } from "../common/global-functions";

class Wallet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			poolTokenIndexer: {}
		};
	}

	componentDidMount() {
		this.props.walletEventHandler();
	}

	componentDidUpdate(prevProps) {}

	getPoolTokenIndexer = () => {
		let poolTokenIndexer = {};
		if (this.props.data.poolsData !== null) {
			getPoolToken(this.props.data.poolsData, this.props.data.walletTokenList).forEach((ele) => {
				poolTokenIndexer[ele.coinMinimalDenom] = ele.coinDenom;
			});
			return poolTokenIndexer;
		}
	};

	createTokenList = (data) => {
		console.log(data);
		if (data === null || data === undefined) {
			return <div></div>;
		}
		return data.map((item, index) => {
			const denom = String(item.denom).substr(1);
			return (
				<TokenRow key={index}>
					<TokenImage>
						<CoinImgShower coin={denom} />
					</TokenImage>
					<TokenInfo>
						<div>{denom.length > 10 ? this.getPoolTokenIndexer()[item.denom] : denom.toUpperCase()}</div>
						<div>
							{this.props.data.tokenIndexer[item.denom] / 1000000} {denom.length > 10 ? "" : denom}
						</div>
					</TokenInfo>
				</TokenRow>
			);
		});
	};

	render() {
		return (
			<>
				<BlackOverLay modalHandler={this.props.modalHandler}></BlackOverLay>
				<WalletWrapper>
					<WalletClose>
						<img src="/assets/arrow-left.svg" onClick={this.props.modalHandler} />
					</WalletClose>
					<WalletHeader>
						<div>My Wallet</div>
						<div>{localStorage.walletAddress}</div>
					</WalletHeader>
					<ListWrapper>
						<ListHeader>My Tokens</ListHeader>
						<TokenWrapper>{this.createTokenList(this.props.data.walletTokenList)}</TokenWrapper>
					</ListWrapper>
					{/*
					<ListWrapper style={{ margin: "30px 0 48px" }}>
						<ListHeader>Recent Activity</ListHeader>
						<EventWrapper>{this.createTokenList(this.props.data.walletTokenList)}</EventWrapper>
					</ListWrapper>
					*/}
				</WalletWrapper>
			</>
		);
	}
}

const WalletWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 360px;
	height: 100%;
	padding: 0 18px;
	background-color: #ffffff;
	overflow-x: hidden;
	overflow-y: auto;
	transition: all 1s;
	animation-name: slidein;
	animation-duration: 0.2s;

	@keyframes slidein {
		from {
			margin-left: -500px;
		}

		to {
			margin-left: 0;
		}
	}
`;

const WalletClose = styled.div`
	align-self: flex-start;

	img {
		display: inline-block;
		width: 42px;
		color: #1e2129;
		cursor: pointer;
		padding: 9px;
		margin: 12px 0 0 -6px;
		border-radius: 30px;
		transition: all 0.2s ease;

		&:hover {
			background-color: #c7c8ca;
		}
	}
`;

const WalletHeader = styled.div`
	margin: 12px 0;

	div:first-child {
		font-size: 27px;
		font-weight: 700;
		color: #1e2129;
		line-height: 1;
		text-align: center;
	}

	div:last-child {
		font-size: 13px;
		color: #838589;
		line-height: 1;
		text-align: center;
		word-break: break-all;
		line-height: 1.5;
		margin-top: 15px;
	}
`;

const ListWrapper = styled.div`
	width: 100%;
	margin-top: 18px;
	border-radius: 12px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ListHeader = styled.h3`
	background-color: rgba(255, 170, 13, 0.15);
	margin: 0;
	padding: 12px;
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;
`;

const TokenWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: calc(100vh - 300px);
	overflow-x: hidden;
	overflow-y: auto;
	border-radius: 12px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
`;

const TokenRow = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	position: relative;
	width: 100%;
	height: 60px;
	padding: 9px 15px;

	&:not(:last-child) {
		border-bottom: 1px solid #e9e9ea;
	}
`;

const TokenImage = styled.div`
	height: 30px;
`;

const TokenInfo = styled.div`
	text-align: left;
	margin-left: 9px;

	div:nth-child(2) {
		color: #838589;
		font-size: 0.9em;
	}
`;

const EventWrapper = styled(TokenWrapper)``;

export default Wallet;
