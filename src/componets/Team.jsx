import { useState } from 'react';

// Data for team members remains the same
const teamMembers = [
  { id: 1, name: 'Bonnie Green', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png' },
  { id: 2, name: 'Helene Engels', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png' },
  { id: 3, name: 'Jese Leos', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png' },
  { id: 4, name: 'Joseph McFall', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png' },
  { id: 5, name: 'Sofia McGuire', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png' },
  { id: 6, name: 'Thomas Lean', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png' },
  { id: 7, name: 'Michael Gouch', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png' },
  { id: 8, name: 'Neil Sims', imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png' },
  { id: 9, name: 'Lara', imgSrc: 'https://cdn.pixabay.com/photo/2022/09/16/16/57/girl-7459130_1280.jpg' },
];

const Team = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    // Responsive gap between elements
    <section className='relative w-full h-screen bg-black text-[#e3e3db] flex flex-col justify-center items-center gap-6 md:gap-10 overflow-x-hidden font-sans p-4'>
      
      {/* Profile Images Container with responsive spacing */}
      <div 
        className='flex justify-center items-center -space-x-3 md:-space-x-4 lg:-space-x-5' 
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
                
                ${isActive 
                  ? 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 z-10' // Active sizes
                  : 'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'    // Inactive sizes
                }
                
                ${isDimmed ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0'}
              `}
              src={member.imgSrc}
              alt={`Profile of ${member.name}`}
              onMouseEnter={() => setActiveId(member.id)}
            />
          );
        })}
      </div>

      {/* Names Container with responsive height */}
      <div className="relative w-full h-[60px] md:h-[80px] lg:h-[100px] overflow-hidden text-center">
        {/* Default Text with responsive font size */}
        <div className={`
            absolute w-full h-full flex justify-center items-center
            text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase
            transition-transform duration-500 ease-in-out
            ${activeId === null ? 'translate-y-0' : '-translate-y-full'}
          `}>
          The Squad
        </div>
        
        {/* Individual Names with responsive font size */}
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