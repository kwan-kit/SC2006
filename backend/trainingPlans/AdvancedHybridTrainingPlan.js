const HybridTrainingPlan = require('./HybridTrainingPlan');

class AdvancedHybridTrainingPlan extends HybridTrainingPlan {
    constructor(activityLevel = 'advanced', weeklyIncrease = 0.1) {
        super(activityLevel, weeklyIncrease);
        this.restDays = 1; // Advanced has 1 rest days
    }
}

module.exports = AdvancedHybridTrainingPlan;