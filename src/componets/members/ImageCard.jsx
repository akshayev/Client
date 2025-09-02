// src/components/members/ImageCard.js

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid';

/**
 * A self-contained, animated card for a single gallery image.
 *
 * @param {object} image - The image object ({ id, src, title, ... }).
 * @param {function} setSelectedImage - The function to call when the card is clicked.
 */
const ImageCard = ({ image, setSelectedImage }) => {
  return (
    <motion.div
      // layout prop is essential for the filter animation
      layout
      key={image.id}
      className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
      // Animation for when the card appears or disappears
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      // Trigger the modal when the card is clicked
      onClick={() => setSelectedImage(image)}
    >
      {/* The Image itself */}
      <img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />

      {/* The Hover Overlay Effect */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
        <div className="text-center text-white p-2">
          <ArrowsPointingOutIcon className="w-8 h-8 mx-auto" />
          <p className="font-semibold text-sm mt-1 truncate">{image.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCard;