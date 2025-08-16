// src/components/AnimatedStat.js
import React from 'react';
import { animate } from 'framer-motion';

const AnimatedStat = ({ icon, endValue, label }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const controls = animate(0, endValue, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(value) {
              node.textContent = Math.round(value).toLocaleString();
            },
          });
          observer.unobserve(node); // Animate only once
          return () => controls.stop();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <div className="text-center">
      <div className="text-sky-400 mb-3">{icon}</div>
      <p className="text-4xl md:text-5xl font-bold text-white">
        <span ref={ref}>0</span>+
      </p>
      <p className="text-sm text-neutral-400 mt-1">{label}</p>
    </div>
  );
};

export default AnimatedStat;