import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { EventCard } from "./EventCard";
import { eventsApi } from "../../services/api.js"; // Adjust path if necessary

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getAll();
        
        // FIX 1: Access the nested 'items' array from the response data object.
        if (response.data && response.data.data && Array.isArray(response.data.data.items)) {
            
            // FIX 2: Map the API data to the format expected by the EventCard component.
            // This renames fields and formats the date for display.
            const formattedEvents = response.data.data.items.map(event => ({
              id: event.id,
              title: event.title,
              description: event.description,
              image: event.imageUrl, // Map 'imageUrl' to 'image'
              date: new Date(event.eventDate).toLocaleDateString('en-US', { // Format the ISO date string
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

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-400">Loading Events...</p>;
    }
    
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (events.length === 0) {
        return <p className="text-center text-gray-400">No upcoming events right now. Check back later!</p>;
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, index) => (
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
          Upcoming Events
        </motion.h2>

        {renderContent()}
      </div>
    </section>
  );
};

export default EventSection;