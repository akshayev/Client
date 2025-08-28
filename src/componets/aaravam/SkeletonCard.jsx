import React from 'react';

const SkeletonCard = () => {
  return (
    // 'avoid-break' is a custom utility in your index.css for the masonry layout
    <div className="w-full avoid-break mb-8">
      {/* 
        Base color is now a dark, slate grey. 
        The shimmering effect uses the new golden 'shimmer-gradient'.
      */}
      <div 
        className="
          relative bg-slate-800 rounded-xl overflow-hidden 
          animate-shimmer bg-shimmer-gradient bg-[length:2000px_100%]
        "
        style={{ height: `${Math.random() * (15 - 10) + 10}rem` }} // Random height for masonry
      />
      
      {/* Text placeholders also get the themed shimmer */}
      <div className="pt-3">
        <div className="h-4 w-3/4 bg-slate-800 rounded mb-2 animate-shimmer bg-shimmer-gradient bg-[length:2000px_100%]" />
        <div className="h-3 w-1/2 bg-slate-800 rounded animate-shimmer bg-shimmer-gradient bg-[length:2000px_100%]" />
      </div>
    </div>
  );
};

export default SkeletonCard;