import React, { useEffect, useState } from "react";
import "./AdminOrders.css";

interface Order {
  id: number;
  full_name: string;
  address: string;
  phone: string;
  total_price: number;
  order_date: string;
}

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  // 🟦 Lấy danh sách order từ DB
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:3000/api/order/all");
    const data = await res.json();
    setOrders(data);
  };

  // 🟦 Lấy chi tiết items của order
  const fetchOrderItems = async (orderId: number) => {
    const res = await fetch(`http://localhost:3000/api/order/${orderId}/items`);
    const data = await res.json();
    setOrderItems(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>Order History (From Database)</h2>

      {/* 🟩 LIST ORDERS */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Total Price</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.full_name}</td>
              <td>{order.phone}</td>
              <td>{order.total_price}</td>
              <td>{order.order_date}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedOrder(order.id);
                    fetchOrderItems(order.id);
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🟩 ORDER DETAIL */}
      {selectedOrder && (
        <div className="order-detail">
          <h3>Order #{selectedOrder} Details</h3>

          {orderItems.map(item => (
            <div key={item.id} className="order-item-card">
              <img src={item.image_url} alt="" width={80} />
              <div>
                <p><strong>{item.tenMatHang}</strong></p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            </div>
          ))}

          <button onClick={() => setSelectedOrder(null)}>Close</button>
        </div>
      )}
    </div>
  );
};
