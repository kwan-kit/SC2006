const express = require('express');
const router = express.Router();

const getUserGeolocation = (req) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid geolocation data');
  }
  console.log(`Received Latitude: ${latitude}, Longitude: ${longitude}`);
  req.userLocation = { latitude, longitude }; // Attach to request
  return req.userLocation;
};

router.post('/', (req, res, next) => {
  try {
    req.userLocation = getUserGeolocation(req);
    res.status(200).json({ userLocation: req.userLocation }); // Respond with userLocation
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid geolocation data' });
  }
});

module.exports = router;
