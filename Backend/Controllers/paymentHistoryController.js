import PaymentHistory from '../Models/PaymentHistory.js';

// Create a new payment history record
export const createPaymentHistory = async (req, res) => {
    const { landlordName, address, paymentMethod, amount, processingFee, paymentId, userId } = req.body;

    const newPayment = new PaymentHistory({
        landlordName,
        address,
        paymentMethod,
        amount,
        processingFee,
        paymentId,
        userId
    });

    try {
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all payment history records
export const getPaymentHistory = async (req, res) => {
    const { id } = req.params; // Extract user ID from request parameters
    try {
        // Find payment history records that match the user ID
        const payments = await PaymentHistory.find({ userId: id }).populate('userId', 'name email'); // Populate user details if needed
        
        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payment history found for this user.' });
        }
        
        res.status(200).json(payments); // Return the payment history
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

