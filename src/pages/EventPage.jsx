// src/pages/EventPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To read the URL parameter
import { eventsApi } from '../services/api';     // Your updated API service

// A professional loading skeleton for the detail page
const EventDetailSkeleton = () => (
    <div className="max-w-4xl mx-auto animate-pulse">
        <div className="bg-neutral-800 h-72 sm:h-96 rounded-lg mb-8"></div>
        <div className="space-y-4">
            <div className="h-10 bg-neutral-800 rounded w-3/4"></div>
            <div className="h-6 bg-neutral-800 rounded w-1/2"></div>
            <div className="space-y-2 pt-4">
                <div className="h-4 bg-neutral-800 rounded"></div>
                <div className="h-4 bg-neutral-800 rounded"></div>
                <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

const EventPage = () => {
    // 1. Get the event ID from the URL
    const { eventId } = useParams();

    // 2. Set up state for this page
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Fetch data when the component loads
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await eventsApi.getOne(eventId);
                // The API response contains the event object
                setEvent(response.data?.data);
            } catch (err) {
                setError("Failed to load event details. It might not exist.");
                console.error("API Error fetching single event:", err);
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo(0, 0); // Scroll to top on page load
        fetchEvent();
    }, [eventId]); // Re-run this effect if the eventId in the URL changes

    // 4. Render based on the current state
    if (loading) {
        return (
            <section className="bg-black text-white py-16 sm:py-24 px-4 sm:px-6">
                <EventDetailSkeleton />
            </section>
        );
    }

    if (error || !event) {
        return (
            <section className="bg-black text-white py-16 sm:py-24 px-4 sm:px-6 text-center">
                <h1 className="text-2xl font-bold text-red-500">{error || "Event not found."}</h1>
            </section>
        );
    }

    // --- Render the actual event details ---
    return (
        <section className="bg-black text-white py-16 sm:py-24 text-center">
            <article className="max-w-4xl mx-auto px-4 sm:px-6">
                <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-2xl shadow-black/50"
                />
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                    {event.title}
                </h1>
                <p className="text-lg text-gray-400 mb-8 font-medium">
                    {new Date(event.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </p>
                <div className="prose prose-invert lg:prose-xl text-gray-300 whitespace-pre-wrap">
                    <p>{event.description}</p>
                </div>
            </article>
        </section>
    );
};

export default EventPage;