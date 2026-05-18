import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import api from '../api/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/auth/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users');
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>User Management</h2>
        <button className="btn btn-primary"><UserPlus size={18} /> Add User</button>
      </div>

      <div className="data-table-wrapper glass-panel" style={{ padding: '24px' }}>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ height: '60px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
            ))}
          </div>
        ) : users.length === 0 ? (
           <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
              <UserPlus size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
              <h3>No Users Found</h3>
              <p>Get started by adding a new user to the system.</p>
           </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td style={{ color: 'var(--text-secondary)' }}>#{user._id.substring(user._id.length - 6).toUpperCase()}</td>
                  <td style={{ fontWeight: '500' }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.role === 'Admin' ? 'status-active' : 'status-completed'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-outline" style={{ padding: '6px', border: 'none' }} title="Edit Role"><Edit size={16} /></button>
                      <button className="btn btn-outline" style={{ padding: '6px', border: 'none', color: 'var(--danger)' }} title="Delete User"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}} />
    </div>
  );
};

export default AdminUsers;
