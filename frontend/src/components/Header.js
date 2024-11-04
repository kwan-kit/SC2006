import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from './AuthContext';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isLoggedIn, setIsLoggedIn, profileName, setProfileName } = useContext(AuthContext); // Access profileName
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.post('/user/logout');
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate('/');
        }
      } catch (error) {
        console.error('logout failed: ', error)
      }
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
    location.pathname === '/verification' ||
    location.pathname === '/terms' ||
    location.pathname === '/security-question' ||
    location.pathname === '/goals' ||
    location.pathname === '/running' ||
    location.pathname === '/hybrid' ||
    location.pathname === '/set-new-password';

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Function to check if the user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const response = await axios.get('/session/username'); //change path
      if (response.data.username) {
        setIsLoggedIn(true);
        setProfileName(response.data.username);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setIsLoggedIn(false);
    }
  };  

    // Call checkUserLoggedIn when the component mounts
    useEffect(() => {
      checkUserLoggedIn();
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
        <span className="username">{isLoggedIn ? profileName : 'Guest'}</span>
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
