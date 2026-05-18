const asyncHandler = require('express-async-handler');
const ServiceBooking = require('../models/ServiceBooking');

// @desc    Get user service bookings
// @route   GET /api/services
// @access  Private
const getServices = asyncHandler(async (req, res) => {
  const services = await ServiceBooking.find({ user: req.user._id }).populate('vehicle', 'make model licensePlate');
  res.json(services);
});

// @desc    Get all service bookings (Admin)
// @route   GET /api/services/admin
// @access  Private/Admin
const getAllServices = asyncHandler(async (req, res) => {
  const services = await ServiceBooking.find({})
    .populate('user', 'name email')
    .populate('vehicle', 'make model licensePlate');
  res.json(services);
});

// @desc    Create new service booking
// @route   POST /api/services
// @access  Private
const createService = asyncHandler(async (req, res) => {
  const { vehicle, serviceType, preferredDate, notes } = req.body;

  const service = new ServiceBooking({
    user: req.user._id,
    vehicle,
    serviceType,
    preferredDate,
    notes,
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
});

// @desc    Update service booking status (Admin)
// @route   PUT /api/services/:id/status
// @access  Private/Admin
const updateServiceStatus = asyncHandler(async (req, res) => {
  const { status, cost, mechanicNotes } = req.body;

  const service = await ServiceBooking.findById(req.params.id);

  if (service) {
    service.status = status || service.status;
    if (cost !== undefined) service.cost = cost;
    if (mechanicNotes !== undefined) service.mechanicNotes = mechanicNotes;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service booking not found');
  }
});

module.exports = { getServices, getAllServices, createService, updateServiceStatus };
