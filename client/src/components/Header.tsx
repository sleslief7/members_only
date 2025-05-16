import { useNavigate } from 'react-router-dom';
import { logout } from '../api/queries';
import { useAuth } from '../hooks/useAuth';
import MembershipDialog from './MembershipDialog';

const Header = () => {
  const { logout: contextLogout, isAuth, user } = useAuth();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    contextLogout();
    navigate('/login');
  };

  return (
    <div id="header">
      <div id="header-left">
        {!user?.is_member && isAuth && <MembershipDialog />}
      </div>
      <div id="logo" onClick={() => navigate('/')}>
        Post Club
      </div>

      <div id="header-right">
        {isAuth && (
          <button id="log-out" className="btn" onClick={logoutHandler}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
