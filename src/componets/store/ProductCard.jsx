// src/components/store/ProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const categoryStyles = {
  Merchandise: "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20",
  Photo: "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  Video: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
};

export const ProductCard = ({ product, onView }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden group cursor-pointer"
      onClick={() => onView(product)}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${categoryStyles[product.type] || ''}`}>
            {product.type}
          </span>
        </div>
        <p className="mt-2 text-xl font-bold text-sky-400">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};