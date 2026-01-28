import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveAuthData } from '../utils/validation';

function OAuth2RedirectHandler({ setIsLoggedIn }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');

        if (token && userId) {
            // Save auth data (assuming no rememberMe for social login by default, or true)
            saveAuthData(token, userId, '', true);

            if (setIsLoggedIn) {
                setIsLoggedIn(true);
            }

            // Check if details are needed, but for now user requested redirect to details filling page
            // We can redirect to details page directly
            navigate(`/signup-details/${userId}`);
        } else {
            // Error or missing params
            navigate('/login');
        }
    }, [location, navigate, setIsLoggedIn]);

    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Processing login...</p>
        </div>
    );
}

export default OAuth2RedirectHandler;
