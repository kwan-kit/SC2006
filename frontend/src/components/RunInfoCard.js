import React, { useEffect, useRef } from 'react';
import './RunInfoCard.css';
import mapboxgl from 'mapbox-gl';

const RunInfoCard = ({ week, runNumber, activities, time, distance, mapData }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapData || mapData.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: mapData[0], // Center map on the first coordinate
      zoom: 12,
    });

    // Add a line representing the run route
    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: mapData,
          },
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 4,
        },
      });
    });

    return () => map.remove(); // Clean up on unmount
  }, [mapData]);

  return (
    <div className="run-info-card">
      <div className="map-placeholder" ref={mapContainerRef} style={{ height: '200px' }}>
        {/* Map renders here */}
      </div>

      <div className="run-info-text">
        <h3>{week} Run {runNumber + 1}</h3>
        <p>Activities: <span>{activities}</span></p>
        <p>Time: <span>{time}</span></p>
        <p>Distance: <span>{distance} km</span></p>
      </div>
    </div>
  );
};

export default RunInfoCard;
