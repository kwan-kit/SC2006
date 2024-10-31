const TrainingPlan = require('./TrainingPlan');
const DayPlan = require('./DayPlan');
const WeekPlan = require('./WeekPlan');

class IntermediateTrainingPlan extends TrainingPlan {
    constructor() {
        super('intermediate', 0.15); 
    }

    async createTrainingSchedule() {
        try {
            console.log('Starting schedule creation for intermediate plan...');

            // Fetch parameters first
            await this.fetchTrainingParameters();
            console.log('Parameters fetched:', {
                startingWeeklyDistance: this.startingWeeklyDistance,
                goalDistance: this.goalDistance,
                trainingPeriod: this.trainingPeriod,
                goalTiming: this.goalTiming
            });

            // Initialize schedule array
            this.trainingSchedule = [];
            
            // Generate schedule week by week
            for (let week = 0; week < this.trainingPeriod; week++) {
                console.log(`Generating week ${week + 1}/${this.trainingPeriod}`);
                
                const daySchedules = [];
                let weeklyDistance = 0;

                // Create schedule for each day of the week
                for (let day = 0; day < 7; day++) {
                    let distance = 0;
                    let runTitle = 'Rest';

                    // Define running schedule: 
                    // 2 Rest days: e.g., Sunday (0) and Thursday (3)
                    if (day === 0 || day === 3) { 
                        // Rest days
                        runTitle = 'Rest';
                    } 
                    // Monday: Long Run
                    else if (day === 1) { // Monday (1)
                        distance = this.goalDistance; 
                        runTitle = 'Long Run';
                    }
                    // Wednesday and Friday: Medium Run
                    else if (day === 2 || day === 4) { // Wednesday (2) and Friday (4)
                        distance = this.goalDistance / 1.5;
                        runTitle = 'Medium Run';
                    }
                    // Tuesday and Saturday: Easy Run
                    else if (day === 5 || day === 6) { // Tuesday (5) and Saturday (6)
                        distance = this.goalDistance / 3; 
                        runTitle = 'Easy Run';
                    }

                    const dayPlan = new DayPlan(
                        week * 7 + day + 1, // Unique day number
                        distance,
                        runTitle
                    );
                    
                    daySchedules.push(dayPlan);
                    weeklyDistance += distance;
                }

                // Create and add week plan
                const weekPlan = new WeekPlan(
                    daySchedules,
                    week + 1,
                    weeklyDistance
                );
                
                this.trainingSchedule.push(weekPlan);
                console.log(`Week ${week + 1} completed with distance: ${weeklyDistance} km`);
            }

            // Verify schedule was created
            if (!this.trainingSchedule || this.trainingSchedule.length === 0) {
                throw new Error('Schedule generation failed - empty schedule');
            }

            console.log('Schedule generation completed:', 
                `Created ${this.trainingSchedule.length} weeks`);
                
            return this.getTrainingSchedule();
            
        } catch (error) {
            console.error('Error creating intermediate training schedule:', error);
            throw error;
        }
    }

    getTrainingSchedule() {
        if (!this.trainingSchedule || this.trainingSchedule.length === 0) {
            console.error('Training schedule is empty in getTrainingSchedule');
            throw new Error('Training schedule is empty');
        }
        return this.trainingSchedule;
    }
}

module.exports = IntermediateTrainingPlan;
