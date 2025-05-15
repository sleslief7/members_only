import { useNavigate } from 'react-router-dom';
import { logout } from '../api/queries';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { logout: contextLogout } = useAuth();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    contextLogout();
    navigate('/login');
  };

  return (
    <div id="header">
      <button className="btn">Become a member</button>
      <div id="logo">Anonymous</div>
      <button id="log-out" className="btn" onClick={logoutHandler}>
        Log Out
      </button>
    </div>
  );
};

export default Header;
