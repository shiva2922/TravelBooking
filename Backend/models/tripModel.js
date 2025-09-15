const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  trip_id: { type: String, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },  // NEW field
  time: { type: String, required: true },  // keep this for time only
  price: { type: Number, required: true },
  totalSeats: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
