import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleRunning.css';

const RunningGoals = () => {
  const navigate = useNavigate();
  const [activityLevel, setActivityLevel] = useState('Select');
  const [goalDistance, setGoalDistance] = useState('Select');
  const [trainingPeriod, setTrainingPeriod] = useState('Select');
  const [goalTiming, setGoalTiming] = useState('Select');

  // Memoized options for Goal Timing based on the provided data
  const timingOptions = useMemo(() => ({
    Novice: {
      '5 km': ['35 mins', '30 mins'],
      '8 km': ['55 mins', '50 mins'],
      '10 km': ['70 mins', '65 mins'],
    },
    Intermediate: {
      '5 km': ['30 mins', '25 mins'],
      '8 km': ['50 mins', '45 mins'],
      '10 km': ['65 mins', '60 mins'],
    },
    Advanced: {
      '5 km': ['25 mins', '20 mins'],
      '8 km': ['45 mins', '40 mins'],
      '10 km': ['60 mins', '55 mins'],
    },
  }), []); // No dependencies, will remain constant

  const [availableTimingOptions, setAvailableTimingOptions] = useState([]);

  useEffect(() => {
    if (activityLevel !== 'Select' && goalDistance !== 'Select') {
      const timings = timingOptions[activityLevel][goalDistance];
      setAvailableTimingOptions(timings || []);
      setGoalTiming('Select'); // Reset goal timing when changing selections
    } else {
      setAvailableTimingOptions([]);
      setGoalTiming('Select'); // Reset goal timing if selections are not valid
    }
  }, [activityLevel, goalDistance, timingOptions]); // No longer causes a warning

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for valid selections
    if (
      activityLevel === 'Select' ||
      goalDistance === 'Select' ||
      trainingPeriod === 'Select' ||
      goalTiming === 'Select'
    ) {
      alert('Please fill in all the fields before submitting the form.');
      return;
    }

    // Create the training plan object
    const trainingPlan = {
      activityLevel,
      goalDistance,
      trainingPeriod,
      goalTiming,
      createdAt: new Date(),
    };

    // Log the training plan for debugging (optional)
    console.log('Training Plan Submitted:', trainingPlan);

    // Navigate to the Dashboard
    navigate('/Dashboard');
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
              {availableTimingOptions.map((timing) => (
                <option key={timing} value={timing}>
                  {timing}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">Done, Let’s Go!</button>
        </form>
      </div>
    </div>
  );
};

export default RunningGoals;
