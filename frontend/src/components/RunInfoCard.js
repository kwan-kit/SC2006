import React, { useEffect, useRef } from 'react';
import './RunInfoCard.css';
import mapboxgl from 'mapbox-gl';

const RunInfoCard = ({ date, runNumber, ratings, time, distance, mapData }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  console.log(mapData);

  useEffect(() => {
    // Check if map is already initialized
    if (!mapRef.current) {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia3dhbi1raXQiLCJhIjoiY20yejNhaWkzMDd1MTJucTNvZGhoeTU4YiJ9.FnqnzUKn39LKGYaQDcoB1Q'; // Your Mapbox access token
  
      // Initialize the map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [103.8198, 1.3521], // Center of Singapore
        zoom: 10
      });
  
      // Add the source and layer after the map has loaded
      mapRef.current.on('load', () => {
        mapRef.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [] // Initial empty coordinates
            }
          }
        });
  
        // Add the layer for the route
        mapRef.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#E03C31',
            'line-width': 6
          }
        });
  
        // After loading the map and adding the source and layer, check for mapData
        if (mapData) {
          const source = mapRef.current.getSource('route');
          console.log('Map Data:', mapData); // Debugging
          if (source) {
            source.setData({
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: mapData
              }
            });
  
            // Calculate the midpoint or use the first coordinate to center the map
            const midpoint = mapData[Math.floor(mapData.length / 2)];
            mapRef.current.flyTo({
              center: midpoint,
              zoom: 14,
              speed: 1.2
            });
          } else {
            console.error('Route source not found after adding layer.');
          }
        }
      });
    } else {
      // If the map is already initialized, check and update the route data
      const source = mapRef.current.getSource('route');
      if (source && mapData) {
        console.log('Map Data:', mapData); // Debugging
        source.setData({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: mapData
          }
        });
  
        // Calculate the midpoint or use the first coordinate to center the map
        const midpoint = mapData[Math.floor(mapData.length / 2)];
        mapRef.current.flyTo({
          center: midpoint,
          zoom: 14,
          speed: 1.2
        });
      } else {
        console.error('Route source not found or mapData is undefined.');
      }
    }
  
    return () => {
      // Clean up the map on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapData]);
  

  return (
    <div className="run-info-card">
      <div className="map-placeholder" ref={mapContainerRef} style={{ height: '200px', width: '300px' }}>
        {/* Map renders here */}
      </div>
      <div className="run-info-text">
        <h3>{date} Run </h3>
        <p>Difficulty Rating: <span>{ratings}</span></p>
        <p>Moving Time: <span>{time}</span></p>
        <p>Distance: <span>{distance} km</span></p>
      </div>
    </div>
  );
};

export default RunInfoCard;
