import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductsService } from '../../services/productsService';
import { setProducts } from '../../store/products';

import './products.scss';

export class ProductsComponent extends Component {
  state = {
    value: ''
  }

  getProducts = () => {
    getProductsService()
      .then(products => this.props.dispatch(setProducts(products)));
  }

  componentDidMount() {
    this.getProducts();
  }

  setValue = ({ target }) => {
    this.setState({ value: target.value });
  }

  filter = product => product.title.toLowerCase().includes(this.state.value.toLowerCase())

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
                      <a href="/edit" className="products__controll-item">
                        <img src="images/edit.svg" alt="edit" />
                      </a>
                      <a href="/delete" className="products__controll-item">
                        <img src="images/delete.svg" alt="delete" />
                      </a>
                    </div>
                    {
                      product.image ? <img src={product.image} alt="product" /> : <span>default image</span>
                    }
                  </div>
                  <p className="products__name">{product.title}</p>
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
