const express = require('express');
const fs = require('fs');
const router = express.Router();

// Variable to store park connector information
let parkConnectors = [];

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

// Load and parse the GeoJSON file on startup
const loadParkConnectors = () => {
    try {
        const geojsonFilePath = './ParkConnectorLoop.geojson';
        const geojsonData = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));
        const uniqueParks = new Map(); // Use a Map to track unique parks

        // Helper function to normalize park names
        const normalizeName = (name) => {
        return name
          .toLowerCase()
          .replace(/\b(to|-)\b/g, '-') // Replace "to" and "-" with a single "-"
          .replace(/\s+/g, ' ') // Remove extra spaces
          .trim();
        };

        // Extract park connector names and first coordinates
        geojsonData.features.forEach(feature => {
            const { parkName, firstCoordinate } = extractParkInfo(feature);
            if (parkName && firstCoordinate) {
                // Normalize the park name to eliminate duplicates based on spaces
                const normalizedParkName = normalizeName(parkName);

                if (!uniqueParks.has(normalizedParkName)) { // Check for unique park names
                    uniqueParks.set(normalizedParkName, {
                        parkName,
                        firstCoordinate
                    });
                }
            }
        });

        // Convert the Map to an array of objects
        parkConnectors = Array.from(uniqueParks.values()).map(({ parkName, firstCoordinate }) => ({
            parkName,
            firstCoordinate,
        }));
    } catch (error) {
        console.error('Error reading GeoJSON file:', error);
    }
};

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180; // Convert degrees to radians
    const R = 6371; // Radius of the Earth in kilometers

    const lat1 = toRad(coords1[1]);
    const lon1 = toRad(coords1[0]);
    const lat2 = toRad(coords2[1]);
    const lon2 = toRad(coords2[0]);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
};

// Endpoint to get the 10 nearest parks based on user coordinates
router.post('/', (req, res) => {
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
        return res.status(400).json({ message: "Latitude and Longitude are required." });
    }

    const userCoords = [longitude, latitude]; // User's coordinates in [lng, lat] format
    const distances = parkConnectors.map(park => {
        const distance = haversineDistance(userCoords, park.firstCoordinate);
        const [lng, lat] = park.firstCoordinate; // Destructure the firstCoordinate
        // Create the Google Maps link
        const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        return { name: park.parkName, distance, firstCoordinate: park.firstCoordinate, googleMapsLink };
    });

    // Sort by distance and get the top 10 closest parks
    const closestParks = distances.sort((a, b) => a.distance - b.distance).slice(0, 10);

    // Send the response as JSON
    res.json({ closestParks });
});

module.exports = router;

// Load park connectors on server start
loadParkConnectors();
