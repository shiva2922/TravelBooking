const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');

const createBooking = async (req, res) => {
  const { tripId, seats } = req.body;
  const trip = await Trip.findById(tripId);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });

  if (seats.length > trip.availableSeats) {
    return res.status(400).json({ message: 'Not enough seats available' });
  }

  trip.availableSeats -= seats.length;
  await trip.save();

  const booking = await Booking.create({
    user: req.user._id,
    trip: tripId,
    seats,
    status: 'upcoming'
  });

  res.status(201).json(booking);
};

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('trip');
  res.json(bookings);
};


module.exports = { createBooking, getMyBookings };
