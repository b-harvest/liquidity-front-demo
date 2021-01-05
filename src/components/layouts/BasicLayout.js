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
                borderBottom: "solid 2px #4297ff"
            }
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

        const test = async () => {
            // console.log(window.keplr.getKey())
            try {
                const response = await Axios.get('https://dev.bharvest.io/faucet/?address=cosmos1wlfjwg3ff8fy7qhut3eaj4agm8qpnw5ug7qjen')
                console.log('response', response)
            } catch (error) {
                console.error("getPoolList", error)
            }
        }
        // test()

    }


    // async connectWallet() {
    //     if (!window.cosmosJSWalletProvider) {
    //         alert("Please install the Keplr extension");
    //         return;
    //     }

    //     if (!window.keplr?.experimentalSuggestChain) {
    //         alert("Please use the latest version of Keplr extension");
    //         return;
    //     }

    //     await window.keplr.experimentalSuggestChain(chainInfo);

    //     const cosmosJS = new GaiaApi({
    //         chainId: chainInfo.chainId,
    //         rpc: chainInfo.rpc,
    //         rest: chainInfo.rest,
    //         walletProvider: window.cosmosJSWalletProvider
    //     });

    //     await cosmosJS.enable();

    //     const keys = await cosmosJS.getKeys();

    //     if (keys.length === 0) {
    //         throw new Error("there is no key");
    //     }
    //     this.bech32Address = keys[0].bech32Address;

    //     localStorage.setItem('walletAddress', this.bech32Address)

    //     this.setState({
    //         cosmosJS,
    //         address: this.bech32Address,
    //     });
    // }
    getModifiedAddress = (address) => {
        return `${address.substr(0, 10)}...${address.substr(-5)}`
    }

    render() {
        return (
            <Layout>
                <Header>

                    <NavLink exact to={"/"} activeStyle={this.state.activeStyle}>Pools</NavLink>
                    <NavLink exact to={"/create-new-pool"} activeStyle={this.state.activeStyle}>Create Pool</NavLink>
                    <NavLink exact to={"/deposit"} activeStyle={this.state.activeStyle}>Deposit</NavLink>
                    <NavLink exact to={"/withdraw"} activeStyle={this.state.activeStyle}>Withdraw</NavLink>
                    <NavLink exact to={"/swap"} activeStyle={this.state.activeStyle}>Swap</NavLink>
                    <Connect>{this.state.address ? `${this.getModifiedAddress(this.state.address)}` : 'CONNECT WALLET'} </Connect>

                </Header>
                <h1 style={{ marginTop: "0px" }}>{window.location.pathname.length > 2 ? window.location.pathname.substr(1).toUpperCase().replaceAll('-', ' ') : 'POOL LIST'}</h1>
                <div style={{ margin: '10px 0 40px', height: '18px' }}></div>
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
    margin-top: 18px;
    padding: 12px;
    &:not(:last-child) {
        margin-right: 20px;
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