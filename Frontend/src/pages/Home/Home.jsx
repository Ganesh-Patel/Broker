import React, {}    from 'react';
import Features from '../Features/Features';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate=useNavigate();

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col mt-8">
      {/* Hero Section */}
      <section className="bg-teal-500 text-white h-64 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Real Estate Platform</h1>
        <p className="text-lg mb-6">Find your dream property with ease.</p>
        <button className="bg-white text-teal-500 px-6 py-2 rounded-lg font-medium" onClick={() => navigate('/properties') }>
          Get Started
        </button>
      </section>

      <section className="">
      <Features />
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-center">Available Properties</h1>
        <div className="flex-1">
        <div className="flex flex-wrap gap-2">
        
        </div>
      </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-teal-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6">Subscribe to our newsletter for the latest updates and offers.</p>
          <form className="flex justify-center">
            <input type="email" placeholder="Your email address" className="p-2 rounded-l-lg w-64 border-none focus:outline-none text-black" />
            <button type="submit" className="bg-white text-teal-500 px-4 py-2 rounded-r-lg font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;