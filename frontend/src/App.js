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
        <Route path="/hybrid" element={<HybridGoals />} /
      </Routes>

      {/* Footer will appear on every page */}
      <Footer />
    </Router>
  );
}

export default App;