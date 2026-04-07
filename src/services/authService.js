import api from './api';

export const authService = {
  register: async (userData) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const response = await api.post('/auth/register', userData);
    const { token, name, email, role } = response.data;
    const user = { name, email, role };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  login: async (credentials) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const response = await api.post('/auth/login', credentials);
    const { token, name, email, role } = response.data;
    const user = { name, email, role };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'ADMIN' || user?.role === 'admin';
  },

  updateProfile: async (userId, updates) => {
    const user = authService.getCurrentUser();
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  },
};
