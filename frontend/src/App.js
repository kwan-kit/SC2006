import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Login from './components/Login';
import Register from './components/Register';
import SetNewPassword from './components/SetNewPassword';
import SecurityQuestion from './components/SecurityQuestion';
import Verification from './components/Verification';
import Goals from './components/Goals';
import RunningGoals from './components/RunningGoals';
import HybridGoals from './components/HybridGoals';
import Terms from './components/Terms';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Header will appear on every page */}
        <Header />
        
        {/* Main content area with Routes */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/security-question" element={<SecurityQuestion />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/running" element={<RunningGoals />} />
            <Route path="/hybrid" element={<HybridGoals />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/training" element={<Training />} />
            <Route path="/WorkoutGenerator" element={<WorkoutGenerator />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/GymTracking" element={<GymTracking />} />
            <Route path="/logout" element={<LoggedOut />} />
            <Route path="/RunStatsPage" element={<RunStatsPage />} />
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        {/* Footer will appear on every page */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
