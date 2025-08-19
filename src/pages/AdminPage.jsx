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

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('hero');
    const { logout } = useAuth(); 
    const [data, setData] = useState({
        hero: [], gallery: [], events: [],
        team: [], testimonials: [], instagram: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiMap = {
        gallery: galleryApi,
        hero: heroApi,
        events: eventsApi,
        team: teamApi,
        testimonials: testimonialsApi,
        instagram: instagramApi,
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const api = apiMap[activeTab];
            const response = await api.getAll();

            // Get the common 'data' property from the response body.
            const dataPayload = response.data?.data;

            // This variable will hold our final array, regardless of the structure.
            let itemsArray = null;

            // Check if the payload is an array directly (like Testimonials).
            if (Array.isArray(dataPayload)) {
                itemsArray = dataPayload;
            } 
            // Otherwise, check if it's an object with an 'items' array inside (like Gallery).
            else if (dataPayload && Array.isArray(dataPayload.items)) {
                itemsArray = dataPayload.items;
            }

            // Now, update the state if we successfully found an array.
            if (itemsArray) {
                // Both of your API responses provide an 'id' field, so no data mapping is needed.
                setData(prevData => ({ ...prevData, [activeTab]: itemsArray }));
            } else {
                // This will be triggered if the response format is unexpected.
                console.warn(`API response for ${activeTab} did not contain a valid items array:`, response.data);
                setData(prevData => ({ ...prevData, [activeTab]: [] }));
            }
        } catch (err) {
            console.error(`Failed to fetch ${activeTab} data`, err);
            setError(`Could not load ${activeTab} data. Please refresh the page.`);
        } finally {
            setLoading(false);
        }
    }, [activeTab]); // No dependency on apiMap as it's constant

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderContent = () => {
        if (loading) return <div className="text-center py-10 text-neutral-500">Loading content...</div>;
        if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

        switch (activeTab) {
            case 'gallery':
                return <GalleryAdmin items={data.gallery} onDataChange={fetchData} />;
            case 'hero':
                return <HeroAdmin items={data.hero} onDataChange={fetchData} />;
            case 'events':
                return <EventsAdmin items={data.events} onDataChange={fetchData} />;
            case 'team':
                return <TeamAdmin items={data.team} onDataChange={fetchData} />;
            case 'testimonials':
                return <TestimonialsAdmin items={data.testimonials} onDataChange={fetchData} />;
            case 'instagram':
                return <InstagramAdmin items={data.instagram} onDataChange={fetchData} />;
            default:
                return <div className="text-center py-10 text-neutral-500">Select a category to manage.</div>;
        }
    };

    const TabButton = ({ id, label, icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center w-full justify-start gap-3 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === id ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row mt-15">
                    <aside className="md:w-60">
                        <div className="bg-neutral-900 p-4 rounded-xl border border-white/10 flex flex-col gap-2">
                            <TabButton id="hero" label="Hero" icon={<FiStar size={18}/>} />
                            <TabButton id="gallery" label="Gallery" icon={<FiImage size={18}/>} />
                            <TabButton id="events" label="Events" icon={<FiCalendar size={18}/>} />
                            <TabButton id="team" label="Team" icon={<FiUsers size={18}/>} />
                            <TabButton id="testimonials" label="Testimonials" icon={<FiMessageSquare size={18}/>} />
                            <TabButton id="instagram" label="Instagram" icon={<FiInstagram size={18}/>} />
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <FiLogOut /> Logout
                            </button>

                        </div>
                    </aside>
                    <main className="flex-1 m-5">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;