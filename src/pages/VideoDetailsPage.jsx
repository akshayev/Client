
import { useState, useEffect } from 'react';
// IMPORT useParams TO READ THE URL
import { useParams } from 'react-router-dom';
import { FaShareAlt, FaArrowUp } from 'react-icons/fa';

const UpVote = () => <FaArrowUp className="h-6 w-6" />;
const ShareIcon = () => <FaShareAlt className="h-6 w-6" />;

//Sample data
const ALL_VIDEOS = [
    {
        id: 'romancham-recreation',
        youtubeId: 'R7dVQvPvCJk', // Example: Romancham - Recreation | Cucek Photography Club | Medillin_Co | Film Scene Recreation
        title: 'Romancham - Recreation | Cucek Photography Club | Medillin_Co | Film Scene Recreation',
        eventName: 'Film Scene Recreation',
        description: `A creative recreation of a popular scene from the movie "Romancham" by the talented members of the CUCEK Photography Club.`,
        upvotes: 120
    },
];

function VideoDetailsPage() {
    //  GET THE 'id' FROM THE URL. It matches the ':id' in Route path.
    const { id } = useParams();

    // CREATE STATE TO HOLD THE VIDEO DATA. It starts as null.
    const [videoData, setVideoData] = useState(null);

    // USE useEffect TO FETCH DATA WHEN THE COMPONENT LOADS OR THE 'id' CHANGES
    useEffect(() => {
        const currentVideo = ALL_VIDEOS.find(video => video.id === id);
        // Find the video. If it's not found , set the state to 'not-found'.
        setVideoData(currentVideo || 'not-found');
    }, [id]); // This effect re-runs whenever the 'id' from the URL changes

    // Sample data for suggested videos
    const suggestedVideos = [
        {
            id: 1,
            title: 'Adi Kapyare Kootamani - Recreation | CUCEK Photography Club | Japan | Film Scene Recreation',
            eventName: 'Film Scene Recreation',
            thumbnail: 'https://img.youtube.com/vi/FKBcefyDSSE/0.jpg'
        },
        {
            id: 2,
            title: 'Salala Mobiles - Recreation | CUCEK Photography Club | SomeChillGuys | Film Scene Recreation',
            eventName: 'Film Scene Recreation',
            thumbnail: 'https://img.youtube.com/vi/MzxugaqKY7w/0.jpg'
        },
        {
            id: 3,
            title: 'Thattathin Marayath - Recreation | CUCEK Photography Club | Nandhanam | Film Scene Recreation',
            eventName: 'Film Scene Recreation',
            thumbnail: 'https://img.youtube.com/vi/H96hB-2Fqkg/0.jpg'
        },
        {
            id: 4,
            title: 'Vettam - Recreation | CUCEK Photography Club |Team Bruno | Film Scene Recreation',
            eventName: 'Film Scene Recreation',
            thumbnail: 'https://img.youtube.com/vi/BNXKMFw84L8/0.jpg'
        },
        {
            id: 5,
            title: 'Three(3) - Recreation | CUCEK Photography Club | Japan Tharavad | Film Scene Recreation',
            eventName: 'Film Scene Recreation',
            thumbnail: 'https://img.youtube.com/vi/7_5WZ8el4rk/0.jpg'
        },
    ];
    
// IF THE VIDEO IS NOT FOUND, SHOW A MESSAGE
if (videoData === 'not-found') {
    return <div className="text-white text-center p-10">Video not found.</div>;
}
// SHOW A LOADING MESSAGE until the video data is found
if (!videoData) {
    return <div className="text-white text-center p-10">Loading video...</div>;
}

return (
    <div className="bg-neutral-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Add space above main content */}
        <div className="h-14" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* Main Content: Video Player and Details */}
            <div className="w-full lg:w-2/3">
                {/* Video Player */}
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full rounded-xl shadow-lg"
                        src={`https://www.youtube.com/embed/${videoData.youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Video Title */}
                <h1 className="text-2xl sm:text-3xl font-bold mt-4">
                    {videoData.title}
                </h1>

                {/* Channel Info and Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                    <div className="flex items-center gap-3">
                        <p className="font-semibold text-lg text-gray-300">{videoData.eventName}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full font-semibold">
                            <UpVote /> {videoData.upvotes}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full font-semibold">
                            <ShareIcon /> Share
                        </button>
                    </div>
                </div>

                {/* Description Box */}
                <div className="bg-neutral-800 p-4 rounded-lg mt-6">
                    <p className="mt-2 text-gray-300 whitespace-pre-line">
                        {videoData.description}
                    </p>
                </div>
            </div>

            {/* Sidebar: Suggested Videos */}
            <div className="w-full lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">Related Videos</h2>
                <div className="flex flex-col gap-4">
                    {suggestedVideos.map(video => (
                        <div key={video.id} className="flex gap-3 cursor-pointer hover:bg-neutral-800 p-2 rounded-lg">
                            <img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded-lg" />
                            <div>
                                <h3 className="font-semibold text-md leading-tight">{video.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{video.eventName}</p>
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