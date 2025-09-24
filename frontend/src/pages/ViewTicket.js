import { useLocation, useNavigate } from "react-router-dom";
import "../cssfiles/ViewTicket.css";

function ViewTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip, selectedSeats } = location.state || {};

  // If no trip data is passed, show fallback
  if (!trip) {
    return (
      <div className="viewticket-container">
        <h2>No ticket data found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="viewticket-container">
      <div className="ticket-card">
        <div className="ticket-header">
          <h2>🎟 Your Flight Ticket</h2>
          <span>Booking ID: #{Math.floor(Math.random() * 1000000)}</span>
        </div>

        <div className="ticket-route">
          <div>
            <h2>{trip.fromCode || "LAX"}</h2>
            <p>{trip.from}</p>
            <p>{trip.time}</p>
          </div>
          <div className="plane-icon">✈</div>
          <div>
            <h2>{trip.toCode || "SFO"}</h2>
            <p>{trip.to}</p>
            <p>
              {trip.time
                ? (() => {
                    const [hours, minutes] = trip.time.split(":").map(Number);
                    const date = new Date();
                    date.setHours(hours + 2, minutes, 0, 0);
                    return date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  })()
                : ""}
            </p>
          </div>
        </div>

        <div className="ticket-info">
          <p><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
          <p><strong>Seats:</strong> {selectedSeats?.join(", ")}</p>
        </div>

        <div className="ticket-fare">
          <p>Total Fare</p>
          <h3>${trip.price * selectedSeats.length}</h3>
        </div>

        <div className="qr-section">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=boardingpass"
            alt="QR Code"
          />
          <p>Scan this QR at the gate</p>
        </div>

        <div className="ticket-actions">
          <button className="btn primary">⬇ Download</button>
          <button className="btn secondary" onClick={() => navigate("/")}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTicket;
