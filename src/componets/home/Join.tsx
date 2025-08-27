import React from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiEdit, FiAward } from 'react-icons/fi';

// --- Data for Perks (easy to update) ---
const perks = [
  {
    icon: <FiCamera className="w-6 h-6 text-sky-400" />,
    title: 'Exclusive Workshops',
    description: 'Learn from seasoned photographers and master new techniques.',
  },
  {
    icon: <FiEdit className="w-6 h-6 text-sky-400" />,
    title: 'Portfolio Reviews',
    description: 'Get constructive feedback on your work from peers and pros.',
  },
  {
    icon: <FiAward className="w-6 h-6 text-sky-400" />,
    title: 'Competitions & Exhibitions',
    description: 'Showcase your talent and gain recognition for your craft.',
  },
];

const Join = () => {
  // Animation variants for staggering form fields
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="join" className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content & Perks */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Join the Creative Journey</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
              Whether you shoot on film or a phone, there’s a place for you. Become a part of a community that shares your passion.
            </p>
            
            <div className="mt-10 space-y-6">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-gray-800 p-3 rounded-full">
                    {perk.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{perk.title}</h3>
                    <p className="text-gray-400">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div 
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.form 
              className="grid grid-cols-1 gap-5"
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/*<motion.input 
                variants={fieldVariants}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" 
                placeholder="Your name" 
                type="text"
              />
              <motion.input 
                variants={fieldVariants}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" 
                placeholder="Email address" 
                type="email"
              />
              <motion.textarea 
                variants={fieldVariants}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" 
                rows={4} 
                placeholder="Tell us about your photographic interests" 
              />*/}
             <button
              className="group relative w-full flex justify-center items-center gap-2 py-3 px-5 mt-4 bg-sky-600 rounded-lg text-lg font-semibold hover:bg-sky-500 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-neutral-600"
            >
              <a href="/join" >Join</a>
            </button>
            
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Join;