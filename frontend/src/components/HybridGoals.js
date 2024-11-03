import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './styleHybrid.css'; 

const HybridGoals = () => {
  const navigate = useNavigate();
  const [activityLevel, setActivityLevel] = useState('Select');
  const [goalDistance, setGoalDistance] = useState('Select');
  const [trainingPeriod, setTrainingPeriod] = useState('Select');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if all fields are filled
    if (
      activityLevel === 'Select' ||
      goalDistance === 'Select' ||
      trainingPeriod === 'Select'
    ) {
      alert('Please fill in all the fields before submitting the form.');
      return;
    }

    const trainingPlan = {
      planType: "hybrid",
      activityLevel: activityLevel.toLowerCase(), // Convert to lowercase for consistency
      goalDistance: Number(goalDistance),
      trainingPeriod: Number(trainingPeriod),
      createdAt: new Date(),
    };

    try {
      // Send the training plan to the server
      const response = await axios.post('/healthdata/register', trainingPlan);
      console.log('Response from server:', response.data);
      navigate('/Login'); // Redirect to login page on success
    } catch (error) {
      console.error('Error submitting the training plan:', error);
      alert('There was an error submitting your goals. Please try again.');
    }
  };

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/gymRopes.jpeg'})`,
        position: 'relative',
      }}
    >
      {/* Goal Form */}
      <div className="container">
        <form className="goal-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Set Your Hybrid Goals</h2> {/* Updated title */}
          
          <div className="form-group">
            <label htmlFor="activity-level">Level of Activity</label>
            <select
              id="activity-level"
              className="select"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option>Select</option>
              <option>Novice</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="goal-distance">Goal Distance</label>
            <select
              id="goal-distance"
              className="select"
              value={goalDistance}
              onChange={(e) => setGoalDistance(e.target.value)}
            >
              <option>Select</option>
              <option value="5">5 km</option>
              <option value="8">8 km</option>
              <option value="10">10 km</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="training-period">Training Period</label>
            <select
              id="training-period"
              className="select"
              value={trainingPeriod}
              onChange={(e) => setTrainingPeriod(e.target.value)}
            >
              <option>Select</option>
              <option value="8">8 weeks</option>
              <option value="10">10 weeks</option>
              <option value="12">12 weeks</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Done, Back to Login</button>
        </form>
      </div>
    </div>
  );
};

export default HybridGoals;
