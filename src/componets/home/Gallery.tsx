import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData, filterCategories } from '../../data/galleryData'; // Import data
import { FiX, FiArrowRight } from "react-icons/fi";

// --- Gallery Item Component (Unchanged) ---
const GalleryItem = ({ item, onSelect }) => (
  <motion.div
    layoutId={`card-${item.id}`}
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    className="relative rounded-lg overflow-hidden cursor-pointer group"
    onClick={() => onSelect(item)}
  >
    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
      <h3 className="text-white text-lg font-semibold">{item.title}</h3>
    </div>
  </motion.div>
);

// --- Lightbox Component (Unchanged) ---
const Lightbox = ({ item, onClose }) => (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      layoutId={`card-${item.id}`}
      className="relative bg-zinc-900 rounded-xl max-w-4xl max-h-[90vh] w-auto h-auto flex flex-col md:flex-row overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={item.src} alt={item.title} className="object-contain md:w-2/3" />
      <div className="p-6 text-white w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{item.category}</p>
        <p className="text-gray-300">{item.description}</p>
      </div>
    </motion.div>
    <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl">
      <FiX />
    </button>
  </motion.div>
);

// --- Main Gallery Section Component (MODIFIED) ---
const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(8);

  const filteredItems = useMemo(() => 
    activeFilter === 'All' 
      ? galleryData 
      : galleryData.filter(item => item.category === activeFilter),
    [activeFilter]
  );
  
  useEffect(() => {
      setItemsToShow(8);
  }, [activeFilter]);

  const visibleItems = filteredItems.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredItems.length;

  return (
    <section id="works" className="bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title & Filters (Unchanged) */}
        <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          Our Work
        </motion.h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Explore our diverse portfolio. Click a category to filter or an image to see details.
        </p>
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
            {filterCategories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 text-sm md:text-base rounded-full font-semibold transition-colors
                        ${activeFilter === cat 
                        ? 'bg-white text-black' 
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'}`
                    }
                >
                    {cat}
                </button>
            ))}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
          <AnimatePresence>
            {visibleItems.map(item => (
              <div key={item.id} className="mb-4 md:mb-6 break-inside-avoid">
                <GalleryItem item={item} onSelect={setSelectedItem} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- THE FIX IS HERE --- */}
        {/* Changed `text-center` to `flex justify-center` for robust centering. */}
        {hasMore && (
            <div className="flex justify-center mt-12">
                <motion.button
                    onClick={() => setItemsToShow(filteredItems.length)}
                    className="group flex items-center justify-center gap-2 bg-zinc-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-zinc-700 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span>Show More</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </motion.button>
            </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;