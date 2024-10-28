require('dotenv').config(); // Add this line at the top to load the environment variables
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000; // The port your server will listen on

// MongoDB connection using the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Example route
app.use('/api/example', require('./routes/exampleRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
