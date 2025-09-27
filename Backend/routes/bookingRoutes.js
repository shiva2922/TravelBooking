const express = require('express');
const { createBooking, getMyBookings, getBookings, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get("/booking-data", getBookings);
router.delete('/:id', deleteBooking);

module.exports = router;
