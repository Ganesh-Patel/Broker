import axios from "axios";

const API_URL = 'http://localhost:3002/api/payment/'; // Update to production URL when ready
//const API_URL='https://broker-6dgs.onrender.com/api/payment/';
export const createPayment = async (data) => {
    try {
        const response = await axios.post(`${API_URL}create-payment`, data, {
            withCredentials: true,
        });
        return response.data; 
    } catch (error) {
        return {
            error: error.response ? error.response.data : error.message // Provide more context on errors
        };
    }
}

export const getPayment = async (id) => {
    try {
        const response = await axios.get(`${API_URL}get-payment-history/${id}`, { withCredentials: true });
        return response.data; // Return only the data part of the response
    } catch (error) {
        return {
            error: error.response ? error.response.data : error.message // Provide more context on errors
        };
    }
}
