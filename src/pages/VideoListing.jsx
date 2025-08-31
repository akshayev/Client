import React, { useState, useEffect } from 'react';
// To make this page dynamic, you'll need a routing library like react-router-dom
// import { useParams } from 'react-router-dom';

// --- DUMMY DATA ---
// I've restructured the data to hold multiple events.
// In a real application, you would likely fetch only the event you need from an API.
const allEventsData = {
    'tech-conference-2025': {
        eventName: 'Tech Conference 2025',
        videos: [
            { id: 1, title: 'Keynote Address: The Future of AI', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Keynote', channelName: 'TechConf TV', views: '1.2M', uploadDate: '2 weeks ago', duration: '45:12' },
            { id: 2, title: 'Panel Discussion: Web3 & The Metaverse', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Panel', channelName: 'TechConf TV', views: '780K', uploadDate: '2 weeks ago', duration: '1:12:30' },
            { id: 3, title: 'Workshop: Building Scalable Systems', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Workshop', channelName: 'Developer Den', views: '450K', uploadDate: '1 week ago', duration: '2:30:05' },
            { id: 4, title: 'Fireside Chat with Tech Leaders', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Fireside+Chat', channelName: 'TechConf TV', views: '980K', uploadDate: '3 days ago', duration: '55:45' },
        ],
    },
    'aaravam-2024': {
        eventName: 'Aaravam 2024',
        videos: [
            { id: 5, title: 'Inaugural Ceremony Highlights', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Aaravam+1', channelName: 'CUCEK Campus Life', views: '15K', uploadDate: '1 month ago', duration: '12:45' },
            { id: 6, title: 'Onam Celebrations: Full Event', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Aaravam+2', channelName: 'CUCEK Campus Life', views: '22K', uploadDate: '1 month ago', duration: '1:45:20' },
        ],
    },
    'monsoon-clickz-2024': {
        eventName: 'Monsoon Clickz 2024',
        videos: [
            { id: 7, title: "Winner's Gallery Showcase", thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Monsoon+1', channelName: 'Photography Club', views: '8K', uploadDate: '3 weeks ago', duration: '8:15' },
            { id: 8, title: 'Behind the Scenes', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Monsoon+2', channelName: 'Photography Club', views: '5K', uploadDate: '2 weeks ago', duration: '15:30' },
        ],
    },
    'hackathon-2024': {
        eventName: 'Hackathon 2024',
        videos: [
            { id: 9, title: 'Opening Ceremony', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Hackathon+1', channelName: 'Hackers United', views: '10K', uploadDate: '1 week ago', duration: '20:00' },
            { id: 10, title: 'Project Demos', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Hackathon+2', channelName: 'Hackers United', views: '7K', uploadDate: '6 days ago', duration: '1:10:00' },
        ],
    },
    'cultural-fest-2024': {
        eventName: 'Cultural Fest 2024',
        videos: [
            { id: 11, title: 'Dance Performances', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Cultural+1', channelName: 'Campus Events', views: '12K', uploadDate: '2 weeks ago', duration: '30:00' },
            { id: 12, title: 'Music Night Highlights', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Cultural+2', channelName: 'Campus Events', views: '9K', uploadDate: '2 weeks ago', duration: '40:00' },
        ],
    },
    'sports-day-2024': {
        eventName: 'Sports Day 2024',
        videos: [
            { id: 13, title: 'Track Events', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Sports+1', channelName: 'Sports Club', views: '6K', uploadDate: '1 month ago', duration: '25:00' },
            { id: 14, title: 'Football Finals', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Sports+2', channelName: 'Sports Club', views: '8K', uploadDate: '1 month ago', duration: '1:20:00' },
        ],
    },
    'science-expo-2024': {
        eventName: 'Science Expo 2024',
        videos: [
            { id: 15, title: 'Robotics Showcase', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Science+1', channelName: 'Science Society', views: '5K', uploadDate: '3 weeks ago', duration: '18:00' },
            { id: 16, title: 'Innovative Projects', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Science+2', channelName: 'Science Society', views: '4K', uploadDate: '3 weeks ago', duration: '22:00' },
        ],
    },
    'alumni-meet-2024': {
        eventName: 'Alumni Meet 2024',
        videos: [
            { id: 17, title: 'Welcome Speech', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Alumni+1', channelName: 'Alumni Network', views: '3K', uploadDate: '2 months ago', duration: '10:00' },
            { id: 18, title: 'Panel Discussion', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Alumni+2', channelName: 'Alumni Network', views: '2K', uploadDate: '2 months ago', duration: '50:00' },
        ],
    },
    'startup-summit-2024': {
        eventName: 'Startup Summit 2024',
        videos: [
            { id: 19, title: 'Pitch Competition', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Startup+1', channelName: 'Startup Hub', views: '11K', uploadDate: '1 week ago', duration: '1:00:00' },
            { id: 20, title: 'Investor Q&A', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Startup+2', channelName: 'Startup Hub', views: '8K', uploadDate: '1 week ago', duration: '35:00' },
        ],
    },
    'coding-challenge-2024': {
        eventName: 'Coding Challenge 2024',
        videos: [
            { id: 21, title: 'Problem Solving Round', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Coding+1', channelName: 'Code Masters', views: '14K', uploadDate: '5 days ago', duration: '1:15:00' },
            { id: 22, title: 'Winner Announcements', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Coding+2', channelName: 'Code Masters', views: '10K', uploadDate: '5 days ago', duration: '10:00' },
        ],
    },
    'literary-fest-2024': {
        eventName: 'Literary Fest 2024',
        videos: [
            { id: 23, title: 'Poetry Slam', thumbnailUrl: 'https://placehold.co/600x400/1a202c/cbd5e1?text=Literary+1', channelName: 'Lit Society', views: '7K', uploadDate: '2 weeks ago', duration: '45:00' },
            { id: 24, title: 'Storytelling Session', thumbnailUrl: 'https://placehold.co/600x400/2d3748/cbd5e1?text=Literary+2', channelName: 'Lit Society', views: '6K', uploadDate: '2 weeks ago', duration: '30:00' },
        ],
    },
};


// --- Sub-component for a single video card ---
const VideoCard = ({ video }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group border border-gray-700 hover:border-gray-500 hover:-translate-y-1 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
      </div>
      
      {/* Video Details */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-100 leading-snug">
          {video.title}
        </h3>
        <p className="text-sm text-slate-400 mt-2">{video.channelName}</p>
        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
          <span>{video.views} views</span>
          <span>•</span>
          <span>{video.uploadDate}</span>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
export default function VideoListPage() {
  // We now use state to manage the currently selected event.
  // It defaults to the first event in our data object.
  const [eventId, setEventId] = useState(Object.keys(allEventsData)[0]);

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect now runs whenever the `eventId` state changes.
    const fetchEventVideos = () => {
      setLoading(true);
      // We add a timeout to show a loading state, even for local data.
      setTimeout(() => {
        const currentEvent = allEventsData[eventId];
        setEventData(currentEvent);
        setLoading(false);
      }, 500); // 0.5-second delay for a smooth transition
    };

    fetchEventVideos();
  }, [eventId]); // The key change: this effect depends on `eventId`.

  return (
    <div className="bg-gray-900 text-slate-200 min-h-screen font-sans pt-20">
       <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
              display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
      <div className="container mx-auto px-4 py-8">
        
        {/* --- EVENT SWITCHER --- */}
        <div className="mb-12">
          {/* This container enables horizontal scrolling on overflow */}
          <div className="flex items-center gap-4 overflow-x-auto pb-4 px-4 max-w-5xl mx-auto no-scrollbar">
            {Object.keys(allEventsData).map((key) => (
              <button
                key={key}
                onClick={() => setEventId(key)}
                // Added flex-shrink-0 and whitespace-nowrap to prevent buttons from shrinking or wrapping text
                className={`flex-shrink-0 whitespace-nowrap px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out border-2 ${
                  eventId === key
                    ? 'bg-white text-gray-900 border-white'
                    : 'bg-transparent text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                {allEventsData[key].eventName}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional rendering for loading and event data */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
          </div>
        ) : !eventData ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-white">Event Not Found</h2>
            <p className="mt-2 text-slate-400">Could not find video data for the ID: "{eventId}"</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 md:mb-12 text-center border-t border-gray-700 pt-12">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                Videos for {eventData.eventName}
              </h1>
              <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                A collection of recorded sessions, keynotes, and highlights from the event.
              </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {eventData.videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

