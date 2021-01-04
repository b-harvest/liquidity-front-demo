
import { getPoolList, getWalletTokenList } from '../../common/cosmos-amm'
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
            const poolList = await getPoolList()
            const walletTokenList = await getWalletTokenList()

            const result = setWallettokenDataToPoolListData(poolList, walletTokenList)
            this.setState({ poolData: result })
        })()



        //helper
        function setWallettokenDataToPoolListData(poolListData, walletTokens) {
            let pd = [...poolListData]
            const wt = walletTokens

            pd.forEach((pool, index) => {
                let poolTokenTotalSupply;
                let myPoolTokenAmount;
                let myPoolTokenRatio;

                wt.some(isPoolToken)
                pool.myPoolToken = {
                    balance: myPoolTokenRatio,
                    denom: '%'
                }

                pool.liquidity_pool.reserve_coin_denoms.forEach((denom, denomIndex) => {
                    wt.some(isReserveToken)

                    function isReserveToken(td) {
                        if (td.denom === denom) {
                            let reserveTokenAmount;

                            for (let tokenInfo of pd[index].liquidity_pool_metadata.reserve_coins) {
                                if (tokenInfo.denom === denom) {
                                    reserveTokenAmount = tokenInfo.amount
                                }
                            }

                            pd[index].liquidity_pool.reserve_coin_denoms[denomIndex] = `${reserveTokenAmount / 1000000 * myPoolTokenRatio}${denom.substr(1)}`
                            return true
                        }
                    }
                })

                function isPoolToken(td) {
                    if (pool.liquidity_pool.pool_coin_denom === td.denom) {
                        poolTokenTotalSupply = pool.liquidity_pool_metadata.pool_coin_total_supply.amount
                        myPoolTokenAmount = td.amount
                        myPoolTokenRatio = (myPoolTokenAmount / poolTokenTotalSupply)
                        console.log(`
                            PoolTokendenom : ${td.denom}
                            myPoolTokenAmount : ${myPoolTokenAmount}
                            poolTokenTotalSupply : ${poolTokenTotalSupply}
                            ratio : ${myPoolTokenRatio}
                            `)
                        return true
                    }
                }
            });
            return pd
        }
    }

    createRows(data) {
        if (data === null) {
            return (<div></div>)
        } else {
            return (
                data.map((item, index) => {

                    return (
                        <Row key={index}>
                            <div>{item.liquidity_pool.reserve_coin_denoms[0]}</div>
                            <div>{item.liquidity_pool.reserve_coin_denoms[1]}</div>
                            <div>{item.myPoolToken ? `${item.myPoolToken.balance * 100}${item.myPoolToken.denom}` : '-'}</div>
                            <div>SOON </div>
                        </Row>)
                })
            )
        }
    }

    render() {
        return (
            <PoolTable>
                <TableHeader>
                    <div>Reserve 1</div>
                    <div>Reserve 2</div>
                    <div>My Token</div>
                    <div>Action</div>
                </TableHeader>
                {this.createRows(this.state.poolData)}
            </PoolTable>
        )
    }
}

const PoolTable = styled.section`
width: 100%;
border: 1px solid gray;
border-radius: 8px;
text-align:center;
`
const Row = styled.div`
// width: 820px;
&:nth-child(2n) {
    background-color: #efefef;
}
div {
    display:inline-block;
    width:180px;
    height: 36px;
    line-height: 36px;
    &:not(:last-child) {
        border-right: 1px solid #c3c3c3;;
    }
}
&:not(:last-child) {
    border-bottom: 1px solid #c3c3c3;
}
&:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

`
const TableHeader = styled(Row)`
    font-weight: 700;
    border-bottom: none;
`


export default PoolList