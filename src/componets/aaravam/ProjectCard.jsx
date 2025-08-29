import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useDownloadFile from '../../hooks/useDownloadFile';

// Icon with a festive gold color
const DownloadIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-10 w-10 text-amber-300" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const downloadFile = useDownloadFile();

  // The 3D hover/tilt animation logic (no changes needed here)
  useLayoutEffect(() => {
    const card = cardRef.current;
    gsap.set(card, { transformStyle: "preserve-3d", transformPerspective: 1000 });
    // ... all the mousemove/mouseleave event listener logic from before
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left; const y = e.clientY - top;
      const rotateY = gsap.utils.mapRange(0, width, -15, 15, x);
      const rotateX = gsap.utils.mapRange(0, height, 15, -15, y);
      gsap.to(card, { rotationY: rotateY, rotationX: rotateX, x: (x - width / 2) * 0.1, y: (y - height / 2) * 0.1, duration: 0.8, ease: 'power3.out' });
    };
    const handleMouseLeave = () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div ref={cardRef} className="project-card invisible w-full" style={{ willChange: 'transform' }}>
      <div 
        className="
          relative w-full h-full rounded-xl overflow-hidden
          bg-white/5 backdrop-blur-sm
          p-1 border border-amber-400/20 /* Subtle golden border */
          transition-all duration-300
          group hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.5)] /* Vibrant orange hover glow */
        "
      >
        <img src={project.src} alt={project.title} className="w-full h-auto object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
          {/*<a href="https://postimg.cc/gallery/GpDn4gC" target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded-full hover:bg-white/10" onClick={(e) => e.stopPropagation()}>
            <DownloadIcon />
          </a>*/}
          <button onClick={() => downloadFile(project.src)} className="opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded-full hover:bg-white/10">
            <DownloadIcon />
          </button>
        </div>
      </div>
      
      <div className="pt-3 text-white">
        <h3 className="text-md font-bold">{project.title}</h3>
        {/* Category text now uses a warmer, off-white color */}
        <p className="text-sm text-yellow-50/70">{project.category}</p> 
      </div>
    </div>
  );
};

export default ProjectCard;