import { Component } from 'react';
import styled from 'styled-components';

class Swap extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tokenX: props.tokenList[0],
            tokenY: props.tokenList[1],
        }

    }

    // 로직 함수 시작
    swap() {
        const tokenX = document.getElementById('tokenX').value
        const tokenY = document.getElementById('tokenY').value
        const amountX = document.getElementById('tokenXAmount').value
        const amountY = document.getElementById('tokenYAmount').value

        alert(`TokenX: ${tokenX} / ${amountX}\nTokenY: ${tokenY} / ${amountY}`)
        //여기서 작업하시면 됩니다 😄

    }
    // 로직 함수 끝

    componentDidMount() {
        // setInterval(() => {
        //     const amountX = Number(document.getElementById('tokenXAmount').value)
        //     if (amountX) {
        //         const tokenShare = (amountX / this.props.poolInfo.reserveTokenX.balance).toFixed(4)
        //         const curretPoolPriceYX = this.props.poolInfo.reserveTokenY.balance / this.props.poolInfo.reserveTokenX.balance
        //         document.getElementById('tokenYAmount').value = amountX * curretPoolPriceYX
        //         document.getElementById('poolTokenReceivable').innerText = Math.round(tokenShare * this.props.poolInfo.poolTokenSupply * 10000) / 10000
        //         document.getElementById('poolTokenShare').innerText = Math.round(tokenShare * 10000) / 100 + '%'

        //     }
        // }, 1000)
    }


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
            <div>
                <Wrapper>
                    <CustomSection>
                        <FromToTokenCard>
                            <TokenTitle>From Token X</TokenTitle>
                            {/* {this.state.tokenX} {this.state.tokenY} */}
                            <TokenSelector id="tokenX">
                                {this.createOptions(this.props.tokenList)}
                            </TokenSelector>
                            <TokenTitle>Swap Amount </TokenTitle>
                            <SwapInput id="tokenXAmount" placeholder="1.000"></SwapInput>
                        </FromToTokenCard>

                        <Divider />

                        <FromToTokenCard>
                            <TokenTitle>To Token Y</TokenTitle>
                            {/* {this.state.tokenX} {this.state.tokenY} */}
                            <TokenSelector id="tokenY">
                                {this.createOptions(this.props.tokenList)}
                            </TokenSelector>
                            <TokenTitle>Deposit Amount </TokenTitle>
                            <SwapInput style={{ backgroundColor: '#efefef' }} readOnly id="tokenYAmount" placeholder="1.000"></SwapInput>
                        </FromToTokenCard>


                    </CustomSection>

                    <CustomSection>
                        <PoolInfoCard>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Current Pool Price Y/X</div>
                                    <div>{`${this.props.poolInfo.reserveTokenX.balance} ${this.props.poolInfo.reserveTokenX.denom}`}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Letest Pool Price Y/X</div>
                                    <div>{`${this.props.poolInfo.reserveTokenY.balance} ${this.props.poolInfo.reserveTokenY.denom}`}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Current Pool Price X/X</div>
                                    <div>{Math.round((this.props.poolInfo.reserveTokenY.balance / this.props.poolInfo.reserveTokenX.balance) * 100) / 100}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Latest Swap Price X/Y</div>
                                    <div>{this.props.poolInfo.latestSwapPrice.YX}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Swap Order Price Y/X</div>
                                    <div>{Math.round((this.props.poolInfo.reserveTokenX.balance / this.props.poolInfo.reserveTokenY.balance) * 100) / 100}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Order Price Difference</div>
                                    <div>{this.props.poolInfo.latestSwapPrice.XY}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Swap Order Price X/Y</div>
                                    <div>{this.props.poolInfo.poolTokenSupply}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>

                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Expected Swap Price</div>
                                    <div>{Math.round((this.props.poolInfo.reserveTokenX.balance / this.props.poolInfo.reserveTokenY.balance) * 100) / 100}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Expected Slippage</div>
                                    <div>{this.props.poolInfo.latestSwapPrice.XY}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Expected Pool Fee</div>
                                    <div>{Math.round((this.props.poolInfo.reserveTokenX.balance / this.props.poolInfo.reserveTokenY.balance) * 100) / 100}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Exp. Receive Token</div>
                                    <div>{this.props.poolInfo.latestSwapPrice.XY}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>

                        </PoolInfoCard>
                    </CustomSection>


                </Wrapper>
                <CreateNewPoolButton onClick={this.swap}>Swap</CreateNewPoolButton>
            </div>
        )
    }
}

const CustomSection = styled.section`
   flex:1;
    display:inline-block;
`
const Wrapper = styled.div`
    display:flex;
`

const PoolInfoCard = styled.section`
width: 340px;;
display:inline-block;
border: 1px solid gray;
border-radius: 8px;
text-align:left;
padding: 20px 20px 20px 0;
`
const PoolInfoRow = styled.div`
display:flex;
margin-bottom: 20px;
`


const PoolInfoCell = styled.div`
flex: 1;
margin-left: 20px;
div:first-child {
    font-size: 12px;
    font-weight: bold;
}
div:nth-child(2) {
    margin-top: 2px;
    padding-right: 12px;
    text-align: right;
    font-weight: 700;
    font-size: 18px;
    border: 1px solid gray;
    height: 32px;
    line-height: 32px;
    border-radius: 8px;
    background-color: #efefef;
    
}
`


const FromToTokenCard = styled.section`
width: 330px;
display:inline-block;
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

const SwapInput = styled.input`
    padding: 0 12px;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    width: 300px;
    line-height: 32px;
    border: 1px solid gray;
    font-weight:700;
`
const Divider = styled.div`
    height: 20px;
    width: 50%;
    border-right: 1px solid gray;
`

const CreateNewPoolButton = styled.div`
margin: 20px auto 0 auto;
width: 100%;
cursor:pointer;
height: 40px;
border-radius: 8px;
font-size: 20px;
line-height: 40px;
color: #fff;
background-color: #ffb100;
`


export default Swap