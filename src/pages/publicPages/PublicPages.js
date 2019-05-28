import { Route } from 'react-router-dom';

import { Home } from '../home';
import { Login } from '../login';

export const PublicPages = [
  <Route
    path="/"
    exact
    component={Home}
    key="Home"
  />,

  <Route
    path="/login"
    component={Login}
    key="login"
  />
];
