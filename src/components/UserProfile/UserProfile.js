import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { fetchUserData, changeUserPassword, deleteUserProfile } from '../../api/user';
import PasswordInput from '../PasswordInput';

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        createdAt: '',
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetchUserData()
            .then(data => {
                setUserDetails({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    createdAt: new Date(data.createdAt).toLocaleDateString(),
                });
            })
            .catch(error => console.error('Failed to fetch user data!', error));
    }, []);

    const handleChangePassword = async (event) => {
        event.preventDefault();
        try {
            await changeUserPassword(currentPassword, newPassword);
            alert('Password changed successfully.');
        } catch (error) {
            console.error('Failed to change password:', error);
            alert('Failed to change password. Please try again.');
        }
    };

    const handleDeleteUser = async () => {
        if (!window.confirm('Are you sure you want to delete your profile?')) {
            return;
        }
        try {
            await deleteUserProfile();
            console.log('Profile deleted successfully.');
            localStorage.removeItem('token');
            window.location.href = '/signin';
        } catch (error) {
            console.error('Failed to delete user profile!', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card profile-card">
                        <div className="card-header">User Profile</div>
                        <div className="card-body">
                            <p><strong>First Name:</strong> {userDetails.firstName}</p>
                            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <p><strong>Account Creation Date:</strong> {userDetails.createdAt}</p>
                            <button className="btn btn-danger" onClick={handleDeleteUser}>Delete Profile</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card profile-card">
                        <div className="card-header">Change Password</div>
                        <div className="card-body">
                            <form onSubmit={handleChangePassword}>
                                <PasswordInput value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <button type="submit" className="btn btn-primary">Submit Change</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
