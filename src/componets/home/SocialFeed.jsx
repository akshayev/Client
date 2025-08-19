import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { instagramApi } from '../../services/api.js'; // Adjust path if necessary
import { FaInstagram, FaArrowRight } from 'react-icons/fa';

// The URL to your club's main Instagram profile
const instagramProfileUrl = 'https://www.instagram.com/cucekphotographyclub'; // <-- IMPORTANT: CHANGE THIS

// --- Individual Feed Item Component (No changes needed here) ---
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
      className="relative block w-full rounded-lg overflow-hidden group shadow-lg"
      variants={itemVariants}
      layout
    >
      <motion.img
        src={item.imageUrl}
        alt={item.caption || 'Instagram post'} // Use caption for alt text, with a fallback
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
        <p className="text-white text-sm -mb-2 opacity-0 transform translate-y-4 group-hover:mb-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          {item.caption}
        </p>
        <FaInstagram className="text-white text-2xl absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </motion.a>
  );
};


// --- Main Social Feed Section (Enhanced with API logic) ---
const SocialFeed = () => {
  // State for API data, loading, and errors
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await instagramApi.getAll();
        // Assuming the data array is nested under response.data.data, like the testimonials API
        if (response.data && Array.isArray(response.data.data)) {
            setFeedItems(response.data.data);
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
  }, []); // Empty dependency array ensures this runs only once

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  // Create columns for a masonry layout from the fetched feedItems
  const numColumns = 4;
  const columns = Array.from({ length: numColumns }, () => []);
  
  // This check is important: only process feedItems if it's an array
  if (Array.isArray(feedItems)) {
    feedItems.forEach((item, i) => {
        columns[i % numColumns].push(item);
    });
  }

  // --- Render content based on loading/error state ---
  const renderContent = () => {
    if (loading) {
      return <p className="text-gray-400">Loading feed...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (feedItems.length === 0) {
      return <p className="text-gray-400">No Instagram posts to display right now.</p>;
    }

    // Main content when data is available
    return (
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-4 md:gap-6">
            {col.map(item => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
        ))}
      </motion.div>
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

        <motion.a
          href={instagramProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-16 inline-flex items-center gap-3 bg-indigo-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-400 transition-all duration-300 transform shadow-lg"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInstagram />
          <span>Follow The Journey</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
};

export default SocialFeed;