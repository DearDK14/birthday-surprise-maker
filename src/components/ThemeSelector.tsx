import React from 'react';
import { Sparkles, Check, Palette, Type, Wand2 } from 'lucide-react';
import { ThemeId, FontPairing, AnimationIntensity } from '../types/birthday';
import { THEMES } from '../lib/constants';

interface ThemeSelectorProps {
  selectedThemeId: ThemeId;
  selectedFontPairing: FontPairing;
  selectedIntensity: AnimationIntensity;
  recipientName?: string;
  onThemeChange: (themeId: ThemeId) => void;
  onFontChange: (font: FontPairing) => void;
  onIntensityChange: (intensity: AnimationIntensity) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedThemeId,
  selectedFontPairing,
  selectedIntensity,
  recipientName = 'Sophia',
  onThemeChange,
  onFontChange,
  onIntensityChange,
}) => {
  const currentTheme = THEMES[selectedThemeId] || THEMES['purple-dreams'];

  return (
    <div className="space-y-8">
      {/* 1. Theme Palette Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#111111] flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#C8102E]" />
          <span>Color Atmosphere & Theme</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(THEMES).map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => onThemeChange(theme.id as ThemeId)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#C8102E] shadow-glow ring-2 ring-[#EBD9A5]'
                    : 'bg-white/80 hover:bg-white border-[#EBD9A5]/60 hover:border-[#D4AF37]'
                }`}
              >
                <div>
                  {/* Theme Gradient swatch bar */}
                  <div
                    className={`h-16 rounded-xl ${theme.bgGradient} mb-3 flex items-center justify-center relative overflow-hidden shadow-inner`}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#111111]">{theme.name}</h4>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#111111]/70 mt-1 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Font Pairing Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#111111] flex items-center gap-2">
          <Type className="w-4 h-4 text-[#C8102E]" />
          <span>Typography & Letter Font</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'serif-elegant',
              name: 'Serif Elegance',
              desc: 'Timeless Playfair Display & clean body text',
              sample: 'Happy Birthday',
              fontClass: 'font-serif',
            },
            {
              id: 'romantic-script',
              name: 'Romantic Grace',
              desc: 'Serif letter with cursive signature accent',
              sample: 'With All My Heart',
              fontClass: 'font-serif italic',
            },
            {
              id: 'modern-clean',
              name: 'Modern Clean',
              desc: 'Modern, crisp geometric sans typography',
              sample: 'Celebration Time',
              fontClass: 'font-sans font-bold',
            },
          ].map((item) => {
            const isSelected = selectedFontPairing === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onFontChange(item.id as FontPairing)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#C8102E] shadow-sm ring-1 ring-[#EBD9A5]'
                    : 'bg-white/70 hover:bg-white border-[#EBD9A5]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#111111]">{item.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C8102E]" />}
                </div>
                <div className={`text-base text-[#C8102E] ${item.fontClass} my-1`}>
                  {item.sample}
                </div>
                <p className="text-[11px] text-[#111111]/70">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Animation Intensity */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#111111] flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-[#C8102E]" />
          <span>Surprise Animation Intensity</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'subtle', label: 'Subtle', desc: 'Gentle float & calm pace' },
            { id: 'magical', label: 'Magical ✨', desc: 'Floating stars & smooth glow' },
            { id: 'festive', label: 'Festive 🎉', desc: 'Abundant sparkles & bursts' },
          ].map((item) => {
            const isSelected = selectedIntensity === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onIntensityChange(item.id as AnimationIntensity)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-white border-[#C8102E] shadow-sm'
                    : 'bg-white/70 hover:bg-white border-[#EBD9A5]/60'
                }`}
              >
                <div className="text-xs font-semibold text-[#111111]">{item.label}</div>
                <div className="text-[10px] text-[#111111]/70 mt-0.5">{item.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Mini Preview */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-semibold text-[#C8102E] uppercase tracking-wider block">
          Live Atmosphere Sample
        </span>
        <div
          className={`rounded-2xl p-6 ${currentTheme.bgGradient} shadow-md text-center relative overflow-hidden transition-all duration-500`}
        >
          <div className="relative z-10 max-w-sm mx-auto p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-sm">
            <span className="text-xs text-[#C8102E] font-semibold tracking-wider uppercase block mb-1">
              Sample Letter Card
            </span>
            <h4
              className={`text-lg font-bold text-[#111111] mb-1 ${
                selectedFontPairing === 'modern-clean' ? 'font-sans' : 'font-serif'
              }`}
            >
              Happy Birthday, {recipientName || 'Sophia'}!
            </h4>
            <p className="text-xs text-[#111111]/70">
              A sneak peek of the typography, colors, and magical styling your recipient will see.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
