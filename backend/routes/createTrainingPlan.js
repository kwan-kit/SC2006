const express = require('express');
const router = express.Router();
const { UserCredentials, HealthData, TrainingPlan } = require('../model/database');
const { createTrainingPlan } = require('../utilities/trainingFunctions');

async function getUserCredentials() {
  const userCreds = await UserCredentials.findOne({});
  return userCreds;
}

async function getHealthData() {
  const healthData = await HealthData.findOne({});
  return healthData;
}

router.get('/plan', async (req, res, next) => {
  try {
    const userCreds = await getUserCredentials();
    if (!userCreds || !userCreds.username) {
      throw new Error('No user credentials found');
    }

    const username = userCreds.username;
    
    const healthData = await getHealthData();
    const requestedActivityLevel = healthData?.activityLevel?.toLowerCase() || 'novice';

    let plan = await TrainingPlan.findOne({ 
      username: username,
      activityLevel: requestedActivityLevel 
    });

    if (!plan) {
      const trainingPlan = createTrainingPlan(requestedActivityLevel);
      await trainingPlan.createTrainingSchedule();
      const weeklyTrainingPlan = trainingPlan.getTrainingSchedule();

      plan = new TrainingPlan({
        username: username,
        schedule: weeklyTrainingPlan,
        activityLevel: requestedActivityLevel
      });

      await plan.save();
    }

    res.json({
      username: username,
      ...plan.toObject()
    });

  } catch (error) {
    console.error('Error in /training-plan route:', error);
    next(error);
  }
});

module.exports = router;