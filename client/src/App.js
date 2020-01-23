import React from 'react';
import Header from './components/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
  <Router>
    <Header/>
    <div className="container">
      <Switch>
        <Route exact path = "/" component ={Login}/>
        <Route exact path = "/Register" component ={Register}/>
      </Switch>

    </div>
  </Router>
  );
}

export default App;
