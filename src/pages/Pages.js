import { Route, Switch, Redirect } from 'react-router-dom';

import { HomeAuth } from './homeAuth';
import { Home } from './home';
import { Login } from './login';


export const Pages = ({ onLogin, user }) => {
  return (
    user
      ? (
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


        </Switch>
      )
      : (
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


        </Switch>
      )
  );
};
