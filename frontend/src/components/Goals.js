import React from 'react';
import { Link } from 'react-router-dom';  
import './Goals.css';

function Goals() {
  return (
    <div
      className="background-container"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/fitnessGoal.png'})` }} 
    >
      {/* Overlay for background opacity */}
      <div className="overlay"></div>

      {/* Main content */}
      <div className="goal-text">Choose a Goal</div>

      {/* Buttons */}
      <Link to="/running">
        <button id="button-running" className="button">Running</button>
      </Link>

      <Link to="/hybrid">
        <button id="button-hybrid" className="button">Hybrid</button>
      </Link>
    </div>
  );
}

export default Goals;