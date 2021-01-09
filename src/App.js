import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Component } from "react";
import { getPoolList, getWalletTokenList } from "./common/cosmos-amm";
import BasicLayout from './components/layouts/BasicLayout'
import Pools from './pages/Pools'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Swap from './pages/Swap'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poolsData: null,
      walletTokenList: null,
    };
  }
  componentDidMount() {
    const initGetExcData = async () => {
      try {
        const poolList = await getPoolList();
        let walletTokenList = null;
        if (localStorage.walletAddress) {
          walletTokenList = await getWalletTokenList();
        }
        this.setState({ poolsData: poolList, walletTokenList: walletTokenList });
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
        <BasicLayout walletTokenList={this.state.SwapwalletTokenList}>
          <Switch>
            <Route exact path="/">
              <Pools poolsData={this.state.poolsData} walletTokenList={this.state.walletTokenList} />
            </Route>
            <Route exact path="/deposit">
              <Deposit poolsData={this.state.poolsData} walletTokenList={this.state.walletTokenList} />
            </Route>
            <Route exact path="/withdraw">
              <Withdraw poolsData={this.state.poolsData} walletTokenList={this.state.walletTokenList} />
            </Route>
            <Route exact path="/swap">
              <Swap poolsData={this.state.poolsData} walletTokenList={this.state.walletTokenList} />
            </Route>
          </Switch>
        </BasicLayout>
      </Router>
    )
  }
}

export default App;
