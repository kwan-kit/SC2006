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

// Function to calculate distance between two points
const calculateDistance = (coord1, coord2) => {
  return turf.distance(turf.point(coord1), turf.point(coord2), { units: 'kilometers' });
};

// Function to merge LineStrings and MultiLineStrings and calculate distances with relaxed criteria
const mergeAndCalculateDistances = (geoJson, distanceThreshold = 0.05) => {
  const mergedDistances = {};

  geoJson.features.forEach((feature) => {
    const coords = feature.geometry.coordinates;

    // Handle LineString
    if (feature.geometry.type === 'LineString') {
      let totalDistance = 0;
      const mergedCoords = [];

      coords.forEach((coord, index) => {
        if (index > 0) {
          // Add distance between consecutive points
          const lineSegment = [coords[index - 1], coord];
          totalDistance += turf.length(turf.lineString(lineSegment));

          // Merge consecutive points if they are close enough
          const previousPoint = coords[index - 1];
          const currentPoint = coord;
          const distanceToLastPoint = calculateDistance(previousPoint, currentPoint);

          if (distanceToLastPoint <= distanceThreshold) {
            mergedCoords.push(currentPoint);
          } else {
            mergedCoords.push(previousPoint, currentPoint);
          }
        } else {
          mergedCoords.push(coord);
        }
      });

      // Store the total distance and merged coordinates
      mergedDistances[feature.properties.Name] = {
        distance: totalDistance,
        mergedLine: mergedCoords,
      };
    }

    // Handle MultiLineString
    else if (feature.geometry.type === 'MultiLineString') {
      let totalDistance = 0;
      const mergedCoords = [];

      coords.forEach((line, index) => {
        const lineDistance = turf.length(turf.lineString(line));
        totalDistance += lineDistance;
        mergedCoords.push(...line);

        // Merge with the previous line if close enough
        if (index > 0) {
          const previousLineEnd = line[0];
          const lastMergedPoint = mergedCoords[mergedCoords.length - 1];
          const distanceToLastPoint = calculateDistance(previousLineEnd, lastMergedPoint);

          if (distanceToLastPoint <= distanceThreshold) {
            mergedCoords.splice(mergedCoords.length - line.length, line.length); // Remove the current line
          }
        }
      });

      // Store the total distance and merged coordinates
      mergedDistances[feature.properties.Name] = {
        distance: totalDistance,
        mergedLine: mergedCoords,
      };
    }
  });

  // Sort the distances in descending order
  const sortedDistances = Object.entries(mergedDistances)
    .map(([name, data]) => ({ name, distance: data.distance, mergedLine: data.mergedLine }))
    .sort((a, b) => b.distance - a.distance);

  console.log('Sorted Distances:', sortedDistances);

  return sortedDistances;
};

// Function to find the closest routes based on user's location and target distance
const findClosestRoutes = (mergedDistances, userLocation, targetDistance) => {
  const closestRoutes = [];

  console.log("Target Distance:", targetDistance); // Log the target distance

  mergedDistances.forEach((route) => {
    const { name, mergedLine } = route;

    // Calculate the total route distance
    const totalDistance = calculateTotalDistance(mergedLine); // Create a function to calculate total distance

    const startCoord = mergedLine[0]; // First coordinate in mergedLine
    const endCoord = mergedLine[mergedLine.length - 1]; // Last coordinate in mergedLine
    const distanceToStart = calculateDistance(userLocation, startCoord);
    const distanceToEnd = calculateDistance(userLocation, endCoord);

    console.log("Route Name:", name);
    console.log("Total Route Distance:", totalDistance);
    console.log("Distance to Start:", distanceToStart);
    console.log("Distance to End:", distanceToEnd);

    // Evaluate based on total distance
    if (totalDistance >= targetDistance) {
      console.log(`Route ${name} is long enough (Distance: ${totalDistance})`);

      // Add original route if within distance from userLocation
      if (distanceToStart <= targetDistance || distanceToEnd <= targetDistance) {
        console.log(`Adding original route: ${name}`);
        closestRoutes.push({
          name: name,
          distance: totalDistance, // Store total distance
          route: mergedLine // Original route
        });
      } else {
        console.log(`Route ${name} is too far from userLocation.`);
      }
    } else {
      console.log(`Route ${name} is too short (Total Distance: ${totalDistance}).`);
    }
  });

  // Sort the closest routes by distance
  closestRoutes.sort((a, b) => a.distance - b.distance);

  // Return the top 3 closest routes
  return closestRoutes.slice(0, 3);
};

// Function to calculate total distance
const calculateTotalDistance = (coordinates) => {
  let totalDistance = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += calculateDistance(coordinates[i], coordinates[i + 1]);
  }

  return totalDistance;
};







// API route to calculate distances
router.post('/', async (req, res) => {
  const geoJsonFilePath = 'ParkConnectorLoop.geojson'; // Replace with your GeoJSON file path
  const userLocation = req.body.userLocation; // { latitude, longitude }
  const targetDistance = req.body.targetDistance; // 5 km as default for now

  try {
    if (!geojsonData) {
      geojsonData = await loadGeoJSON(geoJsonFilePath);
    }
    const mergedDistances = mergeAndCalculateDistances(geojsonData);
    const closestRoutes = findClosestRoutes(mergedDistances, userLocation, targetDistance);
    
    res.json(closestRoutes); // Return closest routes
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).json({ error: 'Failed to load GeoJSON data or calculate distances.' });
  }
});

module.exports = router;
