const HybridTrainingPlan = require('./HybridTrainingPlan');

class NoviceHybridTrainingPlan extends HybridTrainingPlan {
    constructor(activityLevel = 'novice', weeklyIncrease = 0.1) {
        super(activityLevel, weeklyIncrease);
        this.restDays = 3; // Novice has 3 rest days
    }
}

module.exports = NoviceHybridTrainingPlan;