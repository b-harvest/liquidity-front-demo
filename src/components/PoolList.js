
import { Component } from "react";
import CoinImgShower from "../elements/CoinImageShower"
import styled from "styled-components";

class PoolList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			poolsData: null,
			updatePool: null
		};
	}

	componentDidMount() {
		console.log(this.state.poolsData)
		if (this.props.poolsData !== null) {
			this.setState({ poolsData: this.props.poolsData })
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.poolsData !== this.props.poolsData) {
			this.setState({ poolsData: this.props.poolsData })
		}
	}

	getPoolPairs(item) {
		return [
			item.liquidity_pool.reserve_coin_denoms[0].substr(1).toUpperCase(),
			item.liquidity_pool.reserve_coin_denoms[1].substr(1).toUpperCase()
		];
	}

	getSecondPairPrice(item) {
		const price =
			Number(item.liquidity_pool_metadata.reserve_coins[1]?.amount) /
			Number(item.liquidity_pool_metadata.reserve_coins[0]?.amount);
		return Number(price).toFixed(2);
	}

	selectPool = (pool) => {
		this.props.selectPool(pool);
	};

	createRows = (data) => {
		if (data === null || data === undefined) {
			return (
				<div
					style={{ color: "#ea5353", fontSize: "18px", fontWeight: "bold" }}
				></div>
			);
		} else {
			return data.map((item, index) => {
				const pairs = this.getPoolPairs(item);
				const secondPairPrice = this.getSecondPairPrice(item);
				return (
					<Row key={index}>
						<div><CoinImgShower coin={pairs[0]} />{pairs[0]} - <CoinImgShower coin={pairs[1]} />{pairs[1]}</div>
						<div>
							{`1 ${pairs[0]} per`}
							<br />
							{`${secondPairPrice} ${pairs[1]}`}
						</div>
						<div>
							<DepositButton
								onClick={() => {
									this.selectPool(item);
								}}
							>
								{this.props.actionName ? this.props.actionName : "Select"}
							</DepositButton>
						</div>
					</Row>
				);
			});
		}
	};

	render() {
		return (
			<>
				<PoolTable>
					<TableHeader>
						<div>Pool</div>
						<div>Price</div>
						<div>Action</div>
					</TableHeader>
					{this.createRows(this.state.poolsData)}
				</PoolTable>
			</>
		);
	}
}
const Row = styled.div`
	margin-bottom: 20px;
	display: flex;
	width: 660px;

	div:first-child {
		line-height: 48px;
	}

	div {
		width: 33.3333%;
		display: inline-block;
		line-height: 24px;
	}

	div:last-child {
		line-height: 48px;
	}
`;
const PoolTable = styled.section`
	margin: 0 auto;
	border-radius: 6px;
	text-align: center;
`;

const TableHeader = styled(Row)`
	margin-bottom: 30px;
	background-color: #eef5ff;
	font-weight: bold;

	div {
		line-height: 48px;
	}
`;

const DepositButton = styled.button`
	width: 120px;
	height: 24px;
	border-radius: 12px;
	border: none;
	background-color: #4297ff;
	color: #fff;
	font-weight: bold;
	cursor: pointer;
	outline: none;
	transition: opacity 0.3s;
    &:hover {
        opacity: 0.7;
    }
`;

export default PoolList;
