import './login.scss';

export const Login = ({ onLogin }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    setTimeout(() => {
      onLogin(data);
    }, 1000);
  };

  return (
    <form action="#" onSubmit={onSubmit} className="login">
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
  );
};
