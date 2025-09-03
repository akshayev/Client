// src/pages/EventPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { eventsApi } from '../services/api';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCalendar, FaUsers, FaTicketAlt, FaExternalLinkAlt } from 'react-icons/fa';

// No changes needed for the skeleton
const EventDetailSkeleton = () => (
    <div className="max-w-5xl mx-auto p-4 animate-pulse">
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-4">
                <div className="h-48 bg-neutral-800 rounded-2xl"></div>
                <div className="h-14 bg-neutral-800 rounded-xl"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
                <div className="h-10 bg-neutral-800 rounded w-1/2"></div>
                <div className="h-5 bg-neutral-800 rounded"></div>
                <div className="h-5 bg-neutral-800 rounded"></div>
                <div className="h-5 bg-neutral-800 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);


const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This part is now safe because the `ref` target will always be rendered
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Start with a clean state on re-fetch
                setEvent(null);
                setLoading(true);
                const response = await eventsApi.getOne(eventId);
                setEvent(response.data?.data);
            } catch (err) {
                setError("Failed to load event details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo(0, 0);
        fetchEvent();
    }, [eventId]);

    const eventDate = event ? new Date(event.eventDate) : new Date();

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
        }
    };

    return (
        <div className="bg-gray-900 text-white font-sans">
            {/* 1. HERO SECTION - This wrapper is now ALWAYS rendered */}
            <div ref={heroRef} className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
                {/* --- Conditional Rendering is now INSIDE the structure --- */}
                {loading ? (
                    <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                ) : event ? (
                    <>
                        <motion.img
                            src={event.imageUrl}
                            alt={event.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ y: backgroundY }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                        <motion.div
                            className="relative z-10 flex flex-col justify-end h-full max-w-5xl mx-auto px-6 pb-12 text-left"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-xl">
                                {event.title}
                            </h1>
                            <p className="mt-2 text-lg sm:text-xl text-gray-300 max-w-2xl">
                                {event.description.substring(0, 100)}...
                            </p>
                        </motion.div>
                    </>
                ) : null}
            </div>

            {/* 2. MAIN CONTENT SECTION */}
            <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
                {/* --- We apply the same logic here --- */}
                {loading ? (
                    <EventDetailSkeleton />
                ) : error || !event ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-500">{error || "Event not found."}</h2>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Left Column */}
                        <motion.div variants={contentVariants} className="lg:col-span-1 lg:sticky top-24 self-start">
                             <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-5 text-white">Event Info</h2>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex items-center gap-4">
                                        <FaCalendar className="text-blue-400 text-xl flex-shrink-0" />
                                        <span>{eventDate.toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <FaUsers className="text-blue-400 text-xl flex-shrink-0" />
                                        <span>Hosted by Photography Club</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <FaTicketAlt className="text-blue-400 text-xl flex-shrink-0" />
                                        <span>Filmmaking Workshop</span>
                                    </li>
                                </ul>
                            </div>
                            {event.pageLink && (
                                <motion.a
                                    href={event.pageLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-blue-500/30 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    Register Event <FaExternalLinkAlt />
                                </motion.a>
                            )}
                        </motion.div>
                        
                        {/* Right Column */}
                        <motion.div variants={contentVariants} className="lg:col-span-2">
                             <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                                About the Event
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300/90 whitespace-pre-wrap leading-relaxed">
                                <p>{event.description}</p>
                                <p className="mt-6">This is a fantastic opportunity for aspiring filmmakers to gain hands-on experience and learn from peers in a creative and supportive environment. Don't miss out!</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default EventPage;