import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { videoApi } from '../services/api';

// --- (No changes to VideoCard component) ---
const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const getYouTubeDetails = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.hostname === 'youtu.be'
        ? urlObj.pathname.slice(1)
        : urlObj.searchParams.get('v');
      return videoId ? { id: videoId, embedUrl: `https://www.youtube.com/embed/${videoId}` } : null;
    } catch (e) { console.error("Invalid YouTube URL:", url); return null; }
  };

  const videoDetails = getYouTubeDetails(video.videoLink);
  const thumbnailUrl = videoDetails ? `https://i.ytimg.com/vi/${videoDetails.id}/hqdefault.jpg` : 'https://placehold.co/1920x1080/000000/FFF?text=Video';
  const previewUrl = videoDetails ? `${videoDetails.embedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoDetails.id}` : '';

  return (
    <Link to={`/video/${video.id}`} className="block group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 border border-zinc-800 hover:border-zinc-700 hover:-translate-y-1 cursor-pointer">
        <div className="relative aspect-video overflow-hidden">
          <img src={thumbnailUrl} alt={video.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
          {isHovered && previewUrl && (
            <iframe className="absolute inset-0 w-full h-full pointer-events-none" src={previewUrl} title={`${video.title} preview`} frameBorder="0" allow="autoplay"></iframe>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-base font-bold text-white leading-snug line-clamp-2">{video.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};


const extractApiData = (response) => {
  const dataPayload = response.data?.data;
  if (Array.isArray(dataPayload)) return dataPayload;
  if (dataPayload && Array.isArray(dataPayload.items)) return dataPayload.items;
  if (dataPayload && Array.isArray(dataPayload.data)) return dataPayload.data;
  return [];
};

export default function VideoListPage() {
  const [allVideos, setAllVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Videos');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAndProcessData = async () => {
      setStatus('loading');
      try {
        const response = await videoApi.getAll(1, 1000);
        const videos = extractApiData(response);
        setAllVideos(videos);
        setFilteredVideos(videos);

        const eventNames = [...new Set(videos.map(v => v.event_name).filter(Boolean))].sort();
        setCategories(['All Videos', ...eventNames]);

        setStatus('idle');
      } catch (e) {
        console.error("Failed to fetch initial video data:", e);
        setError('Failed to load video gallery. Please try again later.');
        setStatus('error');
      }
    };
    fetchAndProcessData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All Videos') {
      setFilteredVideos(allVideos);
    } else {
      const newFilteredVideos = allVideos.filter(video => video.event_name === selectedCategory);
      setFilteredVideos(newFilteredVideos);
    }
  }, [selectedCategory, allVideos]);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zinc-400"></div>
        </div>
      );
    }
    if (status === 'error') {
      return <div className="text-center py-10 text-red-400">{error}</div>;
    }
    
    // Create the subtitle dynamically based on the selection
    const subTitle = selectedCategory === 'All Videos'
        ? `Browse from a collection of ${allVideos.length} recorded sessions.`
        : `${filteredVideos.length} videos from the ${selectedCategory} event.`;
    
    return (
      <>
        {/* --- ✨ NEW & IMPROVED HERO/TITLE SECTION ✨ --- */}
        <div className="mb-12 md:mb-16 text-center pt-12 animate-fade-in-up">
            {/* Gradient Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-500">
                {selectedCategory === 'All Videos' ? 'Video Library' : selectedCategory}
            </h1>
            
            {/* Informative Subtitle */}
            <p className="text-lg text-zinc-400 mt-4 max-w-2xl mx-auto">
              {subTitle}
            </p>
            
            {/* Decorative Gradient Accent */}
            <div className="mt-6 mx-auto h-1 w-24 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"></div>
        </div>
        
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVideos.map((video) => <VideoCard key={video.id} video={video} />)}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-zinc-400">No videos found for this selection.</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans pt-20">
      {/* --- Add animation keyframes --- */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {display: none;}
        .no-scrollbar {-ms-overflow-style: none; scrollbar-width: none;}
        
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 min-h-[52px]">
          {status === 'idle' && categories.length > 1 && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 max-w-5xl mx-auto no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out border-2 ${selectedCategory === category
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}