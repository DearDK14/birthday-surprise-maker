import React from 'react';
import { BirthdayGift } from '../types/birthday';
import { BirthdayLetter } from '../components/BirthdayLetter';
import { BirthdayCake } from '../components/BirthdayCake';

interface PreviewPageProps {
  gift: BirthdayGift;
  onExitPreview: () => void;
}

export const PreviewPage: React.FC<PreviewPageProps> = ({ gift, onExitPreview }) => {
  return (
    <div className="relative">
      {gift.experienceType === 'party' ? (
        <BirthdayCake gift={gift} isPreview={true} onEditClick={onExitPreview} />
      ) : (
        <BirthdayLetter gift={gift} isPreview={true} onEditClick={onExitPreview} />
      )}
    </div>
  );
};
