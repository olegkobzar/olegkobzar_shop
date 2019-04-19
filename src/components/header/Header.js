import React from 'react';

import './header.scss';

import { Navigation } from '../navigation/Navigation'

export const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrap">
        <a href="#" className="header__logo">LOGO</a>
        <Navigation />
        <a href="tel:0663804909" className="header__phone">066-380-49-09</a>
      </div>
    </div>
  </header>
);
