import express from 'express';
import { createPaymentHistory, getPaymentHistory } from '../Controllers/paymentHistoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const paymentRouter = express.Router();
paymentRouter.post('/create-payment',authMiddleware, createPaymentHistory);
paymentRouter.get('/get-payment-history/:id',authMiddleware, getPaymentHistory);

export default paymentRouter;
