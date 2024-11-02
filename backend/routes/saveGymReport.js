const express = require('express');
const router = express.Router();
const { GymReport } = require('../model/database');

// POST route for creating a gym report
router.post('/gym-report', async (req, res) => {
  const { username, workout } = req.body; 

  try {
    const gymReport = new GymReport({
      username: username,
      date: new Date(),
      workout: workout,
    });

    await gymReport.save();
    res.status(201).send(gymReport); 
  } catch (error) {
    console.error('Error saving gym report:', error);
    res.status(400).send({ error: 'Failed to save gym report' });
  }
});


router.get('/gym-report/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const gymReports = await GymReport.find({ username });
        res.status(200).json(gymReports);
    } catch (error) {
        console.error('Error fetching gym reports:', error);
        res.status(500).send({ error: 'Failed to fetch gym reports' });
    }
});

module.exports = router;
