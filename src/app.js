import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './app.scss';

import { Header } from './components/header';
import { Pages } from './pages';

const App = () => (
  <div className="wrapper">
    <Header />
    <div className="container">
      <div className="wrap">
        <Pages />
      </div>
    </div>
  </div>
);

const Root = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(Root, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
