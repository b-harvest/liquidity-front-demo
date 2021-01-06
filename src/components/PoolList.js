
import { getPoolList } from '../common/cosmos-amm'
import { Component } from 'react';
import styled from 'styled-components';

class PoolList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolData: null,
        };
    }

    componentDidMount() {
        (async () => {
            try {
                const poolList = await getPoolList()
                this.setState({ poolData: poolList })
            } catch (error) {
                console.error(error)
            }
        })()
    }

    getPoolPairs(item) {
        return [item.liquidity_pool.reserve_coin_denoms[0].substr(1).toUpperCase(), item.liquidity_pool.reserve_coin_denoms[1].substr(1).toUpperCase()]
    }

    getSecondPairPrice(item) {
        const price = Number(item.liquidity_pool_metadata.reserve_coins[1].amount) / Number(item.liquidity_pool_metadata.reserve_coins[0].amount)
        return Number(price).toFixed(2)
    }

    selectPool = (pool) => {
        this.props.selectPool(pool)
    }

    createRows = (data) => {
        if (data === null) {
            return (<div style={{ color: "#ea5353", fontSize: "18px", fontWeight: "bold" }}></div>)
        } else {
            return (
                data.map((item, index) => {
                    const pairs = this.getPoolPairs(item)
                    const secondPairPrice = this.getSecondPairPrice(item)
                    return (
                        <Row key={index}>
                            <div>{`${pairs[0]}-${pairs[1]}`}<br /><DepositButton onClick={() => { this.selectPool(item) }}>Deposit</DepositButton></div>
                            <div>{`1 ${pairs[0]} per`}<br />{`${secondPairPrice} ${pairs[1]}`}</div>
                        </Row>)
                })
            )
        }
    }

    render() {
        return (
            <>
                <PoolTable>
                    <TableHeader>
                        <div>Pool</div>
                        <div>Price</div>
                    </TableHeader>
                    {this.createRows(this.state.poolData)}
                </PoolTable>
            </>
        )
    }
}
const Row = styled.div`
margin-bottom: 20px;
display: flex;

div {
    flex: 1;
    display:inline-block;
    width:200px;
    line-height: 24px;
}
`
const PoolTable = styled.section`
width: 400px;
margin: 0 auto;
border-radius: 6px;
text-align:center;
`

const TableHeader = styled(Row)`
    margin-bottom: 30px;
    background-color: #eef5ff;
    font-weight: bold;

    div{
        line-height: 48px;
    }
`


const DepositButton = styled.button`
width: 120px;
height: 24px;
border-radius: 12px;
border: none;
background-color:#4297ff;
color:#fff;
font-weight: bold;
cursor:pointer;
outline:none;
`




export default PoolList


//helper
// function setWallettokenDataToPoolListData(poolListData, walletTokens) {
//     let pd = [...poolListData]
//     const wt = walletTokens

//     pd.forEach((pool, index) => {
//         let poolTokenTotalSupply;
//         let myPoolTokenAmount;
//         let myPoolTokenRatio;

//         wt.some(isPoolToken)
//         pool.myPoolToken = {
//             balance: myPoolTokenRatio,
//             denom: '%'
//         }

//         pool.liquidity_pool.reserve_coin_denoms.forEach((denom, denomIndex) => {
//             wt.some(isReserveToken)

//             function isReserveToken(td) {
//                 if (td.denom === denom) {
//                     let reserveTokenAmount;

//                     for (let tokenInfo of pd[index].liquidity_pool_metadata.reserve_coins) {
//                         if (tokenInfo.denom === denom) {
//                             reserveTokenAmount = tokenInfo.amount
//                         }
//                     }

//                     pd[index].liquidity_pool.reserve_coin_denoms[denomIndex] = `${reserveTokenAmount / 1000000 * myPoolTokenRatio}${denom.substr(1)}`
//                     return true
//                 }
//             }
//         })

//         function isPoolToken(td) {
//             if (pool.liquidity_pool.pool_coin_denom === td.denom) {
//                 poolTokenTotalSupply = pool.liquidity_pool_metadata.pool_coin_total_supply.amount
//                 myPoolTokenAmount = td.amount
//                 myPoolTokenRatio = (myPoolTokenAmount / poolTokenTotalSupply)
//                 console.log(`
//                     PoolTokendenom : ${td.denom}
//                     myPoolTokenAmount : ${myPoolTokenAmount}
//                     poolTokenTotalSupply : ${poolTokenTotalSupply}
//                     ratio : ${myPoolTokenRatio}
//                     `)
//                 return true
//             }
//         }
//     });