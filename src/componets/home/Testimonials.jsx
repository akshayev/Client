import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonialsApi } from '../../services/api.js'; // Adjust path if necessary

// --- Professional Loading Skeleton for the Testimonials Section ---
const TestimonialsSkeleton = () => {
    return (
        <section className="bg-black text-white py-20 lg:py-32 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center animate-pulse">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
                    What Our People Say
                </h2>
                
                {/* Main Content Box Skeleton */}
                <div className="relative h-80 md:h-72 w-full bg-zinc-900/50 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center">
                    {/* Avatar Placeholder */}
                    <div className="w-20 h-20 rounded-full bg-neutral-800 mb-4"></div>
                    
                    {/* Quote Placeholder */}
                    <div className="flex-grow w-full space-y-2">
                        <div className="h-5 bg-neutral-800 rounded w-full"></div>
                        <div className="h-5 bg-neutral-800 rounded w-full"></div>
                        <div className="h-5 bg-neutral-800 rounded w-5/6 mx-auto"></div>
                    </div>

                    {/* Footer Placeholder */}
                    <div className="mt-4 w-full flex flex-col items-center gap-2">
                        <div className="h-5 bg-neutral-800 rounded w-1/3"></div>
                        <div className="h-4 bg-neutral-800 rounded w-1/4"></div>
                    </div>
                </div>

                {/* Navigation Skeleton */}
                <div className="mt-8 flex justify-center items-center gap-6">
                    <div className="p-2 h-10 w-10 rounded-full bg-white/10"></div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    </div>
                    <div className="p-2 h-10 w-10 rounded-full bg-white/10"></div>
                </div>
            </div>
        </section>
    );
};


const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await testimonialsApi.getAll();
        if (response.data && Array.isArray(response.data.data)) {
            // **THE FIX**: Filter data to ensure robustness against API errors
            const validTestimonials = response.data.data.filter(
                item => item && item.id && item.name && item.text
            );
            setTestimonials(validTestimonials);
        } else {
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

  // --- RENDER LOGIC UPDATE ---
  if (loading) {
    return <TestimonialsSkeleton />;
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
            <p className="text-gray-400">No testimonials available at the moment.</p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[activeIndex];
  if (!currentTestimonial) return null; 

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
          What Our People Say
        </motion.h2>

        <motion.div className="relative h-80 md:h-72" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={currentTestimonial.id} 
              custom={slideDirection}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
            >
              {currentTestimonial.imageUrl && (
                <img
                  src={currentTestimonial.imageUrl}
                  alt={currentTestimonial.name}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white/20"
                />
              )}
              <blockquote className="flex-grow text-lg md:text-xl italic text-gray-300">"{currentTestimonial.text}"</blockquote>
              <footer className="mt-4">
                <p className="font-bold text-white">{currentTestimonial.name}</p>
                {/* <p className="text-sm text-gray-400">Club Member</p> */}
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
                className={`w-2 h-2 rounded-full transition-colors ${activeIndex === index ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'}`}
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