import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getToken = () => localStorage.getItem('finance_token');
export const getUserRole = () => localStorage.getItem('finance_role');
export const getUserEmail = () => localStorage.getItem('finance_email');

export const setAuthData = ({ token, user }) => {
  localStorage.setItem('finance_token', token);
  localStorage.setItem('finance_role', user.role);
  localStorage.setItem('finance_email', user.email);
};

export const clearAuthData = () => {
  localStorage.removeItem('finance_token');
  localStorage.removeItem('finance_role');
  localStorage.removeItem('finance_email');
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthData();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const updateRecord = (id, data) => {
  return api.put(`/records/${id}`, data);
};

export default api;
