// src/WorkoutSelector.js
import React, { useState } from 'react';
import './WorkoutSelector.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const WorkoutSelector = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for navigation

  const toggleSelection = (muscle) => {
    setSelectedMuscleGroup(selectedMuscleGroup === muscle ? null : muscle); // Toggle selection
  };

  const handleGenerateClick = () => {
    if (selectedMuscleGroup) {
      alert(`Selected Muscle Group: ${selectedMuscleGroup}`);
      // Navigate to GymTracking with the selected muscle group
      navigate("/GymTracking", { state: { selectedMuscleGroup } }); // Use navigate
    } else {
      alert("Please select a muscle group before generating.");
    }
  };

  return (
    <div className="workout-selector-container">
      <h2>Select Your Preferred Muscle Group</h2>

      <div className="muscle-section">
        <h3>Muscle Groups</h3>
        <div className="checkbox-group">
          {[
            'abdominals',
            'abductors',
            'adductors',
            'biceps',
            'calves',
            'chest',
            'forearms',
            'glutes',
            'hamstrings',
            'lats',
            'lower_back',
            'middle_back',
            'neck',
            'quadriceps',
            'traps',
            'triceps'
          ].map((muscle) => (
            <label key={muscle} className={`checkbox-label ${selectedMuscleGroup === muscle ? 'selected' : ''}`}>
              <input
                type="checkbox"
                checked={selectedMuscleGroup === muscle}
                onChange={() => toggleSelection(muscle)}
              />
              {muscle.replace(/_/g, ' ').toUpperCase()} {/* Format for display */}
            </label>
          ))}
        </div>
      </div>

      <button className="generate-button" onClick={handleGenerateClick}>Generate</button>
    </div>
  );
};

export default WorkoutSelector;