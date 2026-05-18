import React, { useState, useEffect } from 'react';
import { Users, Wrench, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, pending: 0, completed: 0, revenue: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, servicesRes] = await Promise.all([
          api.get('/auth/users'),
          api.get('/services/admin')
        ]);
        
        const allUsers = usersRes.data;
        const allServices = servicesRes.data;

        const pending = allServices.filter(s => s.status === 'pending').length;
        const completed = allServices.filter(s => s.status === 'completed');
        const revenue = completed.reduce((acc, curr) => acc + (curr.cost || 0), 0);

        setStats({
          users: allUsers.length,
          pending: pending,
          completed: completed.length,
          revenue: revenue
        });
      } catch (err) {
        console.error('Failed to fetch admin stats');
      }
      setIsLoading(false);
    };
    fetchAdminData();
  }, []);

  if (isLoading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ color: 'var(--accent-primary)', textAlign: 'center' }}>
          <Wrench size={48} className="animate-spin" style={{ animation: 'spin 2s linear infinite' }} />
          <p style={{ marginTop: '16px' }}>Loading Admin Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Admin Overview</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/admin/services" className="btn btn-outline">Manage Services</Link>
          <Link to="/admin/users" className="btn btn-primary">Manage Users</Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Pending Bookings</h3>
            <p>{stats.pending}</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Services Completed</h3>
            <p>{stats.completed}</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <BarChart3 size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p>${stats.revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '32px', padding: '32px' }}>
        <h3>System Status</h3>
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
              <span>API Gateway</span>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>Operational</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
              <span>Database Cluster (MongoDB)</span>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
