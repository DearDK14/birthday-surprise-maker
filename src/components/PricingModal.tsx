import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Heart, Zap } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPublish: () => void;
  isPublishing: boolean;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onConfirmPublish,
  isPublishing,
}) => {
  // Configurable mode: Defaults to Development / Free Mode for seamless publishing
  const [useTestMode, setUseTestMode] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0A0E2A]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EBD9A5] relative overflow-hidden text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#111111]/60 hover:bg-[#FAF6EB] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EB] text-[#C8102E] text-xs font-semibold border border-[#EBD9A5]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Publish Your Birthday Gift</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#111111]">
            Ready to Share the Magic?
          </h3>
          <p className="text-xs text-[#111111]/70 leading-relaxed">
            Everything is set! Confirm below to generate your private shareable link, permanent storage, and custom QR code.
          </p>
        </div>

        {/* Feature inclusions checklist */}
        <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] space-y-2.5 mb-6 text-xs text-[#111111]">
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span>Interactive Birthday Opening Sequence (Envelope or Cake)</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span>Cherished Photo Memories Gallery with Lightbox</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span>Ambient Background Music & Confetti Celebrations</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span>Works seamlessly on iOS, Android, Tablets, and Desktops</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span>Custom QR Code & Instant Social Links</span>
          </div>
        </div>

        {/* Price & Mode Indicator */}
        <div className="p-4 rounded-2xl border-2 border-[#D4AF37] bg-white flex items-center justify-between mb-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-[#111111]">
                {useTestMode ? 'Free Publishing Mode' : 'Standard Digital Gift'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                {useTestMode ? 'Dev Mode ($0)' : '$4.99'}
              </span>
            </div>
            <p className="text-[11px] text-[#111111]/70 mt-0.5">
              {useTestMode
                ? 'Development mode enabled. Full publishing is unlocked with no charge.'
                : 'One-time fee, hosted forever, zero advertisements.'}
            </p>
          </div>
          <Zap className="w-5 h-5 text-[#D4AF37] shrink-0" />
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            type="button"
            disabled={isPublishing}
            onClick={onConfirmPublish}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#C8102E] hover:bg-[#A00C24] text-white font-semibold text-sm shadow-md hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 border border-[#D4AF37]/50"
          >
            {isPublishing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Publishing Gift to Cloud...</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 text-[#D4AF37]" />
                <span>Confirm & Generate Share Link</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-[#111111]/70 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Private and accessible only via your unique link.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
