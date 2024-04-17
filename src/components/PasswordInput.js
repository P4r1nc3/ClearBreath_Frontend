import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = ({ value, onChange }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
    };

    return (
        <div className="mb-4 relative">
            <div className="relative">
                <input
                    type={passwordShown ? "text" : "password"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
                    id="password"
                    value={value}
                    onChange={onChange}
                    placeholder="••••••••••"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    style={{ top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                >
                    <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
