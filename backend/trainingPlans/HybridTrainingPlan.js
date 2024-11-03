const TrainingPlan = require('./TrainingPlan');
const DayPlan = require('./DayPlan');
const WeekPlan = require('./WeekPlan');

class HybridTrainingPlan extends TrainingPlan {
    constructor(activityLevel, weeklyIncrease = 0.1) {
        super(activityLevel, weeklyIncrease);
        this.restDays = this.getRestDays(activityLevel);
    }

    getRestDays(activityLevel) {
        if (activityLevel === 'novice') return 3;
        if (activityLevel === 'intermediate') return 2;
        return 1; // advanced
    }

    setTrainingSchedule() {
        let day = 0;
        let dayThisWeek = 0;
        let week = 0;
        let weeklyDistance = 0;

        this.trainingSchedule = [];
        let daySchedules = [];

        while (week < this.trainingPeriod) {
            let daySchedule = this.getHybridDayPlan(dayThisWeek);
            daySchedules.push(daySchedule);
            weeklyDistance += daySchedule.distance || 0;

            day++;
            dayThisWeek++;

            if (dayThisWeek === this.WEEK_DAYS) {
                dayThisWeek = 0;
                let weekSchedule = new WeekPlan(daySchedules, week + 1, weeklyDistance);
                this.trainingSchedule.push(weekSchedule);
                daySchedules = [];
                weeklyDistance = 0;
                week++;
            }
        }
    }

    getHybridDayPlan(dayThisWeek) {
        let runTitle = 'Rest';
        let distance = 0;

        if (dayThisWeek < this.WEEK_DAYS - this.restDays) {
            if (dayThisWeek === 1 || dayThisWeek === 5) {
                runTitle = 'Push Day';
            } else if (dayThisWeek === 2 || dayThisWeek === 6) {
                runTitle = 'Pull Day';
            } else if (dayThisWeek === 3) {
                runTitle = 'Leg Day';
            } else {
                runTitle = 'Running Day';
                distance = this.startingWeeklyDistance;
            }
        }
        
        return new DayPlan(dayThisWeek + 1, distance, runTitle);
    }

    async recordHybridTrainingPlan() {
        await this.createTrainingSchedule();

        const trainingPlanDocument = {
            activityLevel: this.activityLevel,
            goalDistance: this.goalDistance,
            trainingPeriod: this.trainingPeriod,
            goalTiming: this.goalTiming,
            schedule: this.trainingSchedule.map(week => ({
                weekNumber: week.weekNumber,
                weeklyDistance: parseFloat(week.weeklyDistance.toFixed(2)),
                daySchedules: week.daySchedules.map(day => ({
                    day: day.day,
                    distance: parseFloat(day.distance.toFixed(2)),
                    runTitle: day.runTitle
                }))
            })),
            createdAt: new Date()
        };

        console.log('Hybrid training plan document to be saved:', 
            JSON.stringify(trainingPlanDocument, null, 2));

        const result = await this.recordDb.recordDetails(trainingPlanDocument);
        console.log('Hybrid training plan saved successfully:', result);

        return result;
    }
}

module.exports = HybridTrainingPlan;
