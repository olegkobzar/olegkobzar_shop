import './notFound.scss';

import { NavLink } from 'react-router-dom';

export const NotFound = ({ location }) => (
  <div className="not-found">
    <div className="container">
      <div className="not-found__wrap">
        <div className="not-found__text">Ooops!!! Requested url <span>{location.pathname}</span> not found!!!</div>
        <img src="/images/error-404.svg" alt="404" className="not-found__img" />
        <NavLink
          to="/"
          className="btn"
        >Go to Home page
        </NavLink>
      </div>
    </div>
  </div>
);
