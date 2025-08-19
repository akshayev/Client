import React, { useState, useEffect } from 'react';
import { teamApi } from '../../services/api.js'; // Adjust path if necessary

const Team = () => {
  // State for API data, loading, and errors
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for UI interaction
  const [activeId, setActiveId] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await teamApi.getAll();
        if (response.data && Array.isArray(response.data.data)) {
          // Sort the team members by the orderIndex to ensure consistent ordering
          const sortedMembers = response.data.data.sort((a, b) => a.orderIndex - b.orderIndex);
          setTeamMembers(sortedMembers);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError("Failed to load the team.");
        console.error("API Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return (
        <section className='relative w-full h-screen bg-black text-[#e3e3db] flex justify-center items-center'>
            <p>Loading Team...</p>
        </section>
    );
  }

  if (error) {
      return (
          <section className='relative w-full h-screen bg-black text-red-500 flex justify-center items-center'>
              <p>{error}</p>
          </section>
      );
  }

  return (
    <section className='relative w-full h-screen bg-black text-[#e3e3db] flex flex-col justify-center items-center gap-6 md:gap-10 overflow-x-hidden font-sans p-4'>
      
      {/* Profile Images Container */}
      <div 
        className='flex justify-center items-center -space-x-3 md:-space-x-4 lg:-space-x-5' 
        onMouseLeave={() => setActiveId(null)}
      >
        {teamMembers.length > 0 ? (
            teamMembers.map((member) => {
              const isActive = activeId === member.id;
              const isDimmed = activeId !== null && !isActive;
    
              return (
                <img
                  key={member.id}
                  className={`
                    relative rounded-full object-cover cursor-pointer
                    border-2 lg:border-4 border-[#e3e3db]
                    transition-all duration-500 ease-in-out
                    
                    ${isActive 
                      ? 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 z-10'
                      : 'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'
                    }
                    
                    ${isDimmed ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0'}
                  `}
                  // CORRECTED: Use `photoUrl` to match the API response data.
                  src={member.photoUrl} 
                  alt={`Profile of ${member.name}`}
                  onMouseEnter={() => setActiveId(member.id)}
                />
              );
            })
        ) : (
            <p>No team members to display.</p>
        )}
      </div>

      {/* Names Container */}
      <div className="relative w-full h-[60px] md:h-[80px] lg:h-[100px] overflow-hidden text-center">
        <div className={`
            absolute w-full h-full flex justify-center items-center
            text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase
            transition-transform duration-500 ease-in-out
            ${activeId === null && teamMembers.length > 0 ? 'translate-y-0' : '-translate-y-full'}
          `}>
          The Squad
        </div>
        
        {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className={`
                absolute w-full h-full flex justify-center items-center
                text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase
                transition-transform duration-500 ease-in-out
                ${activeId === member.id ? 'translate-y-0' : 'translate-y-full'}
              `}
            >
                {member.name}
            </div>
        ))}
      </div>
    </section>
  );
};

export default Team;