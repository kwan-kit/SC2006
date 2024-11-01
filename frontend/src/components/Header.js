import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from './AuthContext';
import './Header.css';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/Login');
    }
    setDropdownVisible(false);
  };

  // Check if the current path is either "/" or "/LandingPage"
  const isLandingPage = location.pathname === '/' || location.pathname === '/LandingPage';

  return (
    <header className={`header ${isLandingPage ? 'header-transparent' : 'header-black'}`}>
      <div className="logo">
        {isLandingPage ? (
          <h1 className="logo-text">HELTH</h1>
        ) : (
            <h1 className="logo-text">HELTH</h1>
        )}
      </div>
      <nav className="nav">
        <ul className="nav-links">
          {isLandingPage && (
            <li><HashLink smooth to="/#feature-id">Key Features</HashLink></li>
          )}
          {!isLandingPage && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/training">Training</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div className="profile" onClick={toggleDropdown}>
        <img className="profile-icon" src="https://via.placeholder.com/40" alt="User Profile" />
        <span className="username">{isLoggedIn ? 'John Smith' : 'Guest'}</span>
        {dropdownVisible && (
          <div className="profile-dropdown">
            <button onClick={handleLoginLogout} className="login-logout-button">
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;