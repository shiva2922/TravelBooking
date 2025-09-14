import React, { useState } from "react";
import axios from "axios";
import "../cssfiles/AddTripModal.css";

const AddTripModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    time: "",
    price: "",
    totalSeats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/trips/add-trip", formData);

      // close the modal
      if (typeof onClose === "function") onClose();

      // If already on /admin, reload to refresh data.
      // Otherwise navigate to /admin.
      if (window.location.pathname === "/admin") {
        window.location.reload(); // full page reload
      } else {
        window.location.href = "/admin"; // navigate to admin (no SPA navigation)
      }
    } catch (error) {
      console.error("Error adding trip:", error);
      alert("Failed to add trip");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Trip Details</h3>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                name="from"
                placeholder="Departure Location"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>To</label>
              <input
                type="text"
                name="to"
                placeholder="Arrival Destination"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date & Time</label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Seats</label>
              <input
                type="number"
                name="totalSeats"
                placeholder="Total no. of seats"
                value={formData.totalSeats}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTripModal;
