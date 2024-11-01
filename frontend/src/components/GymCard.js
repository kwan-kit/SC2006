import React from 'react';
import './GymCard.css';
import { useNavigate } from 'react-router-dom';

const GymCard = ({ name }) => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleNavigate = () => {
    navigate('/WorkoutGenerator'); // Navigate to the desired route
  };

  return (
    <div className="gym-card">
      <div className="gym-image">
        {/* Image or loading animation will be here */}
      </div>
      <h1 className="gym-title">{name}</h1>
      <div className="gym-footer">
        {/* Fix the button click handler */}
        <button onClick={handleNavigate} className="gym-button">Start</button>
      </div>
    </div>
  );
};

export default GymCard;
