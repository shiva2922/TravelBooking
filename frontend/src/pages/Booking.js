import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../cssfiles/Booking.css';

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
    if (trip.bookedSeats?.includes(seat)) return; // cannot select booked seat
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = async () => {
  if (selectedSeats.length === 0) {
    alert('Select at least one seat');
    return;
  }
  try {
    const token = localStorage.getItem('token');
    await api.post('/bookings/create', {
  tripId: trip._id,
  date: trip.date,
  seats: selectedSeats
}, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
    alert('Booking successful');
    navigate('/my-bookings');
  } catch (error) {
    alert(error.response?.data?.message || 'Booking failed');
  }
};




  if (!trip) return <div>Loading...</div>;

  return (
    <div className="booking-container">
      <div className="trip-details">
        <h2>{trip.from} → {trip.to}</h2>
        <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
        <p>Time: {trip.time}</p>
        <p>Price per seat: ${trip.price}</p>
      </div>

      <div className="seat-section">
        <h3>Select Your Seat</h3>
        <div className="seat-map">
          {['A','B','C','D','E','F'].map(row => (
            Array.from({ length: 6 }, (_, i) => {
              const seat = `${row}${i+1}`;
              const isBooked = trip.bookedSeats?.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <div
                  key={seat}
                  className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              );
            })
          ))}
        </div>
        <div className="legend">
          <span className="legend-item available">Available</span>
          <span className="legend-item booked">Booked</span>
          <span className="legend-item selected">Selected</span>
        </div>
      </div>

      <div className="selected-seats">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
      </div>

      <button className="confirm-btn" onClick={handleSubmit}>Confirm Booking</button>
    </div>
  );
}

export default Booking;
