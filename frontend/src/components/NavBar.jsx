import { Link, useNavigate } from 'react-router-dom';
import { clearAuthData, getUserRole } from '../services/api';

function NavBar() {
  const navigate = useNavigate();
  const role = getUserRole();

  const logout = () => {
    clearAuthData();
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {(role === 'admin' || role === 'analyst') && <Link to="/records">Records</Link>}
      {role === 'admin' && <Link to="/users">Users</Link>}
      <button onClick={logout} style={{ background: 'transparent', border: 'none', color: 'white' }}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
