import React, { useContext, useEffect, useState } from 'react';
import { getPayment } from '../../utils/paymentApis.js'; // Adjust the import path based on your file structure
import { Puff } from 'react-loader-spinner';
import { UserContext } from '../../context/UserContext.jsx';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[user]=useContext(UserContext);
    const[userId,setUserId]=useState(user._id);

    useEffect(() => {
        const fetchPayments = async () => {
            if (!userId) {
                setLoading(false);
                return; // If there's no userId, skip the API call
            }

            try {
                const data = await getPayment(userId);
                setPayments(data); // Assuming the API returns an array of payment objects
            } catch (err) {
                setError('Failed to fetch payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [userId]);

    const getStatus = (payment) => {
        // Adjust your logic for determining status if necessary
        return payment.paymentId ? 'Success' : 'Failed';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Puff
                    height={80}
                    width={80}
                    radius={1}
                    color="#38b2ac"
                    ariaLabel="loading"
                    visible={true}
                />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Payment History</h2>
            {userId ? (
                payments.length === 0 ? (
                    <p className="text-center">No payment history found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {payments.map((payment) => (
                            <div
                                key={payment._id}
                                className={`bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between ${
                                    getStatus(payment) === 'Success' ? 'border-green-500' :
                                    getStatus(payment) === 'Pending' ? 'border-yellow-500' :
                                    'border-red-500'
                                } border-l-4`}
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">Landlord: {payment.landlordName}</h3>
                                    <p className="text-gray-600">Address: {payment.address}</p>
                                    <p className="text-gray-600">Payment Method: {payment.paymentMethod}</p>
                                    <p className="text-xl font-bold mt-2">
                                        Amount: ₹{payment.amount.toFixed(2)} (Processing Fee: ₹{payment.processingFee.toFixed(2)})
                                    </p>
                                    <p className={`text-sm mt-1 ${getStatus(payment) === 'Success' ? 'text-green-600' : getStatus(payment) === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                                        Status: {getStatus(payment)}
                                    </p>
                                    <p className="text-gray-700 mt-2">Payment ID: {payment.paymentId}</p>
                                    <p className="text-gray-700 mt-1">User Email: {payment.userId.email}</p>
                                    <p className="text-gray-500 mt-1">Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <p className="text-center">User ID is missing. Please log in or refresh  to view your payment history.</p>
            )}
        </div>
    );
};

export default PaymentHistory;
