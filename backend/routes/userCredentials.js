const express = require('express');
const router = express.Router();
const { UserCredentials } = require('../model/database');
const { check, validationResult } = require('express-validator');
const { 
    getUserCredentials, 
    createNewAccount, 
    checkPassword, 
    checkSecurityQuestion 
} = require('../utilities/userCredentialsFunctions');

// Route to get user information by username
router.get('/:username', async (req, res, next) => {
    try {
        const { username } = req.params;
        const userCredentials = await getUserCredentials(username);

        // Check if user credentials were found
        if (!userCredentials) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user information (you can choose what to include)
        res.status(200).json({
            username: userCredentials.username,
            securityQuestion: userCredentials.securityQuestion
            // Exclude sensitive information like password and answer
        });
    } catch (error) {
        console.error('Error retrieving user information:', error);
        next(error);
    }
});


// Route to register a new account
router.post('/register', [
    check('username').notEmpty().trim().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('securityQuestion').notEmpty().isIn(['novice', 'intermediate', 'advanced']),
    check('answer').notEmpty().trim().withMessage('Answer to security question is required')
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, securityQuestion, answer } = req.body;

        const existingUser = await getUserCredentials(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newAccount = await createNewAccount(username, password, securityQuestion, answer);

        res.status(201).json({
            message: 'User registered successfully',
            account: newAccount
        });
    } catch (error) {
        console.error('Error in user registration:', error);
        next(error);
    }
});

// Route to check password
router.post('/check-password', [
    check('username').notEmpty().trim().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required')
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const isPasswordCorrect = await checkPassword(username, password);

        if (isPasswordCorrect) {
            res.status(200).json({ message: 'Password is correct' });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error checking password:', error);
        next(error);
    }
});

// Route to check security question answer
router.post('/check-security-question', [
    check('username').notEmpty().trim().withMessage('Username is required'),
    check('answer').notEmpty().withMessage('Answer is required')
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, answer } = req.body;
        const isAnswerCorrect = await checkSecurityQuestion(username, answer);

        if (isAnswerCorrect) {
            res.status(200).json({ message: 'Answer is correct' });
        } else {
            res.status(401).json({ message: 'Incorrect answer' });
        }
    } catch (error) {
        console.error('Error checking security question:', error);
        next(error);
    }
});

module.exports = router;