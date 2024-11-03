import React, {useEffect, useRef} from 'react';
import './RouteCard.css'; // Import the styles
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';


const RouteCard = ({ name, parkLink, parkCoordinates, userCoordinates }) => {
  const mapContainerRef = useRef(null); // Reference for the map container
  console.log(parkCoordinates);
  console.log(userCoordinates);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const {latitude, longitude} = userCoordinates;
    const userCoords = [longitude, latitude]
    const parkCoords = [parkCoordinates[0],parkCoordinates[1]]
    // Generate the Mapbox Static API URL for walking route
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3dhbi1raXQiLCJhIjoiY20yejNhaWkzMDd1MTJucTNvZGhoeTU4YiJ9.FnqnzUKn39LKGYaQDcoB1Q';
    
    // Create a new Mapbox map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Reference to the map container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [(userCoords[0] + parkCoords[0]) / 2, (userCoords[1] + parkCoords[1]) / 2], // Center the map between user and park
      zoom: 13, // Initial zoom level
    });

    const fetchRoute = async () => {
      // Create a new directions API URL
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${userCoords[0]},${userCoords[1]};${parkCoords[0]},${parkCoords[1]}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=${mapboxgl.accessToken}`;

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
                'line-color': '#0000FF', // Set route color to blue
                'line-width': 6,
              },
            });

            const midpoint = route[Math.floor(route.length / 2)];
            map.flyTo({
              center: midpoint,
              zoom: 14,
              speed: 1.2,
            });

            // Add a marker for the starting point
            new mapboxgl.Marker()
              .setLngLat([userCoords[0], userCoords[1]])
              .addTo(map);

            // Add a marker for the destination point
            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([parkCoords[0], parkCoords[1]])
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
  }, [parkCoordinates, userCoordinates]); // Dependency array

  const handleNavigate = () => {
    navigate('/RunStatsPage'); // Navigate to the desired route
  };

  return (
    <div className="route-card">
      <div ref={mapContainerRef} style={{ width: '300px', height: '200px' }} />
      <h3>{name}</h3>
      <div className="route-card-footer">
        <a href={parkLink} target="_blank" rel="noopener noreferrer"> {/* Google Maps link */}
          <button className="route-button">Route</button>
        </a>
        <button onClick={handleNavigate} className="view-button">Start</button>
      </div>
    </div>
  );
};

export default RouteCard;