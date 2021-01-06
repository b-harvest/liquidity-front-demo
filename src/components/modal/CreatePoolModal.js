import styled from 'styled-components';
import { Component } from 'react';
import { txGenerator } from '../../common/cosmos-amm'
import { currencies } from '../../common/config'
import BlackOverLay from '../overlays/BlackOverLay'
import TokenSetter from '../../elements/TokenSetter';


class CreatePoolModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenA: currencies[0].coinMinimalDenom,
            tokenB: currencies[1].coinMinimalDenom,
            tokenAAmount: '',
            tokenBAmount: '',
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
            pool_type_index: 1,
            reserve_coin_denoms: arrangedReserveCoinDenoms,
            deposit_coins: getDepositCoins(arrangedReserveCoinDenoms, { [tokenA]: amountX, [tokenB]: amountY })
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
            data.map((item) => {
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
            <>
                <BlackOverLay modalHandler={this.props.modalHandler} />
                <Modal >
                    <TokenSetter
                        currencies={currencies}
                        leftTitle="Token A"
                        rightTitle="current balance:"
                        cssId="A"
                        token={this.state.tokenA}
                        tokenAmount={this.tokenAAmount}
                        selectorHandler={this.tokenSelectorChangeHandler}
                        amountHandler={this.amountChangeHandler}
                        cssStyle={{ marginBottom: "20px" }}
                    />

                    <TokenSetter
                        currencies={currencies}
                        leftTitle="Token B"
                        rightTitle="current balance:"
                        cssId="B"
                        token={this.state.tokenB}
                        tokenAmount={this.tokenBAmount}
                        selectorHandler={this.tokenSelectorChangeHandler}
                        amountHandler={this.amountChangeHandler} />

                    {/* <ReserveTokenCard>
                        <TokenTitle>Reserve Token X</TokenTitle>
                        <TokenSelector id="tokenA" value={this.state.tokenA} onChange={this.tokenSelectorChangeHandler}>
                            {this.createOptions(currencies)}
                        </TokenSelector>
                        <TokenTitle>Deposit Amount </TokenTitle>
                        <DepositInput id="tokenAAmount" placeholder="0" value={this.state.tokenAAmount} onChange={this.amountChangeHandler}></DepositInput>
                    </ReserveTokenCard>

                    <Divider />

                    <ReserveTokenCard>
                        <TokenTitle>Reserve Token Y</TokenTitle>
                        <TokenSelector id="tokenB" value={this.state.tokenB} onChange={this.tokenSelectorChangeHandler}>
                            {this.createOptions(currencies)}
                        </TokenSelector>
                        <TokenTitle>Deposit Amount </TokenTitle>
                        <DepositInput id="tokenBAmount" placeholder="0" value={this.state.tokenBAmount} onChange={this.amountChangeHandler}></DepositInput>
                    </ReserveTokenCard> */}

                    <CreateNewPoolButton onClick={this.createPool}>Create New Pool</CreateNewPoolButton>
                </Modal>
            </>
        )
    }
}

const Modal = styled.div`
    position:absolute;
    width: 460px;
    height: 560px;
    padding: 20px;
    background-color:#fff;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 8px;
`
// const ReserveTokenCard = styled.section`
//     width: 324px;
//     margin: 0 auto;
//     border: 1px solid gray;
//     border-radius: 8px;
//     text-align:left;
//     padding: 20px;
// `
// const TokenTitle = styled.div`
//     font-weight: 700;
//     font-size: 18px;
//     margin-bottom: 8px;
// `

// const TokenSelector = styled.select` 
//     padding: 0 12px;
//     cursor: pointer;
//     border-radius: 8px;
//     height: 32px;
//     width: 326px;
//     font-weight: 700;
//     line-height: 32px;
//     border: 1px solid gray;
//     margin-bottom: 20px;
//     &:hover {
//         font-weight: 700;
//     }
// `

// const DepositInput = styled.input`
//     padding: 0 12px;
//     cursor: pointer;
//     border-radius: 8px;
//     height: 32px;
//     width: 300px;
//     font-weight: 700;
//     line-height: 32px;
//     border: 1px solid gray;
// `
// const Divider = styled.div`
//     height: 20px;
//     width: 50%;
//     border-right: 1px solid gray;
// `

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

export default CreatePoolModal
