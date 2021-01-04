import { Component } from 'react';
import styled from 'styled-components';
const { SigningCosmosClient, coins, coin } = require("@cosmjs/launchpad");

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
        let amountX = document.getElementById('tokenXAmount').value
        let amountY = document.getElementById('tokenYAmount').value

        alert(`TokenX: ${tokenX} / ${amountX}\nTokenY: ${tokenY} / ${amountY}`)
        amountX *= 1000000;
        amountX = Math.floor(amountX);

        amountY *= 1000000;
        console.log(amountY);
        amountY = Math.floor(amountY);
        console.log(amountY);
        (async () => {
            // See above.
            const chainId = "HarvestAMM";
            await window.keplr.enable(chainId);
            const offlineSigner = window.getOfflineSigner(chainId);

            const accounts = await offlineSigner.getAccounts();

            // Initialize the gaia api with the offline signer that is injected by Keplr extension.
            const cosmJS = new SigningCosmosClient(
                "https://dev.bharvest.io/rest/",
                accounts[0].address,
                offlineSigner
            );
            const MsgCreateLiquidityPool = {
                type: "liquidity/MsgCreateLiquidityPool",
                value: {
                    pool_creator_address: accounts[0].address,
                    pool_type_index: 1,
                    reserve_coin_denoms: ["uiris", "uscrt"],
                    deposit_coins: [coin(100000000, "uiris"), coin(100000000, "uscrt")]
                },
            };
            const fee = {
                amount: coins(2000, "uatom"),
                gas: "180000",
            };
            console.log(MsgCreateLiquidityPool);
            alert('result 전')
            // const result2 = await cosmJS.signAndBroadcast([MsgCreateLiquidityPool], fee)
            cosmJS.signAndBroadcast([MsgCreateLiquidityPool], fee).then((res) => { console.log(res) })
                .catch((e => console.log(e)))
            const result2 = 'test'
            console.log(result2);

            if (result2.code !== undefined &&
                result2.code !== 0) {
                alert("Failed to send tx: " + result2.log || result2.rawLog);
            } else {
                alert("Succeed to send tx");
            }
        })();

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