import React from 'react';
import { X, Sparkles, Shield, FileText, Mail, Heart } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'about' | 'contact' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

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
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C8102E]">
              <Shield className="w-6 h-6 text-[#C8102E]" />
              <h3 className="font-serif text-2xl font-bold text-[#111111]">Privacy Policy</h3>
            </div>
            <p className="text-xs text-[#111111]/70 leading-relaxed">
              At VelvetWishes, we prioritize the emotional and digital privacy of every birthday surprise you create.
            </p>
            <div className="space-y-3 text-xs text-[#111111]/80">
              <h4 className="font-bold text-[#111111]">1. Private Shareable Links</h4>
              <p>
                Each published gift generates a unique, unguessable link. We do not index private birthday letters into public search engines. Only people with the exact link can view the gift.
              </p>
              <h4 className="font-bold text-[#111111]">2. Personal Photographs & Messages</h4>
              <p>
                Photographs and messages are strictly used to render the recipient's birthday surprise. We do not sell or share personal media with third parties.
              </p>
              <h4 className="font-bold text-[#111111]">3. Data Retention</h4>
              <p>
                Your gifts remain safely preserved so that the recipient can revisit their birthday memory whenever they wish.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C8102E]">
              <FileText className="w-6 h-6 text-[#C8102E]" />
              <h3 className="font-serif text-2xl font-bold text-[#111111]">Terms of Service</h3>
            </div>
            <p className="text-xs text-[#111111]/70 leading-relaxed">
              By using VelvetWishes to create digital birthday experiences, you agree to these simple community standards.
            </p>
            <div className="space-y-3 text-xs text-[#111111]/80">
              <h4 className="font-bold text-[#111111]">1. Appropriate Content</h4>
              <p>
                VelvetWishes is designed for celebrating love, friendship, and family. You agree not to upload abusive, defamatory, copyright-infringing, or unlawful content.
              </p>
              <h4 className="font-bold text-[#111111]">2. Availability</h4>
              <p>
                We strive for continuous service so that your birthday surprises are always accessible when your recipient opens their link.
              </p>
            </div>
          </div>
        )}

        {type === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C8102E]">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="font-serif text-2xl font-bold text-[#111111]">About VelvetWishes</h3>
            </div>
            <p className="text-xs text-[#111111]/70 leading-relaxed">
              VelvetWishes was born from a desire to bring genuine warmth back into digital birthday wishes.
            </p>
            <p className="text-xs text-[#111111]/80 leading-relaxed">
              Instead of a quick text message or disposable post, VelvetWishes lets you gift an immersive, personalized moment: lighting candles, opening letters, listening to tender melodies, and reliving your favorite memories together in lush shades of gold and flame red.
            </p>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C8102E]">
              <Mail className="w-6 h-6 text-[#C8102E]" />
              <h3 className="font-serif text-2xl font-bold text-[#111111]">Contact & Support</h3>
            </div>
            <p className="text-xs text-[#111111]/70 leading-relaxed">
              Have questions, feedback, or a special feature request for your birthday celebrations?
            </p>
            <div className="p-4 rounded-xl bg-[#FAF6EB] border border-[#EBD9A5] text-xs space-y-2">
              <p className="font-semibold text-[#111111]">Support Desk:</p>
              <p className="text-[#C8102E] font-medium">support@velvetwishes.com</p>
              <p className="text-[#111111]/70">We typically reply within 24 hours.</p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#EBD9A5] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#C8102E] hover:bg-[#A00C24] text-white text-xs font-semibold shadow-md border border-[#D4AF37]/40 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
