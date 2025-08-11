// src/components/join/HeroSection.js
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ variants }) => (
  <motion.section
    variants={variants}
    initial="hidden"
    animate="visible"
    className="text-center"
  >
    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
      Become a Member
    </h1>
    <p className="text-neutral-400 text-lg mt-4 max-w-2xl mx-auto">
      Join a vibrant community of photographers and artists. Fill out the form below to start your journey with us.
    </p>
  </motion.section>
);

export default HeroSection;