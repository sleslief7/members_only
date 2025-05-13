import { Link } from 'react-router-dom';

const LoginForm = () => {
  const handleSubmit = () => {
    console.log('login form submitted');
  };
  return (
    <form onSubmit={handleSubmit} id="login-form">
      <label htmlFor="username">Username: </label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" />
      <button id="sign-in" className="btn">
        Sign in
      </button>
      <Link to="/sign-up">Create an account</Link>
    </form>
  );
};

export default LoginForm;
