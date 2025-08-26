// src/components/gallery/ImageCard.js
import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ImageCard = ({ image, onClick, className, ...props }) => {
    const cardRef = useRef(null);
    const motionValue = useMotionValue(0);
    
    // Instead of using the same value for both axes, create separate ones for more accuracy
    const rotateX = useTransform(useMotionValue(0), [-20, 20], [5, -5]);
    const rotateY = useTransform(motionValue, [-20, 20], [-5, 5]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        
        // Update motion values for X and Y rotation
        rotateX.set(yPct * 40); // Control the vertical rotation
        rotateY.set(xPct * -40); // Control the horizontal rotation
    };
    
    const handleMouseLeave = () => {
        // Reset both rotations
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            {...props}
            ref={cardRef}
            layoutId={`card-${image.uniqueId}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className={`group relative w-64 h-96 md:w-72 md:h-[450px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 ${className}`}
        >
            <motion.img
                src={image.src}
                alt={image.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover z-0"
                style={{ transform: "translateZ(-10px) scale(1.15)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-shadow">
                <h3 className="text-xl font-bold">{image.title}</h3>
                <p className="text-neutral-400 text-sm">{image.description.substring(0, 30)}...</p>
            </div>
        </motion.div>
    );
};

export default ImageCard;