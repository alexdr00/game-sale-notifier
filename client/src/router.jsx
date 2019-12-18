import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/auth" component={() => <div>example</div>} />
    </Switch>
  );
};

export default Router;
