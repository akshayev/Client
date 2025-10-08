// src/components/member/MemberProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useMemberAuth } from '../../context/MemberAuthContext'; // Import the member-specific auth hook
import LoadingPage from '../../pages/LoadingPage'; // A loading spinner for a better UX

const MemberProtectedRoute = ({ children }) => {
    const { isMemberAuthenticated, loading } = useMemberAuth();
    const location = useLocation();

    // While the context is verifying a token from localStorage, show a loading screen.
    // This prevents a "flash" of the login page for already-logged-in users.
    if (loading) {
        return <LoadingPage />;
    }

    // If not authenticated, redirect to the login page.
    // We pass the original location in the state so the login page can redirect
    // back to the originally requested page after a successful login.
    if (!isMemberAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // If authenticated, render the component that was passed as children.
    return children;
};

export default MemberProtectedRoute;