import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); // Hook to handle navigation

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Hide the dropdown
    setDropdownVisible(false);
    // Navigate to the "logged out" page
    navigate('/logout');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/LandingPage">
          <h1 className="logo-text">HELTH</h1>
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/training">Training</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <div className="profile" onClick={toggleDropdown}>
        <img className="profile-icon" src="https://via.placeholder.com/40" alt="User Profile" />
        <span className="username">John Smith</span>
        {dropdownVisible && (
          <div className="profile-dropdown">
            <button onClick={handleLogout} className="logout-button">Log Out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
