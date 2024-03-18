import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = ({ value, onChange }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
    };

    return (
        <div className="form-group mb-4 position-relative">
            <label htmlFor="password">Password</label>
            <input
                type={passwordShown ? "text" : "password"}
                className="form-control"
                id="password"
                value={value}
                onChange={onChange}
                placeholder="Enter your password"
                required
                style={{ paddingRight: '40px' }}
            />
            <i onClick={togglePasswordVisibility} className="password-icon position-absolute" style={{ color: 'grey', top: '50%', right: '10px', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />
            </i>
        </div>
    );
};

export default PasswordInput;
