import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const { token } = await response.json();
                login(token);
                navigate('/');
            } else {
                const errorResponse = await response.json();
                if (response.status === 401 || response.status === 400) {
                    alert(`${errorResponse.cause}`);
                } else {
                    alert('Sign In failed. Please check your information and try again.');
                }
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
                            <h3 className="text-center">Sign Up</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                                </div>
                                <div className="form-group mb-4 position-relative">
                                    <label htmlFor="password">Password</label>
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required style={{ paddingRight: '40px' }} />
                                    <i onClick={togglePasswordVisibility} className="password-icon position-absolute" style={{ color: 'grey', top: '50%', right: '10px', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />
                                    </i>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p>Already have an account? <a href="/src/components/Auth/SignIn" className="link">Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
