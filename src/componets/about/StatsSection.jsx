// src/components/about/StatsSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiUsers } from 'react-icons/fi'; // FiAward removed as it's no longer used
import AnimatedStat from './AnimatedStat';

const StatsSection = () => (
  <section className="bg-neutral-950/70 border-y border-white/10 py-20 md:py-24 text-white" style={{
      backgroundImage: `radial-gradient(circle at top left, rgba(14, 165, 233, 0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.1), transparent 30%)`
  }}>
    <div className="max-w-3xl mx-auto px-4 sm:px-6"> {/* max-w-3xl for better centering of two items */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
           <AnimatedStat icon={<FiCamera size={32} />} endValue={500} label="Photos Taken" />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
           <AnimatedStat icon={<FiUsers size={32} />} endValue={50} label="Active Members" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default StatsSection;