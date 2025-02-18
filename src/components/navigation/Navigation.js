import { NavLink } from 'react-router-dom';

import './navigation.scss';

const items = [
  { label: 'Home', id: '', icon: 'home', auth: false },
  { label: 'Home auth', id: '', icon: 'home', auth: true },
  { label: 'Shop', id: 'categories', icon: 'list-alt', auth: false },
  { label: 'Categories', id: 'categories', icon: 'list-alt', auth: true },
  { label: 'Products', id: 'products', icon: 'shopping-bag', auth: true },
  { label: 'Contacts', id: 'contacts', icon: 'map-signs' }
];

export const Navigation = ({ user }) => {
  let filteredItems = items.filter(item => !item.auth);

  if (user) {
    filteredItems = items.filter(item => item.auth);
  }

  return (
    <nav className="nav">
      <ul className="nav__list">
        {
          filteredItems
            .map(item => (
              <li
                key={item.id}
                className="nav__item"
              >
                <NavLink
                  to={`/${item.id.toLowerCase()}`}
                  exact
                  activeClassName="active"
                >
                  {item.label}
                </NavLink>
              </li>
            ))
        }
      </ul>
    </nav>
  );
};
