import React, { useState } from 'react';
import { useAdmin } from '../../store/AdminContext';
import { Employee } from '../../data/adminMock';

export const EmployeeList: React.FC = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, branches } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    branchId: branches[0]?.id || 0,
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      branchId: branches[0]?.id || 0,
      email: '',
      phone: '',
      status: 'active'
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (emp: Employee) => {
    setFormData({
      name: emp.name,
      position: emp.position,
      branchId: emp.branchId,
      email: emp.email,
      phone: emp.phone,
      status: emp.status
    });
    setEditingId(emp.id);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEmployee(editingId, formData);
    } else {
      addEmployee(formData);
    }
    resetForm();
  };

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Employee Management</h3>
        <button className="action-btn" onClick={() => {
          if (isAdding) resetForm();
          else setIsAdding(true);
        }}>
          {isAdding ? 'Cancel' : 'Add Employee'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="admin-form" style={{ marginBottom: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input 
              type="text" 
              required 
              value={formData.position}
              onChange={e => setFormData({...formData, position: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Branch</label>
            <select 
              value={formData.branchId}
              onChange={e => setFormData({...formData, branchId: Number(e.target.value)})}
            >
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              required 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select 
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="checkout-btn" style={{ marginTop: '1rem' }}>
            {editingId ? 'Update Employee' : 'Save Employee'}
          </button>
        </form>
      )}

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Branch ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>#{emp.branchId}</td>
                <td>{emp.email}</td>
                <td>
                  <span className={`badge ${emp.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn" onClick={() => handleEdit(emp)} style={{ marginRight: '0.5rem' }}>Edit</button>
                  <button className="action-btn" onClick={() => deleteEmployee(emp.id)} style={{ background: '#ff4444', color: 'white' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
