// src/components/join/BenefitsSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiUsers, FiStar, FiAward, FiMail, FiCheckCircle } from 'react-icons/fi';

const BenefitsSection = ({ variants }) => {
  const benefits = [
    { icon: <FiCamera size={24}/>, title: 'Exclusive Workshops', description: 'Access hands-on workshops with professional photographers.' },
    { icon: <FiUsers size={24}/>, title: 'Community Events', description: 'Join our photo walks, critiques, and social gatherings.' },
    { icon: <FiStar size={24}/>, title: 'Studio Access', description: 'Get access to our fully-equipped photography studio.' },
    { icon: <FiAward size={24}/>, title: 'Portfolio Reviews', description: 'Receive constructive feedback on your work from peers and pros.' },
    { icon: <FiMail size={24}/>, title: 'Weekly Newsletter', description: 'Stay inspired with curated content, tips, and opportunities.' },
    { icon: <FiCheckCircle size={24}/>, title: 'Competition Entry', description: 'Eligible to participate in club-exclusive competitions and win awards.' },
  ];

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl font-bold text-center mb-12">Membership Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map(benefit => (
          <div key={benefit.title} className="bg-neutral-900 p-6 rounded-lg border border-white/10 flex gap-4">
            <div className="text-sky-400 mt-1">{benefit.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{benefit.title}</h3>
              <p className="text-neutral-400 mt-1">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default BenefitsSection;