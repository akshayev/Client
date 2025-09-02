// src/pages/MemberPortfolio.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { members } from '../data/members.js';
import PortfolioHeader from '../componets/members/PortfolioHeader.jsx';
import PortfolioGallery from '../componets/members/PortfolioGallery.jsx';
import ImageModal from '../componets/members/ImageModal.jsx';
import CategoryFilter from '../componets/members/CategoryFilter.jsx';

const MemberPortfolio = () => {
  // --- All Hooks are now called at the top level, unconditionally ---
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredGallery, setFilteredGallery] = useState([]);

  // --- Logic that depends on hooks is also at the top ---
  const member = members.find(m => m.id === parseInt(id));

  // --- useEffect is now called unconditionally ---
  useEffect(() => {
    // We add a check inside the effect to ensure 'member' exists before using it
    if (member) {
      if (activeCategory === 'All') {
        setFilteredGallery(member.gallery);
      } else {
        setFilteredGallery(member.gallery.filter(image => image.category === activeCategory));
      }
    }
  }, [activeCategory, member]); // Add 'member' as a dependency

  // --- The conditional "early return" now happens AFTER all hooks have been called ---
  if (!member) {
    return <div className="bg-black text-white min-h-screen text-center p-8 text-2xl">Member not found</div>;
  }

  // This logic now runs only if a member was found
  const categories = ['All', ...new Set(member.gallery.map(image => image.category))];

  return (
    <>
      <div className="bg-black min-h-screen text-white md:p-20">
        <motion.div 
          className="container mx-auto pt-20 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PortfolioHeader member={member} photoCount={member.gallery.length} />
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <PortfolioGallery 
            gallery={filteredGallery}
            setSelectedImage={setSelectedImage} 
          />
        </motion.div>
      </div>
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </>
  );
};

export default MemberPortfolio;