import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

if (process.env.NODE_ENV === 'production' && !apiBaseUrl) {
  throw new Error('Missing REACT_APP_API_URL. Set it to your deployed backend URL in Vercel.');
}

const api = axios.create({
  baseURL: apiBaseUrl || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    if (error.response?.status === 401 && !url.includes('/auth/')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
