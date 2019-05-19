import { Link } from 'react-router-dom';
import { Navigation } from '../navigation';

import './header.scss';

export const Header = ({ user, onLogout }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrap">
        <Link to="/" className="header__logo">
          <img src="/images/shop-logo.svg" alt="" />
        </Link>
        <Navigation />

        {
          user
            ? (
              <div>
                <mark>{user.lastName}</mark>
                <button type="button" onClick={onLogout}>Logout</button>
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
