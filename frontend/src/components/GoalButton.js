// GoalButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const GoalButton = ({ text, left, top, redirectTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${redirectTo}`); // Redirect to the desired route
  };

  return (
    <div
      className="button"
      style={{ left: left, top: top }}
      onClick={handleClick} // Use onClick to trigger redirection
    >
      {text}
    </div>
  );
};
