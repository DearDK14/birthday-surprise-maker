import React from 'react';

// Greeting Note Card under Cake in RCB styling
export const GreetingNoteCard: React.FC<{
  recipient?: string;
  sender?: string;
}> = ({
  recipient = 'Dia',
  sender = 'Alex',
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl py-3 px-6 shadow-lg border border-[#EBD9A5] text-center max-w-xs transition-all hover:scale-105">
      <h4 className="font-serif text-base sm:text-lg font-bold text-[#111111] leading-tight">
        Happy birthday, {recipient}!
      </h4>
      <p className="text-xs text-[#C8102E] mt-0.5 font-sans font-medium">
        {sender} threw a little party just for you.
      </p>
    </div>
  );
};

// Floating Gold, Flame Red & Champagne Confetti Flakes
export const ConfettiFlakes: React.FC = () => {
  const flakes = [
    { top: '12%', left: '8%', color: '#D4AF37', rotate: '25deg', size: '10px' },
    { top: '22%', left: '2%', color: '#C8102E', rotate: '-15deg', size: '12px' },
    { top: '8%', left: '32%', color: '#F7E7B4', rotate: '45deg', size: '8px' },
    { top: '65%', left: '6%', color: '#111111', rotate: '30deg', size: '14px' },
    { top: '80%', left: '14%', color: '#D4AF37', rotate: '-35deg', size: '9px' },
    { top: '15%', right: '35%', color: '#C8102E', rotate: '-20deg', size: '11px' },
    { top: '25%', right: '12%', color: '#F7E7B4', rotate: '55deg', size: '10px' },
    { top: '60%', right: '4%', color: '#D4AF37', rotate: '-45deg', size: '12px' },
    { top: '78%', right: '18%', color: '#A00C24', rotate: '15deg', size: '8px' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {flakes.map((f, i) => (
        <div
          key={i}
          className="absolute rounded-xs opacity-70 shadow-xs"
          style={{
            top: f.top,
            left: (f as any).left,
            right: (f as any).right,
            backgroundColor: f.color,
            width: f.size,
            height: f.size,
            transform: `rotate(${f.rotate})`,
          }}
        />
      ))}
    </div>
  );
};
