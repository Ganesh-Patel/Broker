import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { UserContext } from '../../context/UserContext';
import defaultImg from '../../assets/property/prohomedefault.jpeg';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import ContactModal from '../../pages/Contact/ContactModal.jsx';
import { fetchListing as fetchList } from '../../utils/listingApis.js';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetchList(params.listingId);
        const data = res.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.length > 0 ? (
              listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className='h-[550px]'
                    style={{
                      background: `url(${url}) center no-repeat `,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide key="default">
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${defaultImg}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            )}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <p className='bg-slate-100 w-full p-2 text-center rounded-md border'>
                {listing.bedrooms} <FaBed className='inline' /> Bedrooms
              </p>
              <p className='bg-slate-100 w-full p-2 text-center rounded-md border'>
                {listing.bathrooms} <FaBath className='inline' /> Bathrooms
              </p>
              <p className='bg-slate-100 w-full p-2 text-center rounded-md border'>
                {listing.parking ? (
                  <>
                    {listing.parking} <FaParking className='inline' /> Parking
                  </>
                ) : (
                  'No Parking'
                )}
              </p>
              <p className='bg-slate-100 w-full p-2 text-center rounded-md border'>
                {listing.furnished ? (
                  <>
                    <FaChair className='inline' /> Furnished
                  </>
                ) : (
                  'Not Furnished'
                )}
              </p>
            </div>
            <div>
              <h2 className='font-semibold text-lg'>Description</h2>
              <p className='text-gray-700'>{listing.description}</p>
            </div>
            <div className='flex justify-end'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => setShowModal(true)}
              >
                Contact Landlord
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <ContactModal listing={listing} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
