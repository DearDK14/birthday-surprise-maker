import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, AlertCircle, ArrowLeft } from 'lucide-react';
import { BirthdayGift } from '../types/birthday';
import { fetchPublishedGift } from '../lib/database';
import { BirthdayLetter } from '../components/BirthdayLetter';
import { BirthdayCake } from '../components/BirthdayCake';

interface SharedGiftPageProps {
  slug: string;
  urlData?: string | null;
  onNavigateHome: () => void;
  onNavigateCreate: () => void;
}

export const SharedGiftPage: React.FC<SharedGiftPageProps> = ({
  slug,
  urlData,
  onNavigateHome,
  onNavigateCreate,
}) => {
  const [gift, setGift] = useState<BirthdayGift | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGift() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchPublishedGift(slug, urlData);
        if (!isMounted) return;

        if (data) {
          setGift(data);
        } else {
          setErrorMessage(
            'We could not find this birthday surprise. The link might be incomplete or the gift has not been published yet.'
          );
        }
      } catch (err: any) {
        if (!isMounted) return;
        setErrorMessage(err?.message || 'Error loading birthday gift.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadGift();

    return () => {
      isMounted = false;
    };
  }, [slug, urlData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0E2A] via-[#2A1638] to-[#C8102E] flex flex-col items-center justify-center p-4 text-white">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 shadow-glow border border-[#D4AF37]/40">
          <Sparkles className="w-8 h-8 text-[#D4AF37] animate-spin" />
        </div>
        <h3 className="font-serif text-2xl font-bold mb-1 text-white">Unwrapping Your Surprise...</h3>
        <p className="text-xs text-[#F7E7B4]">Preparing memories, music, and love</p>
      </div>
    );
  }

  if (errorMessage || !gift) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0E2A] via-[#2A1638] to-[#C8102E] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-[#D4AF37]/60 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF6EB] text-[#C8102E] flex items-center justify-center mx-auto border border-[#EBD9A5]/60">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#111111]">
            Surprise Not Found
          </h3>
          <p className="text-xs text-[#111111]/70 leading-relaxed">
            {errorMessage || 'The requested gift could not be located.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex-1 py-3 px-4 rounded-xl border border-[#EBD9A5] text-[#111111] text-xs font-semibold hover:bg-[#FAF6EB] transition-colors"
            >
              Go to Home
            </button>
            <button
              type="button"
              onClick={onNavigateCreate}
              className="flex-1 py-3 px-4 rounded-xl bg-[#C8102E] hover:bg-[#A00C24] text-white text-xs font-semibold shadow-md transition-all border border-[#D4AF37]/40"
            >
              Create a Gift
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Recipient Experience View */}
      {gift.experienceType === 'party' ? (
        <BirthdayCake gift={gift} />
      ) : (
        <BirthdayLetter gift={gift} />
      )}

      {/* VelvetWishes Watermark & Invitation */}
      <div className="py-8 bg-[#0A0E2A] text-center border-t border-[#D4AF37]/30 text-xs text-[#F7E7B4] flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
        <span>Created with love using VelvetWishes</span>
        <button
          type="button"
          onClick={onNavigateCreate}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6EB] font-semibold transition-colors text-[11px] border border-[#D4AF37]/30"
        >
          <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Make your own birthday surprise</span>
        </button>
      </div>
    </div>
  );
};
