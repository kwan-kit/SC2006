import React, { useState } from 'react';
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john123@gmail.com",
    phone: "+65 12345678",
    birthday: "26 November 2004",
    gender: "Male",
    location: "West, Singapore",
    dateJoined: "29/08/2024"
  });
  const [selectedPlan, setSelectedPlan] = useState("Hybrid Plan");

  const handleProfileEdit = () => setIsEditingProfile((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (plan) => setSelectedPlan(plan);

  const confirmPlanChange = () => alert(`Plan confirmed: ${selectedPlan}`);

  const activities = [
    { week: 6, type: "Run", session: 2, time: "44:22", distance: "5.83km", date: "2024-09-01" },
    { week: 6, type: "Gym", session: 1, time: "30:10", date: "2024-08-28" },
    { week: 5, type: "Run", session: 2, time: "32:47", distance: "4.56km", date: "2024-08-25" },
    { week: 5, type: "Gym", session: 1, time: "25:00", date: "2024-08-20" },
    { week: 4, type: "Run", session: 1, time: "38:15", distance: "5.10km", date: "2024-08-15" },
    { week: 3, type: "Gym", session: 2, time: "33:44", date: "2024-08-10" },
    { week: 3, type: "Run", session: 1, time: "45:30", distance: "5.60km", date: "2024-08-05" },
    { week: 2, type: "Run", session: 2, time: "40:20", distance: "5.20km", date: "2024-08-01" }
  ];

  // Sort activities by date with the latest on the left
  const sortedActivities = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="settings-container">
      {/* Profile Section */}
      <div className="profile-section">
        <h2>Profile</h2>
        <div className="profile-details">
          <div className="profile-picture">
            <img src="https://via.placeholder.com/120" alt="Profile" />
          </div>
          <div className="profile-info">
            {isEditingProfile ? (
              <>
                <div className="profile-field">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <div className="profile-field">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <div className="profile-field">
                  <label>Birthday:</label>
                  <input
                    type="text"
                    name="birthday"
                    value={profile.birthday}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <div className="profile-field">
                  <label>Gender:</label>
                  <input
                    type="text"
                    name="gender"
                    value={profile.gender}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <div className="profile-field">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <div className="profile-field">
                  <label>Date Joined:</label>
                  <input
                    type="text"
                    name="dateJoined"
                    value={profile.dateJoined}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                </div>
                <button className="confirm-button" onClick={handleProfileEdit}>
                  <FontAwesomeIcon icon={faCheckCircle} /> Save Changes
                </button>
              </>
            ) : (
              <>
                <h3 className="profile-name">{profile.name}</h3>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Contact:</strong> {profile.phone}</p>
                <p><strong>Birthday:</strong> {profile.birthday}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Date Joined:</strong> {profile.dateJoined}</p>
                <button className="edit-button" onClick={handleProfileEdit}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Plan Selector Section */}
      <div className="plan-section">
        <h2>Choose Your Plan</h2>
        <div className="plan-options">
          <div
            className={`plan-card ${selectedPlan === "Hybrid Plan" ? "selected-hybrid" : ""}`}
            onClick={() => handlePlanChange("Hybrid Plan")}
          >
            <h3>Hybrid Plan</h3>
            <p>Running + Gymming</p>
            <p>For those looking for endurance and strength</p>
          </div>
          <div
            className={`plan-card ${selectedPlan === "Run Plan" ? "selected-run" : ""}`}
            onClick={() => handlePlanChange("Run Plan")}
          >
            <h3>Run Plan</h3>
            <p>Running only</p>
            <p>For those who enjoy cardio</p>
          </div>
        </div>
        <button className="confirm-plan-button" onClick={confirmPlanChange}>
          Confirm Plan Change
        </button>
      </div>

     {/* Past Activities Section */}
     <div className="past-activities">
        <h2>Past Activities</h2>
        <div className="activities-container">
          {sortedActivities.map((activity, index) => (
            <div className="activity-card" key={index}>
              <img 
                src="https://via.placeholder.com/150" 
                alt={`${activity.type} Activity`}
              />
              <div className="activity-info">
                <p><strong>Week {activity.week} {activity.type} {activity.session}</strong></p>
                <p>Time: {activity.time}</p>
                {activity.distance && <p>Distance: {activity.distance}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;