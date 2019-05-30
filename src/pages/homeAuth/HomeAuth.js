import { Link } from 'react-router-dom';
import { getShopInfoService } from '../../services/categoriesService';

import './homeAuth.scss';

export class HomeAuth extends Component {
  state = {
    info: {}
  }

  componentDidMount() {
    fetch('http://localhost:8086/shop_info', {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(info => this.setState({ info }));
  }

  render() {
    const { user = {} } = this.props;
    const { info } = this.state;

    return (
      <div className="info-categories">
        <span>Hello, <b>{user.firstName}</b></span>
        <p>You have <b>{info.categories}</b> categories (<b>{info.publishedCategories}</b> published)</p>
        <p>You have <b>{info.products}</b> products</p>
        <Link to="categories">Go to categories</Link>
      </div>
    );
  }
}
