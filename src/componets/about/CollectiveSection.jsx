// src/components/about/CollectiveSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

const CollectiveSection = () => {
  const teamMembers = [
    { id: 1, name: 'Ava Chen', role: 'President', imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop', socials: { instagram: '#', twitter: '#', linkedin: '#' } },
    { id: 2, name: 'Liam Rivera', role: 'Vice President', imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop', socials: { instagram: '#', twitter: '#' } },
    { id: 3, name: 'Sophie Grant', role: 'Head of Workshops', imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop', socials: { instagram: '#' } },
    { id: 4, name: 'Marcus Bell', role: 'Events Coordinator', imgSrc: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop', socials: { twitter: '#', linkedin: '#' } },
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-16"
        >
          Meet The Collective
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-neutral-800 group-hover:border-sky-500 transition-all duration-300">
                <img src={member.imgSrc} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.socials.instagram && <a href={member.socials.instagram} className="text-white hover:text-sky-400"><FiInstagram size={20}/></a>}
                  {member.socials.twitter && <a href={member.socials.twitter} className="text-white hover:text-sky-400"><FiTwitter size={20}/></a>}
                  {member.socials.linkedin && <a href={member.socials.linkedin} className="text-white hover:text-sky-400"><FiLinkedin size={20}/></a>}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-neutral-400">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollectiveSection;