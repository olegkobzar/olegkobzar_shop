import { Route, Redirect } from 'react-router-dom';

import { HomeAuth } from '../homeAuth';

export const PrivatePages = [
  <Route
    path="/"
    exact
    component={HomeAuth}
    key="HomeAuth"
  />,

  <Redirect
    from="/login"
    to="/"
    key="Login"
  />
];
