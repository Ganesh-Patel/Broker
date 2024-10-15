import React, { useContext, useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaShoppingCart, FaStar } from 'react-icons/fa';
import { addToWishlist, getWishlist } from '../../utils/listingApis';
import defaultImg from '../../assets/property/prohomedefault.jpeg';

function WishList() {
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const bookNow = (productId) => {
    // Implement add to cart or booking functionality here
    console.log('Booking property:', productId);
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
                  className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
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
                >
                  <FaShoppingCart className="mr-2" />
                  Book Now
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
