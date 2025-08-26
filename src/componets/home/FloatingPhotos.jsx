import { motion } from 'framer-motion';


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