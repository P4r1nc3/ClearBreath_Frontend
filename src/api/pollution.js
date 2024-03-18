import { BASE_URL } from '../constants/urlConstants';
import { apiRequestWithAuth } from "./apiRequest";

export const fetchPollutionData = async (lat, lng) => {
    const url = `${BASE_URL}/pollution/lat/${lat}/lng/${lng}`;
    return await apiRequestWithAuth(url, 'GET');
};