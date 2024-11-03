const { HealthData } = require('../model/database'); 

async function getPlanType(username) {
  console.log('Searching for user:', username); // Debug log
    try {
        const healthData = await HealthData.findOne({ username });
        if (!healthData) {
            console.log(`User ${username} not found`); // Additional debug log
            return null; // Return null if user is not found
        }
        return healthData.planType;
    } catch (error) {
        console.error('Error retrieving user health data:', error);
        throw error; // Only throw error for database-related issues
    }
}

async function saveHealthData(username, planType, activityLevel, goalDistance, trainingPeriod, goalTiming) {
  try {
    const healthData = new HealthData({
      username,  
      planType,
      activityLevel,
      goalDistance,
      trainingPeriod,
      goalTiming,
    });

    const savedHealthData = await healthData.save();
    console.log('Health data saved successfully:', savedHealthData);

    return savedHealthData;

  } catch (error) {
    console.error('Error saving health data:', error);
    throw error;
  }
}

async function updateHealthData(username, updates) {
  try {
      const updatedHealthData = await HealthData.findOneAndUpdate(
          { username }, 
          { $set: updates }, 
          { new: true, runValidators: true } 
      );

      if (!updatedHealthData) {
          throw new Error('Health data not found for the specified username');
      }

      console.log('Health data updated successfully:', updatedHealthData);
      return updatedHealthData;

  } catch (error) {
      console.error('Error updating health data:', error);
      throw error;
  }
}



module.exports = { saveHealthData, updateHealthData, getPlanType }; 
