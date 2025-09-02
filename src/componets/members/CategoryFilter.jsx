// src/components/members/CategoryFilter.js

import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex justify-center flex-wrap gap-3 my-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none ${
            activeCategory === category 
              ? 'bg-sky-500 text-white shadow-lg' 
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;