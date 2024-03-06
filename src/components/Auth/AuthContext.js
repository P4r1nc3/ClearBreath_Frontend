import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);

    const login = (token) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(!!localStorage.getItem('token'));
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
