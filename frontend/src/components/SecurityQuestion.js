import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Verification.css'; // CSS for styling

const SecurityQuestion = () => {
  return (
    <div className="verification-container">
      {/* Left-side image */}
      <img src="/running3.png" className="side-image left" alt="left-side" />

      {/* White box enclosing the form */}
      <div className="verification-form-wrapper">
        <div className="verification-form-box">
        <h2 className="lora-title">HELTH</h2>
          <label>Security Question: What is your pet's name?</label>
          <input type="text" placeholder="Enter your answer" required />
          
          {/* Link to Set New Password page */}
          <Link to="/set-new-password" style={{ width: '100%' }}>
            <button className="rounded-button" type="button">Submit Answer</button>
          </Link>
        </div>
      </div>

      {/* Right-side image */}
      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default SecurityQuestion;