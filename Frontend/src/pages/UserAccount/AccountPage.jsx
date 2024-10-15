import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../../utils/userApis.js'; // Assume these API functions are available
import { UserContext } from '../../context/UserContext.jsx';

function AccountPage() {
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic || 'https://via.placeholder.com/150',
    });
    const [newFirstname, setNewFirstname] = useState(user.firstname);
    const [newLastname, setNewLastname] = useState(user.lastname);
    const [newEmail, setNewEmail] = useState(user.email);
    const [profilePic, setProfilePic] = useState(profile.profilePic);
    const [profilefordb, setProfilefordb] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('firstname', newFirstname);
            formData.append('lastname', newLastname);
            formData.append('email', newEmail);
            if (profilefordb) {
                formData.append('profilePic', profilefordb);
            }

            const response = await updateUser(formData);
            if (response.status === 200) {
                alert('Profile updated successfully!');
                setProfile({
                    ...profile,
                    firstname: newFirstname,
                    lastname: newLastname,
                    email: newEmail,
                    profilePic: response.data.profilePic,
                });
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to update profile.');
            }
        } catch (error) {
            setErrorMessage('Error updating profile.');
            console.error(error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            try {
                const response = await deleteUser();
                if (response.status === 200) {
                    alert('Account deleted successfully!');
                    navigate('/login');
                } else {
                    setErrorMessage('Failed to delete account.');
                }
            } catch (error) {
                setErrorMessage('Error deleting account.');
                console.error(error);
            }
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilefordb(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Account Details</h2>
                
                <div className="flex flex-col items-center mb-6 relative group">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mb-4 group-hover:opacity-50"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <p className="text-center text-sm text-teal-500 hidden group-hover:block">Change Profile Picture</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            value={newFirstname}
                            onChange={(e) => setNewFirstname(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            value={newLastname}
                            onChange={(e) => setNewLastname(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-4 mt-6">
                    <button
                        onClick={handleUpdateProfile}
                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        Update Profile
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Delete Account
                    </button>
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
