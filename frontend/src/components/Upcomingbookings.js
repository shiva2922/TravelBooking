import React from 'react';
import { FaPlane } from 'react-icons/fa';
import '../cssfiles/Pastbookings.css';
import '../cssfiles/Upcoming.css';

const Upcomingbookings = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return <p>No upcoming bookings found.</p>;
  }

  return (
    <div className="past-bookings-container">
      <h2 className="past-bookings-title">Upcoming Bookings</h2>
      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-header">
              <small>Booking ID: {booking._id}</small>
            </div>
            <div className="booking-status-plane">
              <span className="Upcomingstatus">Upcoming</span>
            </div>
            <div className="booking-route">
              <span>
                {booking.trip?.from} → {booking.trip?.to}
              </span>
            </div>
            <div className="booking-date">
              <span>{new Date(booking.trip?.date).toLocaleDateString()}</span>
            </div>
            <div className="booking-time">
              <span>{booking.trip?.time}</span>
            </div>
            <div className="booking-seats">
              <strong>Seats:</strong> {booking.seats?.join(', ')}
            </div>
            <button className="Planebtn">
              <FaPlane size={24} color="#5c6cd8ff" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcomingbookings;
