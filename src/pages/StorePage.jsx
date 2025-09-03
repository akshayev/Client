// src/pages/StorePage.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

import { products } from '../data/products.js';
import { ProductCard } from '../componets/store/ProductCard.jsx';
import { ProductModal } from '../componets/store/ProductModal.jsx';
// We can reuse the CategoryFilter component if the styles are consistent
import CategoryFilter from '../componets/members/CategoryFilter.jsx';

const StorePage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', ...new Set(products.map(p => p.type))];

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.type === activeCategory));
    }
  }, [activeCategory]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    setSelectedProduct(null); // Close modal after adding to cart
  };

  return (
    <>
      <div className="bg-black min-h-screen text-white" style={{backgroundImage: "url('...your-optional-bg-image...')"}}>
        {/* Optional background overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-lg -z-10"></div>
        
        <header className="fixed top-0 left-0 right-0 bg-black/50 border-b border-zinc-800 backdrop-blur-md z-40">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
              The Store
            </h1>
            <div className="relative">
              <ShoppingBagIcon className="h-7 w-7 text-white" />
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-sky-500 text-white text-xs rounded-full"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  >
                    {cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="container mx-auto pt-24 p-4 md:p-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-8"
          >
            <AnimatePresence>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </>
  );
};

export default StorePage;