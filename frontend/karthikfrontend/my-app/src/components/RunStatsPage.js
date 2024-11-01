import React, { useState } from 'react';
import './RunStatsPage.css';

const RunStatsPage = () => {
  const [rating, setRating] = useState(1);
  const [stars, setStars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [stats, setStats] = useState({
    date: 'NIL',
    time: 'NIL',
    targetTime: { hours: 'NIL', minutes: '', seconds: '' },
    movingTime: { hours: 'NIL', minutes: '', seconds: '' },
    distance: 'NIL',
    elevationGain: 'NIL'
  });

  const units = {
    distance: 'km',
    avgPace: '/ km',
    elevationGain: 'm'
  };

  // Helper function to format date from YYYY-MM-DD to DD-MM-YYYY
  const formatDateDisplay = (dateString) => {
    if (!dateString || dateString === 'NIL') return 'NIL';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Helper function to format date from DD-MM-YYYY to YYYY-MM-DD for date input
  const formatDateInput = (dateString) => {
    if (!dateString || dateString === 'NIL') return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  // Function to handle date change and format to DD-MM-YYYY for display
  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // in YYYY-MM-DD
    const formattedDate = formatDateDisplay(selectedDate); // convert to DD-MM-YYYY
    setStats((prevStats) => ({
      ...prevStats,
      date: formattedDate
    }));
  };

  const handleStarClick = (index) => {
    setStars(index + 1);
  };

  const calculateTimeDifference = () => {
    if (!hasData) return "NIL";
    const { hours: targetHours, minutes: targetMinutes, seconds: targetSeconds } = stats.targetTime;
    const { hours: movingHours, minutes: movingMinutes, seconds: movingSeconds } = stats.movingTime;

    const targetTotalSeconds = (+targetHours || 0) * 3600 + (+targetMinutes || 0) * 60 + (+targetSeconds || 0);
    const movingTotalSeconds = (+movingHours || 0) * 3600 + (+movingMinutes || 0) * 60 + (+movingSeconds || 0);

    const diffSeconds = movingTotalSeconds - targetTotalSeconds;
    const diffSign = diffSeconds < 0 ? '-' : '';
    const absDiffSeconds = Math.abs(diffSeconds);
    const diffHours = Math.floor(absDiffSeconds / 3600);
    const diffMinutes = Math.floor((absDiffSeconds % 3600) / 60);
    const diffSecondsRemain = absDiffSeconds % 60;

    return `${diffSign}${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}:${String(diffSecondsRemain).padStart(2, '0')}`;
  };

  const calculateAvgPace = () => {
    if (!hasData || stats.distance === 'NIL' || stats.distance === '0') return "NIL";
    const { hours, minutes, seconds } = stats.movingTime;
    const movingTotalMinutes = (+hours || 0) * 60 + (+minutes || 0) + (+seconds || 0) / 60;
    const pacePerKm = movingTotalMinutes / parseFloat(stats.distance);

    const paceMinutes = Math.floor(pacePerKm);
    const paceSeconds = Math.round((pacePerKm - paceMinutes) * 60);

    return `${String(paceMinutes).padStart(2, '0')}:${String(paceSeconds).padStart(2, '0')}`;
  };

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setRating(value);
    e.target.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${value * 10}%, #ffffff ${value * 10}%, #ffffff 100%)`;
  };

  const retrieveData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStats({
        date: '2024-07-25', // Stored in YYYY-MM-DD format
        time: '14:30',
        targetTime: { hours: '02', minutes: '05', seconds: '00' },
        movingTime: { hours: '02', minutes: '08', seconds: '13' },
        distance: '10',
        elevationGain: '150'
      });
      setHasData(true);
      setIsLoading(false);
    }, 2000);
  };

  const startEditing = () => {
    setIsEditing(true);
    setStats((prevStats) => ({
      date: prevStats.date === 'NIL' ? '' : formatDateInput(prevStats.date),
      time: prevStats.time === 'NIL' ? '' : prevStats.time,
      targetTime: { hours: prevStats.targetTime.hours === 'NIL' ? '' : prevStats.targetTime.hours,
                    minutes: prevStats.targetTime.minutes === 'NIL' ? '' : prevStats.targetTime.minutes,
                    seconds: prevStats.targetTime.seconds === 'NIL' ? '' : prevStats.targetTime.seconds },
      movingTime: { hours: prevStats.movingTime.hours === 'NIL' ? '' : prevStats.movingTime.hours,
                    minutes: prevStats.movingTime.minutes === 'NIL' ? '' : prevStats.movingTime.minutes,
                    seconds: prevStats.movingTime.seconds === 'NIL' ? '' : prevStats.movingTime.seconds },
      distance: prevStats.distance === 'NIL' ? '' : prevStats.distance,
      elevationGain: prevStats.elevationGain === 'NIL' ? '' : prevStats.elevationGain
    }));
  };

  const confirmEdit = () => {
    setIsEditing(false);
    setStats((prevStats) => ({
      ...prevStats,
      date: prevStats.date || 'NIL',
      time: prevStats.time || 'NIL',
      targetTime: {
        hours: prevStats.targetTime.hours || '00',
        minutes: prevStats.targetTime.minutes || '00',
        seconds: prevStats.targetTime.seconds || '00'
      },
      movingTime: {
        hours: prevStats.movingTime.hours || '00',
        minutes: prevStats.movingTime.minutes || '00',
        seconds: prevStats.movingTime.seconds || '00'
      },
      distance: prevStats.distance || 'NIL',
      elevationGain: prevStats.elevationGain || 'NIL'
    }));
  };

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      setStats((prevStats) => ({
        ...prevStats,
        [parentKey]: {
          ...prevStats[parentKey],
          [childKey]: value
        }
      }));
    } else {
      setStats((prevStats) => ({
        ...prevStats,
        [key]: value
      }));
    }
    setHasData(true);
  };

  return (
    <div className="run-stats-container">
      <div className="left-side">
        <div className="image-placeholder"></div>
        <div className="rating-section">
          <div className="rating-slider">
            <label>Assess the difficulty level</label>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={handleSliderChange}
            />
            <span>{rating}</span>
          </div>
          <div className="rating-stars">
            <span>How was the run?</span>
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`star ${index < stars ? 'active' : ''}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>


      <div className="stats-section">
        {isLoading ? (
          <div className="loading-animation">
            <div className="pulsing-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="loading-text">Loading data...</div>
          </div>
        ) : (
          <>
            <div className="stats-header">
              <div>
                {isEditing ? (
                  <input
                    type="date"  // Enables calendar dropdown and manual input
                    value={formatDateInput(stats.date)} // Format to YYYY-MM-DD for input
                    onChange={handleDateChange}
                    placeholder="DD/MM/YYYY"
                    className="date-input"
                  />
                ) : (
                  formatDateDisplay(stats.date) // Format to DD-MM-YYYY for display
                )}
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={stats.time}
                    onChange={(e) => handleInputChange(e, 'time')}
                    placeholder="HH:MM"
                    className="time-input"
                  />
                ) : (
                  stats.time
                )}
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Target Time</div>
                <div className="stat-value">
                  {isEditing ? (
                    <div className="time-inputs">
                      <input
                        type="text"
                        value={stats.targetTime.hours}
                        onChange={(e) => handleInputChange(e, 'targetTime.hours')}
                        placeholder="HH"
                        maxLength="2"
                        className="time-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />:
                      <input
                        type="text"
                        value={stats.targetTime.minutes}
                        onChange={(e) => handleInputChange(e, 'targetTime.minutes')}
                        placeholder="MM"
                        maxLength="2"
                        className="time-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />:
                      <input
                        type="text"
                        value={stats.targetTime.seconds}
                        onChange={(e) => handleInputChange(e, 'targetTime.seconds')}
                        placeholder="SS"
                        maxLength="2"
                        className="time-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </div>
                  ) : (
                    hasData ? `${stats.targetTime.hours}:${stats.targetTime.minutes}:${stats.targetTime.seconds}` : "NIL"
                  )}
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-label">Moving Time</div>
                <div className="stat-value">
                  {isEditing ? (
                    <div className="time-inputs">
                      <input
                        type="text"
                        value={stats.movingTime.hours}
                        onChange={(e) => handleInputChange(e, 'movingTime.hours')}
                        placeholder="HH"
                        maxLength="2"
                        className="time-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />:
                      <input
                        type="text"
                        value={stats.movingTime.minutes}
                        onChange={(e) => handleInputChange(e, 'movingTime.minutes')}
                        placeholder="MM"
                        maxLength="2"
                        className="time-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />:
                      <input
                        type="text"
                        value={stats.movingTime.seconds}
                        onChange={(e) => handleInputChange(e, 'movingTime.seconds')}
                        placeholder="SS"
                        maxLength="2"
                        className="time-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </div>
                  ) : (
                    hasData ? `${stats.movingTime.hours}:${stats.movingTime.minutes}:${stats.movingTime.seconds}` : "NIL"
                  )}
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-label">Time Difference</div>
                <div className="stat-value">
                  {hasData ? calculateTimeDifference() : "NIL"}
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-label">Distance</div>
                <div className="stat-value">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={stats.distance}
                        onChange={(e) => handleInputChange(e, 'distance')}
                        className="distance-input"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                      />
                      <span className="unit-text"> {units.distance}</span>
                    </>
                  ) : (
                    hasData ? `${stats.distance} ${units.distance}` : "NIL"
                  )}
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-label">Avg Pace</div>
                <div className="stat-value">
                  {hasData ? calculateAvgPace() : "NIL"} {hasData && units.avgPace}
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-label">Elevation Gain</div>
                <div className="stat-value">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={stats.elevationGain}
                        onChange={(e) => handleInputChange(e, 'elevationGain')}
                        className="distance-input"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                      />
                      <span className="unit-text"> {units.elevationGain}</span>
                    </>
                  ) : (
                    hasData ? `${stats.elevationGain} ${units.elevationGain}` : "NIL"
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="actions-section">
          {!isLoading && !isEditing && (
            <>
              <button className="action-button" onClick={retrieveData}>
                Retrieve run data from Strava
              </button>
              <button className="action-button" onClick={startEditing}>
                Manual Edit
              </button>
            </>
          )}
          {isEditing && (
            <button className="action-button" onClick={confirmEdit}>
              Confirm Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunStatsPage;
