import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import BasicLayout from './components/layouts/BasicLayout'
import Pools from './pages/Pools'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Swap from './pages/Swap'

function App() {
  return (
    <Router>
      <BasicLayout>
        <Switch>
          <Route exact path="/">
            <Pools />
          </Route>
          <Route exact path="/deposit">
            <Deposit />
          </Route>
          <Route exact path="/withdraw">
            <Withdraw />
          </Route>
          <Route exact path="/swap">
            <Swap />
          </Route>
        </Switch>
      </BasicLayout>
    </Router>
  )
}

export default App;
