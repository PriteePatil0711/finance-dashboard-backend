import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../services/api';

function ProtectedRoute({ children, roles }) {
  const token = getToken();
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
