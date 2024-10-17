import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Assuming you have a User model
      required: true,
    },
    listingRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing', // Reference to the listing being booked
      required: true,
    },
    leaseStartDate: {
      type: Date,
      required: true,
    },
    leaseEndDate: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    tenantDetails: {
      name: String,
      email: String,
      phone: String,
    },
    specialRequests: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled'],
      default: 'Pending',
    },
    landlordEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
