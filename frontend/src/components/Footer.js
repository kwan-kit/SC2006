import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h1>HELTH</h1>
        <p>2024 HELTH</p>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li>Route</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;