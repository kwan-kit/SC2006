import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Importing your CSS styles for layout

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert('You must agree to the terms and conditions before registering.');
      return;
    }
    // Submit form or other logic
  };

  return (
    <div className="register-container">
      {/* Left-side image */}
      <img src="/woman.png" className="side-image left" alt="left-side" />

      {/* White box around the form */}
      <div className="register-form-wrapper">
        <div className="register-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={handleSubmit}>
            <label>Register</label>
            <input type="email" placeholder="Enter your Email or Phone Number" required />

            <label>Password</label>
            <input type="password" placeholder="Enter your Password" required />
            
            {/* Checkbox for agreeing to terms and conditions */}
            <label>
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
              />
              I agree to the <a href="/terms">terms and conditions</a>
            </label>
            
            <button type="submit">Register</button>
          </form>
        </div>

        {/* Divider and Back to Login text below the white box */}
        <hr className="divider" />
        <div className="back-to-login-text">
          <p style={{ color: 'white' }}>
            Back to <Link to="/" className="back-to-login-link">Login</Link>
          </p>
        </div>
      </div>

      {/* Right-side image */}
      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default Register;