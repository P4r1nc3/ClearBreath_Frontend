import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeTokenInLocalStorage, getTokenFromLocalStorage, removeTokenFromLocalStorage } from '../../helpers/tokenStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(getTokenFromLocalStorage() ? true : false);

    const login = (token) => {
        storeTokenInLocalStorage(token);
        setLoggedIn(true);
    };

    const logout = () => {
        removeTokenFromLocalStorage();
        setLoggedIn(false);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(!!getTokenFromLocalStorage());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
