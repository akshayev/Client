import React from 'react';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { FiArrowRight, FiCamera, FiUsers, FiAward, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

// --- Reusable AnimatedStat Component ---
const AnimatedStat = ({ icon, endValue, label }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const controls = animate(0, endValue, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(value) {
              node.textContent = Math.round(value).toLocaleString();
            },
          });
          observer.unobserve(node); // Animate only once
          return () => controls.stop();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <div className="text-center">
      <div className="text-sky-400 mb-3">{icon}</div>
      <p className="text-4xl md:text-5xl font-bold text-white">
        <span ref={ref}>0</span>+
      </p>
      <p className="text-sm text-neutral-400 mt-1">{label}</p>
    </div>
  );
};


// --- Main Enhanced About Page ---
const AboutPage = () => {

  // --- 1. Hero Section ---
  const HeroSection = () => (
    <section className="relative h-screen w-full flex justify-center items-center bg-black overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521100350734-66671a8c3d66?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <motion.div
        className="text-center z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white"
          style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
        >
          For the Shutterbugs.
        </motion.h1>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-neutral-400"
        >
          By the Shutterbugs.
        </motion.h1>
      </motion.div>
    </section>
  );

  // --- 2. Philosophy Section (Grid Layout - No Scrolling) ---
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

  // --- 3. The Collective Section ---
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
  
  // --- 4. Stats Section ---
  const StatsSection = () => (
    <section className="bg-neutral-950/70 border-y border-white/10 py-20 md:py-24 text-white" style={{
        backgroundImage: `radial-gradient(circle at top left, rgba(14, 165, 233, 0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.1), transparent 30%)`
    }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
             <AnimatedStat icon={<FiCamera size={32} />} endValue={8500} label="Photos Taken" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
             <AnimatedStat icon={<FiUsers size={32} />} endValue={50} label="Active Members" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <AnimatedStat icon={<FiAward size={32} />} endValue={12} label="Awards Won" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

  // --- 5. Join Section ---
  const JoinSection = () => (
    <section className="bg-black text-white py-24 md:py-32">
      <motion.div
        className="max-w-3xl mx-auto text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Join The Conversation</h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-neutral-400">
          Stay updated with our latest workshops, events, and photo walks. Let's create something beautiful together.
        </p>
        <form className="mt-8 flex justify-center group">
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-sm px-5 py-3 rounded-l-md bg-transparent border-2 border-neutral-700 focus:outline-none focus:border-sky-500 transition-all text-white placeholder-neutral-500"
            />
            <button
                type="submit"
                className="bg-white text-black font-semibold px-6 py-3 rounded-r-md hover:bg-neutral-300 transition-colors flex items-center group-hover:bg-sky-500 group-hover:text-white"
            >
                <span>Subscribe</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
      </motion.div>
    </section>
  );

  return (
    <div className="bg-black">
      <HeroSection />
      <PhilosophySection />
      <CollectiveSection />
      <StatsSection />
      <JoinSection />
    </div>
  );
};

export default AboutPage;