import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShareAlt, FaArrowUp, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { videoApi } from '../services/api';
import { toast } from 'react-toastify';

const UpVote = () => <FaArrowUp className="h-6 w-6" />;
const ShareIcon = () => <FaShareAlt className="h-5 w-4" />;

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
    const { id } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [hoveredVideoId, setHoveredVideoId] = useState(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            if (!id) return;
            setStatus('loading');
            setIsDescriptionExpanded(false);
            window.scrollTo(0, 0); 
            try {
                const videoResponse = await videoApi.getById(id);
                const currentVideo = videoResponse.data.data;
                setVideoData(currentVideo);

                const allVideosResponse = await videoApi.getAll(1, 100);
                const allVideos = allVideosResponse.data?.data?.data || [];

                const related = allVideos.filter(
                    (v) => v.event_name === currentVideo.event_name && v.id !== currentVideo.id
                );
                setSuggestedVideos(related.slice(0, 5));

                setStatus('idle');
            } catch (err) {
                console.error("Failed to fetch video data:", err);
                setError("Could not load video. It may have been removed.");
                setStatus('error');
            }
        };

        fetchVideoDetails();
    }, [id]);

    const handleShare = async () => {
        const shareData = {
            title: videoData.title,
            text: `Check out this video: ${videoData.title}`,
            url: window.location.href
        };

        if (navigator.share) {
            try { await navigator.share(shareData); }
            catch (err) { console.error('Share failed:', err); }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
            } catch (err) {
                toast.error('Could not copy link.');
            }
        }
    };

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

    const embedUrl = getYouTubeEmbedUrl(videoData.videoLink);
    // ✨ --- Add modestbranding=1 for the cleanest possible player --- ✨
    const playerUrl = embedUrl ? `${embedUrl}?autoplay=1&rel=0&modestbranding=1` : '';

    return (
        <div className="bg-neutral-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="h-14" />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="w-full lg:w-2/3">
                    <div className="aspect-video w-full">
                        {embedUrl ? (
                            <iframe 
                                className="w-full h-full rounded-xl shadow-lg" 
                                src={playerUrl} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full rounded-xl shadow-lg bg-black flex items-center justify-center">Invalid Video URL</div>
                        )}
                    </div>

                    <div className="mt-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-semibold mb-2">
                            <FaCalendarAlt />
                            <span>{videoData.event_name || 'General'}</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                            {videoData.title}
                        </h1>
                    </div>

                    <div className="flex justify-end items-center mt-4">
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full font-semibold transition-colors" onClick={handleShare}>
                                <ShareIcon /> Share
                            </button>
                        </div>
                    </div>

                    {videoData.description && (
                        <div className="bg-neutral-800 p-4 rounded-xl mt-6 cursor-pointer hover:bg-neutral-700 transition-colors duration-200" onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                            <div className="flex items-center gap-4 font-bold text-sm mb-2 text-gray-300">
                                <div className='flex items-center gap-1.5'><FaEye /><span>{videoData.views || '1.2M views'}</span></div>
                                <span>{videoData.uploadDate || '2 weeks ago'}</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300`}>
                                <p className={`text-gray-300 whitespace-pre-line ${!isDescriptionExpanded ? 'line-clamp-2' : ''}`}>
                                    {videoData.description}
                                </p>
                            </div>
                            <button className="font-bold text-sm mt-2 text-white">
                                {isDescriptionExpanded ? 'Show less' : '...more'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Related Videos</h2>
                    <div className="flex flex-col gap-4">
                        {suggestedVideos.map(video => {
                            const videoEmbedUrl = getYouTubeEmbedUrl(video.videoLink);
                            const thumbId = videoEmbedUrl?.split('/').pop();
                            const thumbnailUrl = thumbId ? `https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg` : '';
                            const isHovered = hoveredVideoId === video.id;
                            const previewUrl = thumbId ? `${videoEmbedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${thumbId}` : '';

                            return (
                                <Link
                                    to={`/video/${video.id}`}
                                    key={video.id}
                                    className="flex gap-3 hover:bg-neutral-800 p-2 rounded-lg transition-colors"
                                    onMouseEnter={() => setHoveredVideoId(video.id)}
                                    onMouseLeave={() => setHoveredVideoId(null)}
                                >
                                    <div className="relative w-40 h-24 object-cover rounded-lg bg-black flex-shrink-0 overflow-hidden">
                                        <img src={thumbnailUrl} alt={video.title} className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
                                        {isHovered && previewUrl && (
                                            <iframe className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none" src={previewUrl} title={`${video.title} preview`} frameBorder="0" allow="autoplay"></iframe>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-md leading-tight line-clamp-2">{video.title}</h3>
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