import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../cssfiles/Checkout.css";
import api from "../services/api";
import { FaPlane } from 'react-icons/fa'; 

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get trip and seats from state (sent from Booking.js)
  const { trip, selectedSeats } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault(); // prevent reload if form is valid

    try {
    
      await api.post(
        "/bookings/create",
        {
          tripId: trip._id,
          date: trip.date,
          seats: selectedSeats,
        }
        
      );

      alert("Booking and Payment successful 🎉");
      navigate(`/confirmation/${trip._id}`, { state: { trip, selectedSeats } });
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="checkout-container">
      {/* Left Section */}
      <div className="checkout-left">
        <h2>Checkout & Payment</h2>

        {/* form gets an id so button on right can submit it */}
        <form id="checkout-form" onSubmit={handlePayment}>
          <div className="section">
            <h3>Your Information</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="section">
            <h3>Payment Method</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit or Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={paymentMethod === "wallet"}
                onChange={() => setPaymentMethod("wallet")}
              />
              Digital Wallet (PayPal, Apple Pay)
            </label>

            {paymentMethod === "card" && (
              <div className="card-details">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="Cardholder Name"
                  value={formData.cardHolder}
                  onChange={handleChange}
                  required
                />
                <div className="card-row">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="checkout-right">
        <h3>Booking Summary</h3>
        {trip ? (
          <div className="summary-box">

            <button className="Planebtn">
                          <FaPlane size={24} color="#5c6cd8ff" />
                        </button>

            <p>
              <strong>Route:</strong> {trip.from} → {trip.to}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(trip.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {trip.time}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats?.join(", ")}
            </p>
            <p className="total-fare">
  Total Fare: ${trip.price * selectedSeats?.length}
</p>

          </div>
        ) : (
          <p>No trip details found</p>
        )}

        {/* button submits the form on left */}
        <button type="submit" form="checkout-form" className="pay-btn">
          Complete Payment
        </button>
      </div>
    </div>
  );
}

export default Checkout;
