// DayPlan class
class DayPlan {
    constructor(day, distance, runTitle) {
        this.day = day;
        this.distance = parseFloat(distance.toFixed(2));
        this.runTitle = runTitle;
    }
}

module.exports = DayPlan; // checkpoint2
