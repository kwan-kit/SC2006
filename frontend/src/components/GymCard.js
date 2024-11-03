import React, { useEffect, useRef } from 'react';
import './GymCard.css';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

const GymCard = ({ name, gymCoordinates, userCoordinates }) => {
  const mapContainerRef = useRef(null); // Reference for the map container
  const navigate = useNavigate(); // Hook to handle navigation
  

  useEffect(() => {
  const {latitude, longitude} = userCoordinates;
  const userCoords = [longitude, latitude]
  const gymCoords = [gymCoordinates.longitude, gymCoordinates.latitude]
    // Ensure Mapbox access token is set
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3dhbi1raXQiLCJhIjoiY20yejNhaWkzMDd1MTJucTNvZGhoeTU4YiJ9.FnqnzUKn39LKGYaQDcoB1Q';

    // Create a new Mapbox map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Reference to the map container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [(userCoords[0] + gymCoords[0]) / 2, (userCoords[1] + gymCoords[1]) / 2], // Center the map between user and gym
      zoom: 13, // Initial zoom level
    });

    const fetchRoute = async () => {
      // Create a new directions API URL
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userCoords[0]},${userCoords[1]};${gymCoords[0]},${gymCoords[1]}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=${mapboxgl.accessToken}`;

      try {
        // Fetch the route data
        const response = await fetch(directionsUrl);
        const data = await response.json();

        if (data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates; // Get the coordinates from the response

          // Add the route to the map
          map.on('load', () => {
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: route,
                  },
                },
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#0000FF', // Set route color to blue (hex code for blue)
                'line-width': 6,
              },
            });

            const midpoint = route[Math.floor(route.length / 2)];
            map.flyTo({
              center: midpoint,
              zoom: 12,
              speed: 1.2,
            });

            // Add a marker for the starting point
            new mapboxgl.Marker()
              .setLngLat([userCoords[0], userCoords[1]])
              .addTo(map);

            // Add a marker for the gym location
            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([gymCoords[0], gymCoords[1]])
              .addTo(map);
          });
        } else {
          console.error('No route found');
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    fetchRoute(); // Call the function to fetch the route

    // Cleanup function to remove the map instance on unmount
    return () => map.remove();
  }, [gymCoordinates, userCoordinates]); // Dependency array

  const handleNavigate = () => {
    navigate('/WorkoutGenerator'); // Navigate to the desired route
  };

  return (
    <div className="gym-card">
      <div ref={mapContainerRef} style={{ width: '300px', height: '200px' }} />
      <h1 className="gym-title">{name}</h1>
      <div className="gym-footer">
        <button onClick={handleNavigate} className="gym-button">Start</button>
      </div>
    </div>
  );
};

export default GymCard;
