import React from 'react';
import { motion } from 'framer-motion';

// This variant controls the container and orchestrates the animation of its children.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // The `staggerChildren` property creates a sequence effect.
      // Each child's animation will be delayed by this amount.
      staggerChildren: 0.15,
    },
  },
};

// This variant defines how each individual letter animates.
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Start 50px below its final position
    filter: 'blur(12px)', // Start with a heavy blur
  },
  visible: {
    opacity: 1,
    y: 0, // Animate to its final Y position
    filter: 'blur(0px)', // Animate to be sharp and in focus
    transition: {
      // Defines the physics and duration of the animation for each letter
      type: 'spring',
      damping: 12,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white font-sans overflow-hidden">
      
      {/* Container for the letters, which applies the staggered animation */}
      <motion.div
        className="flex gap-4 text-8xl font-bold tracking-widest text-sky-400"
        variants={containerVariants}
        initial="hidden" // The initial state before animation
        animate="visible" // The state to animate to
      >
        {/* Each letter is a motion component that uses the letterVariants */}
        <motion.span variants={letterVariants}>C</motion.span>
        <motion.span variants={letterVariants}>P</motion.span>
        <motion.span variants={letterVariants}>C</motion.span>
      </motion.div>
    </div>
  );
};

export default LoadingPage;