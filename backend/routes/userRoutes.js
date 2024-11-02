const express = require('express');
const session = require('express-session');
const User = require('../utilities/user.js'); // Import the User class
const { UserCredentials } = require('../model/database');
const router = express.Router();

router.use(express.json());
router.use(session({
    secret: 'password123', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const user = new User();




module.exports = router;