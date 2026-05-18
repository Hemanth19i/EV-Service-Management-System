const express = require('express');
const router = express.Router();
const { getServices, getAllServices, createService, updateServiceStatus } = require('../controllers/serviceController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getServices)
  .post(protect, createService);

router.route('/admin')
  .get(protect, admin, getAllServices);

router.route('/:id/status')
  .put(protect, admin, updateServiceStatus);

module.exports = router;
