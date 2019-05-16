import { Loader } from '../../components/loader';

import './login.scss';

export class Login extends Component  {
  state = {
    show: false
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ show: true })
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    setTimeout(() => {
      this.props.onLogin(data);
    }, 1000);
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
};
