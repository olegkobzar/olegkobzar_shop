import { Route, Switch } from 'react-router-dom';
import { PrivatePages } from './privatePages';
import { PublicPages } from './publicPages';
import { NotFound } from './notFound';
import { Categories } from './categories';
import { Products } from './products';
import { Form } from './form';

export class Pages extends Component {
  render() {
    const { user } = this.props;

    return (
      <Switch>
        <Route
          path="/registration"
          component={Form}
          exact
        />
        <Route
          path="/categories"
          component={Categories}
          exact
        />
        <Route
          path="/categories/:id"
          exact
          component={Categories}
        />,
        <Route
          path="/products"
          exact
          component={Products}
        />,
        {
          user
            ? PrivatePages
            : PublicPages
        }
        <Route
          component={NotFound}
          exact
        />
      </Switch>
    );
  }
}
