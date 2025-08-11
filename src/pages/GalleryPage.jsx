import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { FiX } from 'react-icons/fi';

// Make sure this path is correct for your project structure
// You can create this file and populate it with your own image data.
// Example: export const galleryData = [{ id: 1, src: '/path/to/image.jpg', title: 'Title', description: 'Description' }, ...];
import { galleryData } from '../data/galleryData.js'; 

// --- Configuration ---
const DRAG_BUFFER = 50; // Increased buffer for a more spacious feel
const SPRING_OPTIONS = {
  stiffness: 300,
  damping: 50,
  mass: 0.5,
};

// --- Main Gallery Component ---
const CoolGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  // --- Mouse-tracking gradient background ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  // --- Drag mechanics ---
  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, SPRING_OPTIONS);
  
  // Skew effect is cool, but let's try a parallax for the text instead
  const parallaxX = useTransform(dragXSpring, [-1000, 0, 1000], [-150, 0, 150]);


  useLayoutEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.scrollWidth;
        const viewportWidth = containerRef.current.offsetWidth;
        // Adjust calculation for a more centered feel
        const maxDrag = containerWidth / 2 - viewportWidth / 2;
        setDragConstraints({ right: DRAG_BUFFER, left: -maxDrag * 1.5 }); // Allow more drag
      }
    };
    calculateConstraints();
    const debouncedCalculateConstraints = () => setTimeout(calculateConstraints, 200);
    window.addEventListener('resize', debouncedCalculateConstraints);
    return () => window.removeEventListener('resize', debouncedCalculateConstraints);
  }, []);

  const displayImages = galleryData.map((item, index) => ({
    ...item,
    uniqueId: `${item.id}-${index}`,
  }));
  
  // No need to double images for this layout, but you could if you want an infinite feel
  
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
          EXPLORE THE VOID
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
            // Stagger the initial animation of each card
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: idx * 0.07, ease: "circOut" } }}
            // Alternate vertical alignment for a masonry effect
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

// --- Reusable Image Card Component (with enhanced hover effects) ---
const ImageCard = ({ image, onClick, className, ...props }) => {
    const cardRef = useRef(null);
    const motionValue = useMotionValue(0);
    const rotateX = useTransform(motionValue, [-20, 20], [-5, 5]);
    const rotateY = useTransform(motionValue, [-20, 20], [5, -5]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;
        motionValue.set(x);
        motionValue.set(y);
    }
    
    const handleMouseLeave = () => {
        motionValue.set(0)
    }

    return(
        <motion.div
            {...props}
            ref={cardRef}
            layoutId={`card-${image.uniqueId}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`group relative w-64 h-96 md:w-72 md:h-[450px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 ${className}`}
        >
            <motion.img
                src={image.src}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover z-0"
                style={{ transform: "translateZ(-10px) scale(1.15)" }} // 3D effect
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-shadow">
                <h3 className="text-xl font-bold">{image.title}</h3>
                <p className="text-neutral-400 text-sm">{image.description.substring(0, 30)}...</p>
            </div>
        </motion.div>
    );
};


// --- Expanded Image View Component (Adjusted for Portrait Images) ---
const ExpandedImageView = ({ image, onClose }) => (
  <>
    {/* Background overlay */}
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md"
    />
    
    {/* Main modal content area that centers its child */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* New responsive wrapper for image and text */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 w-full max-w-7xl max-h-[90vh]">

        {/* Image container with the layout animation and responsive sizing */}
        <motion.div
          layoutId={`card-${image.uniqueId}`}
          className="relative w-full lg:w-3/5 h-auto flex-shrink-0 rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl"
        >
          {/* Constrain image height to prevent overflow */}
          <motion.img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-contain max-h-[85vh]" // Allow full height within limits
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        
        {/* Text container with responsive sizing and alignment */}
        <motion.div
          className="w-full lg:w-2/5 flex-shrink-0 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4, ease: "easeOut" } }}
          exit={{ opacity: 0, y: 20, transition: { ease: "easeIn" } }}
        >
          <h2 className="text-3xl font-bold">{image.title}</h2>
          <p className="max-w-xl mt-2 text-neutral-300 mx-auto lg:mx-0">{image.description}</p>
        </motion.div>

      </div>
      
      {/* Close button remains fixed to the corner of the viewport */}
      <motion.button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { delay: 0.25, ease: "circOut" } }}
        exit={{ scale: 0, opacity: 0, transition: { ease: "circIn" } }}
      >
        <FiX size={24} />
      </motion.button>
    </div>
  </>
);

export default CoolGallery;