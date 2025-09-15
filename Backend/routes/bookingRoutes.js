const express = require('express');
const { createBooking, getMyBookings, getBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get("/booking-data", getBookings);

module.exports = router;
