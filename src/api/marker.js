import { BASE_URL } from '../constants/urlConstants';
import { apiRequestWithAuth } from "./apiRequest";

export const saveMarker = async (lat, lng) => {
    const url = `${BASE_URL}/markers/lat/${lat}/lng/${lng}`;
    return await apiRequestWithAuth(url, 'POST');
};

export const getMarkers = async () => {
    const url = `${BASE_URL}/markers`;
    return await apiRequestWithAuth(url, 'GET');
};

export const deleteMarker = async (lat, lng) => {
    const url = `${BASE_URL}/markers/lat/${lat}/lng/${lng}`;
    await apiRequestWithAuth(url, 'DELETE');
};
