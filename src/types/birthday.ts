export type ExperienceType = 'party' | 'letter';

export type RelationshipType = 'partner' | 'best_friend' | 'friend' | 'family' | 'other';

export type ThemeId =
  | 'royal-flame'
  | 'champagne-gold'
  | 'black-gold'
  | 'rose-romance'
  | 'blush-cream'
  | 'golden-rose'
  | 'purple-dreams'
  | 'midnight-magic'
  | 'lavender-garden'
  | 'golden-celebration'
  | 'rose-dreams';

export type FontPairing = 'serif-elegant' | 'modern-clean' | 'romantic-script';

export type AnimationIntensity = 'subtle' | 'magical' | 'festive';

export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
  sortOrder: number;
  fileName?: string;
}

export interface StoryMilestone {
  id: string;
  title: string;
  story: string;
  yearOrDate?: string;
}

export interface SpecialPlace {
  id: string;
  name: string;
  description: string;
}

export interface MusicOption {
  id: string;
  name: string;
  description: string;
  mood: string;
  synthPreset: 'velvet-lullaby' | 'starlight-dreams' | 'birthday-serenade' | 'twilight-chimes';
  audioUrl?: string;
}

export interface BirthdayGift {
  id: string;
  publicSlug: string;
  experienceType: ExperienceType;

  // STAGE 1: Names & Details
  recipientName: string;
  senderName: string;
  birthdayDate: string; // YYYY-MM-DD
  nickname?: string;
  relationship: RelationshipType;

  // STAGE 2: The 8 Surprises
  // 1. The Letter
  messageTitle: string;
  birthdayMessage: string;
  closingNote?: string;
  closing?: string;
  signature?: string;

  // 2. What I Love
  reasonsToLove: string[];

  // 3. Our Story
  storyMilestones: StoryMilestone[];

  // 4. Wishes
  wishesList: string[];

  // 5. Moments (Photos)
  photos: PhotoItem[];

  // 6. Places
  places: SpecialPlace[];

  // 7. Our Date
  specialDate: string;
  specialDateLabel: string;
  showCountdown: boolean;

  // 8. Our Song
  musicTrackId: string;
  customAudioData?: string;
  customAudioName?: string;
  isMutedDefault?: boolean;

  // Theme & Atmosphere
  themeId: ThemeId;
  fontPairing: FontPairing;
  animationIntensity: AnimationIntensity;

  // STAGE 3: Review & Meta
  termsAccepted: boolean;
  publishedStatus: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  bgGradient: string;
  surfaceClass: string;
  accentColor: string;
  cardBorder: string;
  previewColor: string;
  textColor: string;
  subtextColor: string;
  glowColor: string;
}

export type SurpriseKey =
  | 'letter'
  | 'whatILove'
  | 'ourStory'
  | 'wishes'
  | 'moments'
  | 'places'
  | 'ourDate'
  | 'ourSong';

export interface SurpriseMeta {
  key: SurpriseKey;
  title: string;
  description: string;
  iconName: string;
}

// Function to compute readiness of each of the 8 surprises
export function checkSurpriseReady(key: SurpriseKey, draft: BirthdayGift): boolean {
  switch (key) {
    case 'letter':
      return Boolean(draft.birthdayMessage && draft.birthdayMessage.trim().length > 10);
    case 'whatILove':
      return Boolean(draft.reasonsToLove && draft.reasonsToLove.filter(r => r.trim()).length > 0);
    case 'ourStory':
      return Boolean(draft.storyMilestones && draft.storyMilestones.filter(s => s.story.trim()).length > 0);
    case 'wishes':
      return Boolean(draft.wishesList && draft.wishesList.filter(w => w.trim()).length > 0);
    case 'moments':
      return Boolean(draft.photos && draft.photos.length > 0);
    case 'places':
      return Boolean(draft.places && draft.places.filter(p => p.name.trim()).length > 0);
    case 'ourDate':
      return Boolean(draft.birthdayDate || draft.specialDate);
    case 'ourSong':
      return Boolean(draft.musicTrackId && draft.musicTrackId !== 'none');
    default:
      return false;
  }
}
