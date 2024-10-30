import React, { useState } from 'react';
import './GymTracking.css';

const GymTracking = () => {
  const [workoutData, setWorkoutData] = useState({
    pullUp: { weight: '', reps: '', sets: '', completed: false },
    squat: { weight: '', reps: '', sets: '', completed: false },
    benchPress: { weight: '', reps: '', sets: '', completed: false },
  });

  const handleInputChange = (e, workout) => {
    const { name, value, type, checked } = e.target;
    setWorkoutData({
      ...workoutData,
      [workout]: {
        ...workoutData[workout],
        [name]: type === 'checkbox' ? checked : value,
      },
    });
  };

  return (
    <div className="workout-tracking-container">
      {/* Pull-Up Workout */}
      <div className="workout-card">
        <div className="left-section">
          <div className="image-placeholder">800 x 400</div>
        </div>
        <div className="right-section">
          <div className="description">
            <h2 className="workout-title">Pull-Up</h2>
            <p>A great bodyweight exercise targeting your back, shoulders, and arms.</p>
            <ul className="steps">
              <li>Step 1: Grip the pull-up bar with your palms facing away.</li>
              <li>Step 2: Pull yourself up until your chin is above the bar.</li>
              <li>Step 3: Lower yourself down slowly and repeat.</li>
            </ul>
          </div>
          <form className="workout-inputs">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={workoutData.pullUp.weight}
              onChange={(e) => handleInputChange(e, 'pullUp')}
              min="0"
            />
            <label htmlFor="reps">Reps:</label>
            <input
              type="number"
              id="reps"
              name="reps"
              value={workoutData.pullUp.reps}
              onChange={(e) => handleInputChange(e, 'pullUp')}
              min="0"
            />
            <label htmlFor="sets">Sets:</label>
            <input
              type="number"
              id="sets"
              name="sets"
              value={workoutData.pullUp.sets}
              onChange={(e) => handleInputChange(e, 'pullUp')}
              min="0"
            />
            <div className="complete-checkbox">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={workoutData.pullUp.completed}
                onChange={(e) => handleInputChange(e, 'pullUp')}
              />
              <label htmlFor="completed">Mark as Completed</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GymTracking;
