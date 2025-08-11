import { motion } from 'framer-motion';
import { FiEye, FiZap, FiUsers, FiAward } from 'react-icons/fi';

// Component for Individual Team Members
const TeamMember = ({ name, role, imageUrl }) => (
  <div className="text-center">
    <motion.img
      src={imageUrl}
      alt={name}
      className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-gray-700 shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    <h3 className="text-xl font-bold mt-4">{name}</h3>
    <p className="text-gray-400">{role}</p>
  </div>
);

// Component for Mission/Vision Cards
const MissionCard = ({ icon, title, children }) => (
  <motion.div
    className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-white/10"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
  >
    <div className="text-5xl text-indigo-400 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{children}</p>
  </motion.div>
);

const AboutPage = () => {
  const team = [
    { name: 'Jane Doe', role: 'President & Founder', imageUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500' },
    { name: 'John Smith', role: 'Head of Workshops', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500' },
    { name: 'Emily White', role: 'Community Manager', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500' },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <motion.section
        className="relative text-center py-24 lg:py-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2071')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A Community for Creative Eyes
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We are CUCEK Photography Club, a passionate group of creators, explorers, and storytellers united by our love for the lens.
          </motion.p>
        </div>
      </motion.section>
      
      {/* Our Story Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Our Journey
              </h2>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                Born from a shared desire to create a space for budding photographers, the CUCEK Photography Club was founded in 2021. What began as a small group of friends with cameras has grown into a thriving community on campus. We believe everyone has a unique story to tell, and a camera is one of the most powerful tools to tell it.
              </p>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                From our very first photo walk to our latest exhibition, our journey has been about connection—with our craft, with each other, and with the world we see through our viewfinders. [2, 3]
              </p>
            </motion.div>
            <motion.div 
              className="h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=2080" 
                alt="Photography gear" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-gray-900/60 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">What We Stand For</h2>
            <p className="mt-4 text-lg text-gray-400">Our mission is to foster a creative and supportive environment for photographers of all levels. [3]</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MissionCard icon={<FiEye />} title="Our Vision">
              To be a leading university club known for artistic innovation and community engagement in the world of photography.
            </MissionCard>
            <MissionCard icon={<FiZap />} title="Our Mission">
              To provide members with opportunities for growth through workshops, collaborative projects, and showcasing their work. [8]
            </MissionCard>
            <MissionCard icon={<FiUsers />} title="Our Community">
              To build a diverse and inclusive group where every member feels valued, inspired, and empowered to pursue their passion.
            </MissionCard>
          </div>
        </div>
      </section>
      
      {/* Meet the Team Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Meet the Leadership</h2>
            <p className="mt-4 text-lg text-gray-400">The passionate individuals guiding our club's creative journey. [1]</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="relative bg-indigo-600 text-white py-20 lg:py-24">
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            Ready to Find Your Focus?
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-indigo-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Become a part of our dynamic community. Whether you're a beginner or a pro, there's a place for you here.
          </motion.p>
          <motion.button 
            className="mt-8 bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Join the Club
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;