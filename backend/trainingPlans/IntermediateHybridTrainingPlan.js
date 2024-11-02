const HybridTrainingPlan = require('./HybridTrainingPlan');

class IntermediateHybridTrainingPlan extends HybridTrainingPlan {
    constructor(activityLevel = 'intermediate', weeklyIncrease = 0.1) {
        super(activityLevel, weeklyIncrease);
        this.restDays = 2; // Intermediate has 2 rest days
    }
}

module.exports = IntermediateHybridTrainingPlan;