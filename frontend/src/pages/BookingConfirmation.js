import { useLocation, useNavigate } from "react-router-dom";
import "../cssfiles/BookingConfirmation.css";

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip, selectedSeats } = location.state || {};

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <div className="success-icon">✔</div>
        <h2>Booking Confirmed!</h2>
        <p>Your trip is successfully booked. Enjoy your journey!</p>
      </div>

      <div className="ticket-card">
        <div className="ticket-header">
          <h3>Flight Ticket</h3>
          <span>Booking ID: #{Math.floor(Math.random() * 1000000)}</span>
        </div>

        <div className="ticket-route">
          <div>
            <h2>{trip?.fromCode || "LAX"}</h2>
            <p>{trip?.from}</p>
            <p>{trip?.time}</p>
          </div>
          <div className="plane-icon">✈</div>
          <div>
            <h2>{trip?.toCode || "SFO"}</h2>
            <p>{trip?.to}</p>
     <p>
  {trip?.time
    ? (() => {
        const [hours, minutes] = trip.time.split(":").map(Number);
        const date = new Date();
        date.setHours(hours + 2, minutes, 0, 0);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      })()
    : ""}
</p>

          </div>
        </div>

        <div className="ticket-info">
          <p><strong>Date:</strong> {new Date(trip?.date).toLocaleDateString()}</p>
          <p><strong>Seats:</strong> {selectedSeats?.join(", ")}</p>
        </div>

        <div className="ticket-fare">
          <p>Total Fare Paid</p>
          <h3>${trip?.price * selectedSeats?.length}</h3>
        </div>

        <div className="qr-section">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=boardingpass" alt="QR Code"/>
          <p>Scan this QR code at the boarding gate</p>
        </div>

        <div className="ticket-actions">
          <button className="btn primary">⬇ Download Ticket</button>
          <button
  className="btn secondary"
  onClick={() => navigate("/view-ticket", { state: { trip, selectedSeats } })
  }
>
  👁 View Ticket
</button>

        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
