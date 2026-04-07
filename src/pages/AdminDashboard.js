import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, activeUsers: 0 });
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [viewingUser, setViewingUser] = useState(null);

  useEffect(() => {
    loadUsers();
    loadStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    const usersWithDetails = allUsers.map(u => {
      const userProducts = allProducts.filter(p => p.userId === u.id);
      return { 
        ...u, 
        password: undefined,
        productCount: userProducts.length,
        products: userProducts
      };
    });
    
    setUsers(usersWithDetails);
  };

  const loadStats = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    setStats({
      totalUsers: allUsers.length,
      totalProducts: products.length,
      activeUsers: allUsers.filter(u => u.role === 'user').length
    });
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const filtered = allUsers.filter(u => u.id !== userId);
      localStorage.setItem('users', JSON.stringify(filtered));
      loadUsers();
      loadStats();
    }
  };

  const updateUserRole = (userId, newRole) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = allUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      allUsers[userIndex].role = newRole;
      localStorage.setItem('users', JSON.stringify(allUsers));
      loadUsers();
    }
  };

  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({ name: user.name, email: user.email, phone: user.phone || '', location: user.location || '' });
  };

  const saveEdit = (userId) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = allUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], ...editForm };
      localStorage.setItem('users', JSON.stringify(allUsers));
      setEditingUser(null);
      loadUsers();
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>👑 Admin Control Panel</h1>
      <p className="admin-subtitle">Manage all users and system data</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activeUsers}</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalProducts}</h3>
          <p>Total Products</p>
        </div>
      </div>

      <div className="admin-quick-links">
        <a href="/product-approval" className="admin-link-card">
          <span className="link-icon">✓</span>
          <span>Product Approval Management</span>
        </a>
        <a href="/roles" className="admin-link-card">
          <span className="link-icon">📋</span>
          <span>View Admin Responsibilities</span>
        </a>
      </div>

      <div className="users-section">
        <h2>All User Details</h2>
        <p className="section-subtitle">View, edit, and manage all registered users</p>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Products</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" style={{textAlign: 'center', padding: '40px'}}>No users registered yet</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>
                    {editingUser === user.id ? (
                      <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                    ) : user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {editingUser === user.id ? (
                      <input value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} placeholder="Phone" />
                    ) : user.phone || 'N/A'}
                  </td>
                  <td>
                    {editingUser === user.id ? (
                      <input value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} placeholder="Location" />
                    ) : user.location || 'N/A'}
                  </td>
                  <td>
                    <span className="product-count">{user.productCount || 0}</span>
                  </td>
                  <td>
                    <select 
                      value={user.role} 
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      disabled={editingUser === user.id}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="action-buttons">
                    {editingUser === user.id ? (
                      <>
                        <button onClick={() => saveEdit(user.id)} className="save-btn">✓ Save</button>
                        <button onClick={() => setEditingUser(null)} className="cancel-btn">✕ Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setViewingUser(user)} className="view-btn">👁 View</button>
                        <button onClick={() => startEdit(user)} className="edit-btn">✏ Edit</button>
                        <button onClick={() => deleteUser(user.id)} className="delete-btn">🗑 Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewingUser && (
        <div className="modal-overlay" onClick={() => setViewingUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button onClick={() => setViewingUser(null)} className="close-btn">✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>User ID:</strong>
                <span>#{viewingUser.id}</span>
              </div>
              <div className="detail-row">
                <strong>Full Name:</strong>
                <span>{viewingUser.name}</span>
              </div>
              <div className="detail-row">
                <strong>Email:</strong>
                <span>{viewingUser.email}</span>
              </div>
              <div className="detail-row">
                <strong>Phone:</strong>
                <span>{viewingUser.phone || 'Not provided'}</span>
              </div>
              <div className="detail-row">
                <strong>Location:</strong>
                <span>{viewingUser.location || 'Not provided'}</span>
              </div>
              <div className="detail-row">
                <strong>Role:</strong>
                <span className={`role-badge-modal ${viewingUser.role}`}>{viewingUser.role}</span>
              </div>
              <div className="detail-row">
                <strong>Products Listed:</strong>
                <span>{viewingUser.productCount || 0}</span>
              </div>
              <div className="detail-row">
                <strong>Registered:</strong>
                <span>{new Date(viewingUser.id).toLocaleDateString()}</span>
              </div>
            </div>
            
            {viewingUser.products && viewingUser.products.length > 0 && (
              <div className="products-section-modal">
                <h3>📦 User Products</h3>
                <div className="products-list">
                  {viewingUser.products.map(product => (
                    <div key={product.id} className="product-item">
                      <img src={product.image || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=100'} alt={product.name} />
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p className="product-price">₹{product.price}</p>
                        <p className="product-desc">{product.description?.substring(0, 80)}...</p>
                        {product.category && <span className="product-category">{product.category}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(!viewingUser.products || viewingUser.products.length === 0) && (
              <div className="no-products-modal">
                <p>📦 This user hasn't listed any products yet</p>
              </div>
            )}
            
            <div className="activity-section-modal">
              <h3>📊 User Activity</h3>
              <div className="activity-stats">
                <div className="activity-item">
                  <span className="activity-icon">📦</span>
                  <div>
                    <strong>{viewingUser.productCount || 0}</strong>
                    <p>Products Listed</p>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🎓</span>
                  <div>
                    <strong>3</strong>
                    <p>Courses Enrolled</p>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">💬</span>
                  <div>
                    <strong>5</strong>
                    <p>Community Posts</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button onClick={() => { setViewingUser(null); startEdit(viewingUser); }} className="edit-btn">Edit User</button>
              <button onClick={() => setViewingUser(null)} className="cancel-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
