import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getShopInfoService } from '../../services/categoriesService';

import './homeAuth.scss';

export class HomeAuthComponent extends Component {
  render() {
    const { user = {}, info } = this.props;

    return (
      info && (
        <div className="info-categories">
          <span>Hello, <b>{user.firstName}</b></span>
          <p>You have <b>{info.categories}</b> categories (<b>{info.publishedCategories}</b> published)</p>
          <p>You have <b>{info.products}</b> products</p>
          <Link to="categories">Go to categories</Link>
        </div>
      )
    );
  }
}

const mapToProps = state => ({
  user: state.user,
  info: state.info,
});

export const HomeAuth = connect(mapToProps)(HomeAuthComponent);
