const mongoose = require('mongoose');

// Create connections
const userCredentialsConnection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userInfoConnection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const runTrainingConnection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const userCredentialsSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  },
});

const healthDataSchema = new mongoose.Schema({
  activityLevel: String,
  username: String
});

const trainingPlanSchema = new mongoose.Schema({
  username: String,
  schedule: Array,
  activityLevel: String,
  createdAt: { type: Date, default: Date.now }
});

// Models
const UserCredentials = userCredentialsConnection.model('UserCredentials', userCredentialsSchema, 'UserCredentials');
const HealthData = userInfoConnection.model('HealthData', healthDataSchema, 'HealthData');
const TrainingPlan = runTrainingConnection.model('WeeklyTrainingPlan', trainingPlanSchema, 'WeeklyTrainingPlan');

module.exports = {
  UserCredentials,
  HealthData,
  TrainingPlan
};