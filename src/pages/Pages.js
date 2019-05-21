import { Route, Switch } from 'react-router-dom';
import { PrivatePages } from './privatePages';
import { PublicPages } from './publicPages';
import { NotFound } from './notFound';
import { Category } from './category';
import { Products } from './products';

export class Pages extends Component {
  render() {
    const { user, onLogin } = this.props;

    return (
      <Switch>
        <Route
          path="/categories"
          component={Category}
          exact
        />
        <Route
          path="/categories/:id"
          exact
          component={Category}
        />,
        <Route
          path="/products"
          exact
          component={Products}
        />,
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
