// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../services/api';

// Create the context
const AuthContext = createContext(null);

/**
 * AuthProvider component manages all authentication state and logic.
 * It handles login, logout, and persists user sessions on page refresh.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
    // Add a loading state to prevent rendering children before auth status is determined
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * This effect runs on application startup to verify any existing token
         * and fetch user data to maintain a persistent session.
         */
        const verifyExistingSession = async () => {
            if (token) {
                try {
                    // EFFICIENCY: Use getMe() to both verify the token and get user data in one call.
                    // If this call succeeds, the token is valid.
                    const response = await authApi.getMe();
                    setUser(response.data.data);
                } catch (error) {
                    // If the token is invalid or expired, the API will return an error.
                    console.error("Session token is invalid or expired. Logging out.", error);
                    // Clear the invalid token from storage and state.
                    localStorage.removeItem('adminToken');
                    setToken(null);
                    setUser(null);
                }
            }
            // Finished checking for a session, allow the app to render.
            setLoading(false);
        };
        
        verifyExistingSession();
    }, [token]); // This effect depends only on the token

    /**
     * Handles the admin login process.
     * @param {object} credentials - { username, password }
     */
    const login = async (credentials) => {
        try {
            // CORRECTNESS: Use the specific 'adminLogin' function from the api service.
            const response = await authApi.adminLogin(credentials);
            const newToken = response.data.data.token;
            
            // Set token in state and persist in localStorage
            setToken(newToken);
            localStorage.setItem('adminToken', newToken);
            
            // Fetch user data after successful login
            const userData = await authApi.getMe();
            setUser(userData.data.data);

        } catch (error) {
            // ROBUSTNESS: Re-throw the error so the calling component (AdminLoginPage)
            // can catch it and display the appropriate error message to the user.
            throw error;
        }
    };

    /**
     * Handles the logout process.
     */
    const logout = async () => {
        try {
            // SECURITY: Call the backend logout endpoint to invalidate the token server-side.
            await authApi.logout();
        } catch (error) {
            console.error("Server logout failed, but proceeding with client-side logout.", error);
        } finally {
            // This 'finally' block ensures the client is always logged out,
            // even if the server call fails.
            localStorage.removeItem('adminToken');
            setToken(null);
            setUser(null);
        }
    };

    // The value provided to consuming components
    const value = { 
        user, 
        token, 
        login, 
        logout, 
        isAuthenticated: !!token, 
        loading 
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Don't render the rest of the app until the initial session check is complete */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy consumption of the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};