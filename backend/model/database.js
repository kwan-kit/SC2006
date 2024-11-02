require('dotenv').config();

const mongoose = require('mongoose');

// Create connections
const userCredentialsConnection = mongoose.createConnection(process.env.MONGODB_USERCREDENTIAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userInfoConnection = mongoose.createConnection(process.env.MONGODB_USERINFO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const runTrainingConnection = mongoose.createConnection(process.env.MONGODB_TRAINING_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const gymDataConnection = mongoose.createConnection(process.env.MONGODB_GYMDATA_URI, {
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
  password: String,
  securityQuestion: Number,
  answer: String
});

const healthDataSchema = new mongoose.Schema({
  username: String,
  planType: String,
  activityLevel: String,
  goalDistance: Number,
  trainingPeriod: Number,
  goalTiming: Number
});

const trainingPlanSchema = new mongoose.Schema({
  username: String,
  schedule: Array,
  activityLevel: String,
  createdAt: { type: Date, default: Date.now }
});

const gymSchema = new mongoose.Schema({
  name: String,
  postalCode: Number,
  coordinates: {
      latitude: mongoose.Types.Decimal128,
      longitude: mongoose.Types.Decimal128
  }
});

// Models
const UserCredentials = userCredentialsConnection.model('UserCredentials', userCredentialsSchema, 'UserCredentials');
const HealthData = userInfoConnection.model('HealthData', healthDataSchema, 'HealthData');
const TrainingPlan = runTrainingConnection.model('WeeklyTrainingPlan', trainingPlanSchema, 'WeeklyTrainingPlan');
const GymData = gymDataConnection.model('GymData',gymSchema,'GymDetails')

module.exports = {
  UserCredentials,
  HealthData,
  TrainingPlan,
  GymData
};
