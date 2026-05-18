const express = require('express');
const router = express.Router();
const { getVehicles, getAllVehicles, addVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getVehicles)
  .post(protect, addVehicle);

router.route('/admin')
  .get(protect, admin, getAllVehicles);

router.route('/:id')
  .put(protect, updateVehicle)
  .delete(protect, deleteVehicle);

module.exports = router;
