import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategoriesService } from '../../services/categoriesService';
import { setCategories } from '../../store/categories';

import './categories.scss';

export class CategoriesComponent extends Component {
  componentDidMount() {
    getCategoriesService()
      .then(categories => this.props.dispatch(setCategories(categories)));
  }

  render() {
    const { categories, user } = this.props;

    return (
      <div className="categories">
        <h1>Categories</h1>
        <div className="categories__wrap">
          <div className="categories__col">
            <h4>Published categories</h4>
            <ul>
              {
                categories.map(item => (
                  item.published && (
                    <li key={item.title}>
                      <Link to={`categories/${item.id}`}>{item.title}</Link>
                    </li>
                  )
                ))
              }
            </ul>
          </div>
          {
            user && (
              <div className="categories__col">
                <h4>Categories</h4>
                <ul>
                  {
                    categories.map(item => (
                      !item.published && (
                        <li key={item.title}>
                          <Link to={`categories/${item.id}`}>{item.title}</Link>
                        </li>
                      )
                    ))
                  }
                </ul>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapToProps = state => ({
  categories: state.categories,
  user: state.user
});

export const Categories = connect(mapToProps)(CategoriesComponent);
