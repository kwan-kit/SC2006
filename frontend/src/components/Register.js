// src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

  

    if (!securityQuestion || !securityAnswer) {
      alert('Please select a security question and provide an answer.');
      return;
    }

    if (!isChecked) {
      alert('You must agree to the terms and conditions before registering.');
      return;
    }
    
    const securityQuestionNumber = Number(securityQuestion);
    // Prepare registration data
    const registrationData = {
      username,
      password,
      securityQuestion: securityQuestionNumber, // Assuming this needs to be sent as an integer
      answer: securityAnswer,
    };

    console.log(registrationData);


    try {
      // Send POST request 
      const response = await axios.post('/user/register', registrationData);
      console.log(response.data);

      // Navigate to goals page after successful registration
      navigate('/goals');
    } catch (error) {
      if (error.response) {
        // Set error message from server response
        const serverErrors = error.response.data.errors || [];
        const errorMessage = serverErrors.map(err => err.msg).join('\n'); // Show all error messages
        setError(errorMessage); // Set the error state
        alert(errorMessage); // Show the error messages in an alert
      } else {
        setError('An error occurred. Please try again.'); // Fallback error message
        alert('An error occurred. Please try again.'); // Show fallback error message
      }
    }
  };
  

  return (
    <div className="register-container">
      <img src="/running3.png" className="side-image left" alt="left-side" />

      <div className="register-form-wrapper">
        <div className="register-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter your Username" 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
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

            <label>Security Question</label>
            <select 
              required 
              value={securityQuestion} 
              onChange={(e) => setSecurityQuestion(e.target.value)}
              className="security-question-select"
            >
              <option value="">Select a security question</option>
              <option value="1">1. What is your first pet's name?</option>
              <option value="2">2. What is the name of your elementary school?</option>
              <option value="3">3. In which city were you born?</option>
            </select>

            <label>Answer</label>
            <input 
              type="text" 
              placeholder="Enter your Answer" 
              required 
              value={securityAnswer} 
              onChange={(e) => setSecurityAnswer(e.target.value)} 
            />

            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
              />
              I agree to the&nbsp;<Link to="/terms" target="_blank">terms and conditions</Link>
            </label>

            <button type="submit">Register</button>
          </form>
        </div>

        <hr className="divider" />
        <div className="back-to-login-text">
          <p style={{ color: 'white' }}>
            Back to <Link to="/Login" className="back-to-login-link">Login</Link>
          </p>
        </div>
      </div>

      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default Register;