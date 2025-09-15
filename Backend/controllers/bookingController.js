const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');
 const generateCustomId = require("../utils/generateId");

const createBooking = async (req, res) => {
  
  try {
    const {tripId, date, seats } = req.body;
   
    // if (!req.user || !req.user._id) {
    //   return res.status(400).json({ message: "User not authenticated" });
    // }
    const mockUserId = "68c5b8ba595892b3bfd443b0"; 
    const booking_id = await generateCustomId("booking", "B");
    const booking = new Booking({
      booking_id,
      user: mockUserId,
      trip: tripId,
      date,
      seats,
      status: "Pending",
      qrVerified: false,
    });
    await booking.save();
    res.json({ message: "Booking added successfully", booking });
  } catch (err) {
    res.status(500).json({ error: err.message});}
};

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('trip');
  res.json(bookings);
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name")
      .populate("trip", "route");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};


module.exports = { createBooking, getMyBookings, getBookings };
