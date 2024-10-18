import React, { useContext, useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaShoppingCart, FaStar } from 'react-icons/fa';
import { addToWishlist, getWishlist } from '../../utils/listingApis';
import defaultImg from '../../assets/property/prohomedefault.jpeg';
import { createBooking } from '../../utils/bookingApi';

function WishList() {
  const { user, setUser, isLoggedIn,checkLoginStatus  } = useContext(UserContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();
    // useEffect(() => {
    //   checkLoginStatus ();
    // },[])

  useEffect(() => {

    const fetchWishlistProducts = async () => {
   
      if (isLoggedIn && user) {
        try {
          const response = await getWishlist(user._id);
          console.log('Wishlist Response:', response);
          setWishlistProducts(response.data.property || []);
        } catch (error) {
          console.error('Error fetching wishlist products:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [user, isLoggedIn]);

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await addToWishlist(productId);
      setUser(data.updatedUser);
      setWishlistProducts(wishlistProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const bookNow = async (productId) => {
    if (!user) return;
    try {
      setBookingLoading(true);

      const landlordEmail ='demon158158158@gmail.com'; // Replace with the correct property for landlord's email
  
      if (!landlordEmail) {
        console.error('Landlord email is not available.');
        return;
      }
      const bookingData = {
        userRef: user._id,
        listingRef: productId,
        leaseStartDate: new Date().toISOString().split('T')[0], // Adjust as needed
        leaseEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Adjust as needed
        totalAmount: 1000, // Replace with dynamic amount or calculate based on listing
        tenantDetails: { name: user.name, phone: user.phone },
        landlordEmail
      };

      const response = await createBooking(bookingData);
      console.log('Booking created successfully:', response);
      removeFromWishlist(productId);
      // Navigate to booking confirmation or details page if needed
      navigate(`/bookings`);
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setBookingLoading(false);
    }
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

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl text-cyan-800 mb-4">Please log in to access your wishlist.</p>
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
      <h1 className="text-4xl font-bold mb-6 text-center">My Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <p className="text-2xl text-cyan-800 text-center">Your wishlist is empty!</p>
      ) : (
        <div className="space-y-6">
          {wishlistProducts.map(product => (
            <div key={product._id} className="border rounded-lg shadow-md p-4 flex flex-col lg:flex-row items-center lg:items-start">
              <Link to={`/listing/${product._id}`}>
                <img
                  src={product.imageUrls.length > 0 ? product.imageUrls[0] : defaultImg}
                  alt="listing cover"
                  className='h-[320px] sm:h-[220px] w-72 max-w-72 object-cover hover:scale-105 transition-transform duration-300'
                />
              </Link>
              <div className="flex-1 lg:ml-4 text-center lg:text-left">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 my-2">{product.description}</p>
                <p className="text-gray-800 font-bold text-lg">${product.discountPrice}</p>
                <div className="flex items-center justify-center lg:justify-start my-2">
                  <FaStar className="text-yellow-500" />
                  <span className="ml-1 text-gray-600">{product.rating || 0} / 5</span>
                </div>
                <p className={`text-sm ${product.furnished ? 'text-green-600' : 'text-red-600'}`}>
                  {product.furnished ? 'Furnished' : 'Not Furnished'}
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:ml-4 mt-4 lg:mt-0">
                <button
                  onClick={() => bookNow(product._id)}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center justify-center"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Booking...' : (
                    <>
                      <FaShoppingCart className="mr-2" />
                      Book Now
                    </>
                  )}
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <FaTrashAlt className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
