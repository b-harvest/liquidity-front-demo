import { Component } from 'react';
import PoolList from '../components/PoolList'
import styled from 'styled-components';
import { txGenerator } from '../common/cosmos-amm'
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
            isLoading: false,
            isPoolSelected: false
        };
    }

    componentDidMount() {
        console.log(currencies)
    }
    componentWillUnmount() {

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
            pool_id: 1,
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
            if (response.includes("TypeError")) {
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
        const price = this.state.tokenAAmount / this.state.tokenBAmount
        if (price && price !== Infinity) {
            return <span>{parseFloat(price.toFixed(6))} {this.state.tokenA.substr(1).toUpperCase()} = 1 {this.state.tokenB.substr(1).toUpperCase()}</span>
        } else {
            return "?"
        }

    }

    selectPool = (item) => {
        console.log(item)
        this.setState({
            isPoolSelected: !this.state.isPoolSelected
        })
    }

    render() {
        return (
            <div>
                { this.state.isPoolSelected ?
                    <DepositCard>
                        <TokenSetter
                            currencies={currencies}
                            leftTitle="Token A"
                            rightTitle="Amount"
                            cssId="A"
                            token={this.state.tokenA}
                            tokenAmount={this.tokenAAmount}
                            selectorHandler={this.tokenSelectorChangeHandler}
                            amountHandler={this.amountChangeHandler}
                            cssStyle={{ marginBottom: "20px" }} />

                        <TokenSetter
                            currencies={currencies}
                            leftTitle="Token B"
                            rightTitle="Amount"
                            cssId="B"
                            token={this.state.tokenB}
                            tokenAmount={this.tokenBAmount}
                            selectorHandler={this.tokenSelectorChangeHandler}
                            amountHandler={this.amountChangeHandler} />

                        <BasicButtonCard function={this.createPool} buttonName="DEPOSIT" isLoading={this.state.isLoading}>
                            <Detail>
                                <div>Initial Pool Price</div>
                                <div>{this.getTokenPrice()}</div>
                            </Detail>
                        </BasicButtonCard>
                    </DepositCard> :
                    <PoolList selectPool={this.selectPool} />}
            </div>
        )
    }
}

const DepositCard = styled.div`
    position:absolute;
    width: 460px;
    height: 340px;
    padding: 20px;
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