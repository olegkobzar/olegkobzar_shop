import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategoriesService } from '../../services/categoriesService';
import { setCategories } from '../../store/categories';

export class CategoriesComponent extends Component {
  componentDidMount() {
    getCategoriesService()
      .then(categories => this.props.dispatch(setCategories(categories)));
  }

  render() {
    const { categories } = this.props;

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

const mapToProps = state => ({
  categories: state.categories
});

export const Categories = connect(mapToProps)(CategoriesComponent);
