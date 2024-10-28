const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Correct path to the User model

// Example route
router.get('/example', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
