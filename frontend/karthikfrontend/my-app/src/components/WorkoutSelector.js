import React, { useState } from 'react';
import './WorkoutSelector.css';
import { Link } from 'react-router-dom';

const WorkoutSelector = () => {
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);

  const toggleSelection = (type, item) => {
    const selectedList = type === 'workout' ? selectedWorkouts : selectedMuscleGroups;
    const setSelected = type === 'workout' ? setSelectedWorkouts : setSelectedMuscleGroups;

    if (selectedList.includes(item)) {
      setSelected(selectedList.filter((i) => i !== item));
    } else {
      setSelected([...selectedList, item]);
    }
  };

  const handleGenerateClick = () => {
    alert(`Selected Workouts: ${selectedWorkouts.join(', ')}\nSelected Muscle Groups: ${selectedMuscleGroups.join(', ')}`);
  };

  return (
    <div className="workout-selector-container">
      <h2>Select Your Preferences</h2>

      {/* Combined Box */}
      <div className="combined-box">
        {/* Types of Workouts */}
        <div className="workout-section">
          <h3>Types of Workouts</h3>
          <div className="checkbox-group">
            {['Dumbbells', 'Cables', 'Bodyweight', 'Machines', 'Barbell', 'Others'].map((workout) => (
              <label key={workout} className={`checkbox-label ${selectedWorkouts.includes(workout) ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedWorkouts.includes(workout)}
                  onChange={() => toggleSelection('workout', workout)}
                />
                {workout}
              </label>
            ))}
          </div>
        </div>

        {/* Muscle Groups */}
        <div className="muscle-section">
          <h3>Muscle Groups</h3>
          <div className="checkbox-group">
            {['Chest', 'Back', 'Tricep', 'Quad', 'Calves', 'Bicep', 'Shoulder', 'Abs', 'Hamstrings'].map((muscle) => (
              <label key={muscle} className={`checkbox-label ${selectedMuscleGroups.includes(muscle) ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedMuscleGroups.includes(muscle)}
                  onChange={() => toggleSelection('muscle', muscle)}
                />
                {muscle}
              </label>
            ))}
          </div>
        </div>
      </div>


      <Link to="/GymTracking">
            <button className="generate-button" onClick={handleGenerateClick}>Generate</button>
          </Link>
    </div>
  );
};

export default WorkoutSelector;
