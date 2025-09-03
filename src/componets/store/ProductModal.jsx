// src/components/store/ProductModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const ProductDetail = ({ label, value }) => (
  <div className="border-t border-zinc-700 pt-2 mt-2">
    <dt className="font-medium text-zinc-400">{label}</dt>
    <dd className="mt-1 text-sm text-white">{value}</dd>
  </div>
);

export const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4 backdrop-blur-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 rounded-lg border border-zinc-700 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"><XMarkIcon className="h-6 w-6" /></button>
          
          <div className="w-full md:w-1/2">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover"/>
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold text-white">{product.name}</h2>
            <p className="mt-4 text-3xl font-bold text-sky-400">${product.price.toFixed(2)}</p>
            <p className="mt-6 text-zinc-300">{product.description}</p>
            
            <dl className="mt-8 space-y-4 text-sm">
              {product.details?.material && <ProductDetail label="Material" value={product.details.material} />}
              {product.details?.sizes && <ProductDetail label="Sizes Available" value={product.details.sizes.join(', ')} />}
              {product.details?.capacity && <ProductDetail label="Capacity" value={product.details.capacity} />}
              {product.details?.resolution && <ProductDetail label="Resolution" value={product.details.resolution} />}
              {product.details?.format && <ProductDetail label="Format" value={product.details.format} />}
              {product.details?.duration && <ProductDetail label="Duration" value={product.details.duration} />}
            </dl>
            
            <button
              onClick={() => onAddToCart(product)}
              className="mt-auto w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg bg-sky-500 transition-all duration-300 hover:bg-sky-400"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};