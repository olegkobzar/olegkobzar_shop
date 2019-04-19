import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Main } from './components/main/Main';
import { Aside } from './components/aside/Aside';

const body = (
  <div className="wrapper">
    <Header />
    <div className="container">
      <div className="wrap">
        <Aside />
        <Main />
      </div>
    </div>
    <Footer />
  </div>
);

ReactDOM.render(body, document.getElementById('app'));
