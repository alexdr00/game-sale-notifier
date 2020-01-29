import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authContext';

function SecuredRoutes({ component: Component, ...props }) {
  const authContext = useContext(AuthContext);
  const { authenticate, loading, userAuthenticate } = authContext;

  useEffect(() => {
    userAuthenticate();
  },)

  return (
    <Route {...props} render={props => !authenticate && !loading ? (
      <Redirect to="/"/>
    ) : (
      <Component {...props} />
    )}
    />
  );
}

export default SecuredRoutes;