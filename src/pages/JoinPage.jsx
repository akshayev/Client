import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCheckCircle, FiStar, FiCamera, FiUsers, FiAward } from 'react-icons/fi';

// --- Reusable Animated Input Field ---
const AnimatedInput = ({ id, label, type = "text", icon, ...props }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
        {icon}
      </div>
      <motion.input
        id={id}
        type={type}
        className="peer w-full bg-transparent border-b-2 border-neutral-700 text-white placeholder-transparent focus:outline-none focus:border-sky-500 transition-colors duration-300 pt-6 pb-2 pl-10"
        placeholder={label}
        {...props}
      />
      <motion.label
        htmlFor={id}
        className="absolute left-10 top-6 text-neutral-500 transform-gpu transition-all duration-300 pointer-events-none 
                   peer-placeholder-shown:top-6 peer-placeholder-shown:text-base 
                   peer-focus:top-1 peer-focus:text-sm peer-focus:text-sky-500"
      >
        {label}
      </motion.label>
    </div>
  );
};

// --- Main Join Page Component ---
const JoinPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', program: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  // --- Dynamic Gradient Background ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(14, 165, 233, 0.15),
      transparent 80%
    )
  `;
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    console.log('Form Submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  // Stagger animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  
  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-y-auto bg-neutral-950 text-white font-sans"
    >
      <motion.div 
        className="pointer-events-none fixed -inset-px z-0 transition duration-300" 
        style={{ background }} 
      />
      
      <div className="relative z-10 px-6 md:px-8 py-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-24">

          {/* --- Section 1: Hero --- */}
          <motion.section 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Become a Member
            </h1>
            <p className="text-neutral-400 text-lg mt-4 max-w-2xl mx-auto">
              Join a vibrant community of photographers and artists. Fill out the form below to start your journey with us.
            </p>
          </motion.section>

          {/* --- Section 2: How to Become a Member --- */}
          <motion.section 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Your Journey Starts Here
            </h2>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Dashed line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12 bg-transparent">
                  <svg width="100%" height="100%"><line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2" strokeDasharray="8 8" className="stroke-neutral-700"/></svg>
              </div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center">
                  <div className="bg-sky-500/20 text-sky-400 p-4 rounded-full border-2 border-sky-500 mb-4 z-10"><FiUser size={28}/></div>
                  <h3 className="font-semibold text-lg">1. Fill the Form</h3>
                  <p className="text-neutral-400">Complete the registration form with your details.</p>
              </div>
              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center">
                  <div className="bg-sky-500/20 text-sky-400 p-4 rounded-full border-2 border-sky-500 mb-4 z-10"><FiCheckCircle size={28}/></div>
                  <h3 className="font-semibold text-lg">2. Get Verified</h3>
                  <p className="text-neutral-400">Our team will review your application and confirm your membership.</p>
              </div>
              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center">
                  <div className="bg-sky-500/20 text-sky-400 p-4 rounded-full border-2 border-sky-500 mb-4 z-10"><FiCamera size={28}/></div>
                  <h3 className="font-semibold text-lg">3. Start Creating</h3>
                  <p className="text-neutral-400">Access all benefits and join our events and workshops!</p>
              </div>
            </div>
          </motion.section>
          
          {/* --- Section 3: Membership Benefits --- */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Membership Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                  { icon: <FiCamera size={24}/>, title: 'Exclusive Workshops', description: 'Access hands-on workshops with professional photographers.' },
                  { icon: <FiUsers size={24}/>, title: 'Community Events', description: 'Join our photo walks, critiques, and social gatherings.' },
                  { icon: <FiStar size={24}/>, title: 'Studio Access', description: 'Get access to our fully-equipped photography studio.' },
                  { icon: <FiAward size={24}/>, title: 'Portfolio Reviews', description: 'Receive constructive feedback on your work from peers and pros.' },
                  { icon: <FiMail size={24}/>, title: 'Weekly Newsletter', description: 'Stay inspired with curated content, tips, and opportunities.' },
                  { icon: <FiCheckCircle size={24}/>, title: 'Competition Entry', description: 'Eligible to participate in club-exclusive competitions and win awards.' },
              ].map(benefit => (
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

          {/* --- Section 4: Online Registration Form --- */}
          <motion.section 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="max-w-lg mx-auto bg-neutral-900/50 p-8 md:p-12 rounded-xl border border-white/10">
              <h2 className="text-2xl font-bold text-center mb-8">
                Registration Form
              </h2>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                  <AnimatedInput id="name" label="Your Name" icon={<FiUser />} value={formData.name} onChange={handleInputChange} />
                  <AnimatedInput id="email" label="Email Address" type="email" icon={<FiMail />} value={formData.email} onChange={handleInputChange} />
                  <AnimatedInput id="password" label="Create a Password" type="password" icon={<FiLock />} value={formData.password} onChange={handleInputChange} />
                  <AnimatedInput id="program" label="Program / Year" icon={<FiAward />} value={formData.program} onChange={handleInputChange} />
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="group relative w-full flex justify-center items-center gap-2 py-3 px-5 mt-4 bg-sky-600 rounded-lg text-lg font-semibold hover:bg-sky-500 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-neutral-600"
                  >
                    {formStatus === 'submitting' ? 'Processing...' : formStatus === 'success' ? 'Welcome!' : 'Submit Application'}
                  </button>
              </form>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
};

export default JoinPage;