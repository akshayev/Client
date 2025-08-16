// src/components/join/AnimatedInput.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({ id, label, type = "text", icon, ...props }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
        {icon}
      </div>
      <motion.input
        id={id}
        type={type}
        className="peer w-full bg-transparent border-b-2 border-neutral-700 text-white placeholder-transparent focus:outline-none focus:border-sky-500 transition-colors duration-300 pt-6 pb-2 pl-10"
        placeholder={label}
        {...props}
      />
      <motion.label
        htmlFor={id}
        className="absolute left-10 top-6 text-neutral-500 transform-gpu transition-all duration-300 pointer-events-none 
                   peer-placeholder-shown:top-6 peer-placeholder-shown:text-base 
                   peer-focus:top-1 peer-focus:text-sm peer-focus:text-sky-500"
      >
        {label}
      </motion.label>
    </div>
  );
};

export default AnimatedInput;