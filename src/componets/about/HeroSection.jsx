// src/components/HeroSection.js
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="relative h-screen w-full flex justify-center items-center bg-black overflow-hidden">
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1521100350734-66671a8c3d66?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ scale: 1.2, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
    />
    <div className="absolute inset-0 bg-black/60 z-10" />

    <motion.div
      className="text-center z-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white"
        style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
      >
        For the Shutterbugs.
      </motion.h1>
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
        }}
        className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-neutral-400"
      >
        By the Shutterbugs.
      </motion.h1>
    </motion.div>
  </section>
);

export default HeroSection;