import React from 'react';
import { SurpriseKey } from '../../types/birthday';

interface SurpriseIllustrationProps {
  categoryKey: SurpriseKey;
  className?: string;
}

export const SurpriseIllustration: React.FC<SurpriseIllustrationProps> = ({
  categoryKey,
  className = 'w-16 h-16',
}) => {
  switch (categoryKey) {
    case 'letter':
      // Flame Red Envelope with 3D Gold wax seal
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="68" rx="28" ry="4" fill="#D4AF37" opacity="0.25" />
          {/* Envelope Body */}
          <rect x="12" y="24" width="56" height="40" rx="8" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Back flap lines */}
          <path d="M13 28L40 48L67 28" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 60L32 43" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M67 60L48 43" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          {/* Gold & Flame Red Wax Seal */}
          <g filter="drop-shadow(0px 2px 4px rgba(200, 16, 46, 0.4))">
            <circle cx="40" cy="46" r="9.5" fill="#C8102E" stroke="#D4AF37" strokeWidth="1.2" />
            <path
              d="M40 49.5L37.2 46.8C35.5 45.3 35.5 43.5 37 42.4C38.2 41.5 39.5 41.9 40 42.8C40.5 41.9 41.8 41.5 43 42.4C44.5 43.5 44.5 45.3 42.8 46.8L40 49.5Z"
              fill="#D4AF37"
            />
          </g>
        </svg>
      );

    case 'whatILove':
      // Gold & Flame Red celebration balloons
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="72" rx="18" ry="3" fill="#D4AF37" opacity="0.2" />
          {/* Balloon strings */}
          <path d="M28 42Q36 58 39 70" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M52 42Q44 58 41 70" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 38L40 70" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
          {/* Back Balloons */}
          <circle cx="28" cy="30" r="14" fill="#111111" stroke="#D4AF37" strokeWidth="1" />
          <ellipse cx="28" cy="43" rx="2" ry="1.5" fill="#D4AF37" />
          <circle cx="52" cy="30" r="14" fill="#F7E7B4" stroke="#D4AF37" strokeWidth="1" />
          <ellipse cx="52" cy="43" rx="2" ry="1.5" fill="#D4AF37" />
          {/* Front Center Flame Red Balloon */}
          <ellipse cx="40" cy="27" rx="15" ry="17" fill="#C8102E" stroke="#D4AF37" strokeWidth="1" />
          <ellipse cx="36" cy="21" rx="4" ry="7" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 36 21)" />
          <ellipse cx="40" cy="43" rx="2.5" ry="2" fill="#D4AF37" />
          {/* Gold bow ribbon */}
          <path d="M37 68C35 66 40 65 40 68C40 65 45 66 43 68Z" fill="#D4AF37" />
        </svg>
      );

    case 'ourStory':
      // Stack of royal wrapped gift boxes with gold ribbons
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="71" rx="26" ry="4" fill="#D4AF37" opacity="0.25" />
          {/* Bottom Large Box (Luxury Black) */}
          <rect x="18" y="46" width="44" height="22" rx="4" fill="#111111" stroke="#D4AF37" strokeWidth="1.2" />
          <rect x="37" y="46" width="6" height="22" fill="#D4AF37" />
          {/* Middle Box (Flame Red) */}
          <rect x="23" y="30" width="34" height="17" rx="3.5" fill="#C8102E" stroke="#D4AF37" strokeWidth="1.2" />
          <rect x="38" y="30" width="4.5" height="17" fill="#F7E7B4" />
          {/* Top Small Box (Champagne Gold) */}
          <rect x="29" y="17" width="22" height="13.5" rx="3" fill="#F7E7B4" stroke="#D4AF37" strokeWidth="1.2" />
          <rect x="38.5" y="17" width="3.5" height="13.5" fill="#C8102E" />
          {/* Metallic Gold Bow on Top */}
          <path
            d="M33 13C33 10 38 12 40 14C42 12 47 10 47 13C47 16 41 15 40 16C39 15 33 16 33 13Z"
            fill="#D4AF37"
          />
          <circle cx="40" cy="15" r="1.8" fill="#C8102E" />
        </svg>
      );

    case 'wishes':
      // Magic glowing stars glass jar
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="70" rx="18" ry="3.5" fill="#D4AF37" opacity="0.2" />
          {/* Glass Jar Body */}
          <rect x="22" y="24" width="36" height="42" rx="12" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Glass reflections */}
          <path d="M26 32Q25 45 26 56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          {/* Gold lid */}
          <rect x="26" y="18" width="28" height="7" rx="3" fill="#D4AF37" stroke="#111111" strokeWidth="0.8" />
          <path d="M24 23H56" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          {/* Fairy string with glowing stars/lights inside */}
          <path d="M28 35Q40 40 48 32Q50 50 36 54Q28 58 44 60" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="34" cy="36" r="3" fill="#D4AF37" filter="drop-shadow(0 0 4px #F7E7B4)" />
          <circle cx="48" cy="38" r="2.5" fill="#C8102E" filter="drop-shadow(0 0 4px #D4AF37)" />
          <circle cx="33" cy="50" r="3.2" fill="#C8102E" filter="drop-shadow(0 0 4px #F7E7B4)" />
          <circle cx="46" cy="53" r="2.8" fill="#D4AF37" filter="drop-shadow(0 0 4px #F7E7B4)" />
          <circle cx="38" cy="44" r="2.2" fill="#F7E7B4" />
        </svg>
      );

    case 'moments':
      // Retro luxury Black & Gold camera with Flame Red button
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="69" rx="24" ry="4" fill="#D4AF37" opacity="0.2" />
          {/* Camera Body (Luxury Black) */}
          <rect x="15" y="26" width="50" height="38" rx="10" fill="#111111" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Camera Top Accent Stripe (Gold) */}
          <path d="M15 36C15 30.5 19.5 26 25 26H55C60.5 26 65 30.5 65 36V37H15V36Z" fill="#D4AF37" />
          {/* Shutter Button (Flame Red) */}
          <rect x="22" y="21" width="9" height="5" rx="2" fill="#C8102E" />
          {/* Flash light */}
          <circle cx="55" cy="31" r="3.5" fill="#F7E7B4" stroke="#D4AF37" strokeWidth="1" />
          {/* Large Camera Lens */}
          <circle cx="40" cy="46" r="14" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="40" cy="46" r="10" fill="#111111" />
          <circle cx="40" cy="46" r="6" fill="#C8102E" />
          <circle cx="42" cy="44" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'places':
      // Folded 3D map with Flame Red location pin
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="69" rx="25" ry="4" fill="#D4AF37" opacity="0.25" />
          {/* Folded Map Segments */}
          <path d="M16 35L32 29L48 35L64 29V59L48 65L32 59L16 65V35Z" fill="#FAF6EB" stroke="#D4AF37" strokeWidth="1.2" />
          {/* Fold Lines */}
          <path d="M32 29V59" stroke="#EBD9A5" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M48 35V65" stroke="#EBD9A5" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Subtle map paths */}
          <path d="M22 55Q32 40 40 46Q52 52 58 38" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          {/* Flame Red 3D Location Teardrop Pin with Gold Ring */}
          <g filter="drop-shadow(0 3px 5px rgba(200, 16, 46, 0.45))">
            <path
              d="M40 50C40 50 49 40 49 32C49 26.5 45 22 40 22C35 22 31 26.5 31 32C31 40 40 50 40 50Z"
              fill="#C8102E"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <circle cx="40" cy="32" r="4.5" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'ourDate':
      // Desk calendar with Flame Red banner & Gold heart
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="70" rx="22" ry="4" fill="#D4AF37" opacity="0.25" />
          {/* Calendar Body */}
          <rect x="18" y="25" width="44" height="40" rx="8" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Top Banner (Flame Red) */}
          <path d="M18 33C18 28.5 21.5 25 26 25H54C58.5 25 62 28.5 62 33V36H18V33Z" fill="#C8102E" />
          {/* Spiral Ring Binders (Gold) */}
          <rect x="25" y="20" width="3.5" height="8" rx="1.5" fill="#D4AF37" />
          <rect x="38.5" y="20" width="3.5" height="8" rx="1.5" fill="#D4AF37" />
          <rect x="51.5" y="20" width="3.5" height="8" rx="1.5" fill="#D4AF37" />
          {/* Calendar grid dots */}
          <circle cx="28" cy="44" r="1.8" fill="#EBD9A5" />
          <circle cx="36" cy="44" r="1.8" fill="#EBD9A5" />
          <circle cx="44" cy="44" r="1.8" fill="#EBD9A5" />
          <circle cx="52" cy="44" r="1.8" fill="#EBD9A5" />
          {/* Gold Heart Marker on Date */}
          <g filter="drop-shadow(0 2px 4px rgba(212, 175, 55, 0.4))">
            <rect x="32" y="49" width="16" height="12" rx="3" fill="#FAF6EB" stroke="#D4AF37" strokeWidth="1" />
            <path
              d="M40 58L38 56C36.8 54.8 36.8 53.5 38 52.7C39 52 40 52.3 40 53C40 52.3 41 52 42 52.7C43.2 53.5 43.2 54.8 42 56L40 58Z"
              fill="#C8102E"
            />
          </g>
        </svg>
      );

    case 'ourSong':
      // Luxury Black vinyl record with Gold rim & Flame Red center
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Shadow */}
          <ellipse cx="40" cy="71" rx="24" ry="4" fill="#D4AF37" opacity="0.25" />
          {/* Vinyl Disc Outer (Luxury Black) */}
          <circle cx="40" cy="42" r="26" fill="#111111" stroke="#D4AF37" strokeWidth="1.2" />
          {/* Concentric Grooves */}
          <circle cx="40" cy="42" r="22" stroke="#262626" strokeWidth="0.8" />
          <circle cx="40" cy="42" r="18" stroke="#262626" strokeWidth="0.8" />
          <circle cx="40" cy="42" r="14" stroke="#262626" strokeWidth="0.8" />
          {/* Center Label (Gold & Flame Red) */}
          <circle cx="40" cy="42" r="9.5" fill="#D4AF37" stroke="#C8102E" strokeWidth="1.5" />
          {/* Center Hole */}
          <circle cx="40" cy="42" r="2.5" fill="#111111" />
          {/* Cute Flame Red Heart on Label */}
          <path
            d="M40 37.5L38.2 35.8C37.2 34.8 37.2 33.8 38.2 33C39 32.4 39.8 32.7 40 33.3C40.2 32.7 41 32.4 41.8 33C42.8 33.8 42.8 34.8 41.8 35.8L40 37.5Z"
            fill="#C8102E"
          />
        </svg>
      );
  }
};
