import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navigation } from '../navigation';
import { server } from '../../services';
import { removeUser } from '../../store/user';

import './header.scss';

export const HeaderComponent = ({ user, dispatch }) => {
  const onLogout = () => dispatch(removeUser());
  const logoutHandler = (e) => {
    e.preventDefault();
    server.get('logout')
      .then(() => onLogout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <Link to="/" className="header__logo">
            <img src="/images/shop-logo.svg" alt="" />
          </Link>
          <Navigation user={user} />
          {
            user
              ? (
                <div>
                  <mark>{user.lastName}</mark>
                  <button type="button" onClick={logoutHandler}>Logout</button>
                </div>
              )
              : (
                <Link to="/login">Sign in</Link>
              )
          }
        </div>
      </div>
    </header>
  );
};

const mapToProps = state => ({
  user: state.user
});

export const Header = connect(mapToProps)(HeaderComponent);
