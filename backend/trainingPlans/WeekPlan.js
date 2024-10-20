// WeekPlan class
class WeekPlan {
    constructor(daySchedules, weekNumber, weeklyDistance) {
        this.daySchedules = daySchedules;
        this.weekNumber = weekNumber;
        this.weeklyDistance = parseFloat(weeklyDistance.toFixed(2));
    }
}
module.exports = WeekPlan; // checkpoint2
