const express = require('express');
const fs = require('fs');
const router = express.Router();
let geojsonData;

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
        geojsonData = geojson;
        console.log('GeoJSON data loaded successfully');
        resolve(geojsonData);
      } catch (parseErr) {
        console.error('Error parsing GeoJSON file:', parseErr);
        reject(parseErr);
      }
    });
  });
};

const ensureGeoJSON = async (req, res, next) => {
  console.log("Ensuring GeoJSON data");
  if (!geojsonData) {
    try {
      geojsonData = await loadGeoJSON('ParkConnectorLoop.geojson');
    } catch (error) {
      return res.status(500).json({ error: 'Failed to load GeoJSON data' });
    }
  }
  req.geojsonData = geojsonData;
  next();
};

router.use(ensureGeoJSON);

module.exports = router;
