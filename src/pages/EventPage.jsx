// src/pages/EventPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { eventsApi, videoApi } from '../services/api'; // 1. Import videoApi
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

// --- (No changes to Skeleton component) ---
const EventDetailSkeleton = () => (
    <div className="max-w-5xl mx-auto p-4 animate-pulse"><div className="grid lg:grid-cols-3 gap-12"><div className="lg:col-span-1 space-y-4"><div className="h-48 bg-neutral-800 rounded-2xl"></div><div className="h-14 bg-neutral-800 rounded-xl"></div></div><div className="lg:col-span-2 space-y-4"><div className="h-10 bg-neutral-800 rounded w-1/2"></div><div className="h-5 bg-neutral-800 rounded"></div><div className="h-5 bg-neutral-800 rounded"></div><div className="h-5 bg-neutral-800 rounded w-5/6"></div></div></div></div>
);

// --- 2. HELPER FUNCTIONS ---
// (Copied from VideoListPage. For a larger app, move these to a shared 'utils' file)

const getYouTubeDetails = (url) => {
    try {
        const urlObj = new URL(url);
        const videoId = urlObj.hostname === 'youtu.be'
            ? urlObj.pathname.slice(1)
            : urlObj.searchParams.get('v');
        return videoId ? { id: videoId, embedUrl: `https://www.youtube.com/embed/${videoId}` } : null;
    } catch (e) { console.error("Invalid YouTube URL:", url); return null; }
};

const extractApiData = (response) => {
    const dataPayload = response.data?.data;
    if (Array.isArray(dataPayload)) return dataPayload;
    if (dataPayload && Array.isArray(dataPayload.items)) return dataPayload.items;
    if (dataPayload && Array.isArray(dataPayload.data)) return dataPayload.data;
    return [];
};


const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    
    useEffect(() => {
        const fetchEventAndVideos = async () => {
            try {
                setEvent(null);
                setLoading(true);

                // --- 3. EFFICIENT DATA FETCHING ---
                // Fetch both the event and all videos at the same time
                const [eventResponse, videosResponse] = await Promise.all([
                    eventsApi.getOne(eventId),
                    videoApi.getAll(1, 1000) // Fetch all videos
                ]);

                const eventData = eventResponse.data?.data;
                const allVideos = extractApiData(videosResponse);
                
                if (!eventData) {
                   throw new Error("Event not found.");
                }

                // --- 4. FILTERING & TRANSFORMATION LOGIC ---
                // Find videos where 'event_name' matches the event's 'title'
                const relatedVideos = allVideos
                    .filter(video => video.event_name === eventData.title)
                    .map(video => {
                        const details = getYouTubeDetails(video.videoLink);
                        if (!details) return null; // Skip invalid video links
                        return {
                           id: video.id,
                           title: video.title,
                           url: details.embedUrl
                        };
                    })
                    .filter(Boolean); // Remove any null entries from failed maps

                // --- 5. INJECT INTO STATE ---
                // Combine event data with the new related videos array
                setEvent({
                    ...eventData,
                    relatedVideos: relatedVideos
                });

            } catch (err) {
                console.error("Failed to load event page data:", err);
                setError("Failed to load event details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo(0, 0);
        fetchEventAndVideos();
    }, [eventId]);


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
            {/* ... (Hero section is unchanged) ... */}
            <div ref={heroRef} className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
                {loading ? ( <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                ) : event ? ( <>
                        <motion.img src={event.imageUrl} alt={event.title} className="absolute inset-0 w-full h-full object-cover" style={{ y: backgroundY }}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                        <motion.div className="relative z-10 flex flex-col justify-end h-full max-w-5xl mx-auto px-6 pb-12 text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} >
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-xl">
                                {event.title}
                            </h1>
                            <p className="mt-2 text-lg sm:text-xl text-gray-300 max-w-2xl">
                                {event.description.substring(0, 100)}...
                            </p>
                        </motion.div>
                </>) : null}
            </div>

            {/* MAIN CONTENT SECTION */}
            <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
                {loading ? (
                    <EventDetailSkeleton />
                ) : error || !event ? (
                    <div className="text-center"><h2 className="text-2xl font-bold text-red-500">{error || "Event not found."}</h2></div>
                ) : (
                    <>
                        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-12" variants={contentVariants} initial="hidden" animate="visible" >
                            {/* ... (Left Column with button is unchanged) ... */}
                            <motion.div variants={contentVariants} className="lg:col-span-1 lg:sticky top-24 self-start">
                                {event.pageLink && (
                                    <motion.a href={event.pageLink} target="_blank" rel="noopener noreferrer" className="mt-6 w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-blue-500/30 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
                                        Register Event <FaExternalLinkAlt />
                                    </motion.a>
                                )}
                            </motion.div>
                            
                            {/* ... (Right Column with description is unchanged) ... */}
                            <motion.div variants={contentVariants} className="lg:col-span-2">
                                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400"> About the Event </h2>
                                <div className="prose prose-invert prose-lg max-w-none text-gray-300/90 whitespace-pre-wrap leading-relaxed">
                                    <p>{event.description}</p>
                                    <p className="mt-6">This is a fantastic opportunity for aspiring filmmakers to gain hands-on experience and learn from peers in a creative and supportive environment. Don't miss out!</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* --- RELATED VIDEOS SECTION --- */}
                        {/* No changes needed here; it will now work automatically with the live data! */}
                        {event.relatedVideos && event.relatedVideos.length > 0 && (
                            <motion.div className="mt-24" variants={contentVariants} initial="hidden" animate="visible" >
                                <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                                    Related Videos
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {event.relatedVideos.map((video) => (
                                        <motion.div key={video.id} variants={contentVariants}>
                                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-neutral-800 shadow-lg border border-white/10">
                                                <iframe src={video.url} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                                            </div>
                                            <h3 className="text-lg font-semibold mt-4 text-white">{video.title}</h3>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default EventPage;