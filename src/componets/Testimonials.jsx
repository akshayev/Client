import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData } from '../data/testimonialsData'; // Import your data
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Store direction for smarter slide animations
  const [slideDirection, setSlideDirection] = useState('right');

  const nextTestimonial = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const currentTestimonial = testimonialsData[activeIndex];
  
  const slideVariants = {
    hidden: (direction) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
    },
    exit: (direction) => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
    }),
  };

  return (
    <section className="bg-black text-white py-20 lg:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          What Our Members Say
        </motion.h2>

        {/* Carousel Container */}
        <motion.div 
          className="relative h-80 md:h-72" // Fixed height for the carousel area
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={activeIndex}
              custom={slideDirection}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
            >
              {/* Optional Profile Picture */}
              {currentTestimonial.image && (
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white/20"
                />
              )}

              <blockquote className="flex-grow text-lg md:text-xl italic text-gray-300">
                "{currentTestimonial.quote}"
              </blockquote>

              <footer className="mt-4">
                <p className="font-bold text-white">{currentTestimonial.name}</p>
                <p className="text-sm text-gray-400">{currentTestimonial.title}</p>
              </footer>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Controls */}
        <div className="mt-8 flex justify-center items-center gap-6">
          <button onClick={prevTestimonial} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <FiChevronLeft size={24} />
          </button>
          
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button onClick={nextTestimonial} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;