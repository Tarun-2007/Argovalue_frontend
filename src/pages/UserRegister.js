import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Auth.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      await authService.register({ ...formData, role: 'user' });
      navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-icon">👤</div>
          <h1>User Registration</h1>
          <p>Join the ArgoValue community</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="auth-btn user-auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register as User'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/role-selection">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
