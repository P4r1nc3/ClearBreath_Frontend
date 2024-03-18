import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const request = async (url, options) => {
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

export const getMarkers = async (token) => {
    const url = `${BASE_URL}/markers`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    return await request(url, options);
};

export const deleteMarker = async (token, lat, lng) => {
    const url = `${BASE_URL}/markers/lat/${lat}/lng/${lng}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    await request(url, options);
};
