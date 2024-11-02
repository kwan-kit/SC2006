require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createTrainingPlan = require('./routes/createTrainingPlan');
const gymList = require('./routes/gymList');
const parkList = require('./routes/parkList');
const strava = require('./routes/stravaConnect');
const runReportRouter = require('./routes/saveRunReports');
const gymReportRouter = require('./routes/saveGymReport');

const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


// app.get('/', (req, res) => {
//   res.json({ message: 'Training Plan API is running' });
// });


app.use('/training', createTrainingPlan);
app.use('/save', runReportRouter);
app.use('/record', gymReportRouter);
// app.use('/gym',gymList);
// app.use('/park',parkList);
// app.use('/strava',strava);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

