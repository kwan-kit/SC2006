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
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li><a href="#route">Route</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
