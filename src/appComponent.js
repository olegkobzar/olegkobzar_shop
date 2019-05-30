import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastr';

import { checkUserService } from './services/userService';
import { getShopInfoService } from './services/categoriesService';

import { Header } from './components/header';
import { Main } from './components/main';
import { Loader } from './components/loader';
import { Pages } from './pages';

import { setUser } from './store/user';
import { setInfo } from './store/categories';
import { setError } from './store/status';

import './app.scss';

export class AppComponent extends Component {
  state = {
    isLoading: false
  }

  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate(prevProps) {
    const { user, status, history, dispatch } = this.props;

    if (prevProps.user && !user) {
      history.push('/');
    }

    if (!prevProps.user && user) {
      this.getInfo();
    }

    if (prevProps.status && status) {
      this.container.error(
        <strong>{status}</strong>,
        <em>Error!</em>
      );
      dispatch(setError(''));
    }
  }

  getInfo() {
    getShopInfoService()
      .then(data => this.props.dispatch(setInfo(data)));
  }

  checkUser = () => {
    this.setState({ isLoading: true });

    checkUserService()
      .then((user) => {
        this.props.dispatch(setUser(user));
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading } = this.state;
    const { user } = this.props;

    return (
      <>
        <Header />
        <Main>
          {
            isLoading
              ? <Loader show={isLoading} />
              : <Pages user={user} />
          }
        </Main>

        <ToastContainer
          ref={ref => this.container = ref}
          className="toast-top-right"
        />

      </>
    );
  }
}

const mapState = state => ({ user: state.user, status: state.status });

export const App = connect(mapState)(AppComponent);
