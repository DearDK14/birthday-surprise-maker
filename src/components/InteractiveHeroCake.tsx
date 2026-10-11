import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveHeroCakeProps {
  litCandlesCount?: number; // 0 to 5
  isBlowing?: boolean;
  scale?: number;
}

export const InteractiveHeroCake: React.FC<InteractiveHeroCakeProps> = ({
  litCandlesCount = 5,
  isBlowing = false,
  scale = 1,
}) => {
  // 5 Candles with x positions on the cake top
  const candleConfigs = [
    { id: 0, x: 105, height: 44, wax1: '#C8102E', wax2: '#A00C24', stripe: '#F7E7B4' },
    { id: 1, x: 132, height: 48, wax1: '#D4AF37', wax2: '#B38F24', stripe: '#FAF6EB' },
    { id: 2, x: 160, height: 52, wax1: '#C8102E', wax2: '#800A1D', stripe: '#D4AF37' },
    { id: 3, x: 188, height: 48, wax1: '#D4AF37', wax2: '#B38F24', stripe: '#FAF6EB' },
    { id: 4, x: 215, height: 44, wax1: '#C8102E', wax2: '#A00C24', stripe: '#F7E7B4' },
  ];

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center select-none"
      style={{ transform: `scale(${scale})` }}
      animate={{
        y: ['0px', '-6px', '0px'],
        rotate: isBlowing ? [-0.5, 0.5, -0.5] : [0, 0, 0],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="relative w-[300px] sm:w-[340px] flex items-center justify-center">
        <svg
          viewBox="0 0 320 350"
          className="w-full h-auto overflow-visible filter drop-shadow-[0_16px_28px_rgba(200,16,46,0.25)]"
        >
          <defs>
            {/* Stand Shading Gradients */}
            <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAF6EB" />
              <stop offset="30%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F7E7B4" />
            </linearGradient>

            <linearGradient id="standStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F7E7B4" />
              <stop offset="35%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>

            {/* Lower Tier Cake Shading */}
            <linearGradient id="lowerTierCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F7E7B4" />
              <stop offset="25%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FAF6EB" />
              <stop offset="90%" stopColor="#EBD9A5" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>

            <radialGradient id="lowerTierTop" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FAF6EB" />
              <stop offset="100%" stopColor="#F7E7B4" />
            </radialGradient>

            {/* Upper Tier Cake Shading */}
            <linearGradient id="upperTierCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A00C24" />
              <stop offset="25%" stopColor="#E02947" />
              <stop offset="65%" stopColor="#C8102E" />
              <stop offset="90%" stopColor="#A00C24" />
              <stop offset="100%" stopColor="#800A1D" />
            </linearGradient>

            <radialGradient id="upperTierTop" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FAF6EB" />
              <stop offset="60%" stopColor="#F7E7B4" />
              <stop offset="100%" stopColor="#EBD9A5" />
            </radialGradient>

            {/* Glossy Royal Glaze Drip Gradient */}
            <linearGradient id="glazeDripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E02947" />
              <stop offset="20%" stopColor="#C8102E" />
              <stop offset="60%" stopColor="#A00C24" />
              <stop offset="100%" stopColor="#800A1D" />
            </linearGradient>

            {/* Stand Bottom Shadow */}
            <radialGradient id="standShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ------------------------------------------------------- */}
          {/* 1. CERAMIC CAKE STAND                                   */}
          {/* ------------------------------------------------------- */}
          {/* Base Floor Shadow */}
          <ellipse cx="160" cy="336" rx="85" ry="12" fill="url(#standShadow)" />

          {/* Pedestal Foot Base */}
          <ellipse cx="160" cy="326" rx="60" ry="10" fill="url(#standGrad)" stroke="#D4AF37" strokeWidth="1" />
          <path d="M 100 326 A 60 10 0 0 0 220 326 L 220 330 A 60 10 0 0 1 100 330 Z" fill="#FAF6EB" />
          <ellipse cx="160" cy="330" rx="60" ry="8" fill="#FFFFFF" opacity="0.6" />

          {/* Pedestal Stem */}
          <path
            d="M 148 245 C 148 275, 142 305, 126 322 L 194 322 C 178 305, 172 275, 172 245 Z"
            fill="url(#standStemGrad)"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />

          {/* Ceramic Plate Rim */}
          <ellipse cx="160" cy="245" rx="125" ry="20" fill="url(#standGrad)" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M 35 245 A 125 20 0 0 0 285 245 L 285 253 A 125 20 0 0 1 35 253 Z" fill="#FAF6EB" />
          <ellipse cx="160" cy="253" rx="125" ry="18" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />

          {/* ------------------------------------------------------- */}
          {/* 2. LOWER TIER (WARM CHAMPAGNE BASE WITH SPRINKLES)       */}
          {/* ------------------------------------------------------- */}
          {/* Lower Tier Body */}
          <path
            d="M 52 175 A 108 22 0 0 0 268 175 L 268 238 A 108 22 0 0 1 52 238 Z"
            fill="url(#lowerTierCylinder)"
          />

          {/* Lower Tier Top Surface */}
          <ellipse cx="160" cy="175" rx="108" ry="22" fill="url(#lowerTierTop)" stroke="#D4AF37" strokeWidth="1" />

          {/* Gold Pearl Piping at Base of Lower Tier */}
          <g>
            {[
              { cx: 58, cy: 236 }, { cx: 72, cy: 242 }, { cx: 88, cy: 246 }, { cx: 106, cy: 250 },
              { cx: 126, cy: 253 }, { cx: 147, cy: 254 }, { cx: 168, cy: 254 }, { cx: 189, cy: 253 },
              { cx: 209, cy: 250 }, { cx: 228, cy: 247 }, { cx: 245, cy: 243 }, { cx: 260, cy: 237 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r="4.2" fill="#D4AF37" stroke="#FAF6EB" strokeWidth="1" />
            ))}
          </g>

          {/* Sprinkles on Lower Tier Body */}
          <g opacity="0.9">
            {[
              { x: 70, y: 198, c: '#D4AF37', r: -15 }, { x: 92, y: 220, c: '#C8102E', r: 30 },
              { x: 115, y: 202, c: '#111111', r: 45 }, { x: 135, y: 228, c: '#FFFFFF', r: -25 },
              { x: 158, y: 206, c: '#D4AF37', r: 10 }, { x: 178, y: 225, c: '#F7E7B4', r: -35 },
              { x: 198, y: 198, c: '#C8102E', r: 20 }, { x: 220, y: 222, c: '#D4AF37', r: -10 },
              { x: 240, y: 200, c: '#FFFFFF', r: 40 }, { x: 80, y: 225, c: '#D4AF37', r: -40 },
              { x: 145, y: 215, c: '#C8102E', r: 15 }, { x: 210, y: 212, c: '#FFFFFF', r: -30 },
            ].map((sp, i) => (
              <rect
                key={i}
                x={sp.x}
                y={sp.y}
                width="7"
                height="3.2"
                rx="1.6"
                fill={sp.c}
                transform={`rotate(${sp.r} ${sp.x + 3.5} ${sp.y + 1.6})`}
              />
            ))}
          </g>

          {/* ------------------------------------------------------- */}
          {/* 3. UPPER TIER (FLAME RED GLAZE WITH DRIPS)              */}
          {/* ------------------------------------------------------- */}
          {/* Upper Tier Body */}
          <path
            d="M 85 105 A 75 16 0 0 0 235 105 L 235 170 A 75 16 0 0 1 85 170 Z"
            fill="url(#upperTierCylinder)"
          />

          {/* Upper Tier Top Surface */}
          <ellipse cx="160" cy="105" rx="75" ry="16" fill="url(#upperTierTop)" stroke="#D4AF37" strokeWidth="1" />

          {/* Glossy Flame Red Drips */}
          <path
            d="M 85 105 
               Q 92 125, 96 112 
               Q 104 135, 110 115 
               Q 118 142, 126 118 
               Q 136 128, 142 114 
               Q 152 145, 160 116 
               Q 170 138, 178 114 
               Q 188 144, 196 118 
               Q 206 132, 212 112 
               Q 222 140, 228 114 
               Q 232 122, 235 105 
               A 75 16 0 0 1 85 105 Z"
            fill="url(#glazeDripGrad)"
            opacity="0.95"
          />

          {/* Pearl Piping at Middle Tier Connection */}
          <g>
            {[
              { cx: 88, cy: 170 }, { cx: 102, cy: 174 }, { cx: 118, cy: 177 }, { cx: 136, cy: 180 },
              { cx: 155, cy: 181 }, { cx: 174, cy: 180 }, { cx: 192, cy: 178 }, { cx: 208, cy: 175 },
              { cx: 222, cy: 171 }, { cx: 232, cy: 167 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r="3.6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
            ))}
          </g>

          {/* ------------------------------------------------------- */}
          {/* 4. TOP TOPPINGS: MACARONS & MERINGUE CREAMS             */}
          {/* ------------------------------------------------------- */}
          {/* Macaron Left (Flame Red) */}
          <g transform="translate(100, 92) rotate(-15)">
            <ellipse cx="0" cy="0" rx="11" ry="6" fill="#C8102E" stroke="#800A1D" strokeWidth="0.8" />
            <rect x="-10" y="0" width="20" height="2.5" rx="1.2" fill="#FFFFFF" />
            <ellipse cx="0" cy="2.5" rx="11" ry="6" fill="#C8102E" stroke="#800A1D" strokeWidth="0.8" />
          </g>

          {/* Meringue Swirl Left */}
          <path
            d="M 122 96 C 118 90, 122 84, 126 82 C 130 84, 134 90, 130 96 Z"
            fill="#FFFFFF"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
          <circle cx="126" cy="94" r="5" fill="#FFFFFF" />

          {/* Macaron Center (Metallic Gold) */}
          <g transform="translate(160, 96)">
            <ellipse cx="0" cy="0" rx="11" ry="6" fill="#D4AF37" stroke="#B38F24" strokeWidth="0.8" />
            <rect x="-10" y="0" width="20" height="2.5" rx="1.2" fill="#FFFFFF" />
            <ellipse cx="0" cy="2.5" rx="11" ry="6" fill="#D4AF37" stroke="#B38F24" strokeWidth="0.8" />
          </g>

          {/* Ruby Heart Topper */}
          <path
            d="M 160 86 C 158 82, 154 82, 153 85 C 151 88, 153 91, 160 96 C 167 91, 169 88, 167 85 C 166 82, 162 82, 160 86 Z"
            fill="#C8102E"
            stroke="#D4AF37"
            strokeWidth="1"
          />

          {/* Meringue Swirl Right */}
          <path
            d="M 188 96 C 184 90, 188 84, 192 82 C 196 84, 200 90, 196 96 Z"
            fill="#FFFFFF"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
          <circle cx="192" cy="94" r="5" fill="#FFFFFF" />

          {/* Macaron Right (Light Gold) */}
          <g transform="translate(216, 94) rotate(15)">
            <ellipse cx="0" cy="0" rx="11" ry="6" fill="#F7E7B4" stroke="#D4AF37" strokeWidth="0.8" />
            <rect x="-10" y="0" width="20" height="2.5" rx="1.2" fill="#FFFFFF" />
            <ellipse cx="0" cy="2.5" rx="11" ry="6" fill="#F7E7B4" stroke="#D4AF37" strokeWidth="0.8" />
          </g>

          {/* ------------------------------------------------------- */}
          {/* 5. BIRTHDAY CANDLES (STRIPED WAX STICKS)                */}
          {/* ------------------------------------------------------- */}
          {candleConfigs.map((candle) => (
            <g key={candle.id} transform={`translate(${candle.x}, ${98 - candle.height})`}>
              {/* Candle Wick */}
              <line x1="0" y1="0" x2="0" y2="7" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

              {/* Candle Wax Body */}
              <rect
                x="-3"
                y="7"
                width="6"
                height={candle.height}
                rx="1.5"
                fill={candle.wax1}
                stroke={candle.wax2}
                strokeWidth="0.8"
              />

              {/* Spiral Stripe Accents */}
              <line x1="-3" y1="14" x2="3" y2="10" stroke={candle.stripe} strokeWidth="1.8" />
              <line x1="-3" y1="24" x2="3" y2="20" stroke={candle.stripe} strokeWidth="1.8" />
              <line x1="-3" y1="34" x2="3" y2="30" stroke={candle.stripe} strokeWidth="1.8" />
              {candle.height > 46 && (
                <line x1="-3" y1="44" x2="3" y2="40" stroke={candle.stripe} strokeWidth="1.8" />
              )}
            </g>
          ))}
        </svg>

        {/* --------------------------------------------------------- */}
        {/* HTML/FRAMER-MOTION CANDLE FLAMES & SMOKE PUFFS OVERLAY    */}
        {/* --------------------------------------------------------- */}
        <div className="absolute top-[8px] sm:top-[12px] inset-x-0 h-14 pointer-events-none flex justify-center">
          <div className="relative w-full max-w-[320px]">
            {candleConfigs.map((candle, idx) => {
              const isLit = idx < litCandlesCount;
              // Map SVG x coordinate (0..320) to percentage
              const leftPercent = (candle.x / 320) * 100;
              const topPx = 98 - candle.height - 20;

              return (
                <div
                  key={candle.id}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${(topPx / 350) * 100}%`,
                  }}
                >
                  <AnimatePresence>
                    {isLit ? (
                      <motion.div
                        key={`flame_${candle.id}`}
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{
                          scale: isBlowing ? [1, 0.65, 1.3, 0.5] : [1, 1.1, 0.94, 1],
                          rotate: isBlowing ? [-20, 25, -15] : [-2, 2, -1],
                          opacity: 1,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          duration: isBlowing ? 0.25 : 1.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="relative flex flex-col items-center"
                      >
                        {/* Golden Glowing Aura */}
                        <div className="absolute -inset-2.5 bg-[#D4AF37]/40 rounded-full blur-md" />
                        {/* Burning Teardrop Flame */}
                        <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-[#C8102E] via-[#D4AF37] to-[#FEF08A] shadow-[0_0_12px_#D4AF37]" />
                        {/* Cyan/White Inner Core */}
                        <div className="absolute bottom-0 w-1.5 h-2.5 rounded-full bg-white/95" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`smoke_${candle.id}`}
                        initial={{ opacity: 0.85, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -28, scale: 2 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="w-2.5 h-2.5 rounded-full bg-gray-400/50 blur-[1px]"
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
