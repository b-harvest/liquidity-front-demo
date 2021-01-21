import { useEffect, useState } from "react";
import CreatePoolModal from "../components/modal/CreatePoolModal";
import CoinImgShower from "../elements/CoinImageShower";
import SwapAnimation from "../elements/animations/swapAnimation"

import {
	Wrapper,
	SectionHead,
	TableHeader,
	Row,
	PoolTable,
	GoCreatePool
} from "../design/pages/Pools";

function Pools(props) {

	const [isModal, setIsModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!isLoading && props.data.poolsData !== null) {
			setIsLoading(true)
		}
	}, [props.data.poolsData])

	function modalHandler() {
		setIsModal(!isModal)
	}

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

	function createRows(data) {
		if (!isLoading) {
			return <div></div>;
		}
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
					isNaN(secondPairPrice) ?
						'' : <Row key={index}>
							<div style={{ position: "relative" }}>
								<CoinImgShower coin={pairs[0]} />
								{pairs[0]}
								<span>···</span>
								<CoinImgShower coin={pairs[1]} />
								{pairs[1]}
								<SwapAnimation coinOne={pairs[0]} coinTwo={pairs[1]} isSwap={Math.random()} />
							</div>
							<div>
								{`1 ${pairs[0]} per`}
								<br />
								{`${secondPairPrice} ${pairs[1]}`}
							</div>
						</Row>
				);
			});
		}
	}

	return (
		<Wrapper>
			<SectionHead>
				<div>Pools</div>
				<GoCreatePool onClick={modalHandler}>Create Pool</GoCreatePool>
			</SectionHead>
			<PoolTable>
				<TableHeader>
					<div>Pool</div>
					<div>Price</div>
				</TableHeader>
				{createRows(props.data.poolsData)}
			</PoolTable>
			{isModal ? (
				<CreatePoolModal modalHandler={modalHandler} data={props.data} />
			) : (
					""
				)}
		</Wrapper>
	);
}

export default Pools;
