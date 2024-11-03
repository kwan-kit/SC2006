import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Verification.css';

const SecurityQuestion = () => {
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityQuestionText, setSecurityQuestionText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Define a mapping of security question IDs to the question text
  const securityQuestionsMap = {
    1: "What is your first pet's name?",
    2: "What is the name of your elementary school?",
    3: "In which city were you born?"
  };

  useEffect(() => {
    // Retrieve the security question ID from location.state and map it to text
    const securityQuestionId = location.state?.securityQuestion;
    if (securityQuestionId && securityQuestionsMap[securityQuestionId]) {
      setSecurityQuestionText(securityQuestionsMap[securityQuestionId]);
    } else {
      setSecurityQuestionText("Security question not found.");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!securityAnswer) {
      alert('Please enter your answer to the security question.');
      return;
    }

    try {
      // Make a POST request to check the answer
      const response = await axios.post('/user/check-security-question', { answer: securityAnswer });

      if (response.status === 200) {
        // Navigate to the Set New Password page if the answer is correct
        navigate('/set-new-password');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Incorrect answer. Please try again.');
      } else {
        console.error('Error submitting security answer:', error);
        alert('Error. Please try again.');
      }
    }
  };

  return (
    <div className="verification-container">
      <img src="/running3.png" className="side-image left" alt="left-side" />

      <div className="verification-form-wrapper">
        <div className="verification-form-box">
          <h2 className="lora-title">HELTH</h2>
          <form onSubmit={handleSubmit}>
            <label>Security Question: {securityQuestionText}</label>
            <input 
              type="text" 
              placeholder="Enter your answer" 
              value={securityAnswer} 
              onChange={(e) => setSecurityAnswer(e.target.value)} 
            />
            <button className="rounded-button" type="submit">Submit Answer</button>
          </form>
        </div>
      </div>

      <img src="/weights.jpeg" className="side-image right" alt="right-side" />
    </div>
  );
};

export default SecurityQuestion;
