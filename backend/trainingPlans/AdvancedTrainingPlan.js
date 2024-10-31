const TrainingPlan = require('./TrainingPlan');
const DayPlan = require('./DayPlan');
const WeekPlan = require('./WeekPlan');

class AdvancedTrainingPlan extends TrainingPlan {
    constructor() {
        super('advanced', 0.2); 
    }

    async createTrainingSchedule() {
        try {
            console.log('Starting schedule creation for advanced plan...');
            
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

                    // Sunday: Long Run
                    if (day === 6) {
                        distance = this.goalDistance; 
                        runTitle = 'Long Run';
                    }
                    // Tuesday and Thursday: Medium Run
                    else if (day === 1 || day === 3) {
                        distance = this.goalDistance/1.3; 
                        runTitle = 'Medium Run';
                    }
                    // Monday, Wednesday, and Friday: Easy Run
                    else if (day === 0 || day === 2 || day === 4) {
                        distance = this.goalDistance/2; 
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
            console.error('Error creating advanced training schedule:', error);
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

module.exports = AdvancedTrainingPlan;
//checkpoint