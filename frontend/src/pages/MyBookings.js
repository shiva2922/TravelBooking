import { useEffect, useState } from 'react';
import api from '../services/api';
import Pastbookings from '../components/Pastbookings'; // adjust the path as needed
import Upcomingbookings from '../components/Upcomingbookings'; // adjust the path as needed

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch {
        alert('Error fetching bookings');
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className ="profile-container"style={{ padding: '20px' }}>
      {/* <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet</p>}
      {bookings.map(booking => (
        <div key={booking._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>Trip: {booking.trip.from} → {booking.trip.to}</p>
          <p>Date: {new Date(booking.trip.date).toLocaleDateString()}</p>
          <p>Time: {booking.trip.time}</p>
          <p>Seats: {booking.seats.join(', ')}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))} */}
 <Upcomingbookings />
       <Pastbookings />
    </div>
  );
}

export default MyBookings;
