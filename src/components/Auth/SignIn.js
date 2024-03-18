import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signIn } from '../../api/auth';
import PasswordInput from "../PasswordInput";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await signIn(email, password);
            login(data.token);
            navigate('/');
        } catch (error) {
            console.error('Sign In error:', error.message);
            alert('Sign In failed. Please check your information and try again.');
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
                                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
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