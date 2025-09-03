// highlight-start
// THIS IS THE CORRECTED LINE: 'inuseState' is now 'useState' and it's wrapped in curly braces.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// highlight-end
import { videoApi } from '../services/api';

// --- (No changes to VideoCard sub-component) ---
const VideoCard = ({ video }) => {
  const getYouTubeId = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === 'youtu.be' ? urlObj.pathname.slice(1) : urlObj.searchParams.get('v');
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
    <Link to={`/video/${video.id}`} className="block">
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
    </Link>
  );
};

// --- (No changes to the data extraction utility) ---
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
    return (
      <>
        <div className="mb-8 md:mb-12 text-center border-t border-zinc-800 pt-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            {selectedCategory === 'All Videos' ? 'All Videos' : `Videos for ${selectedCategory}`}
          </h1>
          <p className="text-lg text-zinc-400 mt-3 max-w-2xl mx-auto">
            {selectedCategory === 'All Videos'
              ? 'A complete collection of all recorded sessions and highlights.'
              : `A collection of recorded sessions from the ${selectedCategory} event.`}
          </p>
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
      <style>{`.no-scrollbar::-webkit-scrollbar {display: none;} .no-scrollbar {-ms-overflow-style: none; scrollbar-width: none;}`}</style>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 min-h-[52px]">
          {status === 'idle' && categories.length > 1 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-4 px-4 max-w-5xl mx-auto no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 whitespace-nowrap px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out border-2 ${selectedCategory === category
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