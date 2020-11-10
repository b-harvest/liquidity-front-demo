import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import BasicLayout from './components/layouts/BasicLayout'
import PoolList from './components/pool/PoolList'
import CreateNewPool from './components/pool/CreateNewPool'

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
  'Token X',
  'Token Y',
  'Token Z'
]






function App() {
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
        </Switch>
      </Router>
    </BasicLayout>
  );
}

export default App;
