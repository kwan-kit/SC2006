import React, { useState, useEffect } from 'react';
import './WeeklyProgram.css'; // CSS file

const WeeklyProgram = () => {
  const [thisWeekCompleted, setThisWeekCompleted] = useState([
    { name: "4km run", completed: false },
    { name: "5km run", completed: false },
    { name: "Gym - Push", completed: false },
    { name: "Gym - Pull", completed: false },
    { name: "Gym - Leg", completed: false },
  ]);

  const progress = Math.round(
    (thisWeekCompleted.filter((item) => item.completed).length / thisWeekCompleted.length) * 100
  );

  // Function to calculate glow strength
  const getGlow = (progress) => {
    const minGlow = 20; // Minimum glow size
    const maxGlow = 150; // Maximum glow size
    return minGlow + ((maxGlow - minGlow) * progress) / 100; // Calculate based on progress
  };

  const toggleCompletion = (index) => {
    const updatedList = [...thisWeekCompleted];
    updatedList[index].completed = !updatedList[index].completed;
    setThisWeekCompleted(updatedList);
  };

  useEffect(() => {
    const progressBox = document.querySelector('.progress-box');
    const glowSize = getGlow(progress); // Calculate dynamic glow size
    progressBox.style.boxShadow = `0 0 ${glowSize}px rgba(0, 123, 255, 0.6)`; // Apply glow dynamically
  }, [progress]);

  return (
    <div className="weekly-program">
      <div>
        <h2>This Week's Program</h2>
        <ul className="program-list">
          {thisWeekCompleted.map((item, index) => (
            <li
              key={index}
              className={`program-item ${item.completed ? "completed" : ""}`}
              onClick={() => toggleCompletion(index)}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompletion(index)}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Progress Box */}
      <div className="progress-box">
        <div className="progress-fill" style={{ height: `${progress}%` }}></div>
        <span>{progress}%</span>
      </div>

      <div>
        <h2>Next Week's Program</h2>
        <ul className="program-list">
          <li className="program-item">5km run</li>
          <li className="program-item">Intervals run</li>
          <li className="program-item">Lower Body Day</li>
          <li className="program-item">Upper Body Day</li>
          <li className="program-item">Full Body Day</li>
        </ul>
      </div>
    </div>
  );
};

export default WeeklyProgram;
