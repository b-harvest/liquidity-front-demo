import { Component } from 'react';
import styled from 'styled-components';

import CoinImgShower from "../elements/CoinImageShower"

class TokenSetter extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

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
        console.log(this.props.token)
        return (
            <>
                <TokenCard style={this.props.cssStyle}>
                    <Left>
                        <Title>{this.props.leftTitle ? this.props.leftTitle : "leftTitle"}</Title>
                        <div>
                            <CoinImgShower coin={String(this.props.token).substr(1)} />
                            <TokenSelector id={`token${this.props.cssId}`} value={this.props.token} onChange={this.props.selectorHandler} style={{ pointerEvents: `${this.props.readOnly ? 'none' : ''}` }}>
                                {this.createOptions(this.props.currencies)}
                            </TokenSelector>
                            {this.props.readOnly ? <ArrowEraser /> : ""}
                        </div>
                    </Left>
                    <Right>
                        <Title>{this.props.rightTitle ? `${this.props.rightTitle}` : 'amount'} </Title>
                        <DepositInput id={`token${this.props.cssId}Amount`} placeholder="0" value={this.props.tokenAmount} onChange={this.props.amountHandler}></DepositInput>
                    </Right>
                </TokenCard>
            </>
        )
    }
}

const TokenCard = styled.section`

    margin: 0 auto;

    border-radius: 8px;
    border: 2px solid black;
    padding: 10px 20px;
    display:flex;
`
const Title = styled.div`
    font-weight: 400;
    font-size: 14px;
    color:#777777;
    margin-bottom: 8px;
`
const Left = styled.div`
    flex:1;
    text-align:left;
    height: 60px;
`
const Right = styled(Left)`
    text-align:right;
`
const ArrowEraser = styled.div`
    width: 20px;
    height: 20px;
    background-color: white;
    display: inline-block;
    transform: translate(-14px, 3px);
`
const TokenSelector = styled.select` 
    padding: 0 ;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    font-weight: 700;
    font-size:18px;
    line-height: 32px;
    border: none;
    outline: none;
`
const DepositInput = styled.input`
    padding: 0 12px;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    font-size:18px;
    font-weight: 700;
    line-height: 32px;
    border: none;
    text-align:right;
    outline: none;
`

export default TokenSetter