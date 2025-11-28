import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { useCart } from '../store/CartContext';
import { AuthModal } from './AuthModal';
import { OrderHistory } from './OrderHistory';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const { totalItems, toggleCart } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <a href="/" className="logo">MinimalStore</a>

          {/* SEARCH BAR */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {/* ACTIONS */}
          <div className="header-actions">
            <nav className="nav-links">
              <a href="#" className="nav-link">Shop</a>
            </nav>

            <button className="cart-btn" onClick={toggleCart}>
              Cart ({totalItems})
            </button>

            {/* ============ USER LOGIN LOGIC ============ */}
            {user ? (
              <div className="user-menu">
                <span className="username">Hi, {user.username}</span>

                {/* ⭐ ADMIN BUTTON ⭐ */}
                {user.role === "ADMIN" && (
                  <a
                    href="/admin"
                    className="admin-btn"
                    style={{
                      marginRight: "10px",
                      padding: "6px 12px",
                      background: "#111",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    Admin
                  </a>
                )}

                {/* ⭐ CUSTOMER HISTORY ⭐ */}
                {user.role === "CUSTOMER" && (
                  <button
                    onClick={() => setIsOrderHistoryOpen(true)}
                    className="history-btn"
                    title="View Order History"
                    style={{ marginRight: "10px" }}
                  >
                    History
                  </button>
                )}

                <button onClick={logout} className="auth-btn">Logout</button>
              </div>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="auth-btn">
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* POPUPS */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <OrderHistory
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
      />
    </>
  );
};
