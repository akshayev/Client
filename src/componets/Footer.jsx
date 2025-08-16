import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaBehance, FaEnvelope } from 'react-icons/fa';

// --- Data for Footer Links (easy to manage) ---
const footerLinks = [
  { title: 'About', href: '#about' },
  { title: 'Works', href: '#works' },
  { title: 'Join', href: '#join' },
];

const socialLinks = [
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaBehance />, href: '#', label: 'Behance' },
  { icon: <FaEnvelope />, href: 'mailto:contact@cpc.com', label: 'Email' },
];


const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Mission */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-bold text-xl text-white tracking-wide">CUCEK PHOTOGRAPHY CLUB</h3>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Capturing moments, creating memories. The official hub for photography enthusiasts at CUCEK.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Navigate</h4>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.title}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: "Stay Inspired" Newsletter */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Stay Inspired</h4>
            <p className="text-sm mb-4">Get the latest news, workshop announcements, and photo tips delivered to your inbox.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-l-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
              />
              <button 
                type="submit" 
                className="bg-white text-black px-4 font-semibold rounded-r-md hover:bg-gray-300 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Cucek Photography Club. All Rights Reserved.</p>
          
          <div className="flex items-center gap-5">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} aria-label={link.label} className="text-gray-500 hover:text-white transition-colors text-xl">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;