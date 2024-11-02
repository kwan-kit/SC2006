const express = require('express');
const router = express.Router();
const { UserCredentials, HealthData, TrainingPlan } = require('../model/database');
const { createTrainingPlan, createHybridTrainingPlan } = require('../utilities/trainingFunctions');

async function getHealthData(username) {
  const healthData = await HealthData.findOne({ username: username });
  return healthData;
}

router.get('/plan/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    // Fetch the health data for the specified username
    const healthData = await getHealthData(username); 
    if (!healthData) {
      throw new Error(`Health data not found for user: ${username}`);
    }

    const requestedActivityLevel = healthData.activityLevel?.toLowerCase() || 'novice';
    const planType = healthData.planType?.toLowerCase() || 'running';
    console.log('Fetched health data:', { requestedActivityLevel, planType });

    // Find existing plan in TrainingPlan collection
    let plan = await TrainingPlan.findOne({ 
      username: username,
      activityLevel: requestedActivityLevel 
    });

    if (!plan) {
      let trainingPlan;
      if (planType === 'hybrid') {
        // Generate hybrid training plan if planType is 'hybrid'
        trainingPlan = createHybridTrainingPlan(requestedActivityLevel);
      } else {
        // Generate normal training plan if planType is 'running'
        trainingPlan = createTrainingPlan(requestedActivityLevel);
      }

      await trainingPlan.createTrainingSchedule();
      const weeklyTrainingPlan = trainingPlan.getTrainingSchedule();

      plan = new TrainingPlan({
        username: username,
        schedule: weeklyTrainingPlan,
        activityLevel: requestedActivityLevel,
        planType: planType
      });

      await plan.save();
    }

    res.json({
      username: username,
      ...plan.toObject()
    });

  } catch (error) {
    console.error('Error in /training-plan route:', error.message);
    next(error);
  }
});


module.exports = router;
