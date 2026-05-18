import React, { useState, useEffect } from 'react';
import { Search, Filter, Check, X } from 'lucide-react';
import api from '../api/axios';

const AdminServices = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/services/admin');
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings');
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      let cost = 0;
      if (newStatus === 'completed') {
        const costInput = prompt('Enter final service cost (e.g. 150.00):', '0');
        if (costInput === null) return; // cancelled
        cost = parseFloat(costInput) || 0;
      }
      
      await api.put(`/services/${id}/status`, { status: newStatus, cost });
      fetchBookings();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading Bookings...</div>;

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Service Bookings Management</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="input-group" style={{ marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', marginLeft: '12px' }} />
            <input type="text" className="input-field" placeholder="Search bookings..." style={{ paddingLeft: '40px', width: '250px' }} />
          </div>
          <button className="btn btn-outline"><Filter size={18} /> Filter</button>
        </div>
      </div>

      <div className="data-table-wrapper glass-panel" style={{ padding: '24px' }}>
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
            <p>No service bookings found.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td style={{ fontWeight: '600' }}>#{booking._id.substring(booking._id.length - 6).toUpperCase()}</td>
                  <td>{booking.user ? booking.user.name : 'Unknown User'}</td>
                  <td>{booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : 'Unknown'}</td>
                  <td>{booking.serviceType}</td>
                  <td>{new Date(booking.preferredDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {booking.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(booking._id, 'active')} className="btn btn-outline" style={{ padding: '4px 8px', borderColor: 'var(--success)', color: 'var(--success)' }} title="Approve">
                            <Check size={16} />
                          </button>
                          <button onClick={() => updateStatus(booking._id, 'cancelled')} className="btn btn-outline" style={{ padding: '4px 8px', borderColor: 'var(--danger)', color: 'var(--danger)' }} title="Reject">
                            <X size={16} />
                          </button>
                        </>
                      )}
                      {booking.status === 'active' && (
                        <button onClick={() => updateStatus(booking._id, 'completed')} className="btn btn-outline" style={{ padding: '4px 8px' }} title="Mark Completed">
                          <Check size={16} /> Complete
                        </button>
                      )}
                      {booking.status === 'completed' || booking.status === 'cancelled' ? (
                        <button className="btn btn-outline" style={{ padding: '4px 8px', opacity: 0.5, cursor: 'not-allowed' }} disabled>
                          Done
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
