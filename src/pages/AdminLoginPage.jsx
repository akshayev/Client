// src/pages/AdminLoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiLoader } from 'react-icons/fi'; // Import icons

// Import the reusable animated input component
import AnimatedInput from '../componets/join/AnimatedInput.jsx';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login({ username, password });
            navigate('/admin'); // Redirect to the admin page after successful login
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
            <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-neutral-900 rounded-xl border border-white/10 shadow-lg">
                <div className="text-center">
                    {/* Optional: Add a logo here if you have one */}
                    <h1 className="text-3xl font-bold text-white">Admin Login</h1>
                    <p className="text-neutral-400">CPC Photography Club</p>
                </div>
                
                {/* Display a prominent error message */}
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Replaced standard inputs with the AnimatedInput component */}
                    <AnimatedInput 
                        id="username"
                        label="Username"
                        icon={<FiUser />}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />

                    <AnimatedInput 
                        id="password"
                        label="Password"
                        type="password"
                        icon={<FiLock />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 mt-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-sky-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <FiLoader className="animate-spin" />
                                    <span>Logging In...</span>
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;