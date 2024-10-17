import express from 'express';
import {
    createBooking,
    getBookingDetails,
    updateBooking,
    cancelBooking,
    acceptBooking,
    rejectBooking,
    getAllBookings
} from '../Controllers/bookingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const bookingRouter = express.Router();
bookingRouter.post('/',authMiddleware, createBooking);
bookingRouter.get('/:bookingId',authMiddleware, getBookingDetails);
bookingRouter.put('/:bookingId',authMiddleware, updateBooking);
bookingRouter.patch('/:bookingId/cancel',authMiddleware, cancelBooking);
bookingRouter.patch('/:bookingId/accept',authMiddleware, acceptBooking);
bookingRouter.patch('/:bookingId/reject',authMiddleware, rejectBooking);
bookingRouter.get('/getallbookings/:userId',authMiddleware, getAllBookings);

export default bookingRouter;
