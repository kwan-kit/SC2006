const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { UserCredentials, HealthData } = require('../model/database');
const User = require('../model/User');
const { saveHealthData, updateHealthData } = require('../utilities/healthDataFunctions');




router.post('/register', [
  check('planType').isIn(['running', 'hybrid']),
  check('activityLevel').isIn(['novice', 'intermediate', 'advanced']),
  check('goalDistance').notEmpty().trim(), // Validate goalDistance
  check('trainingPeriod').notEmpty().trim(), // Validate trainingPeriod
  check('goalTiming').optional().notEmpty().withMessage('Goal timing is required if provided')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const username = req.session.userTemp.username;
    const { planType, activityLevel, goalDistance, trainingPeriod, goalTiming } = req.body;

    const existingUser = await HealthData.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Save health data directly using the utility function
    const saveData = await saveHealthData(username, planType, activityLevel, goalDistance, trainingPeriod, goalTiming);
    // Destroy the session after saving health data
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Could not complete registration.' });
      }

      res.status(201).json({
        message: 'User registered successfully',
        username,
        activityLevel,
        saveData
      });
    });

  } catch (error) {
    console.error('Error in user registration:', error);
    next(error);
  }
});

router.put('/update-health', [
    check('username').notEmpty().trim().withMessage('Username is required'),
    check('planType').optional().isIn(['hybrid', 'running']).withMessage('Invalid plan type'),
    check('activityLevel').optional().isIn(['novice', 'intermediate', 'advanced']).withMessage('Invalid activity level'),
    check('goalDistance').optional().notEmpty().withMessage('Goal distance is required if provided'),
    check('trainingPeriod').optional().notEmpty().withMessage('Training period is required if provided'),
    check('goalTiming').optional().notEmpty().withMessage('Goal timing is required if provided')
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, ...updates } = req.body;
  
      // Call the updateHealthData function with the username and updates
      const updatedHealthData = await updateHealthData(username, updates);
  
      res.status(200).json({
        message: 'Health data updated successfully',
        updatedHealthData
      });
  
    } catch (error) {
      console.error('Error updating health data:', error);
      next(error);
    }
  });
  

module.exports = router;
