import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const EventCard = ({ event, index }) => {
  return (
    <motion.div
      key={event.id}
      className="relative bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-800 group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      
      {/* Responsive Event Image & Date Badge */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
          {event.date}
        </div>
      </div>

      {/* Responsive Event Content */}
      <div className="p-5 sm:p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          {event.title}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
          {event.description}
        </p>
        
        <motion.button 
          className="flex items-center gap-2 bg-white text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          whileHover={{ scale: 1.05, gap: "12px" }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
          <FiArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
};