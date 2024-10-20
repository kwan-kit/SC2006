import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SetNewPassword from './components/SetNewPassword';
import SecurityQuestion from './components/SecurityQuestion';
import Verification from './components/Verification';
import Goals from './components/Goals';
import RunningGoals from './components/RunningGoals';
import HybridGoals from './components/HybridGoals';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [trainingPlan, setTrainingPlan] = useState([]); // Store the training plan
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [userData, setUserData] = useState({
    username: '',
    trainingPlan: null
  });

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const response = await fetch('http://localhost:5000/training-plan');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUserData({
          username: data.username,
          trainingPlan: data.schedule
        });
        
        // Ensure data.schedule is an array
        if (Array.isArray(data.schedule)) {
          setTrainingPlan(data.schedule);
        } else {
          throw new Error("Invalid data structure: schedule is not an array");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlan();
  }, []);

  // Training Schedule Component
  const TrainingSchedule = () => {
    if (loading) return <div>Loading training schedule...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="training-schedule">
        <h1>Training Schedule</h1>
        {trainingPlan.length > 0 ? (
          trainingPlan.map((week) => {
            const daySchedules = week.daySchedules || [];
            return (
              <div key={week._id} className="week">
                <h2>Week {week.weekNumber}</h2>
                <ul>
                  {daySchedules.length > 0 ? (
                    daySchedules.map((day) => (
                      <li key={`${week._id}-day-${day.day}`}>
                        Day {day.day}: {day.runTitle || 'No Title'} - {day.distance || 0} km
                      </li>
                    ))
                  ) : (
                    <li>No schedule available for this week.</li>
                  )}
                </ul>
                <p>Total Distance for Week: {week.weeklyDistance} km</p>
              </div>
            );
          })
        ) : (
          <div>No training plans available.</div>
        )}
      </div>
    );
  };

  return (
    <Router>
      {/* Header will appear on every page */}
      <Header />

      {/* Routes will switch between the different components */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/security-question" element={<SecurityQuestion />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/running" element={<RunningGoals />} />
        <Route path="/hybrid" element={<HybridGoals />} />
        <Route path="/training-schedule" element={<TrainingSchedule />} />
      </Routes>

      {/* Footer will appear on every page */}
      <Footer />
    </Router>
  );
}

export default App;