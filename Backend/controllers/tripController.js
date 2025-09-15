const Trip = require('../models/tripModel');
 const generateCustomId = require("../utils/generateId");

const getAllTrips = async (req, res) => {
  const trips = await Trip.find({});
  res.json(trips);
};

const addTrip = async (req, res) => {
  try {
    const { from, to, date, time, price, totalSeats } = req.body;

    
    const trip_id = await generateCustomId("trip", "T");
    const trip = new Trip({ trip_id, from, to, date, time, price, totalSeats });
    await trip.save();

    res.json({ message: "Trip added successfully", trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });

  const { from, to, date, price, totalSeats, time } = req.body;
  trip.from = from;
  trip.to = to;
  trip.date = date;
  trip.price = price;
  trip.totalSeats = totalSeats;
  trip.availableSeats = totalSeats; // Or handle properly
  trip.time = time;


  await trip.save();
  res.json(trip);
};

const deleteTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });

  await Trip.deleteOne({ _id: req.params.id });
  res.json({ message: 'Trip removed' });
};

module.exports = { getAllTrips,addTrip, updateTrip, deleteTrip };
