import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navigation } from '../navigation';
import { server } from '../../services';
import { removeUser } from '../../store/user';

import './header.scss';

export const HeaderComponent = ({ user, dispatch, info }) => {
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
                <div className="header__user">
                  <div className="header__user-name">{user.firstName}</div>
                  {
                    info && <span>({info.categories}/{info.products})</span>
                  }
                  <div className="header__user-box">
                    <div className="header__user-inner">
                      <a href="#" onClick={logoutHandler}>Logout</a>
                      <Link to="/profile">Profile</Link>
                    </div>
                  </div>
                </div>
              )
              : (
                <div className="header__controll">
                  <div className="header__controll-item">
                    <Link to="/login">Sign in</Link>
                  </div>
                  <div className="header__controll-item">
                    <Link to="/registration">Sign up</Link>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </header>
  );
};

const mapToProps = state => ({
  user: state.user,
  info: state.info
});

export const Header = connect(mapToProps)(HeaderComponent);
