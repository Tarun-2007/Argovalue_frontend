import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { productService } from '../services/productService';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user] = useState(authService.getCurrentUser());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl || '',
      stock: product.stock || 0
    });
  };

  const saveEdit = async (productId) => {
    try {
      await productService.updateProduct(productId, editForm);
      setSuccess('Product updated successfully!');
      setEditingProduct(null);
      loadProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update product');
      setTimeout(() => setError(''), 3000);
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setSuccess('Product deleted successfully!');
        loadProducts();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete product');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  return (
    <div className="user-dashboard">
      <div className="welcome-section">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Manage your products and grow your agricultural business</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{products.length}</h3>
          <p>My Products</p>
        </div>
        <div className="stat-card">
          <h3>3</h3>
          <p>Enrolled Courses</p>
        </div>
        <div className="stat-card">
          <h3>5</h3>
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
            <span className="icon">🛒</span>
            <h3>My Orders</h3>
            <p>Manage orders</p>
          </Link>
        </div>
      </div>

      <div className="recent-products">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>My Products</h2>
          <Link to="/add-product" className="submit-btn" style={{textDecoration:'none', padding:'8px 16px', borderRadius:'8px', background:'#16a34a', color:'white'}}>+ Add New</Link>
        </div>

        {error && <div className="error-message" style={{marginTop:'10px'}}>{error}</div>}
        {success && <div style={{background:'#dcfce7', color:'#16a34a', padding:'10px', borderRadius:'8px', marginTop:'10px'}}>{success}</div>}

        {loading ? (
          <p style={{textAlign:'center', padding:'20px'}}>Loading products...</p>
        ) : products.length === 0 ? (
          <p className="no-products">No products yet. <Link to="/add-product">Add your first product</Link></p>
        ) : (
          <table className="users-table" style={{marginTop:'16px'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    {editingProduct === product.id ? (
                      <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} style={{width:'100%', padding:'4px'}} />
                    ) : product.name}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})} style={{padding:'4px'}}>
                        <option value="Dairy & Honey">Dairy & Honey</option>
                        <option value="Pickles">Pickles</option>
                        <option value="Grains">Grains</option>
                        <option value="Spices">Spices</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : product.category}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} style={{width:'80px', padding:'4px'}} />
                    ) : `₹${product.price}`}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <input type="number" value={editForm.stock} onChange={(e) => setEditForm({...editForm, stock: e.target.value})} style={{width:'70px', padding:'4px'}} />
                    ) : product.stock ?? 0}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <input value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} style={{width:'100%', padding:'4px'}} />
                    ) : product.description?.substring(0, 50) + '...'}
                  </td>
                  <td className="action-buttons">
                    {editingProduct === product.id ? (
                      <>
                        <button onClick={() => saveEdit(product.id)} className="save-btn" style={{background:'#16a34a', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', marginRight:'4px'}}>✓ Save</button>
                        <button onClick={() => setEditingProduct(null)} className="cancel-btn" style={{background:'#6b7280', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer'}}>✕ Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(product)} style={{background:'#2563eb', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', marginRight:'4px'}}>✏ Edit</button>
                        <button onClick={() => deleteProduct(product.id)} style={{background:'#dc2626', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer'}}>🗑 Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
