import axios from 'axios';
import { getTokenFromLocalStorage } from "../helpers/tokenStorage";

const BASE_URL = 'http://localhost:8080';

// Generic API service function
const apiRequest = async (url, method, data = null) => {
    const token = getTokenFromLocalStorage();
    const options = {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data,
    };
    try {
        const response = await axios(url, options);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Something went wrong');
        } else if (error.request) {
            throw new Error('Request failed');
        } else {
            throw new Error('Something went wrong');
        }
    }
};

export const fetchUserData = async () => {
    return await apiRequest(`${BASE_URL}/users`, 'GET');
};

export const changeUserPassword = async (currentPassword, newPassword) => {
    const data = { oldPassword: currentPassword, newPassword: newPassword };
    return await apiRequest(`${BASE_URL}/users/change-password`, 'PUT', data);
};

export const deleteUserProfile = async () => {
    return await apiRequest(`${BASE_URL}/users`, 'DELETE');
};