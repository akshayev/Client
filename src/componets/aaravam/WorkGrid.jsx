import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';

gsap.registerPlugin(ScrollTrigger);

const WorkGrid = () => {
  const componentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate a 2.5-second load time

    return () => clearTimeout(timer);
  }, []);

  // useLayoutEffect will run AFTER loading is finished and the real cards are rendered
  useLayoutEffect(() => {
    if (isLoading) return; // Only run animations when content is loaded

    const ctx = gsap.context(() => {
      gsap.set(".project-card", { autoAlpha: 0, y: 50 });
      ScrollTrigger.batch(".project-card", {
        start: "top 95%",
        onEnter: batch => gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true
        }),
      });

      const parallaxItems = (selector, factor) => {
        gsap.utils.toArray(selector).forEach((item) => {
          gsap.to(item, {
            yPercent: factor * 10,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      };
      
      parallaxItems(".project-card", 2);

    }, componentRef);
    
    return () => ctx.revert();
  }, [isLoading]); // Rerun this effect when isLoading changes

  // RENDER THE SKELETONS WHILE LOADING
  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
        {/* Render a set number of skeletons to fill the initial view */}
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  // RENDER THE REAL CONTENT AFTER LOADING
  return (
    <div ref={componentRef}>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="avoid-break mb-8">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGrid;