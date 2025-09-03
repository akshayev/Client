import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShareAlt, FaArrowUp } from 'react-icons/fa';
// Import your API service
import { videoApi } from '../services/api';

const UpVote = () => <FaArrowUp className="h-6 w-6" />;
const ShareIcon = () => <FaShareAlt className="h-6 w-6" />;

// Helper function to get embeddable URL
const getYouTubeEmbedUrl = (url) => {
    try {
        const urlObj = new URL(url);
        const videoId = urlObj.hostname === 'youtu.be'
            ? urlObj.pathname.slice(1)
            : urlObj.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (e) {
        console.error("Invalid YouTube URL:", url);
        return null;
    }
};


function VideoDetailsPage() {
    // Get the 'id' from the URL.
    const { id } = useParams();

    // State for the main video, suggested videos, and loading/error status
    const [videoData, setVideoData] = useState(null);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    // Fetch data when the component loads or the 'id' changes
    useEffect(() => {
        const fetchVideoDetails = async () => {
            if (!id) return;
            setStatus('loading');
            try {
                // Fetch the main video by its ID
                const videoResponse = await videoApi.getById(id);
                const currentVideo = videoResponse.data.data;
                setVideoData(currentVideo);

                // Fetch all videos to find related ones
                const allVideosResponse = await videoApi.getAll(1, 100); // Or use homepage endpoint
                const allVideos = allVideosResponse.data?.data?.data || [];
                
                // Filter for suggested videos: same event, but not the current video
                const related = allVideos.filter(
                    (v) => v.event_name === currentVideo.event_name && v.id !== currentVideo.id
                );
                setSuggestedVideos(related.slice(0, 5)); // Show up to 5 suggestions

                setStatus('idle');
            } catch (err) {
                console.error("Failed to fetch video data:", err);
                setError("Could not load video. It may have been removed.");
                setStatus('error');
            }
        };

        fetchVideoDetails();
    }, [id]); // re-runs whenever the 'id' from the URL changes

    // --- Conditional Rendering for Loading and Error States ---
    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-screen bg-neutral-900">
                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (status === 'error' || !videoData) {
        return <div className="text-white text-center p-10">{error || "Video not found."}</div>;
    }
    
    // --- Main Render ---
    const embedUrl = getYouTubeEmbedUrl(videoData.videoLink);

    return (
        <div className="bg-neutral-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="h-14" />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* Main Content: Video Player and Details */}
                <div className="w-full lg:w-2/3">
                    {/* Video Player */}
                    <div className="aspect-video w-full">
                       {embedUrl ? (
                         <iframe
                            className="w-full h-full rounded-xl shadow-lg"
                            src={embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                       ) : (
                        <div className="w-full h-full rounded-xl shadow-lg bg-black flex items-center justify-center">Invalid Video URL</div>
                       )}
                    </div>

                    {/* Video Title */}
                    <h1 className="text-2xl sm:text-3xl font-bold mt-4">
                        {videoData.title}
                    </h1>

                    {/* Channel Info and Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                        <div className="flex items-center gap-3">
                            <p className="font-semibold text-lg text-gray-300">{videoData.event_name || 'General'}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 sm:mt-0">
                            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full font-semibold">
                                <UpVote /> {videoData.upvotes || 0}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full font-semibold">
                                <ShareIcon /> Share
                            </button>
                        </div>
                    </div>

                    {/* Description Box */}
                    {videoData.description && (
                         <div className="bg-neutral-800 p-4 rounded-lg mt-6">
                            <p className="mt-2 text-gray-300 whitespace-pre-line">
                                {videoData.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar: Suggested Videos */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Related Videos</h2>
                    <div className="flex flex-col gap-4">
                        {suggestedVideos.map(video => {
                            const thumbId = getYouTubeEmbedUrl(video.videoLink)?.split('/').pop();
                            const thumbnailUrl = thumbId ? `https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg` : '';
                            return (
                                <Link to={`/video/${video.id}`} key={video.id} className="flex gap-3 hover:bg-neutral-800 p-2 rounded-lg">
                                    <img src={thumbnailUrl} alt={video.title} className="w-40 h-24 object-cover rounded-lg bg-black" />
                                    <div>
                                        <h3 className="font-semibold text-md leading-tight">{video.title}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{video.event_name}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoDetailsPage;