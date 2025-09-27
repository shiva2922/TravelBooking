import { useEffect, useState } from 'react';
import api from '../services/api';
import Pastbookings from '../components/Pastbookings';
import Upcomingbookings from '../components/Upcomingbookings';

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
    <div className="profile-container" style={{ padding: '20px' }}>
      <Upcomingbookings bookings={bookings} />
      {/* <Pastbookings bookings={bookings}/> */}
    </div>
  );
}

export default MyBookings;
