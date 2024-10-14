import React from 'react';
import Features from '../Features/Features';
import { useNavigate } from 'react-router-dom';
import CarouselHome from '../../components/Carousel/CarouselHome.jsx';

const images = [
  'https://plus.unsplash.com/premium_photo-1661883982941-50af7720a6ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8M2QlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://en.idei.club/uploads/posts/2023-12/thumbs/1703070213_en-idei-club-p-pictures-of-black-houses-dizain-pinterest-19.jpg',
  'https://www.1stclass-homes.com/storage/S3Storage/properties/43327/photos/default/2.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B1zjAWDvVKzn7G48unCHCsWCEWblAWqf0uBTsLpnVJMQODoenq1HmnvTXI3PrND6e4o&usqp=CAU',
  'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://i2.au.reastatic.net/800x600/2386b68883946c09006c83909cfae27cfeb5c285441aca4f06094958321a120f/main.jpg',
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Carousel Section */}
      {/* <div className="w-full h-[50vh] overflow-hidden">
        <CarouselHome images={images} className="w-full h-full" />
    </div> */}


      {/* Hero Section */}
      <section className="bg-teal-500 text-white h-64 flex flex-col justify-center items-center text-center mt-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Real Estate Platform</h1>
        <p className="text-lg mb-6">Find your dream property with ease.</p>
        <button
          className="bg-white text-teal-500 px-6 py-2 rounded-lg font-medium"
          onClick={() => navigate('/properties')}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="mt-8">
        <Features />
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-center">Available Properties</h1>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            {/* Add your property items here */}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-teal-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6">Subscribe to our newsletter for the latest updates and offers.</p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded-l-lg w-64 border-none focus:outline-none text-black"
            />
            <button
              type="submit"
              className="bg-white text-teal-500 px-4 py-2 rounded-r-lg font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
