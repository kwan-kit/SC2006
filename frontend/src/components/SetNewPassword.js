import React from 'react';
import { Link } from 'react-router-dom';
import './SetNewPassword.css'; // Import your new CSS file

const SetNewPassword = () => {
  return (
    <div className="setnewpassword-container">
      {/* Left-side image */}
      <img src="/woman.png" className="side-image left" alt="left-side" />

      {/* White box to enclose the form */}
      <div className="setnewpassword-form-wrapper">
        <h2 className="lora-title">HELTH</h2>
        <div className="setnewpassword-form-box">
          <form>
            <label>New Password</label>
            <input type="password" placeholder="New Password" required />
            
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm Password" required />
            
            <button type="submit">Set Password</button>
          </form>
          {/* Replace the "Back to Login" button with a text link */}
          <div className="back-to-login-text">
            Go back to{' '}
            <Link to="/" className="back-to-login-link">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right-side image */}
      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default SetNewPassword;