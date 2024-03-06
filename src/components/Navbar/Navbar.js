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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"><span>Clear</span>Breath</Link>
            <button className="navbar-toggler" type="button"
                    onClick={toggleNav}
                    aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? 'show' : ''}`} id="navbarNav">
                <ul className="navbar-nav">
                    {loggedIn ? (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/markers">Markers</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/map">Map</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/user">Account</Link></li>
                            <li className="nav-item"><a className="nav-link" href="/" onClick={handleLogout}>Logout</a></li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/signin">SignIn</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/signup">SignUp</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
