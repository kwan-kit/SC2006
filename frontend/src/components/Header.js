import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from './AuthContext';
import './Header.css';
const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  const isLandingPage = 
    location.pathname === '/' ||
    location.pathname === '/LandingPage' ||
    location.pathname === '/Login' ||
    location.pathname === '/register' ||
    location.pathname === '/verification';

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`header ${isLandingPage ? 'header-black' : 'header-black'}`}>
      <div className="logo">
        <h1 className="logo-text">HELTH</h1>
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
      <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
        <img className="profile-icon" src="https://via.placeholder.com/40" alt="User Profile" />
        <span className="username">{isLoggedIn ? 'John Smith' : 'Guest'}</span>
        {dropdownVisible && (
          <div className="profile-dropdown">
            <button onClick={handleLoginLogout} className="header-button">
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;