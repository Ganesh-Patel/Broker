import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiList, FiSearch, FiLogOut, FiMapPin, FiFileText, FiInfo } from 'react-icons/fi';
import { FaClipboardList, FaHeart, FaMoneyBillWave, FaTimes } from 'react-icons/fa';
import logo from '../../assets/images/prohome.png';
import { UserContext } from '../../context/UserContext';
import { logoutUser } from '../../utils/userApis';
import { toast } from 'react-toastify';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const { user, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const toggleProfileMenu = () => {
        setShowProfileMenu((prev) => !prev);
    };

    const handleLogout = async () => {
        const response = await logoutUser(setIsLoggedIn);
        if (response.data) {
            setShowProfileMenu(false);
            setIsOpen(false);
            toast("Logged out Successfully");
        } else {
            console.log(response.data);
        }
    };

    const linkClasses = (path) =>
        location.pathname === path
            ? 'text-teal-400'
            : 'text-gray-300 hover:text-teal-400';

    // Close menus if user logs out
    useEffect(() => {
        if (!isLoggedIn) {
            setShowProfileMenu(false);
            setIsOpen(false);
        }
    }, [isLoggedIn]);

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
                        {location.pathname === '/propertiesss' && (
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
                        <Link to="/" className={`${linkClasses("/")} text-sm font-medium flex items-center`}>
                            <FiHome className="mr-2" /> Home
                        </Link>
                        <Link to="/properties" className={`${linkClasses("/properties")} text-sm font-medium flex items-center`}>
                            <FiMapPin className="mr-2" /> Properties
                        </Link>
                        <Link to="/wishlist" className={`${linkClasses("/wishlist")} text-sm font-medium flex items-center`}>
                            <FaHeart className="inline mr-2 text-red-100 hover:text-teal-400" /> WishList
                        </Link>
                        <Link to="/about" className={`${linkClasses("/about")} text-sm font-medium flex items-center`}>
                            <FiUser className="inline mr-2" /> About Us
                        </Link>
                        <div className="relative">
                            {isLoggedIn ? (
                                <div>
                                    <button onClick={toggleProfileMenu} className="flex items-center text-gray-300 hover:text-teal-400 focus:outline-none">
                                        <img
                                            src={user.profilePic || '/default-profile.png'}
                                            alt="User profile"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="ml-2">{user.name}</span>
                                    </button>
                                    {showProfileMenu && (
                                        <div onClick={toggleProfileMenu} className="absolute right-0 mt-4 w-48 bg-black border rounded shadow-lg">
                                            <button className="text-right text-gray-100 focus:outline-none p-2">
                                                <FaTimes className="text-xl" />
                                            </button>
                                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FiHome className="inline mr-2" /> Home
                                            </Link>
                                            <Link to="/properties" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FiMapPin className="inline mr-2" /> Properties
                                            </Link>
                                            <Link to="/create-listing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FiList className="inline mr-2" /> Create Listing
                                            </Link>
                                            <Link to="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FaHeart className="inline mr-2 text-red-100" /> WishList
                                            </Link>
                                            <Link to="/mybookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FaClipboardList className="inline mr-2 text-red-100" />My Bookings
                                            </Link>
                                            <Link to="/payrent" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FaMoneyBillWave className="inline mr-2" /> Pay Rent
                                            </Link>
                                            <Link to="/payment-history" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FiFileText className="inline mr-2" /> Payment History
                                            </Link>
                                            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FiInfo className="inline mr-2" /> About Us
                                            </Link>
                                            <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                                <FiUser className="inline mr-2" /> Account
                                            </Link>
                                            {isLoggedIn ? (
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left block px-4 py-2 text-gray-100 hover:text-teal-400"
                                                >
                                                    <FiLogOut className="inline mr-2" /> Logout
                                                </button>
                                            ) : (
                                                <Link
                                                    to="/login"
                                                    className="w-full text-left block px-4 py-2 text-gray-100 hover:text-teal-400"
                                                >
                                                    <FiUser className="inline mr-2" /> Login
                                                </Link>
                                            )}

                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="flex items-center text-gray-300 hover:text-teal-400 focus:outline-none">
                                    <FiUser className="mr-2" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
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
                <div onClick={() => setIsOpen(!isOpen)} className="md:hidden bg-black" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiHome className="inline mr-2" /> Home
                        </Link>
                        <Link to="/properties" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiMapPin className="inline mr-2" /> Properties
                        </Link>
                        <Link to="/create-listing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiList className="inline mr-2" /> Create Listing
                        </Link>
                        <Link to="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FaHeart className="inline mr-2 text-red-100" /> WishList
                        </Link>
                        <Link to="/mybookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FaClipboardList className="inline mr-2 text-red-100" />My Bookings
                        </Link>
                        <Link to="/payrent" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FaMoneyBillWave className="inline mr-2" /> Pay Rent
                        </Link>
                        <Link to="/payment-history" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiFileText className="inline mr-2" /> Payment History
                        </Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiInfo className="inline mr-2" /> About Us
                        </Link>
                        <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                            <FiUser className="inline mr-2" /> Account
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="w-full text-left block px-4 py-2 text-gray-100 hover:text-teal-400"
                            >
                                <FiLogOut className="inline mr-2" /> Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="w-full text-left block px-4 py-2 text-gray-100 hover:text-teal-400"
                            >
                                <FiUser className="inline mr-2" /> Login
                            </Link>
                        )}

                    </div>
                </div>
            )}
        </nav>
    );
}

export default Nav;
