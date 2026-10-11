import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useBirthdayDraft } from '../hooks/useBirthdayDraft';
import { BirthdayGift, ExperienceType, SurpriseKey } from '../types/birthday';
import { BuilderNavbar } from '../components/builder/BuilderNavbar';
import { StageOneNames } from '../components/builder/StageOneNames';
import { StageTwoSurprises } from '../components/builder/StageTwoSurprises';
import { StageThreeReview } from '../components/builder/StageThreeReview';
import { BirthdayPhonePreview } from '../components/builder/BirthdayPhonePreview';
import { SurpriseEditorModal } from '../components/builder/SurpriseEditorModal';
import { SharePanel } from '../components/SharePanel';
import { audioSynth } from '../lib/audioSynthesizer';

interface CreateBirthdayPageProps {
  onBackToHome: () => void;
  onPreviewInteractive: (gift: BirthdayGift) => void;
}

export const CreateBirthdayPage: React.FC<CreateBirthdayPageProps> = ({
  onBackToHome,
  onPreviewInteractive,
}) => {
  const { draft, updateDraft } = useBirthdayDraft();

  // 3-Stage State: 1 | 2 | 3
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [publishedResult, setPublishedResult] = useState<{
    slug: string;
    compressedData: string;
  } | null>(null);

  // Active slide in phone / desktop preview (default 0 for "The letter" envelope!)
  const [previewSlideIndex, setPreviewSlideIndex] = useState(0);
  const [activeEditorKeyForPreview, setActiveEditorKeyForPreview] = useState<SurpriseKey | null>(null);

  const handleSelectSurprise = (key: SurpriseKey) => {
    switch (key) {
      case 'letter':
        setPreviewSlideIndex(0);
        break;
      case 'whatILove':
        setPreviewSlideIndex(1);
        break;
      case 'ourStory':
        setPreviewSlideIndex(2);
        break;
      case 'wishes':
        setPreviewSlideIndex(3);
        break;
      case 'moments':
        setPreviewSlideIndex(4);
        break;
      case 'places':
        setPreviewSlideIndex(5);
        break;
      case 'ourDate':
        setPreviewSlideIndex(6);
        break;
      case 'ourSong':
        setPreviewSlideIndex(7);
        break;
    }
  };

  // Sound toggle effect
  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        audioSynth.stop();
      } else {
        audioSynth.playPreset(draft.musicTrackId || 'birthday-serenade');
      }
      return next;
    });
  };

  // Stop music on unmount
  useEffect(() => {
    return () => {
      audioSynth.stop();
    };
  }, []);

  // Load sample data helper (Dinesh Kaam & Your Name as seen in 2-luv screenshot)
  const handleLoadSampleData = () => {
    updateDraft({
      recipientName: 'Dinesh Kaam',
      senderName: 'Your Name',
      birthdayDate: '2026-10-10',
      nickname: 'Rockstar 🎸',
      experienceType: 'party',
      messageTitle: 'Happy Birthday, Dinesh Kaam!',
      birthdayMessage: `Happy Birthday to someone truly extraordinary!\n\nWatching you chase your dreams and light up every room is an inspiration. On this special day, I hope you are surrounded by love, boundless joy, and unforgettable memories.\n\nMay this coming year bring exciting adventures, peace, laughter, and everything your heart desires!`,
      closingNote: 'With heartfelt wishes,',
      signature: 'From Your Name & Friends',
      reasonsToLove: [
        'Your infectious energy that brightens up every single day',
        'Always being dependable, thoughtful, and generous',
        'The inspiring creativity and dedication you bring to everything',
      ],
      storyMilestones: [
        {
          id: 'ms_1',
          yearOrDate: '2023',
          title: 'The Day We First Met',
          story: 'From our very first conversation, it was obvious we were destined to be great friends.',
        },
        {
          id: 'ms_2',
          yearOrDate: '2024',
          title: 'The Unforgettable Road Trip',
          story: 'Singing songs at the top of our lungs with the windows down and endless laughter.',
        },
        {
          id: 'ms_3',
          yearOrDate: '2025',
          title: 'Big Dreams & Late Night Coffee',
          story: 'Sharing our biggest ambitions and supporting each other through every step.',
        },
      ],
      wishesList: [
        'May all your most cherished goals come true this year!',
        'Endless health, laughter, and heartwarming adventures.',
        'Success, peace of mind, and reasons to celebrate every day!',
      ],
      photos: [
        {
          id: 'sample_photo_1',
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
          caption: 'Our magical trip by the coast 🌊',
          sortOrder: 0,
          fileName: 'coast.jpg',
        },
        {
          id: 'sample_photo_2',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
          caption: 'Your radiant smile lights up the whole room ✨',
          sortOrder: 1,
          fileName: 'smile.jpg',
        },
        {
          id: 'sample_photo_3',
          url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
          caption: 'Celebrating another year of unforgettable memories 🥂',
          sortOrder: 2,
          fileName: 'celebration.jpg',
        },
      ],
      places: [
        {
          id: 'pl_1',
          name: 'Sunset Point Cafe',
          description: 'Where we shared the best conversations and endless laughs.',
        },
        {
          id: 'pl_2',
          name: 'The Old Bookstore',
          description: 'Our favorite cozy hideout on quiet rainy afternoons.',
        },
      ],
      specialDate: '2026-10-10',
      specialDateLabel: 'The Big Celebration',
      showCountdown: true,
      musicTrackId: 'birthday-serenade',
      themeId: 'rose-romance',
    });
  };

  // If already published in this session, show SharePanel
  if (publishedResult) {
    return (
      <div className="min-h-screen bg-rcb-jersey-fixed text-white py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPublishedResult(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F7E7B4] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Editor</span>
          </button>
        </div>

        <SharePanel
          slug={publishedResult.slug}
          recipientName={draft.recipientName}
          compressedData={publishedResult.compressedData}
          onPreviewClick={() => {
            onPreviewInteractive({
              ...draft,
              publicSlug: publishedResult.slug,
            });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rcb-jersey-fixed flex flex-col font-sans text-white">
      {/* Top Progress Bar & Navbar */}
      <BuilderNavbar
        currentStage={currentStage}
        experienceType={draft.experienceType}
        onNavigateHome={onBackToHome}
        onSelectStage={(stage) => setCurrentStage(stage)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onChangeExperience={(exp: ExperienceType) => updateDraft({ experienceType: exp })}
      />

      {/* Main Split-Screen Container */}
      <main className="flex-1 w-full mx-auto flex flex-col lg:flex-row relative">
        {/* ========================================================= */}
        {/* LEFT PANEL: Creation Workflow (~58% width on desktop)    */}
        {/* ========================================================= */}
        <section className="w-full lg:w-[58%] xl:w-[60%] flex flex-col p-4 sm:p-6 lg:p-10 xl:p-12 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/30 min-h-[calc(100vh-3.5rem)] bg-transparent">
          {currentStage === 1 && (
            <StageOneNames
              draft={draft}
              onUpdateDraft={updateDraft}
              onNext={() => {
                setCurrentStage(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBack={onBackToHome}
              onLoadSample={handleLoadSampleData}
            />
          )}

          {currentStage === 2 && (
            <StageTwoSurprises
              draft={draft}
              onUpdateDraft={updateDraft}
              onNext={() => {
                setCurrentStage(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBack={() => {
                setCurrentStage(1);
                setPreviewSlideIndex(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectSurprise={handleSelectSurprise}
            />
          )}

          {currentStage === 3 && (
            <StageThreeReview
              draft={draft}
              onUpdateDraft={updateDraft}
              onBack={() => {
                setCurrentStage(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPreviewGift={() => onPreviewInteractive(draft)}
              onPublishSuccess={(res) => {
                setPublishedResult(res);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </section>

        {/* ========================================================= */}
        {/* RIGHT PANEL: Live Phone Preview (~42% width on desktop)  */}
        {/* ========================================================= */}
        <aside className="w-full lg:w-[42%] xl:w-[40%] flex flex-col p-4 sm:p-6 lg:p-8 bg-[#0A0E2A]/50 lg:sticky lg:top-[51px] lg:h-[calc(100vh-51px)] overflow-y-auto border-l border-[#D4AF37]/25">
          <BirthdayPhonePreview
            draft={draft}
            activeSlideIndex={previewSlideIndex}
            onSlideChange={setPreviewSlideIndex}
            onExpandPreview={() => onPreviewInteractive(draft)}
            onChangeExperience={(exp: ExperienceType) => updateDraft({ experienceType: exp })}
            onOpenEditor={(key) => setActiveEditorKeyForPreview(key)}
          />
        </aside>

        {/* Direct Modal Editor Triggered from Preview */}
        {activeEditorKeyForPreview && (
          <SurpriseEditorModal
            surpriseKey={activeEditorKeyForPreview}
            draft={draft}
            onUpdateDraft={updateDraft}
            onClose={() => setActiveEditorKeyForPreview(null)}
          />
        )}
      </main>
    </div>
  );
};
