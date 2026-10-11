import React from 'react';
import { X, Sparkles, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../lib/constants';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0A0E2A]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EBD9A5] relative max-h-[85vh] overflow-y-auto text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#111111]/60 hover:bg-[#FAF6EB] transition-colors"
          aria-label="Close FAQ dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#C8102E] mb-4">
          <HelpCircle className="w-6 h-6 text-[#C8102E]" />
          <h3 className="font-serif text-2xl font-bold text-[#111111]">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4 pt-2">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] space-y-1.5">
              <h4 className="text-sm font-bold text-[#111111]">{item.q}</h4>
              <p className="text-xs text-[#111111]/70 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-[#EBD9A5] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#C8102E] hover:bg-[#A00C24] text-white text-xs font-semibold shadow-md border border-[#D4AF37]/40 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
