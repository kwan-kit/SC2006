import React from 'react';
import { Link } from 'react-router-dom';
import './Verification.css'; // Import CSS for the verification page styling

const Verification = () => {
  return (
    <div className="verification-container">
      {/* Left-side image */}
      <img src="/running3.png" className="side-image left" alt="left-side" />

      {/* White box to enclose the form */}
      <div className="verification-form-wrapper">
        <div className="verification-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form>
            <label>Email or phone number</label>
            <input type="text" placeholder="Enter your Email or Phone number" required />

            {/* Button to verify email or phone number */}
            <Link to="/security-question">
              <button type="button">Answer Security Question</button>
            </Link>
          </form>
        </div>
      </div>

      {/* Right-side image */}
      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default Verification;