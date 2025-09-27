

import { useLocation, useNavigate } from "react-router-dom";
import "../cssfiles/ViewTicket.css";

function ViewTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip, selectedSeats } = location.state || {};

  if (!trip) {
    return (
      <div className="view-ticket-container">
        <h2>No ticket data found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="view-ticket-container">
      <div className="ticket-box">
        {/* Header */}
        <div className="ticket-header">
          <div>
            <h2>Emirates A380 Airbus</h2>
            <p className="ticket-location">
              📍 Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
            </p>
          </div>
          <div className="price-section">
            <span className="price">${trip.price * selectedSeats.length}</span>
            <button className="download-btn">Download</button>
          </div>
        </div>

        {/* Boarding Pass Layout */}
        <div className="boarding-pass">
          {/* Left side: Departure & Arrival */}
          <div className="flight-times">
            <div className="time-block">
              <h3>{trip.time}</h3>
              <p>{trip.from}</p>
            </div>

            <div className="plane-icon">✈️</div>

            <div className="time-block">
              <h3>
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
              </h3>
              <p>{trip.to}</p>
            </div>
          </div>

          {/* Middle: Passenger Info */}
          <div className="passenger-section">
            <div className="passenger-header">
              <img
                src="https://i.pravatar.cc/100"
                alt="Passenger"
                className="passenger-img"
              />
              <div>
                <h3>James Doe</h3>
                <p>Boarding Pass N°123</p>
              </div>
              <span className="class-tag">Business Class</span>
            </div>

            <div className="details-row">
              <div>📅 Date<br/><strong>{new Date(trip.date).toLocaleDateString()}</strong></div>
<div>⏰ Flight time<br/><strong>{trip.time}</strong></div>
<div>🚪 Gate<br/><strong>A12</strong></div>
<div>💺 Seat<br/><strong>{selectedSeats?.join(", ")}</strong></div>

            </div>

            <div className="barcode"></div>
          </div>

          {/* Right: Flight Path Map */}
          <div className="flight-map">
            <div className="map-path">
              <div className="map-dot left">James Doe</div>
              <svg height="100" width="200">
                <path d="M10 80 C 100 10, 150 10, 190 80"
                      stroke="#007bff"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="transparent"/>
              </svg>
              <div className="map-dot right">James Doe</div>
            </div>
          </div>
        </div>
      </div>

      
<div className="terms-box">
  <h3>Terms and Conditions</h3>

  <h4>Payments</h4>
  <ul>
    <li>
      If you are purchasing your ticket using a debit or credit card via the Website, 
      we will process these payments via the automated secure common payment gateway 
      which will be subject to fraud screening purposes.
    </li>
    <li>
      If you do not supply the correct card billing address and/or cardholder information, 
      your booking will not be confirmed and the overall cost may increase. 
      We reserve the right to cancel your booking if payment is declined for any reason 
      or if you have supplied incorrect card information. 
      If we become aware of, or are notified of, any fraud or illegal activity associated 
      with the payment for the booking, the booking will be cancelled and you will be 
      liable for all costs and expenses arising from such cancellation, without prejudice 
      to any action that may be taken against us.
    </li>
    <li>
      Argo may require the card holder to provide additional payment verification upon 
      request by either submitting an online form or visiting the nearest Argo office, 
      or at the airport at the time of check-in. Argo reserves the right to deny boarding 
      or to collect a guarantee payment (in cash or from another credit card) if the card 
      originally used for the purchase cannot be presented by the cardholder at check-in 
      or when collecting the tickets, or in the case the original payment has been 
      withheld or disputed by the card issuing bank. 
      Credit card details are held in a secured environment and transferred through an 
      internationally accepted system.
    </li>
  </ul>

  <h4>Contact Us</h4>
  <p>
    If you have any questions about our Website or our Terms of Use, please contact:<br />
    Argo Group Q.C.S.C <br />
    Argo Tower <br />
    P.O. Box: 22550 <br />
    Doha, State of Qatar <br />
    Further contact details can be found at 
    <a href="https://argo.com/help" target="_blank" rel="noopener noreferrer"> argo.com/help</a>
  </p>
</div>


    </div>
  );
}

export default ViewTicket;



