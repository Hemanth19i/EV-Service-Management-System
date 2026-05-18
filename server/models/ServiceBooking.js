const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle',
    },
    serviceType: {
      type: String,
      required: true,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    cost: {
      type: Number,
      default: 0.0,
    },
    mechanicNotes: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const ServiceBooking = mongoose.model('ServiceBooking', serviceBookingSchema);
module.exports = ServiceBooking;
