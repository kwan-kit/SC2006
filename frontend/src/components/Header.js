import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from React Router
import './Header.css';  // Your custom CSS

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>HELTH</h1>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/training">Training</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <div className="profile">
        <img src="https://via.placeholder.com/40" alt="Profile" className="profile-icon" />
        <span className="username">John Smith</span>
      </div>
    </header>
  );
};

export default Header;