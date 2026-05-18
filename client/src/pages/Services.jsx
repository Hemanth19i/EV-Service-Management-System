import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Services = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  
  const [formData, setFormData] = useState({
    vehicle: '',
    serviceType: '',
    preferredDate: '',
    notes: ''
  });
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get('/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error('Failed to fetch vehicles');
      }
      setLoadingVehicles(false);
    };
    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    try {
      await api.post('/services', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ vehicle: '', serviceType: '', preferredDate: '', notes: '' });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book service');
    }
    setSubmitLoading(false);
  };

  if (loadingVehicles) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="container animate-fade-in">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Book a Service</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Schedule maintenance or diagnostics for your electric vehicle.
        </p>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        {isSubmitted ? (
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', borderColor: 'var(--success)' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: '16px' }}>Booking Confirmed!</h3>
            <p>Your service request has been received. We will contact you shortly.</p>
            <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '24px' }}>Go to Dashboard</Link>
          </div>
        ) : (
          <form className="glass-panel" style={{ padding: '32px' }} onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Select Vehicle</label>
              {vehicles.length === 0 ? (
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  No vehicles found. <Link to="/vehicles" style={{ color: 'var(--accent-primary)' }}>Add a vehicle first</Link>.
                </div>
              ) : (
                <select className="input-field" name="vehicle" required value={formData.vehicle} onChange={handleInputChange}>
                  <option value="">-- Choose Vehicle --</option>
                  {vehicles.map(v => (
                    <option key={v._id} value={v._id}>{v.make} {v.model} ({v.licensePlate})</option>
                  ))}
                </select>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Service Type</label>
              <select className="input-field" name="serviceType" required value={formData.serviceType} onChange={handleInputChange}>
                <option value="">-- Choose Service --</option>
                <option value="Battery Diagnostics">Battery Diagnostics</option>
                <option value="Software Update">Software Update</option>
                <option value="General Maintenance">General Maintenance</option>
                <option value="Brake Inspection">Brake Inspection</option>
                <option value="Tire Rotation">Tire Rotation</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Preferred Date</label>
              <input type="date" name="preferredDate" className="input-field" required value={formData.preferredDate} onChange={handleInputChange} />
            </div>

            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label className="input-label">Additional Notes</label>
              <textarea 
                className="input-field" 
                name="notes"
                rows="4" 
                placeholder="Describe any specific issues..."
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitLoading || vehicles.length === 0}>
              {submitLoading ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Services;
