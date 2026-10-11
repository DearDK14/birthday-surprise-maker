import React from 'react';
import { Mail, Cake, CheckCircle2, Sparkles, Eye } from 'lucide-react';
import { ExperienceType } from '../types/birthday';

interface ExperienceCardProps {
  type: ExperienceType;
  isSelected: boolean;
  onSelect: () => void;
  onPreviewClick?: () => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  type,
  isSelected,
  onSelect,
  onPreviewClick,
}) => {
  const isLetter = type === 'letter';

  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer border-2 text-left flex flex-col justify-between ${
        isSelected
          ? 'bg-white border-[#C8102E] shadow-glow ring-2 ring-[#EBD9A5]'
          : 'bg-white/80 hover:bg-white border-[#EBD9A5]/60 hover:border-[#D4AF37] shadow-sm hover:shadow-md'
      }`}
    >
      {/* Selected Indicator Badge */}
      {isSelected && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold text-[#C8102E] bg-[#FAF6EB] px-2.5 py-1 rounded-full border border-[#EBD9A5]">
          <CheckCircle2 className="w-4 h-4 text-[#C8102E]" />
          <span>Selected</span>
        </div>
      )}

      <div>
        {/* Visual Illustration Header */}
        <div className="h-44 rounded-xl bg-[#FAF6EB] flex items-center justify-center relative overflow-hidden mb-5 border border-[#EBD9A5] group-hover:scale-[1.01] transition-transform">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F7E7B4]/30 to-transparent" />

          {isLetter ? (
            /* Birthday Letter Illustration */
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-[#C8102E] to-[#A00C24] shadow-lg flex items-center justify-center relative transform -rotate-2 group-hover:rotate-0 transition-transform">
                <div className="absolute -top-3 w-0 h-0 border-x-[48px] border-x-transparent border-b-[24px] border-b-[#C8102E]" />
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] shadow-glow-gold flex items-center justify-center text-[#111111] z-10">
                  <Sparkles className="w-4 h-4 fill-[#111111]" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#C8102E]">
                <Mail className="w-3.5 h-3.5" />
                <span>Sealed with love</span>
              </div>
            </div>
          ) : (
            /* Birthday Party Cake Illustration */
            <div className="relative flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                {/* Candle with flickering flame */}
                <div className="relative flex items-center gap-3 -mb-1 z-20">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-2.5 h-4 rounded-full bg-[#D4AF37] animate-flame shadow-glow-gold" />
                      <div className="w-1.5 h-4 bg-white rounded-t" />
                    </div>
                  ))}
                </div>
                {/* Cake Tier 1 */}
                <div className="w-24 h-10 rounded-t-xl bg-[#FAF6EB] border-t-4 border-[#D4AF37] shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
                {/* Cake Tier 2 */}
                <div className="w-32 h-10 rounded-b-xl bg-[#C8102E] shadow-md border-t-2 border-[#D4AF37] relative">
                  <div className="flex justify-around pt-1">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#C8102E]">
                <Cake className="w-3.5 h-3.5" />
                <span>Make a wish & blow candles</span>
              </div>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="font-serif text-xl font-bold text-[#111111] mb-2 flex items-center gap-2">
          {isLetter ? 'Birthday Letter' : 'Birthday Party'}
        </h3>
        <p className="text-sm text-[#111111]/70 leading-relaxed mb-4">
          {isLetter
            ? 'An intimate, luxury experience. Features a sealed magical envelope that opens with celebratory gold confetti, revealing your heartfelt letter and personalized photo memories with soothing music.'
            : 'A lively, celebratory interactive party! Invites the recipient to light up a glowing birthday cake, make a silent wish, blow out the candles with sound and smoke, followed by your letter and photos.'}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#EBD9A5]/60 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPreviewClick?.();
          }}
          className="text-xs font-medium text-[#C8102E] hover:text-[#A00C24] flex items-center gap-1.5 hover:underline py-1.5 px-2 rounded-lg"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive Demo</span>
        </button>

        <button
          type="button"
          className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
            isSelected
              ? 'bg-[#C8102E] text-white shadow-sm'
              : 'bg-[#FAF6EB] text-[#111111] hover:bg-[#F7E7B4] border border-[#EBD9A5]'
          }`}
        >
          {isSelected ? 'Selected' : 'Choose This'}
        </button>
      </div>
    </div>
  );
};
