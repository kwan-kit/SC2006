import React, { useMemo, useState, useEffect } from 'react';
import './YourProgress.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const YourProgress = () => {
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(() => Number(localStorage.getItem('currentWeek')) || 1);

  // Fetch username from backend
  const fetchUsername = async () => {
    try {
        const response = await axios.get('/session/username'); 
        return response.data.username; 
    } catch (error) {
        console.error('Error fetching username:', error);
        setError(error.response?.data?.message || 'Could not fetch username');
        return null;
    }
  };    

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      setLoading(true);
      try {
          const username = await fetchUsername(); // Fetch the username
          if (!username) return;

          const response = await axios.get(`/training/plan/${username}`);
          setTrainingPlan(response.data);

          const storedWeek = localStorage.getItem('currentWeek') || 1;
          setCurrentWeek(Number(storedWeek));
          if (response.data.startDate) {
              calculateCurrentWeek(response.data.startDate); 
          }
      } catch (error) {
          console.error('Error fetching training plan:', error);
          setError(error.response?.data?.message || 'Error fetching training plan'); 
      } finally {
          setLoading(false);
      }
  };

    fetchTrainingPlan();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedWeek = Number(localStorage.getItem('currentWeek'));
      if (storedWeek !== currentWeek) {
        setCurrentWeek(storedWeek);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [currentWeek]);

  const calculateCurrentWeek = (startDate) => {
    if (!startDate) return;
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffWeeks = Math.ceil(diffTime / (7 * 24 * 60 * 60 * 1000));
    const weekNumber = Math.min(diffWeeks, trainingPlan?.schedule.length);
    setCurrentWeek(weekNumber);
  };

  const totalNumberOfRuns = useMemo(() => {
    if (!trainingPlan?.schedule) return 0;
    return trainingPlan.schedule.reduce((total, week) => {
      return total + week.daySchedules.filter(run => run.runTitle !== "Rest").length;
    }, 0);
  }, [trainingPlan]);

  const completedRuns = useMemo(() => {
    if (!trainingPlan?.schedule) return 0;
    return trainingPlan.schedule.slice(0, currentWeek).reduce((total, week) => {
      return total + week.daySchedules.filter(run => run.runTitle !== "Rest").length;
    }, 0);
  }, [trainingPlan, currentWeek]);

  const progressPercentage = useMemo(() => {
    if (!trainingPlan?.schedule) return 0;
    return (currentWeek / trainingPlan.schedule.length) * 100;
  }, [currentWeek, trainingPlan]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!trainingPlan) return <p>No training plan found</p>;

  return (
    <div className="progress-section">
      <h2>Your Progress</h2>
      <p className="week-number">Week {currentWeek} of {trainingPlan.schedule.length}</p>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-bar-filled" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="progress-bar-labels">
          <span>Week 1</span>
          <span>Week {trainingPlan.schedule.length}</span>
        </div>
      </div>

      <div className="progress-cards">
        <div className="progress-card interactive-card">
          <h3>Total Number of Activities</h3>
          <p className="metric-number">{completedRuns}/{totalNumberOfRuns}</p>
        </div>

        <div className="progress-card interactive-card">
          <h3>Total Distance for the Week (km)</h3>
          <p className="metric-number distance-number">
            {trainingPlan.schedule[currentWeek - 1]?.weeklyDistance || 0} km
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourProgress;
