import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './app.scss';

import { Header } from './components/header';
import { Main } from './components/main';
import { Pages } from './pages';

class App extends Component {
  state = {
    user: null
  }

  onLogin = (user) => {
    this.setState({ user });
  }

  onLogout = () => {
    this.setState({ user: null });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <Header user={user} onLogout={this.onLogout} />
        <Main>
          <Pages user={user} onLogin={this.onLogin} />
        </Main>
      </>
    );
  }
}

const Root = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(Root, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
