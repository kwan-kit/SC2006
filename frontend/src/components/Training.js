import React, { useState } from 'react';
import './Training.css';
import GymCard from './GymCard';
import RouteCard from './RouteCard';

const Training = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search bar input
  const [filterType, setFilterType] = useState('all'); // Default state is to show all

  const routeData = [
    { name: 'Clementi - Holland Village' },
    { name: 'Jurong East - Buona Vista' },
    { name: 'Nanyang Walk Loop' },
    { name: 'Jurong Park Connector' },
    { name: 'West Coast Connector' },
    { name: 'East Coast Connector' },
  ];

  const gymData = [
    { name: 'Jurong Lake Gardens ActiveSG Gym', progress: 85 },
    { name: 'Clementi ActiveSG Gym', progress: 70 },
    { name: 'ActiveSG Hockey Village', progress: 65 },
    { name: 'Bukit Batok ActiveSG Gym', progress: 50,},
    { name: 'Bukit Gombak ActiveSG Gym', progress: 60,},
    { name: 'Choa Chu Kang ActiveSG Gym', progress: 40,},
  ];

  // Filter function for search
  const filteredRoutes = routeData.filter((route) =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGyms = gymData.filter((gym) =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine what to display based on filter type
  const displayRoutes = filterType === 'route' || filterType === 'all';
  const displayGyms = filterType === 'gym' || filterType === 'all';

  const noResults = filteredRoutes.length === 0 && filteredGyms.length === 0;

  return (
    <div className="training-container">
      {/* Search Filter */}
      <div className="search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search routes or gyms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Button Group */}
        <div className="filter-buttons">
          <button
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={filterType === 'route' ? 'active' : ''}
            onClick={() => setFilterType('route')}
          >
            Route
          </button>
          <button
            className={filterType === 'gym' ? 'active' : ''}
            onClick={() => setFilterType('gym')}
          >
            Gym
          </button>
        </div>
      </div>

      {noResults ? (
        <div className="no-results">
          <p>No routes or gyms match your search. Try again!</p>
        </div>
      ) : (
        <>
          {/* Display Routes */}
          {displayRoutes && filteredRoutes.length > 0 && (
            <div className="recommendations">
              <h2>Recommended Route</h2>
              <div className="route-cards">
                {filteredRoutes.map((route, index) => (
                  <RouteCard key={index} name={route.name} />
                ))}
              </div>
            </div>
          )}

          {/* Display Gyms */}
          {displayGyms && filteredGyms.length > 0 && (
            <div className="gyms">
              <h2>Nearby Gyms</h2>
              <div className="gym-cards">
                {filteredGyms.map((gym, index) => (
                  <GymCard key={index} name={gym.name} progress={gym.progress} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Training;
