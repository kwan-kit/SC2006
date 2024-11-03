import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styleRunning.css';

const RunningGoals = () => {
  const navigate = useNavigate();
  const [activityLevel, setActivityLevel] = useState('Select');
  const [goalDistance, setGoalDistance] = useState(null);
  const [trainingPeriod, setTrainingPeriod] = useState(null);
  const [goalTiming, setGoalTiming] = useState(null);

  // Memoized options for Goal Timing based on the provided data
  const timingOptions = useMemo(() => ({
    Novice: {
      '5': [35, 30],
      '8': [55, 50],
      '10': [70, 65],
    },
    Intermediate: {
      '5': [30, 25],
      '8': [50, 45],
      '10': [65, 60],
    },
    Advanced: {
      '5': [25, 20],
      '8': [45, 40],
      '10': [60, 55],
    },
  }), []); // No dependencies, will remain constant

  const [availableTimingOptions, setAvailableTimingOptions] = useState([]);

  useEffect(() => {
    if (activityLevel !== 'Select' && goalDistance) {
      const timings = timingOptions[activityLevel][goalDistance];
      setAvailableTimingOptions(timings || []);
      setGoalTiming(null); // Reset goal timing when changing selections
    } else {
      setAvailableTimingOptions([]);
      setGoalTiming(null); // Reset goal timing if selections are not valid
    }
  }, [activityLevel, goalDistance, timingOptions]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for valid selections
    if (
      activityLevel === 'Select' ||
      !goalDistance ||
      !trainingPeriod ||
      goalTiming === null // Change to null check for goalTiming
    ) {
      alert('Please fill in all the fields before submitting the form.');
      return;
    }

    // Create the training plan object
    const trainingPlan = {
      planType: 'running',
      activityLevel: activityLevel.toLowerCase(),
      goalDistance: Number(goalDistance), // Ensure it's a number
      trainingPeriod: Number(trainingPeriod), // Ensure it's a number
      goalTiming: goalTiming, 
      createdAt: new Date(),
    };

    try {
      // Send the training plan to the server
      const response = await axios.post('/healthdata/register', trainingPlan);
      console.log('Response from server:', response.data);
      navigate('/Login');
    } catch (error) {
      console.error('Error submitting the training plan:', error);
      alert('There was an error submitting your goals. Please try again.');
    }    
  };

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/goalsBG.jpeg'})`,
        position: 'relative',
      }}
    >
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
              value={goalDistance || ''}
              onChange={(e) => setGoalDistance(e.target.value)}
            >
              <option value="">Select</option>
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
              value={trainingPeriod || ''}
              onChange={(e) => setTrainingPeriod(e.target.value)}
            >
              <option value="">Select</option>
              <option value="8">8 weeks</option>
              <option value="10">10 weeks</option>
              <option value="12">12 weeks</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="goal-timing">Goal Timing</label>
            <select
              id="goal-timing"
              className="select"
              value={goalTiming || ''}
              onChange={(e) => setGoalTiming(Number(e.target.value))} // Save as number
            >
              <option value="">Select</option>
              {availableTimingOptions.map((timing) => (
                <option key={timing} value={timing}>
                  {timing} mins
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">Done, Back to Login!</button>
        </form>
      </div>
    </div>
  );
};

export default RunningGoals;