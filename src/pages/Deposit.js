import { Component } from 'react';
import styled from 'styled-components';

import { txGenerator } from '../common/cosmos-amm'
import { currencies } from '../common/config'
import { getMyTokenBalance } from '../common/global-functions'

import PoolList from '../components/PoolList'
import TokenSetter from '../elements/TokenSetter';
import BasicButtonCard from '../elements/BasicButtonCard'

class Deposit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenA: '',
            tokenB: '',
            tokenAAmount: '',
            tokenBAmount: '',
            tokenAPoolAmount: '',
            tokenBPoolAmount: '',
            tokenIndexer: '',
            poolId: '',
            priceBForA: 0,
            isLoading: false,
            isPoolSelected: false
        };
    }

    componentDidMount() {
        if (this.props.data.tokenIndexer !== null) {
            try {
                this.setState({ tokenIndexer: this.props.data.tokenIndexer })
            } catch (error) {
                console.error(error);
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.tokenIndexer !== this.props.data.tokenIndexer) {
            try {
                this.setState({ tokenIndexer: this.props.data.tokenIndexer })
                console.log('this.props.data.tokenIndexer', this.props.data.tokenIndexer)
            } catch (error) {
                console.error(error);
            }
        }
    }

    // 로직 함수 시작
    createPool = async () => {
        console.log(`X : ${this.state.tokenA} ${this.state.tokenAAmount}`)
        console.log(`Y : ${this.state.tokenB} ${this.state.tokenBAmount}`)

        const tokenA = this.state.tokenA
        const tokenB = this.state.tokenB
        const amountX = Math.floor(Number(this.state.tokenAAmount) * 1000000);
        const amountY = Math.floor(Number(this.state.tokenBAmount) * 1000000);

        const arrangedReserveCoinDenoms = sortReserveCoinDenoms(tokenA, tokenB)

        const msgData = {
            pool_id: this.state.poolId,
            deposit_coins: getDepositCoins(arrangedReserveCoinDenoms, { [tokenA]: amountX, [tokenB]: amountY })
        }

        const feeData = {
            denom: "ustake",
            amount: 2000,
            gas: "180000",
        };

        try {
            this.setState({ isLoading: true })
            const response = await txGenerator("MsgDepositToLiquidityPool", msgData, feeData)
            this.setState({ isLoading: false })
            if (String(response).includes("TypeError")) {
                throw response
            }
            alert("Deposit Success!")
        } catch (error) {
            alert(error)
            this.setState({ isLoading: false })
        }

        // helpers
        function sortReserveCoinDenoms(x, y) {
            return [x, y]
        }

        function getDepositCoins(denoms, amounts) {
            return { denoms: [denoms[0], denoms[1]], amounts: [amounts[denoms[0]], amounts[denoms[1]]] }
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

    selectPool = (item) => {
        console.log(item)
        if (item.liquidity_pool_metadata?.reserve_coins) {
            this.setState({
                isPoolSelected: !this.state.isPoolSelected,
                poolId: item.liquidity_pool.pool_id,
                tokenA: item.liquidity_pool.reserve_coin_denoms[0],
                tokenB: item.liquidity_pool.reserve_coin_denoms[1],
                tokenAPoolAmount: item.liquidity_pool_metadata.reserve_coins[0]?.amount,
                tokenBPoolAmount: item.liquidity_pool_metadata.reserve_coins[1]?.amount
            })
        } else {
            this.setState({
                isPoolSelected: !this.state.isPoolSelected,
            })
        }
    }



    render() {
        return (
            <div>
                { this.state.isPoolSelected ?
                    <DepositCard>
                        <ResetButton onClick={this.selectPool}>{`< Go Back`}</ResetButton>
                        <TokenSetter
                            currencies={currencies}
                            leftTitle="From"
                            rightTitle={getMyTokenBalance(this.state.tokenA, this.state.tokenIndexer)}
                            cssId="A"
                            token={this.state.tokenA}
                            tokenAmount={this.tokenAAmount}
                            selectorHandler={this.tokenSelectorChangeHandler}
                            amountHandler={this.amountChangeHandler}
                            cssStyle={{ marginBottom: "20px" }}
                            readOnly={true}
                        />

                        <TokenSetter
                            currencies={currencies}
                            leftTitle="To"
                            rightTitle={getMyTokenBalance(this.state.tokenB, this.state.tokenIndexer)}
                            cssId="B"
                            token={this.state.tokenB}
                            tokenAmount={this.tokenBAmount}
                            selectorHandler={this.tokenSelectorChangeHandler}
                            readOnly={true}
                            amountHandler={this.amountChangeHandler} />

                        <BasicButtonCard function={this.createPool} buttonName="DEPOSIT" isLoading={this.state.isLoading}>
                            <Detail>
                                <div>Pool Price</div>
                                <div>{this.getTokenPrice()}</div>
                            </Detail>
                        </BasicButtonCard>
                    </DepositCard> :
                    <PoolList poolsData={this.props.data.poolsData} selectPool={this.selectPool} />}
            </div>
        )
    }
}

const DepositCard = styled.div`
    position:absolute;
    width: 460px;
    height: 340px;
    padding: 96px 20px 20px;
    background-color:#fff;
    transform: translateX( -50%);
    top: 120px;
    left: 50%;
    border-radius: 8px;
    border: 1px solid #bdbdbd;
`

const ResetButton = styled.div`
display:inline-block;
width: 120px;
height: 24px;
color: black;
font-size:20px;
line-height: 24px;
position: absolute;
left: 20px;
top: 36px;
border-radius:24px;
cursor:pointer;
font-weight:bold;
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