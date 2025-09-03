import React, { useState, useEffect, useCallback } from 'react';
import {
    galleryApi, heroApi, eventsApi, teamApi,
    testimonialsApi, instagramApi, usersApi, videoApi
} from '../services/api.js';


// Import the admin components (assuming they are in the correct path)
import GalleryAdmin from '../componets/admin/GalleryAdmin.jsx';
import HeroAdmin from '../componets/admin/HeroAdmin.jsx';
import EventsAdmin from '../componets/admin/EventsAdmin.jsx';
import TeamAdmin from '../componets/admin/TeamAdmin.jsx';
import TestimonialsAdmin from '../componets/admin/TestimonialsAdmin.jsx';
import InstagramAdmin from '../componets/admin/InstagramAdmin.jsx';
import UserManagementAdmin from '../componets/admin/UserManagementAdmin.jsx';
import VideoAdmin from '../componets/admin/VideoAdmin.jsx';

// NEW: Import the redesigned layout components
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
// This component remains largely the same but is used within the new layout
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

    // No changes to the logic here
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

// --- Main AdminPage Component (REDESIGNED) ---
const AdminPage = () => {
    // Default to the first item's ID, with a fallback
    const [activeTab, setActiveTab] = useState(SIDEBAR_ITEMS[0]?.id || 'hero');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // NEW: State to manage the sidebar on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchData = useCallback(async () => {
        const api = API_MAP[activeTab];
        if (!api) return;

        setLoading(true);
        setError(null);
        try {
            const response = await api.getAll();
            // This robust data extraction logic is good, keep it
            const dataPayload = response.data?.data;

            const itemsArray = Array.isArray(dataPayload) 
                ? dataPayload // For simple array responses
                : (dataPayload && Array.isArray(dataPayload.items)) 
                ? dataPayload.items // For { data: { items: [...] } }
                : (dataPayload && Array.isArray(dataPayload.data))
                ? dataPayload.data // For { data: { data: [...] } } - THIS HANDLES THE VIDEO API
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
                {/* --- Sidebar --- */}
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* --- Main Content Area --- */}
                <div className="flex flex-col flex-1 w-full overflow-y-auto">
                    {/* --- Sticky Header --- */}
                   {/*  <AdminHeader
                        pageTitle={currentTabLabel}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />*/}
                    
                    {/* --- Content --- */}
                    <main className="flex-1 p-4 md:p-6 lg:p-8">
                         <ContentPanel
                            activeTab={activeTab}
                            items={items}
                            loading={loading}
                            error={error}
                            onDataChange={fetchData}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;