import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import WeeklyProgram from './WeeklyProgram';
import RunInfoCard from './RunInfoCard';
import Overview from './Overview';
import YourProgress from './YourProgress';
import GymInfoCard from './GymInfoCard';

const Dashboard = () => {
  const [runReports, setRunReports] = useState([]);
  const [gymReports, setGymReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsernameAndReports = async () => {
      try {
          const usernameResponse = await axios.get('/session/username');
          const username = usernameResponse.data.username;

          const [runResponse, gymResponse] = await Promise.all([
              axios.get(`/save/run-report/${username}`),
              axios.get(`/record/gym-report/${username}`),
          ]);

          console.log('Fetched run reports:', runResponse.data);
          console.log('Fetched gym reports:', gymResponse.data);

          setRunReports(runResponse.data);
          setGymReports(gymResponse.data);
      } catch (error) {
          console.error('Error fetching reports:', error);
      } finally {
          setIsLoading(false);
      }
  };

  fetchUsernameAndReports();

  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <YourProgress />
        <div className="program-section">
          <WeeklyProgram />
        </div>
      </div>

      <div className="snapshot-section">
        <h2>Your Weekly Snapshot</h2>
        <div className="snapshot-cards-wrapper">
          <div className="snapshot-cards">
            {isLoading ? (
              <p>Loading reports...</p>
            ) : (
              <>
                {runReports.length === 0 && gymReports.length === 0 ? (
                  <p>No reports available.</p>
                ) : (
                  <>
                    {runReports.map((report) => {
                      const createdDate = new Date(report.createdAt);
                      const formattedDate = `${String(createdDate.getDate()).padStart(2, '0')}/${String(createdDate.getMonth() + 1).padStart(2, '0')}`; // Format as dd/mm

                      return (
                        <RunInfoCard 
                          key={report._id}
                          week={formattedDate}
                          runNumber={report.stars}
                          activities={report.rating}
                          time={`${report.targetTime.hours}:${report.targetTime.minutes}:${report.targetTime.seconds}`} 
                          distance={report.distance} 
                        />
                      );
                    })}
                    {gymReports.map((gymReport) => (
                      <GymInfoCard 
                        key={gymReport._id}
                        workout={gymReport.workout}
                        date={gymReport.date}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
