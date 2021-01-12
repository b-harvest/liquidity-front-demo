import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Component } from "react";
import { getPoolList, getWalletTokenList } from "./common/cosmos-amm";
import { getTokenIndexer } from "./common/global-functions";

import BasicLayout from "./components/layouts/BasicLayout";
import Pools from "./pages/Pools";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Swap from "./pages/Swap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedData: {
        poolsData: null,
        walletTokenList: null,
        tokenIndexer: null
      }
    };
  }
  componentDidMount() {
    const initGetExcData = async () => {
      try {
        const poolList = await getPoolList();
        let walletTokenList = null;
        let tokenIndexer = null;
        if (localStorage.walletAddress) {
          walletTokenList = await getWalletTokenList();
          tokenIndexer = await getTokenIndexer(walletTokenList);
        }
        this.setState({
          sharedData: {
            poolsData: poolList,
            walletTokenList: walletTokenList,
            tokenIndexer: tokenIndexer
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    initGetExcData();
    setInterval(() => {
      initGetExcData();
    }, 5000);
  }

  render() {
    return (
      <Router>
        <div id="mobileView">
          <div>
            The interface will soon be updated to support mobile and tablet
            screens. Please access the demo from a desktop in the meantime.
            Thanks!
					</div>
        </div>
        <BasicLayout data={this.state.sharedData}>
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
      </Router>
    );
  }
}

export default App;
