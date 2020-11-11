import { Component } from 'react';
import styled from 'styled-components';
import Axios from "axios";
import { action, observable } from "mobx";
import { actionAsync, task } from "mobx-utils";
import { GaiaApi } from "@chainapsis/cosmosjs/gaia/api";
import { Coin } from "@chainapsis/cosmosjs/common/coin";
import { chainInfo } from "../config"

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

            const restInstance = Axios.create({
                baseURL: chainInfo.rest
            });

            const result = await restInstance.get(`/bank/balances/${this.bech32Address}`)
            console.log(result)
            if (result.status !== 200) {
                throw new Error(result.statusText);
            }
            const assets = [];
            for (const asset of result.data.result) {
                const coin = new Coin(asset.denom, asset.amount);
                assets.push(coin);
            }

            this.setState({ 
                cosmosJS,
                address: this.bech32Address, 
                assets
            });
        };
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
                </Header>
                {this.state.address}
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
background-color:#06031b;

a {
    text-decoration: none;
    color: #fff;
    width: 160px;
    display:inline-block;
    margin-top: 18px;
    border: 1px solid #fff;
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