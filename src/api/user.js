import { BASE_URL } from '../constants/urlConstants';
import { apiRequestWithAuth } from "./apiRequest";

export const fetchUserData = async () => {
    return await apiRequestWithAuth(`${BASE_URL}/users`, 'GET');
};

export const changeUserPassword = async (currentPassword, newPassword) => {
    const data = { oldPassword: currentPassword, newPassword: newPassword };
    return await apiRequestWithAuth(`${BASE_URL}/users/change-password`, 'PUT', data);
};

export const deleteUserProfile = async () => {
    return await apiRequestWithAuth(`${BASE_URL}/users`, 'DELETE');
};
