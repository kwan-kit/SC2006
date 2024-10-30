import React, { useState } from 'react';
import './RunStatsPage.css';

const RunStatsPage = () => {
  const [rating, setRating] = useState(1);
  const [stars, setStars] = useState(0);

  const handleStarClick = (index) => {
    setStars(index + 1);
  };

  return (
    <div className="run-stats-container">
      {/* Image Placeholder */}
      <div className="image-placeholder">
        {/* Loading animation will be shown here */}
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-header">
          <div>25/07/2024</div>
          <div>--:-- H</div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Target Time</div>
            <div className="stat-value">NIL</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Moving Time</div>
            <div className="stat-value">NIL</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Time Difference</div>
            <div className="stat-value">NIL</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Distance</div>
            <div className="stat-value">NIL</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Avg Pace</div>
            <div className="stat-value">NIL</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Elevation Gain</div>
            <div className="stat-value">NIL</div>
          </div>
        </div>

        {/* Completion Section */}
        <div className="run-completion">
          Good Job completing your run!
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          <button className="action-button">Retrieve run data from Strava</button>
          <button className="action-button">Manual Edit</button>
        </div>

        {/* Rating Section */}
        <div className="rating-section">
          <div className="rating-slider">
            <label>How was the run?</label>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <span>{rating}</span>
          </div>

          <div className="rating-stars">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`star ${index < stars ? 'active' : ''}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunStatsPage;
