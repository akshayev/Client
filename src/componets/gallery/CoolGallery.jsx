// src/components/gallery/CoolGallery.jsx
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

import { galleryApi } from '../../services/api.js'; // Adjust path if needed
import ImageCard from './ImageCard';
import ExpandedImageView from './ExpandedImageView';

const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  stiffness: 300,
  damping: 50,
  mass: 0.5,
};

const CoolGallery = () => {
  // --- STATE FOR API DATA ---
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, SPRING_OPTIONS);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // --- DATA FETCHING EFFECT ---
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await galleryApi.getAll();
        const items = response.data.data.items || [];

        // Format API data to match component props (imageUrl -> src) and add a unique ID
        const formattedItems = items.map((item, index) => ({
          ...item,
          src: item.imageUrl,
          uniqueId: `${item.id}-${index}`, // Keep uniqueId for framer-motion's layoutId
        }));
        
        setImages(formattedItems);
        setError(null);
      } catch (err) {
        setError('Failed to load the gallery. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- MOUSE MOVE AND PARALLAX EFFECTS ---
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

  // --- DRAG CONSTRAINTS CALCULATION ---
  useLayoutEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && images.length > 0) {
        const containerWidth = containerRef.current.scrollWidth;
        const viewportWidth = containerRef.current.offsetWidth;
        const maxDrag = containerWidth / 2 - viewportWidth / 2;
        setDragConstraints({ right: DRAG_BUFFER, left: -(maxDrag * 1.5) });
      }
    };
    calculateConstraints();
    window.addEventListener('resize', calculateConstraints);
    return () => window.removeEventListener('resize', calculateConstraints);
  }, [images]);

  // --- ARROW BUTTON CLICK HANDLERS ---
  const handlePrev = () => {
    if (containerRef.current) {
      const currentX = dragX.get();
      const newX = Math.min(currentX + containerRef.current.offsetWidth, dragConstraints.right);
      dragX.set(newX);
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      const currentX = dragX.get();
      const newX = Math.max(currentX - containerRef.current.offsetWidth, dragConstraints.left);
      dragX.set(newX);
    }
  };

  // --- UPDATE BUTTON DISABLED STATE ON DRAG ---
  useEffect(() => {
    const unsubscribe = dragXSpring.on("change", (latest) => {
      setCanScrollPrev(latest < dragConstraints.right - 1);
      setCanScrollNext(latest > dragConstraints.left + 1);
    });
    return () => unsubscribe();
  }, [dragConstraints, dragXSpring]);

  // --- CONDITIONAL RENDERING FOR LOADING AND ERROR STATES ---
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-950 text-white font-sans">
        <p>Loading Gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-950 text-white font-sans">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
        {images.map((img, idx) => (
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

      {/* --- ARROW BUTTONS --- */}
      <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none px-4">
        <button
          onClick={handlePrev}
          disabled={!canScrollPrev}
          className="pointer-events-auto p-2 bg-neutral-800/50 text-white rounded-full transition-opacity duration-300 disabled:opacity-30 hover:bg-neutral-700/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={!canScrollNext}
          className="pointer-events-auto p-2 bg-neutral-800/50 text-white rounded-full transition-opacity duration-300 disabled:opacity-30 hover:bg-neutral-700/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ExpandedImageView image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoolGallery;