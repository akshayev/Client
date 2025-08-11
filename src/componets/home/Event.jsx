import { motion } from "framer-motion";
import { EventCard } from "./EventCard";

const events = [
    {
    id: 1,
    title: "Wildlife Photography Walk",
    date: "Aug 25, 2025",
    description: "An immersive journey to capture the untamed beauty of nature.",
    image: "https://cdn.pixabay.com/photo/2025/06/02/21/36/cat-9637984_1280.jpg"
  },
  {
    id: 2,
    title: "Urban Nights Workshop",
    date: "Sep 10, 2025",
    description: "Master long-exposure shots and capture the vibrant energy of the city after dark.",
    image: "https://cdn.pixabay.com/photo/2025/06/12/07/37/cow-lake-9655657_1280.jpg"
  },
  {
    id: 3,
    title: "Portrait Lighting Masterclass",
    date: "Oct 05, 2025",
    description: "Learn professional studio lighting techniques to create stunning portraits.",
    image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg"
  }
];

const EventSection = () => {
  return (
    <section className="bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Section Title */}
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Upcoming Events
        </motion.h2>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;