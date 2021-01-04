import { Component } from 'react';
import styled from 'styled-components';
import { GaiaApi } from "@chainapsis/cosmosjs/gaia/api";
import { chainInfo } from "../config"

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async connectWallet() {
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
    }

    render() {
        return (
            <Layout>
                <Header>
                    <a href="/">Pool List</a>
                    <a href="/create-new-pool">Create Pool</a>
                    <a href="/deposit">Deposit</a>
                    <a href="/withdraw">Withdraw</a>
                    <a href="/swap">Swap</a>
                    <a onClick={this.connectWallet}>연결</a>
                </Header>
                <h1 style={{ marginTop: "0px" }}>{window.location.pathname.length > 2 ? window.location.pathname.substr(1).toUpperCase().replaceAll('-', ' ') : 'POOL LIST'}</h1>
                <div style={{ margin: '10px 0 40px', height: '18px' }}>{this.state.address ? `My Address : ${this.state.address}` : ''} </div>
                {this.props.children}
            </Layout>)
    }
}

const Layout = styled.div`
width: 740px;
padding-top: 120px;
margin: 0 auto;
text-align: center;
`

const Header = styled.div`
height: 80px;
width: 100%;
position:fixed;
top: 0;
left:0;
background-color:#252734;
-webkit-box-shadow: 0px 5px 11px -1px #252734; 
box-shadow: 0px 5px 11px -1px #252734;

a {
    text-decoration: none;
    color: #ffaf29;
    width: 160px;
    display:inline-block;
    margin-top: 18px;
    border: 1px solid #ffaf29;
    padding: 12px;
    &:not(:last-child) {
        margin-right: 8px;
    }
}

a:visit {
    text-decoration: none;
}
`

export default BasicLayout