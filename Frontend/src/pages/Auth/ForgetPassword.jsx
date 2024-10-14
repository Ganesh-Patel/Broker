import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [accountFound, setAccountFound] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [otpTimer, setOtpTimer] = useState(60);
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20190826/pngtree-abstract-metallic-blue-black-frame-layout-modern-tech-design-template-image_305020.jpg)' }}>
            <div className="w-full max-w-md p-8 bg-transparent bg-opacity-80  backdrop-filter backdrop-blur-lg shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Forgot Password</h2>

                {!accountFound && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-teal-200">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="text-white placeholder-gray-400 mt-1 block w-full px-4 py-2 border bg-transparent border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                        <button
                          
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Fetch Account
                        </button>
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    </div>
                )}

                {accountFound && !otpSent && (
                    <div className="space-y-4">
                        <p className="text-center text-gray-700">Account found for {email}. Send OTP to proceed.</p>
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {otpSent && !isOtpValid && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Enter the OTP"
                            />
                        </div>
                        <button
                            onClick={handleValidateOtp}
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Validate OTP
                        </button>
                        <p className="text-center text-red-500">Time left: {otpTimer}s</p>
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    </div>
                )}

                {otpSent && !isOtpValid && otpTimer === 0 && (
                    <div className="mt-4 text-center">
                        {otpTimer === 0 && (
                            <button
                                onClick={handleResendOtp}
                                className="mt-2 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>
                )}

                {isOtpValid && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Save New Password
                        </button>
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    </div>
                )}
                
                <footer className="mt-6 text-center text-gray-200">
                    <p>&copy; {new Date().getFullYear()} ProHomes. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default ForgetPassword;
