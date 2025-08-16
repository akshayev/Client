// src/components/PhilosophySection.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCamera, FiAward } from 'react-icons/fi';

const PhilosophySection = () => {
    const philosophyPoints = [
        { 
            title: 'Community First', 
            description: "A belief that shared passion forges a powerful and supportive community.",
            Icon: FiUsers
        },
        { 
            title: 'Find Your Voice', 
            description: "Providing the tools and knowledge for every student to discover their unique creative voice.",
            Icon: FiCamera
        },
        { 
            title: 'Tell Your Story', 
            description: "Creating opportunities to tell meaningful stories and capture moments that matter.",
            Icon: FiAward
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    return (
        <section className="bg-black text-white py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <motion.div 
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                        Our Philosophy
                    </h2>
                    <p className="mt-4 text-lg text-neutral-400 max-w-lg mx-auto lg:mx-0">
                        A commitment to creativity, community, and craft. We're dedicated to fostering an environment where every photographer, regardless of skill level, can thrive.
                    </p>
                </motion.div>
                <motion.div 
                    className="grid grid-cols-1 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {philosophyPoints.map((point, index) => (
                        <motion.div
                           key={index} 
                           className="flex items-start gap-6 bg-neutral-900 p-6 rounded-lg border border-white/10"
                           variants={itemVariants}
                        >
                           <div className="text-sky-400 mt-1">
                             <point.Icon size={28} />
                           </div>
                           <div>
                               <h3 className="text-xl font-bold text-white mb-1">{point.title}</h3>
                               <p className="text-neutral-400">{point.description}</p>
                           </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default PhilosophySection;