// src/components/join/HowToJoinSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCheckCircle, FiCamera } from 'react-icons/fi';

const HowToJoinSection = ({ variants }) => (
  <motion.section
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <h2 className="text-3xl font-bold text-center mb-12">
      Your Journey Starts Here
    </h2>
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Dashed line for desktop */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12 bg-transparent">
        <svg width="100%" height="100%">
          <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2" strokeDasharray="8 8" className="stroke-neutral-700"/>
        </svg>
      </div>

      {/* Steps */}
      <div className="relative flex flex-col items-center text-center">
        <div className="bg-sky-500/20 text-sky-400 p-4 rounded-full border-2 border-sky-500 mb-4 z-10"><FiUser size={28}/></div>
        <h3 className="font-semibold text-lg">1. Fill the Form</h3>
        <p className="text-neutral-400">Complete the registration form with your details.</p>
      </div>
      <div className="relative flex flex-col items-center text-center">
        <div className="bg-sky-500/20 text-sky-400 p-4 rounded-full border-2 border-sky-500 mb-4 z-10"><FiCheckCircle size={28}/></div>
        <h3 className="font-semibold text-lg">2. Get Verified</h3>
        <p className="text-neutral-400">Our team will review your application and confirm your membership.</p>
      </div>
      <div className="relative flex flex-col items-center text-center">
        <div className="bg-sky-500/20 text-sky-400 p-4 rounded-full border-2 border-sky-500 mb-4 z-10"><FiCamera size={28}/></div>
        <h3 className="font-semibold text-lg">3. Start Creating</h3>
        <p className="text-neutral-400">Access all benefits and join our events and workshops!</p>
      </div>
    </div>
  </motion.section>
);

export default HowToJoinSection;