// src/components/members/PortfolioGallery.js

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCard from './ImageCard.jsx'; // <-- IMPORT THE NEW COMPONENT

const PortfolioGallery = ({ gallery, setSelectedImage }) => {
  return (
    <motion.div 
      layout
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4"
    >
      <AnimatePresence>
        {gallery.map((image) => (
          // Use the ImageCard component here for each image
          <ImageCard 
            key={image.id} 
            image={image} 
            setSelectedImage={setSelectedImage} 
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioGallery;