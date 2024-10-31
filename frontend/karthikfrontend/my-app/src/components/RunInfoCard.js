import React, { useState } from 'react';
import './RunInfoCard.css'; // Assuming the CSS is saved in RunInfoCard.css

const RunInfoCard = ({ week, runNumber, activities, time, distance }) => {
  const [isLoading, setIsLoading] = useState(true); // Example of loading state

  // Simulating the loading state and map loaded status
  setTimeout(() => setIsLoading(false), 3000); // Mock delay to simulate loading

  return (
    <div className="run-info-card">
      <div className={`map-placeholder ${isLoading ? 'loading' : ''}`}>
        {/* This will be the map area */}
        {!isLoading && <img src="your-map-url.jpg" alt="Map" />}
      </div>

      <div className="run-info-text">
        <h3>{week} Run {runNumber}</h3>
        <p>Activities: <span>{activities}</span></p>
        <p>Time: <span>{time}</span></p>
        <p>Distance: <span>{distance}km</span></p>
      </div>
    </div>
  );
};

export default RunInfoCard;