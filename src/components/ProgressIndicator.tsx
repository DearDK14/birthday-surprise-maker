import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

const STEP_LABELS = [
  'Experience',
  'Details',
  'Message',
  'Photos',
  'Music',
  'Theme',
  'Preview',
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps = 7,
  onStepClick,
}) => {
  return (
    <div className="w-full py-6">
      {/* Mobile concise indicator */}
      <div className="flex md:hidden items-center justify-between px-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C8102E]">
          Step {currentStep} of {totalSteps}: {STEP_LABELS[currentStep - 1]}
        </span>
        <span className="text-xs text-[#111111]/70">
          {Math.round((currentStep / totalSteps) * 100)}% complete
        </span>
      </div>

      <div className="relative">
        {/* Track Line behind steps */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-[#EBD9A5] rounded-full z-0 hidden md:block">
          <div
            className="h-full bg-[#C8102E] transition-all duration-500 rounded-full"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Mobile progress bar line */}
        <div className="h-2 w-full bg-[#EBD9A5] rounded-full overflow-hidden md:hidden">
          <div
            className="h-full bg-[#C8102E] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Desktop Circles */}
        <div className="hidden md:flex justify-between relative z-10">
          {STEP_LABELS.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={label} className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isCompleted && !isCurrent}
                  onClick={() => isCompleted && onStepClick?.(stepNumber)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#C8102E] text-white shadow-sm hover:scale-110 cursor-pointer'
                      : isCurrent
                      ? 'bg-[#C8102E] text-white ring-4 ring-[#EBD9A5] shadow-glow scale-110'
                      : 'bg-white border-2 border-[#EBD9A5] text-[#111111]/60 cursor-not-allowed'
                  }`}
                  aria-label={`Step ${stepNumber}: ${label}`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </button>
                <span
                  className={`mt-2 text-xs font-medium transition-colors ${
                    isCurrent
                      ? 'text-[#111111] font-semibold'
                      : isCompleted
                      ? 'text-[#C8102E]'
                      : 'text-[#111111]/60'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
