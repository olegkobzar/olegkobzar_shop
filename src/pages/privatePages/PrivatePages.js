import { Route, Redirect } from 'react-router-dom';

import { HomeAuth } from '../homeAuth';

export const PrivatePages = ({ user }) => (
  [
    <Route
      path="/"
      exact
      render={() => <HomeAuth user={user} />}
      key="HomeAuth"
    />,

    <Redirect
      from="/login"
      to="/"
      key="Login"
    />
  ]
);
