import React from 'react';
import { Clock, Calendar, Sparkles, Heart } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  birthdayDate: string;
  recipientName?: string;
  showCardStyle?: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({
  birthdayDate,
  recipientName = 'Special Someone',
  showCardStyle = true,
}) => {
  const { days, hours, minutes, seconds, isToday, isPassed, formattedTarget } =
    useCountdown(birthdayDate);

  if (isToday) {
    return (
      <div className="w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#C8102E] via-[#A00C24] to-[#800A1D] text-white text-center shadow-glow border border-[#D4AF37]/50 animate-pulse-glow">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold mb-3">
          <Sparkles className="w-4 h-4 fill-[#D4AF37]" />
          <span>CELEBRATION DAY</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Today is {recipientName}'s Birthday!
        </h3>
        <p className="text-sm text-[#F7E7B4] max-w-md mx-auto">
          Today is the grand day! May it be filled with boundless joy, radiant laughter, and unforgettable moments!
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div
      className={`w-full max-w-xl mx-auto ${
        showCardStyle
          ? 'rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-lg border border-[#EBD9A5] shadow-lg text-center'
          : 'text-center'
      }`}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EB] text-[#C8102E] border border-[#EBD9A5] text-xs font-semibold mb-3">
        <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
        <span>Birthday Countdown</span>
      </div>

      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mb-1">
        Counting Down to {recipientName}'s Special Day
      </h4>
      <p className="text-xs text-[#111111]/70 mb-6 flex items-center justify-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
        <span>{formattedTarget}</span>
      </p>

      {/* Digits Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {timeUnits.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FAF6EB] to-[#F7E7B4]/50 border border-[#EBD9A5] shadow-sm"
          >
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#111111] tabular-nums">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#C8102E] uppercase tracking-wider mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
