import React, { useState, useEffect, useRef } from 'react';
import { EventCard } from "./EventCard";
import { eventsApi } from "../../services/api.js"; // Adjust path if necessary

// --- Professional Loading Skeleton for the Events Section (UPDATED FOR HORIZONTAL LAYOUT) ---
const EventSectionSkeleton = () => {
    // Skeleton for an individual event card
    const EventCardSkeleton = () => (
        <div className="flex-shrink-0 w-72 bg-neutral-900/80 rounded-lg h-full">
            {/* Image Placeholder */}
            <div className="w-full h-40 bg-neutral-800 rounded-t-2xl"></div>
            
            {/* Text Placeholders */}
            <div className="p-4 space-y-3">
                {/* Title Placeholder */}
                <div className="w-3/4 h-5 bg-neutral-800 rounded"></div>
                {/* Description Placeholder */}
                <div className="space-y-2">
                    <div className="w-full h-4 bg-neutral-800 rounded"></div>
                    <div className="w-5/6 h-4 bg-neutral-800 rounded"></div>
                    <div className="w-4/6 h-4 bg-neutral-800 rounded"></div>
                </div>
            </div>
        </div>
    );

    // Horizontal scrollable skeleton
    return (
        <div className="flex overflow-x-auto gap-4 pb-4">
            <EventCardSkeleton />
            <EventCardSkeleton />
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef(null);

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

  // Check scroll state
  useEffect(() => {
    const checkScrollState = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollState);
      checkScrollState(); // Check initial state
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollState);
      }
    };
  }, [events]);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.offsetWidth * 0.8; // Scroll 80% of viewport
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

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
    
    // Render the horizontal scrollable events container
    return (
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hidden md:block"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Scrollable Events Container */}
          <div 
            ref={containerRef}
            className="flex overflow-x-auto gap-4 scrollbar-hide pb-4 touch-pan-x px-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {events.map((event, index) => (
              <div key={event.id} className="flex-shrink-0 w-72 scroll-snap-start">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hidden md:block"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button 
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
    );
  };

  return (
    <section className="bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Events
        </h2>

        {renderContent()}
      </div>
    </section>
  );
};

export default EventSection;