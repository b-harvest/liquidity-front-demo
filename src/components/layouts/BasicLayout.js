import { Component } from 'react';
import styled from 'styled-components';
import { SigningCosmosClient } from '@cosmjs/launchpad'

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        window.onload = async () => {
            if (!window.getOfflineSigner || !window.keplr) {
                alert("Please install keplr extension");
            } else {
                if (window.keplr.experimentalSuggestChain) {
                    try {
                        await window.keplr.experimentalSuggestChain({
                            chainId: "HarvestAMM",
                            chainName: "HarvestAMM",
                            rpc: "https://dev.bharvest.io/rpc",
                            rest: "https://dev.bharvest.io/rest",
                            stakeCurrency: {
                                coinDenom: "stake",
                                coinMinimalDenom: "ustake",
                                coinDecimals: 6,
                            },
                            bip44: {
                                coinType: 118,
                            },
                            bech32Config: {
                                bech32PrefixAccAddr: "cosmos",
                                bech32PrefixAccPub: "cosmospub",
                                bech32PrefixValAddr: "cosmosvaloper",
                                bech32PrefixValPub: "cosmosvaloperpub",
                                bech32PrefixConsAddr: "cosmosvalcons",
                                bech32PrefixConsPub: "cosmosvalconspub"
                            },
                            currencies: [{
                                coinDenom: "stake",
                                coinMinimalDenom: "ustake",
                                coinDecimals: 6,
                            }],
                            feeCurrencies: [{
                                coinDenom: "stake",
                                coinMinimalDenom: "ustake",
                                coinDecimals: 6,
                            }],
                            coinType: 118,
                            gasPriceStep: {
                                low: 0.01,
                                average: 0.025,
                                high: 0.04
                            }
                        });
                    } catch {
                        alert("Failed to suggest the chain");
                    }
                } else {
                    alert("Please use the recent version of keplr extension");
                }
                const chainId = "HarvestAMM";
        
                await window.keplr.enable(chainId);
            
                const offlineSigner = window.getOfflineSigner(chainId);
            
                const accounts = await offlineSigner.getAccounts();
            
                const cosmJS = new SigningCosmosClient(
                    "https://dev.bharvest.io/rest",
                    accounts[0].address,
                    offlineSigner,
                );
            
                this.setState({ 
                    cosmJS,
                    address: accounts[0].address, 
                });
            }
        
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