// src/components/gallery/CoolGallery.js
import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

import { galleryData } from '../../data/galleryData'; // Adjust path if needed
import ImageCard from './ImageCard';
import ExpandedImageView from './ExpandedImageView';

const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  stiffness: 300,
  damping: 50,
  mass: 0.5,
};

const CoolGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, SPRING_OPTIONS);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  
  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(14, 165, 233, 0.15),
      transparent 80%
    )
  `;
  
  const parallaxX = useTransform(dragXSpring, [-1000, 1000], [-150, 150]);

  useLayoutEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.scrollWidth;
        const viewportWidth = containerRef.current.offsetWidth;
        const maxDrag = containerWidth / 2 - viewportWidth / 2;
        setDragConstraints({ right: DRAG_BUFFER, left: -(maxDrag * 1.5) });
      }
    };
    calculateConstraints();
    window.addEventListener('resize', calculateConstraints);
    return () => window.removeEventListener('resize', calculateConstraints);
  }, []);

  const displayImages = galleryData.map((item, index) => ({
    ...item,
    uniqueId: `${item.id}-${index}`,
  }));
  
  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white font-sans"
    >
      <motion.div 
        className="pointer-events-none absolute -inset-px z-30 transition duration-300" 
        style={{ background }} 
      />
      
      <motion.div
        style={{ x: parallaxX }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <p className="text-center text-5xl md:text-7xl font-black text-neutral-800 pointer-events-none">
          EXPLORE THE GALLERY
        </p>
      </motion.div>
      
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={dragConstraints}
        style={{ x: dragXSpring }}
        className="relative z-10 h-full flex items-center gap-4 md:gap-8 px-12 cursor-grab active:cursor-grabbing"
      >
        {displayImages.map((img, idx) => (
          <ImageCard
            key={img.uniqueId} 
            image={img}
            onClick={() => setSelectedImage(img)}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: idx * 0.07, ease: "circOut" } }}
            className={idx % 2 === 0 ? 'mb-24' : 'mt-24'}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <ExpandedImageView image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoolGallery;