const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  trip_id: { type: String, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },  
  time: { type: String, required: true },  
  price: { type: Number, required: true },
  totalSeats: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
