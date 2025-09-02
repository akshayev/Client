import React from 'react';
import {  FaShareAlt, FaArrowUp } from 'react-icons/fa';

const LikeIcon = () => <FaArrowUp className="h-6 w-6" />;
const ShareIcon = () => <FaShareAlt className="h-6 w-6" />;


//Sample data
function VideoDetailsPage() {
    const videoData = {
        id: 'dQw4w9WgXcQ',// Example: Rick Astley's "Never Gonna Give You Up"
        title: 'Onam Celebrations at CUCEK: Tradition, Culture & Festivities',
        channel: {
            name: 'React Developers',
            avatar: 'https://via.placeholder.com/48',
            subscribers: '1.2M',
        },
        // views: '2,345,678 views',
        // uploadDate: 'Sep 2, 2025',
        description: `Onam @ CUCEK celebrates tradition and togetherness with vibrant pookkalam, cultural performances, fun games, and Onasadya. This gallery captures joyful moments, colors, and the festive spirit of Onam at CUCEK.`,
    };

    const suggestedVideos = [
        { id: 1, title: 'React Hooks Tutorial', channel: 'CodeMaster', thumbnail: 'https://via.placeholder.com/160x90' },
        { id: 2, title: 'TailwindCSS Crash Course', channel: 'CSS Weekly', thumbnail: 'https://via.placeholder.com/160x90' },
        { id: 3, title: 'Full Stack Development in 2025', channel: 'Future Coder', thumbnail: 'https://via.placeholder.com/160x90' },
        { id: 4, title: 'Building a Video Listing Page', channel: 'React Developers', thumbnail: 'https://via.placeholder.com/160x90' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-4  sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                
                {/* Main Content: Video Player and Details */}
                <div className="w-full lg:w-2/3">
                    {/* Video Player */}
                    <div className="aspect-video w-full">
                        <iframe
                            className="w-full h-full rounded-xl shadow-lg"
                            src={`https://www.youtube.com/embed/${videoData.id}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Video Title */}
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
                        {videoData.title}
                    </h1>

                    {/* Channel Info and Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                        {/* <div className="flex items-center gap-3">
                            <img src={videoData.channel.avatar} alt={videoData.channel.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-semibold text-lg">{videoData.channel.name}</p>
                                <p className="text-gray-500 text-sm">{videoData.channel.subscribers} subscribers</p>
                            </div>
                        </div> */}
                        <div className="flex items-center gap-2 mt-4 sm:mt-0">
                             <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-semibold">
                                <LikeIcon /> Up Vote
                            </button>
                            {/* <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-semibold">
                                <ShareIcon /> Share
                            </button> */}
                        </div>
                    </div>

                    {/* Description Box */}
                    <div className="bg-gray-100 p-4 rounded-lg mt-6">
                        {/* <p className="font-semibold">{videoData.views} &bull; {videoData.uploadDate}</p> */}
                        <p className="mt-2 text-gray-700 whitespace-pre-line">
                            {videoData.description}
                        </p>
                    </div>
                </div>

                {/* Sidebar: Suggested Videos */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Up Next</h2>
                    <div className="flex flex-col gap-4">
                        {suggestedVideos.map(video => (
                            <div key={video.id} className="flex gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                                <img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded-lg" />
                                <div>
                                    <h3 className="font-semibold text-md leading-tight">{video.title}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{video.channel}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default VideoDetailsPage;