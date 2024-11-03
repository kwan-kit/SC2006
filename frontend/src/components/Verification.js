import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Verification.css';

const Verification = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSecurityQuestion = async () => {
    try {
      const response = await axios.get(`/user/getSecurityQuestion/${username}`);
      const userCredentials = response.data;

      // Redirect to the security question page, passing the security question
      navigate('/security-question', { state: { securityQuestion: userCredentials.securityQuestion } });
    } catch (err) {
      setError(err.response?.data?.error || 'User not found');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username) {
      fetchSecurityQuestion();
    } else {
      setError('Please enter a username.');
    }
  };

  return (
    <div className="verification-container">
      {/* Left-side image */}
      <img src="/running3.png" className="side-image left" alt="left-side" />

      {/* White box to enclose the form */}
      <div className="verification-form-wrapper">
        <div className="verification-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}

            {/* Button to verify email or phone number */}
            <button type="submit">Answer Security Question</button>
          </form>
        </div>
      </div>

      {/* Right-side image */}
      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default Verification;
