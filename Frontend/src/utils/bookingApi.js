import axios from 'axios';

const API_URL = 'http://localhost:3002/api';//https://broker-6dgs.onrender.com/api/
//const API_URL='https://broker-6dgs.onrender.com/api';

// Create a new booking
export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, bookingData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error.response?.data || error.message);
        throw error;
    }
};
export const getUserBookings=async(userId)=>{
    try {
        const response = await axios.get(`${API_URL}/bookings/getallbookings/${userId}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('Error fetching booking details:', error.response?.data || error.message);
        throw error;
    }
}

// Get details of a specific booking
export const getBookingDetails = async (bookingId) => {
    try {
        const response = await axios.get(`${API_URL}/bookings/${bookingId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching booking details:', error.response?.data || error.message);
        throw error;
    }
};

// Update details of a specific booking
export const updateBooking = async (bookingId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/bookings/${bookingId}`, updatedData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating booking:', error.response?.data || error.message);
        throw error;
    }
};

// Cancel a specific booking
export const cancelBooking = async (bookingId) => {
    try {
        const response = await axios.patch(`${API_URL}/bookings/${bookingId}/cancel`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error cancelling booking:', error.response?.data || error.message);
        throw error;
    }
};

// Accept a specific booking (landlord)
export const acceptBooking = async (bookingId) => {
    try {
        const response = await axios.patch(`${API_URL}/bookings/${bookingId}/accept`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error accepting booking:', error.response?.data || error.message);
        throw error;
    }
};

// Reject a specific booking (landlord)
export const rejectBooking = async (bookingId) => {
    try {
        const response = await axios.patch(`${API_URL}/bookings/${bookingId}/reject`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error rejecting booking:', error.response?.data || error.message);
        throw error;
    }
};
