const express = require('express');
const router = express.Router();
const { GymData } = require('../model/database'); // Ensure this path is correct
const geolib = require('geolib');

router.post('/', async (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(latitude,longitude);

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Coordinates are required' });
    }

    try {
        const gyms = await GymData.find({}); // Fetch gyms from gymDetails

        if (!gyms.length) {
            console.log('No gyms found in database.');
            return res.status(404).json({ message: 'No gyms found' });
        }

        const gymsWithDistance = gyms.map(gym => {
            const gymLatitude = parseFloat(gym.coordinates.latitude.toString());
            const gymLongitude = parseFloat(gym.coordinates.longitude.toString());
            const distance = geolib.getDistance(
                { latitude, longitude },
                { latitude: gymLatitude, longitude: gymLongitude }
            );

            return {
                name: gym.name,
                coordinates: {
                    latitude: gymLatitude,
                    longitude: gymLongitude
                },
                distance // Keep the distance if needed for debugging
            };
        });

        // Sort gyms by distance and get the 10 closest
        const closestGyms = gymsWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 7)
            .map(gym => ({
                name: gym.name,
                coordinates: gym.coordinates // Only return name and coordinates
            }));

        console.log('Closest gyms:', closestGyms); // Log to confirm closest gyms

        res.json(closestGyms); // Respond with the modified array
    } catch (err) {
        console.error('Error fetching gyms:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
