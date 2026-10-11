import { BirthdayGift, ThemeConfig, MusicOption, SurpriseMeta } from '../types/birthday';

export const THEMES: Record<string, ThemeConfig> = {
  'royal-flame': {
    id: 'royal-flame',
    name: 'Royal Flame & Gold',
    description: 'Striking Flame Red, regal Metallic Gold, and deep luxury Black.',
    bgGradient: 'bg-gradient-to-b from-[#111111] via-[#1A1A1A] to-[#C8102E]/80',
    surfaceClass: 'bg-[#111111]/90 backdrop-blur-md text-white border-[#D4AF37]/50 shadow-glow-gold',
    accentColor: '#C8102E',
    cardBorder: 'border-[#D4AF37]/40',
    previewColor: '#C8102E',
    textColor: 'text-white',
    subtextColor: 'text-[#F7E7B4]',
    glowColor: 'rgba(200, 16, 46, 0.4)',
  },
  'champagne-gold': {
    id: 'champagne-gold',
    name: 'Champagne & Gold',
    description: 'Warm light gold cream with bright Flame Red and Gold accents.',
    bgGradient: 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EB] to-[#F7E7B4]',
    surfaceClass: 'bg-white/95 backdrop-blur-md text-[#111111] border-[#D4AF37]/40',
    accentColor: '#D4AF37',
    cardBorder: 'border-[#D4AF37]/30',
    previewColor: '#D4AF37',
    textColor: 'text-[#111111]',
    subtextColor: 'text-[#4A4A4A]',
    glowColor: 'rgba(212, 175, 55, 0.35)',
  },
  'black-gold': {
    id: 'black-gold',
    name: 'Midnight Black & Gold',
    description: 'Pure luxury black with shimmering gold and subtle flame highlights.',
    bgGradient: 'bg-gradient-to-b from-[#111111] via-[#0A0A0A] to-[#1A1A1A]',
    surfaceClass: 'bg-[#1A1A1A]/90 backdrop-blur-md text-white border-[#D4AF37]/60 shadow-glow-gold',
    accentColor: '#D4AF37',
    cardBorder: 'border-[#D4AF37]/50',
    previewColor: '#D4AF37',
    textColor: 'text-white',
    subtextColor: 'text-[#F7E7B4]',
    glowColor: 'rgba(212, 175, 55, 0.45)',
  },
  'rose-romance': {
    id: 'rose-romance',
    name: 'Royal Flame Red',
    description: 'Passionate Flame Red with warm Light Gold and pure White.',
    bgGradient: 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EB] to-[#FDECEF]',
    surfaceClass: 'bg-white/95 backdrop-blur-md text-[#111111] border-[#F7E7B4]',
    accentColor: '#C8102E',
    cardBorder: 'border-[#EBD9A5]',
    previewColor: '#C8102E',
    textColor: 'text-[#111111]',
    subtextColor: 'text-[#4A4A4A]',
    glowColor: 'rgba(200, 16, 46, 0.35)',
  },
};

export const SURPRISE_CATEGORIES: SurpriseMeta[] = [
  {
    key: 'letter',
    title: 'The Letter',
    description: 'Add a personalized birthday message.',
    iconName: 'Mail',
  },
  {
    key: 'whatILove',
    title: 'What I Love',
    description: 'Add reasons why the recipient is special.',
    iconName: 'Heart',
  },
  {
    key: 'ourStory',
    title: 'Our Story',
    description: 'Add a relationship story or special memories.',
    iconName: 'BookOpen',
  },
  {
    key: 'wishes',
    title: 'Wishes',
    description: 'Add birthday wishes or future dreams.',
    iconName: 'Sparkles',
  },
  {
    key: 'moments',
    title: 'Moments',
    description: 'Upload photographs and captions.',
    iconName: 'Camera',
  },
  {
    key: 'places',
    title: 'Places',
    description: 'Add meaningful places and short descriptions.',
    iconName: 'MapPin',
  },
  {
    key: 'ourDate',
    title: 'Our Date',
    description: 'Add a special date or birthday countdown.',
    iconName: 'Calendar',
  },
  {
    key: 'ourSong',
    title: 'Our Song',
    description: 'Select a supported music track or upload audio.',
    iconName: 'Music',
  },
];

export const MUSIC_OPTIONS: MusicOption[] = [
  {
    id: 'velvet-lullaby',
    name: 'Velvet Lullaby',
    description: 'Gentle, soothing music-box chimes in soft purple harmony.',
    mood: 'Peaceful & Tender',
    synthPreset: 'velvet-lullaby',
  },
  {
    id: 'birthday-serenade',
    name: 'Birthday Serenade',
    description: 'Delicate celebratory music box melody with warm bell tones.',
    mood: 'Celebratory & Sweet',
    synthPreset: 'birthday-serenade',
  },
  {
    id: 'starlight-dreams',
    name: 'Starlight Dreams',
    description: 'Dreamy ambient arpeggio notes floating in starry space.',
    mood: 'Magical & Ethereal',
    synthPreset: 'starlight-dreams',
  },
  {
    id: 'twilight-chimes',
    name: 'Twilight Chimes',
    description: 'Warm gentle acoustic bell chords and soft reverberation.',
    mood: 'Heartfelt & Nostalgic',
    synthPreset: 'twilight-chimes',
  },
];

