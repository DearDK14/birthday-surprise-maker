import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { BirthdayGift, SurpriseKey, checkSurpriseReady } from '../../types/birthday';
import { SURPRISE_CATEGORIES } from '../../lib/constants';
import { SurpriseEditorModal } from './SurpriseEditorModal';
import { SurpriseIllustration } from './SurpriseIllustration';

interface StageTwoSurprisesProps {
  draft: BirthdayGift;
  onUpdateDraft: (fields: Partial<BirthdayGift>) => void;
  onNext: () => void;
  onBack: () => void;
  onSelectSurprise?: (key: SurpriseKey) => void;
}

export const StageTwoSurprises: React.FC<StageTwoSurprisesProps> = ({
  draft,
  onUpdateDraft,
  onNext,
  onBack,
  onSelectSurprise,
}) => {
  const [activeEditorKey, setActiveEditorKey] = useState<SurpriseKey | null>(null);

  const readyCount = SURPRISE_CATEGORIES.filter((cat) =>
    checkSurpriseReady(cat.key, draft)
  ).length;

  const recipientDisplayName = draft.recipientName.trim() || 'Dinesh Kaam';

  // Subtitle hints matching 2-luv layout (e.g. Dreams for Wishes, Photos for Moments)
  const getSubLabel = (key: SurpriseKey): string | null => {
    switch (key) {
      case 'wishes':
        return 'Dreams';
      case 'moments':
        return 'Photos';
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-8 animate-in fade-in duration-300">
      <div className="space-y-6">
        {/* Top Accent Dash - Flame Red */}
        <div className="w-10 h-0.5 bg-[#C8102E]" />

        {/* Heading & Subtitle */}
        <div className="space-y-2.5">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            Fill the party with surprises
          </h2>
          <p className="text-xs sm:text-sm text-[#F7E7B4]/85 leading-relaxed max-w-xl">
            Choose only the moments you want to include. All 8 surprises are completely optional — none are mandatory. You have full choice to select as few or as many as you like. Empty ones simply stay out of the party.
          </p>
        </div>

        {/* The Surprises Header Row */}
        <div className="flex items-center justify-between pt-2 border-b border-[#D4AF37]/30 pb-3">
          <h3 className="text-sm sm:text-base font-bold text-white">
            The surprises for <span className="font-serif font-bold text-[#F7E7B4] underline decoration-[#C8102E] decoration-2 underline-offset-4">{recipientDisplayName}</span>
          </h3>

          <span className="text-xs sm:text-sm font-bold text-[#F7E7B4] bg-[#C8102E]/40 border border-[#D4AF37]/50 px-3 py-1 rounded-full">
            {readyCount} of 8 ready (All Optional)
          </span>
        </div>

        {/* The 8 Surprise Cards Grid (2 rows of 4 cards on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
          {SURPRISE_CATEGORIES.map((cat) => {
            const isReady = checkSurpriseReady(cat.key, draft);
            const subLabel = getSubLabel(cat.key);

            return (
              <div
                key={cat.key}
                onClick={() => {
                  setActiveEditorKey(cat.key);
                  onSelectSurprise?.(cat.key);
                }}
                className={`group relative rounded-3xl p-3.5 sm:p-4 text-center flex flex-col items-center justify-between min-h-[175px] transition-all duration-200 cursor-pointer select-none shadow-2xs hover:shadow-md ${
                  isReady
                    ? 'bg-white border-2 border-[#C8102E] ring-4 ring-[#F7E7B4]/60'
                    : 'bg-white border border-[#EBD9A5] hover:border-[#D4AF37]'
                }`}
              >
                {/* Top Right Flame Red & Gold Checkmark Badge when Ready */}
                {isReady && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#C8102E] text-[#D4AF37] flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Centered Illustrated Object */}
                <div className="my-auto py-1 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <SurpriseIllustration categoryKey={cat.key} className="w-16 h-16 sm:w-18 sm:h-18" />
                </div>

                {/* Card Title & Sub-label */}
                <div className="space-y-0.5 mt-auto w-full">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#111111] group-hover:text-[#C8102E] transition-colors">
                    {cat.title}
                  </h4>
                  {subLabel && (
                    <p className="text-[10px] text-[#888888]">{subLabel}</p>
                  )}

                  {/* Status: Ready in flame red or Add in gray */}
                  <div className="pt-1">
                    {isReady ? (
                      <span className="text-xs font-bold text-[#C8102E]">
                        Ready
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#888888]">
                        Add
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Navigation: Back and Next Pill Buttons */}
      <div className="pt-6 border-t border-[#D4AF37]/30 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[#D4AF37]/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-[#D4AF37] font-bold text-xs shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-8 py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white font-bold text-xs shadow-md hover:shadow-glow-red hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-[#D4AF37]/40"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Surprise Category Editor Modal */}
      <SurpriseEditorModal
        surpriseKey={activeEditorKey}
        draft={draft}
        onUpdateDraft={onUpdateDraft}
        onClose={() => setActiveEditorKey(null)}
      />
    </div>
  );
};
