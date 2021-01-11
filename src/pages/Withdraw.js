import { Component } from 'react';
import styled from 'styled-components';

import { getMyTokenBalance } from '../common/global-functions'
import { txGenerator, getWalletTokenList, getPoolList } from '../common/cosmos-amm'

import TokenSetter from '../elements/TokenSetter';
import BasicButtonCard from '../elements/BasicButtonCard'


class Deposit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenA: '',
            tokenAAmount: '',
            tokenAPoolAmount: '',
            poolTokenData: null,
            poolTokenDataIndexer: null,
            tokenIndexer: null,
            isLoading: false,
        };
    }

    componentDidMount() {
        if (localStorage.walletAddress) {
            const setPoolToken = async () => {
                try {
                    (async () => {
                        try {
                            let tokenIndexer = {}
                            if (this.props.data.walletTokenList !== null) {
                                this.props.data.walletTokenList.forEach((item) => {
                                    tokenIndexer[item.denom] = item.amount
                                })
                            }
                            this.setState({ tokenIndexer: tokenIndexer })
                            console.log(tokenIndexer)
                        } catch (error) {
                            console.error(error);
                        }
                    })()
                    const poolList = await getPoolList();
                    const walletTokenList = await getWalletTokenList();
                    const poolTokenData = getPoolToken(poolList, walletTokenList)
                    let poolTokenDataIndexer = {}
                    console.log('poolTokenData', poolTokenData)
                    poolTokenData.forEach((ele, index) => {
                        poolTokenDataIndexer[ele.coinMinimalDenom] = index
                    })
                    console.log('poolTokenDataIndex', poolTokenDataIndexer)
                    this.setState({ poolTokenData: poolTokenData, poolTokenDataIndexer: poolTokenDataIndexer, tokenA: poolTokenData[0].coinMinimalDenom })
                } catch (error) {
                    console.error(error);
                }
            }
            setPoolToken()
        } else {
            alert('Please connect the wallet')
        }



        //helper 
        function getPoolToken(pl, wt) {
            let myPoolTokens = {}
            wt.forEach((ele) => {
                if (ele.denom.length > 10) {
                    myPoolTokens[ele.denom] = ele.amount
                }
            })
            return pl.map(ele => {
                let myTokenAmount = 0
                if (myPoolTokens[ele.liquidity_pool.pool_coin_denom]) {
                    myTokenAmount = myPoolTokens[ele.liquidity_pool.pool_coin_denom]
                }
                return {
                    coinDenom: `${ele.liquidity_pool.reserve_coin_denoms[0].substr(1).toUpperCase()}-${ele.liquidity_pool.reserve_coin_denoms[1].substr(1).toUpperCase()}`,
                    tokenDenom: [ele.liquidity_pool.reserve_coin_denoms[0], ele.liquidity_pool.reserve_coin_denoms[1]],
                    poolTokenAmount: ele.liquidity_pool_metadata.pool_coin_total_supply.amount,
                    coinMinimalDenom: ele.liquidity_pool.pool_coin_denom,
                    reserveCoins: ele.liquidity_pool_metadata.reserve_coins,
                    myTokenAmount: myTokenAmount,
                    poolId: ele.liquidity_pool.pool_id
                }
            });
        }
    }

    // 로직 함수 시작
    createPool = async () => {
        console.log(`X : ${this.state.tokenA} ${this.state.tokenAAmount}`)

        const tokenA = this.state.tokenA
        const amountA = Math.floor(Number(this.state.tokenAAmount) * 1000000);

        console.log(this.state.poolTokenDataIndexer)
        const msgData = {
            poolId: this.state.poolTokenData[this.state.poolTokenDataIndexer[tokenA]].poolId,
            poolCoin: {
                "denom": tokenA,
                "amount": String(amountA)
            },
        }

        const feeData = {
            denom: "ustake",
            amount: 2000,
            gas: "180000",
        };

        try {
            this.setState({ isLoading: true })
            const response = await txGenerator("MsgWithdrawFromLiquidityPool", msgData, feeData)
            this.setState({ isLoading: false })
            if (String(response).includes("Error")) {
                throw response
            }
            alert("Withdraw Success!")
        } catch (error) {
            alert(error)
            this.setState({ isLoading: false })
        }
    }
    // 로직 함수 끝



    tokenSelectorChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    amountChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getTokenPrice = () => {
        const price = this.state.tokenBPoolAmount / this.state.tokenAPoolAmount
        if (price && price !== Infinity) {
            return <span>1 {this.state.tokenA.substr(1).toUpperCase()} = {parseFloat(price.toFixed(6))} {this.state.tokenB.substr(1).toUpperCase()}</span>
        } else {
            return "?"
        }
    }

    render() {
        return (
            <div>
                {this.state.poolTokenData ? <DepositCard>
                    <TokenSetter
                        currencies={this.state.poolTokenData}
                        leftTitle="Pool Token"
                        cssId="A"
                        rightTitle={getMyTokenBalance(this.state.tokenA, this.state.tokenIndexer)}
                        token={this.state.tokenA}
                        tokenAmount={this.tokenAAmount}
                        selectorHandler={this.tokenSelectorChangeHandler}
                        amountHandler={this.amountChangeHandler}
                        cssStyle={{ marginBottom: "20px" }} />

                    <BasicButtonCard function={this.createPool} buttonName="WITHDRAW" isLoading={this.state.isLoading}>
                        <Detail>
                            {/* <div>Pool Price</div>
                            <div>{this.getTokenPrice()}</div> */}
                        </Detail>
                    </BasicButtonCard>
                </DepositCard> : ''}

            </div>
        )
    }
}

const DepositCard = styled.div`
    position:absolute;
    width: 460px;
    height: 230px;
    padding: 20px 20px 20px;
    background-color:#fff;
    transform: translateX( -50%);
    top: 160px;
    left: 50%;
    border-radius: 8px;
    border: 1px solid #bdbdbd;
`


const Detail = styled.div`
display: flex;
font-weight: bold;
div {
    flex: 1;
    text-align:right;
}
div:first-child {
    text-align: left;
}
`


export default Deposit