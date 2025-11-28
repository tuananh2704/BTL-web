import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  searchQuery: string;
}

export const ProductList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.tenMatHang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <section className="product-list-section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>

        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Không tìm thấy sản phẩm.
          </p>
        )}
      </div>
    </section>
  );
};
