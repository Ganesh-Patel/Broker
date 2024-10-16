import React, { useContext, useState } from 'react';
import { Razorpay } from 'react-razorpay';
import { UserContext } from '../../context/UserContext';
import { createPayment } from '../../utils/paymentApis.js'; // Adjust the path as necessary

function PayRent() {
    const [landlordName, setLandlordName] = useState('');
    const { user } = useContext(UserContext);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('account'); // Default to 'account'
    const [bankName, setBankName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [upiId, setUpiId] = useState('');
    const [amount, setAmount] = useState('');
    const [receipt, setReceipt] = useState(null); // To store the receipt
    const [redirect, setRedirect] = useState(false); // To handle redirecting

    const processingFeePercentage = 1.75;
    const minAmount = 500;
    const maxAmount = 200000;

    const calculateProcessingFee = (amount) => {
        return (amount * processingFeePercentage) / 100;
    };

    const handlePayment = () => {
        // Validate amount
        const numericAmount = parseFloat(amount);
        if (numericAmount < minAmount || numericAmount > maxAmount) {
            alert(`Amount must be between ${minAmount} and ${maxAmount}.`);
            return;
        }

        // Basic validation
        if (!landlordName || !address || (!accountNumber && paymentMethod === 'account') || !ifscCode || !bankName || !accountHolderName) {
            if (paymentMethod === 'account') {
                alert('Please fill in all required fields for bank payment.');
            } else if (!upiId) {
                alert('Please fill in all required fields for UPI payment.');
            }
        }

        // Set up Razorpay options
        const options = {
            key: "rzp_test_FxRK4tM1aleKRe",
            amount: numericAmount * 100 + calculateProcessingFee(numericAmount) * 100, // Total amount in paisa
            currency: 'INR',
            name: 'Amazon', // Your store name
            description: 'Test Transaction',
            image: 'https://i.pinimg.com/736x/8a/b0/12/8ab0121c7d7a90f6415b4b0edaf035d9.jpg',
            handler: async function (response) {
                console.log('Payment Response:', response);
                
                // Prepare payment data for saving
                const paymentData = {
                    landlordName,
                    address,
                    paymentMethod,
                    amount: numericAmount,
                    processingFee: calculateProcessingFee(numericAmount),
                    paymentId: response.razorpay_payment_id,
                    userId: user._id, // Assuming user context contains the user ID
                };

                // Call the API to save payment data
                const apiResponse = await createPayment(paymentData);
                if (apiResponse.error) {
                    alert('Failed to save payment details: ' + apiResponse.error);
                } else {
                    setReceipt(paymentData); // Set receipt data
                    // Redirect to home after showing receipt for 5 seconds
                    setTimeout(() => {
                        setRedirect(true);
                    }, 5000);
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone || '9999999999',
            },
            notes: {
                address: 'Delivery Address',
            },
            theme: {
                color: '#F7CA01',
            },
        };

        // Create a new Razorpay instance and open the payment gateway
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        // Handle payment failure
        paymentObject.on('payment.failed', function (response) {
            console.error('Payment Failed:', response.error);
            alert('Payment failed. Please try again.');
        });
    };

    const handleDownloadReceipt = () => {
        const receiptContent = `
            Payment Receipt
            -----------------
            Landlord Name: ${receipt.landlordName}
            Address: ${receipt.address}
            Payment Method: ${receipt.paymentMethod}
            Amount Paid: ₹${receipt.amount}
            Processing Fee: ₹${receipt.processingFee}
            Payment ID: ${receipt.paymentId}
        `;
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payment_receipt.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Redirect to home if redirect is set to true
    if (redirect) {
        window.location.href = '/'; // Replace with your home page route
    }

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">Pay Rent</h2>

            {receipt ? (
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-center">Payment Successful!</h3>
                    <div className="border p-4 rounded-md mt-4 bg-gray-50">
                        <h4 className="text-lg font-bold">Payment Receipt</h4>
                        <p><strong>Landlord Name:</strong> {receipt.landlordName}</p>
                        <p><strong>Address:</strong> {receipt.address}</p>
                        <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
                        <p><strong>Amount Paid:</strong> ₹{receipt.amount}</p>
                        <p><strong>Processing Fee:</strong> ₹{receipt.processingFee.toFixed(2)}</p>
                        <p><strong>Payment ID:</strong> {receipt.paymentId}</p>
                    </div>
                    <button
                        onClick={handleDownloadReceipt}
                        className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-300"
                    >
                        Download Receipt
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Landlord Name</label>
                        <input
                            type="text"
                            value={landlordName}
                            onChange={(e) => setLandlordName(e.target.value)}
                            placeholder="Enter landlord's name"
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter landlord's address"
                            className="w-full px-3 py-2 border rounded-lg"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Payment Method</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="account"
                                    checked={paymentMethod === 'account'}
                                    onChange={() => setPaymentMethod('account')}
                                    className="mr-2"
                                />
                                Account Details
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="upi"
                                    checked={paymentMethod === 'upi'}
                                    onChange={() => setPaymentMethod('upi')}
                                    className="mr-2"
                                />
                                UPI ID
                            </label>
                        </div>
                    </div>

                    {paymentMethod === 'account' && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Bank Name</label>
                                <input
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    placeholder="Enter bank name"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Account Holder Name</label>
                                <input
                                    type="text"
                                    value={accountHolderName}
                                    onChange={(e) => setAccountHolderName(e.target.value)}
                                    placeholder="Enter account holder's name"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Account Number</label>
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder="Enter account number"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">IFSC Code</label>
                                <input
                                    type="text"
                                    value={ifscCode}
                                    onChange={(e) => setIfscCode(e.target.value)}
                                    placeholder="Enter IFSC code"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'upi' && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">UPI ID</label>
                            <input
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="Enter UPI ID"
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Processing Fee(1.75%): ₹{amount ? calculateProcessingFee(amount).toFixed(2) : 0.00}
                        </p>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-300"
                    >
                        Pay Rent
                    </button>
                </>
            )}
        </div>
    );
}

export default PayRent;
