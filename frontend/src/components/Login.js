import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from './AuthContext'; // Import AuthContext
import './Login.css'; 

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext); // Access setIsLoggedIn
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login logic, set the user as logged in
    setIsLoggedIn(true); // Update logged-in state
    navigate('/goals'); // Navigate to the goals page
  };

  return (
    <div className="login-container">
      {/* Left-side image */}
      <img src="/running3.png" className="side-image left" alt="left-side" />
      {/* White box to enclose the form */}
      <div className="login-form-wrapper">
        <div className="login-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}> {/* Handle form submission */}
            <label>Login</label>
            <input type="email" placeholder="Enter your Email or Phone Number" required />

            <label>Password</label>
            <input type="password" placeholder="Enter your Password" required />

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