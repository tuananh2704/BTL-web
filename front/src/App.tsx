import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';

import { AuthProvider, useAuth } from './store/AuthContext';
import { CartProvider } from './store/CartContext';
import { OrderProvider } from './store/OrderContext';
import { AdminProvider } from './store/AdminContext';

import { AdminDashboard } from './pages/AdminDashboard';

const MainContent: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // 🔥 ĐÚNG CHUẨN QUYỀN ADMIN TRẢ TỪ BACKEND
  const isAdmin = user?.role === "ADMIN";

  if (isAdmin) {
    return (
      <div className="app">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="app">
      <Header onSearch={setSearchQuery} />
      <main>
        {/* ProductList tự fetch API nên KHÔNG truyền products */}
        <ProductList searchQuery={searchQuery} />
      </main>
      <Footer />
      <Cart />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <AdminProvider>
            <MainContent />
          </AdminProvider>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
};

export default App;
