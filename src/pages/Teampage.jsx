import React from 'react';

// --- Data ---
// The 'teamsData' array is now fully populated with all teams from the spike report.
const teamsData = [
  {
    teamName: "Club Core",
    lead: { name: "Sienna Hewitt", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "Ashwin Santiago", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" },
    members: [] // Club Core has no visible members.
  },
  {
    teamName: "Event Core",
    lead: { name: "Caitlyn King", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "Owen Garcia", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
    members: [
      { name: "Grace Lee", role: "Logistics Manager", avatar: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=200&auto=format&fit=crop" },
      { name: "Tom Harris", role: "Promotions Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    teamName: "Tech Core",
    lead: { name: "Lulu Meyers", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "Orlando Diggs", avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200&auto=format&fit=crop" },
    members: [
      { name: "Nate Allen", role: "Web Developer", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
      { name: "Ivy Scott", role: "Equipment Manager", avatar: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    teamName: "Cine Vision Studios",
    lead: { name: "Kyla Clay", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286de2?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "Brianna Ware", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop" },
    members: [
        { name: "Finn Wolf", role: "Videographer", avatar: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=200&auto=format&fit=crop" },
        { name: "Sadie Sink", role: "Editor", avatar: "https://images.unsplash.com/photo-1611601322175-28e6b454c632?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    teamName: "Creative Force",
    lead: { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "Ben Carter", avatar: "https://images.unsplash.com/photo-1549351512-c5e12b11e283?q=80&w=200&auto=format&fit=crop" },
    members: [
        { name: "Olivia Rodrigo", role: "Lead Photographer", avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=200&auto=format&fit=crop" },
        { name: "Joshua Bassett", role: "Graphic Designer", avatar: "https://images.unsplash.com/photo-1629074743474-8a478309a478?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    teamName: "The First Year Wing",
    lead: { name: "Chloe Davis", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "David Evans", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
    members: [
        { name: "Jenna Ortega", role: "Orientation Lead", avatar: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    teamName: "Creative Launches",
    lead: { name: "Ella Martinez", avatar: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "Liam Wilson", avatar: "https://images.unsplash.com/photo-1520409364224-63400afe26e5?q=80&w=200&auto=format&fit=crop" },
    members: [
        { name: "Noah Schnapp", role: "Social Media Manager", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop" },
        { name: "Millie Bobby Brown", role: "Content Writer", avatar: "https://images.unsplash.com/photo-1520529986992-1f211a3b4737?q=80&w=200&auto=format&fit=crop" }
    ]
  }
];


// --- MemberCard Component (More Robust) ---
function MemberCard({ member }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={member?.avatar}
        alt={member?.name}
        className="w-24 h-24 rounded-full border-4 border-neutral-800 object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-500 ease-in-out transform hover:scale-105"
        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/100/1F2937/A3BFFA?text=${member?.name?.charAt(0) || '?'}`; }}
      />
      <p className="mt-3 text-md font-bold text-neutral-200">{member?.name}</p>
      <p className="mt-1 text-sm text-neutral-400">{member?.role}</p>
    </div>
  );
}

// --- TeamSection Component (More Robust) ---
function TeamSection({ team }) {
  const showMembers = team.teamName !== 'Club Core' && team.members?.length > 0;

  return (
    <section className="w-full">
      {/* Team Title */}
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-neutral-100">{team?.teamName}</h2>
      </div>

      {/* Leads Section */}
      <div className="p-8 flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16">
        <div className="flex flex-col items-center text-center">
          <img 
            src={team?.lead?.avatar} 
            alt={team?.lead?.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neutral-700 object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-500 ease-in-out transform hover:scale-105" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150/1F2937/A3BFFA?text=Lead'; }}
          />
          <p className="mt-4 text-xl font-bold text-neutral-100">{team?.lead?.name}</p>
          <p className="mt-1 text-lg text-blue-400 font-semibold">Lead</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img 
            src={team?.coLead?.avatar} 
            alt={team?.coLead?.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neutral-700 object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-500 ease-in-out transform hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150/1F2937/A3BFFA?text=Co-Lead'; }}
          />
          <p className="mt-4 text-xl font-bold text-neutral-100">{team?.coLead?.name}</p>
          <p className="mt-1 text-lg text-blue-400 font-semibold">Co-Lead</p>
        </div>
      </div>

      {/* Members List */}
      {showMembers && (
        <div className="mt-8 px-4">
          <h3 className="font-semibold text-neutral-300 mb-8 text-center text-xl">Team Members</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 max-w-5xl mx-auto">
            {team.members?.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// --- Main TeamPage Component ---
export default function TeamPage() {
  const handleMouseMove = (e) => {
    // FIX: Use clientX and clientY directly for positioning the fixed pseudo-element.
    // This makes the coordinates relative to the viewport, which is what 'fixed' positioning uses.
    const { currentTarget, clientX, clientY } = e;
    currentTarget.style.setProperty("--mouse-x", `${clientX}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY}px`);
  };

  return (
    <div 
        onMouseMove={handleMouseMove}
        className="min-h-screen w-full bg-neutral-950 text-white p-4 sm:p-8 font-sans relative 
                   before:pointer-events-none before:fixed before:inset-0 before:z-0
                   before:bg-[radial-gradient(circle_farthest-side_at_var(--mouse-x)_var(--mouse-y),_rgba(147,51,234,0.15),_transparent_50%)]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
                Meet The Team
            </h1>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
                The creative individuals who bring our club's vision to life.
            </p>
        </div>

        {/* List of Team Sections */}
        <div className="w-full space-y-16">
          {teamsData.map((team, index) => (
            <React.Fragment key={index}>
              <TeamSection team={team} />
              {index < teamsData.length - 1 && (
                <hr className="border-neutral-800 max-w-5xl mx-auto mt-16" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