export const SAMPLE_MESSAGES = [
  {
    title: 'Romantic & Deep',
    heading: 'To the Light of My Life',
    relationship: 'partner',
    body: `Happy Birthday, my love! Another trip around the sun, and you continue to make this world so much brighter just by being in it. Every memory we share is a treasure I keep close to my heart.\n\nThank you for your warmth, your laughter, and the endless kindness you give. May this new year bring you everything your beautiful soul has ever wished for.`,
    closing: 'With all my heart and forever,',
    signature: 'Yours always',
  },
  {
    title: 'Best Friend Forever',
    heading: 'To My Absolute Favorite Human',
    relationship: 'best_friend',
    body: `HAPPY BIRTHDAY TO MY BEST FRIEND! Where do I even begin? Thank you for being the one who always gets my jokes, stays up late to listen, and makes every single day an adventure.\n\nYou deserve the biggest celebrations, the sweetest cake, and a year overflowing with dreams coming true. I am so lucky to have you in my corner!`,
    closing: 'Cheers to another year of unforgettable memories!',
    signature: 'Your Partner in Crime',
  },
  {
    title: 'Sweet Family',
    heading: 'Wishing You Endless Joy',
    relationship: 'family',
    body: `Happy Birthday! Today we celebrate the wonderful, generous, and inspiring person you are to our whole family. Your presence brings so much comfort and laughter into our home.\n\nMay this special day surround you with love, peace, and all the sweet surprises you deserve.`,
    closing: 'Sending you the biggest hugs and blessings,',
    signature: 'With so much love',
  },
  {
    title: 'Playful & Joyful',
    heading: 'Level Up! Happy Birthday!',
    relationship: 'friend',
    body: `Another year wiser, bolder, and even more fabulous! I hope today is filled with extra slices of cake, endless giggles, and everything that makes you smile.\n\nHere is to celebrating you today and all year round. Happy, happy birthday!`,
    closing: 'Eat all the cake and make big wishes!',
    signature: 'Best wishes always',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'How does the birthday recipient open their gift?',
    a: 'When you finish creating your gift, you will receive a unique shareable link and a QR code. When the recipient opens the link on their phone, tablet, or laptop, they will experience the magical interactive opening sequence — lighting candles, blowing them out, opening the sealed envelope, listening to music, and reading your heartfelt letter.',
  },
  {
    q: 'Can the recipient open it on any device?',
    a: 'Yes! The entire website is crafted to be 100% responsive and works beautifully on iPhones, Android phones, tablets, Mac, and Windows computers without installing any app.',
  },
  {
    q: 'Does the music start playing automatically?',
    a: 'Web browsers require a user interaction (like tapping "Open Your Surprise" or "Hold to blow") before playing audio. As soon as the recipient clicks the button to open their gift, the chosen melody begins smoothly with full volume and mute controls.',
  },
  {
    q: 'Can I preview my birthday gift before sending?',
    a: 'Yes, absolutely! You can preview the entire interactive experience for free at any time during the creation wizard. You can test opening the letter, blowing out candles, and viewing photos before publishing.',
  },
  {
    q: 'Can I edit the gift after publishing?',
    a: 'Yes, if you keep your creation open or use your unique link, you can return to the editor at any time to update photos, messages, or themes.',
  },
  {
    q: 'Are my uploaded photos and message private?',
    a: 'Yes. Only people who have the exact private shareable link can access the birthday surprise. We do not index private birthday messages into search engines.',
  },
];

export const INITIAL_DRAFT: BirthdayGift = {
  id: '',
  publicSlug: '',
  experienceType: 'party',
  recipientName: '',
  senderName: '',
  birthdayDate: new Date().toISOString().split('T')[0],
  relationship: 'friend',
  nickname: '',

  // Surprises
  messageTitle: '',
  birthdayMessage: '',
  closingNote: '',
  signature: '',

  reasonsToLove: [],
  storyMilestones: [],
  wishesList: [],
  photos: [],
  places: [],

  specialDate: new Date().toISOString().split('T')[0],
  specialDateLabel: 'Birthday Celebration',
  showCountdown: true,

  musicTrackId: 'birthday-serenade',
  themeId: 'rose-romance',
  fontPairing: 'serif-elegant',
  animationIntensity: 'magical',

  termsAccepted: false,
  publishedStatus: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
