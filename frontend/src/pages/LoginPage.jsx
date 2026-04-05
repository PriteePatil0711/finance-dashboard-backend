import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthData } from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      setAuthData(response.data);
      window.location.href = '/dashboard';
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2 className="section-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          {error && <div className="error-text">{error}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
