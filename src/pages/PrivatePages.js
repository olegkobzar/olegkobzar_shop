import { Route, Switch, Redirect } from 'react-router-dom';

import { HomeAuth } from './homeAuth';
import { NotFound } from './notFound';

export const PrivatePages = ({ onLogin }) => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        component={HomeAuth}
      />

      <Redirect
        from="/login"
        to="/"
      />

      <Route
        component={NotFound}
      />
    </Switch>
  );
};
