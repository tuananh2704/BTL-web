import React, { useEffect, useState } from 'react';

interface Branch {
  id: number;
  name: string;
  address: string;
  manager: string;
  inventoryCount: number;
}

export const BranchList: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    const res = await fetch("http://localhost:3000/api/branch/all");
    const data = await res.json();
    setBranches(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="admin-card">
      <h3>Branch Overview</h3>

      {loading ? <p>Loading...</p> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Manager</th>
              <th>Inventory Items</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {branches.map(branch => (
              <tr key={branch.id}>
                <td>#{branch.id}</td>
                <td>{branch.name}</td>
                <td>{branch.manager || "—"}</td>
                <td>{branch.inventoryCount}</td>
                <td>
                  <button className="action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
