class User {
    constructor({
      username = null,
      password = null,
      securityQuestion = null,
      answer = null,
      planType = null,
      activityLevel = null,
      goalDistance = null,
      trainingPeriod = null,
      goalTiming = null,
      geoLocation = null,
    } = {}) {
      this._username = username;
      this._password = password; 
      this._securityQuestion = securityQuestion;
      this._answer = answer; 
      this._planType = planType;
      this._activityLevel = activityLevel;
      this._goalDistance = goalDistance;
      this._trainingPeriod = trainingPeriod;
      this._goalTiming = goalTiming;
      this._geoLocation = geoLocation;
    }
  
    getUsername() {
      return this._username;
    }
  
    setUsername(value) {
      if (typeof value === 'string' && value.length > 0) {
        this._username = value;
      } else {
        throw new Error("Invalid username");
      }
    }
  
    getPassword() {
      return this._password;
    }
  
    setPassword(password) {
      this._password = password;
    }
    
    getSecurityQuestion() {
        return this._securityQuestion;
    }

    setSecurityQuestion(value) {
        this._securityQuestion = value;
    }

    getAnswer() {
        return this._answer;
    }

    setAnswer(answer) {
        this._answer = answer;
    }

    getPlanType() {
        return this._planType;
    }

    setPlanType(choice) {
        this._planType = choice;
    }

    getActivityLevel() {
        return this._activityLevel;
    }

    setActivityLevel(level) {
        this._activityLevel = level;
    }
  
    getGoalDistance() {
      return this._goalDistance;
    }
  
    setGoalDistance(value) {
      if (typeof value === 'number' && value > 0) {
        this._goalDistance = value;
      } else {
        throw new Error("Goal distance must be a positive number");
      }
    }
  
    getTrainingPeriod() {
        return this._trainingPeriod;
    }

    setTrainingPeriod(duration) {
        this._trainingPeriod = duration;
    }

    getGoalTiming() {
        return this._goalTiming;
    }

    setGoalTiming(time) {
        this._goalTiming = time;
    }

    getGeoLocation() {
        return this._geoLocation;
    }

    setGeoLocation(coordinates) {
        this._geoLocation = coordinates;
    }
  
  }
  
  module.exports = User;
  