import React from 'react';
import ReactDOM from 'react-dom';

import './app.scss';

import { Header } from './components/header';
import { Main } from './components/main';

const App = () => (
  <div className="wrapper">
    <Header />
    <div className="container">
      <div className="wrap">
        <Main />
      </div>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
