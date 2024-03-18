import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signUp } from '../../api/auth';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
            const data = await signUp(firstName, lastName, email, password);
            login(data.token);
            navigate('/');
        } catch (error) {
            console.error('Sign Up error:', error.message);
            alert('Sign Up failed. Please check your information and try again.');
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
                                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                                </div>
                                <div className="form-group mb-4 position-relative">
                                    <label htmlFor="password">Password</label>
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required style={{ paddingRight: '40px' }} />
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
