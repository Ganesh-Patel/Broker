import React, { useContext, useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getUserBookings } from '../../utils/bookingApi';
import defaultImg from '../../assets/property/prohomedefault.jpeg';

function MyBookings() {
  const { user, isLoggedIn } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (isLoggedIn && user) {
        try {
          const response = await getUserBookings(user._id);
          console.log('User Bookings:', response);
          setBookings(response.data || []); // Adjusted for the response structure
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, isLoggedIn]);

  console.log('your bookings is ',bookings)
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

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl text-cyan-800 mb-4">Please log in to access your bookings.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="mt-16 container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-2xl text-cyan-800 text-center">You have no bookings!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(booking => (
            <div key={booking._id} className="border rounded-lg shadow-md p-4 flex flex-col">
              <img
                src={booking.listingRef.imageUrls.length > 0 ? booking.listingRef.imageUrls[0] : defaultImg}
                alt="property"
                className="h-[200px] w-full object-cover rounded"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{booking.listingRef.name}</h2>
                <p className="text-gray-600 my-2">{booking.listingRef.description}</p>
                <p className="text-gray-800 font-bold text-lg">${booking.totalAmount}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Booking Period: {new Date(booking.leaseStartDate).toLocaleDateString()} - {new Date(booking.leaseEndDate).toLocaleDateString()}
                </p>
                <p className={`text-sm mt-2 ${booking.status === 'confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Created At: {new Date(booking.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => navigate(`/booking/${booking._id}`)}
                  className="bg-teal-500 text-white px-4 py-2 rounded mt-4 hover:bg-teal-600 w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
