import './header.scss';

import { Navigation } from '../navigation';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrap">
            <a href="/one" className="header__logo">LOGO</a>
            <Navigation list={['Home', 'Products', 'Contacts']} />
            <div className="header__controll">
              <div className="header__controll-item">Sign in</div>
              <div className="header__controll-item">Sign up</div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
