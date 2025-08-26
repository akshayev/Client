import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { heroApi } from '../../services/api.js'; // <-- IMPORTANT: Update this path

const imageVariants = {
  initial: { opacity: 0, scale: 1.1, x: 50 },
  animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } },
  exit: { opacity: 0, scale: 1.1, x: -50, transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } },
};

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } },
};


const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const response = await heroApi.getAll();

        // THE FIX: Access the 'data' property inside the response object
        const imagesArray = response.data.data;

        if (Array.isArray(imagesArray)) {
          // Slice the correct array and update the state
          setHeroImages(imagesArray.slice(0, 5));
        } else {
          throw new Error("API response did not contain a valid array of images.");
        }

      } catch (error) {
        console.error("Error fetching hero images:", error);
        setError("Failed to load images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  const nextImage = () => {
    if (heroImages.length === 0) return;
    setImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    if (heroImages.length === 0) return;
    setImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  
  useEffect(() => {
    if (heroImages.length > 0) {
      const timer = setInterval(nextImage, 6000);
      return () => clearInterval(timer);
    }
  }, [heroImages.length, imageIndex]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white">Loading...</div>;
  }
  
  if (error) {
      return <div className="h-screen w-full flex items-center justify-center bg-black text-red-500">{error}</div>;
  }
  
  if (heroImages.length === 0) {
      return <div className="h-screen w-full flex items-center justify-center bg-black text-white">No images found.</div>
  }

  const currentImage = heroImages[imageIndex];

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={imageIndex}
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
           {/* This now works because your API provides 'imageUrl' */}
           <img
            src={currentImage.imageUrl} 
            alt={currentImage.title}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            className="w-full h-full object-cover"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-20 max-w-5xl text-center px-4">
        <motion.div key={imageIndex} variants={textVariants} initial="initial" animate="animate">
          {/* This works because your API provides 'title' */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white" 
            style={{ textShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}
            variants={textVariants}
          >
            {currentImage.title}
          </motion.h1>
          {/* This works because your API provides 'subtitle' */}
          <motion.p 
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200" 
            style={{ textShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)' }}
            variants={textVariants}
          >
            {currentImage.subtitle}
          </motion.p>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button onClick={prevImage} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><FiChevronLeft size={24} /></button>
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              key={imageIndex}
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </div>
          <button onClick={nextImage} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><FiChevronRight size={24} /></button>
      </div>
    </section>
  );
};

export default Hero;