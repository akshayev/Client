// src/components/join/AnimatedInput.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({ id, label, type = "text", icon, as = 'input', ...props }) => {
  // Allow the component to be rendered as an input or a textarea
  const Component = as === 'textarea' ? motion.textarea : motion.input;
  const isTextarea = as === 'textarea';

  return (
    <div className="relative flex">
      {/* Position the icon correctly for both input and textarea */}
      <div className={`absolute left-3 ${isTextarea ? 'top-[1.65rem]' : 'top-1/2'} -translate-y-1/2 text-neutral-500 z-10`}>
        {icon}
      </div>

      <Component
        id={id}
        name={id} // Good practice to include the name attribute for forms
        type={type}
        rows={isTextarea ? 4 : undefined} // Default rows for textarea
        // Key fix: Use an empty string for the placeholder to enable the :placeholder-shown selector
        placeholder=" "
        className="peer w-full bg-transparent border-b-2 border-neutral-700 text-white focus:outline-none focus:border-sky-500 transition-colors duration-300 pt-6 pb-2 pl-10"
        {...props}
      />
      
      {/* The label logic is inverted: small by default, and large only when the placeholder is visible */}
      <motion.label
        htmlFor={id}
        className="
          absolute left-10 top-1 text-sm text-neutral-400
          cursor-text transition-all duration-300 pointer-events-none
          
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500
          
          peer-focus:top-1 peer-focus:-translate-y-0
          peer-focus:text-sm peer-focus:text-sky-500"
      >
        {label}
      </motion.label>
    </div>
  );
};

export default AnimatedInput;