import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';

import { checkUserService } from './services/userService';

import './app.scss';

import { Header } from './components/header';
import { Main } from './components/main';
import { Loader } from './components/loader';
import { Pages } from './pages';

class App extends Component {
  state = {
    user: null,
    isLoading: false
  }

  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate(prevProps, prevStates) {
    const { user } = this.state;

    if (prevStates.user && !user) {
      this.props.history.push('/');
    }
  }

  onLogin = (user) => {
    this.setState({ user });
  }

  onLogout = () => {
    this.setState({ user: null });
  }

  checkUser = () => {
    this.setState({ isLoading: true });

    checkUserService()
      .then((user) => {
        this.onLogin(user);
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <>
        <Header user={user} onLogout={this.onLogout} />
        <Main>
          {
            isLoading
              ? <Loader show={isLoading} />
              : <Pages user={user} onLogin={this.onLogin} />
          }
        </Main>
      </>
    );
  }
}

const RouteApp = withRouter(App);

const Root = (
  <BrowserRouter>
    <RouteApp />
  </BrowserRouter>
);

ReactDOM.render(Root, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
