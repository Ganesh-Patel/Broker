import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingCart, FiUser, FiList, FiSearch } from 'react-icons/fi';
import logo from '../../assets/images/prohome.png';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Helper function to set the active link style
    const linkClasses = (path) => (
        location.pathname === path 
            ? 'text-teal-400' 
            : 'text-gray-300 hover:text-teal-400'
    );

    return (
        <nav className="bg-black shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <img className="h-32 w-48" src={logo} alt="ProHomes Logo" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {/* Search Box */}
                        {location.pathname === '/properties' && (
                            <div className="relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="bg-gray-700 text-gray-100 rounded-full pl-10 pr-3 py-2 focus:outline-none focus:shadow-outline w-64 h-8"
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FiSearch className="h-5 w-5 text-white" />
                                </span>
                            </div>
                        )}
                        <Link to="/" className={`${linkClasses("/")} text-sm font-medium`}>
                            <FiHome className="mr-2" /> Home
                        </Link>
                        <Link to="/properties" className={`${linkClasses("/properties")} text-sm font-medium`}>
                            <FiList className="mr-2" /> Properties
                        </Link>
                        <Link to="/cart" className={`${linkClasses("/cart")} text-sm font-medium`}>
                            <FiShoppingCart className="mr-2" /> Cart
                        </Link>
                        <Link to="/account" className={`${linkClasses("/account")} text-sm font-medium`}>
                            <FiUser className="mr-2" /> Account
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-800 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiHome className="inline mr-2" /> Home
                        </Link>
                        <Link to="/properties" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiList className="inline mr-2" /> Properties
                        </Link>
                        <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiShoppingCart className="inline mr-2" /> Cart
                        </Link>
                        <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiUser className="inline mr-2" /> Account
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Nav;
