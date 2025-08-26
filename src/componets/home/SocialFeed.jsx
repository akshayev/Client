import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { instagramApi } from '../../services/api.js'; // Adjust path if necessary
import { FaInstagram, FaArrowRight } from 'react-icons/fa';

// The URL to your club's main Instagram profile
const instagramProfileUrl = 'https://www.instagram.com/cucekphotographyclub'; // <-- IMPORTANT: CHANGE THIS

// --- Individual Feed Item Component (Unchanged) ---
const FeedItem = ({ item }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }
    }
  };

  return (
    <motion.a
      href={item.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full rounded-lg overflow-hidden group shadow-lg aspect-square" // Enforce square aspect ratio
      variants={itemVariants}
      layout
    >
      <motion.img
        src={item.imageUrl}
        alt={item.caption || 'Instagram post'}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <p className="text-white text-sm line-clamp-3 -mb-2 opacity-0 transform translate-y-4 group-hover:mb-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          {item.caption}
        </p>
        <FaInstagram className="text-white text-2xl absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </motion.a>
  );
};


// --- Professional Loading Skeleton for the Social Feed ---
const SocialFeedSkeleton = () => {
    return (
        <div className="w-full text-center animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* We create 4 placeholder blocks to match the final output */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        // Use aspect-square to match the real feed item style
                        className="w-full bg-neutral-800 rounded-lg aspect-square"
                    ></div>
                ))}
            </div>
            {/* Skeleton for the "Follow" button */}
            <div className="mt-16 inline-flex h-16 w-64 rounded-full bg-neutral-800"></div>
        </div>
    );
};


// --- Main Social Feed Section (Final Version) ---
const SocialFeed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await instagramApi.getAll();
        
        if (response.data && Array.isArray(response.data.data)) {
            // **THE FIX**: Filter out any invalid items before setting state
            const validItems = response.data.data.filter(
                item => item && item.id && item.imageUrl && item.postUrl
            );
            const limitedFeed = validItems.slice(0, 4);
            setFeedItems(limitedFeed);
        } else {
            throw new Error("Invalid data format received from the API.");
        }
      } catch (err) {
        setError('Could not load the Instagram feed.');
        console.error("API Error fetching Instagram feed:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeed();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const renderContent = () => {
    // Return the new skeleton loader when loading
    if (loading) {
      return <SocialFeedSkeleton />;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (feedItems.length === 0) {
      return <p className="text-gray-400">No Instagram posts to display right now.</p>;
    }
    
    // Once loaded, display the animated grid of posts
    return (
      <>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {feedItems.map(item => (
            <FeedItem key={item.id} item={item} />
          ))}
        </motion.div>

        <motion.a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-16 inline-flex items-center gap-3 bg-indigo-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-400 transition-all duration-300 transform shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram />
            <span>Follow The Journey</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </>
    );
  };

  return (
    <section className="bg-black text-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          Our Visual Journey
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg sm:text-xl mb-12 md:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Glimpses from the field, behind the scenes, and our community's best work.
          Catch the latest on our Instagram.
        </motion.p>
        
        {renderContent()}
      </div>
    </section>
  );
};

export default SocialFeed;