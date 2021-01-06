import { Component } from 'react';
import styled from 'styled-components';

class Withdraw extends Component {

    // 로직 함수 시작
    withdraw() {
        const amountX = document.getElementById('ReserveTokenX').innerText
        const amountY = document.getElementById('ReserveTokenY').innerText

        alert(`출금량\nTokenX: ${amountX}\nTokenY: ${amountY}`)
        //여기서 작업하시면 됩니다 😄

    }
    // 로직 함수 끝

    componentDidMount() {
        // setInterval(() => {
        //     const myPoolTokenWidrawAmount = Number(document.getElementById('withdrawAmount').value)
        //     if (myPoolTokenWidrawAmount) {
        //         const myShare = myPoolTokenWidrawAmount / this.props.poolInfo.poolTokenSupply
        //         document.getElementById('ReserveTokenX').innerText = this.props.poolInfo.reserveTokenX.balance * myShare
        //         document.getElementById('ReserveTokenY').innerText = this.props.poolInfo.reserveTokenY.balance * myShare
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
                        <ReserveTokenCard>
                            <TokenTitle>Pool Token</TokenTitle>
                            {/* {this.state.tokenX} {this.state.tokenY} */}
                            <TokenSelector id="tokenX">
                                {this.createOptions(this.props.withdrawInfo.pools)}
                            </TokenSelector>
                            <TokenTitle>Withdraw Amount </TokenTitle>
                            <WithdrawInput id="withdrawAmount" placeholder="1.000"></WithdrawInput>
                            <PoolTokenInfo>
                                <div>Your Balance:</div>
                                <div>{this.props.withdrawInfo.myPoolToken}</div>
                            </PoolTokenInfo>
                        </ReserveTokenCard>




                    </CustomSection>

                    <CustomSection>
                        <PoolInfoCard>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Reserve Token X</div>
                                    <div>{`${this.props.poolInfo.reserveTokenX.balance} ${this.props.poolInfo.reserveTokenX.denom}`}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Reserve Token Y</div>
                                    <div>{`${this.props.poolInfo.reserveTokenY.balance} ${this.props.poolInfo.reserveTokenY.denom}`}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Current Pool Price Y/X</div>
                                    <div>{Math.round((this.props.poolInfo.reserveTokenY.balance / this.props.poolInfo.reserveTokenX.balance) * 100) / 100}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Latest Swap Price Y/X</div>
                                    <div>{this.props.poolInfo.latestSwapPrice.YX}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Current Pool Price X/Y</div>
                                    <div>{Math.round((this.props.poolInfo.reserveTokenX.balance / this.props.poolInfo.reserveTokenY.balance) * 100) / 100}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div>Latest Swap Price X/Y</div>
                                    <div>{this.props.poolInfo.latestSwapPrice.XY}</div>
                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div>Pool Token Supply</div>
                                    <div>{this.props.poolInfo.poolTokenSupply}</div>
                                </PoolInfoCell>
                                <PoolInfoCell>

                                </PoolInfoCell>
                            </PoolInfoRow>
                            <PoolTokenH2>{`Expected Reserve Token Receivalble`} </PoolTokenH2>
                            <PoolInfoRow>
                                <PoolInfoCell>
                                    <div></div>
                                    <div id="ReserveTokenX">0</div>
                                </PoolInfoCell>
                                <PoolInfoCell>
                                    <div></div>
                                    <div id="ReserveTokenY">0</div>
                                </PoolInfoCell>
                            </PoolInfoRow>

                        </PoolInfoCard>
                    </CustomSection>


                </Wrapper>
                <CreateNewPoolButton onClick={this.withdraw}>Withdraw</CreateNewPoolButton>
            </div>
        )
    }
}

const PoolTokenInfo = styled.div`
display:flex;
margin-top: 12px;
div {
    display:inline-block;
    flex: 1;
}

div:nth-child(2) {
    color:#ffb100;
    text-align: right;
    padding-right: 6px;
    font-weight: bold;
    
}
`

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
height: 350px;
`
const PoolInfoRow = styled.div`
display:flex;
margin-bottom: 20px;
`

const PoolTokenH2 = styled.div`
padding-left: 20px;
font-size: 12px;
font-weight: bold;
margin-bottom: 4px;
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


const ReserveTokenCard = styled.section`
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

const WithdrawInput = styled.input`
    padding: 0 12px;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    width: 300px;
    line-height: 32px;
    border: 1px solid gray;
    font-weight:700;
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


export default Withdraw