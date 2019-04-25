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
            <a href="tel:0663804909" className="header__phone">066-380-49-09</a>
          </div>
        </div>
      </header>
    );
  }
}
