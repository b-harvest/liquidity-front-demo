import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import { SharedDataContext } from './context/app/SharedData'
import { useEffect, useMemo, useState } from "react";
import { getWalletTokenList, usePoolListInterval } from "./common/cosmos-amm";
import { getTokenIndexer, toastGenerator } from "./common/global-functions";

import BasicLayout from "./components/layouts/BasicLayout";
import Pools from "./pages/Pools/Pools";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Swap from "./pages/Swap";

import { ToastContainer, Flip } from "react-toastify";
require('dotenv').config()


function App() {

	const [sharedData, setSharedData] = useState({ poolsData: null, walletTokenList: null, tokenIndexer: null })
	const [prevWalletData, setPrevWalletData] = useState(null)
	const [prevWalletDataHash, setPrevWalletDataHash] = useState(null)
	const [isWalletEvent, setIsWalletEvent] = useState(false)
	// const [walletEvents, setWalletEvents] = useState([])

	const [data, error] = usePoolListInterval()

	useEffect(() => {
		initGetExcData(data)
	}, [data]) // eslint-disable-line react-hooks/exhaustive-deps

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

	async function initGetExcData(poolListData) {
		const digest = async ({ algorithm = "SHA-256", message }) => Array.prototype.map.call(new Uint8Array(await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))), (x) => ("0" + x.toString(16)).slice(-2)).join("");
		try {
			const poolList = poolListData
			let walletTokenList = null;
			let tokenIndexer = null;

			if (localStorage.walletAddress) {
				walletTokenList = await getWalletTokenList();
				tokenIndexer = getTokenIndexer(walletTokenList);
			}

			console.log('prevWalletData', prevWalletData)
			console.log('prevWalletDataHash', prevWalletDataHash)

			if (prevWalletData !== null) {
				digest({ message: JSON.stringify(walletTokenList) }).then((hash) => {
					if (prevWalletDataHash !== null) {
						if (hash !== prevWalletDataHash) {
							console.log("Wallet Change")

							if (walletTokenList?.length !== prevWalletData.length) {
								toastGenerator("success", "🦄  Tx Success!")
								setIsWalletEvent(true)
							} else {
								let counter = 0;
								walletTokenList.map((item, index) => {
									if (item.amount !== prevWalletData[index].amount) {
										console.log(item.denom, (Number(item.amount) - Number(prevWalletData[index].amount)) / 1000000);
										console.log(prevWalletData[index]);
										counter += 1;
										// alert(item.denom)
									}
									return "";
								});
								console.log("counter", counter);
								if (counter > 1) {
									toastGenerator("success", "🦄  Tx Success!");
									setIsWalletEvent(true)
								} else {
									toastGenerator("error", "😅 Tx Failed");
								}
							}
						}
					}
					setPrevWalletData(walletTokenList)
					setPrevWalletDataHash(hash)
				});

				// console.log(prevWalletData)
				// prevWalletData.map((item, index) => {

				//   return ''
				// })

			} else {
				setPrevWalletData(walletTokenList)
			}

			setSharedData({
				poolsData: poolList,
				walletTokenList: walletTokenList,
				tokenIndexer: tokenIndexer
			})


		} catch (error) {
			console.error(error);
		}
	};

	function walletEventHandler() {
		setIsWalletEvent(!isWalletEvent)
	};
	console.log('render')
	return useMemo(() => {
		return (<Router>
			{/* <div id="mobileView">
					<img src="/assets/small-screen-sign.png" alt="small screen info"></img>
					<div>The interface will soon be updated to support mobile and tablet screens. Please access the demo from a desktop in the meantime. Thanks!</div>
				</div> */}
			<SharedDataContext.Provider value={sharedData}>
				<BasicLayout data={sharedData} isWalletEvent={isWalletEvent} walletEventHandler={walletEventHandler}>
					<Switch>
						<Route exact path="/">
							<Pools />
						</Route>
						<Route exact path="/swap">
							<Swap data={sharedData} />
						</Route>
						<Route exact path="/deposit">
							<Deposit data={sharedData} />
						</Route>
						<Route exact path="/withdraw">
							<Withdraw data={sharedData} />
						</Route>
					</Switch>
				</BasicLayout>
			</SharedDataContext.Provider>
			<ToastContainer limit={1} transition={Flip} position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
		</Router>
		)
	}, [sharedData]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default App;