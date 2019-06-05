import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductsService, deleteProductService, updateProductService } from '../../services/productsService';
import { setProducts, deleteProduct } from '../../store/products';
import { EditText } from '../../components/editText';

import './products.scss';

export class ProductsComponent extends Component {
  state = {
    value: '',
    currentItemEdit: null,
    deleteItem: ''
  }

  getProducts = () => {
    getProductsService()
      .then((data) => {
        this.products = data;
        this.props.dispatch(setProducts(data));
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  setValue = ({ target }) => {
    this.setState({ value: target.value });
  }

  filter = product => product.title.toLowerCase().includes(this.state.value.toLowerCase());

  resultText = text => console.log(text); // eslint-disable-line

  onClickEdit = (id) => {
    this.setState({ currentItemEdit: id });
  }

  onTitleChange = (id, title) => {
    const product = this.products.find(item => item.id === id);
    product.title = title;

    updateProductService(id, product)
      .then(() => {
        this.setState({ currentItemEdit: null });
        this.getProducts();
      });
  }

  onTitleClick = (id) => {
    const { history } = this.props;

    history.push(`/products/${id}`);
  }

  onClickDelete = () => {
    const { deleteItem } = this.state;

    deleteProductService(deleteItem)
      .then(() => {
        this.props.dispatch(deleteProduct(deleteItem));
      });
  }

  render() {
    const { value } = this.state;
    const { products } = this.props;

    return (
      <div className="products">
        <h1>Products</h1>
        <input
          type="text"
          onChange={this.setValue}
          value={value}
          className="products__input"
          placeholder="Enter name product"
        />
        <ul className="products__wrap">
          {
            products
              .filter(this.filter)
              .map(product => (
                <li key={product.title} className="products__item">
                  <div className="products__inner">
                    <div className="products__controll">
                      <button
                        type="button"
                        className="products__controll-item"
                        onClick={() => this.onClickEdit(product.id)}
                      >
                        <img src="images/edit.svg" alt="edit" />
                      </button>
                      <button
                        type="button"
                        className="products__controll-item"
                      >
                        <img src="images/delete.svg" alt="delete" />
                      </button>
                    </div>
                    {
                      product.image ? <img src={product.image} alt="product" /> : <span>default image</span>
                    }
                  </div>
                  <div className="products__name">
                    <EditText
                      placeholder="Product name"
                      value={product.title}
                      edit={this.state.currentItemEdit === product.id}
                      onTextEdit={text => this.onTitleChange(product.id, text)}
                      result={this.resultText}
                      onClick={() => this.onTitleClick(product.id)}
                      className="products__name"
                    />
                  </div>
                </li>
              ))
          }
        </ul>
        <Link to="/create-product" className="products__new">Add new</Link>
      </div>
    );
  }
}

const mapToProps = state => ({
  products: state.products
});

export const Products = connect(mapToProps)(ProductsComponent);
