require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const calculatedistanceRouter = require('./routes/calculatedistance');
const geolocationRouter = require('./routes/getGeolocation');
const closestPointRouter = require('./routes/closestPoint');
const parks = require('./routes/parks');
const saveTrainingPlan = require('./routes/saveTrainingPlan');
const createTrainingPlan = require('./routes/createTrainingPlan');

const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.body.targetDistance = 5; // 5 km arbitrary target distance
  next();
});

app.use('/api/parks', parks);
app.use('/api/calculate-distances', calculatedistanceRouter);
// app.use('/api/geolocation', geolocationRouter);
// app.use('/api/closest-point', closestPointRouter);
app.use('/plan', createTrainingPlan);
app.use('/save', saveTrainingPlan)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

