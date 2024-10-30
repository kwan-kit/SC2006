const express = require('express');
const fs = require('fs');
const router = express.Router();

// Function to extract park names and first coordinates
const extractParkInfo = (feature) => {
    // Use a regex to find the park name in the description
    const regex = /<th>PARK<\/th>\s*<td>(.*?)<\/td>/;
    const match = regex.exec(feature.properties.Description);
    const parkName = match ? match[1] : null; // Get the park name or null if not found

    let firstCoordinate = null;
    // Check if geometry is LineString or MultiLineString
    if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
        // Get the first filled coordinate pair
        if (feature.geometry.coordinates.length > 0) {
            // If it's a LineString, get the first coordinate
            if (feature.geometry.type === 'LineString') {
                firstCoordinate = feature.geometry.coordinates[0]; // Get the first coordinate
            }
            // If it's a MultiLineString, get the first coordinate of the first line
            else if (feature.geometry.type === 'MultiLineString') {
                firstCoordinate = feature.geometry.coordinates[0][0]; // Get the first coordinate of the first line
            }
        }
    }

    return { parkName, firstCoordinate };
};

// Endpoint to extract unique park connector names and their first coordinates
router.get('/', (req, res) => {
    try {
        // Load and parse the GeoJSON file from the current directory
        const geojsonFilePath = './ParkConnectorLoop.geojson';
        const geojsonData = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));

        const uniqueParks = new Map(); // Use a Map to track unique parks

        // Extract park connector names and first coordinates
        geojsonData.features.forEach(feature => {
            const { parkName, firstCoordinate } = extractParkInfo(feature);
            if (parkName && !uniqueParks.has(parkName)) { // Check for unique park names
                // Store the first filled coordinate pair as [longitude, latitude]
                if (firstCoordinate) {
                    uniqueParks.set(parkName, firstCoordinate);
                }
            }
        });

        // Convert the Map to an array of objects
        const parkConnectorInfo = Array.from(uniqueParks, ([parkName, firstCoordinate]) => ({
            parkName,
            firstCoordinate,
        }));

        // Send response as JSON
        res.json({ parkConnectors: parkConnectorInfo });
    } catch (error) {
        console.error('Error reading GeoJSON file:', error);
        res.status(500).json({ message: 'Error reading GeoJSON file' });
    }
});

module.exports = router;
