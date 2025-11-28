import React from 'react';
import { useAdmin } from '../../store/AdminContext';

export const CustomerList: React.FC = () => {
  const { customers } = useAdmin();

  return (
    <div className="admin-card">
      <h3>Purchased Customers</h3>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Last Purchase</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>#{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.totalOrders}</td>
                <td>${customer.totalSpent.toFixed(2)}</td>
                <td>{customer.lastPurchaseDate}</td>
                <td>
                  <span className={`badge ${customer.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
