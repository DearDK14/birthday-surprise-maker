import React, { useState } from 'react';
import { Eye, ArrowRight, ArrowLeft } from 'lucide-react';
import { BirthdayGift } from '../../types/birthday';

interface StageOneNamesProps {
  draft: BirthdayGift;
  onUpdateDraft: (fields: Partial<BirthdayGift>) => void;
  onNext: () => void;
  onBack: () => void;
  onLoadSample: () => void;
}

export const StageOneNames: React.FC<StageOneNamesProps> = ({
  draft,
  onUpdateDraft,
  onNext,
  onBack,
  onLoadSample,
}) => {
  const [errors, setErrors] = useState<{ recipientName?: string; senderName?: string }>({});

  const handleNextClick = () => {
    const newErrors: { recipientName?: string; senderName?: string } = {};

    if (!draft.recipientName.trim()) {
      newErrors.recipientName = "Please enter who is celebrating.";
    }

    if (!draft.senderName.trim()) {
      newErrors.senderName = "Please enter your name or nickname.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const experienceHeadingTitle =
    draft.experienceType === 'party' ? 'Birthday Party' : 'Birthday Letter';

  return (
    <div className="flex flex-col justify-between h-full space-y-8 animate-in fade-in duration-300">
      <div className="space-y-6">
        {/* Top Accent Dash - Flame Red */}
        <div className="w-10 h-0.5 bg-[#C8102E]" />

        {/* Stage 1 Heading */}
        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.18] drop-shadow-sm">
            Create a birthday website with {experienceHeadingTitle}
          </h1>
        </div>

        {/* "See an example" Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-xs font-bold text-white shadow-2xs transition-all hover:bg-white/20 shrink-0 cursor-pointer backdrop-blur-md"
            title="Load sample content to see an example"
          >
            <Eye className="w-3.5 h-3.5 text-[#F7E7B4]" />
            <span>See an example</span>
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-5 pt-4">
          {/* Field 1: Who is celebrating? */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F7E7B4] uppercase tracking-wider block">
              WHO IS CELEBRATING? <span className="text-[#C8102E]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dinesh Kaam"
              value={draft.recipientName}
              onChange={(e) => {
                onUpdateDraft({ recipientName: e.target.value });
                if (errors.recipientName) setErrors((prev) => ({ ...prev, recipientName: undefined }));
              }}
              className={`w-full text-base px-4 py-3 rounded-2xl border transition-all bg-white text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 shadow-sm ${
                errors.recipientName
                  ? 'border-[#C8102E] focus:ring-[#F7E7B4]'
                  : 'border-[#EBD9A5] focus:border-[#C8102E] focus:ring-[#F7E7B4]'
              }`}
            />
            {errors.recipientName && (
              <p className="text-xs text-[#FECDD3] font-bold mt-1">{errors.recipientName}</p>
            )}
          </div>

          {/* Field 2: Who is creating the surprise? */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#F7E7B4] uppercase tracking-wider block">
              WHO IS CREATING THE SURPRISE? <span className="text-[#C8102E]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Your Name"
              value={draft.senderName}
              onChange={(e) => {
                onUpdateDraft({ senderName: e.target.value });
                if (errors.senderName) setErrors((prev) => ({ ...prev, senderName: undefined }));
              }}
              className={`w-full text-base px-4 py-3 rounded-2xl border transition-all bg-white text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 shadow-sm ${
                errors.senderName
                  ? 'border-[#C8102E] focus:ring-[#F7E7B4]'
                  : 'border-[#EBD9A5] focus:border-[#C8102E] focus:ring-[#F7E7B4]'
              }`}
            />
            {errors.senderName && (
              <p className="text-xs text-[#FECDD3] font-bold mt-1">{errors.senderName}</p>
            )}
          </div>

          {/* Field 3 & 4: Date and Nickname */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F7E7B4] uppercase tracking-wider block">
                BIRTHDAY DATE <span className="font-normal text-[10px] text-[#F7E7B4]/70">(FOR COUNTDOWN)</span>
              </label>
              <input
                type="date"
                value={draft.birthdayDate}
                onChange={(e) => onUpdateDraft({ birthdayDate: e.target.value, specialDate: e.target.value })}
                className="w-full text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:ring-2 focus:ring-[#F7E7B4] bg-white text-[#111111] focus:outline-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F7E7B4] uppercase tracking-wider block">
                OPTIONAL NICKNAME
              </label>
              <input
                type="text"
                placeholder="e.g. Rockstar, Bestie"
                value={draft.nickname || ''}
                onChange={(e) => onUpdateDraft({ nickname: e.target.value })}
                className="w-full text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:ring-2 focus:ring-[#F7E7B4] bg-white text-[#111111] placeholder:text-[#888888] focus:outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation: Back and Next Pill Buttons */}
      <div className="pt-6 border-t border-[#D4AF37]/25 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[#D4AF37]/50 bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="inline-flex items-center gap-1.5 px-8 py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white font-bold text-xs shadow-md hover:shadow-glow-red hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-[#D4AF37]/40"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
