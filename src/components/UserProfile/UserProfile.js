import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        createdAt: '',
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const fetchUserData = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserDetails({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    createdAt: new Date(data.createdAt).toLocaleDateString(),
                });
            })
            .catch(error => console.error('Failed to fetch user data!', error));
    };

    const handleChangePassword = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const urlChangePassword = 'http://localhost:8080/users/change-password';

        fetch(urlChangePassword, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ oldPassword: currentPassword, newPassword: newPassword }),
        })
            .then(response => {
                if (response.ok) {
                    alert('Password changed successfully.');
                } else {
                    alert('Failed to change password.');
                }
            })
            .catch(error => {
                console.error('Error:', error)
            });
    };

    const handleDeleteUser = () => {
        if (!window.confirm('Are you sure you want to delete your profile?')) {
            return;
        }

        const token = localStorage.getItem('token');
        const urlDeleteUser = 'http://localhost:8080/users';

        fetch(urlDeleteUser, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log('Profile deleted successfully.');
                    localStorage.removeItem('token');
                    window.location.href = '/';
                } else {
                    console.error('Failed to delete user profile!');
                }
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

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
                                <div className="form-group position-relative">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input type={showCurrentPassword ? "text" : "password"} className="form-control" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                    <i onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="password-icon position-absolute" style={{ color: 'grey', top: '50%', right: '10px', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                                    </i>
                                </div>
                                <div className="form-group position-relative">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type={showNewPassword ? "text" : "password"} className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <i onClick={() => setShowNewPassword(!showNewPassword)} className="password-icon position-absolute" style={{ color: 'grey', top: '50%', right: '10px', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                                    </i>
                                </div>
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
