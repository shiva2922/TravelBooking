import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../cssfiles/Home.css';

function Home() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await api.get('/trips/get-trip');
      setTrips(res.data);
    };
    fetchTrips();
  }, []);

  const fallbackImages = [
  'https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=1024x1024&w=is&k=20&c=K8yBJVB-TtpPF1O2zOhVlzXECDxJsadlRrLf4gXXNkk=',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1504609813447-6e8f0e1c1a7e?auto=format&fit=crop&w=800&q=60',
];


  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Next Journey</h1>
        <p>Discover available trips and book your seats with ease.</p>

        <div className="search-wrapper">
          <div className="search-box">
            <input type="text" placeholder="Departure Location" />
            <input type="text" placeholder="Travel Location" />
            <input type="date" />
            <button className="search-btn">Search Trip</button>
          </div>
        </div>
      </section>

      {/* Available Trips */}
      <section className="trips-section">
        <h2>Available Trips</h2>
        <p className="subtext">
          Choose from our carefully selected destinations and enjoy a comfortable journey.
        </p>
        <div className="trip-grid">
          {trips.length === 0 && <p>No trips available</p>}

          
        {trips.map((trip, index) => {
  const randomImageUrl = fallbackImages[index % fallbackImages.length]; // cycle through images

  return (
    <div key={trip._id} className="trip-card">
      <div className="trip-image">
        <img
          src={randomImageUrl}
          alt="Random place"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <div className="labels">
          <span className="label red">Popular</span>
          <span className="label green">20% OFF</span>
        </div>
      </div>
      <div className="trip-content">
        <div className="stars">⭐ 4.9 (316 reviews)</div>
        <h3>{trip.from} → {trip.to}</h3>
        <p className="date">📅 {new Date(trip.date).toLocaleDateString()}</p>
        <p className="time">🕒 {trip.time}</p>
        <p className="seats">💺 {trip.availableSeats} seats available</p>
        <div className="trip-footer">
          <span className="price">${trip.price}</span>
          <Link to={`/booking/${trip._id}`} className="book-btn">Book Now</Link>
        </div>
      </div>
    </div>
  );
})}

        </div>
      </section>
    </div>
  );
}

export default Home;
