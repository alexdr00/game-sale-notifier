import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

function SecuredRoutes({ protect, ...props }) {
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  const isAuthenticated = token;

  if (protect) {
    if (isAuthenticated) {
      return (< Route {...props}/>
      )
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  if (isAuthenticated()) {
    if (props.path === '/login') {
      return (
        <Redirect
          to={{
            pathname: '/Games'
          }}
        />
      );
    }
  }
  return <Route {...props} />;


}

export default SecuredRoutes;