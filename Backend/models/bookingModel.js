const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  booking_id: { type: String, unique:true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  seats: [{ type: String, required: true }],
  status: { type: String, enum: ["Confirmed", "Pending"], default:"Pending"},
  date: { type: Date, required: true},
  bookingDate: { type: Date, default: Date.now },
  qrVerified: { type: Boolean, default:false}
});

module.exports = mongoose.model('Booking', bookingSchema);
