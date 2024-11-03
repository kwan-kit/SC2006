import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './styleHybrid.css'; 

const HybridGoals = () => {
  const navigate = useNavigate(); // Use useNavigate for redirecting
  const [activityLevel, setActivityLevel] = useState('Select');
  const [goalDistance, setGoalDistance] = useState('Select');
  const [trainingPeriod, setTrainingPeriod] = useState('Select');

  // Function to handle form submission
  const handleSubmit = (event) => {
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
      activityLevel,
      goalDistance,
      trainingPeriod,
      createdAt: new Date(),
    };

    // Log the training plan for debugging (optional)
    console.log('Training Plan Submitted:', trainingPlan);
    navigate('/Login');
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
          <h2 className="form-title">Set Your Running Goals</h2>
          
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
              <option>5 km</option>
              <option>8 km</option>
              <option>10 km</option>
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
              <option>8 weeks</option>
              <option>10 weeks</option>
              <option>12 weeks</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Done, Back to Login</button>
        </form>
      </div>
    </div>
  );
};

export default HybridGoals;
