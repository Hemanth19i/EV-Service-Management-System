import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import api from '../api/axios';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', licensePlate: '', batteryHealth: 100, mileage: 0
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      setVehicles(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch vehicles');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await api.post('/vehicles', formData);
      setShowForm(false);
      setFormData({ make: '', model: '', year: '', licensePlate: '', batteryHealth: 100, mileage: 0 });
      fetchVehicles(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add vehicle');
    }
    setSubmitLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await api.delete(`/vehicles/${id}`);
        fetchVehicles();
      } catch (err) {
        alert('Failed to delete vehicle');
      }
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading Vehicles...</div>;

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>My Vehicles</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? 'Cancel' : 'Add Vehicle'}
        </button>
      </div>

      {error && <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</div>}

      {showForm && (
        <form className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }} onSubmit={handleSubmit}>
          <h3>Add New Vehicle</h3>
          <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '16px' }}>
            <div className="input-group">
              <label className="input-label">Make</label>
              <input type="text" name="make" className="input-field" required value={formData.make} onChange={handleInputChange} placeholder="e.g. Tesla" />
            </div>
            <div className="input-group">
              <label className="input-label">Model</label>
              <input type="text" name="model" className="input-field" required value={formData.model} onChange={handleInputChange} placeholder="e.g. Model 3" />
            </div>
            <div className="input-group">
              <label className="input-label">Year</label>
              <input type="number" name="year" className="input-field" required value={formData.year} onChange={handleInputChange} placeholder="2024" />
            </div>
            <div className="input-group">
              <label className="input-label">License Plate</label>
              <input type="text" name="licensePlate" className="input-field" required value={formData.licensePlate} onChange={handleInputChange} placeholder="ABC-1234" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitLoading} style={{ marginTop: '16px' }}>
            {submitLoading ? 'Saving...' : 'Save Vehicle'}
          </button>
        </form>
      )}

      {vehicles.length === 0 && !showForm ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }} className="glass-panel">
          <p>You haven't added any vehicles yet.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {vehicles.map(vehicle => (
            <div key={vehicle._id} className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3>{vehicle.make} {vehicle.model}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{vehicle.year}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className={`status-badge ${vehicle.isActive ? 'status-active' : 'status-completed'}`}>
                    {vehicle.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button onClick={() => handleDelete(vehicle._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>License Plate</span>
                  <span>{vehicle.licensePlate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Battery Health</span>
                  <span style={{ color: vehicle.batteryHealth > 80 ? 'var(--success)' : 'var(--warning)', fontWeight: 'bold' }}>
                    {vehicle.batteryHealth}%
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Mileage</span>
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vehicles;
