import { Component } from "react";
import styled from "styled-components";
import CoinImgShower from "../elements/CoinImageShower"
import BlackOverLay from "./overlays/BlackOverLay";
import { getPoolToken } from "../common/global-functions";
class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolTokenIndexer: {}
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {


    }

    getPoolTokenIndexer = () => {
        let poolTokenIndexer = {}
        if (this.props.data.poolsData !== null) {
            getPoolToken(this.props.data.poolsData, this.props.data.walletTokenList).forEach(ele => {
                poolTokenIndexer[ele.coinMinimalDenom] = ele.coinDenom
            })
            return poolTokenIndexer
        }
    }


    createTokenList = (data) => {
        console.log(data)
        if (data === null) {
            return <div></div>
        }
        return data.map((item, index) => {
            const denom = String(item.denom).substr(1)
            return (<TokenRow key={index}>
                <TokenImage>
                    <CoinImgShower coin={denom} />
                </TokenImage>
                <TokenInfo>
                    <div>{denom.length > 10 ? this.getPoolTokenIndexer()[item.denom] : denom.toUpperCase()}</div>
                    <div>{this.props.data.tokenIndexer[item.denom] / 1000000} {denom.length > 10 ? '' : denom}</div>
                </TokenInfo>

            </TokenRow>)
        })

    }

    render() {
        return (
            <>
                <BlackOverLay modalHandler={this.props.modalHandler}></BlackOverLay>
                <WalletWrapper>
                    <WalletHeader>
                        <h2>My Address</h2>
                        <div style={{ fontSize: "13px" }}>{localStorage.walletAddress}</div>
                    </WalletHeader>
                    <ListHeader>Tokens</ListHeader>
                    <TokenWrapper>
                        {this.createTokenList(this.props.data.walletTokenList)}
                    </TokenWrapper>

                    <ListHeader style={{ marginTop: '20px' }}>Recent Event</ListHeader>
                    <EventWrapper>
                        {this.createTokenList(this.props.data.walletTokenList)}
                    </EventWrapper>
                    <div onClick={this.props.modalHandler} style={{ display: "inline-block", margin: "30px auto", color: "darkgray", cursor: "pointer" }}>CLOSE</div>
                </WalletWrapper>
            </>
        )


    }
}

const WalletWrapper = styled.div`
position: fixed;
bottom: 0;
left: 0;

padding: 0 20px;
width: 380px;
height: 100%;
background-color: #fff;
transition: all 1s;

overflow:scroll;
&::-webkit-scrollbar {
    display: none;
}
  
& {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

animation-name: slidein;
animation-duration: 0.2s;

@keyframes slidein {
    from {
      margin-left: -500px;
    }
  
    to {
      margin-left: 0;
    }
  }
`

const WalletHeader = styled.div`
margin:20px 12px;
`

const TokenWrapper = styled.div`
height: 420px;
overflow:scroll;

border-radius: 12px;
border-top-left-radius: 0;
border-top-right-radius: 0;
box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);

h3 {
    padding: 12px;
    text-align: left;
    margin: 0;
    background-color:rgba(255,170,13,0.15);
}

&::-webkit-scrollbar {
    display: none;
}
  
& {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
`

const TokenRow = styled.div`
position: relative;
width: 100%;
height: 60px;
background-color:#fff;

&:not(:last-child) {
    border-bottom: 1px solid #cacaca;
}
`

const TokenImage = styled.div`
display: inline-block;
position: absolute;
top: 15px;
left: 12px;
`

const TokenInfo = styled(TokenImage)`
left: 60px;
top: 12px;

text-align: left;
div:nth-child(2) {
    color:#8e8e8e;
    font-size: 14px;
    font-weight: 300;
}
`

const ListHeader = styled.h3`
background-color:rgba(255,170,13,0.15);
margin: 0;
padding: 12px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2);
border-top-left-radius: 12px;
border-top-right-radius: 12px;
`

const EventWrapper = styled(TokenWrapper)`
height: 150px;
`

export default Wallet;
