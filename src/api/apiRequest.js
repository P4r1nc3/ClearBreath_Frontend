import axios from 'axios';
import { getTokenFromLocalStorage } from "../helpers/tokenStorage";

const apiRequest = async (url, method, data = null, requiresAuth = true) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data,
    };

    if (requiresAuth) {
        const token = getTokenFromLocalStorage();
        options.headers['Authorization'] = `Bearer ${token}`;
    }

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

export const apiRequestWithAuth = async (url, method, data = null) => {
    return await apiRequest(url, method, data, true);
};

export const apiRequestWithoutAuth = async (url, method, data = null) => {
    return await apiRequest(url, method, data, false);
};