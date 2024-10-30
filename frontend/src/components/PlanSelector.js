import React, { useState } from 'react';
import './PlanSelector.css'; // Import custom styles

const PlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // To track the selected plan

  // Handle selecting a plan
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleConfirmSelection = () => {
    if (selectedPlan) {
      alert(`You have chosen the ${selectedPlan} plan!`);
    } else {
      alert("Please select a plan.");
    }
  };

  return (
    <div className="plan-selector-container">
      <h2>Choose Your Plan</h2>
      <div className="plans">

        <div
          className={`plan-card ${selectedPlan === 'Hybrid' ? 'hybrid-selected' : ''}`}
          onClick={() => handlePlanSelect('Hybrid')}
        >
          <h3>Hybrid Plan</h3>
          <p>Running + Gymming</p>
          <p>For those looking for endurance and strength</p>
        </div>

        <div
          className={`plan-card ${selectedPlan === 'Run' ? 'selected' : ''}`}
          onClick={() => handlePlanSelect('Run')}
        >
          <h3>Run Plan</h3>
          <p>Running only</p>
          <p>For those who enjoy cardio</p>
        </div>
      </div>


    </div>
  );
};

export default PlanSelector;
