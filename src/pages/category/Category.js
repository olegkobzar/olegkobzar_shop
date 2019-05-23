import { Link } from 'react-router-dom';

import { server } from '../../services';

export class Category extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    server.get('public/categories')
      .then(categories => this.setState({ categories }));
  }

  render() {
    const { categories } = this.state;

    return (
      <>
        <h1>Categories</h1>
        <ul>
          {
            categories.map(item => (
              <li key={item.title}>
                <Link to={`categories/${item.id}`}>{item.title}</Link>
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}
