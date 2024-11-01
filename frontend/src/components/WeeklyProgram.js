import React, { useState, useEffect } from 'react';
import './WeeklyProgram.css';

const WeeklyProgram = () => {
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(() => {
    const savedWeek = localStorage.getItem('currentWeek');
    return savedWeek ? parseInt(savedWeek) : 1; // Default to week 1 if not found
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem('completedTasks');
    return savedTasks ? JSON.parse(savedTasks) : {}; // Default to empty object if not found
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/training/plan`); //rmb to change this
        if (!response.ok) {
          throw new Error('Failed to fetch training plan');
        }
        const data = await response.json();
        setTrainingPlan(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlan();
  }, []);

  useEffect(() => {
    // Save current week and completed tasks to localStorage whenever they change
    localStorage.setItem('currentWeek', currentWeek);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [currentWeek, completedTasks]);

  const toggleTaskCompletion = (weekNumber, index) => {
    setCompletedTasks((prev) => {
      const newCompletedTasks = { ...prev };
      const key = `${weekNumber}-${index}`;
      newCompletedTasks[key] = !newCompletedTasks[key];
      if (checkWeekCompletion(weekNumber, newCompletedTasks)) {
        moveToNextWeek();
      }
      return newCompletedTasks;
    });
  };

  const checkWeekCompletion = (weekNumber, completed) => {
    const totalTasks = trainingPlan.schedule[weekNumber - 1].daySchedules.length;
    const completedCount = Object.entries(completed).filter(
      ([key, value]) => key.startsWith(`${weekNumber}-`) && value
    ).length;
    return completedCount === totalTasks;
  };

  const moveToNextWeek = () => {
    const nextWeek = currentWeek + 1;
    if (nextWeek > trainingPlan.schedule.length) {
      setCurrentWeek(1);
      setCompletedTasks({}); 
      localStorage.setItem('completedTasks', JSON.stringify({})); 
    } else {
      setCurrentWeek(nextWeek);
    }
  };

  const calculateProgress = (week) => {
    const totalTasks = week.daySchedules.length;
    const completedTasksCount = week.daySchedules.reduce((count, _, index) => {
      const key = `${week.weekNumber}-${index}`;
      return completedTasks[key] ? count + 1 : count;
    }, 0);
    return Math.round((completedTasksCount / totalTasks) * 100);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!trainingPlan) return <p>No training plan found</p>;

  const thisWeek = trainingPlan.schedule.find((week) => week.weekNumber === currentWeek);
  const nextWeek = trainingPlan.schedule.find((week) => week.weekNumber === currentWeek + 1);

  const renderWeekSchedule = (week, title) => (
    <div className="week-section">
      <h2>{title}</h2>
      <ul className="program-list">
        {week.daySchedules.map((day, index) => (
          <li key={index} className="program-item">
            <input
              type="checkbox"
              checked={!!completedTasks[`${week.weekNumber}-${index}`]}
              onChange={() => toggleTaskCompletion(week.weekNumber, index)}
            />
            {`Day ${index + 1}: ${day.runTitle} - ${day.distance} km`}
          </li>
        ))}
      </ul>
    </div>
  );

  const thisWeekProgress = thisWeek ? calculateProgress(thisWeek) : 0;

  return (
    <div className="weekly-program">
      {thisWeek ? renderWeekSchedule(thisWeek, `This Week's Program (Week ${currentWeek})`) : <p>No data for this week</p>}

      <div className="progress-box">
        <div className="progress-fill" style={{ height: `${thisWeekProgress}%` }}></div>
        <span>{thisWeekProgress}% Completed</span>
      </div>

      {nextWeek ? renderWeekSchedule(nextWeek, `Next Week's Program (Week ${currentWeek + 1})`) : <p>No data for next week</p>}
    </div>
  );
};

export default WeeklyProgram;
