import React from 'react';
import { Link } from 'react-router-dom';  
import './Header.css';  

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>HELTH</h1>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          {/* Key Features with Dropdown */}
          <li className="dropdown">
            <span className="dropdown-title">
              Key Features
              {/* Arrow to indicate dropdown */}
              <span className="arrow">^</span>
            </span>
            <ul className="dropdown-content">
              <li>
                <Link to="/running-plan">Running Plan</Link>
              </li>
              <hr className="dropdown-divider" />
              <li>
                <Link to="/hybrid-plan">Hybrid Plan</Link>
              </li>
            </ul>
          </li>
          
          {/* Settings Link */}
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
