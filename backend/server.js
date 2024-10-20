require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const calculatedistanceRouter = require('./routes/calculatedistance');
const geolocationRouter = require('./routes/getGeolocation');
const closestPointRouter = require('./routes/closestPoint');
const parks = require('./routes/parks');

const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const NoviceTrainingPlan = require('../trainingPlans/NoviceTrainingPlan');
const IntermediateTrainingPlan = require('../trainingPlans/IntermediateTrainingPlan');
const AdvancedTrainingPlan = require('../trainingPlans/AdvancedTrainingPlan');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.body.targetDistance = 5; // 5 km arbitrary target distance
  next();
});

app.use('/api/parks', parks);
app.use('/api/calculate-distances', calculatedistanceRouter)
// app.use('/api/geolocation', geolocationRouter);
// app.use('/api/closest-point', closestPointRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to UserCredentialsDatabase
const userCredentialsConnection = mongoose.createConnection('mongodb+srv://rahul:Password123@cluster0.6l81s.mongodb.net/UserCredentialsDatabase?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to UserInformationDatabase
const userInfoConnection = mongoose.createConnection('mongodb+srv://rahul:Password123@cluster0.6l81s.mongodb.net/UserInformationDatabase?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to RunTrainingDatabase
const runTrainingConnection = mongoose.createConnection('mongodb+srv://rahul:Password123@cluster0.6l81s.mongodb.net/RunTrainingDatabase?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for UserCredentials
const userCredentialsSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  },
});

// Schema for HealthData
const healthDataSchema = new mongoose.Schema({
  activityLevel: String,
  username: String  // Added username field
});

// Updated Schema for TrainingPlan
const trainingPlanSchema = new mongoose.Schema({
  username: String,  // Added username field
  schedule: Array,
  activityLevel: String,
  createdAt: { type: Date, default: Date.now }
});

// Models for each database
const UserCredentials = userCredentialsConnection.model('UserCredentials', userCredentialsSchema, 'UserCredentials');
const HealthData = userInfoConnection.model('HealthData', healthDataSchema, 'HealthData');
const TrainingPlan = runTrainingConnection.model('WeeklyTrainingPlan', trainingPlanSchema, 'WeeklyTrainingPlan');

// Helper function to get user credentials
async function getUserCredentials() {
  const userCreds = await UserCredentials.findOne({});
  return userCreds;
}

// Helper function to get health data
async function getHealthData() {
  const healthData = await HealthData.findOne({});
  return healthData;
}

// Helper function to create training plan
function createTrainingPlan(activityLevel) {
  switch (activityLevel.toLowerCase()) {
    case 'novice':
      return new NoviceTrainingPlan();
    case 'intermediate':
      return new IntermediateTrainingPlan();
    case 'advanced':
      return new AdvancedTrainingPlan();
    default:
      throw new Error("Invalid activity level.");
  }
}

// Helper function to create and save training plan
async function createAndSaveTrainingPlan(username, activityLevel) {
  const trainingPlan = createTrainingPlan(activityLevel);
  await trainingPlan.createTrainingSchedule();
  const weeklyTrainingPlan = trainingPlan.getTrainingSchedule();

  const plan = new TrainingPlan({
    username: username,
    schedule: weeklyTrainingPlan,
    activityLevel: activityLevel
  });

  return plan.save();
}

app.post('/register', [
  check('username').notEmpty().trim(),
  check('activityLevel').isIn(['novice', 'intermediate', 'advanced']),
], async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, activityLevel } = req.body;

    // Check if username already exists
    const existingUser = await UserCredentials.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create health data
    const healthData = new HealthData({
      username,
      activityLevel
    });
    await healthData.save();

    // Create and save training plan
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

app.get('/training-plan', async (req, res, next) => {
  try {
    // Get user credentials first
    const userCreds = await getUserCredentials();
    if (!userCreds || !userCreds.username) {
      throw new Error('No user credentials found');
    }

    const username = userCreds.username;
    console.log('Username:', username);

    // Get health data
    const healthData = await getHealthData();
    const requestedActivityLevel = healthData?.activityLevel?.toLowerCase() || 'novice';
    console.log('Requested activity level:', requestedActivityLevel);

    // Find existing plan for this user
    let plan = await TrainingPlan.findOne({ 
      username: username,
      activityLevel: requestedActivityLevel 
    });

    // If no plan exists, create one
    if (!plan) {
      console.log(`Creating new ${requestedActivityLevel} plan for user ${username}`);
      const trainingPlan = createTrainingPlan(requestedActivityLevel);
      await trainingPlan.createTrainingSchedule();
      const weeklyTrainingPlan = trainingPlan.getTrainingSchedule();

      plan = new TrainingPlan({
        username: username,
        schedule: weeklyTrainingPlan,
        activityLevel: requestedActivityLevel
      });

      await plan.save();
      console.log("New plan created and saved to database");
    }

    // Send the response with the found or created plan
    res.json({
      username: username,
      ...plan.toObject()
    });

  } catch (error) {
    console.error('Error in /training-plan route:', error);
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: "Server error.", 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

