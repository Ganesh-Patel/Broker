import mongoose from 'mongoose';

const PaymentHistorySchema = new mongoose.Schema({
    landlordName: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    processingFee: { type: Number, required: true },
    paymentId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, 
    createdAt: { type: Date, default: Date.now }
});

const PaymentHistory = mongoose.model('PaymentHistory', PaymentHistorySchema);
export default PaymentHistory;
