import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Monitor,
  RotateCcw,
  Maximize2,
  Gift,
  Cake,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Heart,
  Camera,
  MapPin,
  Sparkles,
  X,
  Edit2,
  Play,
  Pause,
  Flame,
  Wind,
} from 'lucide-react';
import { BirthdayGift, ExperienceType, SurpriseKey } from '../../types/birthday';
import { InteractiveHeroCake } from '../InteractiveHeroCake';

interface BirthdayPhonePreviewProps {
  draft: BirthdayGift;
  onExpandPreview: () => void;
  onChangeExperience: (exp: ExperienceType) => void;
  activeSlideIndex?: number;
  onSlideChange?: (index: number) => void;
  onOpenEditor?: (key: SurpriseKey) => void;
}

const SLIDES = [
  { key: 'letter', title: 'The letter' },
  { key: 'whatILove', title: 'What I love' },
  { key: 'ourStory', title: 'Our story' },
  { key: 'wishes', title: 'Wishes' },
  { key: 'moments', title: 'Moments' },
  { key: 'places', title: 'Places' },
  { key: 'ourDate', title: 'Our date' },
  { key: 'ourSong', title: 'Our song' },
  { key: 'cake', title: 'Birthday cake' },
  { key: 'celebration', title: 'Make a wish' },
];

