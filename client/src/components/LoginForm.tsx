import { Link } from 'react-router-dom';
import { login } from '../api/queries';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login: contextLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await login(username, password);
    contextLogin(user);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-login-form">
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id="sign-in" className="btn">
        Sign in
      </button>
      <Link to="/sign-up">Create an account</Link>
    </form>
  );
};

export default LoginForm;
