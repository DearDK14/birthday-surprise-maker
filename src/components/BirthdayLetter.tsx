import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Heart, RotateCcw, Volume2, VolumeX, Music } from 'lucide-react';
import { BirthdayGift } from '../types/birthday';
import { THEMES, MUSIC_OPTIONS } from '../lib/constants';
import { FloatingParticles } from './FloatingParticles';
import { PhotoGallery } from './PhotoGallery';
import { fireCelebrationConfetti } from './ConfettiEffect';
import { audioSynth } from '../lib/audioSynthesizer';

interface BirthdayLetterProps {
  gift: BirthdayGift;
  isPreview?: boolean;
  onEditClick?: () => void;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({
  gift,
  isPreview = false,
  onEditClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const theme = THEMES[gift.themeId] || THEMES['rose-dreams'] || THEMES['purple-dreams'];

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    fireCelebrationConfetti();

    // Trigger music playback upon recipient interaction
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

  const handleReplay = () => {
    setIsOpen(false);
    audioSynth.stop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E2A] via-[#2A1638] to-[#C8102E] relative text-white overflow-x-hidden selection:bg-[#F7E7B4] selection:text-[#111111]">
      <FloatingParticles intensity={gift.animationIntensity} variant="dark" />

      {/* Floating Audio Controller */}
      {isOpen && gift.musicTrackId !== 'none' && (
        <div className="fixed top-5 right-5 z-40 bg-[#0A0E2A]/90 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-[#D4AF37]/40 flex items-center gap-2">
          <Music className="w-4 h-4 text-[#C8102E] animate-pulse" />
          <span className="text-xs font-semibold text-white hidden sm:inline">
            Melody Playing
          </span>
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 rounded-full text-[#F7E7B4] hover:bg-white/10 transition-colors"
            title={isMuted ? 'Unmute melody' : 'Mute melody'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Preview Bar Banner if in creator preview mode */}
      {isPreview && (
        <div className="sticky top-0 z-50 bg-[#0A0E2A]/95 backdrop-blur-md text-white py-2.5 px-4 text-center text-xs flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Interactive Recipient Preview Mode</span>
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

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ========================================================= */
          /* STAGE 1: Sealed Envelope Opening Sequence                 */
          /* ========================================================= */
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
          >
            <div className="text-center max-w-md mx-auto space-y-4 mb-8">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm text-xs font-semibold text-[#F7E7B4]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>A Little Surprise for You</span>
              </motion.div>

              <motion.h1
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-sm"
              >
                {gift.recipientName ? `For Dearest ${gift.recipientName}` : 'A Special Birthday Gift'}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base text-[#F7E7B4] font-medium"
              >
                Someone who loves you created a magical birthday surprise just for you.
              </motion.p>
            </div>

            {/* 3D Envelope in Luxury Flame Red & Gold */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="relative w-80 sm:w-96 h-56 sm:h-64 cursor-pointer group"
              onClick={handleOpenEnvelope}
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#C8102E] via-[#A00C24] to-[#800A1D] shadow-2xl p-4 border border-[#D4AF37]/50 relative overflow-hidden group-hover:shadow-glow transition-shadow duration-500">
                {/* Envelope Flap Fold Lines */}
                <div className="absolute inset-x-0 top-0 h-32 bg-white/10 border-b border-white/20 [clip-path:polygon(0_0,50%_100%,100%_0)]" />
                <div className="absolute inset-y-0 left-0 w-36 bg-black/15 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
                <div className="absolute inset-y-0 right-0 w-36 bg-black/15 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />

                {/* Wax Seal / Gold Medallion */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-tr from-[#F7E7B4] to-[#D4AF37] shadow-glow-gold flex flex-col items-center justify-center text-[#111111] font-bold border-2 border-white/90 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-[#C8102E]" />
                </div>

                {/* Recipient stamp preview */}
                <div className="absolute bottom-4 left-6 text-white/95 text-xs font-serif tracking-wider">
                  <span className="block text-[10px] uppercase text-[#F7E7B4] tracking-widest">To:</span>
                  <span className="font-semibold text-sm">{gift.recipientName || 'You'}</span>
                </div>
              </div>
            </motion.div>

            {/* Open Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <button
                type="button"
                onClick={handleOpenEnvelope}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white font-bold text-base shadow-xl hover:shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-[#D4AF37]/60"
              >
                <Mail className="w-5 h-5 text-[#F7E7B4]" />
                <span>Open Your Surprise</span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* STAGE 2: Unfolded Letter, Message & Photo Memories        */
          /* ========================================================= */
          <motion.div
            key="letter-stage"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 space-y-16"
          >
            {/* The Birthday Letter Card */}
            <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-4 left-4 text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="absolute top-4 right-4 text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="absolute bottom-4 left-4 text-[#D4AF37]">
                <Heart className="w-4 h-4 fill-[#D4AF37]/30 text-[#D4AF37]" />
              </div>
              <div className="absolute bottom-4 right-4 text-[#D4AF37]">
                <Heart className="w-4 h-4 fill-[#D4AF37]/30 text-[#D4AF37]" />
              </div>

              {/* Letter Header */}
              <div className="text-center space-y-3 pb-8 border-b border-[#FAF6EB]">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C8102E] bg-[#FAF6EB] px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
                  Birthday Wish
                </span>
                <h2
                  className={`text-2xl sm:text-4xl font-bold text-[#111111] ${
                    gift.fontPairing === 'modern-clean' ? 'font-sans' : 'font-serif'
                  }`}
                >
                  {gift.messageTitle || `Happy Birthday, ${gift.recipientName}!`}
                </h2>
                <div className="text-xs text-[#C8102E] italic">
                  With love from {gift.senderName}
                </div>
              </div>

              {/* Letter Body */}
              <div className="py-8 sm:py-10 max-w-2xl mx-auto">
                <p className="text-base sm:text-lg leading-relaxed text-[#111111] whitespace-pre-line font-serif font-normal">
                  {gift.birthdayMessage}
                </p>

                {/* Closing and Signature */}
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

            {/* Photo Memories Showcase */}
            {gift.photos && gift.photos.length > 0 && (
              <div className="pt-6">
                <PhotoGallery photos={gift.photos} themeAccentColor="#C8102E" />
              </div>
            )}

            {/* Celebration Ending Banner */}
            <div className="text-center rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0A0E2A] via-[#2A1638] to-[#C8102E] text-white shadow-2xl relative overflow-hidden border border-[#D4AF37]/40">
              <div className="relative z-10 space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-[#D4AF37] shadow-glow-gold border border-[#D4AF37]/40">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                  Happy Birthday, {gift.recipientName}!
                </h3>
                <p className="text-sm text-[#F7E7B4] leading-relaxed">
                  May every dream you hold close unfold with beauty and light this year.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#111111] font-bold text-sm shadow-md hover:bg-[#FAF6EB] hover:scale-105 transition-all border border-[#D4AF37]/40"
                  >
                    <RotateCcw className="w-4 h-4 text-[#C8102E]" />
                    <span>Replay Surprise</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
