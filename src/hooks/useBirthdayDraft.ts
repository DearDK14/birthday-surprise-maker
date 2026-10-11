import { useState, useEffect, useCallback } from 'react';
import { BirthdayGift, PhotoItem } from '../types/birthday';
import { INITIAL_DRAFT } from '../lib/constants';

const DRAFT_STORAGE_KEY = 'velvet_birthday_draft_v1';

export function useBirthdayDraft() {
  const [draft, setDraft] = useState<BirthdayGift>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_DRAFT, ...parsed };
      }
    } catch {
      // Storage parse fallback
    }
    return INITIAL_DRAFT;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn('Failed to persist draft to localStorage:', e);
    }
  }, [draft]);

  const updateDraft = useCallback((fields: Partial<BirthdayGift>) => {
    setDraft(prev => ({
      ...prev,
      ...fields,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft({
      ...INITIAL_DRAFT,
      id: `draft_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setCurrentStep(1);
    setErrors({});
  }, []);

  const addPhoto = useCallback((photo: PhotoItem) => {
    setDraft(prev => ({
      ...prev,
      photos: [...prev.photos, photo],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removePhoto = useCallback((photoId: string) => {
    setDraft(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== photoId),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const reorderPhotos = useCallback((newPhotos: PhotoItem[]) => {
    setDraft(prev => ({
      ...prev,
      photos: newPhotos.map((p, idx) => ({ ...p, sortOrder: idx })),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updatePhotoCaption = useCallback((photoId: string, caption: string) => {
    setDraft(prev => ({
      ...prev,
      photos: prev.photos.map(p => (p.id === photoId ? { ...p, caption } : p)),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Step Validation logic
  const validateStep = useCallback((stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!draft.experienceType) {
        newErrors.experienceType = 'Please choose a birthday experience.';
      }
    } else if (stepNumber === 2) {
      if (!draft.recipientName.trim()) {
        newErrors.recipientName = "Please enter the birthday person's name.";
      }
      if (!draft.senderName.trim()) {
        newErrors.senderName = 'Please enter your name or nickname.';
      }
      if (!draft.birthdayDate) {
        newErrors.birthdayDate = 'Please select their birthday date.';
      }
    } else if (stepNumber === 3) {
      if (!draft.messageTitle.trim()) {
        newErrors.messageTitle = 'Please add a title for your birthday letter.';
      }
      if (!draft.birthdayMessage.trim()) {
        newErrors.birthdayMessage = 'Please write a birthday message.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [draft]);

  const goToNextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }
    return false;
  }, [currentStep, validateStep]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const loadSampleData = useCallback(() => {
    setDraft({
      ...INITIAL_DRAFT,
      id: `sample_${Date.now()}`,
      publicSlug: '',
      experienceType: 'party',
      recipientName: 'Dinesh Kaam',
      senderName: 'Your Name',
      birthdayDate: new Date().toISOString().split('T')[0],
      relationship: 'friend',
      nickname: 'Rockstar 🎸',
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
          title: 'Big Dreams & Late Night Tea',
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
          id: 'photo_sample_1',
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
          caption: 'Our magical trip by the coast 🌊',
          sortOrder: 0,
          fileName: 'coast.jpg',
        },
        {
          id: 'photo_sample_2',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
          caption: 'Your radiant smile lights up the whole room ✨',
          sortOrder: 1,
          fileName: 'smile.jpg',
        },
        {
          id: 'photo_sample_3',
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
      specialDate: new Date().toISOString().split('T')[0],
      specialDateLabel: 'The Big Celebration',
      showCountdown: true,
      musicTrackId: 'birthday-serenade',
      themeId: 'rose-romance',
      fontPairing: 'serif-elegant',
      animationIntensity: 'magical',
      termsAccepted: false,
      publishedStatus: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  return {
    draft,
    setDraft,
    currentStep,
    setCurrentStep,
    errors,
    updateDraft,
    resetDraft,
    addPhoto,
    removePhoto,
    reorderPhotos,
    updatePhotoCaption,
    validateStep,
    goToNextStep,
    goToPreviousStep,
    loadSampleData,
  };
}
