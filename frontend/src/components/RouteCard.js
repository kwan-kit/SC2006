import React from 'react';
import './RouteCard.css'; // Import the styles
import { useNavigate } from 'react-router-dom';


const RouteCard = ({ name, parkLink }) => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleNavigate = () => {
    navigate('/RunStatsPage'); // Navigate to the desired route
  };

  return (
    <div className="route-card">
      <div className="route-image">
        {/* Placeholder for image with loading animation */}
        <div className="loading-placeholder"></div>
      </div>
      <h3>{name}</h3>
      <div className="route-card-footer">
        <a href={parkLink} target="_blank" rel="noopener noreferrer"> {/* Google Maps link */}
          <button className="route-button">Route</button>
        </a>
        <button onClick={handleNavigate} className="view-button">View</button>
      </div>
    </div>
  );
};

export default RouteCard;
