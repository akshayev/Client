import React, { useState, useEffect, useCallback } from 'react';
import {
    galleryApi, heroApi, eventsApi, teamApi,
    testimonialsApi, instagramApi, usersApi, videoApi
} from '../services/api.js';


// Import the admin components
import GalleryAdmin from '../componets/admin/GalleryAdmin.jsx';
import HeroAdmin from '../componets/admin/HeroAdmin.jsx';
import EventsAdmin from '../componets/admin/EventsAdmin.jsx';
import TeamAdmin from '../componets/admin/TeamAdmin.jsx';
import TestimonialsAdmin from '../componets/admin/TestimonialsAdmin.jsx';
import InstagramAdmin from '../componets/admin/InstagramAdmin.jsx';
import UserManagementAdmin from '../componets/admin/UserManagementAdmin.jsx';
import VideoAdmin from '../componets/admin/VideoAdmin.jsx';

// Import the redesigned layout components
import AdminSidebar, { SIDEBAR_ITEMS } from '../layout/AdminSidebar.jsx';
import AdminHeader from '../layout/AdminHeader.jsx';


// Map tab IDs to their respective API services
const API_MAP = {
    gallery: galleryApi,
    hero: heroApi,
    events: eventsApi,
    team: teamApi,
    testimonials: testimonialsApi,
    instagram: instagramApi,
    users: usersApi,
    videos: videoApi,
};

// --- Reusable Content Panel Component ---
const ContentPanel = ({ activeTab, items, loading, error, onDataChange }) => {
    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center text-slate-400">Loading content...</div>
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center h-64">
            <div className="p-4 text-center bg-red-900/50 border border-red-700 rounded-lg text-red-300">{error}</div>
        </div>
    );

    // This logic remains the same
    switch (activeTab) {
        case 'gallery': return <GalleryAdmin items={items} onDataChange={onDataChange} />;
        case 'hero': return <HeroAdmin items={items} onDataChange={onDataChange} />;
        case 'events': return <EventsAdmin items={items} onDataChange={onDataChange} />;
        case 'team': return <TeamAdmin items={items} onDataChange={onDataChange} />;
        case 'testimonials': return <TestimonialsAdmin items={items} onDataChange={onDataChange} />;
        case 'instagram': return <InstagramAdmin items={items} onDataChange={onDataChange} />;
        case 'users': return <UserManagementAdmin items={items} onDataChange={onDataChange} />;
        case 'videos': return <VideoAdmin items={items} onDataChange={onDataChange} />;
        default: return (
            <div className="flex items-center justify-center h-64">
                 <div className="text-center text-slate-500">Select a category to manage.</div>
            </div>
        );
    }
};

// --- Admin Footer Component ---
const AdminFooter = () => {
    return (
        <footer className="w-full p-4 mt-8 text-center border-t text-slate-500 text-sm border-slate-700">
            <p>&copy; {new Date().getFullYear()} Admin Dashboard. All Rights Reserved.</p>
        </footer>
    );
};


// --- Main AdminPage Component (FIXED DESIGN) ---
const AdminPage = () => {
    const [activeTab, setActiveTab] = useState(SIDEBAR_ITEMS[0]?.id || 'hero');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchData = useCallback(async () => {
        const api = API_MAP[activeTab];
        if (!api) return;

        setLoading(true);
        setError(null);
        try {
            const response = await api.getAll();
            const dataPayload = response.data?.data;

            const itemsArray = Array.isArray(dataPayload)
                ? dataPayload
                : (dataPayload && Array.isArray(dataPayload.items))
                ? dataPayload.items
                : (dataPayload && Array.isArray(dataPayload.data))
                ? dataPayload.data
                : [];
            setItems(itemsArray);
        } catch (err) {
            console.error(`Failed to fetch ${activeTab} data`, err);
            setError(`Could not load ${activeTab} data. Please refresh the page.`);
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const currentTabLabel = SIDEBAR_ITEMS.find(item => item.id === activeTab)?.label || 'Dashboard';

    return (
        <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans">
            <div className="flex h-screen">
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* --- Main Content Area --- */}
                <div className="flex flex-col flex-1 w-full">
                     {/* --- RESTORED: Sticky Header --- */}
                     {/* It now sits on top of the scrolling content */}
                    <AdminHeader
                        pageTitle={currentTabLabel}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                    
                    {/* --- Scrolling Content Wrapper --- */}
                    {/* The scrollbar is hidden with the 'no-scrollbar' class (ensure this is in your CSS) */}
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <main className="p-4 md:p-6 lg:p-8">
                             {/* --- NEW: Content Header --- */}
                             <div className="mb-6">
                                <h1 className="text-3xl font-bold text-white">{currentTabLabel}</h1>
                                <p className="text-slate-400">Manage your {currentTabLabel.toLowerCase()} content here.</p>
                             </div>

                             <ContentPanel
                                activeTab={activeTab}
                                items={items}
                                loading={loading}
                                error={error}
                                onDataChange={fetchData}
                            />
                        </main>
                        
                        {/* --- Footer (now inside the scrollable area) --- */}
                        <AdminFooter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;