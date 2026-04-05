import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import RecordsPage from './pages/RecordsPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken, getUserRole } from './services/api';

function App() {
  const token = getToken();
  const role = getUserRole();

  return (
    <div className="app-container">
      {token && <NavBar role={role} />}
      <div className="page-wrapper">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={[ 'admin' ]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/records"
            element={
              <ProtectedRoute roles={[ 'admin', 'analyst' ]}>
                <RecordsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
