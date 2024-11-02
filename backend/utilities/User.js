class User {
    constructor(username, password, securityQuestion, answer, planType, activityLevel, goalDistance, trainingPeriod, goalTiming, geoLocation) {
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
  
    get username() {
      return this._username;
    }
  
    set username(value) {
      if (typeof value === 'string' && value.length > 0) {
        this._username = value;
      } else {
        throw new Error("Invalid username");
      }
    }
  
    get password() {
      return this._password;
    }
  
    set password(password) {
      this._password = password;
    }
    
    get securityQuestion() {
        return this._securityQuestion;
    }

    set securityQuestion(value) {
        this._securityQuestion = value;
    }

    get answer() {
        return this._answer;
    }

    set answer(answer) {
        this._answer = answer;
    }

    get planType() {
        return this._planType;
    }

    set planType(choice) {
        this._planType = choice;
    }

    get activityLevel() {
        return this._activityLevel;
    }

    set activityLevel(level) {
        this._activityLevel = level;
    }
  
    get goalDistance() {
      return this._goalDistance;
    }
  
    set goalDistance(value) {
      if (typeof value === 'number' && value > 0) {
        this._goalDistance = value;
      } else {
        throw new Error("Goal distance must be a positive number");
      }
    }
  
    get trainingPeriod() {
        return this._trainingPeriod;
    }

    set trainingPeriod(duration) {
        this._trainingPeriod = duration;
    }

    get goalTiming() {
        return this._goalTiming;
    }

    set goalTiming(time) {
        this._goalTiming = time;
    }

    get geoLocation() {
        return this._geoLocation;
    }

    set geoLocation(coordinates) {
        this._geoLocation = coordinates;
    }
  
  }
  
  module.exports = User;
  