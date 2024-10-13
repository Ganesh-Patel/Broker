import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'; // Social media icons
import logo from '../../../public/Assets/images/prohomes.png';

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8  w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container for the sections */}
        <div className="flex flex-wrap justify-center md:justify-between items-start space-y-8 md:space-y-0">
          
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left ">
            <img className="h-20 w-40" src={logo} alt="Logo" />
            <p className="text-sm leading-relaxed">
              We are a company committed <br /> to delivering the best real estate <br /> services. Contact us for more information.
            </p>
          </div>

          {/* Address and Contact */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-teal-400 font-bold mb-2">Contact Us</h4>
            <p className="text-sm leading-relaxed">
              123 Real Estate Ave,<br />
              Suite 456, New York, NY 10001<br />
              Phone: (123) 456-7890<br />
              Email: info@realestate.com
            </p>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-teal-400 font-bold mb-2">Follow Us</h4>
            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                <FiFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                <FiTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                <FiInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                <FiLinkedin size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            © 2024 Real Estate Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;