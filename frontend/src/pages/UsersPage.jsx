import { useEffect, useState } from 'react';
import api from '../services/api';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data.users);
      } catch (e) {
        setError(e.response?.data?.message || 'Unable to load users.');
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="panel-card">
        <h2 className="section-title">User Management</h2>
        {error && <div className="error-text">{error}</div>}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
