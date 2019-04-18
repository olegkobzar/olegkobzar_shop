import React from 'react';
import ReactDOM from 'react-dom';

import { Navigation } from './navigation/Navigation'

const Time = () => <time>{String(new Date().toLocaleString())}</time>
const header = (
  <header>
    <h1>Hello <Time></Time></h1>
    <Navigation></Navigation>
  </header>
);

ReactDOM.render(header, document.getElementById('app'));
