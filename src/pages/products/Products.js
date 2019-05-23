import { Link } from 'react-router-dom';

import { getProductsService } from '../../services/productsService';

import './products.scss';

export class Products extends Component {
  state = {
    products: [],
    value: ''
  }

  getProducts = () => {
    getProductsService()
      .then(products => this.setState({ products }));
  }

  componentDidMount() {
    this.getProducts();
  }

  setValue = ({ target }) => {
    this.setState({ value: target.value });
  }

  filter = product => product.title.toLowerCase().includes(this.state.value.toLowerCase())

  render() {
    const { products, value } = this.state;

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
