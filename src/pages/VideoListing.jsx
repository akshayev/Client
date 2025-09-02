import React, { useState, useEffect } from 'react';
import { eventsApi, videoApi } from '../services/api'; 

// --- Sub-component for a single video card ---
const VideoCard = ({ video }) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 group border border-zinc-800 hover:border-zinc-700 hover:-translate-y-1 cursor-pointer">
      <div className="relative">
        {/* Using videoLink for the image temporarily, update if you have a separate thumbnailUrl */}
        <img src={`https://i.ytimg.com/vi/${new URL(video.videoLink).searchParams.get('v')}/hqdefault.jpg`} alt={video.title} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">{video.duration || 'N/A'}</span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-100 leading-snug">{video.title}</h3>
        
      </div>
    </div>
  );
};


// --- Main Page Component ---
export default function VideoListPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [error, setError] = useState(null);

  // Effect to fetch the list of all events for the switcher
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getAll();
        const eventData = response.data.data || [];
        
        setEvents(eventData); 
        if (eventData.length > 0) {
          setSelectedEvent(eventData[0]);
        }
      } catch (e) {
        setError('Failed to fetch events. Make sure the API server is running and accessible.');
        console.error(e);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // Effect to fetch videos when the selected event changes
  useEffect(() => {
    if (!selectedEvent) return;

    const fetchVideosForEvent = async () => {
        setLoadingVideos(true);
        try {
            //calls the API function we planned
            const response = await videoApi.getForEvent(selectedEvent.id);
            setVideos(response.data.data || []);
        } catch (e) {
            console.error(`Failed to fetch videos for event ${selectedEvent.id}:`, e);
            setVideos([]); // Set to empty array on error
        } finally {
            setLoadingVideos(false);
        }
    };

    fetchVideosForEvent();
  }, [selectedEvent]);

  if (error) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center text-center p-4">{error}</div>;
  }

  // Combined loading state
  const isLoading = loadingEvents || loadingVideos;

  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans pt-20">
      <style>{`.no-scrollbar::-webkit-scrollbar {display: none;} .no-scrollbar {-ms-overflow-style: none; scrollbar-width: none;}`}</style>
      <div className="container mx-auto px-4 py-8">
        
        {/* --- EVENT SWITCHER --- */}
        <div className="mb-12 min-h-[52px]">
          {!loadingEvents && events.length > 0 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-4 px-4 max-w-5xl mx-auto no-scrollbar">
              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`flex-shrink-0 whitespace-nowrap px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out border-2 ${
                    selectedEvent?.id === event.id
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  {event.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- CONTENT AREA --- */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zinc-400"></div>
          </div>
        ) : !selectedEvent ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-white">No Events Found</h2>
            <p className="mt-2 text-zinc-400">There are no events to display at the moment.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 md:mb-12 text-center border-t border-zinc-800 pt-12">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                Videos for {selectedEvent.title}
              </h1>
              <p className="text-lg text-zinc-400 mt-3 max-w-2xl mx-auto">
                A collection of recorded sessions, keynotes, and highlights from the event.
              </p>
            </div>
            
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-zinc-400">No videos found for this event.</p>
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

