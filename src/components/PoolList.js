import { useEffect, useState } from "react";
import {
	Wrapper,
	SectionHead,
	DepositButton,
	TableHeader,
	PoolTable,
	Row
} from "../design/components/PoolList";
import CoinImgShower from "../elements/CoinImageShower";

function PoolList(props) {

	const [poolsData, setPoolsData] = useState(null)

	useEffect(() => {
		setPoolsData(props.poolsData)
	}, [props.poolsData])


	function getPoolPairs(item) {
		return [
			item.liquidity_pool.reserve_coin_denoms[0].substr(1).toUpperCase(),
			item.liquidity_pool.reserve_coin_denoms[1].substr(1).toUpperCase()
		];
	}

	function getSecondPairPrice(item) {
		const price =
			Number(item.liquidity_pool_metadata.reserve_coins[1]?.amount) /
			Number(item.liquidity_pool_metadata.reserve_coins[0]?.amount);
		return Number(price).toFixed(2);
	}

	function selectPool(pool) {
		props.selectPool(pool);
	};

	function createRows(data) {
		if (data === null || data === undefined || data.length === 0) {
			return (
				<div
					style={{ color: "#a5a6a9", lineHeight: 1.5, marginBottom: "27px" }}
				>
					There are no pools created yet.
					<br />
					Be the first to create a pool!
				</div>
			);
		} else {
			return data.map((item, index) => {
				const pairs = getPoolPairs(item);
				const secondPairPrice = getSecondPairPrice(item);
				return (
					<Row key={index}>
						<div>
							<CoinImgShower style={{ marginBottom: "0" }} coin={pairs[0]} />
							{pairs[0]}
							<span>···</span>
							<CoinImgShower style={{ marginBottom: "0" }} coin={pairs[1]} />
							{pairs[1]}
						</div>
						{secondPairPrice !== "NaN" ? (
							<div>
								{`1 ${pairs[0]} per`}
								<br />
								{`${secondPairPrice} ${pairs[1]}`}
							</div>) :
							(<div>
								{`1 ${pairs[0]} per`}
								<br />
								{`${secondPairPrice} ${pairs[1]}`}
							</div>)}
						<div>
							<DepositButton
								onClick={() => {
									selectPool(item);
								}}
							>
								{props.actionType}
							</DepositButton>
						</div>
					</Row>
				);
			});
		}
	};


	return (
		<Wrapper>
			<SectionHead>
				<div>{props.actionType}</div>
			</SectionHead>
			<PoolTable>
				<TableHeader>
					<div>Pool</div>
					<div>Price</div>
					<div>Select</div>
				</TableHeader>
				{createRows(poolsData)}
			</PoolTable>
		</Wrapper>
	);

}

export default PoolList;
