import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  tenMatHang: string;
  soLuongTon: number;
  donGia: number;
  image_url: string;
}

export const InventoryOverview: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Inventory (From Database)</h3>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.image_url}
                    alt={p.tenMatHang}
                    width={50}
                    style={{ borderRadius: "6px" }}
                  />
                </td>
                <td>{p.tenMatHang}</td>
                <td>{p.soLuongTon}</td>
                <td>{p.donGia.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
