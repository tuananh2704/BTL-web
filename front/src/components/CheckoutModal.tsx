import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { useOrder } from '../store/OrderContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, clearCart, toggleCart } = useCart();
  const { addOrder } = useOrder();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⭐ LƯU TẠM TRÊN FRONTEND
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: totalPrice,
      shippingInfo: { name, address, phone }
    };

    addOrder(newOrder);

    // ⭐ GỬI API VỀ BACKEND
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          address,
          phone,
          total_price: totalPrice,
          items: cart.map(item => ({
            product_id: item.id,     // 🔥 ID sản phẩm trong DB
            quantity: item.quantity, // 🔥 Số lượng đặt
            price: item.donGia        // 🔥 Giá tại thời điểm mua
          }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Đặt hàng thất bại!");
        return;
      }

      alert("Đặt hàng thành công!");

    } catch (err) {
      console.log(err);
      alert("Không thể kết nối Backend!");
    }

    // RESET UI
    clearCart();
    toggleCart();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>

        <h2>Checkout</h2>

        <div className="order-summary-mini">
          <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input 
              type="text"
              required
              placeholder="123 Main St, City"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel"
              required
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};
