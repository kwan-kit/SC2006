const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { UserCredentials, HealthData, TrainingPlan } = require('../model/database');
const { createTrainingPlan, createAndSaveTrainingPlan } = require('../utilities/trainingFunctions');

router.post('/register', [
  check('username').notEmpty().trim(),
  check('activityLevel').isIn(['novice', 'intermediate', 'advanced']),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, activityLevel } = req.body;

    const existingUser = await UserCredentials.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const healthData = new HealthData({
      username,
      activityLevel
    });
    await healthData.save();

    const trainingPlan = await createAndSaveTrainingPlan(username, activityLevel);

    res.status(201).json({
      message: 'User registered successfully',
      username,
      activityLevel,
      trainingPlan
    });

  } catch (error) {
    console.error('Error in user registration:', error);
    next(error);
  }
});

module.exports = router;