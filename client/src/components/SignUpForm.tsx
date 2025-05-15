import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signup } from '../api/queries';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordMatch = password === confirmPassword;
    if (!passwordMatch) {
      setError('Passwords must match');
      return;
    }
    setError('');
    await signup({ firstName, lastName, username, password });
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="signup-login-form">
      <label htmlFor="firstName">First name: </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last name:</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="confirmPassword">Confirm password: </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p id="password-error">{error}</p>}
      <button className="btn">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
