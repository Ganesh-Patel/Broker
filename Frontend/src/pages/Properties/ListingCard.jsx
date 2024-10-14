import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToWishlist } from '../../utils/listingApis';

export default function ListingCard({ listing }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Toggle wishlist status
  const handleWishlistToggle = async () => {
    try {
      await addToWishlist(listing._id); 
      setIsWishlisted((prev) => !prev);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      // Optionally, display an error message to the user here
    }
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] relative'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2 w-full'>
        <Link to={`/listing/${listing._id}`}>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </Link>
      </div>
      <div
        className='absolute top-3 right-3 cursor-pointer text-red-500'
        onClick={handleWishlistToggle}
      >
        {isWishlisted ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
      </div>
    </div>
  );
}
