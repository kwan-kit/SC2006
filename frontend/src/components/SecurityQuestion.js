import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for redirection
import './Verification.css'; // CSS for styling

const SecurityQuestion = () => {
  const [securityAnswer, setSecurityAnswer] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the security answer
    if (!securityAnswer) {
      alert('Please enter your answer to the security question.');
      return;
    }

    // If the answer is valid, navigate to the Set New Password page
    navigate('/set-new-password');
  };

  return (
    <div className="verification-container">
      <img src="/running3.png" className="side-image left" alt="left-side" />

      <div className="verification-form-wrapper">
        <div className="verification-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={handleSubmit}>
            <label>Security Question: What is your pet's name?</label>
            <input 
              type="text" 
              placeholder="Enter your answer" 
              value={securityAnswer} 
              onChange={(e) => setSecurityAnswer(e.target.value)} 
            />

            {/* Button to submit the answer */}
            <button className="rounded-button" type="submit">Submit Answer</button>
          </form>
        </div>
      </div>

      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default SecurityQuestion;