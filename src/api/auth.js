import { BASE_URL } from '../constants/urlConstants';
import { apiRequestWithoutAuth } from "./apiRequest";

export const signUp = async (firstName, lastName, email, password) => {
    const url = `${BASE_URL}/auth/signup`;
    const data = { firstName, lastName, email, password };
    return await apiRequestWithoutAuth(url, 'POST', data);
};

export const signIn = async (email, password) => {
    const url = `${BASE_URL}/auth/signin`;
    const data = { email, password };
    return await apiRequestWithoutAuth(url, 'POST', data);
};
