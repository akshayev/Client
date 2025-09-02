// src/components/members/ImageModal.js

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ selectedImage, setSelectedImage }) => {
  if (!selectedImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedImage(null)}
      >
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
          />
          <div className="text-center mt-4">
            <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
            <p className="text-zinc-400 mt-1">{selectedImage.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;