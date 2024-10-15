import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCard from '../Properties/ListingCard.jsx';
import Features from '../Features/Features';
import CarouselHome from '../../components/Carousel/CarouselHome.jsx';
import { fetchAllListings } from '../../utils/listingApis.js'
import ContatcForm from '../Contact/ContactForm.jsx';

const images = [
  'https://plus.unsplash.com/premium_photo-1661883982941-50af7720a6ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8M2QlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://en.idei.club/uploads/posts/2023-12/thumbs/1703070213_en-idei-club-p-pictures-of-black-houses-dizain-pinterest-19.jpg',
  'https://www.1stclass-homes.com/storage/S3Storage/properties/43327/photos/default/2.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B1zjAWDvVKzn7G48unCHCsWCEWblAWqf0uBTsLpnVJMQODoenq1HmnvTXI3PrND6e4o&usqp=CAU',
  'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://i2.au.reastatic.net/800x600/2386b68883946c09006c83909cfae27cfeb5c285441aca4f06094958321a120f/main.jpg',
];
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const navigate = useNavigate();
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const offerResponse = await fetchAllListings('offer=true&limit=4');
        setOfferListings(offerResponse.data); // Assuming the response has a 'data' property

        const rentResponse = await fetchAllListings('type=rent&limit=4');
        setRentListings(rentResponse.data);

        const saleResponse = await fetchAllListings('type=sale&limit=4');
        setSaleListings(saleResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen mt-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-teal-400 text-white h-auto lg:h-96 flex flex-col gap-6 justify-center items-center text-center p-6 lg:p-10 mt-4">
        <h1 className="text-slate-700 font-bold text-3xl sm:text-4xl lg:text-6xl leading-snug lg:leading-tight">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-700 text-sm sm:text-base lg:text-lg max-w-2xl">
          Sahand Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </p>
        <button
          className="bg-white text-teal-500 hover:bg-teal-600 hover:text-white transition-colors duration-300 px-6 py-3 rounded-lg font-medium shadow-lg mt-4"
          onClick={() => navigate('/properties')}
        >
          Get Started
        </button>
      </section>


      {/* Features Section */}
      <section className="mt-8">
        <Features />
      </section>

      {/* Available Properties Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h1 className="text-3xl text-teal-600  font-extrabold mb-8 text-center">Available Properties</h1>

        {/* Listing Results for Offers */}
        {offerListings.length > 0 && (
          <div className="my-10">
            <div className="flex flex-col  items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to="/properties?offer=true">Show more offers</Link>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {offerListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} /> // Changed to ListingCard
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listing Results for Rent */}
        {rentListings.length > 0 && (
          <div className="my-10">
            <div className="flex flex-col  items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places for Rent</h2>
              <Link className="text-sm text-blue-800 hover:underline mt-1" to="/properties?type=rent">
                Show more places for rent
              </Link>

              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {rentListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listing Results for Sale */}
        {saleListings.length > 0 && (
          <div className="my-10">
            <div className="flex flex-col  items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places for Sale</h2>
              <Link className="text-sm text-blue-800 hover:underline" to="/properties?type=sale">Show more places for sale</Link>
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {saleListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-teal-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <ContatcForm />
        </div>
      </section>
    </div>
  );
}