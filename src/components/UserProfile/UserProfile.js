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
    const [activeTab, setActiveTab] = useState('profile');

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
        } catch (error) {
            console.error('Failed to delete user profile!', error);
            toast.error('Failed to delete user profile.');
        }
    };

    return (
        <div className="flex bg-gray-50" style={{ height: 'calc(100vh - 52px)' }}>
            <ToastContainer position="bottom-right" autoClose={5000} />

            {/* Main Content */}
            <div className="flex flex-col w-full p-8">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-700">Welcome, {userDetails.firstName}</h1>
                        <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 border-b border-gray-200 mb-6">
                    <button
                        className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile Information
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'password' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('password')}
                    >
                        Change Password
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'delete' ? 'border-b-2 border-red-500 text-red-500 font-semibold' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('delete')}
                    >
                        Delete Account
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-lg shadow p-6">
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-600">First Name</label>
                                    <input
                                        type="text"
                                        value={userDetails.firstName}
                                        disabled
                                        className="w-full bg-gray-100 rounded-lg border border-gray-200 p-2 text-gray-600 mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Last Name</label>
                                    <input
                                        type="text"
                                        value={userDetails.lastName}
                                        disabled
                                        className="w-full bg-gray-100 rounded-lg border border-gray-200 p-2 text-gray-600 mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Email</label>
                                    <input
                                        type="text"
                                        value={userDetails.email}
                                        disabled
                                        className="w-full bg-gray-100 rounded-lg border border-gray-200 p-2 text-gray-600 mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Account Created</label>
                                    <input
                                        type="text"
                                        value={userDetails.createdAt}
                                        disabled
                                        className="w-full bg-gray-100 rounded-lg border border-gray-200 p-2 text-gray-600 mt-1"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
                            <form onSubmit={handleChangePassword}>
                                <label className="block text-gray-600 mb-2">Current Password</label>
                                <PasswordInput
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Current Password"
                                    className="w-full mb-4"
                                />
                                <label className="block text-gray-600 mb-2">New Password</label>
                                <PasswordInput
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="w-full mb-4"
                                />
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'delete' && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Delete Account</h2>
                            <p className="text-gray-600 mb-4">Deleting your account is permanent and cannot be undone. All data associated with your profile will be lost.</p>
                            <button
                                onClick={handleDeleteUser}
                                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                            >
                                Delete Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
