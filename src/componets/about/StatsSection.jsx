// src/components/about/StatsSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiUsers } from 'react-icons/fi';
import AnimatedStat from './AnimatedStat';

const StatsSection = () => (
  <section className="bg-neutral-950/70 border-y border-white/10 py-16 sm:py-20 md:py-24 text-white" style={{
      backgroundImage: `radial-gradient(circle at top left, rgba(14, 165, 233, 0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.1), transparent 30%)`
  }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div
            className="flex flex-col items-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
             <AnimatedStat icon={<FiCamera size={32} />} endValue={500} label="Photos Taken" />
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
             <AnimatedStat icon={<FiUsers size={32} />} endValue={50} label="Active Members" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default StatsSection;