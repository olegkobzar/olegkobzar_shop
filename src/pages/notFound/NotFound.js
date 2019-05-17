import './notFound.scss';

import { Link } from 'react-router-dom';

export const NotFound = ({ location }) => (
  <div className="not-found">
    <div className="container">
      <div className="not-found__wrap">
        <div className="not-found__text">Ooops!!! Requested url <span>{location.pathname}</span> not found!!!</div>
        <img src="/images/error-404.svg" alt="404" className="not-found__img" />
        <Link
          to="/"
          className="btn"
        >Go to Home page
        </Link>
      </div>
    </div>
  </div>
);
