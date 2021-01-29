
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import { SharedDataContext } from './context/app/SharedData'

import { createBrowserHistory } from 'history';
import { Component } from "react";
import { getPoolList, getWalletTokenList } from "./common/cosmos-amm";
import { getTokenIndexer, toastGenerator } from "./common/global-functions";

import BasicLayout from "./components/layouts/BasicLayout";
import Pools from "./pages/Pools";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Swap from "./pages/Swap";

import { ToastContainer, Flip } from "react-toastify";
require('dotenv').config()

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sharedData: {
				poolsData: null,
				walletTokenList: null,
				tokenIndexer: null
			},
			prevWalletData: null,
			prevWalletDataHash: null,
			isWalletEvent: false,
			walletEvents: []
		};
	}
	componentDidMount() {
		localStorage.clear()

		const initGetExcData = async () => {
			const digest = async ({ algorithm = "SHA-256", message }) => Array.prototype.map.call(new Uint8Array(await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))), (x) => ("0" + x.toString(16)).slice(-2)).join("");
			try {
				const poolList = await getPoolList();
				let walletTokenList = null;
				let tokenIndexer = null;

				if (localStorage.walletAddress) {
					walletTokenList = await getWalletTokenList();
					tokenIndexer = await getTokenIndexer(walletTokenList);
				}

				if (this.state.prevWalletData !== null) {
					digest({ message: JSON.stringify(walletTokenList) }).then((hash) => {
						if (this.state.prevWalletDataHash !== null) {
							if (hash !== this.state.prevWalletDataHash) {
								console.log("Wallet Change");

								if (walletTokenList?.length !== this.state.prevWalletData.length) {
									toastGenerator("success", "🦄  Tx Success!");
									this.setState({ isWalletEvent: true });
								} else {
									let counter = 0;
									walletTokenList.map((item, index) => {
										if (item.amount !== this.state.prevWalletData[index].amount) {
											console.log(item.denom, (Number(item.amount) - Number(this.state.prevWalletData[index].amount)) / 1000000);
											console.log(this.state.prevWalletData[index]);
											counter += 1;
											// alert(item.denom)
										}
										return "";
									});
									console.log("counter", counter);
									if (counter > 1) {
										toastGenerator("success", "🦄  Tx Success!");
										this.setState({ isWalletEvent: true });
									} else {
										toastGenerator("error", "😅 Tx Failed");
									}
								}
							}
						}

						this.setState({
							prevWalletData: walletTokenList,
							prevWalletDataHash: hash,
							render: false
						});
					});

					// console.log(prevWalletData)
					// prevWalletData.map((item, index) => {

					//   return ''
					// })
				} else {
					this.setState({
						prevWalletData: walletTokenList,
						render: false
					});
				}
				this.setState({
					sharedData: {
						poolsData: poolList,
						walletTokenList: walletTokenList,
						tokenIndexer: tokenIndexer
					},
					render: true,
				});
			} catch (error) {
				console.error(error);
			}
		};

		initGetExcData();
		setInterval(() => {
			initGetExcData();
		}, 5000);

		//GA
		if (window.location.host === "swap.bharvest.io") {
			const history = createBrowserHistory();
			let trackingId = process.env.REACT_APP_GA_KEY

			ReactGA.initialize(trackingId);

			// Initialize google analytics page view tracking
			history.listen(location => {
				ReactGA.set({ page: location.pathname }); // Update the user's current page
				ReactGA.pageview(location.pathname); // Record a pageview for the given page
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.render) {
			return true
		} else {
			return false
		}
	}

	walletEventHandler = () => {
		this.setState({ isWalletEvent: !this.state.isWalletEvent });
	};

	render() {
		return (
			<Router>
				<div id="mobileView">
					<img src="/assets/small-screen-sign.png" alt="small screen info"></img>
					<div>The interface will soon be updated to support mobile and tablet screens. Please access the demo from a desktop in the meantime. Thanks!</div>
				</div>
				<SharedDataContext.Provider value={this.state.sharedData}>
					<BasicLayout data={this.state.sharedData} isWalletEvent={this.state.isWalletEvent} walletEventHandler={this.walletEventHandler}>
						<Switch>
							<Route exact path="/">
								<Pools data={this.state.sharedData} />
							</Route>
							<Route exact path="/deposit">
								<Deposit data={this.state.sharedData} />
							</Route>
							<Route exact path="/withdraw">
								<Withdraw data={this.state.sharedData} />
							</Route>
							<Route exact path="/swap">
								<Swap data={this.state.sharedData} />
							</Route>
						</Switch>
					</BasicLayout>
				</SharedDataContext.Provider>
				<ToastContainer limit={1} transition={Flip} position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			</Router>
		);
	}
}

export default App;
