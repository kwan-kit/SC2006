import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  
import './Header.css';  

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Function to close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>^</span>
            </span>
            {isDropdownOpen && (
              <ul className="dropdown-content">
                <li onClick={toggleDropdown}>
                  <Link to="/running-plan">Running Plan</Link>
                </li>
                <hr className="dropdown-divider" />
                <li onClick={toggleDropdown}>
                  <Link to="/hybrid-plan">Hybrid Plan</Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* Settings Link */}
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
