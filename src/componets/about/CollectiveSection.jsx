// Correct: no quotes
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { teamApi } from '../../services/api.js'; // Adjust path if necessary

const CollectiveSection = () => {
  // State for API data, loading, and errors
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await teamApi.getAll();

        if (response.data && Array.isArray(response.data.data)) {
            
            const formattedMembers = response.data.data
                // ================== HIGHLIGHTED CHANGE ==================
                // 1. FILTER: Keep only members that have a non-empty 'position'.
                .filter(member => member.position)
                // ========================================================
                
                // 2. MAP: Transform the filtered data into the format the component expects.
                .map(member => ({
                    id: member.id,
                    name: member.name,
                    role: member.position, // Now we know this exists
                    imgSrc: member.photoUrl,
                    socials: {
                      instagram: member.instagramLink,
                      twitter: member.twitterLink,
                      linkedin: member.linkedinLink,
                    }
                }));

            setTeamMembers(formattedMembers);
        } else {
          throw new Error("Invalid data format received from the API.");
        }
      } catch (err) {
        setError("Could not load the team.");
        console.error("API Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const renderContent = () => {
      if (loading) {
        return <p className="text-neutral-400">Loading team...</p>;
      }
      if (error) {
        return <p className="text-red-500">{error}</p>;
      }
      // This message will now show if no one has a position assigned
      if (teamMembers.length === 0) {
        return <p className="text-neutral-400">The collective members will be announced soon.</p>
      }

      return (
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
                    {member.socials.instagram && <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400"><FiInstagram size={20}/></a>}
                    {member.socials.twitter && <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400"><FiTwitter size={20}/></a>}
                    {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400"><FiLinkedin size={20}/></a>}
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-neutral-400">{member.role}</p>
                </div>
                </motion.div>
            ))}
        </div>
      )
  }

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
        
        {renderContent()}

      </div>
    </section>
  );
}

export default CollectiveSection;