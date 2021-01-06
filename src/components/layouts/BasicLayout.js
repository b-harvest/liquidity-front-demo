import { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { GaiaApi } from "@chainapsis/cosmosjs/gaia/api";
import { chainInfo } from "../../common/config"
import Axios from 'axios';

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStyle: {
                borderBottom: "solid 4px #4297ff"
            },
            isSent: false
        };
    }

    componentDidMount() {
        window.onload = async () => {
            if (!window.cosmosJSWalletProvider) {
                alert("Please install the Keplr extension");
                return;
            }

            if (!window.keplr?.experimentalSuggestChain) {
                alert("Please use the latest version of Keplr extension");
                return;
            }

            await window.keplr.experimentalSuggestChain(chainInfo);

            const cosmosJS = new GaiaApi({
                chainId: chainInfo.chainId,
                rpc: chainInfo.rpc,
                rest: chainInfo.rest,
                walletProvider: window.cosmosJSWalletProvider
            });

            await cosmosJS.enable();

            const keys = await cosmosJS.getKeys();

            if (keys.length === 0) {
                throw new Error("there is no key");
            }
            this.bech32Address = keys[0].bech32Address;

            localStorage.setItem('walletAddress', this.bech32Address)

            this.setState({
                cosmosJS,
                address: this.bech32Address,
            });
        };
    }

    getModifiedAddress = (address) => {
        return `${address.substr(0, 10)}...${address.substr(-5)}`
    }

    sendFaucetRequest = async () => {
        try {
            alert('send a request! it takes about 10 seconds :)')
            this.setState({ isSent: true })
            const response = await Axios.get(`https://dev.bharvest.io/faucet/?address=${localStorage.getItem('walletAddress')}`)
            alert('Faucet request complete!')
            this.setState({ isSent: false })
            console.log('Faucet response', response)
        } catch (error) {
            alert(error)
            this.setState({ isSent: false })
            console.log(error)
        }
    }

    render() {
        return (
            <Layout>
                <Header>
                    <NavLink exact to={"/"} activeStyle={this.state.activeStyle}>Pools</NavLink>
                    <NavLink exact to={"/swap"} activeStyle={this.state.activeStyle}>Swap</NavLink>
                    <NavLink exact to={"/deposit"} activeStyle={this.state.activeStyle}>Deposit</NavLink>
                    <NavLink exact to={"/withdraw"} activeStyle={this.state.activeStyle}>Withdraw</NavLink>
                    <span onClick={this.sendFaucetRequest} style={this.state.isSent ? { color: "#a7a7a7", pointerEvents: "none" } : {}}>{this.state.isSent ? "Wait 💸" : "Faucet 💸"}</span>
                    <Connect>{this.state.address ? `${this.getModifiedAddress(this.state.address)}` : 'CONNECT WALLET'} </Connect>
                </Header>

                { this.props.children}
            </Layout >)
    }
}

const Layout = styled.div`
width: 740px;
padding-top: 120px;
margin: 0 auto;
text-align: center;
`

const Header = styled.header`
text-align:right;
height: 120px;
width: 100%;
position:fixed;
top: 0;
left:0;
background-color:#fff;

a {
    text-decoration: none;
    text-align:center;
    font-weight: bold;
    color:#222;
    display:inline-block;
    cursor:pointer;
    margin-top: 18px;
    padding: 12px;
    &:not(:last-child) {
        margin-right: 40px;
    }
}

span {
    display:inline-block;
    text-decoration: none;
    text-align:center;
    font-weight: bold;
    color:#222;
    display:inline-block;
    cursor:pointer;
    margin-top: 18px;
    padding: 12px;
    &:not(:last-child) {
        margin-right: 40px;
    }
}

a:visit {
    text-decoration: none;
}
`

const Connect = styled.div`
width:200px;
display:inline-block;
margin-bottom:-18px;
margin-right: 12px;
border-radius:24px;
height: 42px;
border: 50%;
background-color:#4297ff;
cursor:pointer;
line-height:42px;
text-align:center;
color:#fff;
font-weight:bold;
`

export default BasicLayout