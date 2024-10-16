import React from 'react';
import { useNavigate } from 'react-router-dom';

function Feature({ title, icon, offer }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (title === "Pay rent") {
            navigate('/payrent'); // Replace with your route for the pay rent page.
        }
    };

    return (
        <div 
            className="flex flex-col items-center text-center space-y-4 hover:text-teal-500 transition duration-300 ease-in-out cursor-pointer"
            onClick={handleClick}
        >
            {/* Offer Badge */}
            {offer && (
                <div className="text-teal-500 text-xs font-semibold uppercase mb-2">
                    {offer}
                </div>
            )}

            {/* Icon and Title */}
            <div className="flex flex-col items-center">
                <div className="text-teal-500 text-4xl mb-2">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
        </div>
    );
}

export default Feature;
