import { Component } from 'react'
import { Detail, ResetButton, DepositCard } from '../design/pages/Swap'

import { currencies } from '../common/config'
import { txGenerator } from '../common/cosmos-amm'
import { getMyTokenBalance } from '../common/global-functions'

import PoolList from '../components/PoolList'
import TokenSetter from '../elements/TokenSetter'
import ChangeButton from '../elements/ChangeButton'
import BasicButtonCard from '../elements/BasicButtonCard'

class Swap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenA: '',
            tokenB: '',
            tokenAAmount: '',
            tokenBAmount: '',
            tokenAPoolAmount: '',
            tokenBPoolAmount: '',
            poolId: '',
            poolTypeIndex: '',
            tokenIndexer: this.props.data.tokenIndexer,
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
        console.log(`From : ${this.state.tokenA} ${this.state.tokenAAmount}`)
        console.log(`To : ${this.state.tokenB} ${this.state.tokenBAmount}`)

        const tokenA = this.state.tokenA
        const tokenB = this.state.tokenB
        const amountA = Math.floor(Number(this.state.tokenAAmount) * 1000000);

        const msgData = {
            poolId: this.state.poolId,
            poolTypeIndex: this.state.poolTypeIndex,
            swapType: 1,
            offerCoin: {
                "denom": tokenA,
                "amount": String(amountA)
            },
            demandCoinDenom: tokenB,
            orderPrice: Number(Number(this.state.tokenBPoolAmount) / Number(this.state.tokenAPoolAmount) * 0.9).toFixed(18)
        }
        console.log(msgData.orderPrice)

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
    }
    // 로직 함수 끝

    tokenSelectorChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    amountChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            lastChanger: e.target.id,
        })
    }

    getTokenPrice = (a, b, reverse = false) => {
        const price = b / a
        if (price && price !== Infinity) {
            if (reverse) {
                return <span>1 {this.state.tokenB.substr(1).toUpperCase()} = {parseFloat(price.toFixed(6))} {this.state.tokenA.substr(1).toUpperCase()}</span>
            } else {
                return <span>1 {this.state.tokenA.substr(1).toUpperCase()} = {parseFloat(price.toFixed(6))} {this.state.tokenB.substr(1).toUpperCase()}</span>
            }
        } else {
            return "?"
        }
    }

    setTokenAmount

    selectPool = (item) => {
        console.log(item)
        if (item.liquidity_pool_metadata?.reserve_coins) {
            this.setState({
                isPoolSelected: !this.state.isPoolSelected,
                poolId: item.liquidity_pool.pool_id,
                poolTypeIndex: item.liquidity_pool.pool_type_index,
                tokenA: item.liquidity_pool_metadata.reserve_coins[0].denom,
                tokenB: item.liquidity_pool_metadata.reserve_coins[1].denom,
                tokenAPoolAmount: item.liquidity_pool_metadata.reserve_coins[0].amount,
                tokenBPoolAmount: item.liquidity_pool_metadata.reserve_coins[1].amount,
            })
        } else {
            this.setState({
                isPoolSelected: !this.state.isPoolSelected,
            })
        }
    }

    tokenChange = () => {
        let tokenA = this.state.tokenB
        let tokenB = this.state.tokenA
        let tokenAPoolAmount = this.state.tokenBPoolAmount
        let tokenBPoolAmount = this.state.tokenAPoolAmount
        this.setState({ tokenA: tokenA, tokenB: tokenB, tokenAPoolAmount: tokenAPoolAmount, tokenBPoolAmount: tokenBPoolAmount })
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
                            readOnly={true}
                        />
                        <ChangeButton func={this.tokenChange} />
                        <TokenSetter
                            currencies={currencies}
                            leftTitle="To"
                            rightTitle={getMyTokenBalance(this.state.tokenB, this.state.tokenIndexer)}
                            cssId="B"
                            token={this.state.tokenB}
                            tokenAmount={this.tokenBAmount}
                            selectorHandler={this.tokenSelectorChangeHandler}
                            amountHandler={this.amountChangeHandler}
                            readOnly={true}
                        />

                        <BasicButtonCard function={this.createPool} buttonName="SWAP" isLoading={this.state.isLoading}>
                            <Detail>
                                <div>Pool Price</div>
                                <div>{this.getTokenPrice(this.state.tokenAPoolAmount, this.state.tokenBPoolAmount)}</div>
                            </Detail>
                        </BasicButtonCard>
                    </DepositCard> :
                    <PoolList poolsData={this.props.data.poolsData} selectPool={this.selectPool} />}
            </div>
        )
    }
}

export default Swap