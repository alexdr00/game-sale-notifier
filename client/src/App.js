import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Games from './components/Games/Games';
import AuthState from './context/authState';
import tokenAuth from './config/token';
import SecuredRoutes from './components/routes/SecuredRoutes';

const setTokenAuth = localStorage.getItem('token');
if (setTokenAuth) {
  tokenAuth(setTokenAuth);
}

function App() {

  return (
    <AuthState>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Register" component={Register}/>
          <SecuredRoutes protect exact path="/Games" component={Games}/>
        </Switch>
      </Router>
    </AuthState>
  );
}

export default App;
