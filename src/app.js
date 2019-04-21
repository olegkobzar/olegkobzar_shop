import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import { Header } from './components/header';
import { Footer } from './components/footer';
import { Main } from './components/main';
import { Aside } from './components/aside';

const App = () => (
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

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
