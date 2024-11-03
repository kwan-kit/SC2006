const { UserCredentials } = require('../model/database');

async function getUserCredentials(username) {
    console.log('Searching for user:', username); // Debug log
    try {
        const userCredentials = await UserCredentials.findOne({ username });
        if (!userCredentials) {
            console.log(`User ${username} not found`); // Additional debug log
            return null; // Return null if user is not found
        }
        return userCredentials;
    } catch (error) {
        console.error('Error retrieving user credentials:', error);
        throw error; // Only throw error for database-related issues
    }
}

async function getSecurityQuestion(username) {
    console.log('Searching for user:', username); // Debug log
    try {
        const userCredentials = await UserCredentials.findOne({ username });
        if (!userCredentials) {
            console.log(`User ${username} not found`); // Additional debug log
            return null; 
        }
        return userCredentials;
    } catch (error) {
        console.error('Error retrieving security question:', error);
        throw error; // Only throw error for database-related issues
    }
}


async function createNewAccount(username, password, securityQuestion, answer) {
    try {
        const userAccount =  new UserCredentials({
            username, 
            password,
            securityQuestion,
            answer,
        });

        const newAccount = await userAccount.save();
        console.log('New account created succesfully:', newAccount);

        return newAccount;
    } catch (error) {
        console.error('Error creating new account:', error);
        throw error;
    }
}

async function checkPassword(username, password){
    return getUserCredentials(username)
        .then((userAccount) => {
            return userAccount && userAccount.password === password;
        });
}

async function checkSecurityQuestion(username, answer) {
    return getUserCredentials(username)
        .then((UserAccount) => {
            if (UserAccount && UserAccount.answer === answer){
                return true;
            } else {
                return false;
            }
        });
}

async function resetPassword(username, newPassword) {
    try {
        // Find the user and update the password
        const updatedUser = await UserCredentials.findOneAndUpdate(
            { username },
            { password: newPassword },  
            { new: true } 
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}




module.exports = {
    getUserCredentials,
    getSecurityQuestion,
    createNewAccount,
    checkPassword,
    checkSecurityQuestion,
    resetPassword
};