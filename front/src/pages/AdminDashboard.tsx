import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { BranchList } from '../components/admin/BranchList';
import { InventoryOverview } from '../components/admin/InventoryOverview';
import { EmployeeList } from '../components/admin/EmployeeList';
import { CustomerList } from '../components/admin/CustomerList';

import { AdminOrders } from '../components/admin/AdminOrders'; // 🔥 NEW
import { useAdmin } from '../store/AdminContext';

export const AdminDashboard: React.FC = () => {

  const { branches, employees, customers, transactions } = useAdmin();

  const [activePage, setActivePage] = useState("dashboard");

  // 🔥 Theo dõi thay đổi hashtag
  useEffect(() => {
    const updatePage = () => {
      const hash = window.location.hash.replace("#", "");
      setActivePage(hash || "dashboard");
    };

    updatePage();
    window.addEventListener("hashchange", updatePage);

    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  // 🔥 Render theo activePage
  const renderPage = () => {
    switch (activePage) {
      case "orders":
        return <AdminOrders />;

      case "branches":
        return <BranchList />;

      case "inventory":
        return <InventoryOverview />;

      case "customers":
        return <CustomerList />;

      case "employees":
        return <EmployeeList />;

      default:  // dashboard
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <div className="admin-stats">
              <div className="stat-card"><div className="stat-value">{branches.length}</div><div className="stat-label">Total Branches</div></div>
              <div className="stat-card"><div className="stat-value">{employees.length}</div><div className="stat-label">Total Employees</div></div>
              <div className="stat-card"><div className="stat-value">{customers.length}</div><div className="stat-label">Total Customers</div></div>
              <div className="stat-card"><div className="stat-value">{transactions.length}</div><div className="stat-label">Recent Transactions</div></div>
            </div>
          </div>
        );
    }
  };

  return <AdminLayout>{renderPage()}</AdminLayout>;
};
