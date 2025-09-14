const express = require('express');
const { getAllTrips, addTrip, updateTrip, deleteTrip } = require('../controllers/tripController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/get-trip', getAllTrips);
router.post('/add-trip',addTrip);
router.put('/:id',updateTrip);
router.delete('/:id',deleteTrip);

module.exports = router;
