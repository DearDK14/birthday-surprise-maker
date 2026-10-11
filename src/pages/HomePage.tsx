import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Wind,
  RotateCcw,
  Mic,
  Gift,
} from 'lucide-react';
import { FoilBalloon } from '../components/FoilBalloon';
import { InteractiveHeroCake } from '../components/InteractiveHeroCake';
import { GreetingNoteCard, ConfettiFlakes } from '../components/CakeAccessories';
import { fireCelebrationConfetti } from '../components/ConfettiEffect';

interface HomePageProps {
  onStartCreating: (experienceType?: 'letter' | 'party') => void;
  onPreviewDemo?: (experienceType: 'letter' | 'party') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartCreating,
}) => {
  // 1. Age state for the interactive foil balloons widget
  const [age, setAge] = useState<number>(28);

  // Split age into two digits for the left and right balloons
  const ageString = String(age).padStart(2, '0');
  const digitLeft = ageString[0];
  const digitRight = ageString[1];

  const handleIncrementAge = () => {
    setAge((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrementAge = () => {
    setAge((prev) => Math.max(prev - 1, 1));
  };

  // 2. Interactive Candle Blowing state for Section 2
  const [litCandles, setLitCandles] = useState<number>(5);
  const [isHoldingBlow, setIsHoldingBlow] = useState<boolean>(false);
  const [blowProgress, setBlowProgress] = useState<number>(0);
  const [isWishCompleted, setIsWishCompleted] = useState<boolean>(false);
  const blowIntervalRef = useRef<number | null>(null);

  // Hold to blow logic: Extinguishes candles one by one
  const startBlowing = () => {
    if (litCandles === 0) return;
    setIsHoldingBlow(true);

    let progress = 0;
    blowIntervalRef.current = window.setInterval(() => {
      progress += 10;
      setBlowProgress(progress);

      // Extinguish candles at 20%, 40%, 60%, 80%, 100%
      if (progress === 20) setLitCandles(4);
      else if (progress === 40) setLitCandles(3);
      else if (progress === 60) setLitCandles(2);
      else if (progress === 80) setLitCandles(1);
      else if (progress >= 100) {
        setLitCandles(0);
        setIsHoldingBlow(false);
        setIsWishCompleted(true);
        if (blowIntervalRef.current) {
          clearInterval(blowIntervalRef.current);
          blowIntervalRef.current = null;
        }
        fireCelebrationConfetti();
      }
    }, 180);
  };

  const stopBlowing = () => {
    setIsHoldingBlow(false);
    if (blowIntervalRef.current) {
      clearInterval(blowIntervalRef.current);
      blowIntervalRef.current = null;
    }
  };

  const handleRelight = () => {
    setLitCandles(5);
    setBlowProgress(0);
    setIsWishCompleted(false);
  };

  useEffect(() => {
    return () => {
      if (blowIntervalRef.current) {
        clearInterval(blowIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-rcb-jersey-fixed text-white overflow-x-hidden selection:bg-[#F7E7B4] selection:text-[#0A0E2A]">
      {/* ========================================================= */}
      {/* SECTION 1: HERO (RCB JERSEY SHADED RED & BLUE THEME)      */}
      {/* ========================================================= */}
      <section
        id="party"
        className="relative min-h-[85vh] flex items-center pt-8 pb-16 sm:py-16 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-[#D4AF37]/25"
      >
        {/* Confetti Flakes */}
        <ConfettiFlakes />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: HEADLINE, CTAs, SOCIAL PROOF              */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121A4A]/80 backdrop-blur-md border border-[#D4AF37]/50 shadow-xs text-xs font-bold tracking-wider uppercase text-[#F7E7B4]">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] shadow-[0_0_6px_#C8102E]" />
              <span>Royal Birthday Gift</span>
            </div>

            {/* Main Headline in Bold Serif */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-md">
              Turn your <br />
              birthday message <br />
              <span className="bg-gradient-to-r from-[#F7E7B4] via-[#FFFFFF] to-[#D4AF37] bg-clip-text text-transparent">
                into a royal <br />
                digital gift.
              </span>
            </h1>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Primary Button (Flame Red + Gold border) */}
              <button
                type="button"
                onClick={() => onStartCreating('party')}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white border border-[#D4AF37]/60 font-bold text-base shadow-lg hover:shadow-glow-red hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create a birthday gift</span>
                <ArrowRight className="w-4 h-4 text-[#F7E7B4]" />
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={() => onStartCreating('letter')}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-[#D4AF37]/60 shadow-xs backdrop-blur-md transition-all flex items-center justify-center cursor-pointer"
              >
                <span>Create a birthday Letter</span>
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: 3D CAKE, GOLD AGE BALLOONS                */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center mt-6 lg:mt-0">
            {/* "How old?" Interactive Age Controller Pill */}
            <div className="mb-4 z-20">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#121A4A]/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-md text-xs font-semibold text-white">
                <span className="text-[#F7E7B4]/80 font-medium">How old?</span>
                <button
                  type="button"
                  onClick={handleDecrementAge}
                  className="w-6 h-6 rounded-full bg-[#F7E7B4] text-[#111111] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                  aria-label="Decrease age"
                >
                  -
                </button>
                <span className="font-serif text-base font-bold text-[#111111] tabular-nums min-w-[20px] text-center">
                  {age}
                </span>
                <button
                  type="button"
                  onClick={handleIncrementAge}
                  className="w-6 h-6 rounded-full bg-[#F7E7B4] text-[#111111] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                  aria-label="Increase age"
                >
                  +
                </button>
              </div>
            </div>

            {/* Central Stage: Foil Balloons + 3D Cake */}
            <div className="relative w-full max-w-md h-[390px] sm:h-[430px] flex items-center justify-center">
              {/* Metallic Gold Foil Balloon Digit 1 (Left) */}
              <div className="absolute left-0 sm:left-2 top-8 sm:top-12 z-0">
                <FoilBalloon digit={digitLeft} delay={0} rotation={-4} />
              </div>

              {/* Metallic Gold Foil Balloon Digit 2 (Right) */}
              <div className="absolute right-0 sm:right-2 top-8 sm:top-12 z-0">
                <FoilBalloon digit={digitRight} delay={0.6} rotation={4} />
              </div>

              {/* Central 3D Birthday Cake */}
              <div className="relative z-10">
                <InteractiveHeroCake litCandlesCount={5} isBlowing={false} />
              </div>
            </div>

            {/* Greeting Note Card below Cake */}
            <div className="mt-2 z-20">
              <GreetingNoteCard recipient="Dia" sender="Alex" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: CANDLES BLOW (RCB JERSEY SHADED RED & BLUE)    */}
      {/* ========================================================= */}
      <section
        id="candles"
        className="relative min-h-[85vh] flex items-center py-16 sm:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-[#D4AF37]/20"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: "THE CANDLES GO OUT WITH A REAL BREATH"   */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F7E7B4]">
              <span className="w-6 h-0.5 bg-[#D4AF37]" />
              <span>Make a Wish</span>
            </div>

            {/* Heading in Bold Serif */}
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-md">
              The candles <br />
              go out <br />
              with a real <br />
              <span className="bg-gradient-to-r from-[#F7E7B4] via-[#FFFFFF] to-[#D4AF37] bg-clip-text text-transparent">
                breath.
              </span>
            </h2>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-[#F7E7B4]/85 max-w-xl leading-relaxed font-sans">
              In the gift, the birthday person blows into the phone's microphone and the candles go out one by one. Here, just hold the button.
            </p>

            {/* Interactive "Hold to Blow" Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {!isWishCompleted ? (
                <button
                  type="button"
                  onMouseDown={startBlowing}
                  onMouseUp={stopBlowing}
                  onTouchStart={startBlowing}
                  onTouchEnd={stopBlowing}
                  className={`relative overflow-hidden px-8 py-4 rounded-full font-bold text-base shadow-md transition-all flex items-center gap-2 select-none cursor-pointer border border-[#D4AF37]/50 ${
                    isHoldingBlow
                      ? 'bg-[#A00C24] text-white scale-95 shadow-glow-red'
                      : 'bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white hover:scale-[1.02]'
                  }`}
                >
                  {/* Progress Fill inside button while holding */}
                  <div
                    className="absolute inset-y-0 left-0 bg-white/25 transition-all duration-100 ease-linear"
                    style={{ width: `${blowProgress}%` }}
                  />

                  <Wind className={`w-5 h-5 relative z-10 text-[#F7E7B4] ${isHoldingBlow ? 'animate-spin' : ''}`} />
                  <span className="relative z-10">
                    {isHoldingBlow ? 'Blowing out candles...' : 'Hold to blow'}
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRelight}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#D4AF37] text-white backdrop-blur-md font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-[#F7E7B4]" />
                    <span>Relight Candles 🕯️</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartCreating('party')}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white font-bold text-sm shadow-md hover:shadow-glow-red transition-all flex items-center gap-2 border border-[#D4AF37]/50 cursor-pointer"
                  >
                    <Gift className="w-4 h-4 text-[#F7E7B4]" />
                    <span>Create This Birthday Gift</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footnote about microphone & privacy */}
            <p className="text-xs text-[#F7E7B4]/70 flex items-center gap-1.5 pt-2">
              <Mic className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>The breath is detected on the device itself: nothing is recorded or sent.</span>
            </p>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: FOCUSED CAKE RESPONDING TO BLOW           */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md h-[360px] sm:h-[400px] flex items-center justify-center">
              {/* Glowing Aura Behind Cake */}
              <div
                className={`absolute w-72 h-72 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
                  litCandles > 0 ? 'bg-[#D4AF37]/25 opacity-100' : 'bg-transparent opacity-0'
                }`}
              />

              {/* 3D Birthday Cake Responding to Lit Candles */}
              <InteractiveHeroCake
                litCandlesCount={litCandles}
                isBlowing={isHoldingBlow}
                scale={1.08}
              />
            </div>

            {/* Toast when wish is fulfilled */}
            {isWishCompleted && (
              <div className="mt-3 px-5 py-2.5 rounded-full bg-[#0A0E2A]/90 backdrop-blur-md border border-[#D4AF37] shadow-lg text-xs font-bold text-white flex items-center gap-2 animate-in fade-in duration-300">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Your wish has been made! Now create your gift to reveal the letter.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subtle Copyright Bar at the bottom */}
      <div className="py-6 border-t border-[#D4AF37]/20 bg-[#0A0E2A]/80 text-center text-xs text-[#F7E7B4]/60">
        <p>© {new Date().getFullYear()} VelvetWishes. An independent magical birthday gift creator.</p>
      </div>
    </div>
  );
};
