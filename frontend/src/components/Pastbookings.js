import React from 'react';
import { FaTrain } from 'react-icons/fa'; // Train icon
import '../cssfiles/Pastbookings.css';

const pastBookings = [
  {
    id: 'SLK12345',
    route: 'Washington D.C. → Philadelphia',
    date: '2024-10-12',
    time: '06:00 AM - 12:30 PM',
    seats: 'B3',
  },
  {
    id: 'SLK67654',
    route: 'Chicago → St. Louis',
    date: '2024-10-02',
    time: '02:00 PM - 10:00 PM',
    seats: 'A7, B8',
  },
  {
    id: 'SLK10987',
    route: 'Miami → Orlando',
    date: '2024-09-18',
    time: '09:00 AM - 12:00 PM',
    seats: 'F1',
  },
];

const PastBookings = () => {
  return (
    <div className="past-bookings-container">
      <h2 className="past-bookings-title">Past Bookings</h2>
      <div className="bookings-grid">
        {pastBookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <small>Booking ID: {booking.id}</small>
            </div>
            <div className="booking-status">
              <span className="status-completed">Completed</span>
            </div>
            <div className="booking-route">
              <span>{booking.route}</span>
            </div>
            <div className="booking-date">
              <span>{booking.date}</span>
            </div>
            <div className="booking-time">
              <span>{booking.time}</span>
            </div>
            <div className="booking-seats">
              <strong>Seats:</strong> {booking.seats}
            </div>
            <button className="trainbtn">
              <FaTrain size={24} color="#24793cff" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastBookings;
