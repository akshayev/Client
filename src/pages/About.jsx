// src/pages/AboutPage.js
import React from 'react';

// Adjust the import path based on your file structure
import HeroSection from '../componets/about/HeroSection';
import PhilosophySection from '../componets/about/PhilosophySection';
import CollectiveSection from '../componets/about/CollectiveSection';
import StatsSection from '../componets/about/StatsSection';
import JoinSection from '../componets/about/JoinSection';

const AboutPage = () => {
  return (
    <div className="bg-black mt-52">
      <HeroSection />
      <PhilosophySection />
      <CollectiveSection />
      <StatsSection />
      <JoinSection />
    </div>
  );
};

export default AboutPage;