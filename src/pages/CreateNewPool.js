import { Component } from 'react';
import styled from 'styled-components';
import { txGenerator } from '../common/cosmos-amm'
import { currencies } from '../common/config'

class CreateNewPool extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tokenX: currencies[0].coinMinimalDenom,
            tokenY: currencies[1].coinMinimalDenom,
            tokenXAmount: '',
            tokenYAmount: '',
        }

    }

    componentDidMount() {
        console.log(currencies)
    }

    // 로직 함수 시작
    createPool = async () => {
        console.log(`X : ${this.state.tokenX} ${this.state.tokenXAmount}`)
        console.log(`Y : ${this.state.tokenY} ${this.state.tokenYAmount}`)

        const tokenX = this.state.tokenX
        const tokenY = this.state.tokenY
        const amountX = Math.floor(Number(this.state.tokenXAmount) * 1000000);
        const amountY = Math.floor(Number(this.state.tokenYAmount) * 1000000);

        const arrangedReserveCoinDenoms = sortReserveCoinDenoms(tokenX, tokenY)

        const msgData = {
            pool_type_index: 1,
            reserve_coin_denoms: arrangedReserveCoinDenoms,
            deposit_coins: getDepositCoins(arrangedReserveCoinDenoms, { [tokenX]: amountX, [tokenY]: amountY })
        }

        const feeData = {
            denom: "ustake",
            amount: 2000,
            gas: "180000",
        };

        try {
            const response = await txGenerator("MsgCreateLiquidityPool", msgData, feeData)
            console.log(response)
        } catch (error) {
            alert(error)
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


    createOptions(data) {
        return (
            data.map((item, index) => {
                return (
                    <option value={item.coinMinimalDenom} key={item.coinDenom}>{item.coinDenom}</option>
                )
            }
            )
        )
    }
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

    render() {
        return (
            <section>
                <ReserveTokenCard>
                    <TokenTitle>Reserve Token X</TokenTitle>
                    <TokenSelector id="tokenX" value={this.state.tokenX} onChange={this.tokenSelectorChangeHandler}>
                        {this.createOptions(currencies)}
                    </TokenSelector>
                    <TokenTitle>Deposit Amount </TokenTitle>
                    <DepositInput id="tokenXAmount" placeholder="0" value={this.state.tokenXAmount} onChange={this.amountChangeHandler}></DepositInput>
                </ReserveTokenCard>

                <Divider />

                <ReserveTokenCard>
                    <TokenTitle>Reserve Token Y</TokenTitle>
                    <TokenSelector id="tokenY" value={this.state.tokenY} onChange={this.tokenSelectorChangeHandler}>
                        {this.createOptions(currencies)}
                    </TokenSelector>
                    <TokenTitle>Deposit Amount </TokenTitle>
                    <DepositInput id="tokenYAmount" placeholder="0" value={this.state.tokenYAmount} onChange={this.amountChangeHandler}></DepositInput>
                </ReserveTokenCard>

                <CreateNewPoolButton onClick={this.createPool}>Create New Pool</CreateNewPoolButton>
            </section>
        )
    }
}

const ReserveTokenCard = styled.section`
width: 324px;
margin: 0 auto;
border: 1px solid gray;
border-radius: 8px;
text-align:left;
padding: 20px;
`
const TokenTitle = styled.div`
font-weight: 700;
font-size: 18px;
margin-bottom: 8px;
`

const TokenSelector = styled.select` 
    padding: 0 12px;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    width: 326px;
    font-weight: 700;
    line-height: 32px;
    border: 1px solid gray;
    margin-bottom: 20px;
    &:hover {
        font-weight: 700;
    }
`

const DepositInput = styled.input`
    padding: 0 12px;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    width: 300px;
    font-weight: 700;
    line-height: 32px;
    border: 1px solid gray;
`
const Divider = styled.div`
    height: 20px;
    width: 50%;
    border-right: 1px solid gray;
`

const CreateNewPoolButton = styled.div`
margin: 20px auto 0 auto;
width: 364px;
cursor:pointer;
height: 40px;
border-radius: 8px;
font-size: 20px;
line-height: 40px;
color: #fff;
background-color: #ffb100;
`


export default CreateNewPool