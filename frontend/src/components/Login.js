import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from './AuthContext'; // Import AuthContext
import axios from 'axios';
import './Login.css'; 

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext); // Access setIsLoggedIn
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error messages

  const handleLogin = async (e) => {
    // Simulate login logic, set the user as logged in
    e.preventDefault();
    try {
      //send POST req to backend check-pw route
      const response = await axios.post('/user/check-password', { username, password });
      console.log(response.data);
      setIsLoggedIn(true); // Update logged-in state
      navigate('/Dashboard');
    }
    catch (err) {
      if (err.response) {
        setError(err.response.data.message); // Set error message from server response
      } else {
        setError('An error occurred. Please try again.'); // Fallback error message
      }
    }
    
  };

  return (
    <div className="login-container">
      {/* Left-side image */}
      <img src="/running3.png" className="side-image left" alt="left-side" />

      {/* White box to enclose the form */}
      <div className="login-form-wrapper">
        <div className="login-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={ handleLogin }> {/* Handle form submission */}
            <label>Username</label>
            <input placeholder="Enter your Username" required />

            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your Password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />

            {/* Replace button with onClick handler */}
            <button type="submit">Login</button>
          </form>

          {/* Link for "Forgot Password" */}
          <Link to="/verification" className="forgot-password-button">
            Forgot Password?
          </Link>
        </div>

        {/* Divider and sign-up text below the white box */}
        <hr className="divider" />
        <div className="sign-up-text">
          <p>
            Don't have an account? <Link to="/register" className="sign-up-link">Sign up now!</Link>
          </p>
        </div>
      </div>
      
      {/* Right-side image */}
      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default Login;