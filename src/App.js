import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
//import axios from 'axios';
import BasicLayout from './components/layouts/BasicLayout'
import PoolList from './components/pool/PoolList'
import CreateNewPool from './components/pool/CreateNewPool'
import Deposit from './components/pool/Deposit'
import Withdraw from './components/pool/Withdraw'
import Swap from './components/pool/Swap'
import { test } from './protoClient'

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
  test()
  return (
    <BasicLayout>
      <Router>
        <Switch>
          <Route exact path="/">
            <PoolList myTokenData={myTokenData} />
          </Route>
          <Route exact path="/create-new-pool">
            <CreateNewPool tokenList={tokenList} />
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
      </Router>
    </BasicLayout>
  );
}

export default App;
