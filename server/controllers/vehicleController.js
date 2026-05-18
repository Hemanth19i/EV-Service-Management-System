const asyncHandler = require('express-async-handler');
const Vehicle = require('../models/Vehicle');

// @desc    Get user vehicles
// @route   GET /api/vehicles
// @access  Private
const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({ user: req.user._id });
  res.json(vehicles);
});

// @desc    Get all vehicles (Admin)
// @route   GET /api/vehicles/admin
// @access  Private/Admin
const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({}).populate('user', 'name email');
  res.json(vehicles);
});

// @desc    Add a vehicle
// @route   POST /api/vehicles
// @access  Private
const addVehicle = asyncHandler(async (req, res) => {
  const { make, model, year, licensePlate, batteryHealth, mileage } = req.body;

  const vehicleExists = await Vehicle.findOne({ licensePlate });
  if (vehicleExists) {
    res.status(400);
    throw new Error('Vehicle with this license plate already exists');
  }

  const vehicle = new Vehicle({
    user: req.user._id,
    make,
    model,
    year,
    licensePlate,
    batteryHealth,
    mileage,
  });

  const createdVehicle = await vehicle.save();
  res.status(201).json(createdVehicle);
});

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Private
const updateVehicle = asyncHandler(async (req, res) => {
  const { make, model, year, licensePlate, batteryHealth, mileage } = req.body;

  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    // Check if user owns vehicle or is admin
    if (vehicle.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      res.status(401);
      throw new Error('Not authorized to update this vehicle');
    }

    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.year = year || vehicle.year;
    vehicle.licensePlate = licensePlate || vehicle.licensePlate;
    vehicle.batteryHealth = batteryHealth || vehicle.batteryHealth;
    vehicle.mileage = mileage || vehicle.mileage;

    const updatedVehicle = await vehicle.save();
    res.json(updatedVehicle);
  } else {
    res.status(404);
    throw new Error('Vehicle not found');
  }
});

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    if (vehicle.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      res.status(401);
      throw new Error('Not authorized to delete this vehicle');
    }

    await Vehicle.deleteOne({ _id: vehicle._id });
    res.json({ message: 'Vehicle removed' });
  } else {
    res.status(404);
    throw new Error('Vehicle not found');
  }
});

module.exports = { getVehicles, getAllVehicles, addVehicle, updateVehicle, deleteVehicle };
