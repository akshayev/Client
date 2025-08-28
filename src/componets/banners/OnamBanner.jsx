import React from 'react';

const OnamBanner = () => {
  return (
    <div id="onam" className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* 1. Subtle Background Glow for a Modern Feel */}
      {/* This creates a soft, warm light from the bottom, preventing a flat black background */}
      <div 
        className="
          absolute bottom-[-50%] left-1/2 -translate-x-1/2 
          w-[200%] h-[150%] 
          bg-radial-gradient-bottom from-amber-500/10 via-black to-black 
          z-0
        "
      />

      {/* 2. Content Container (no changes needed) */}
      <div className="relative z-10 text-center text-white p-4 animate-fade-in">
        <h1 
          className="
            text-6xl sm:text-7xl md:text-8xl lg:text-9xl 
            font-black tracking-tighter 
            uppercase 
            bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 
            text-transparent bg-clip-text
          "
        >
          Aaravam 2025
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-200 font-light tracking-wide">
          An Onam Celebration Gallery
        </p>

        <a 
          href="/aaravam" 
          className="
            mt-8 inline-block px-8 py-3 
            border-2 border-amber-400 rounded-full
            text-amber-300 text-lg font-bold 
            transition-all duration-300
            hover:bg-amber-400/20 hover:text-white 
            hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]
            hover:scale-105
          "
        >
          Explore the Memories
        </a>
      </div>
    </div>
  );
};

export default OnamBanner;