const express = require('express');
const fs = require('fs');
const turf = require('@turf/turf');
const router = express.Router();
let geojsonData;

// Function to strip 3D coordinates to 2D (remove elevation)
const stripTo2D = (coordinates) => {
  return coordinates.map(coord => [coord[0], coord[1]]);
};

// Function to load the GeoJSON file
const loadGeoJSON = (filePath) => {
  return new Promise((resolve, reject) => {
    if (geojsonData) return resolve(geojsonData);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading GEOJSON file:', err);
        reject(err);
        return;
      }
      try {
        const geojson = JSON.parse(data);
        if (!Array.isArray(geojson.features) || geojson.features.length === 0) {
          throw new Error('GeoJSON data must contain an array of features');
        }
        // Strip all coordinates to 2D (latitude and longitude)
        geojson.features.forEach(feature => {
          if (feature.geometry && (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString')) {
            if (feature.geometry.type === 'LineString') {
              feature.geometry.coordinates = stripTo2D(feature.geometry.coordinates);
            } else if (feature.geometry.type === 'MultiLineString') {
              feature.geometry.coordinates = feature.geometry.coordinates.map(line => stripTo2D(line));
            }
          }
        });
        geojsonData = geojson;
        console.log('GeoJSON data loaded and coordinates processed');
        resolve(geojsonData);
      } catch (parseErr) {
        console.error('Error parsing GeoJSON file:', parseErr);
        reject(parseErr);
      }
    });
  });
};

// Function to find 3 closest routes to the start point that fulfill the target distance
const generateRoutes = (userLocation, targetDistance) => {
  const routes = [];
  const maxSegmentDistance = 2; // Max distance to find routes within 2 km

  // Find the closest route to the start point
  const closestRoutes = geojsonData.features
    .filter(feature => {
      if (!feature.geometry || !feature.geometry.coordinates || feature.geometry.coordinates.length === 0) {
        console.log('Invalid feature geometry, skipping:', feature);
        return false;
      }

      // Get the first coordinate of the feature
      const featureStartPoint = feature.geometry.type === 'LineString' 
        ? feature.geometry.coordinates[0] 
        : feature.geometry.coordinates[0][0]; // First coordinate of MultiLineString

      // Check if coordinates are valid numbers
      if (!Array.isArray(featureStartPoint) || featureStartPoint.length !== 2 || 
          typeof featureStartPoint[0] !== 'number' || typeof featureStartPoint[1] !== 'number') {
        console.log('Invalid coordinates found:', featureStartPoint);
        return false;
      }

      const turfFeatureStartPoint = turf.point(featureStartPoint);
      const userPoint = turf.point([userLocation.longitude, userLocation.latitude]);
      const distanceToSegment = turf.distance(userPoint, turfFeatureStartPoint);

      console.log(`Distance to segment start: ${distanceToSegment} km`); // Debugging log
      return distanceToSegment <= maxSegmentDistance;
    })
    .map(feature => {
      const startPoint = turf.point(feature.geometry.type === 'LineString' 
        ? feature.geometry.coordinates[0] 
        : feature.geometry.coordinates[0][0]);

      const endPoint = turf.point(feature.geometry.type === 'LineString' 
        ? feature.geometry.coordinates[feature.geometry.coordinates.length - 1]
        : feature.geometry.coordinates.flat()[feature.geometry.coordinates.flat().length - 1]);

      const line = turf.lineString(feature.geometry.coordinates.flat());

      // Calculate the distance of the route
      const distance = turf.length(line);
      console.log(`Calculated distance for feature: ${distance} km`);

      return {
        feature,
        startPoint,
        endPoint,
        distance
      };
    })
    .filter(route => route !== null) // Filter out any null routes from previous checks
    .sort((a, b) => a.distance - b.distance); // Sort by distance

  console.log(`Closest routes found: ${closestRoutes.length}`); // Debugging log

  // Select routes that fulfill the target distance
  for (const route of closestRoutes) {
    if (route.distance >= targetDistance && routes.length < 3) {
      routes.push({
        coordinates: route.feature.geometry.coordinates.flat(),
        distance: route.distance
      });
    }
    if (routes.length >= 3) break; // Stop after 3 routes are selected
  }

  console.log(`Routes selected: ${routes.length}`); // Debugging log
  return routes;
};

// Function to generate Google Maps URL
const generateGoogleMapsUrl = (coordinates) => {
  const start = coordinates[0];
  const end = coordinates[coordinates.length - 1];
  return `https://www.google.com/maps/dir/?api=1&origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&travelmode=walking`;
};

// API route
router.post('/', async (req, res) => {
  try {
    const { latitude, longitude, targetDistance } = req.body;
    console.log('Received request:', { latitude, longitude, targetDistance });
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude) || !targetDistance || isNaN(targetDistance)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    const userLocation = { latitude, longitude };

    if (!geojsonData) {
      try {
        geojsonData = await loadGeoJSON('ParkConnectorLoop.geojson');
      } catch (error) {
        return res.status(500).json({ error: 'Failed to load GeoJSON data' });
      }
    }

    const routes = generateRoutes(userLocation, targetDistance);
    console.log(`Number of routes generated: ${routes.length}`);
    console.log('Generated routes:', routes);

    // Generate Google Maps URLs for the routes
    const routesWithUrls = routes.map(route => ({
      ...route,
      googleMapsUrl: generateGoogleMapsUrl(route.coordinates)
    }));

    res.json({ 
      routes: routesWithUrls
    });
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

module.exports = router;
