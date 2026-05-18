import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar animate-fade-in">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <Zap size={28} color="var(--accent-primary)" />
          <span>EV Manager</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          {user && (
            <>
              <Link to="/vehicles" className={`nav-link ${isActive('/vehicles')}`}>Vehicles</Link>
              <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
              {user.role === 'Admin' && (
                <Link to="/admin" className={`nav-link ${isActive('/admin') || isActive('/admin/services') || isActive('/admin/users') ? 'active' : ''}`} style={{ color: 'var(--warning)' }}>Admin Panel</Link>
              )}
            </>
          )}
          
          {!user ? (
            <Link to="/login" className="btn btn-primary">Sign In</Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '6px 12px' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
