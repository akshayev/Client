import React, { useState, useEffect } from 'react';
import Lightbox from './Lightbox';
import { fetchPastGloriesData } from '../../data/pastGloriesApi';

const PastGlories = () => {
  const [pastGloriesData, setPastGloriesData] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    // Fetch the data when the component mounts
    const loadData = async () => {
      const data = await fetchPastGloriesData();
      setPastGloriesData(data);
    };

    loadData();
  }, []); // The empty dependency array ensures this runs only once

  // If data hasn't loaded yet, don't render the section.
  if (!pastGloriesData || !pastGloriesData.images) {
    // Optionally, you could return a loading spinner here
    return null; 
  }

  return (
    <React.Fragment>
      <section id="past-glories" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-center font-creepster text-5xl md:text-7xl mb-12 text-white" style={{ textShadow: '0 0 15px rgba(255,100,80,0.7)' }}>Past Glories</h2>
          <div className="relative w-full h-[150vh] md:h-[110vh] mb-16">
            {pastGloriesData.images.map((image, index) => (
              <img
                key={image.src} // Using a unique value like image.src is better for keys
                src={image.src}
                alt={`Past glory entry ${index + 1}`}
                className="absolute border-4 border-white shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:!rotate-0 hover:!z-20"
                style={image.style}
                onClick={() => setLightboxImage(image.src)}
              />
            ))}
          </div>
        </div>
      </section>
      <Lightbox imageSrc={lightboxImage} onClose={() => setLightboxImage(null)} />
    </React.Fragment>
  );
};

export default PastGlories;
