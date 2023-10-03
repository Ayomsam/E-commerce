import './App.css';
import Login from "./Components/Login.js"
import Mainpage from './Components/Mainpage';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Visitor from './Components/Visitor';

function App() {
  return (
    <div className='overflow-hidden'>
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/mainpage' component={Mainpage} />
            <Route path='/visitor' component={Visitor} />
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;

