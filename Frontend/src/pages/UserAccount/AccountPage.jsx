import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../../utils/userApis.js'; // Assume these API functions are available
import { fetchUserListings, deleteListing } from '../../utils/listingApis.js';
import { UserContext } from '../../context/UserContext.jsx';
import defaultImg from '../../assets/property/prop6.jpeg';
import { Puff } from 'react-loader-spinner';
import EditListingModal from '../EditListingModal/EditListingModal.jsx';

function AccountPage() {
    const { user, setUser, isLoggedIn } = useContext(UserContext);
    const [profilePic, setProfilePic] = useState(user.profilePic || 'https://via.placeholder.com/150');
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEditing, setIsEditing] = useState({ firstname: false, lastname: false, email: false, password: false });
    const [isUpdated, setIsUpdated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null); // For editing
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Fetch user listings on component mount
    useEffect(() => {
        const fetchListings = async () => {
            try {
                if (user?._id && isLoggedIn) {
                    const response = await fetchUserListings(user._id);
                    setListings(response.data || []); // Adjust based on the response structure
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [user?._id, isLoggedIn]);

    const handleUpdateProfile = async () => {
        try {
            // Validate password
            if (newPassword && newPassword !== confirmPassword) {
                setErrorMessage('Passwords do not match.');
                return;
            }

            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('email', email);
            if (newPassword) {
                formData.append('password', newPassword);
            }

            const response = await updateUser(formData);
            if (response.status === 200) {
                alert('Profile updated successfully!');
                setErrorMessage('');
                setIsUpdated(false);
                setIsEditing({ firstname: false, lastname: false, email: false, password: false });
            } else {
                setErrorMessage('Failed to update profile.');
            }
        } catch (error) {
            setErrorMessage('Error updating profile.');
            console.error(error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser();
            setUser(null); // Clear user context
            alert('Account deleted successfully.');
            navigate('/'); // Redirect to home
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account.');
        }
    };

    const handleFieldChange = (field, setter) => (e) => {
        setter(e.target.value);
        setIsUpdated(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEditField = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // CRUD Operations for Listings
    const handleDeleteListing = async (listingId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await deleteListing(listingId);
                setListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
                alert('Listing deleted successfully.');
            } catch (error) {
                console.error('Error deleting listing:', error);
                alert('Failed to delete listing.');
            }
        }
    };

    const handleEditListing = (listing) => {
        setSelectedListing(listing);
        setIsModalOpen(true);
    };

    const handleSaveListing = async () => {
        // Here you would implement the API call to save the edited listing
        // After saving, reset the selected listing to null
        setSelectedListing(null);
        alert('Listing saved successfully!'); // Replace with actual success message
    };


    // Render
    if (loading) {
        return (
            <div className="loader-container mt-18 flex flex-col items-center justify-center">
                <Puff height="100" width="100" color="#4fa94d" ariaLabel="loading" />
                <p>Loading your account...</p>
            </div>
        );
    }
    return (
        <div className="flex mt-12 flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* User Profile Section */}
            <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Account Details</h2>

                <div className="flex flex-col items-center mb-6 relative group">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-teal-500"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <p className="text-center text-sm text-teal-500">Change Profile Picture</p>
                </div>

                <div className="space-y-4">
                    {/* Input Fields for User Information */}
                    {["firstname", "lastname", "email"].map((field, index) => (
                        <div key={index} className="flex items-center mb-4">
                            <div className="flex-grow">
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                                <div className="relative">
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        id={field}
                                        value={eval(field)} // using eval for simplicity, can be replaced with proper state management
                                        onChange={handleFieldChange(field, eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`))}
                                        disabled={!isEditing[field]}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                    <button
                                        onClick={() => toggleEditField(field)}
                                        className="absolute inset-y-0 right-0 flex items-center px-4 bg-teal-500 text-white rounded-r-md"
                                    >
                                        {isEditing[field] ? 'Save' : 'Edit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center mb-4">
                        <div className="flex-grow">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    value={newPassword}
                                    onChange={handleFieldChange('password', setNewPassword)}
                                    disabled={!isEditing.password}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                                <button
                                    onClick={() => toggleEditField('password')}
                                    className="absolute inset-y-0 right-0 flex items-center px-4 bg-teal-500 text-white rounded-r-md"
                                >
                                    {isEditing.password ? 'Save' : 'Edit'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {isEditing.password && (
                        <div className="flex items-center mb-4">
                            <div className="flex-grow">
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4 mt-6">
                    <button
                        onClick={handleUpdateProfile}
                        disabled={!isUpdated}
                        className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isUpdated ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Update Profile
                    </button>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    <button
                        onClick={handleDeleteAccount}
                        className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Listings Section */}
            <div className="w-full max-w-3xl mt-8 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-teal-600">My Listings</h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading listings...</p>
                ) : listings.length > 0 ? (
                    <div className="space-y-6">
                        {listings.map((listing) => (
                            <div key={listing._id} className="border rounded-lg shadow-md p-4 flex flex-col lg:flex-row items-center lg:items-start">
                                <Link to={`/listing/${listing._id}`}>
                                    <img
                                        src={listing.imageUrls.length > 0 ? listing.imageUrls[0] : defaultImg}
                                        alt="listing cover"
                                        className='h-[320px] sm:h-[220px] w-72 max-w-72 object-cover hover:scale-105 transition-transform duration-300'

                                    />
                                </Link>
                                <div className="flex-1 lg:ml-4 text-center lg:text-left">
                                    <h3 className="text-lg font-semibold text-teal-600">{listing.name}</h3>
                                    <p className="text-gray-700">{listing.description}</p>
                                    <p><strong>Type:</strong> {listing.type}</p>
                                    <p><strong>Price:</strong> ${listing.discountPrice || listing.regularPrice}</p>
                                    <div className="flex mt-2">
                                        <button onClick={() => handleEditListing(listing)} className="mr-2 text-teal-500 hover:underline">Edit</button>
                                        <button onClick={() => handleDeleteListing(listing._id)} className="text-red-500 hover:underline">Delete</button>
                                        {/* <button onClick={() => handleMarkAsSold(listing._id)} className="ml-2 text-yellow-500 hover:underline">Mark as Sold</button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No listings found.</p>
                )}

            </div>

            <EditListingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                listingData={selectedListing}
            />


        </div>
    );

}

export default AccountPage;
