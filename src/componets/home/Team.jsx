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
  
  // Toggle active member on mobile
  const handleMemberClick = (memberId) => {
    if (window.innerWidth < 768) { // Only use click toggle on smaller screens
        setActiveId(prevId => prevId === memberId ? null : memberId);
    }
  };

  if (loading) {
    return (
        <section className='relative w-full min-h-screen bg-black text-[#e3e3db] flex justify-center items-center'>
            <p>Loading Team...</p>
        </section>
    );
  }

  if (error) {
      return (
          <section className='relative w-full min-h-screen bg-black text-red-500 flex justify-center items-center'>
              <p>{error}</p>
          </section>
      );
  }

  return (
    <section className='relative w-full min-h-screen bg-black text-[#e3e3db] flex flex-col justify-center items-center gap-6 md:gap-10 overflow-hidden font-sans p-4'>
      
      {/* --- DESKTOP: Profile Images Container --- */}
      <div 
        className='hidden md:flex justify-center items-center -space-x-3 md:-space-x-4 lg:-space-x-5' 
        onMouseLeave={() => setActiveId(null)}
      >
        {teamMembers.map((member) => {
          const isActive = activeId === member.id;
          const isDimmed = activeId !== null && !isActive;

          return (
            <img
              key={member.id}
              className={`
                relative rounded-full object-cover cursor-pointer
                border-2 lg:border-4 border-[#e3e3db]
                transition-all duration-500 ease-in-out
                ${isActive ? 'w-28 h-28 lg:w-32 lg:h-32 z-10' : 'w-16 h-16 lg:w-20 lg:h-20'}
                ${isDimmed ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0'}
              `}
              src={member.photoUrl} 
              alt={`Profile of ${member.name}`}
              onMouseEnter={() => setActiveId(member.id)}
            />
          );
        })}
      </div>

      {/* --- MOBILE: Profile List Container --- */}
      <div className='md:hidden flex flex-col items-center gap-4 w-full max-w-xs'>
        {teamMembers.length > 0 ? (
            teamMembers.map((member) => {
                const isActive = activeId === member.id;
                return (
                    <div key={member.id} className="w-full">
                        <div className="flex items-center gap-4" onClick={() => handleMemberClick(member.id)}>
                            <img
                                className={`
                                    rounded-full object-cover cursor-pointer
                                    border-2 border-[#e3e3db]
                                    transition-all duration-300 ease-in-out
                                    ${isActive ? 'w-20 h-20' : 'w-16 h-16 opacity-70'}
                                `}
                                src={member.photoUrl}
                                alt={`Profile of ${member.name}`}
                            />
                            <div className="flex flex-col">
                                <h3 className={`
                                    text-xl font-bold uppercase transition-colors duration-300
                                    ${isActive ? 'text-white' : 'text-gray-400'}
                                `}>
                                    {member.name}
                                </h3>
                                {/* Add a title or role if available in your API */}
                                {/* <p className='text-sm text-gray-400'>{member.title}</p> */}
                            </div>
                        </div>
                        
                        {/* Collapsible details section for mobile */}
                        <div className={`
                            overflow-hidden transition-max-height duration-500 ease-in-out
                            ${isActive ? 'max-h-40 mt-2' : 'max-h-0'}
                        `}>
                           {/* You can add more member details here, like a short bio */}
                           <p className="text-sm text-gray-300 pl-24 pr-4">
                                More details about {member.name} can be displayed here when active.
                           </p>
                        </div>
                    </div>
                );
            })
        ) : (
            <p>No team members to display.</p>
        )}
      </div>

      {/* --- DESKTOP: Animated Names Container --- */}
      <div className="hidden md:block relative w-full h-[80px] lg:h-[100px] overflow-hidden text-center">
        <div className={`
            absolute w-full h-full flex justify-center items-center
            text-5xl lg:text-6xl font-extrabold uppercase
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
                text-5xl lg:text-6xl font-extrabold uppercase
                transition-transform duration-500 ease-in-out
                ${activeId === member.id ? 'translate-y-0' : 'translate-y-full'}
              `}
            >
                {member.name}
            </div>
        ))}
      </div>

       {/* --- MOBILE: Title --- */}
      <div className="md:hidden text-4xl font-extrabold uppercase">
         The Squad
      </div>

    </section>
  );
};

export default Team;