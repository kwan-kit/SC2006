import React, { useState, useEffect } from 'react';
import './Training.css';
import GymCard from './GymCard';
import RouteCard from './RouteCard';
import axios from 'axios';

const Training = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search bar input
  const [filterType, setFilterType] = useState('all'); // Default state is to show all
  const [gymData, setGymData] = useState([]); // State for gym data
  const [routeData, setRouteData] = useState([]); // State for park data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to get user geolocation
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError('Error getting user location');
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        console.error('Geolocation not supported by this browser');
        setError('Geolocation not supported');
        reject(new Error('Geolocation not supported'));
      }
    });
  };

  // Fetch nearest parks and gyms on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLocation = await getUserLocation(); // Get user location

        // Fetch parks using user location
        const routeResponse = await axios.post('/park', userLocation);
        setRouteData(routeResponse.data.closestParks);

        // Fetch gyms using user location
        const gymResponse = await axios.post('/gym', userLocation);
        setGymData(gymResponse.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <h2>Recommended Routes</h2>
              <div className="route-cards">
                {filteredRoutes.map((route, index) => (
                  <RouteCard key={index} name={route.name} parkLink={route.googleMapsLink} />
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
