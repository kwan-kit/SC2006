import React from 'react';
import './Dashboard.css';
import WeeklyProgram from './WeeklyProgram';
import RunInfoCard from './RunInfoCard';
import Overview from './Overview';
import YourProgress from './YourProgress';

const Dashboard = () => {

  return (
    <div className="dashboard-container">
      {/* Main content */}
      <div className="main-content">
        <YourProgress/>

        {/* This Week's and Next Week's Program - side by side */}
        <div className="program-section">
          <WeeklyProgram/>
        </div>

        <Overview/>
      </div>

      {/* Right column content: Your Weekly Snapshot */}
      <div className="snapshot-section">
        <h2>Your Weekly Snapshot</h2>
          <div className="snapshot-cards-wrapper">
            <div className="snapshot-cards">
              <RunInfoCard 
                week="Week 6" 
                runNumber="2" 
                activities="1" 
                time="44:22" 
                distance="5.83" 
              />
              <RunInfoCard 
                week="Week 6" 
                runNumber="1" 
                activities="1" 
                time="44:22" 
                distance="5.83" 
              />
              <RunInfoCard 
                week="Week 6" 
                runNumber="2" 
                activities="1" 
                time="44:22" 
                distance="5.83" 
              />
              <RunInfoCard 
                week="Week 6" 
                runNumber="1" 
                activities="1" 
                time="44:22" 
                distance="5.83" 
              />
              <RunInfoCard 
                week="Week 6" 
                runNumber="2" 
                activities="1" 
                time="44:22" 
                distance="5.83" 
              />
              <RunInfoCard 
                week="Week 6" 
                runNumber="1" 
                activities="1" 
                time="44:22" 
                distance="5.83" 
              />
            </div>
          </div>
        </div>
      </div>
    
  );
};


export default Dashboard;
