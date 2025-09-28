// src/pages/JoinPage.js
import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

// Adjust import paths based on your file structure
import HeroSection from '../componets/join/HeroSection';
import HowToJoinSection from '../componets/join/HowToJoinSection';
import BenefitsSection from '../componets/join/BenefitsSection';
import RegistrationFormSection from '../componets/join/RegistrationFormSection';

const JoinPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', program: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  // --- Dynamic Gradient Background ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(14, 165, 233, 0.15),
      transparent 80%
    )
  `;
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    console.log('Form Submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  // Stagger animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  
  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-y-auto bg-neutral-950 text-white font-sans"
    >
      <motion.div 
        className="pointer-events-none fixed -inset-px z-0 transition duration-300" 
        style={{ background }} 
      />
      
      <div className="relative z-10 px-6 md:px-8 py-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-24">
          <HeroSection variants={sectionVariants} />
          <HowToJoinSection variants={sectionVariants} />
          <BenefitsSection variants={sectionVariants} />
          {/*<RegistrationFormSection 
            variants={sectionVariants}
            formData={formData}
            formStatus={formStatus}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />*/}
        </div>
      </div>
    </div>
  );
};

export default JoinPage;