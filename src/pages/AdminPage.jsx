import React, { useState } from 'react';
import { FiImage, FiCalendar, FiUsers, FiMessageSquare, FiInstagram, FiStar } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

// Import the admin components (no changes needed in these files)
import GalleryAdmin from '../componets/admin/GalleryAdmin';
import HeroAdmin from '../componets/admin/HeroAdmin';
import EventsAdmin from '../componets/admin/EventsAdmin';
import TeamAdmin from '../componets/admin/TeamAdmin';
import TestimonialsAdmin from '../componets/admin/TestimonialsAdmin';
import InstagramAdmin from '../componets/admin/InstagramAdmin';

// Mock Data can be used for initial state
const initialTeamMembers = [
    { id: uuidv4(), name: 'Jane Doe', imageLink: 'https://i.pravatar.cc/150?u=jane', instagramLink: 'https://www.instagram.com/jane_doe' },
    { id: uuidv4(), name: 'John Smith', imageLink: 'https://i.pravatar.cc/150?u=john', instagramLink: 'https://www.instagram.com/john_smith' },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('team');

    // State management remains the same
    const [heroItems, setHeroItems] = useState([]);
    const [eventItems, setEventItems] = useState([]);
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
    const [testimonialItems, setTestimonialItems] = useState([]);
    const [instagramPosts, setInstagramPosts] = useState([]);
    const [galleryItems, setGalleryItems] = useState([]);

    const renderContent = () => {
        // This logic is unchanged
        switch (activeTab) {
            case 'gallery': return <GalleryAdmin items={galleryItems} setItems={setGalleryItems} />;
            case 'hero': return <HeroAdmin items={heroItems} setItems={setHeroItems} />;
            case 'events': return <EventsAdmin items={eventItems} setItems={setEventItems} />;
            case 'team': return <TeamAdmin items={teamMembers} setItems={setTeamMembers} />;
            case 'testimonials': return <TestimonialsAdmin items={testimonialItems} setItems={setTestimonialItems} />;
            case 'instagram': return <InstagramAdmin items={instagramPosts} setItems={setInstagramPosts} />;
            default: return <div className="text-center py-10 text-neutral-500">Select a category to manage.</div>;
        }
    };
    
    // The TabButton component itself doesn't need to change, but its container will
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
                {/* Page Header */}
                <div className="mb-15">
                </div>

                {/* --- Main Layout Container --- */}
                {/* This div uses Flexbox to create the two-column layout */}
                {/* It stacks vertically on mobile (flex-col) and goes side-by-side on medium screens and up (md:flex-row) */}
                <div className="flex flex-col md:flex-row gap-8">

                    {/* --- Left Sidebar for Navigation --- */}
                    <aside className="md:w-60">
                        <div className="bg-neutral-900 p-4 rounded-xl border border-white/10 flex flex-col gap-2">
                            <TabButton id="gallery" label="Gallery" icon={<FiImage size={18}/>} />
                            <TabButton id="hero" label="Hero" icon={<FiStar size={18}/>} />
                            <TabButton id="events" label="Events" icon={<FiCalendar size={18}/>} />
                            <TabButton id="team" label="Team" icon={<FiUsers size={18}/>} />
                            <TabButton id="testimonials" label="Testimonials" icon={<FiMessageSquare size={18}/>} />
                            <TabButton id="instagram" label="Instagram" icon={<FiInstagram size={18}/>} />
                        </div>
                    </aside>

                    {/* --- Right Content Area --- */}
                    {/* The `flex-1` class makes this div take up all the remaining space */}
                    <main className="flex-1">
                        {renderContent()}
                    </main>

                </div>
            </div>
        </div>
    );
};

export default AdminPage;