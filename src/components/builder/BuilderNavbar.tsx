import React from 'react';
import { ChevronLeft, Volume2, VolumeX, Cake } from 'lucide-react';
import { ExperienceType } from '../../types/birthday';

interface BuilderNavbarProps {
  currentStage: 1 | 2 | 3;
  experienceType: ExperienceType;
  onNavigateHome: () => void;
  onSelectStage: (stage: 1 | 2 | 3) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onChangeExperience: (exp: ExperienceType) => void;
}

export const BuilderNavbar: React.FC<BuilderNavbarProps> = ({
  currentStage,
  experienceType,
  onNavigateHome,
  onSelectStage,
  isMuted,
  onToggleMute,
  onChangeExperience,
}) => {
  const getStageBadgeLabel = () => {
    switch (currentStage) {
      case 1:
        return 'BIRTHDAY';
      case 2:
        return 'SURPRISES';
      case 3:
        return 'REVIEW';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0E2A]/95 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 sm:px-6 lg:px-8 py-2.5 transition-all text-white">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: HOME pill and Stage/Experience pill */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-white bg-white/10 border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-white/20 transition-all py-1.5 px-3 rounded-full shadow-2xs cursor-pointer"
            title="Back to home"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>HOME</span>
          </button>

          {/* Current Stage Badge Pill */}
          <div className="flex items-center border border-[#D4AF37]/60 bg-[#C8102E]/30 text-[#F7E7B4] px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-2xs">
            <span>{getStageBadgeLabel()}</span>
          </div>

          {/* Quick Experience Toggle */}
          <button
            type="button"
            onClick={() => onChangeExperience(experienceType === 'party' ? 'letter' : 'party')}
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-[#F7E7B4]/80 hover:text-white transition-colors pl-1 cursor-pointer"
            title="Switch experience"
          >
            <span>({experienceType === 'party' ? 'Party' : 'Letter'})</span>
          </button>
        </div>

        {/* Center: 3 Progress Segments */}
        <div className="flex-1 max-w-lg mx-2 sm:mx-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[1, 2, 3].map((num) => {
              const isFilled = num <= currentStage;

              return (
                <button
                  key={num}
                  type="button"
                  disabled={num > currentStage}
                  onClick={() => num < currentStage && onSelectStage(num as 1 | 2 | 3)}
                  className={`w-full h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                    isFilled
                      ? 'bg-[#C8102E] shadow-[0_0_10px_rgba(200,16,46,0.8)]'
                      : 'bg-white/20'
                  } ${num < currentStage ? 'cursor-pointer hover:opacity-80' : ''}`}
                  title={`Stage ${num}`}
                />
              );
            })}
          </div>
        </div>

        {/* Right: Sound toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMute}
            className="p-1.5 rounded-full text-[#F7E7B4] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
