import React, { useContext, useState, useEffect } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios'; // Ensure axios is imported

const Settings = () => {
  const { profileName } = useContext(AuthContext); // Access profileName from context
  const [selectedPlan, setSelectedPlan] = useState(""); // Default to empty initially
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch the current user's plan type on component mount
  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const response = await axios.get('/healthdata/get-plan-type');
        const planType = response.data.planType; // Get the plan type from response
        
        // Set selectedPlan based on the response
        setSelectedPlan(planType.charAt(0).toUpperCase() + planType.slice(1)); // Capitalize first letter
      } catch (error) {
        console.error('Error fetching current plan:', error);
        alert('Could not retrieve your current plan. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCurrentPlan();
  }, []);

  const handlePlanChange = (plan) => setSelectedPlan(plan);

  const confirmPlanChange = () => {
    alert(`Plan confirmed: ${selectedPlan}`);
    
    // Redirect based on the selected plan
    if (selectedPlan === "Hybrid") {
      navigate('/hybrid');
    } else if (selectedPlan === "Running") {
      navigate('/running');
    }
  };

  // Show loading message while fetching the current plan
  if (loading) {
    return <div>Loading your current plan...</div>;
  }

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
            className={`plan-card ${selectedPlan === "Hybrid" ? "selected-hybrid" : ""}`}
            onClick={() => handlePlanChange("Hybrid")}
          >
            <h3>Hybrid Plan</h3>
            <p>Running + Gymming</p>
            <p>For those looking for endurance and strength</p>
          </div>
          <div
            className={`plan-card ${selectedPlan === "Running" ? "selected-run" : ""}`}
            onClick={() => handlePlanChange("Running")}
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