export const BirthdayPhonePreview: React.FC<BirthdayPhonePreviewProps> = ({
  draft,
  onExpandPreview,
  onChangeExperience,
  activeSlideIndex,
  onSlideChange,
  onOpenEditor,
}) => {
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Sync with external active slide index if passed
  useEffect(() => {
    if (activeSlideIndex !== undefined && activeSlideIndex >= 0 && activeSlideIndex < SLIDES.length) {
      setCurrentSlide(activeSlideIndex);
    }
  }, [activeSlideIndex]);

  const recipientDisplayName = draft.recipientName.trim() || 'Dinesh Kaam';
  const senderDisplayName = draft.senderName.trim() || 'Dinesh K';

  // Format date nicely (e.g. OCTOBER 10)
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'OCTOBER 10';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'OCTOBER 10';
      return date
        .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
        .toUpperCase();
    } catch {
      return 'OCTOBER 10';
    }
  };

  const displayDate = formatDisplayDate(draft.birthdayDate);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev > 0 ? prev - 1 : SLIDES.length - 1;
      onSlideChange?.(next);
      return next;
    });
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev < SLIDES.length - 1 ? prev + 1 : 0;
      onSlideChange?.(next);
      return next;
    });
  };

  const handleGoToSlide = (idx: number) => {
    setCurrentSlide(idx);
    onSlideChange?.(idx);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setIsLetterOpen(false);
    setCandlesLit(true);
    setIsPlayingSong(false);
  };

  /* ========================================================= */
  /* SLIDE CONTENT RENDERER (RCB FLAME RED, BLACK & GOLD)      */
  /* ========================================================= */
  const renderSlideContent = (isDesktopView: boolean = false) => {
    switch (currentSlide) {
      case 0: {
        // SLIDE 1: THE LETTER (FLAME RED ENVELOPE WITH GOLD WAX SEAL)
        return (
          <div className="flex-1 w-full flex flex-col justify-end items-center relative pb-6 pt-2 select-none animate-in fade-in duration-300">
            {/* Pulled-Out Letter Sheet (Hidden until opened) */}
            <div
              className={`w-[92%] ${
                isDesktopView ? 'max-w-[360px]' : 'max-w-[285px]'
              } bg-white rounded-t-2xl shadow-xl border border-[#D4AF37]/40 z-20 transition-all duration-500 ease-out flex flex-col relative overflow-hidden ${
                isLetterOpen
                  ? 'translate-y-2 opacity-100 pointer-events-auto'
                  : 'translate-y-48 opacity-0 pointer-events-none'
              }`}
            >
              {/* Top Accent Strip - Flame Red & Gold */}
              <div className="w-full h-1.5 bg-gradient-to-r from-[#C8102E] via-[#D4AF37] to-[#C8102E]" />

              {/* Letter Sheet Header */}
              <div className="px-3.5 pt-2.5 pb-2 flex items-center justify-between border-b border-[#FAF6EB]">
                <div>
                  <span className="text-[8px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                    OPEN THE ENVELOPE
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#111111] leading-tight">
                    {draft.messageTitle || 'A letter for you'}
                  </h4>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLetterOpen(false);
                    }}
                    className="w-5 h-5 rounded-full bg-[#FAF6EB] text-[#111111] hover:bg-[#F7E7B4] flex items-center justify-center transition-colors cursor-pointer"
                    title="Close letter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Letter Sheet Content (Empty until user enters message) */}
              <div
                className={`p-3.5 pt-3 space-y-2.5 overflow-y-auto ${
                  isDesktopView ? 'max-h-[220px]' : 'max-h-[160px]'
                } scrollbar-none`}
              >
                {/* Recipient Greeting */}
                <p className="font-serif text-xs sm:text-sm font-bold text-[#111111]">
                  Dear <span className="text-[#C8102E]">{recipientDisplayName}</span>,
                </p>

                {/* Birthday Wish Message Body - Only shown if entered! */}
                {draft.birthdayMessage && draft.birthdayMessage.trim().length > 0 ? (
                  <p className="text-[11px] sm:text-xs text-[#222222] leading-relaxed whitespace-pre-line font-serif">
                    {draft.birthdayMessage}
                  </p>
                ) : (
                  <div className="py-5 space-y-2.5">
                    <div className="w-full h-2 bg-[#FAF6EB] rounded" />
                    <div className="w-4/5 h-2 bg-[#FAF6EB] rounded" />
                    <div className="w-3/5 h-2 bg-[#FAF6EB] rounded" />
                  </div>
                )}

                {/* Hand-written Signature */}
                {(draft.closingNote || draft.signature || draft.senderName) && (
                  <div className="pt-2 text-right">
                    {draft.closingNote && (
                      <p className="text-[9px] text-[#666666] italic">
                        {draft.closingNote}
                      </p>
                    )}
                    <p className="font-handwriting text-base sm:text-lg font-bold text-[#C8102E] leading-tight">
                      {draft.signature || senderDisplayName}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Realistic Flame Red Envelope Container with Gold Wax Seal */}
            <div
              onClick={() => setIsLetterOpen(!isLetterOpen)}
              className={`w-[96%] ${
                isDesktopView ? 'max-w-[390px]' : 'max-w-[305px]'
              } ${isLetterOpen ? 'h-36' : 'h-48'} bg-gradient-to-br from-[#C8102E] via-[#A00C24] to-[#7A091B] rounded-2xl shadow-2xl relative z-10 cursor-pointer overflow-hidden border border-[#D4AF37]/50 flex flex-col justify-center items-center p-2.5 transition-all duration-300`}
            >
              {/* Envelope Flap Fold Lines */}
              <div className="absolute inset-x-0 top-0 h-20 bg-white/15 border-b border-white/20 [clip-path:polygon(0_0,50%_100%,100%_0)] pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-28 bg-black/15 [clip-path:polygon(0_0,100%_50%,0_100%)] pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-28 bg-black/15 [clip-path:polygon(100%_0,0_50%,100%_100%)] pointer-events-none" />

              {/* Metallic Gold Wax Seal Button */}
              <div className="z-20 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F7E7B4] to-[#C59E27] shadow-md border-2 border-white/80 flex items-center justify-center transform hover:scale-105 active:scale-95 transition-transform">
                  <Heart className="w-4 h-4 fill-[#111111] text-[#111111]" />
                </div>
                <span className="text-[8px] font-bold text-[#111111] uppercase tracking-widest mt-1.5 drop-shadow-xs bg-[#F7E7B4] px-2 py-0.5 rounded-full border border-[#D4AF37]/60">
                  {isLetterOpen ? '▼ CLOSE LETTER' : '▲ CLICK TO OPEN'}
                </span>
              </div>
            </div>
          </div>
        );
      }

      case 1: {
        // SLIDE 2: WHAT I LOVE
        const reasons =
          draft.reasonsToLove && draft.reasonsToLove.length > 0
            ? draft.reasonsToLove
            : [
                'Your infectious smile that brightens any room',
                'Your endless kindness and genuine heart',
                'How you always bring laughter and warmth wherever you go',
              ];

        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                WHAT I LOVE ABOUT YOU
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                For Dearest {recipientDisplayName}
              </h4>
            </div>

            <div className="w-full space-y-2 max-w-[285px]">
              {reasons.slice(0, 3).map((r, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-2.5 shadow-2xs border border-[#EBD9A5] flex items-center gap-2.5 text-left transform hover:scale-[1.01] transition-transform"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#C8102E] to-[#A00C24] text-[#F7E7B4] flex items-center justify-center shrink-0 font-bold text-[10px]">
                    {i + 1}
                  </div>
                  <p className="text-[11px] font-medium text-[#111111] leading-snug line-clamp-2 font-serif">
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 2: {
        // SLIDE 3: OUR STORY
        const milestones =
          draft.storyMilestones && draft.storyMilestones.length > 0
            ? draft.storyMilestones
            : [
                {
                  id: '1',
                  yearOrDate: '2023',
                  title: 'The First Spark',
                  story: 'The day we met and instantly clicked.',
                },
                {
                  id: '2',
                  yearOrDate: '2024',
                  title: 'Unforgettable Adventures',
                  story: 'Late night laughter and endless journeys.',
                },
                {
                  id: '3',
                  yearOrDate: '2026',
                  title: 'Another Golden Year',
                  story: 'Celebrating you today and always!',
                },
              ];

        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                OUR STORY & MEMORIES
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                Cherished Milestones
              </h4>
            </div>

            <div className="w-full space-y-2 max-w-[285px]">
              {milestones.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl p-2.5 shadow-2xs border border-[#EBD9A5] text-left"
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-serif text-xs font-bold text-[#C8102E]">
                      {m.title}
                    </span>
                    <span className="text-[9px] font-bold text-[#111111] bg-[#F7E7B4] px-1.5 py-0.5 rounded-md border border-[#D4AF37]/40">
                      {m.yearOrDate}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#4A4A4A] leading-tight line-clamp-2">
                    {m.story}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 3: {
        // SLIDE 4: WISHES
        const wishes =
          draft.wishesList && draft.wishesList.length > 0
            ? draft.wishesList
            : [
                'May all your biggest dreams turn into realities this year!',
                'Endless joy, vibrant health, and hearty laughs each day.',
                'Unconditional peace of mind and sweetest memories.',
              ];

        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                BIRTHDAY WISHES
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                Hopes for the Year Ahead
              </h4>
            </div>

            <div className="w-full space-y-2 max-w-[285px]">
              {wishes.slice(0, 3).map((w, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-2.5 shadow-2xs border border-[#EBD9A5] flex items-center gap-2 text-left"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <p className="text-[11px] font-medium text-[#111111] leading-snug font-serif">
                    {w}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 4: {
        // SLIDE 5: MOMENTS (POLAROID PHOTO MOMENTS)
        const photo = draft.photos && draft.photos.length > 0 ? draft.photos[0] : null;

        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                PHOTO MOMENTS
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                Captured Smile
              </h4>
            </div>

            {/* Polaroid Snapshot Card */}
            <div className="bg-white p-2.5 pb-4 rounded-xl shadow-xl border border-[#D4AF37]/40 rotate-2 transform hover:rotate-0 transition-transform max-w-[220px] w-full text-center">
              {photo ? (
                <img
                  src={photo.url}
                  alt="Birthday memory"
                  className="w-full h-36 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-36 bg-[#FAF6EB] rounded-md flex flex-col items-center justify-center text-[#C8102E] gap-1 border border-dashed border-[#D4AF37]">
                  <Camera className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[9px] font-bold text-[#111111]">Your Photo Here</span>
                </div>
              )}
              <p className="text-[10px] font-handwriting text-[#111111] mt-2 font-bold line-clamp-1">
                {photo?.caption || `Precious moment with ${recipientDisplayName} ✨`}
              </p>
            </div>
          </div>
        );
      }

      case 5: {
        // SLIDE 6: PLACES
        const places =
          draft.places && draft.places.length > 0
            ? draft.places
            : [
                {
                  id: '1',
                  name: 'Sunset Point Cafe',
                  description: 'Where we shared countless talks and laughs.',
                },
                {
                  id: '2',
                  name: 'The Old Bookstore',
                  description: 'Our quiet sanctuary on rainy days.',
                },
              ];

        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                SPECIAL PLACES
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                Places in Our Hearts
              </h4>
            </div>

            <div className="w-full space-y-2 max-w-[285px]">
              {places.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-2.5 shadow-2xs border border-[#EBD9A5] text-left flex items-start gap-2.5"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#C8102E] to-[#A00C24] text-[#F7E7B4] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#111111]">
                      {p.name}
                    </h5>
                    <p className="text-[10px] text-[#666666] leading-tight">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 6: {
        // SLIDE 7: OUR DATE & COUNTDOWN
        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                COUNTING DOWN
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                {displayDate}
              </h4>
              <p className="text-[10px] text-[#F7E7B4]">The Grand Celebration</p>
            </div>

            <div className="grid grid-cols-4 gap-1.5 w-full max-w-[280px]">
              {[
                { val: '00', label: 'DAYS' },
                { val: '11', label: 'HOURS' },
                { val: '35', label: 'MIN' },
                { val: '36', label: 'SEC' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl py-2 text-center shadow-xs border border-[#D4AF37]/40"
                >
                  <span className="text-sm font-bold text-[#111111] block leading-tight">
                    {item.val}
                  </span>
                  <span className="text-[8px] font-bold text-[#D4AF37] uppercase block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 7: {
        // SLIDE 8: OUR SONG (LUXURY BLACK DISC WITH GOLD CENTER)
        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                OUR SONG
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                Birthday Serenade
              </h4>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-xl border border-[#D4AF37]/40 flex flex-col items-center max-w-[240px] w-full text-center space-y-3">
              {/* Spinning Luxury Black Vinyl Disc */}
              <div
                className={`w-20 h-20 rounded-full bg-[#111111] flex items-center justify-center border-4 border-[#D4AF37] shadow-md ${
                  isPlayingSong ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F7E7B4] flex items-center justify-center text-[#111111] text-[9px] font-bold">
                  ♫
                </div>
              </div>

              {/* Animated Equalizer Wave */}
              <div className="flex items-center gap-1 h-5">
                {[4, 8, 14, 10, 16, 8, 12, 6, 14, 5].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-[#C8102E] transition-all duration-300 ${
                      isPlayingSong ? 'animate-pulse' : 'opacity-40'
                    }`}
                    style={{ height: `${isPlayingSong ? h : 4}px` }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsPlayingSong(!isPlayingSong)}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white text-[10px] font-bold shadow-xs hover:shadow-glow-red transition-all flex items-center gap-1.5 cursor-pointer border border-[#D4AF37]/40"
              >
                {isPlayingSong ? <Pause className="w-3 h-3 text-[#F7E7B4]" /> : <Play className="w-3 h-3 text-[#F7E7B4]" />}
                <span>{isPlayingSong ? 'Pause Song' : 'Play Song'}</span>
              </button>
            </div>
          </div>
        );
      }

      case 8: {
        // SLIDE 9: THE 3D BIRTHDAY CAKE
        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-1 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-0.5 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8102E] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-2xs">
                BIRTHDAY CAKE
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                Happy Birthday, {recipientDisplayName}!
              </h4>
            </div>

            <div className="scale-[0.62] sm:scale-[0.68] -my-14 relative z-10">
              <InteractiveHeroCake litCandlesCount={candlesLit ? 5 : 0} isBlowing={!candlesLit} />
            </div>

            <button
              type="button"
              onClick={() => setCandlesLit(!candlesLit)}
              className="mt-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37] text-[#111111] hover:text-[#C8102E] hover:bg-[#F7E7B4]/30 text-[10px] font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {candlesLit ? <Wind className="w-3 h-3 text-[#C8102E]" /> : <Flame className="w-3 h-3 text-[#D4AF37]" />}
              <span>{candlesLit ? 'Blow Candles' : 'Light Candles'}</span>
            </button>
          </div>
        );
      }

      case 9:
      default: {
        // SLIDE 10: MAKE A WISH / OPEN GIFT CELEBRATION
        return (
          <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-2 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-[270px]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C8102E] to-[#A00C24] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
                <Gift className="w-6 h-6" />
              </div>

              <h4 className="font-serif text-lg font-bold text-white">
                Time to Celebrate!
              </h4>

              <p className="text-xs text-[#F7E7B4] leading-relaxed">
                Everything is prepared with love for{' '}
                <strong className="text-white underline decoration-[#C8102E] decoration-2">{recipientDisplayName}</strong>.
              </p>

              <button
                type="button"
                onClick={onExpandPreview}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2 border border-[#D4AF37]/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F7E7B4]" />
                <span>Open Full Experience</span>
              </button>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Top Floating Controls Bar */}
      <div className="w-full max-w-[360px] flex items-center justify-between pb-3 gap-2">
        {/* Left Floating Pill: Experience Switcher */}
        <div className="bg-white rounded-full px-3 py-1.5 border border-[#D4AF37]/40 shadow-2xs flex items-center gap-2 text-xs font-semibold text-[#111111]">
          <div className="w-5 h-5 rounded-full bg-[#FAF6EB] flex items-center justify-center text-[#C8102E]">
            <Cake className="w-3 h-3 text-[#D4AF37]" />
          </div>
          <span>{draft.experienceType === 'party' ? 'Birthday party' : 'Birthday letter'}</span>
          <button
            type="button"
            onClick={() =>
              onChangeExperience(draft.experienceType === 'party' ? 'letter' : 'party')
            }
            className="text-[11px] font-bold text-[#C8102E] hover:underline flex items-center gap-0.5 ml-0.5 cursor-pointer"
          >
            <RefreshCw className="w-2.5 h-2.5 text-[#D4AF37]" />
            <span>Change</span>
          </button>
        </div>

        {/* Right View Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPreviewMode('mobile')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              previewMode === 'mobile'
                ? 'bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white shadow-xs border border-[#D4AF37]/40'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            title="Mobile Portrait"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('desktop')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              previewMode === 'desktop'
                ? 'bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white shadow-xs border border-[#D4AF37]/40'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            title="Desktop Landscape"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onExpandPreview}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Expand Full Preview"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 w-full flex flex-col items-center justify-center py-1">
        {previewMode === 'mobile' ? (
          /* ========================================================= */
          /* SMARTPHONE MOCKUP WITH VERTICAL ARROWS                    */
          /* ========================================================= */
          <div className="flex items-center justify-center relative">
            {/* Up / Down Navigation Controls (to the left of phone frame) */}
            <div className="hidden lg:flex flex-col gap-2.5 mr-3 self-center z-30">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/50 shadow-xs text-[#111111] hover:text-[#C8102E] hover:border-[#C8102E] flex items-center justify-center transition-all cursor-pointer"
                title="Previous Slide"
              >
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/50 shadow-xs text-[#111111] hover:text-[#C8102E] hover:border-[#C8102E] flex items-center justify-center transition-all cursor-pointer"
                title="Next Slide"
              >
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Smartphone Mockup */}
            <div className="flex flex-col items-center">
              <div
                key={refreshKey}
                className="relative w-[300px] sm:w-[335px] h-[585px] sm:h-[635px] bg-[#0A0E2A] rounded-[48px] p-2.5 shadow-2xl border-2 border-[#D4AF37]/60 flex flex-col overflow-hidden"
              >
                {/* Dynamic Island / Notch */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 flex items-center justify-end pr-2 border border-[#D4AF37]/30">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]/70 ring-1 ring-white/20" />
                </div>

                {/* Screen Inner Display */}
                <div className="w-full h-full rounded-[38px] overflow-hidden relative text-white flex flex-col justify-between bg-gradient-to-b from-[#0A0E2A] via-[#2A1638] to-[#C8102E] pt-7 pb-2 px-2 select-none">
                  {/* Floating Gold & Flame Confetti Particles */}
                  <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden">
                    <div className="absolute top-10 left-6 w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
                    <div className="absolute top-20 right-8 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <div className="absolute top-32 left-4 w-1 h-3 rotate-45 bg-[#D4AF37]" />
                    <div className="absolute top-44 right-6 w-2 h-1 -rotate-12 bg-[#C8102E]" />
                    <div className="absolute bottom-24 left-8 w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <div className="absolute bottom-32 right-8 w-1.5 h-3 rotate-12 bg-[#F7E7B4]" />
                  </div>

                  {/* Dynamic Slide Content */}
                  {renderSlideContent(false)}

                  {/* Bottom Carousel Navigation Bar (< The letter ●○○○○○○○○○ 1/10 >) */}
                  <div className="w-[94%] mx-auto bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1.5 border border-[#D4AF37]/50 shadow-xs flex items-center justify-between text-xs z-30 mb-1">
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      className="p-1 text-[#111111] hover:text-[#C8102E] transition-colors cursor-pointer"
                      title="Previous"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[#111111] max-w-[70px] truncate">
                        {SLIDES[currentSlide].title}
                      </span>

                      {/* 10 Pagination Dots */}
                      <div className="flex items-center gap-0.5">
                        {SLIDES.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleGoToSlide(i)}
                            className={`transition-all rounded-full cursor-pointer ${
                              i === currentSlide
                                ? 'w-2.5 h-1.5 bg-[#C8102E]'
                                : 'w-1 h-1 bg-[#EBD9A5] hover:bg-[#D4AF37]'
                            }`}
                            title={SLIDES[i].title}
                          />
                        ))}
                      </div>

                      <span className="text-[9px] font-bold text-[#D4AF37]">
                        {currentSlide + 1}/{SLIDES.length}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextSlide}
                      className="p-1 text-[#111111] hover:text-[#C8102E] transition-colors cursor-pointer"
                      title="Next"
                    >
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* DESKTOP BROWSER FRAME (RCB LUXURY STYLING)                */
          /* ========================================================= */
          <div className="flex items-center justify-center relative w-full">
            {/* Up / Down Navigation Controls */}
            <div className="hidden lg:flex flex-col gap-2.5 mr-3 self-center z-30">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/50 shadow-xs text-[#111111] hover:text-[#C8102E] hover:border-[#C8102E] flex items-center justify-center transition-all cursor-pointer"
                title="Previous Slide"
              >
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/50 shadow-xs text-[#111111] hover:text-[#C8102E] hover:border-[#C8102E] flex items-center justify-center transition-all cursor-pointer"
                title="Next Slide"
              >
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="flex flex-col items-center w-full max-w-[460px] sm:max-w-[500px]">
              <div
                key={refreshKey}
                className="w-full h-[585px] sm:h-[635px] bg-white rounded-3xl p-3 shadow-2xl border-2 border-[#D4AF37]/50 flex flex-col relative overflow-hidden"
              >
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between pb-2 px-1 border-b border-[#D4AF37]/20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#111111] bg-[#FAF6EB] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                    velvetwishes.com/gift/{recipientDisplayName.toLowerCase().replace(/\s+/g, '')}
                  </span>
                </div>

                {/* Desktop Viewport Canvas */}
                <div className="flex-1 rounded-2xl bg-gradient-to-b from-[#0A0E2A] via-[#2A1638] to-[#C8102E] text-white p-3 flex flex-col justify-between mt-2 overflow-hidden relative">
                  {/* Floating Particles in Desktop */}
                  <div className="absolute inset-0 pointer-events-none opacity-50 overflow-hidden">
                    <div className="absolute top-10 left-8 w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
                    <div className="absolute top-24 right-12 w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <div className="absolute bottom-28 left-10 w-2 h-2 rounded-full bg-[#F7E7B4]" />
                  </div>

                  {/* Render Shared Slide in Desktop proportions */}
                  {renderSlideContent(true)}

                  {/* Bottom Carousel Navigation Bar in Desktop */}
                  <div className="w-[90%] mx-auto bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 border border-[#D4AF37]/50 shadow-xs flex items-center justify-between text-xs z-30">
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      className="p-1 text-[#111111] hover:text-[#C8102E] transition-colors cursor-pointer"
                      title="Previous"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#111111]">
                        {SLIDES[currentSlide].title}
                      </span>

                      {/* 10 Pagination Dots */}
                      <div className="flex items-center gap-1">
                        {SLIDES.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleGoToSlide(i)}
                            className={`transition-all rounded-full cursor-pointer ${
                              i === currentSlide
                                ? 'w-3 h-1.5 bg-[#C8102E]'
                                : 'w-1.5 h-1.5 bg-[#EBD9A5] hover:bg-[#D4AF37]'
                            }`}
                            title={SLIDES[i].title}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] font-bold text-[#D4AF37]">
                        {currentSlide + 1}/{SLIDES.length}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextSlide}
                      className="p-1 text-[#111111] hover:text-[#C8102E] transition-colors cursor-pointer"
                      title="Next"
                    >
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
