import Booking from '../Models/Booking .js';
import Listing from '../Models/ListingModel.js';
import sendBookingEmail from '../services/sendBookingEmail.js';

// Create a new booking
export const createBooking = async (req, res) => {
    const { userRef, listingRef, leaseStartDate, leaseEndDate, totalAmount, tenantDetails, specialRequests,landlordEmail } = req.body;

    try {
        // Validate dates
        if (new Date(leaseStartDate) >= new Date(leaseEndDate)) {
            return res.status(400).json({ message: 'Lease end date must be after the start date.' });
        }

        // Check if the listing exists
        const listing = await Listing.findById(listingRef);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found.' });
        }

        const newBooking = new Booking({
            userRef,
            listingRef,
            leaseStartDate,
            leaseEndDate,
            totalAmount,
            tenantDetails,
            specialRequests,
            landlordEmail
        });

        const savedBooking = await newBooking.save();

        // Send email notification to landlord
        await sendBookingEmail(landlordEmail, tenantDetails, {
            leaseStartDate,
            leaseEndDate,
            totalAmount,
            specialRequests,
         
        });

        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Controller to get all bookings for a specific user with populated data
export const getAllBookings = async (req, res) => {
    const { userId } = req.params;
    console.log(userId, 'for which finding the bookings');

    try {
        // Fetch bookings and populate 'userRef' and 'listingRef'
        const bookings = await Booking.find({ userRef: userId })
            .populate('userRef') 
            .populate('listingRef'); 

        // Check if bookings are found
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        // Send the populated bookings as a response
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get booking details by ID
export const getBookingDetails = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId).populate('listingRef');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking details', error: error.message });
    }
};

// Update booking details
export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { leaseStartDate, leaseEndDate, specialRequests } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // Update fields if they exist
        if (leaseStartDate) booking.leaseStartDate = leaseStartDate;
        if (leaseEndDate) booking.leaseEndDate = leaseEndDate;
        if (specialRequests) booking.specialRequests = specialRequests;

        const updatedBooking = await booking.save();
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        booking.status = 'cancelled';
        const cancelledBooking = await booking.save();
        res.status(200).json({ message: 'Booking cancelled successfully', booking: cancelledBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
};

// Accept a booking (landlord action)
export const acceptBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        booking.status = 'accepted';
        const acceptedBooking = await booking.save();
        res.status(200).json({ message: 'Booking accepted successfully', booking: acceptedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting booking', error: error.message });
    }
};

// Reject a booking (landlord action)
export const rejectBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        booking.status = 'rejected';
        const rejectedBooking = await booking.save();
        res.status(200).json({ message: 'Booking rejected successfully', booking: rejectedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting booking', error: error.message });
    }
};
