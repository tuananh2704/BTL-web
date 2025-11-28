import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>MinimalStore</h3>
            <p>Simple, elegant, and functional products for your everyday life.</p>
          </div>
          <div className="footer-column">
            <h3>Links</h3>
            <p>Shop</p>
            <p>About Us</p>
            <p>Contact</p>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p>Email: hello@minimalstore.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MinimalStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
