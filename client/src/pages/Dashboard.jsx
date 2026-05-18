import React, { useState, useEffect } from 'react';
import { Calendar, Car, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [vehRes, srvRes] = await Promise.all([
          api.get('/vehicles'),
          api.get('/services')
        ]);
        setVehicles(vehRes.data);
        setServices(srvRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading Dashboard...</div>;

  const pendingServices = services.filter(s => s.status === 'pending' || s.status === 'active').length;

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>User Dashboard</h2>
        <Link to="/services" className="btn btn-primary">Book New Service</Link>
      </div>

      {error && <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</div>}

      <div className="dashboard-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon">
            <Car size={24} />
          </div>
          <div className="stat-info">
            <h3>Registered Vehicles</h3>
            <p>{vehicles.length}</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Bookings</h3>
            <p>{pendingServices}</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Service History</h3>
            <p>{services.length}</p>
          </div>
        </div>
      </div>

      <div className="data-table-wrapper glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Recent Service Requests</h3>
        {services.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No recent service requests.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle</th>
                <th>Service Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service._id}>
                  <td>#{service._id.substring(service._id.length - 6).toUpperCase()}</td>
                  <td>{service.vehicle ? `${service.vehicle.make} ${service.vehicle.model}` : 'Unknown'}</td>
                  <td>{service.serviceType}</td>
                  <td>{new Date(service.preferredDate).toLocaleDateString()}</td>
                  <td><span className={`status-badge status-${service.status}`}>{service.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
