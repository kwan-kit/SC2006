// src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email or phone number is valid
    const isValidEmail = emailOrPhone.includes('@');
    const isValidPhone = /^\d{8}$/.test(emailOrPhone);

    if (!isValidEmail && !isValidPhone) {
      alert('Please enter a valid email or an 8-digit phone number.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    if (!isChecked) {
      alert('You must agree to the terms and conditions before registering.');
      return;
    }

    alert("Successfully registered! Please login with your email/phone number and password.");
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="register-container">
      <img src="/running3.png" className="side-image left" alt="left-side" />

      <div className="register-form-wrapper">
        <div className="register-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={handleSubmit}>
            <label>Register</label>
            <input 
              type="text" 
              placeholder="Enter your Email or Phone Number" 
              required 
              value={emailOrPhone} 
              onChange={(e) => setEmailOrPhone(e.target.value)} 
            />

            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your Password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm Password" 
              required 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />

            <label>
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
              />
              I agree to the <Link to="/terms" target="_blank">terms and conditions</Link>
            </label>
            
            <button type="submit">Register</button>
          </form>
        </div>

        <hr className="divider" />
        <div className="back-to-login-text">
          <p style={{ color: 'white' }}>
            Back to <Link to="/" className="back-to-login-link">Login</Link>
          </p>
        </div>
      </div>

      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default Register;
