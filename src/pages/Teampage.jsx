import React from 'react';

// --- Data ---
// The 'teamsData' array is now fully populated with all teams from the spike report.
const teamsData = [
  {
    teamName: "Club Core",
    lead: { name: "Rishikesh", avatar: "https://i.postimg.cc/Grb6JWJN/IMG-20250820-080442-Rishikesh-Babu.jpg" },
    coLead: { name: "Akshay", avatar: "https://i.postimg.cc/Gr78c1Mn/Whats-App-Image-2025-08-26-at-17-35-39-68c0c6ad.jpg" },
    techLead: { name: "Adith Dileep A D", avatar: "https://i.postimg.cc/D77mpcnH/NIM-7824-01-2.jpg" },
    treasurer: { name: "Adarsh", avatar: "https://i.postimg.cc/kqqxsCZv/1000398571.jpg" },
    members: [] // Club Core has no visible members.
  },
  {
    teamName: "Event Core",
    lead: { name: "", avatar: "" },
    coLead: { name: "", avatar: "" },
    members: [
      { name: "Nived Raj", role: "", avatar: "https://i.postimg.cc/kMVX13nX/IMG-6913-Nived-Raj.avif" },
      { name: "Abhishek P Vasudev", role: "", avatar: "https://i.postimg.cc/1XynFvqN/DSC02352-Abhishek-P-Vasudev.jpg" },
      { name: "Shahin N", role: "", avatar: "https://i.postimg.cc/XNTNtHJK/Whats-App-Image-2025-08-20-at-08-19-50-0a95550a-Shahin-N.jpg" },
      { name: "Abdul Rahman", role: "", avatar: "https://i.postimg.cc/mg1Dtv55/IMG-6529-Abdul-Rahman.avif" },
      { name: "Shalon V", role: "", avatar: "https://i.postimg.cc/wTv3dycH/IMG-5784-Shalon-v.jpg" },
      { name: "ADWAID P KUMAR", role: "", avatar: "https://i.postimg.cc/brSMQRfp/IMG-20250503-101500-ADWAID-P-KUMAR.jpg" },
    ]
  },
  {/*{
    teamName: "Tech Core",
    lead: { name: "Lulu Meyers", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
    coLead: { name: "Orlando Diggs", avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200&auto=format&fit=crop" },
    members: [
      { name: "Nate Allen", role: "Web Developer", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
      { name: "Ivy Scott", role: "Equipment Manager", avatar: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=200&auto=format&fit=crop" }
    ]
  },*/},
  {
    teamName: "Cine Vision Studios",
    lead: { name: "", avatar: "" },
    coLead: { name: "", avatar: "" },
    members: [
      { name: "Nivedh K", role: "", avatar: "https://i.postimg.cc/d0TyckFD/20250412-122701-Nivedh-K.jpg" },
      { name: "Fathima Amna", role: "", avatar: "https://i.postimg.cc/CM4f0p3C/bc3434bf-792c-4cdd-84a9-f2b3d14e9296-Fathima-Amna.jpg" },
      { name: "I P Fahad", role: "", avatar: "https://i.postimg.cc/3JS4yCJd/IMG-1282-Ip-Fahad.jpg" },
      { name: "Pranav V P", role: "", avatar: "https://i.postimg.cc/XvH4LxmC/Picsart-25-08-19-20-26-34-827-Pranav-vp.jpg" },
      { name: "Arun", role: "", avatar: "https://i.postimg.cc/XjBWw5f1/1000081358.jpg" },
      { name: "SALIH", role: "", avatar: "https://i.postimg.cc/fLzDjp8Z/IMG-8227-SALIH.jpg" },
    ]
  },
  {
    teamName: "Creative Force",
    lead: { name: "", avatar: "" },
    coLead: { name: "", avatar: "" },
    members: [
      { name: "Mohammed Lahan P S", role: "", avatar: "https://i.postimg.cc/4ywKQp62/f0422866-377e-4a89-bafa-662d13442b67-Mohammed-Lahan-P-S.jpg" },
      { name: "Gokul Suresh", role: "", avatar: "https://i.postimg.cc/CxRZbBzJ/20250517-164329-GOKUL-SURESH.jpg" },
      { name: "Adarsh", role: "", avatar: "https://i.postimg.cc/kqqxsCZv/1000398571.jpg" },
      { name: "Adith Dileep A D", role: "", avatar: "https://i.postimg.cc/D77mpcnH/NIM-7824-01-2.jpg" },
      { name: "Karthik Rb", role: "", avatar: "https://i.postimg.cc/9FRVpGY4/IMG-7012-Karthik-Rb.jpg" },
    ]
  },
  {
    teamName: "The First Year Wing",
    lead: { name: "", avatar: "" },
    coLead: { name: "", avatar: "" },
    members: [
      { name: "Nived Raj", role: "Coordinator", avatar: "https://i.postimg.cc/kMVX13nX/IMG-6913-Nived-Raj.avif" },
      { name: "Adith Dileep A D", role: "Coordinator", avatar: "https://i.postimg.cc/D77mpcnH/NIM-7824-01-2.jpg" },
      { name: "Pranav V P", role: "Coordinator", avatar: "https://i.postimg.cc/XvH4LxmC/Picsart-25-08-19-20-26-34-827-Pranav-vp.jpg" },
    ]
  },
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
        {team?.lead?.name && (
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
        )}
        {team?.coLead?.name && (
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
        )}
        {team?.techLead?.name && (
          <div className="flex flex-col items-center text-center">
            <img 
              src={team?.techLead?.avatar} 
              alt={team?.techLead?.name} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neutral-700 object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-500 ease-in-out transform hover:scale-105"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150/1F2937/A3BFFA?text=Tech-Lead'; }}
            />
            <p className="mt-4 text-xl font-bold text-neutral-100">{team?.techLead?.name}</p>
            <p className="mt-1 text-lg text-blue-400 font-semibold">Tech-Lead</p>
          </div>
        )}
        {team?.treasurer?.name && (
          <div className="flex flex-col items-center text-center">
            <img 
              src={team?.treasurer?.avatar} 
              alt={team?.treasurer?.name} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neutral-700 object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-500 ease-in-out transform hover:scale-105"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150/1F2937/A3BFFA?text=Treasurer'; }}
            />
            <p className="mt-4 text-xl font-bold text-neutral-100">{team?.treasurer?.name}</p>
            <p className="mt-1 text-lg text-blue-400 font-semibold">Treasurer</p>
          </div>
        )}
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
      <div className="max-w-7xl mx-auto relative z-10 mt-20 mb-20">
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