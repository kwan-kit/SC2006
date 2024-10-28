import React, { useMemo } from 'react';
import './YourProgress.css';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const YourProgress = () => {
  const paceData = useMemo(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Pace Trends (km/min)',
        data: [6.2, 6.1, 5.8, 6.0, 5.7, 6.1, 5.9],
        borderColor: '#007BFF',
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: '#007BFF',
        pointBorderColor: '#007BFF',
      },
    ],
  }), []);

  const paceOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white' }, beginAtZero: false },
    },
  }), []);



  return (
    <div className="progress-section">
      <h2>Your Progress</h2>
      <p className="week-number">Week 7 of 12</p>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-bar-filled"></div>
        </div>

        {/* Progress bar labels */}
        <div className="progress-bar-labels">
            <span> Week 1</span>
            <span> Week 12</span>
        </div>
      </div>

      <div className="progress-cards">
        {/* Total Number of Runs */}
        <div className="progress-card interactive-card">
          <h3>Total Number of Runs</h3>
          <p className="metric-number">12</p>
        </div>

        {/* Pace Trends */}
        <div className="progress-card interactive-card">
          <h3>Pace Trends (km/min)</h3>
          <div className="chart-container">
            <Line data={paceData} options={paceOptions} />
          </div>
        </div>

        {/* Calories Burned this Week */}
        <div className="progress-card interactive-card">
          <h3>Calories Burned this Week</h3>
          <p className="metric-number">3000 kcal</p>
        </div>

        {/* Total Distance Ran this Week */}
        <div className="progress-card interactive-card">
          <h3>Total Distance Ran this Week (km)</h3>
          <p className="metric-number distance-number">24 km</p>
        </div>
      </div>
    </div>
  );
};

export default YourProgress;
