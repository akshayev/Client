import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400',
  'https://images.unsplash.com/photo-1499155286266-0c6e1f3c0bff?q=80&w=1400',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400',
  'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1400',
  'https://images.unsplash.com/photo-1514976918733-6f8a4f7d3b6f?q=80&w=1400',
  'https://images.unsplash.com/photo-1517406159676-e17f0f6c2415?q=80&w=1400',
  'https://images.unsplash.com/photo-1522770857976-13d6a89c836d?q=80&w=1400',
  'https://images.unsplash.com/photo-1454486518170-c75c5e8c1a17?q=80&w=1400',
  'https://images.unsplash.com/photo-1517406159676-e17f0f6c2415?q=80&w=1400',
];



const FloatingPhotos = () => {
  const photos = images.slice(0, 6);

  return (
    <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
      {photos.map((src, i) => {
        const rotation = (i % 2 === 0 ? 5 : -5) + Math.random() * 5;
        const positionX = i % 2 === 0 ? 10 + Math.random() * 15 : 75 + Math.random() * 15;
        const positionY = 10 + i * 15 + Math.random() * 10;
        const scale = 0.8 + Math.random() * 0.4;
        
        return (
          <motion.img
            key={i}
            src={src}
            alt={`floating-${i}`}
            className="absolute w-52 h-72 object-cover rounded-2xl shadow-2xl border-4 border-white/10"
            initial={{ 
              opacity: 0,
              scale: 0.5,
              x: i % 2 === 0 ? '-100%' : '100%',
              y: `${positionY}%`
            }}
            animate={{ 
              opacity: 1,
              scale: scale,
              x: '0%',
              rotate: rotation
            }}
            transition={{
              delay: 0.8 + i * 0.2,
              duration: 1.2,
              ease: [0.17, 0.67, 0.83, 0.67], // Custom cubic-bezier for a more bouncy feel
            }}
            style={{
              top: `${positionY}%`,
              left: `${positionX}%`,
              transform: `translate3d(0,0,0) rotate(${rotation}deg)`
            }}
            whileHover={{ scale: 1.1, rotate: 0, z: 50 }}
          />
        );
      })}
    </div>
  );
};

export default FloatingPhotos