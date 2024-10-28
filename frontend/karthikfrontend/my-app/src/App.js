import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';   
import Footer from './components/Footer';   
import Dashboard from './components/Dashboard';  
import Training from './components/Training';   
import WorkoutGenerator from './components/WorkoutGenerator';  
import Settings from './components/Settings';   
import GymTracking from './components/GymTracking'; 
import LoggedOut from './components/LoggedOut';
import RunStatsPage from './components/RunStatsPage';
import LandingPage from './components/LandingPage';



function App() {
  return (
    <Router>
      <Header /> 
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/training" element={<Training />} />
          <Route path="/WorkoutGenerator" element={<WorkoutGenerator />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/GymTracking" element={<GymTracking />} />
          <Route path="/logout" element={<LoggedOut />} />
          <Route path="/RunStatsPage" element={<RunStatsPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;
