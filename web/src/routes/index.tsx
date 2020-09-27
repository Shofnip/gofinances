import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import NewTransaction from '../pages/NewTransaction';
import Import from '../pages/Import';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/new-transaction" component={NewTransaction} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
