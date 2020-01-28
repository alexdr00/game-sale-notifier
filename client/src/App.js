import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Games from './components/Games/Games';
import AuthState from './context/authState';
import tokenAuth from './config/token';
import SecuredRoutes from './components/routes/SecuredRoutes';

const token = localStorage.getItem('token');
if(token) {
    tokenAuth(token);
}


function App() {

  return (
      <AuthState>
        <Router>
          <Header/>
            <Switch>
              <Route exact path = "/" component ={Login}/>
              <Route exact path = "/Register" component ={Register}/>
              <SecuredRoutes exact path = "/Games" component = {Games}/>
            </Switch>
        </Router>
      </AuthState>

  );
}

export default App;
