import React, { useState } from 'react';
import {
  Check,
  Plus,
  Edit2,
  ArrowLeft,
  Gift,
  Eye,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { BirthdayGift, SurpriseKey, checkSurpriseReady } from '../../types/birthday';
import { SURPRISE_CATEGORIES } from '../../lib/constants';
import { publishBirthdayGift } from '../../lib/database';
import { SurpriseEditorModal } from './SurpriseEditorModal';
import { SurpriseIllustration } from './SurpriseIllustration';

interface StageThreeReviewProps {
  draft: BirthdayGift;
  onUpdateDraft: (fields: Partial<BirthdayGift>) => void;
  onBack: () => void;
  onPreviewGift: () => void;
  onPublishSuccess: (result: { slug: string; compressedData: string }) => void;
}

export const StageThreeReview: React.FC<StageThreeReviewProps> = ({
  draft,
  onUpdateDraft,
  onBack,
  onPreviewGift,
  onPublishSuccess,
}) => {
  const [activeEditorKey, setActiveEditorKey] = useState<SurpriseKey | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const readyCount = SURPRISE_CATEGORIES.filter((cat) =>
    checkSurpriseReady(cat.key, draft)
  ).length;

  const recipientDisplayName = draft.recipientName.trim() || 'Dinesh Kaam';
  const senderDisplayName = draft.senderName.trim() || 'Your Name';
  const experienceLabel = draft.experienceType === 'party' ? 'A Birthday Party' : 'A Birthday Letter';

  const getSurpriseSummary = (key: SurpriseKey): string => {
    switch (key) {
      case 'letter':
        return draft.birthdayMessage && draft.birthdayMessage.trim().length > 0
          ? `${draft.birthdayMessage.trim().slice(0, 42)}...`
          : 'No letter written yet';
      case 'whatILove':
        return draft.reasonsToLove && draft.reasonsToLove.length > 0
          ? `${draft.reasonsToLove.length} reasons added`
          : 'No reasons added';
      case 'ourStory':
        return draft.storyMilestones && draft.storyMilestones.length > 0
          ? `${draft.storyMilestones.length} milestones in timeline`
          : 'No memories added';
      case 'wishes':
        return draft.wishesList && draft.wishesList.length > 0
          ? `${draft.wishesList.length} birthday wishes`
          : 'No wishes written';
      case 'moments':
        return draft.photos && draft.photos.length > 0
          ? `${draft.photos.length} photos ready`
          : 'No photos uploaded';
      case 'places':
        return draft.places && draft.places.length > 0
          ? `${draft.places.length} special places saved`
          : 'No locations added';
      case 'ourDate':
        return draft.birthdayDate
          ? `Date set for ${draft.birthdayDate}`
          : 'No date configured';
      case 'ourSong':
        return draft.musicTrackId && draft.musicTrackId !== 'none'
          ? 'Background melody selected'
          : 'Melody muted';
    }
  };

  const handleCreateGift = async () => {
    setIsPublishing(true);
    setPublishError(null);

    try {
      const result = await publishBirthdayGift(draft);
      if (result.success && result.slug) {
        onPublishSuccess({
          slug: result.slug,
          compressedData: result.compressedData,
        });
      } else {
        setPublishError(result.error || 'Failed to create gift. Please try again.');
      }
    } catch (err: any) {
      setPublishError(err?.message || 'Something went wrong while publishing.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-8 animate-in fade-in duration-300">
      <div className="space-y-6">
        {/* Top Accent Dash - Flame Red */}
        <div className="w-10 h-0.5 bg-[#C8102E]" />

        {/* Stage Header */}
        <div className="space-y-2.5">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            Your birthday gift is taking shape
          </h2>
          <p className="text-xs sm:text-sm text-[#F7E7B4]/85 leading-relaxed max-w-xl">
            Review your personalized moments and choices before generating the final gift link. All surprises are user choice — empty surprises will stay out of the party automatically.
          </p>
        </div>

        {/* Big Review Summary Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/60 p-5 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#C8102E]">
                {draft.experienceType === 'party' ? 'Party Experience' : 'Letter Experience'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111111]">
                {experienceLabel} for {recipientDisplayName}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A]">
                Created with love by <strong className="text-[#111111] font-semibold">{senderDisplayName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center bg-white px-3.5 py-1.5 rounded-full border border-[#D4AF37] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              <span className="text-xs font-bold text-[#111111]">
                {readyCount} of 8 included
              </span>
            </div>
          </div>
        </div>

        {/* Selected-Items Vertical List */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#F7E7B4]">
            Surprises & Moments List
          </h3>

          <div className="divide-y divide-[#EBD9A5]/50 bg-white rounded-3xl border border-[#EBD9A5] shadow-2xs overflow-hidden">
            {SURPRISE_CATEGORIES.map((cat) => {
              const isReady = checkSurpriseReady(cat.key, draft);
              const summary = getSurpriseSummary(cat.key);

              return (
                <div
                  key={cat.key}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[#FAF6EB] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] flex items-center justify-center shrink-0 p-1">
                      <SurpriseIllustration categoryKey={cat.key} className="w-8 h-8" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#111111] truncate">
                          {cat.title}
                        </h4>

                        {/* Status Badge */}
                        {isReady ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C8102E] bg-[#FDECEF] px-2 py-0.5 rounded-full shrink-0 border border-[#C8102E]/20">
                            <Check className="w-2.5 h-2.5 stroke-[3] text-[#D4AF37]" />
                            <span>Ready</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#888888] bg-[#FAF6EB] px-2 py-0.5 rounded-full border border-[#EBD9A5] shrink-0">
                            <span>Empty</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#666666] truncate mt-0.5">
                        {summary}
                      </p>
                    </div>
                  </div>

                  {/* Edit or Add Action Button */}
                  <div className="shrink-0">
                    {isReady ? (
                      <button
                        type="button"
                        onClick={() => setActiveEditorKey(cat.key)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37] bg-white text-xs font-bold text-[#C8102E] hover:bg-[#F7E7B4]/40 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveEditorKey(cat.key)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EBD9A5] bg-[#FAF6EB] text-xs font-semibold text-[#666666] hover:text-[#111111] hover:bg-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Publish Error Notification */}
        {publishError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[#C8102E] text-xs flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span>{publishError}</span>
          </div>
        )}
      </div>

      {/* Sticky Bottom Navigation Bar */}
      <div className="pt-6 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isPublishing}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[#D4AF37]/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-[#D4AF37] font-bold text-xs shadow-2xs transition-all cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onPreviewGift}
            disabled={isPublishing}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#D4AF37]/60 bg-white/10 backdrop-blur-sm text-xs font-bold text-white hover:bg-white/20 hover:border-[#D4AF37] shadow-2xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#F7E7B4]" />
            <span>Preview Gift</span>
          </button>

          <button
            type="button"
            onClick={handleCreateGift}
            disabled={isPublishing}
            className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white font-bold text-xs shadow-md hover:shadow-glow-red hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 border border-[#D4AF37]/40"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#F7E7B4]" />
                <span>Creating Gift...</span>
              </>
            ) : (
              <>
                <Gift className="w-3.5 h-3.5 text-[#F7E7B4]" />
                <span>Create Gift ✨</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Embedded Editor Modal if triggered from review list */}
      <SurpriseEditorModal
        surpriseKey={activeEditorKey}
        draft={draft}
        onUpdateDraft={onUpdateDraft}
        onClose={() => setActiveEditorKey(null)}
      />
    </div>
  );
};
