import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PublishedCategories } from '../../components/publishedCategories';
import { UnpublishedCategories } from '../../components/unpublishedCategories';
import { getCategoriesService, updateCategoryService, deleteCategoryService } from '../../services/categoriesService';
import { setCategories } from '../../store/categories';

import './categories.scss';

export class CategoriesComponent extends Component {
  getCategories = () => {
    const { dispatch } = this.props;

    getCategoriesService()
      .then((data) => { dispatch(setCategories(data)); });
  }

  componentDidMount() {
    this.getCategories();
  }

  onEdit = (id, title) => {
    const { categories } = this.props;
    const category = categories.find(item => item.id === id);

    category.title = title;
    updateCategoryService(id, category)
      .then(() => this.getCategories());
  }

  onDelete = (id) => {
    deleteCategoryService(id)
      .then(() => this.getCategories());
  }

  onTitleClick = (id) => {
    const { history } = this.props;

    history.push(`/categories/${id}`);
  }

  changeCategoriesStatus = (id, published) => {
    const { categories } = this.props;
    const category = categories.find(item => item.id === id);

    category.published = published;
    updateCategoryService(id, category)
      .then(() => this.getCategories());
  }

  published = () => {
    const { categories } = this.props;

    return categories.filter(item => item.published);
  }

  unpublished = () => {
    const { categories } = this.props;

    return categories.filter(item => !item.published);
  }

  render() {
    const { user, categories } = this.props;

    return (
      <div className="categories">
        <h1>Categories</h1>
        {
          user
            ? (
              <div className="categories__wrap">
                <div className="categories__col">
                  <h4>Published categories</h4>
                  <PublishedCategories
                    list={this.published()}
                    editItem={this.onEdit}
                    deleteItem={id => this.changeCategoriesStatus(id, false)}
                    titleClick={this.onTitleClick}
                  />
                </div>
                <div className="categories__col">
                  <h4>Unpublished categories</h4>
                  <UnpublishedCategories
                    list={this.unpublished()}
                    onPublished={id => this.changeCategoriesStatus(id, true)}
                  />
                </div>
              </div>
            )
            : (
              <ul className="categories__list">
                {
                  categories.map(item => (
                    item.published && (
                      <li key={item.title} className="categories__list-item">
                        <Link to={`categories/${item.id}`}>{item.title}</Link>
                      </li>
                    )
                  ))
                }
              </ul>
            )
        }
      </div>
    );
  }
}

const mapToProps = state => ({
  categories: state.categories,
  user: state.user
});

export const Categories = connect(mapToProps)(CategoriesComponent);
