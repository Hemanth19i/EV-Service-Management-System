import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Search } from 'lucide-react';
import api from '../api/axios';

const MaintenanceRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await api.get('/services');
        // Filter only completed services for records
        const completedServices = res.data.filter(s => s.status === 'completed');
        setRecords(completedServices);
      } catch (err) {
        console.error('Failed to load records');
      }
      setLoading(false);
    };
    fetchRecords();
  }, []);

  const filteredRecords = records.filter(record => 
    (record.vehicle?.make?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    record.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading Records...</div>;

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Maintenance Records</h2>
        <div className="input-group" style={{ marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
          <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', marginLeft: '12px' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search records..." 
            style={{ paddingLeft: '40px', width: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-grid">
        {filteredRecords.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }} className="glass-panel">
            <FileText size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
            <h3>No Records Found</h3>
            <p>{searchTerm ? 'Try adjusting your search terms.' : 'You have no completed service records yet.'}</p>
          </div>
        ) : (
          filteredRecords.map(record => (
            <div key={record._id} className="glass-panel" style={{ padding: '24px', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', backgroundColor: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', color: 'var(--accent-primary)' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>{record.vehicle ? `${record.vehicle.make} ${record.vehicle.model}` : 'Unknown Vehicle'}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{record.serviceType}</p>
                  </div>
                </div>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>${record.cost.toFixed(2)}</span>
              </div>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Calendar size={14} /> {new Date(record.updatedAt).toLocaleDateString()}
                </div>
                {record.mechanicNotes && (
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Notes: <span style={{ color: 'var(--text-primary)' }}>{record.mechanicNotes}</span>
                  </div>
                )}
              </div>

              <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px', padding: '8px' }}>
                <Download size={16} /> Download Invoice
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MaintenanceRecords;
