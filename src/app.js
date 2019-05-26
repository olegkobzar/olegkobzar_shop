import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, withRouter } from 'react-router-dom';

import { App } from './appComponent';

import { store } from './store';

const RouteApp = withRouter(App);

const Root = (
  <Provider store={store}>
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(Root, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
