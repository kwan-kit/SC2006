import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleRunning.css';

const RunningGoals = () => {
  const navigate = useNavigate();
  const [activityLevel, setActivityLevel] = useState('Select');
  const [goalDistance, setGoalDistance] = useState('Select');
  const [trainingPeriod, setTrainingPeriod] = useState('Select');
  const [goalTiming, setGoalTiming] = useState('Select');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      activityLevel === 'Select' ||
      goalDistance === 'Select' ||
      trainingPeriod === 'Select' ||
      goalTiming === 'Select'
    ) {
      alert('Please fill in all the fields before submitting the form.');
      return;
    }

    const trainingPlan = {
      activityLevel,
      goalDistance,
      trainingPeriod,
      goalTiming,
      createdAt: new Date(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainingPlan),
      });

      if (response.ok) {
        alert('Form submitted successfully! Let’s Go!');
        navigate('/goals');
      } else {
        alert('An error occurred while submitting the form.');
      }
    } catch (error) {
      console.error('Error inserting document:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="background">
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
          <div className="form-group">
            <label htmlFor="goal-timing">Goal Timing</label>
            <select
              id="goal-timing"
              className="select"
              value={goalTiming}
              onChange={(e) => setGoalTiming(e.target.value)}
            >
              <option>Select</option>
              <option>25 mins</option>
              <option>30 mins</option>
              <option>35 mins</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Done, Let’s Go!</button>
        </form>
      </div>
    </div>
  );
};

export default RunningGoals;
