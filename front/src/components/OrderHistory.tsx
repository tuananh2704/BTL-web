import React from 'react';
import { useOrder } from '../store/OrderContext';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
  const { orders } = useOrder();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content order-history-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Order History</h2>
        
        {orders.length === 0 ? (
          <p className="empty-orders">No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                
                {/* === ORDER HEADER === */}
                <div className="order-header">
                  <span className="order-id">#{order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>

                {/* === ORDER ITEMS === */}
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.id} className="order-item-row">
                      <span>
                        {item.tenMatHang} × {item.quantity}
                      </span>

                      <span>
                        {(item.donGia * item.quantity).toLocaleString()} ₫
                      </span>
                    </div>
                  ))}
                </div>

                {/* === ORDER FOOTER === */}
                <div className="order-footer">
                  <div className="shipping-info">
                    <small>Ship to: {order.shippingInfo.address}</small>
                  </div>
                  <div className="order-total">
                    <strong>
                      Total: {order.total.toLocaleString()} ₫
                    </strong>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
