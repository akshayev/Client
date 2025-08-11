import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// --- CUSTOMIZE: Add your club's best photos here ---
const heroImages = [
  {
    src: 'https://cdn.pixabay.com/photo/2023/06/05/13/57/cat-8042346_1280.jpg',
    title: 'Capturing Moments',
    subtitle: 'Where every click tells a story.'
  },
  {
    src: 'https://cdn.pixabay.com/photo/2020/06/14/15/31/leaf-5298312_1280.jpg',
    title: 'Exploring Perspectives',
    subtitle: 'Discover the world through a new lens.'
  },
  {
    src: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
    title: 'Mastering the Craft',
    subtitle: 'From beginner to pro, we grow together.'
  },
];

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

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  
  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(nextImage, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const currentImage = heroImages[imageIndex];

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden bg-black">
      {/* Background Image Carousel */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={imageIndex}
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
           <img
            src={currentImage.src}
            alt={currentImage.title}
            className="w-full h-full object-cover"
          />
           {/* Darkening overlay for text readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl text-center px-4">
        <motion.div key={imageIndex} variants={textVariants} initial="initial" animate="animate">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white" 
            style={{ textShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}
            variants={textVariants}
          >
            {currentImage.title}
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200" 
            style={{ textShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)' }}
            variants={textVariants}
          >
            {currentImage.subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Navigation and Progress Bar */}
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