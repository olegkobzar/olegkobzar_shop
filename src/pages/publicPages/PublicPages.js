import { Route, Switch } from 'react-router-dom';

import { Home } from '../home';
import { Login } from '../login';
import { NotFound } from '../notFound';

export const PublicPages = ({ onLogin }) => (
  <Switch>
    <Route
      path="/"
      exact
      component={Home}
    />

    <Route
      path="/login"
      render={props => <Login onLogin={onLogin} {...props} />}
    />

    <Route
      component={NotFound}
    />
  </Switch>
);
