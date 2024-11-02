// src/GymTracking.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import './GymTracking.css';

const GymTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedMuscleGroup } = location.state || { selectedMuscleGroup: null };
  const [exercises, setExercises] = useState([]);
  const [completedExercises, setCompletedExercises] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = () => {
      const muscle = selectedMuscleGroup;
      const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
      console.log("Fetching exercises from:", apiUrl);

      $.ajax({
        method: 'GET',
        url: apiUrl,
        headers: { 'X-Api-Key': 'IOMMByHvwRjhhchWPYE7lA==YjpJSQoZKOIqcKFp' },
        contentType: 'application/json',
        success: function(result) {
          console.log(result);
          setExercises(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error fetching exercises:', textStatus, errorThrown, jqXHR.responseText);
          setError("Failed to fetch exercises. Please try again later.");
        },
        complete: function() {
          setLoading(false);
        }
      });
    };

    fetchExercises();
  }, [selectedMuscleGroup]);

  const handleExerciseChange = (exerciseName, field, value) => {
    setCompletedExercises(prevExercises => ({
      ...prevExercises,
      [exerciseName]: {
        ...prevExercises[exerciseName],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    console.log("Completed exercises data:", completedExercises);
    navigate('/Dashboard');
  };

  const renderContent = () => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (exercises.length === 0) return <div className="no-exercises">No exercises found for the selected muscle group.</div>;

    return (
      <ul className="exercise-list">
        {exercises.map((exercise, index) => (
          <li key={index} className="exercise-card">
            <div className="exercise-details">
              <h2 className="exercise-title">{exercise.name}</h2>
              <p><strong>Muscle:</strong> {exercise.muscle}</p>
              <p><strong>Equipment:</strong> {exercise.equipment}</p>
              <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
              
              {/* Divider */}
              <div className="divider"></div>

              {/* Input Group */}
              <div className="input-group">
                <label className="sets-label">
                  Sets Completed:
                  <input
                    type="number"
                    value={completedExercises[exercise.name]?.sets || ''}
                    onChange={(e) => handleExerciseChange(exercise.name, 'sets', e.target.value)}
                  />
                </label>
                <label className="sets-label">
                  Weight (0 if weights not used):
                  <input
                    type="number"
                    value={completedExercises[exercise.name]?.weight || ''}
                    onChange={(e) => handleExerciseChange(exercise.name, 'weight', e.target.value)}
                  />
                </label>
                <label className="sets-label">
                  No. of Reps Completed:
                  <input
                    type="number"
                    value={completedExercises[exercise.name]?.reps || ''}
                    onChange={(e) => handleExerciseChange(exercise.name, 'reps', e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="exercise-instructions">
              <p><strong>Instructions:</strong> {exercise.instructions}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="workout-tracking-container">
      <h1>Recommended Exercises for {selectedMuscleGroup && selectedMuscleGroup.replace(/_/g, ' ').toUpperCase()}</h1>
      {renderContent()}
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GymTracking;
