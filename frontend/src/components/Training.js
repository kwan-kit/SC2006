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

  // Fetch nearest parks on component mount
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const userLocation = { latitude: 1.3521, longitude: 103.8198 }; // Replace with actual user location data
        const response = await axios.post('/park', userLocation);
        
        setRouteData(response.data.closestParks); // Set fetched data to closestParks
      } catch (error) {
        console.error('Error fetching park connectors:', error);
        setError('Error fetching park data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Fetch gym data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const latitude = 1.3521; 
        const longitude = 103.8198;

        const response = await axios.post('/gym', { latitude, longitude });
        setGymData(response.data); // Set gym data from response
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching gym data');
      }
    };

    fetchData();
  }, []);

  // Filter function for search
  const filteredRoutes = routeData.filter((route) =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) // Change this to route.name
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
                  <RouteCard key={index} name={route.name} parkLink = {route.googleMapsLink} />
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
