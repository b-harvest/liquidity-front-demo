import { SharedDataContext } from "../../context/app/SharedData"
import { useState, useContext } from "react";
import CreatePoolModal from "./CreatePoolModal";
import CoinImgShower from "../../elements/CoinImageShower";
import SwapAnimation from "../../elements/animations/swapAnimation"

import {
	Wrapper,
	SectionHead,
	TableHeader,
	Row,
	PoolTable,
	GoCreatePool
} from "../../design/pages/Pools";

function Pools() {
	const [isModal, setIsModal] = useState(false)
	const SharedData = useContext(SharedDataContext)

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
		if (data === null) {
			return <div></div>;
		}
		if (data === undefined || data.length === 0) {
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
				const test = Math.random() > 0.7
				return (
					isNaN(secondPairPrice) ?
						'' : <Row key={index}>
							<div style={{ position: "relative" }}>
								<CoinImgShower coin={pairs[0]} isSwap={test} />
								{pairs[0]}
								<span>···</span>
								<CoinImgShower coin={pairs[1]} isSwap={test} />
								{pairs[1]}
								<SwapAnimation coinOne={pairs[0]} coinTwo={pairs[1]} isSwap={test} />
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
				{createRows(SharedData.poolsData)}
			</PoolTable>
			{isModal ? (
				<CreatePoolModal modalHandler={modalHandler} data={SharedData} />
			) : (
					""
				)}
		</Wrapper>
	);
}

export default Pools;
