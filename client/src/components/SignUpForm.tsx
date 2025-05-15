import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SignUpForm = () => {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  if (isAuth) navigate('/');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Successfully Sign up');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="firstName">First name: </label>
      <input type="text" name="firstName" id="firstName" />
      <label htmlFor="lastName">Last name:</label>
      <input type="text" name="lastName" id="lastName" />
      <label htmlFor="username">Username: </label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password: </label>
      <input type="password" name="password" id="password" />
      <label htmlFor="confirmPassword">Confirm password: </label>
      <input type="password" name="confirmPassword" id="confirmPassword" />
      <button className="btn">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
