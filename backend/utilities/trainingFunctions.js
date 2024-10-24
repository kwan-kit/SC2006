const NoviceTrainingPlan = require('../trainingPlans/NoviceTrainingPlan');
const IntermediateTrainingPlan = require('../trainingPlans/IntermediateTrainingPlan');
const AdvancedTrainingPlan = require('../trainingPlans/AdvancedTrainingPlan');

const { TrainingPlan } = require('../model/database');

function createTrainingPlan(activityLevel) {
  switch (activityLevel.toLowerCase()) {
    case 'novice':
      return new NoviceTrainingPlan();
    case 'intermediate':
      return new IntermediateTrainingPlan();
    case 'advanced':
      return new AdvancedTrainingPlan();
    default:
      throw new Error("Invalid activity level.");
  }
}

async function createAndSaveTrainingPlan(username, activityLevel) {
  const trainingPlan = createTrainingPlan(activityLevel);
  await trainingPlan.createTrainingSchedule();
  const weeklyTrainingPlan = trainingPlan.getTrainingSchedule();

  const plan = new TrainingPlan({
    username: username,
    schedule: weeklyTrainingPlan,
    activityLevel: activityLevel
  });

  return plan.save();
}

module.exports = {
  createTrainingPlan,
  createAndSaveTrainingPlan
};