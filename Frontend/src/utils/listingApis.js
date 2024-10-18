import axios from "axios";

//const API_URL = 'http://localhost:3002/api/';//https://broker-6dgs.onrender.com/api/
const API_URL='https://broker-6dgs.onrender.com/api/';

export const createListing = async (listing) => {
    try {
        const response = await axios.post(`${API_URL}listing/create`,listing,{
            withCredentials: true,
        });
        return response;
    } catch (error) {
     return error.message;
    }
}
export const updatListing = async (listing,listingId) => {
    try {
        const response = await axios.post(`${API_URL}listing/update/${listingId}`,listing,{
            withCredentials: true,
        });
        return response;
    } catch (error) {
     return error.message;
    }
}
export const deleteListing=async (id)=>{
    try {
        const response = await axios.delete(`${API_URL}listing/delete/${id}`,{      
            withCredentials: true,
            });
            return response;
            } catch (error) {
                return error.message;
                }
}
export const fetchListing = async (id) => {
    try {
        const response = await axios.get(`${API_URL}listing/get/${id}`,{withCredentials: true});
        return response;
    } catch (error) {
     return error.message;
    }
}
export const fetchUserListings = async (userId) => {
    console.log(userId)
    try {
        const response = await axios.get(`${API_URL}listing/get-user-listing/${userId}`,{withCredentials: true});
        console.log(response)
        return response;
    } catch (error) {
     return error.message;
    }
}
export const fetchAllListings = async (searchQuery) => {
    try {
        const response = await axios.get(`${API_URL}listing/get?${searchQuery}`,{withCredentials: true});
        return response;
    } catch (error) {
     return error.message;
    }
}
export const addToWishlist = async (propId) => {
    console.log(propId)
    try {
        const response = await axios.post(`${API_URL}listing/addtowishlist`,{propId},{
            withCredentials: true,
        });
        return response;
    } catch (error) {
     return error.message;
    }
}
export const getWishlist = async (userId) => {
    console.log(userId)
    try {
        const response = await axios.get(`${API_URL}listing/getwishlist/${userId}`,{withCredentials: true});
        return response;
    } catch (error) {
     return error.message;
    }
}