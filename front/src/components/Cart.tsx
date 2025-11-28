import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';
import { CheckoutModal } from './CheckoutModal';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, toggleCart } = useCart();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to proceed with checkout.");
      return;
    }
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="cart-overlay">
        <div className="cart-sidebar">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button onClick={toggleCart} className="close-cart-btn">&times;</button>
          </div>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={toggleCart} className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    
                    {/* HÌNH ẢNH */}
                    <img 
                      src={item.image_url} 
                      alt={item.tenMatHang} 
                      className="cart-item-image" 
                    />

                    <div className="cart-item-details">
                      
                      {/* TÊN SẢN PHẨM */}
                      <h4>{item.tenMatHang}</h4>

                      {/* GIÁ */}
                      <p>{item.donGia.toLocaleString()} ₫</p>

                      {/* SỐ LƯỢNG */}
                      <div 
                        className="quantity-controls" 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}
                      >
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={btnStyle}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={btnStyle}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* XÓA */}
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="remove-item-btn"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* TỔNG TIỀN */}
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{totalPrice.toLocaleString()} ₫</span>
                </div>

                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  {user ? 'Checkout' : 'Login to Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL CHECKOUT */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
};

const btnStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '1px solid #ddd',
  background: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
