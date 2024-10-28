const Database = require('./Database');
const DayPlan = require('./DayPlan');
const WeekPlan = require('./WeekPlan');

class TrainingPlan {
    constructor(activityLevel, weeklyIncrease = 0.1) {
        this.trainingSchedule = [];
        this.weeklyIncrease = weeklyIncrease;
        this.startingWeeklyDistance = 0;
        this.goalDistance = 0;
        this.trainingPeriod = 0;
        this.goalTiming = 0; 
        this.WEEK_DAYS = 7;

        this.runDb = new Database('HealthData', 'UserInformationDatabase'); // Source DB
        this.recordDb = new Database('WeeklyTrainingPlan', 'RunTrainingDatabase'); // Target DB
        this.activityLevel = activityLevel; // Store the provided activity level
    }

    async fetchTrainingParameters() {
        console.log(`Attempting to fetch training parameters for ${this.activityLevel} level`);
        
        const targetPlan = await this.runDb.getTargetPlan(this.activityLevel);
        console.log('Retrieved target plan:', targetPlan);
        
            if (targetPlan) {
            try {
                // Handle potential different data formats
                this.startingWeeklyDistance = typeof targetPlan.goalDistance === 'string' 
                    ? parseFloat(targetPlan.goalDistance.split(' ')[0])
                    : parseFloat(targetPlan.goalDistance);
                
                this.goalDistance = typeof targetPlan.goalDistance === 'string'
                    ? parseFloat(targetPlan.goalDistance.split(' ')[0])
                    : parseFloat(targetPlan.goalDistance);
                
                this.trainingPeriod = typeof targetPlan.trainingPeriod === 'string'
                    ? parseInt(targetPlan.trainingPeriod.split(' ')[0], 10)
                    : parseInt(targetPlan.trainingPeriod, 10);
                
                this.goalTiming = targetPlan.goalTiming;

                console.log("Parsed parameters:", {
                    startingWeeklyDistance: this.startingWeeklyDistance,
                    goalDistance: this.goalDistance,
                    trainingPeriod: this.trainingPeriod,
                    goalTiming: this.goalTiming
                });
                
                if (isNaN(this.startingWeeklyDistance) || isNaN(this.goalDistance) || isNaN(this.trainingPeriod)) {
                    throw new Error("Invalid numeric values in training parameters");
                }
            } catch (error) {
                console.error("Error parsing training parameters:", error);
                console.error("Raw target plan data:", targetPlan);
                throw error;
            }
            } else {
            console.error("Could not fetch training parameters. No matching plan found.");
            throw new Error("No training plan found for the specified activity level");
        }
    }

    

    async createTrainingSchedule() {
        await this.fetchTrainingParameters();
        this.setTrainingSchedule();
        const schedule = this.getTrainingSchedule();
        
        // Verify schedule was created
        if (!schedule || schedule.length === 0) {
            throw new Error('Failed to create training schedule');
        }
        
        console.log('Created training schedule:', 
            JSON.stringify(schedule, null, 2));
            
        return schedule;
    }

    setTrainingSchedule() {
        let initialShort = 0.3 * this.startingWeeklyDistance / 3;
        let initialMedium = 0.25 * this.startingWeeklyDistance;
        let initialLong = 0.55 * this.startingWeeklyDistance;

        let curShort = initialShort;
        let curMedium = initialMedium;
        let curLong = initialLong;
        let day = 0;
        let dayThisWeek = 0;
        let week = 0;
        let weeklyDistance = 0;

        this.trainingSchedule = [];
        let daySchedules = [];

        while (week < this.trainingPeriod) {
            let daySchedule = this.getDayPlan(day, dayThisWeek, curShort, curMedium, curLong);
            daySchedules.push(daySchedule);
            weeklyDistance += daySchedule.distance;

            day++;
            dayThisWeek++;

            if (dayThisWeek === this.WEEK_DAYS) {
                dayThisWeek = 0;
                curShort += this.weeklyIncrease * curShort;
                curMedium += this.weeklyIncrease * curMedium;
                curLong += this.weeklyIncrease * curLong;

                let weekSchedule = new WeekPlan(daySchedules, week + 1, weeklyDistance);
                this.trainingSchedule.push(weekSchedule);

                daySchedules = [];
                weeklyDistance = 0;
                week++;
            }
        }
    }

    getDayPlan(day, dayThisWeek, curShort, curMedium, curLong) {
        let distance = 0;
        let runTitle = 'Rest';

        if (dayThisWeek <= 2) {
            distance = curShort;
            runTitle = 'Easy Run';
        } else if (dayThisWeek === 4) {
            distance = curMedium;
            runTitle = 'Medium Run';
        } else if (dayThisWeek === 6) {
            distance = curLong;
            runTitle = 'Long Run';
        }

        return new DayPlan(day + 1, distance, runTitle);
    }

    async recordTrainingPlan() {
        try {
            if (!this.trainingSchedule || this.trainingSchedule.length === 0) {
                console.error('Training schedule is empty. Ensuring schedule is created first...');
                await this.createTrainingSchedule();
            }

            if (!this.trainingSchedule || this.trainingSchedule.length === 0) {
                throw new Error('Failed to create training schedule');
            }

            // Get the latest parameters for metadata
            const targetPlan = await this.runDb.getTargetPlan(this.activityLevel);
            
            // Create the document with complete schedule
            const trainingPlanDocument = {
                activityLevel: this.activityLevel,
                goalDistance: targetPlan.goalDistance,
                trainingPeriod: targetPlan.trainingPeriod,
                goalTiming: targetPlan.goalTiming,
                schedule: this.trainingSchedule.map(week => {
                    // Verify week object structure
                    if (!week || !week.daySchedules) {
                        console.error('Invalid week object:', week);
                        throw new Error('Invalid week object in training schedule');
                    }

                    return {
                        weekNumber: week.weekNumber,
                        weeklyDistance: parseFloat(week.weeklyDistance.toFixed(2)),
                        daySchedules: week.daySchedules.map(day => {
                            // Verify day object structure
                            if (!day) {
                                console.error('Invalid day object in week:', week.weekNumber);
                                throw new Error('Invalid day object in training schedule');
                            }

                            return {
                                day: day.day,
                                distance: parseFloat(day.distance.toFixed(2)),
                                runTitle: day.runTitle
                            };
                        })
                    };
                }),
                createdAt: new Date()
            };

            // Verify the document has a schedule before saving
            if (!trainingPlanDocument.schedule || trainingPlanDocument.schedule.length === 0) {
                throw new Error('Training plan document has empty schedule');
            }

            console.log('Training plan document to be saved:', 
                JSON.stringify(trainingPlanDocument, null, 2));

            // Save to database
            const result = await this.recordDb.recordDetails(trainingPlanDocument);
            console.log('Training plan saved successfully:', result);
            
            return result;
        } catch (error) {
            console.error('Error recording training plan:', error);
            throw error;
        }
    }

    getTrainingSchedule() {
        if (!this.trainingSchedule || this.trainingSchedule.length === 0) {
            console.error('Training schedule is empty in getTrainingSchedule');
        }
        return this.trainingSchedule;
    }
}

module.exports = TrainingPlan;//checkpoint 2
