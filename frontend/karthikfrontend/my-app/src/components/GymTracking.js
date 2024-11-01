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

  const handleEndSession = () => {
    alert("Workout session completed!");
    // Additional logic for ending session can be added here.
  };

  const renderWorkoutCard = (title, description, steps, workoutKey) => (
    <div className="workout-card">
      <div className="left-section">
        <div className="image-placeholder">800 x 400</div>
      </div>
      <div className="right-section">
        <div className="description">
          <h2 className="workout-title">{title}</h2>
          <p>{description}</p>
          <ul className="steps">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        <form className="workout-inputs">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={workoutData[workoutKey].weight}
            onChange={(e) => handleInputChange(e, workoutKey)}
            min="0"
          />
          <label htmlFor="reps">Reps:</label>
          <input
            type="number"
            name="reps"
            value={workoutData[workoutKey].reps}
            onChange={(e) => handleInputChange(e, workoutKey)}
            min="0"
          />
          <label htmlFor="sets">Sets:</label>
          <input
            type="number"
            name="sets"
            value={workoutData[workoutKey].sets}
            onChange={(e) => handleInputChange(e, workoutKey)}
            min="0"
          />
          <div className="complete-toggle">
            <button
              type="button"
              className={`toggle-button ${workoutData[workoutKey].completed ? 'completed' : ''}`}
              onClick={() =>
                setWorkoutData({
                  ...workoutData,
                  [workoutKey]: {
                    ...workoutData[workoutKey],
                    completed: !workoutData[workoutKey].completed,
                  },
                })
              }
            >
              {workoutData[workoutKey].completed ? 'Completed' : 'Mark as Completed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="workout-tracking-container">
      {renderWorkoutCard(
        "Pull-Up",
        "A great bodyweight exercise targeting your back, shoulders, and arms.",
        ["Grip the pull-up bar with your palms facing away.", "Pull yourself up until your chin is above the bar.", "Lower yourself down slowly and repeat."],
        "pullUp"
      )}
      {renderWorkoutCard(
        "Squat",
        "A powerful exercise to strengthen your legs and core.",
        ["Stand with your feet shoulder-width apart.", "Bend your knees and lower your body.", "Return to the starting position and repeat."],
        "squat"
      )}
      {renderWorkoutCard(
        "Bench Press",
        "An effective exercise for building chest and tricep strength.",
        ["Lie back on a bench with a barbell.", "Lower the bar to your chest.", "Push the bar back up until your arms are straight."],
        "benchPress"
      )}
      <button className="end-session-button" onClick={handleEndSession}>End Session</button>
    </div>
  );
};

export default GymTracking;
