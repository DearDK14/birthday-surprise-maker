import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimationIntensity } from '../types/birthday';

interface FloatingParticlesProps {
  intensity?: AnimationIntensity;
  variant?: 'light' | 'dark';
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  intensity = 'magical',
  variant = 'light',
}) => {
  const particleCount = useMemo(() => {
    switch (intensity) {
      case 'subtle':
        return 12;
      case 'festive':
        return 32;
      case 'magical':
      default:
        return 20;
    }
  }, [intensity]);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      isStar: i % 3 === 0,
    }));
  }, [particleCount]);

  const starColor = variant === 'dark' ? '#D4AF37' : '#C8102E';
  const glowColor = variant === 'dark' ? '#F7E7B4' : '#D4AF37';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: ['0px', '-25px', '0px'],
            x: ['0px', `${(p.id % 2 === 0 ? 1 : -1) * 15}px`, '0px'],
            opacity: [0.2, 0.85, 0.2],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.isStar ? (
            <svg
              viewBox="0 0 24 24"
              fill={starColor}
              className="w-full h-full drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            >
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: glowColor,
                boxShadow: `0 0 10px ${glowColor}`,
                opacity: 0.6,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
