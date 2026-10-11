import React, { useState } from 'react';
import { Menu, X, Heart, Gift, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'create' | 'preview') => void;
  currentView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentView = 'home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (sectionId) {
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0E2A]/95 backdrop-blur-md border-b border-[#D4AF37]/35 transition-all text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo - Flame Red & Gold Crown Emblem */}
        <button
          onClick={() => handleNavClick('party')}
          className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C8102E] via-[#A00C24] to-[#C8102E] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-1">
            <span>Velvet</span>
            <span className="text-[#C8102E]">Wishes</span>
          </span>
        </button>

        {/* Center / Right Navigation Items */}
        <div className="hidden md:flex items-center gap-9">
          <nav className="flex items-center gap-8 text-sm font-semibold text-white">
            <button
              onClick={() => handleNavClick('party')}
              className="hover:text-[#F7E7B4] transition-colors cursor-pointer"
            >
              The party
            </button>
            <button
              onClick={() => handleNavClick('candles')}
              className="hover:text-[#F7E7B4] transition-colors cursor-pointer"
            >
              Candles
            </button>
            <button
              onClick={() => onNavigate('create')}
              className="hover:text-[#F7E7B4] transition-colors cursor-pointer"
            >
              Options
            </button>
          </nav>

          {/* Right Action: Create Gift button with Flame Red & Gold */}
          <button
            onClick={() => onNavigate('create')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white border border-[#D4AF37]/50 font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F7E7B4]" />
            <span>Create Gift</span>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-[#121A4A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#1B2462] shadow-2xs transition-all cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5 text-[#D4AF37]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-xl bg-[#121A4A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-2xs cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#D4AF37]/40 bg-[#0A0E2A]/98 backdrop-blur-xl px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl text-white">
          <div className="space-y-3">
            <button
              onClick={() => handleNavClick('party')}
              className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#F7E7B4]"
            >
              The party
            </button>
            <button
              onClick={() => handleNavClick('candles')}
              className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#F7E7B4]"
            >
              Candles (Blow out)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('create');
              }}
              className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#F7E7B4]"
            >
              Create a Birthday Gift
            </button>
          </div>

          <div className="pt-3 border-t border-[#D4AF37]/30">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('create');
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/40"
            >
              <Gift className="w-4 h-4 text-[#F7E7B4]" />
              <span>Start Birthday Gift</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
