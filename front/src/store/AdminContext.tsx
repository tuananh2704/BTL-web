import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Giữ mock cho các phần khác (employee, customer, transaction)
import {
  Branch,
  InventoryTransaction,
  Employee,
  Customer,
  inventoryTransactions as initialTransactions,
  employees as initialEmployees,
  customers as initialCustomers,
} from "../data/adminMock";

interface AdminContextType {
  branches: Branch[];
  transactions: InventoryTransaction[];
  employees: Employee[];
  customers: Customer[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 🔥 Chi nhánh LẤY TỪ DATABASE chứ không dùng mock
  const [branches, setBranches] = useState<Branch[]>([]);

  const [transactions] =
    useState<InventoryTransaction[]>(initialTransactions);
  const [employees] = useState<Employee[]>(initialEmployees);
  const [customers] = useState<Customer[]>(initialCustomers);

  /** 🔥 FETCH CHI NHÁNH TỪ BACKEND */
  const fetchBranches = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/branch/all");
      const data = await res.json();
      setBranches(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách chi nhánh:", err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        branches,
        transactions,
        employees,
        customers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
