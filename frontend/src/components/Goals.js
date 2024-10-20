import React from 'react';
import './Goals.css';
import { GoalButton } from './GoalButton';

function Goals() {
  return (
    <div className="background">
      {/* Choose a Goal Text */}
      <div className="goal-text">Choose a Goal</div>

      {/* Buttons */}
      <GoalButton text="Running" left="627px" top="420px" redirectTo="running" />
      <GoalButton text="Hybrid" left="627px" top="505px" redirectTo="hybrid" />
    </div>
  );
}

export default Goals;
