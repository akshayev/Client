import React, { useState, useEffect, useCallback } from 'react';
import { FiImage, FiCalendar, FiUsers, FiMessageSquare, FiInstagram, FiStar, FiLogOut } from 'react-icons/fi';
import {
    galleryApi, heroApi, eventsApi, teamApi,
    testimonialsApi, instagramApi
} from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

// Import the admin components
import GalleryAdmin from '../componets/admin/GalleryAdmin.jsx';
import HeroAdmin from '../componets/admin/HeroAdmin.jsx';
import EventsAdmin from '../componets/admin/EventsAdmin.jsx';
import TeamAdmin from '../componets/admin/TeamAdmin.jsx';
import TestimonialsAdmin from '../componets/admin/TestimonialsAdmin.jsx';
import InstagramAdmin from '../componets/admin/InstagramAdmin.jsx';

// --- Centralized Configuration for Sidebar ---
const SIDEBAR_ITEMS = [
    { id: 'hero', label: 'Hero', icon: <FiStar size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <FiImage size={18} /> },
    { id: 'events', label: 'Events', icon: <FiCalendar size={18} /> },
    { id: 'team', label: 'Team', icon: <FiUsers size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <FiMessageSquare size={18} /> },
    { id: 'instagram', label: 'Instagram', icon: <FiInstagram size={18} /> },
];

// Map tab IDs to their respective API services
const API_MAP = {
    gallery: galleryApi,
    hero: heroApi,
    events: eventsApi,
    team: teamApi,
    testimonials: testimonialsApi,
    instagram: instagramApi,
};


// --- Reusable Button Component ---
const TabButton = ({ id, label, icon, activeTab, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`flex items-center w-full justify-center md:justify-start gap-3 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === id ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'
        }`}
    >
        {icon}
        <span className="hidden md:inline">{label}</span>
    </button>
);


// --- Sidebar Component ---
const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const { logout } = useAuth();
    
    return (
        <aside className="md:w-60">
            <div className="bg-neutral-900 p-4 rounded-xl border border-white/10 flex flex-col gap-2">
                {SIDEBAR_ITEMS.map((item) => (
                    <TabButton
                        key={item.id}
                        {...item}
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                ))}
                <button
                    onClick={logout}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center md:justify-start gap-2 mt-2"
                >
                    <FiLogOut /> <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </aside>
    );
};


// --- Content Panel Component ---
const ContentPanel = ({ activeTab, items, loading, error, onDataChange }) => {
    if (loading) return <div className="text-center py-10 text-neutral-500">Loading content...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    switch (activeTab) {
        case 'gallery': return <GalleryAdmin items={items} onDataChange={onDataChange} />;
        case 'hero': return <HeroAdmin items={items} onDataChange={onDataChange} />;
        case 'events': return <EventsAdmin items={items} onDataChange={onDataChange} />;
        case 'team': return <TeamAdmin items={items} onDataChange={onDataChange} />;
        case 'testimonials': return <TestimonialsAdmin items={items} onDataChange={onDataChange} />;
        case 'instagram': return <InstagramAdmin items={items} onDataChange={onDataChange} />;
        default: return <div className="text-center py-10 text-neutral-500">Select a category to manage.</div>;
    }
};


// --- Main AdminPage Component ---
const AdminPage = () => {
    const [activeTab, setActiveTab] = useState(SIDEBAR_ITEMS[0]?.id || 'hero');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row mt-15">
                    <AdminSidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <main className="flex-1 mt-5 md:mt-0 md:ml-5">
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