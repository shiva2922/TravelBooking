const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');
 const generateCustomId = require("../utils/generateId");
 const User = require('../models/userModel');
 

const createBooking = async (req, res) => {
  
  try {
    const {tripId, date, seats } = req.body;
   const user = await User.findById(req.user._id);
   if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User not authenticated" });
    }
 // const mockUserId = "68d2b90375a63785978c5841"; // Replace with a valid user ID from your database
    

    const booking_id = await generateCustomId("booking", "B");
    const booking = new Booking({
      booking_id,
      user: req.user._id,
      trip: tripId,
      date : date,
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
      .populate("trip", "from to");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};



const deleteBooking = async (req, res) => {
  try {
    
     const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  await Booking.deleteOne({ _id: req.params.id });
  res.json({ message: 'Booking removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






module.exports = { createBooking, getMyBookings, getBookings, deleteBooking };
