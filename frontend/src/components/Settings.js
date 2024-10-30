import React, { useState } from 'react'; // Import useState for managing state
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PlanSelector from './PlanSelector';
import Profile from './Profile';

const Settings = () => {
  // Define the state for managing edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Define the onEdit function
  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Toggle edit state
  };

  return (
    <div className="settings-container">
      {/* Profile Section */}
      
      <Profile/>
      <PlanSelector/>


      {/* Past Runs Section (Horizontally Scrollable) */}
      <div className="past-activities">
        <h2>Past Runs</h2>
        <div className="activities-container scrollable">
          <div className="activity-card">
            <img src="https://via.placeholder.com/150" alt="Map" />
            <div className="activity-info">
              <p>Week 6 Run 2</p>
              <p>Activities 1</p>
              <p>Time 44:22</p>
              <p>Distance 5.83km</p>
            </div>
          </div>
          <div className="activity-card">
            <img src="https://via.placeholder.com/150" alt="Map" />
            <div className="activity-info">
              <p>Week 6 Run 1</p>
              <p>Activities 1</p>
              <p>Time 42:43</p>
              <p>Distance 5.88km</p>
            </div>
          </div>
          <div className="activity-card">
            <img src="https://via.placeholder.com/150" alt="Map" />
            <div className="activity-info">
              <p>Week 5 Run 2</p>
              <p>Activities 1</p>
              <p>Time 32:47</p>
              <p>Distance 4.56km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Past Gymming Section (Horizontally Scrollable) */}
      <div className="past-activities">
        <h2>Past Gymming</h2>
        <div className="activities-container scrollable">
          <div className="activity-card">
            <img src="https://via.placeholder.com/150" alt="Gym" />
            <div className="activity-info">
              <p>Week 6 Gym 2</p>
              <p>Activities 1</p>
              <p>Time 44:22</p>
              <p>Distance 5.83km</p>
            </div>
          </div>
          <div className="activity-card">
            <img src="https://via.placeholder.com/150" alt="Gym" />
            <div className="activity-info">
              <p>Week 6 Gym 1</p>
              <p>Activities 1</p>
              <p>Time 42:43</p>
              <p>Distance 5.88km</p>
            </div>
          </div>
          <div className="activity-card">
            <img src="https://via.placeholder.com/150" alt="Gym" />
            <div className="activity-info">
              <p>Week 5 Gym 2</p>
              <p>Activities 1</p>
              <p>Time 32:47</p>
              <p>Distance 4.56km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
