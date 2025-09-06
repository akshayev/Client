import React from 'react';
import { motion } from 'framer-motion';

const AlumniCard = ({ alumni }) => {
  // Card animation variant
  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Fallback for broken images
  const handleImageError = (e) => {
    e.target.onerror = null;
    const initial = alumni.name.charAt(0) || '?';
    e.target.src = `https://placehold.co/400/171717/A3BFFA?text=${initial}`;
  };

  return (
    <motion.div
      variants={cardVariant}
      className="flex flex-col items-center text-center group"
    >
      <div className="relative w-40 h-40">
        <img
          src={alumni.photo}
          alt={alumni.name}
          className="w-full h-full rounded-full border-4 border-neutral-800 object-cover shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out transform group-hover:scale-105 group-hover:border-blue-500"
          onError={handleImageError}
        />
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-bold text-neutral-200">{alumni.name}</h3>
        <p className="mt-1 text-sm text-blue-400 font-semibold">
          Batch of {alumni.batch}
        </p>
        <p className="mt-2 text-base text-neutral-400">{alumni.role}</p>
      </div>
    </motion.div>
  );
};

export default AlumniCard;