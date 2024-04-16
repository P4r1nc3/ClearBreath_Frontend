import React, { useState, useEffect } from 'react';
import { fetchUserData, changeUserPassword, deleteUserProfile } from '../../api/user';
import PasswordInput from '../PasswordInput';
import { toast, ToastContainer } from 'react-toastify';

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
            .catch(error => {
                console.error('Failed to fetch user data!', error);
                toast.error('Failed to fetch user data!');
            });
    }, []);

    const handleChangePassword = async (event) => {
        event.preventDefault();
        try {
            await changeUserPassword(currentPassword, newPassword);
            toast.success('Password changed successfully.');
        } catch (error) {
            console.error('Failed to change password:', error);
            toast.error('Failed to change password. Please try again.');
        }
    };

    const handleDeleteUser = async () => {
        if (!window.confirm('Are you sure you want to delete your profile?')) {
            return;
        }
        try {
            await deleteUserProfile();
            localStorage.removeItem('token');
            window.location.href = '/signin';
            toast.success('Profile deleted successfully.');
        } catch (error) {
            console.error('Failed to delete user profile!', error);
            toast.error('Failed to delete user profile.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-700"><strong>First Name:</strong> {userDetails.firstName}</p>
                        <p className="text-gray-700"><strong>Last Name:</strong> {userDetails.lastName}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {userDetails.email}</p>
                        <p className="text-gray-700"><strong>Account Creation Date:</strong> {userDetails.createdAt}</p>
                        <button className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={handleDeleteUser}>Delete Profile</button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleChangePassword}>
                            <PasswordInput value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" />
                            <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                            <button type="submit" className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Change</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
