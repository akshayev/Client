import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom"; // IMPORT THE LINK COMPONENT

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
     // WRAP EVERYTHING WITH THE LINK COMPONENT
    <Link to={`/event/${event.id}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 rounded-2xl">
      <motion.div
        key={event.id}
        className="relative bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-800 group h-full"
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
        <div className="relative h-40 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          {/*<div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
          {event.date}
        </div>*/}
        </div>

        {/* Responsive Event Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">
            {event.title}
          </h3>
          <p className="text-gray-400 mb-3 leading-relaxed text-sm line-clamp-3">
            {event.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};