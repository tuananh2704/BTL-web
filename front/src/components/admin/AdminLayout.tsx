import React from 'react';
import { useAuth } from '../../store/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout, user } = useAuth();

  // 🟦 Lấy hash đang active (#dashboard, #orders,...)
  const current = window.location.hash;

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">

        {/* Logo */}
        <div className="admin-logo">Admin Panel</div>

        {/* Username */}
        <div style={{ padding: '0 1.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#bbb' }}>
          Welcome, {user?.username}
        </div>

        {/* Navigation */}
        <nav className="admin-nav">

          <a 
            href="#dashboard" 
            className={`admin-nav-link ${current === "#dashboard" || current === "" ? "active" : ""}`}
          >
            Dashboard
          </a>

          <a 
            href="#orders" 
            className={`admin-nav-link ${current === "#orders" ? "active" : ""}`}
          >
            Orders
          </a>

          <a 
            href="#branches" 
            className={`admin-nav-link ${current === "#branches" ? "active" : ""}`}
          >
            Branches
          </a>

          <a 
            href="#inventory" 
            className={`admin-nav-link ${current === "#inventory" ? "active" : ""}`}
          >
            Inventory
          </a>

          <a 
            href="#customers" 
            className={`admin-nav-link ${current === "#customers" ? "active" : ""}`}
          >
            Customers
          </a>

          <a 
            href="#employees" 
            className={`admin-nav-link ${current === "#employees" ? "active" : ""}`}
          >
            Employees
          </a>
        </nav>

        {/* Logout Button */}
        <div style={{ marginTop: 'auto', padding: '1.5rem' }}>
          <button 
            onClick={logout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};
