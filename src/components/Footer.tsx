import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms' | 'about' | 'contact') => void;
  onNavigateHome: () => void;
  onNavigateCreate: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onNavigateHome,
  onNavigateCreate,
}) => {
  return (
    <footer className="bg-gradient-to-b from-[#5C0A19] to-[#0A0E2A] text-[#F7E7B4] pt-16 pb-12 border-t border-[#D4AF37]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C8102E] to-[#A00C24] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-glow-red">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-1">
                <span>Velvet</span>
                <span className="text-[#C8102E]">Wishes</span>
              </span>
            </div>
            <p className="text-sm text-[#F7E7B4]/80 max-w-md leading-relaxed">
              Create a personalized, royal birthday surprise website in minutes. Share meaningful memories, heartfelt letters, beautiful music, and interactive cake celebrations that make your loved ones feel truly celebrated.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] pt-2">
              <span>Made with love</span>
              <Heart className="w-3.5 h-3.5 fill-[#C8102E] text-[#C8102E]" />
              <span>in royal red and navy blue for unforgettable moments</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-sans">
              Experiences
            </h4>
            <ul className="space-y-2 text-sm text-[#F7E7B4]/80">
              <li>
                <button
                  onClick={onNavigateCreate}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  Birthday Letter
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateCreate}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  Interactive Birthday Party
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateCreate}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  Photo Memories Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateCreate}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  Birthday Countdown
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-sans">
              Information
            </h4>
            <ul className="space-y-2 text-sm text-[#F7E7B4]/80">
              <li>
                <button
                  onClick={() => onOpenLegal('about')}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  About VelvetWishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D4AF37]/80">
          <p>© {new Date().getFullYear()} VelvetWishes. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy
            </button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms
            </button>
            <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
