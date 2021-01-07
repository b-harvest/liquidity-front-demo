import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
//import axios from 'axios';
import BasicLayout from './components/layouts/BasicLayout'
import PoolList from './pages/PoolList'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Swap from './pages/Swap'

const myTokenData = [
  {
    reserveOne: 'TKNA',
    reserveTwo: 'TKNB',
    myToken: {
      balance: 55,
      percentage: 17.5
    }
  },
  {
    reserveOne: 'TKNC',
    reserveTwo: 'TKND',
    myToken: {
      balance: 20,
      percentage: 7.51
    }
  },
  {
    reserveOne: 'TKNE',
    reserveTwo: 'TKNF',
    myToken: {
      balance: 15,
      percentage: 1.5
    }
  }
]

const tokenList = [
  'ATOM',
  'IRIS',
  'SCRT',
  'AMM'
]

const poolInfo = {
  reserveTokenX: {
    denom: 'USDT',
    balance: 4520,
  },
  reserveTokenY: {
    denom: 'ATOM',
    balance: 1000,
  },
  latestSwapPrice: {
    XY: 0.2212,
    YX: 0.2217
  },
  poolTokenSupply: 100
}

const withdrawInfo = {
  pools: ['ATOM-USDT', "ATOM-USDC"],
  myPoolToken: 10
}





function App() {
  return (
    <Router>
      <BasicLayout>
        <Switch>
          <Route exact path="/">
            <PoolList myTokenData={myTokenData} />
          </Route>
          <Route exact path="/deposit">
            <Deposit tokenList={tokenList} poolInfo={poolInfo} />
          </Route>
          <Route exact path="/withdraw">
            <Withdraw tokenList={tokenList} withdrawInfo={withdrawInfo} poolInfo={poolInfo} />
          </Route>
          <Route exact path="/swap">
            <Swap tokenList={tokenList} poolInfo={poolInfo} />
          </Route>
        </Switch>
      </BasicLayout>
    </Router>
  );
}

export default App;
