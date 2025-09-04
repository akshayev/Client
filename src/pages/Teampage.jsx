import React, { useState } from 'react';

// --- Data ---
// This data structure remains efficient and easy to manage.
const teamsData = [
  {
    teamName: "Club Core",
    lead: { name: "Sienna Hewitt", avatar: "https://placehold.co/150x150/A3BFFA/1F2937?text=SH" },
    coLead: { name: "Ashwin Santiago", avatar: "https://placehold.co/150x150/A3BFFA/1F2937?text=AS" },
    members: ["Planning", "Coordination", "Finance", "Strategy"]
  },
  {
    teamName: "Event Core",
    lead: { name: "Caitlyn King", avatar: "https://placehold.co/150x150/FBBF24/1F2937?text=CK" },
    coLead: { name: "Owen Garcia", avatar: "https://placehold.co/150x150/34D399/1F2937?text=OG" },
    members: ["Logistics Manager", "Promotions Lead", "Venue Coordinator"]
  },
  {
    teamName: "Tech Core",
    lead: { name: "Lulu Meyers", avatar: "https://placehold.co/150x150/A78BFA/1F2937?text=LM" },
    coLead: { name: "Orlando Diggs", avatar: "https://placehold.co/150x150/F472B6/1F2937?text=OD" },
    members: ["Web Developer", "Equipment Manager", "IT Support"]
  },
  {
    teamName: "Cine Vision",
    lead: { name: "Kyla Clay", avatar: "https://placehold.co/150x150/4ADE80/1F2937?text=KC" },
    coLead: { name: "Brianna Ware", avatar: "https://placehold.co/150x150/22D3EE/1F2937?text=BW" },
    members: ["Lead Videographer", "Head Editor", "Sound Engineer"]
  },
  {
    teamName: "Creative Force",
    lead: { name: "Alex Johnson", avatar: "https://placehold.co/150x150/F9A8D4/1F2937?text=AJ" },
    coLead: { name: "Ben Carter", avatar: "https://placehold.co/150x150/A5B4FC/1F2937?text=BC" },
    members: ["Lead Photographer", "Graphic Designer", "Stylist"]
  },
  {
    teamName: "Creative Launches",
    lead: { name: "Chloe Davis", avatar: "https://placehold.co/150x150/FDE047/1F2937?text=CD" },
    coLead: { name: "David Evans", avatar: "https://placehold.co/150x150/93C5FD/1F2937?text=DE" },
    members: ["Social Media Manager", "Content Writer", "Campaign Strategist"]
  }
];

// --- Chevron Icon ---
const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

// --- TeamCard Component ---
// The leads section is now updated with larger images and text.
function TeamCard({ team }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-blue-500/10 hover:border-neutral-700 hover:-translate-y-1">
      {/* Team Title */}
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-neutral-100">{team.teamName}</h2>
      </div>

      {/* Leads Section - Redesigned for impact */}
      <div className="p-8 border-y border-neutral-800 flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16">
        {/* Lead */}
        <div className="flex flex-col items-center text-center">
            <img src={team.lead.avatar} alt={team.lead.name} className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-neutral-700 object-cover shadow-lg transition-transform duration-300 hover:scale-105" />
            <p className="mt-4 text-xl font-bold text-neutral-100">{team.lead.name}</p>
            <p className="mt-1 text-lg text-blue-400 font-semibold">Lead</p>
        </div>
        {/* Co-Lead */}
        <div className="flex flex-col items-center text-center">
            <img src={team.coLead.avatar} alt={team.coLead.name} className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-neutral-700 object-cover shadow-lg transition-transform duration-300 hover:scale-105" />
            <p className="mt-4 text-xl font-bold text-neutral-100">{team.coLead.name}</p>
            <p className="mt-1 text-lg text-blue-400 font-semibold">Co-Lead</p>
        </div>
      </div>

      {/* Members List - Collapsible */}
      <div className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
            <div className="p-6 bg-neutral-950/50">
                <h3 className="font-semibold text-neutral-300 mb-3 text-center text-lg">Team Members</h3>
                <ul className="list-disc list-inside text-neutral-400 space-y-2 max-w-md mx-auto">
                    {team.members.map((member, index) => (
                    <li key={index}>{member}</li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-center items-center gap-2 text-center py-4 bg-neutral-800/50 hover:bg-neutral-800 transition-colors duration-300 text-neutral-300 font-medium"
      >
        <span>{isOpen ? "Hide Members" : "Show Members"}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}

// --- Main App Component ---
// This component now uses the bg-neutral-950 class to match your app's body.
export default function App() {
  const handleMouseMove = (e) => {
    // This function updates CSS variables to track the mouse position
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
        onMouseMove={handleMouseMove}
        className="min-h-screen w-full bg-neutral-950 text-white p-4 sm:p-8 font-sans relative 
                   before:pointer-events-none before:fixed before:inset-0 before:z-0
                   before:bg-[radial-gradient(circle_farthest-side_at_var(--mouse-x)_var(--mouse-y),_rgba(147,51,234,0.08),_transparent_40%)]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
                Meet The Team
            </h1>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
                The creative individuals who bring our club's vision to life.
            </p>
        </div>

        {/* List of Team Cards (Single Column) */}
        <div className="max-w-4xl mx-auto w-full space-y-8">
          {teamsData.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}

