export const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(data);    
  }

  return (
    <form action="#" onSubmit={onSubmit}>
      <input 
        type="text"
        name="email"
        placeholder="Enter email"
      />
      <input 
        type="password"
        name="password"
        placeholder="Enter password"
      />
      <input 
        type="submit"
        value="Login"
      />
    </form>
  );
}