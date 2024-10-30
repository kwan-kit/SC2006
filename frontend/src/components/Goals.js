import React from 'react';
import './Goals.css';
import { GoalButton } from './GoalButton';

function Goals() {
  return (
    <div className="background">
      <div className="container"> {/* Added container to wrap goal text and buttons */}
        {/* Choose a Goal Text */}
        <div className="goal-text">Choose a Goal</div>

        {/* Buttons */}
        <GoalButton text="Running" redirectTo="running" />
        <GoalButton text="Hybrid" redirectTo="hybrid" />
      </div>
    </div>
  );
}

export default Goals;
