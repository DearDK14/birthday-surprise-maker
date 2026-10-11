import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Cake as CakeIcon, RotateCcw, Volume2, VolumeX, Music, Flame } from 'lucide-react';
import { BirthdayGift } from '../types/birthday';
import { MUSIC_OPTIONS } from '../lib/constants';
import { FloatingParticles } from './FloatingParticles';
import { PhotoGallery } from './PhotoGallery';
import { InteractiveHeroCake } from './InteractiveHeroCake';
import { fireCelebrationConfetti } from './ConfettiEffect';
import { audioSynth } from '../lib/audioSynthesizer';

interface BirthdayCakeProps {
  gift: BirthdayGift;
  isPreview?: boolean;
  onEditClick?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  gift,
  isPreview = false,
  onEditClick,
}) => {
  // Stages: 'unlit' -> 'lit' -> 'blown_out' (reveals letter)
  const [stage, setStage] = useState<'unlit' | 'lit' | 'blown_out'>('unlit');
  const [isMuted, setIsMuted] = useState(false);

  const handleLightCandles = () => {
    setStage('lit');
    // Start audio on user interaction
    if (gift.musicTrackId && gift.musicTrackId !== 'none') {
      if (gift.musicTrackId === 'custom' && gift.customAudioData) {
        audioSynth.playCustomAudio(gift.customAudioData);
      } else {
        const track = MUSIC_OPTIONS.find((t) => t.id === gift.musicTrackId);
        if (track) {
          audioSynth.playPreset(track.synthPreset);
        }
      }
    }
  };

  const handleBlowCandles = () => {
    setStage('blown_out');
    fireCelebrationConfetti();
  };

  const handleReplay = () => {
    setStage('unlit');
    audioSynth.stop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  const isLit = stage === 'lit';
  const isBlown = stage === 'blown_out';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E2A] via-[#2A1638] to-[#C8102E] relative text-white overflow-x-hidden selection:bg-[#F7E7B4] selection:text-[#111111]">
      <FloatingParticles intensity={gift.animationIntensity} variant="dark" />

      {/* Floating Audio Controller */}
      {stage !== 'unlit' && gift.musicTrackId !== 'none' && (
        <div className="fixed top-5 right-5 z-40 bg-[#0A0E2A]/90 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-[#D4AF37]/50 flex items-center gap-2">
          <Music className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span className="text-xs font-semibold text-[#F7E7B4] hidden sm:inline">
            Melody Playing
          </span>
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 rounded-full text-[#F7E7B4] hover:bg-white/10 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Preview Bar Banner if in creator preview mode */}
      {isPreview && (
        <div className="sticky top-0 z-50 bg-[#0A0E2A]/95 backdrop-blur-md text-white py-2.5 px-4 text-center text-xs flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Interactive Recipient Party Preview Mode</span>
          </div>
          {onEditClick && (
            <button
              onClick={onEditClick}
              className="bg-[#C8102E] hover:bg-[#A00C24] text-white px-3.5 py-1 rounded-full font-medium transition-colors border border-[#D4AF37]/40"
            >
              Exit Preview & Edit
            </button>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10 flex flex-col items-center justify-center">
        {/* ========================================================= */}
        {/* INTERACTIVE CAKE PRESENTATION                             */}
        {/* ========================================================= */}
        <div className="text-center space-y-4 max-w-lg mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm text-xs font-semibold text-[#D4AF37]">
            <CakeIcon className="w-4 h-4" />
            <span>Birthday Party Celebration</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            {stage === 'unlit'
              ? `A Celebration for ${gift.recipientName || 'You'}`
              : isLit
              ? 'Make a Wish!'
              : `Happy Birthday, ${gift.recipientName}!`}
          </h1>

          <p className="text-sm sm:text-base text-[#F7E7B4] font-normal leading-relaxed">
            {stage === 'unlit'
              ? 'Click below to light up the candles and begin your magical birthday surprise.'
              : isLit
              ? 'Close your eyes, think of your sweetest wish, and blow out the candles!'
              : 'Your wish has flown into the stars! Here is a heartfelt gift for you.'}
          </p>
        </div>

        {/* 3D Round Gourmet Cake with Candles */}
        <div className="my-6 relative flex flex-col items-center">
          <InteractiveHeroCake
            litCandlesCount={isBlown ? 0 : isLit ? 5 : 0}
            isBlowing={false}
            scale={1.1}
          />
        </div>

        {/* Action Controls for Cake */}
        <div className="mt-4 flex flex-col items-center">
          {stage === 'unlit' && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLightCandles}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white font-semibold text-base shadow-glow hover:shadow-lg transition-all flex items-center gap-3 border border-[#D4AF37]/60"
            >
              <Flame className="w-5 h-5 text-[#D4AF37]" />
              <span>Light Up the Cake</span>
            </motion.button>
          )}

          {isLit && (
            <motion.button
              type="button"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#111111] font-bold text-base shadow-glow-gold hover:scale-105 transition-all flex items-center gap-3 border border-white/60 animate-bounce"
            >
              <Wind className="w-5 h-5 text-[#111111]" />
              <span>Blow Out the Candles</span>
            </motion.button>
          )}
        </div>

        {/* ========================================================= */}
        {/* REVEALED LETTER & MEMORIES AFTER CANDLES ARE BLOWN OUT     */}
        {/* ========================================================= */}
        <AnimatePresence>
          {isBlown && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full mt-16 space-y-16"
            >
              {/* Heartfelt Letter Card */}
              <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-[#D4AF37] text-[#111111] relative overflow-hidden">
                <div className="text-center space-y-3 pb-8 border-b border-[#FAF6EB]">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C8102E] bg-[#FAF6EB] px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
                    A Letter from {gift.senderName}
                  </span>
                  <h2
                    className={`text-2xl sm:text-4xl font-bold text-[#111111] ${
                      gift.fontPairing === 'modern-clean' ? 'font-sans' : 'font-serif'
                    }`}
                  >
                    {gift.messageTitle || `Happy Birthday, ${gift.recipientName}!`}
                  </h2>
                </div>

                <div className="py-8 sm:py-10 max-w-2xl mx-auto">
                  <p className="text-base sm:text-lg leading-relaxed text-[#111111] whitespace-pre-line font-serif">
                    {gift.birthdayMessage}
                  </p>

                  <div className="mt-10 pt-6 border-t border-dashed border-[#FAF6EB] space-y-1.5 text-right">
                    {gift.closingNote && (
                      <p className="text-sm font-serif italic text-[#C8102E]">
                        {gift.closingNote}
                      </p>
                    )}
                    {gift.signature && (
                      <p className="font-serif text-xl sm:text-2xl font-bold text-[#C8102E]">
                        {gift.signature}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Photo Memories Gallery */}
              {gift.photos && gift.photos.length > 0 && (
                <div className="pt-4">
                  <PhotoGallery photos={gift.photos} themeAccentColor="#C8102E" />
                </div>
              )}

              {/* Celebration Replay */}
              <div className="text-center py-6">
                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#111111] font-semibold text-sm shadow-md hover:bg-[#FAF6EB] hover:scale-105 transition-all border border-[#D4AF37]/30"
                >
                  <RotateCcw className="w-4 h-4 text-[#C8102E]" />
                  <span>Relight Candles & Replay</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
