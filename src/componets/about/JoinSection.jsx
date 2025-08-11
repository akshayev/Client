// src/components/about/JoinSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const JoinSection = () => (
  <section className="bg-black text-white py-24 md:py-32">
    <motion.div
      className="max-w-3xl mx-auto text-center px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Join The Conversation</h2>
      <p className="mt-4 max-w-xl mx-auto text-lg text-neutral-400">
        Stay updated with our latest workshops, events, and photo walks. Let's create something beautiful together.
      </p>
      <form className="mt-8 flex justify-center group">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full max-w-sm px-5 py-3 rounded-l-md bg-transparent border-2 border-neutral-700 focus:outline-none focus:border-sky-500 transition-all text-white placeholder-neutral-500"
        />
        <button
          type="submit"
          className="bg-white text-black font-semibold px-6 py-3 rounded-r-md hover:bg-neutral-300 transition-colors flex items-center group-hover:bg-sky-500 group-hover:text-white"
        >
          <span>Subscribe</span>
          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  </section>
);

export default JoinSection;