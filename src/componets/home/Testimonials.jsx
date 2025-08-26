import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonialsApi } from '../../services/api.js'; // Adjust path if necessary

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsApi.getAll();
        // FIX 1: Extract the nested 'data' array from the API response
        if (response.data && Array.isArray(response.data.data)) {
            setTestimonials(response.data.data);
        } else {
            // Handle cases where the API response isn't structured as expected
            throw new Error("Invalid data format from API");
        }
      } catch (err) {
        setError('Failed to load testimonials.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setSlideDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setSlideDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="bg-black text-white py-20 lg:py-32 min-h-[400px]">
        <div className="max-w-4xl mx-auto px-6 text-center">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-black text-white py-20 lg:py-32 min-h-[400px]">
        <div className="max-w-4xl mx-auto px-6 text-center text-red-500">{error}</div>
      </section>
    );
  }
  
  if (testimonials.length === 0) {
    return (
      <section className="bg-black text-white py-20 lg:py-32 min-h-[400px]">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">What Our Members Say</h2>
            <p>No testimonials available at the moment.</p>
        </div>
      </section>
    );
  }

  // This check is crucial. It ensures we don't try to access an index that doesn't exist.
  const currentTestimonial = testimonials[activeIndex];
  if (!currentTestimonial) return null; // Or return a fallback UI

  const slideVariants = {
    hidden: (direction) => ({ x: direction === 'right' ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
    visible: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } },
    exit: (direction) => ({ x: direction === 'right' ? '-100%' : '100%', opacity: 0, scale: 0.95, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } }),
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

        <motion.div
          className="relative h-80 md:h-72"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={currentTestimonial.id} // Using a unique ID from the data is better for React's key prop
              custom={slideDirection}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
            >
              {/* FIX 2: Use `imageUrl` instead of `image` */}
              {currentTestimonial.imageUrl && (
                <img
                  src={currentTestimonial.imageUrl}
                  alt={currentTestimonial.name}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white/20"
                />
              )}

              {/* FIX 3: Use `text` instead of `quote` */}
              <blockquote className="flex-grow text-lg md:text-xl italic text-gray-300">
                "{currentTestimonial.text}"
              </blockquote>

              <footer className="mt-4">
                <p className="font-bold text-white">{currentTestimonial.name}</p>
                {/* FIX 4: The API doesn't provide a `title`. You can remove it or display a default value. */}
                {/* <p className="text-sm text-gray-400">{currentTestimonial.title}</p> */}
                 <p className="text-sm text-gray-400">Club Member</p>
              </footer>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex justify-center items-center gap-6">
          <button onClick={prevTestimonial} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <FiChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
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