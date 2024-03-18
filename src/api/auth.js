import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Generic API service function
const apiRequest = async (url, method, data = null) => {
    const options = {
        method: method,
        headers: {
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

export const signUp = async (firstName, lastName, email, password) => {
    const url = `${BASE_URL}/auth/signup`;
    const data = { firstName, lastName, email, password };
    return await apiRequest(url, 'POST', data);
};

export const signIn = async (email, password) => {
    const url = `${BASE_URL}/auth/signin`;
    const data = { email, password };
    return await apiRequest(url, 'POST', data);
};

