import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get('/trips/get-trip');
        const trip = res.data.find(t => t._id === id);
        if (!trip) {
          alert('Trip not found');
          navigate('/');
        } else {
          setTrip(trip);
        }
      } catch {
        alert('Error fetching trip');
        navigate('/');
      }
    };
    fetchTrip();
  }, [id, navigate]);

  const handleSeatClick = seat => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < trip.availableSeats) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert('No more seats available');
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedSeats.length === 0) {
      alert('Select at least one seat');
      return;
    }
    try {
      await api.post('/bookings', {
        tripId: trip._id,
        seats: selectedSeats
      });
      alert('Booking successful');
      navigate('/my-bookings');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    }
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Trip: {trip.from} → {trip.to}</h2>
      <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
      <p>Time: {trip.time}</p>
      <p>Available Seats: {trip.availableSeats}</p>
      <p>Price per seat: ${trip.price}</p>

      <h3>Select Seats</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300px' }}>
        {Array.from({ length: trip.totalSeats }, (_, i) => i + 1).map(seat => (
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            style={{
              width: '40px',
              height: '40px',
              margin: '5px',
              lineHeight: '40px',
              textAlign: 'center',
              border: '1px solid #ccc',
              backgroundColor: selectedSeats.includes(seat) ? 'green' : 'white',
              cursor: 'pointer'
            }}
          >
            {seat}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Confirm Booking</button>
    </div>
  );
}

export default Booking;
