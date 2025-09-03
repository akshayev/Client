import React, { useState, useEffect } from 'react';
import { eventsApi, videoApi } from '../services/api';

// --- Sub-component for a single video card (No changes needed) ---
const VideoCard = ({ video }) => {
  const getYouTubeId = (url) => {
    try {
      return new URL(url).searchParams.get('v');
    } catch (e) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }
  };

  const videoId = getYouTubeId(video.videoLink);
  const thumbnailUrl = videoId 
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : 'https://placehold.co/1920x1080/000000/FFF?text=Video';

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 group border border-zinc-800 hover:border-zinc-700 hover:-translate-y-1 cursor-pointer">
      <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-video overflow-hidden">
          <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-100 leading-snug">{video.title}</h3>
        </div>
      </a>
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
  
  const allVideosFilter = { id: 'all', title: 'All Videos' };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getAll();
        // --- FIX: Access the nested data array from the paginated response ---
        const eventData = response.data?.data?.data || [];
        
        setEvents([allVideosFilter, ...eventData]); 
        setSelectedEvent(allVideosFilter);
        
      } catch (e) {
        setError('Failed to fetch events. Please ensure the API is running.');
        console.error(e);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;

    const fetchVideos = async () => {
        setLoadingVideos(true);
        setVideos([]);
        try {
            let response;
            if (selectedEvent.id === 'all') {
                response = await videoApi.getAll();
            } else {
                response = await videoApi.getForEvent(selectedEvent.id);
            }
            // --- FIX: Access the nested data array from the paginated response ---
            setVideos(response.data?.data?.data || []);
        } catch (e) {
            console.error(`Failed to fetch videos for filter ${selectedEvent.title}:`, e);
            setVideos([]);
        } finally {
            setLoadingVideos(false);
        }
    };

    fetchVideos();
  }, [selectedEvent]);

  if (error) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center text-center p-4">{error}</div>;
  }

  const isLoading = loadingEvents || loadingVideos;

  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans pt-20">
      <style>{`.no-scrollbar::-webkit-scrollbar {display: none;} .no-scrollbar {-ms-overflow-style: none; scrollbar-width: none;}`}</style>
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-12 min-h-[52px]">
          {!loadingEvents && events.length > 1 && ( // Only show filter if there are actual events
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

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zinc-400"></div>
          </div>
        ) : !selectedEvent ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-white">No Content Available</h2>
            <p className="mt-2 text-zinc-400">There is no content to display at the moment.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 md:mb-12 text-center border-t border-zinc-800 pt-12">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                {selectedEvent.id === 'all' ? 'All Videos' : `Videos for ${selectedEvent.title}`}
              </h1>
              <p className="text-lg text-zinc-400 mt-3 max-w-2xl mx-auto">
                {selectedEvent.id === 'all' 
                  ? 'A complete collection of all recorded sessions and highlights.'
                  : `A collection of recorded sessions from the ${selectedEvent.title} event.`}
              </p>
            </div>
            
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {videos.map((video) => <VideoCard key={video.id} video={video} />)}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-zinc-400">No videos found for this selection.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}