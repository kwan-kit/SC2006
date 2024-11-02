import React, { useState } from 'react';
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Smith",
  });
  const [selectedPlan, setSelectedPlan] = useState("Hybrid Plan");

  const handleProfileEdit = () => setIsEditingProfile((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (plan) => setSelectedPlan(plan);

  const confirmPlanChange = () => alert(`Plan confirmed: ${selectedPlan}`);

  return (
    <div className="settings-container">
      {/* Profile Section */}
      <div className="profile-section">
        <h2>Profile</h2>
        <div className="profile-details">
          <div className="profile-picture">
            <img src="https://via.placeholder.com/120" alt="Profile" />
          </div>
          <div className="profile-info">
            {isEditingProfile ? (
              <>
                <div className="profile-field">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <button className="confirm-button" onClick={handleProfileEdit}>
                  <FontAwesomeIcon icon={faCheckCircle} /> Save Changes
                </button>
              </>
            ) : (
              <>
                <h3 className="profile-name">{profile.name}</h3>
                <button className="edit-button" onClick={handleProfileEdit}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Plan Selector Section */}
      <div className="plan-section">
        <h2>Choose Your Plan</h2>
        <div className="plan-options">
          <div
            className={`plan-card ${selectedPlan === "Hybrid Plan" ? "selected-hybrid" : ""}`}
            onClick={() => handlePlanChange("Hybrid Plan")}
          >
            <h3>Hybrid Plan</h3>
            <p>Running + Gymming</p>
            <p>For those looking for endurance and strength</p>
          </div>
          <div
            className={`plan-card ${selectedPlan === "Run Plan" ? "selected-run" : ""}`}
            onClick={() => handlePlanChange("Run Plan")}
          >
            <h3>Run Plan</h3>
            <p>Running only</p>
            <p>For those who enjoy cardio</p>
          </div>
        </div>
        <button className="confirm-plan-button" onClick={confirmPlanChange}>
          Confirm Plan Change
        </button>
      </div>
    </div>
  );
};

export default Settings;