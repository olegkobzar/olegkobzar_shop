import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoriesIdService } from '../../services/categoriesService';
import { setCategory } from '../../store/categories';

import './category.scss';

export class CategoryComponent extends Component {
  getCategoryProducts = () => {
    const { match, dispatch } = this.props;

    getCategoriesIdService(match.params.id)
      .then(data => dispatch(setCategory(data)));
  }

  componentDidMount() {
    this.getCategoryProducts();
  }

  render() {
    const { category } = this.props;
    const { title, products } = category;

    return (
      <div className="category">
        <Link to="/categories" className="category__back">Back to categories</Link>
        <h1>Category <span>{title}</span></h1>
        {
          products
            ? (
              <ul className="category__products">
                {
                  products.map(item => (
                    <li key={item.id} className="category__products-item">
                      <Link to={`/products/${item.id}`}>{item.title}</Link>
                    </li>
                  ))
                }
              </ul>
            )
            : <span className="category__nothing">There are no products in this category.</span>
        }
      </div>
    );
  }
}

const mapToProps = state => ({
  category: state.category
});

export const Category = connect(mapToProps)(CategoryComponent);
