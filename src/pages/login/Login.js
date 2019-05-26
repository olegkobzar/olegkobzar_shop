import { connect } from 'react-redux';

import { Loader } from '../../components/loader';

import { loginUserService } from '../../services/userService';
import { setUser } from '../../store/user';

import './login.scss';

export class LoginComponent extends Component {
  state = {
    show: false
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ show: true });

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    loginUserService(data)
      .then((user) => {
        const { dispatch } = this.props;

        dispatch(setUser(user));
      });
  };

  render() {
    const { show } = this.state;

    return (
      show
        ? <Loader show={show} />
        : (
          <form action="#" onSubmit={this.onSubmit} className="login">
            <div className="login__row">
              <input
                required
                type="text"
                name="email"
                defaultValue="admin@a.com"
              />
            </div>
            <div className="login__row">
              <input
                required
                type="password"
                name="password"
                defaultValue="admin"
              />
            </div>
            <div className="login__row">
              <button className="btn" type="submit">Login</button>
            </div>
          </form>
        )
    );
  }
}

export const Login = connect()(LoginComponent);
