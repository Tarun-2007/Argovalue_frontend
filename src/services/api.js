import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;
const isProductionApiMissing = process.env.NODE_ENV === 'production' && !apiBaseUrl;

const api = axios.create({
  baseURL: apiBaseUrl || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (isProductionApiMissing) {
      return Promise.reject(
        new Error('Backend API is not configured yet. Set REACT_APP_API_URL in Vercel to your deployed backend URL.')
      );
    }

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
