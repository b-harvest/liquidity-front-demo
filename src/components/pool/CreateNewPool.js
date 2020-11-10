import { Component } from 'react';
import styled from 'styled-components';

class CreateNewPool extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tokenX: props.tokenList[0],
            tokenY: props.tokenList[1],
        }

    }

    // 로직 함수 시작
    createPool() {
        const tokenX = document.getElementById('tokenX').value
        const tokenY = document.getElementById('tokenY').value
        const amountX = document.getElementById('tokenXAmount').value
        const amountY = document.getElementById('tokenYAmount').value

        alert(`TokenX: ${tokenX} / ${amountX}\nTokenY: ${tokenY} / ${amountY}`)
        //여기서 작업하시면 됩니다 😄

    }
    // 로직 함수 끝


    createOptions(data) {
        return (
            data.map((item, index) => {
                return (
                    <option value={item} key={item}>{item}</option>
                )
            }
            )
        )
    }

    render() {
        return (
            <section>
                <ReserveTokenCard>
                    <TokenTitle>Reserve Token X</TokenTitle>
                    {/* {this.state.tokenX} {this.state.tokenY} */}
                    <TokenSelector id="tokenX">
                        {this.createOptions(this.props.tokenList)}
                    </TokenSelector>
                    <TokenTitle>Deposit Amount </TokenTitle>
                    <DepositInput id="tokenXAmount" placeholder="1.000"></DepositInput>
                </ReserveTokenCard>

                <Divider />

                <ReserveTokenCard>
                    <TokenTitle>Reserve Token Y</TokenTitle>
                    {/* {this.state.tokenX} {this.state.tokenY} */}
                    <TokenSelector id="tokenY">
                        {this.createOptions(this.props.tokenList)}
                    </TokenSelector>
                    <TokenTitle>Deposit Amount </TokenTitle>
                    <DepositInput id="tokenYAmount" placeholder="1.000"></DepositInput>
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
    line-height: 32px;
    color: gray;
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
    line-height: 32px;
    color: gray;
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