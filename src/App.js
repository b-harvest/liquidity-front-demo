import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Component } from "react";
import { getPoolList } from "./common/cosmos-amm";
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
    };
  }
  componentDidMount() {
    const initGetPoolList = async () => {
      try {
        const poolList = await getPoolList();
        this.setState({ poolsData: poolList });
      } catch (error) {
        console.error(error);
      }
    };

    initGetPoolList();
    setInterval(() => {
      initGetPoolList();
    }, 5000);
  }

  render() {
    return (
      <Router>
        <BasicLayout>
          <Switch>
            <Route exact path="/">
              <Pools poolsData={this.state.poolsData} />
            </Route>
            <Route exact path="/deposit">
              <Deposit poolsData={this.state.poolsData} />
            </Route>
            <Route exact path="/withdraw">
              <Withdraw />
            </Route>
            <Route exact path="/swap">
              <Swap poolsData={this.state.poolsData} />
            </Route>
          </Switch>
        </BasicLayout>
      </Router>
    )
  }
}

export default App;
