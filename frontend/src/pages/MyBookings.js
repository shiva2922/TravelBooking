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
    
 <Upcomingbookings/>
       <Pastbookings/>
    </div>
  );
}

export default MyBookings;
