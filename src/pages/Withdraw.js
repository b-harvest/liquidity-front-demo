import { Component } from 'react';
import styled from 'styled-components';
import { txGenerator, getWalletTokenList, getPoolList } from '../common/cosmos-amm'
import { currencies } from '../common/config'
import TokenSetter from '../elements/TokenSetter';
import BasicButtonCard from '../elements/BasicButtonCard'

class Deposit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenA: currencies[1].coinMinimalDenom,
            tokenB: currencies[0].coinMinimalDenom,
            tokenAAmount: '',
            tokenBAmount: '',
            tokenAPoolAmount: '',
            tokenBPoolAmount: '',
            poolId: '',
            poolTypeIndex: '',
            priceBForA: 0,
            isLoading: false,
        };
    }
    componentDidMount() {
        const GetPoolTokenList = async () => {
            try {
                const poolList = await getPoolList();
                const tokenList = await getWalletTokenList();
            } catch (error) {
                console.error(error);
            }
        };


        GetPoolTokenList()
    }

    // 로직 함수 시작
    createPool = async () => {
        console.log(`X : ${this.state.tokenA} ${this.state.tokenAAmount}`)
        console.log(`Y : ${this.state.tokenB} ${this.state.tokenBAmount}`)

        const tokenA = this.state.tokenA
        const tokenB = this.state.tokenB
        const amountA = Math.floor(Number(this.state.tokenAAmount) * 1000000);
        // const amountB = Math.floor(Number(this.state.tokenBAmount) * 1000000);

        // const arrangedReserveCoinDenoms = sortReserveCoinDenoms(tokenA, tokenB)

        const msgData = {
            poolId: this.state.poolId,
            poolTypeIndex: this.state.poolTypeIndex,
            swapType: 1,
            offerCoin: {
                "denom": tokenA,
                "amount": String(amountA)
            },
            demandCoinDenom: tokenB,
            orderPrice: Number(Number(this.state.tokenBPoolAmount) / Number(this.state.tokenAPoolAmount)).toFixed(18)
        }

        const feeData = {
            denom: "ustake",
            amount: 2000,
            gas: "180000",
        };

        try {
            this.setState({ isLoading: true })
            const response = await txGenerator("MsgSwap", msgData, feeData)
            this.setState({ isLoading: false })
            if (String(response).includes("Error")) {
                throw response
            }
            alert("Swap Success!")
        } catch (error) {
            alert(error)
            this.setState({ isLoading: false })
        }

        // helpers
        // function sortReserveCoinDenoms(x, y) {
        //     return [x, y]
        // }

        // function getDepositCoins(denoms, amounts) {
        //     return { denoms: [denoms[0], denoms[1]], amounts: [amounts[denoms[0]], amounts[denoms[1]]] }
        // }
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

    selectPool = (item) => {
        console.log(item)
        if (item.liquidity_pool_metadata?.reserve_coins) {
            this.setState({
                poolId: item.liquidity_pool.pool_id,
                poolTypeIndex: item.liquidity_pool.pool_type_index,
                tokenA: item.liquidity_pool_metadata.reserve_coins[0].denom,
                tokenB: item.liquidity_pool_metadata.reserve_coins[1].denom,
                tokenAPoolAmount: item.liquidity_pool_metadata.reserve_coins[0].amount,
                tokenBPoolAmount: item.liquidity_pool_metadata.reserve_coins[1].amount,
            })
        }
    }

    render() {
        return (
            <div>
                <DepositCard>
                    <TokenSetter
                        currencies={currencies}
                        leftTitle="Pool Token"
                        rightTitle="Amount"
                        cssId="A"
                        token={this.state.tokenA}
                        tokenAmount={this.tokenAAmount}
                        selectorHandler={this.tokenSelectorChangeHandler}
                        amountHandler={this.amountChangeHandler}
                        cssStyle={{ marginBottom: "20px" }} />

                    <BasicButtonCard function={this.createPool} buttonName="SWAP" isLoading={this.state.isLoading}>
                        <Detail>
                            <div>Pool Price</div>
                            <div>{this.getTokenPrice()}</div>
                        </Detail>
                    </BasicButtonCard>
                </DepositCard>

            </div>
        )
    }
}

const DepositCard = styled.div`
    position:absolute;
    width: 460px;
    height: 340px;
    padding: 40px 20px 20px;
    background-color:#fff;
    transform: translateX( -50%);
    top: 120px;
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