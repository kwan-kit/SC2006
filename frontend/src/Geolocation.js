import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GeolocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [closestPoint, setClosestPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchClosestPoint(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
          setError('Error fetching geolocation');
        }
      );
    };

    fetchGeolocation();
  }, []);

  const fetchClosestPoint = async (latitude, longitude) => {
    try {
      const response = await axios.post('/api/geolocation', { latitude, longitude });
      console.log('Closest point received from server:', response.data.closestPoint);
      setClosestPoint(response.data.closestPoint);
    } catch (error) {
      console.error('Error fetching closest point:', error);
      setError('Error fetching closest point');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Training Route Finder</h1>
      {loading && <p>Fetching your location and finding closest point...</p>}
      {error && <p>{error}</p>}
      {location.latitude && location.longitude && (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      )}
      {closestPoint && (
        <p>
          Closest Point Coordinates: Latitude: {closestPoint[1]}, Longitude: {closestPoint[0]}
        </p>
      )}
    </div>
  );
};

export default GeolocationComponent;
