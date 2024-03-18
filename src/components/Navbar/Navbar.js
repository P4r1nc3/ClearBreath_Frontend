import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
    const { loggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="mx-auto px-4 py-3 max-w-screen-xl sm:px-6 lg:px-8" style={{ maxWidth: '90%' }}>
                <div className="flex justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-lg font-bold text-gray-800"><span className="text-blue-400">Clear</span>Breath</Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {loggedIn ? (
                                <>
                                    <Link to="/markers" className="text-gray-800 hover:text-gray-900">Markers</Link>
                                    <Link to="/map" className="text-gray-800 hover:text-gray-900">Map</Link>
                                    <Link to="/user" className="text-gray-800 hover:text-gray-900">Account</Link>
                                    <a href="/" className="text-gray-800 hover:text-gray-90a0" onClick={handleLogout}>Logout</a>
                                </>
                            ) : (
                                <>
                                    <Link to="/signin" className="text-gray-800 hover:text-gray-900">SignIn</Link>
                                    <Link to="/signup" className="text-gray-800 hover:text-gray-900">SignUp</Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleNav} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                            <svg className={`${isNavOpen ? 'hidden' : 'block'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            <svg className={`${isNavOpen ? 'block' : 'hidden'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${isNavOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 sm:px-3">
                    {!loggedIn && (
                        <>
                            <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">SignIn</Link>
                            <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">SignUp</Link>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <Link to="/markers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Markers</Link>
                            <Link to="/map" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Map</Link>
                            <Link to="/user" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Account</Link>
                            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" onClick={handleLogout}>Logout</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
