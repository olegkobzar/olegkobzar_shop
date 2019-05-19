import { Route } from 'react-router-dom';

import { Home } from '../home';
import { Login } from '../login';

export const PublicPages = ({ onLogin }) => (
  [
    <Route
      path="/"
      exact
      component={Home}
      key="Home"
    />,

    <Route
      path="/login"
      render={props => <Login onLogin={onLogin} {...props} />}
      key="login"
    />
  ]
);
