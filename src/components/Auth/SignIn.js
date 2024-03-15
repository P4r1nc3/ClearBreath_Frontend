import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                login(token);
                navigate('/');
            } else {
                alert('Sign In failed. Please check your information and try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                                </div>
                                <div className="form-group mb-4 position-relative">
                                    <label htmlFor="password">Password</label>
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                                    <i onClick={togglePasswordVisibility} className="password-icon position-absolute" style={{ color: 'grey', top: '50%', right: '10px', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />
                                    </i>
                                </div>
                                <div className="text-center mb-3">
                                    <button type="submit" className="btn btn-primary">Sign In</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p>Don't have an account? <a href="/src/components/Auth/SignUp" className="link">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;