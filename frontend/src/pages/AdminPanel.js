import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTripModal from "../components/AddTripModal";
import {FaTrashAlt, FaEdit, FaMapMarkerAlt, FaUsers, FaClock} from "react-icons/fa";
import "../cssfiles/Admin.css";

const API_URL = process.env.REACT_APP_API_URL;





export default function Admin() {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const [tripsRes, bookingsRes] = await Promise.all([
          axios.get(`${API_URL}/trips/get-trip`),
          
          
        ]);
        setTrips(tripsRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const handleTripAdded = (newTrip) => {
    setTrips((prev) => [...prev, newTrip]);
  };

const handleDelete = async (tripId) => {
  if (window.confirm("Are you sure you want to delete this trip?")) {
    try {
      await axios.delete(`${API_URL}/trips/${tripId}`);
      // Remove trip from the state to update the UI
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Failed to delete the trip. Please try again.");
    }
  }
};



  return (
    <div className="admin-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <h3>Admin Overview</h3>
      <div className="overview">
        <div className="card">
          <div className="icon-wrapper blue"><FaMapMarkerAlt /></div>
          <div>
            <span className="card-value">{trips.length}</span>
            <span className="card-label">Total Trips</span>
          </div>
        </div>
        <div className="card">
          <div className="icon-wrapper green"><FaUsers /></div>
          <div>
            <span className="card-label">Total Bookings</span>
          </div>
        </div>
        <div className="card">
          <div className="icon-wrapper yellow"><FaClock /></div>
          <div>
            <span className="card-value">11</span>
            <span className="card-label">Upcoming Departures</span>
          </div>
        </div>
      </div>

      <section>
        <div className="section-header">
          <h3>Trip Management</h3>
          <div>
            <button className="btn primary">All Trips</button>
            <button className="btn outline" onClick={() => setShowModal(true)}>+ Add New Trip</button>
          </div>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Price</th>
                <th>Total Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length > 0 ? trips.map((t) => (
                <tr key={t._id}>
                  <td>{t.trip_id || "N/A"}</td>
                  <td>{`${t.from || ""} to ${t.to || ""}`}</td>
                  <td>{t.time || "N/A"}</td>
                  <td>3:30 PM</td>
                  <td>${t.price !== undefined ? t.price : "N/A"}</td>
                  <td>{t.totalSeats !== undefined ? t.totalSeats : "N/A"}</td>
                  <td className="actions">
                  <span className="icon-btn edit"><FaEdit /></span>
                  <span className="icon-btn delete" onClick={() => handleDelete(t._id)}>
                    <FaTrashAlt />
                  </span>
                </td>

                </tr>
              )) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>No trips available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h3>Booking Management</h3>
          <div>
            <button className="btn primary">All Bookings</button>
            <button className="btn outline">Verify QR</button>
          </div>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Trip Route</th>
                <th>Date</th>
                <th>Seats</th>
                <th>Status</th>
                <th>QR Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.booking_id}</td>
                  <td>{b.user?.name}</td>
                  <td>{b.trip?.route}</td>
                  <td>{b.date}</td>
                  <td>{Array.isArray(b.seats) ? b.seats.join(", ") : b.seats}</td>
                  <td>
                    <span className={`status-badge ${b.status?.toLowerCase() || "pending"}`}>
                      {b.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    {b.qrVerified ? <span className="qr-icon success">✔</span> : <span className="qr-icon fail">○</span>}
                  </td>
                  <td className="actions">
                    <button className="icon-btn edit"><FaEdit /></button>
                    <button className="icon-btn delete"><FaTrashAlt /></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>No bookings available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && <AddTripModal onClose={() => setShowModal(false)} onTripAdded={handleTripAdded} />}
    </div>
  );
}
