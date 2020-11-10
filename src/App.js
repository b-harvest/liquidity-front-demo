import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import BasicLayout from './components/layouts/BasicLayout'
import Deposit from './components/pool/Deposit'


const tokenData = [
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





function App() {
  return (
    <BasicLayout>
      <Router>
        <Switch>
          <Route exact path="/">
            <Deposit tokenData={tokenData} />
          </Route>
        </Switch>
      </Router>
    </BasicLayout>
  );
}

export default App;
