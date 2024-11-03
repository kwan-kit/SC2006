const express = require('express');
const router = express.Router();
const User  = require('../model/User');
const { check, validationResult } = require('express-validator');
const { 
    getUserCredentials, 
    createNewAccount, 
    checkPassword, 
    checkSecurityQuestion,
    resetPassword, 
    getSecurityQuestion
} = require('../utilities/userCredentialsFunctions');


// Route to get user information by username
router.get('/:username', async (req, res, next) => {
    try {
        const { username } = req.params;
        const userCredentials = await getUserCredentials(username);

        if (!userCredentials) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(userCredentials);
    } catch (error) {
        console.error('Error fetching user credentials:', error);
        next(error);
    }
});


// Route to get user security question by username
router.get('/getSecurityQuestion/:username', async (req, res, next) => {
    try {
        const { username } = req.params;
        const userCredentials = await getSecurityQuestion(username);


        if (!userCredentials) {
            return res.status(404).json({ error: 'User not found' });
        }
        else {
            req.session.userTemp = new User();
            req.session.userTemp.username = userCredentials.username;
            req.session.userTemp.password = userCredentials.password;
            req.session.userTemp.securityQuestion = userCredentials.securityQuestion;
            req.session.userTemp.answer = userCredentials.answer;
        }

        res.status(200).json(userCredentials);
    } catch (error) {
        console.error('Error fetching user credentials:', error);
        next(error);
    }
});

// Route to register a new account
router.post('/register', [
    check('username').notEmpty().trim().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('securityQuestion').isInt().withMessage('Security question ID must be an integer'),
    check('answer').notEmpty().trim().withMessage('Answer to security question is required')
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, securityQuestion, answer } = req.body;

        // Check if user exists without throwing an error if not found
        const existingUser = await getUserCredentials(username).catch(() => null);

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Proceed to create a new account
        const newAccount = await createNewAccount(username, password, securityQuestion, answer);
        req.session.userTemp = new User();
        req.session.userTemp.username = newAccount.username;

        res.status(201).json({
            message: 'User registered successfully',
            account: newAccount
        });
    } catch (error) {
        console.error('Error in user registration:', error);
        next(error);
    }
});


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
            req.session.userTemp = new User();
            req.session.userTemp.username = username;
            return res.status(200).json({ message: 'Password is correct' });
        } else {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
    } catch (error) {
        console.error('Error checking password:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



// Route to check security question answer
router.post('/check-security-question', [
    check('answer').notEmpty().withMessage('Answer is required')
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // get username from session
        const username = req.session.userTemp.username;
        const { answer } = req.body;
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

// Route to reset password
router.post('/reset-password', [
    check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const username  = req.session.userTemp.username;
        const { newPassword } = req.body;

        const updatedAccount = await resetPassword(username, newPassword);

        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ error: 'Failed to end session' });
            }

            res.status(200).json({
                message: 'Password reset successfully. Session ended.',
                account: updatedAccount
            });
        });
    } catch (error) {
        console.error('Error in password reset:', error);
        next(error);
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Could not log out, please try again.' });
      }
  
      // Optionally, you can also clear the cookie
      res.clearCookie('connect.sid'); // Adjust the cookie name if necessary
      res.status(200).json({ message: 'Logged out successfully.' });
    });
  });

module.exports = router;
