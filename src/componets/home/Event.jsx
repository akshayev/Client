import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { EventCard } from "./EventCard";
import { eventsApi } from "../../services/api.js"; // Adjust path if necessary

// --- Professional Loading Skeleton for the Events Section ---
const EventSectionSkeleton = () => {
    // Skeleton for an individual event card
    const EventCardSkeleton = () => (
        <div className="bg-neutral-900/80 rounded-lg p-5 w-full">
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-neutral-800 rounded-md mb-4"></div>
            
            {/* Text Placeholders */}
            <div className="space-y-3">
                {/* Title Placeholder */}
                <div className="w-3/4 h-6 bg-neutral-800 rounded"></div>
                {/* Date Placeholder */}
                <div className="w-1/2 h-4 bg-neutral-800 rounded"></div>
                {/* Description Placeholder */}
                <div className="space-y-2 pt-2">
                    <div className="w-full h-4 bg-neutral-800 rounded"></div>
                    <div className="w-full h-4 bg-neutral-800 rounded"></div>
                    <div className="w-5/6 h-4 bg-neutral-800 rounded"></div>
                </div>
            </div>
        </div>
    );

    // The grid container applies the pulse animation to all children
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
        </div>
    );
};


const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventsApi.getAll();
        const eventsData = response.data?.data;
        
        if (eventsData && Array.isArray(eventsData)) {
            // Filter out any events missing essential data before processing
            const validEvents = eventsData.filter(event => 
                event && event.id && event.title && event.imageUrl && event.eventDate
            );

            const formattedEvents = validEvents
              .filter(event => event.isActive)
              .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
              .map(event => ({
                id: event.id,
                title: event.title,
                description: event.description,
                image: event.imageUrl,
                date: new Date(event.eventDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                })
              }));

            setEvents(formattedEvents);
        } else {
            throw new Error("Invalid data format received from the API.");
        }
      } catch (err) {
        setError("Could not load upcoming events.");
        console.error("API Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // --- RENDER LOGIC UPDATE ---
  const renderContent = () => {
    // Display the professional skeleton UI while loading
    if (loading) {
      return <EventSectionSkeleton />;
    }
    
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (events.length === 0) {
        return <p className="text-center text-gray-400">No upcoming events right now. Check back later!</p>;
    }
    
    // Render the actual event cards once data is available
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.slice(0, 3).map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
    );
  };

  return (
    <section className="bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Events
        </motion.h2>

        {renderContent()}
      </div>
    </section>
  );
};

export default EventSection;