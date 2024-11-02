import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './SetNewPassword.css';

const SetNewPassword = () => {
  // States to hold password inputs
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword === confirmPassword) {
      // Show the success message in a pop-up
      alert("Password successfully reset, please log in with your new password!");

      // Redirect to the login page after success
      navigate('/Login');

    } else {
      // Show an error if passwords do not match
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="setnewpassword-container">
      {/* Left-side image */}
      <img src="/running3.png" className="side-image left" alt="left-side" />

      {/* White box to enclose the form */}
      <div className="setnewpassword-form-wrapper">
        <div className="setnewpassword-form-box">
          <form onSubmit={handleSubmit}>
            <h2 className="lora-title">HELTH</h2>
            
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}  // Update state when input changes
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}  // Update state when input changes
            />

            <button type="submit">Set Password</button>
          </form>
        </div>

        {/* Divider and Back to Login text */}
        <hr className="divider" />
        <div className="back-to-login-text">
          Go back to{' '}
          <Link to="/Login" className="back-to-login-link">
            Login
          </Link>
        </div>
      </div>

      {/* Right-side image */}
      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default SetNewPassword;