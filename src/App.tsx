import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CreateBirthdayPage } from './pages/CreateBirthdayPage';
import { PreviewPage } from './pages/PreviewPage';
import { SharedGiftPage } from './pages/SharedGiftPage';
import { LegalModal } from './components/LegalModal';
import { FaqModal } from './components/FaqModal';
import { BirthdayGift, ExperienceType } from './types/birthday';
import { INITIAL_DRAFT } from './lib/constants';
import { audioSynth } from './lib/audioSynthesizer';

export function App() {
  const [view, setView] = useState<'home' | 'create' | 'preview' | 'shared'>('home');
  const [activePreviewGift, setActivePreviewGift] = useState<BirthdayGift>(INITIAL_DRAFT);
  const [sharedSlug, setSharedSlug] = useState<string>('');
  const [sharedUrlData, setSharedUrlData] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'about' | 'contact' | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);

  // Parse location hash on load and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(window.location.search);

      // Check if viewing a shared gift: #gift/slug or ?gift=slug
      if (hash.startsWith('#gift/')) {
        const parts = hash.substring(6).split('?');
        const slug = parts[0];
        const hashParams = new URLSearchParams(parts[1] || '');
        const data = hashParams.get('d') || searchParams.get('d');
        setSharedSlug(slug);
        setSharedUrlData(data);
        setView('shared');
      } else if (searchParams.get('gift')) {
        const slug = searchParams.get('gift')!;
        const data = searchParams.get('d');
        setSharedSlug(slug);
        setSharedUrlData(data);
        setView('shared');
      } else if (hash === '#create') {
        setView('create');
      } else {
        setView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStartCreating = (experienceType?: ExperienceType) => {
    audioSynth.stop();
    if (experienceType) {
      setActivePreviewGift((prev) => ({ ...prev, experienceType }));
    }
    window.location.hash = '#create';
    setView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    audioSynth.stop();
    window.location.hash = '';
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviewDemo = (experienceType: ExperienceType) => {
    audioSynth.stop();
    const demoGift: BirthdayGift = {
      ...INITIAL_DRAFT,
      recipientName: 'Sophia',
      senderName: 'Liam',
      experienceType,
      messageTitle: 'Happy Birthday to My Light and Star ✨',
      birthdayMessage: `To dearest Sophia,\n\nWatching you smile is the greatest joy in my world. On this special day, I wanted to create something truly magical just for you.\n\nMay this new chapter bring you endless adventure, peace, laughter, and all the dreams your heart has wished for!`,
      closingNote: 'Forever and always,',
      signature: 'With all my heart, Liam',
      photos: [
        {
          id: 'demo_1',
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
          caption: 'Our unforgettable trip by the sea 🌊',
          sortOrder: 0,
        },
        {
          id: 'demo_2',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
          caption: 'Your radiant smile lights up every room ✨',
          sortOrder: 1,
        },
      ],
      musicTrackId: 'birthday-serenade',
      themeId: experienceType === 'party' ? 'midnight-magic' : 'purple-dreams',
    };

    setActivePreviewGift(demoGift);
    setView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviewInteractive = (gift: BirthdayGift) => {
    audioSynth.stop();
    setActivePreviewGift(gift);
    setView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitPreview = () => {
    audioSynth.stop();
    setView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF9] text-[#2A1B22] font-sans antialiased">
      {/* Show main website Navbar only on Home view */}
      {view === 'home' && (
        <Navbar
          onNavigate={(target) => {
            if (target === 'home') handleNavigateHome();
            else if (target === 'create') handleStartCreating();
          }}
          currentView={view}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {view === 'home' && (
          <HomePage
            onStartCreating={handleStartCreating}
            onPreviewDemo={handlePreviewDemo}
          />
        )}

        {view === 'create' && (
          <CreateBirthdayPage
            onBackToHome={handleNavigateHome}
            onPreviewInteractive={handlePreviewInteractive}
          />
        )}

        {view === 'preview' && (
          <PreviewPage
            gift={activePreviewGift}
            onExitPreview={handleExitPreview}
          />
        )}

        {view === 'shared' && (
          <SharedGiftPage
            slug={sharedSlug}
            urlData={sharedUrlData}
            onNavigateHome={handleNavigateHome}
            onNavigateCreate={() => handleStartCreating()}
          />
        )}
      </main>

      {/* FAQ Modal */}
      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />

      {/* Legal Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}

export default App;
