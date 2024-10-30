import React from 'react';
import './Overview.css';
import PieChart from './PieChart';

const Overview = () => {
    const completed = 10;
    const total = 30;

  return (
    <div className="overview-container">
      <h2 className="overview-header">Overview</h2>
      <div className="overview-cards">
        {/* Pie Chart Section */}
        <div className="overview-chart">
          <div className="pie-chart-container">
            <PieChart completed={completed} total={total} />
            <div className="donut-center">{completed}</div> {/* Centered  */}
          </div>
          <p className="overview-title">Activities Completed</p>
        </div>

        {/* Delta from target pace */}
        <div className="overview-metric">
          <h2 className="metric-hover">-1:32min/km</h2>
          <p className="overview-description">Delta from target pace</p>
        </div>

        {/* Longest Run */}
        <div className="overview-metric">
          <h2 className="metric-hover">15km</h2>
          <p className="overview-description">Longest Run</p>
        </div>

        {/* Average Pace */}
        <div className="overview-metric">
          <h2 className="metric-hover">6:17min/km</h2>
          <p className="overview-description">Average Pace</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
