import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user] = useState(authService.getCurrentUser());
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ myProducts: 0, enrolled: 0, posts: 0 });

  useEffect(() => {
    loadUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserData = () => {
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const userProducts = allProducts.filter(p => p.userId === user.id);
    setProducts(userProducts);
    setStats({
      myProducts: userProducts.length,
      enrolled: 3,
      posts: 5
    });
  };

  return (
    <div className="user-dashboard">
      <div className="welcome-section">
        <h1>Welcome back, {user.name}!</h1>
        <p>Manage your products and grow your agricultural business</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.myProducts}</h3>
          <p>My Products</p>
        </div>
        <div className="stat-card">
          <h3>{stats.enrolled}</h3>
          <p>Enrolled Courses</p>
        </div>
        <div className="stat-card">
          <h3>{stats.posts}</h3>
          <p>Community Posts</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/add-product" className="action-card">
            <span className="icon">📦</span>
            <h3>Add Product</h3>
            <p>List a new product</p>
          </Link>
          <Link to="/training" className="action-card">
            <span className="icon">📚</span>
            <h3>Training</h3>
            <p>Browse courses</p>
          </Link>
          <Link to="/community" className="action-card">
            <span className="icon">💬</span>
            <h3>Community</h3>
            <p>Join discussions</p>
          </Link>
          <Link to="/orders" className="action-card">
            <span className="icon">📦</span>
            <h3>My Orders</h3>
            <p>Manage orders</p>
          </Link>
          <Link to="/roles" className="action-card">
            <span className="icon">📋</span>
            <h3>My Responsibilities</h3>
            <p>View your duties</p>
          </Link>
        </div>
      </div>

      <div className="recent-products">
        <h2>My Recent Products</h2>
        {products.length === 0 ? (
          <p className="no-products">You haven't added any products yet. <Link to="/add-product">Add your first product</Link></p>
        ) : (
          <div className="products-grid">
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400'} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
