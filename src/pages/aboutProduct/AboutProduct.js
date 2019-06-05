import { connect } from 'react-redux';
import { EditText } from '../../components/editText';
import { getProductsIdService } from '../../services/productsService';
import { setProduct, cleanProduct } from '../../store/products';

import './aboutProduct.scss';

export class AboutProductComponent extends Component {
  getProductInfo = () => {
    const { match, dispatch } = this.props;

    getProductsIdService(match.params.id)
      .then(data => dispatch(setProduct(data)));
  }

  componentDidMount() {
    this.getProductInfo();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    return dispatch(cleanProduct());
  }

  resultText = text => console.log(text); // eslint-disable-line

  render() {
    const { product } = this.props;

    return (
      <div className="about-product">
        <div className="about-product__name">
          <span className="about-product__title">Title:</span>
          <EditText placeholder="Product name" value={product.title} result={this.resultText} />
        </div>
        <div className="about-product__price">
          <span className="about-product__label">$</span>
          <EditText placeholder="Product price" value={product.price} result={this.resultText} />
        </div>
        <div className="about-product__info">
          <EditText textarea placeholder="Product info" value={product.description} result={this.resultText} />
        </div>
        <button className="btn" type="button">Save</button>
      </div>
    );
  }
}

const mapToProps = state => ({
  product: state.product
});

export const AboutProduct = connect(mapToProps)(AboutProductComponent);
