import React from 'react';
import { motion } from 'framer-motion';

// Orchestrates the animation of its children, staggering their appearance.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Defines the animation for each individual word.
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut", // <-- CORRECTED: Replaced the invalid cubic-bezier array
    },
  },
};

const LoadingPage = () => {
  const title = "CUCEK PHOTOGRAPHY CLUB";
  const words = title.split(" ");

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-neutral-200 font-sans overflow-hidden p-4">
      
      {/* Container for the words. It's a flex container that will wrap on smaller screens. */}
      <motion.h1
        className="flex flex-wrap justify-center gap-x-4 sm:gap-x-5 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-normal text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={title} // Improves accessibility
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default LoadingPage;