import './aboutProduct.scss';
import { EditText } from '../../components/editText';

export class AboutProduct extends Component {
  render() {
    return (
      <div className="about-product">
        <div className="about-product__name">
          <span className="about-product__title">Title:</span>
          <EditText placeholder="Product name" />
        </div>
        <div className="about-product__price">
          <span className="about-product__label">$</span>
          <EditText placeholder="Product price" />
        </div>
        <div className="about-product__info">
          <EditText textarea placeholder="Product info" />
        </div>
        <button className="btn" type="button">Save</button>
      </div>
    );
  }
}
