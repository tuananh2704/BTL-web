import React from 'react';
import { Product } from '../types/product';
import { useCart } from '../store/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image_url} 
          alt={product.tenMatHang} 
          className="product-image" 
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.tenMatHang}</h3>

        <p className="product-description">
          {product.moTa}
        </p>

        <div className="product-footer">
          <span className="product-price">
            {product.donGia.toLocaleString()} ₫
          </span>

          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
