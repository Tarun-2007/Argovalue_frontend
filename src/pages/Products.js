import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data.filter((product) => product.status !== 'rejected'));
    } catch (err) {
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>Our Products</h1>
          <p>Discover value-added agricultural products from our community</p>
        </div>

        {error && <div className="info-message">{error}</div>}

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="product-placeholder">🌾</div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <span className="product-category">{product.category}</span>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">₹{product.price}</span>
                  <button className="view-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
