

import React from 'react';
import './GymInfoCard.css';

const GymInfoCard = ({ workout, date }) => {
  // Format the date as dd/mm
  const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : 'N/A';

  return (
    <div className="gym-info-card">
      <div className="gym-info-text">
        <h3>Workout on {formattedDate}</h3>
        <h4>Workout Details:</h4>
        <ul>
          {workout && Object.entries(workout).length > 0 ? (
            Object.entries(workout).map(([exercise, details]) => (
              <li key={exercise}>
                {exercise.charAt(0).toUpperCase() + exercise.slice(1)}: 
                {` ${details.reps} reps, ${details.sets} sets, ${details.weight} kg`} 
                {details.completed ? ' (Completed)' : ' (Not Completed)'}
              </li>
            ))
          ) : (
            <li>No workout details available</li>
          )}
        </ul> 
      </div>
    </div>
  );
};

export default GymInfoCard;

