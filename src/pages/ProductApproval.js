import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import './ProductApproval.css';

const ProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const allProducts = await productService.getAllProducts();
      setProducts(allProducts);
      setError('');
    } catch (err) {
      setError('Failed to load products');
    }
  };

  const handleApprove = async (id) => {
    await productService.approveProduct(id);
    loadProducts();
  };

  const handleReject = async (id) => {
    await productService.rejectProduct(id);
    loadProducts();
  };

  const filteredProducts = products.filter(p => p.status === filter);

  return (
    <div className="approval-page">
      <h1>Product Approval Management</h1>
      {error && <div className="error-message">{error}</div>}
      
      <div className="filter-tabs">
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
          Pending ({products.filter(p => p.status === 'pending').length})
        </button>
        <button className={filter === 'approved' ? 'active' : ''} onClick={() => setFilter('approved')}>
          Approved ({products.filter(p => p.status === 'approved').length})
        </button>
        <button className={filter === 'rejected' ? 'active' : ''} onClick={() => setFilter('rejected')}>
          Rejected ({products.filter(p => p.status === 'rejected').length})
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-products">No {filter} products</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="approval-card">
              <img src={product.imageUrl || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=300'} alt={product.name} />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">₹{product.price}</p>
                <p className="stock">Stock: {product.stock}</p>
                <p className="description">{product.description}</p>
                <span className={`status-badge ${product.status}`}>{product.status}</span>
              </div>
              {product.status === 'pending' && (
                <div className="actions">
                  <button onClick={() => handleApprove(product.id)} className="approve-btn">✓ Approve</button>
                  <button onClick={() => handleReject(product.id)} className="reject-btn">✕ Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductApproval;
