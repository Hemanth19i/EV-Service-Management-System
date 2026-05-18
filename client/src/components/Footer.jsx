import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-text">
          &copy; {new Date().getFullYear()} EV Service & Vehicle Management System. All rights reserved.
        </div>
        <div className="footer-text">
          Designed for a sustainable future.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
