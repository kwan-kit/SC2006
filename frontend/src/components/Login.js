import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported correctly
import './Login.css'; // Import CSS for the login page styling

const Login = () => {
  return (
    <div className="login-container">
      {/* Left-side image */}
      <img src="/woman.png" className="side-image left" alt="left-side" />

      {/* White box to enclose the form */}
      <div className="login-form-wrapper">
        <div className="login-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form>
            <label>Login</label>
            <input type="email" placeholder="Enter your Email or Phone Number" required />

            <label>Password</label>
            <input type="password" placeholder="Enter your Password" required />

            {/* Replace button with Link */}
            <Link to="/goals">
              <button type="button">Login</button>
            </Link>
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