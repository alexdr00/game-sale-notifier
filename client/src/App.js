import React from 'react';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Games from './components/Games/Games';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {

  return (
  <Router>
    <Header/>
    <div className="container">
      <Switch>
        <Route exact path = "/" component ={Login}/>
        <Route exact path = "/Register" component ={Register}/>
        <Route exact path = "/Games" component = {Games}/>

      </Switch>

    </div>
  </Router>
  );
}

export default App;
