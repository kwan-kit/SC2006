require('dotenv').config()
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sessionMiddleware = require('./utilities/sessionConfig'); 
const bodyParser = require('body-parser');
const saveTrainingPlan = require('./routes/saveTrainingPlan');
const createTrainingPlan = require('./routes/createTrainingPlan');
const gymList = require('./routes/gymList');
const parkList = require('./routes/parkList');
const strava = require('./routes/stravaConnect');
const userRoutes = require('./routes/userRoutes');
const userCredentialsRouter = require('./routes/userCredentials');

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
app.use('/save', saveTrainingPlan)
app.use('/gym',gymList);
app.use('/park',parkList);
app.use('/strava',strava);
app.use('/user', userCredentialsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

