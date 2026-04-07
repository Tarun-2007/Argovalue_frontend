import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = () => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter(o => o.sellerId === user.id);
    setOrders(userOrders);
  };

  const updateOrderStatus = (orderId, status) => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const index = allOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      allOrders[index].status = status;
      localStorage.setItem('orders', JSON.stringify(allOrders));
      loadOrders();
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <p className="subtitle">Manage and fulfill customer orders</p>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>📦 No orders yet</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`order-status ${order.status}`}>{order.status}</span>
              </div>
              <div className="order-details">
                <p><strong>Product:</strong> {order.productName}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              {order.status === 'pending' && (
                <div className="order-actions">
                  <button onClick={() => updateOrderStatus(order.id, 'processing')} className="process-btn">
                    Process Order
                  </button>
                  <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              )}
              {order.status === 'processing' && (
                <button onClick={() => updateOrderStatus(order.id, 'completed')} className="complete-btn">
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
