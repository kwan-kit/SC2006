const express = require('express');
const fs = require('fs');
const turf = require('@turf/turf');
const router = express.Router();
let geojsonData;

// Function to load the GeoJSON file
const loadGeoJSON = (filePath) => {
  return new Promise((resolve, reject) => {
    if (geojsonData) return resolve(geojsonData); // Return cached data if available
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
        resolve(geojson);
      } catch (parseErr) {
        console.error('Error parsing GeoJSON file:', parseErr);
        reject(parseErr);
      }
    });
  });
};

// Function to calculate distance between two points
const calculateDistance = (coord1, coord2) => {
  return turf.distance(turf.point(coord1), turf.point(coord2), { units: 'kilometers' });
};

// Function to find nearest parks/park connectors
const findNearestParks = (geoJson, userLocation) => {
    const parks = new Map(); // To ensure no overlapping parks/park connectors
    const nearestParks = [];
  
    geoJson.features.forEach(feature => {
      const coords = feature.geometry.coordinates;
      const parkName = feature.properties.Name; // Assuming the park name is in properties.Name
  
      if (feature.geometry.type === 'Point') {
        // Log the coordinates of the park being processed
        console.log('Processing Park:', parkName, 'Coordinates:', coords);
  
        const distance = calculateDistance([coords[0], coords[1]], [userLocation.longitude, userLocation.latitude]);
        console.log('Distance from User to Park:', distance); // Log distance calculation
  
        // Only add the park if it is not already in the map (avoiding overlap)
        if (!parks.has(parkName)) {
          parks.set(parkName, { coords, distance });
        }
      }
    });
  
    // Convert the map to an array and sort by distance
    nearestParks.push(...Array.from(parks.entries()).map(([name, data]) => ({
      name,
      distance: data.distance,
      coords: data.coords
    })));
  
    nearestParks.sort((a, b) => a.distance - b.distance); // Sort by distance
  
    console.log('Nearest Parks:', nearestParks); // Debugging log
  
    return nearestParks.slice(0, 3); // Return top 3 nearest parks
  };

// API route to get nearest parks
router.post('/', async (req, res) => {
  const geoJsonFilePath = 'ParkConnectorLoop.geojson'; // Replace with your GeoJSON file path
  const userLocation = req.body.userLocation; // { latitude, longitude }

  console.log('User Location:', userLocation); // Log user location

  try {
    if (!geojsonData) {
      geojsonData = await loadGeoJSON(geoJsonFilePath);
      console.log('GeoJSON Data Loaded:', geojsonData); // Log loaded GeoJSON data
    }
    
    const nearestParks = findNearestParks(geojsonData, userLocation);
    
    console.log('Response - Nearest Parks:', nearestParks); // Log the nearest parks to be returned

    if (nearestParks.length > 0) {
      res.json(nearestParks); // Return nearest parks
    } else {
      res.json({ message: 'No parks found near the user location.' }); // Return a message if no parks found
    }
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).json({ error: 'Failed to load GeoJSON data or calculate distances.' });
  }
});

module.exports = router;
