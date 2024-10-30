import React from 'react';

import './WorkoutGenerator.css'; 
import WorkoutSelector from './WorkoutSelector';

const WorkoutGenerator = () => {
  return (
    <div className="workout-generator-container">
      {/* Body Diagram */}
      <div className="body-diagram">
        <img src="/updated.jpg" alt="Body Diagram" />
      </div>

      <div>
        <WorkoutSelector/>
      </div>
    </div>
  );
};

export default WorkoutGenerator;
