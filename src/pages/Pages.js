import { Route, Switch } from 'react-router-dom';
import { PrivatePages } from './privatePages';
import { PublicPages } from './publicPages';
import { NotFound } from './notFound';
import { Category } from './category';

export class Pages extends Component {
  render() {
    const { user, onLogin } = this.props;

    return (
      <Switch>
        <Route
          path="/categories"
          render={() => <h1>Hello</h1>}
          exact
        />
        <Route
          path="/categories/:id"
          component={Category}
        />
        {
          user
            ? PrivatePages({ user })
            : PublicPages({ onLogin })
        }
        <Route
          component={NotFound}
          exact
        />
      </Switch>
    );
  }
}
