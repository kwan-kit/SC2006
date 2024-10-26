import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  
import './Header.css';  

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown menu on click
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to close the dropdown when an option is selected
  const handleOptionClick = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>HELTH</h1>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          
          {/* Key Features with Dropdown */}
          <li className="dropdown" ref={dropdownRef}>
            <span className="dropdown-title" onClick={toggleDropdown}>
              Key Features
              {/* Arrow to indicate dropdown */}
              <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>^</span>
            </span>
            {isDropdownOpen && (
              <ul className="dropdown-content">
                <li onClick={handleOptionClick}>
                  <Link to="/running-plan">Running Plan</Link>
                </li>
                <hr className="dropdown-divider" />
                <li onClick={handleOptionClick}>
                  <Link to="/hybrid-plan">Hybrid Plan</Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* Settings Link */}
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
