import React from 'react';
import { motion } from 'framer-motion';

interface FoilBalloonProps {
  digit: string;
  delay?: number;
  rotation?: number;
}

export const FoilBalloon: React.FC<FoilBalloonProps> = ({
  digit,
  delay = 0,
  rotation = 0,
}) => {
  return (
    <motion.div
      className="relative select-none pointer-events-none drop-shadow-xl"
      animate={{
        y: ['0px', '-10px', '0px'],
        rotate: [rotation - 2, rotation + 2, rotation - 2],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{
        transformOrigin: 'bottom center',
      }}
    >
      {/* 3D Foil Number in RCB Gold & Flame Red finish */}
      <div className="relative flex items-center justify-center">
        {/* Glow behind the balloon */}
        <div className="absolute inset-0 bg-[#D4AF37]/35 blur-2xl rounded-full" />

        <svg
          viewBox="0 0 100 130"
          className="w-24 h-32 sm:w-32 sm:h-44 md:w-36 md:h-48 overflow-visible filter drop-shadow-[0_12px_22px_rgba(200,16,46,0.3)]"
        >
          <defs>
            {/* Metallic Gold & Flame Red Foil Gradient */}
            <linearGradient id={`foilGrad_gold_${digit}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF8" />
              <stop offset="20%" stopColor="#F7E7B4" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#800A1D" />
            </linearGradient>

            {/* Specular Light Highlight Gradient */}
            <linearGradient id={`foilHighlight_gold_${digit}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Shadow Depth Gradient */}
            <radialGradient id={`foilShadow_gold_${digit}`} cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="#111111" stopOpacity="0" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0.5" />
            </radialGradient>
          </defs>

          {/* Balloon Valve / Tie at bottom */}
          <polygon
            points="46,122 54,122 56,128 44,128"
            fill="#C8102E"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <circle cx="50" cy="128" r="2.5" fill="#D4AF37" />

          {/* Balloon Digit Path / Text styled as inflated foil */}
          <text
            x="50"
            y="108"
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="108"
            fontWeight="900"
            fill={`url(#foilGrad_gold_${digit})`}
            stroke="#D4AF37"
            strokeWidth="3"
            paintOrder="stroke fill"
            className="tracking-tighter"
          >
            {digit}
          </text>

          {/* Specular Shine Overlay */}
          <text
            x="48"
            y="106"
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="108"
            fontWeight="900"
            fill={`url(#foilHighlight_gold_${digit})`}
            className="tracking-tighter opacity-70 pointer-events-none"
          >
            {digit}
          </text>

          {/* Edge Inner Shade */}
          <text
            x="50"
            y="108"
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="108"
            fontWeight="900"
            fill={`url(#foilShadow_gold_${digit})`}
            className="tracking-tighter opacity-35 pointer-events-none"
          >
            {digit}
          </text>
        </svg>
      </div>
    </motion.div>
  );
};
