import React, { useContext, useState } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Settings = () => {
  const { profileName } = useContext(AuthContext); // Access profileName from context
  const [selectedPlan, setSelectedPlan] = useState("Hybrid Plan");
  const navigate = useNavigate();

  const handlePlanChange = (plan) => setSelectedPlan(plan);

  const confirmPlanChange = () => {
    alert(`Plan confirmed: ${selectedPlan}`);
    
    // Redirect based on the selected plan
    if (selectedPlan === "Hybrid Plan") {
      navigate('/hybrid');
    } else if (selectedPlan === "Run Plan") {
      navigate('/running');
    }
  };

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
            <h3 className="profile-name">{profileName}</h3> {/* Display profile name without edit */}
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
