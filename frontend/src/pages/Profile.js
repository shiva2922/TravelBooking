import React, { useState, useEffect } from 'react';
import '../cssfiles/Profile.css'; 
import api from '../services/api';
import Pastbookings from '../components/Pastbookings'; 

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        setProfile(res.data);
      } catch {
        alert('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
   <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-header">
        <img
          src={profile.avatarUrl || '/default-avatar.png'}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p className="name">{profile.name}</p>
          <p className="email">{profile.email}</p>
          <a href="/manage-profile" className="manage-profile-link">Manage Profile</a>
        </div>
      </div>

      {/* Upcoming bookings */}
      {/* <UpcomingBookings /> */}

      {/* Past bookings */}
       <Pastbookings />
      <Pastbookings />
    </div>
  );
}

export default Profile;
// adjust the path as needed