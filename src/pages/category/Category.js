import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoriesIdService } from '../../services/categoriesService';
import { setCategory } from '../../store/categories';

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
        <h1>Category <span>{title}</span></h1>
        <ul className="category_products">
          {
            products && products.map(item => (
              <li key={item.id}>
                <Link to={`/products/${item.id}`}>{item.title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const mapToProps = state => ({
  category: state.category
});

export const Category = connect(mapToProps)(CategoryComponent);
