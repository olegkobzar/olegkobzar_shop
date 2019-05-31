import { Route, Switch } from 'react-router-dom';
import { PrivatePages } from './privatePages';
import { PublicPages } from './publicPages';
import { NotFound } from './notFound';
import { Categories } from './categories';
import { Category } from './category';
import { Products } from './products';
import { AboutProduct } from './aboutProduct';
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
          component={Category}
        />,
        <Route
          path="/products"
          exact
          component={Products}
        />,
        <Route
          path="/products/:id"
          component={AboutProduct}
        />
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
