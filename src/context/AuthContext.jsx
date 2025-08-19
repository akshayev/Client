import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../services/api.js';
import apiClient from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Initialize token from localStorage to stay logged in on refresh
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                // Set the token in localStorage for the api client interceptor
                localStorage.setItem('adminToken', token);
                try {
                    // Check if the token is still valid on the backend
                    await authApi.verifyToken();
                    const userData = await authApi.getMe();
                    setUser(userData.data.data);
                } catch (error) {
                    // If token is invalid, clear it
                    console.error("Session expired or token is invalid.", error);
                    localStorage.removeItem('adminToken');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        verifyUser();
    }, [token]);

    const login = async (credentials) => {
        const response = await authApi.login(credentials);
        const { token: apiToken } = response.data.data;
        setToken(apiToken);
        localStorage.setItem('adminToken', apiToken); // Persist token
        // Fetch user data after setting the token
        const userData = await authApi.getMe();
        setUser(userData.data.data);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
        // Clean up the authorization header from our api client instance
        delete apiClient.defaults.headers.common['Authorization'];
    };

    const value = { user, token, login, logout, isAuthenticated: !!token };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
    return useContext(AuthContext);
};