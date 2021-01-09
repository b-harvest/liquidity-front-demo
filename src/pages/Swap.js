import { Component } from 'react';
import PoolList from '../components/PoolList'
import styled from 'styled-components';
import { txGenerator, getWalletTokenList } from '../common/cosmos-amm'
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
            tokenIndexer: '',
            priceBForA: 0,
            isLoading: false,
            isPoolSelected: false
        };
    }

    componentDidMount() {
        (async () => {
            try {
                let tokenIndexer = {}
                const walletTokenList = await getWalletTokenList();
                walletTokenList.forEach((item) => {
                    tokenIndexer[item.denom] = item.amount
                })
                this.setState({ tokenIndexer: tokenIndexer })
                console.log(tokenIndexer)
            } catch (error) {
                console.error(error);
            }
        })()
    };
    // this.setState({ priceBForA: parseFloat(price.toFixed(6)) })
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
    getMyTokenBalance = (token) => {
        const balance = Number(Number(this.state.tokenIndexer[token]) / 1000000).toFixed(2)
        if (balance !== "NaN") {
            return `My Balance: ${balance}`
        } else {
            return `My Balance: 0`
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
                            rightTitle={this.getMyTokenBalance(this.state.tokenA)}
                            cssId="A"
                            token={this.state.tokenA}
                            tokenAmount={this.tokenAAmount}
                            selectorHandler={this.tokenSelectorChangeHandler}
                            amountHandler={this.amountChangeHandler}
                            readOnly={true}
                            cssStyle={{ marginBottom: "20px" }} />

                        <TokenSetter
                            currencies={currencies}
                            leftTitle="To"
                            rightTitle={this.getMyTokenBalance(this.state.tokenB)}
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
                                <div>{this.getTokenPrice()}</div>
                            </Detail>
                        </BasicButtonCard>
                    </DepositCard> :
                    <PoolList poolsData={this.props.poolsData} selectPool={this.selectPool} />}
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