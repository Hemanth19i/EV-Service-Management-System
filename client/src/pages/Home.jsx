import React from 'react';
import { ArrowRight, Activity, ShieldCheck, BatteryCharging } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <section className="hero container">
        <h1>Next-Generation EV Management</h1>
        <p>Seamlessly manage your electric vehicle fleet, book services, and monitor maintenance records with our industry-leading platform.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard <ArrowRight size={18} />
          </Link>
          <Link to="/services" className="btn btn-outline">
            Book a Service
          </Link>
        </div>
      </section>

      <section className="container" style={{ marginBottom: '80px' }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Why Choose EV Manager?</h2>
          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Activity size={24} />
              </div>
              <div className="stat-info">
                <h3>Real-time Diagnostics</h3>
                <p style={{ fontSize: '1rem', fontWeight: 'normal', marginTop: '8px' }}>Monitor your vehicle's health and battery status with precision.</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <ShieldCheck size={24} />
              </div>
              <div className="stat-info">
                <h3>Secure Maintenance</h3>
                <p style={{ fontSize: '1rem', fontWeight: 'normal', marginTop: '8px' }}>Certified mechanics and transparent service records.</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <BatteryCharging size={24} />
              </div>
              <div className="stat-info">
                <h3>Smart Charging</h3>
                <p style={{ fontSize: '1rem', fontWeight: 'normal', marginTop: '8px' }}>Find stations and optimize your charging schedule effortlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
