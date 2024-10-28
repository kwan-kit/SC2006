import React from 'react';
import './Profile.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBirthdayCake, faMale, faMapMarkerAlt, faCalendarAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Profile Picture */}
      <div className="profile-picture">
        <img src="https://via.placeholder.com/120" alt="Profile" />
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <h2>John Smith</h2>
        <p><FontAwesomeIcon icon={faEnvelope} /> Email: john123@gmail.com</p>
        <p><FontAwesomeIcon icon={faPhone} /> Contact: +65 12345678</p>
        <p><FontAwesomeIcon icon={faBirthdayCake} /> Birthday: 26 November 2004</p>
        <p><FontAwesomeIcon icon={faMale} /> Gender: Male</p>
        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Location: West, Singapore</p>
        <p><FontAwesomeIcon icon={faCalendarAlt} /> Date Joined: 29/08/2024</p>

        {/* Edit Button */}
        <button className="edit-button">
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
