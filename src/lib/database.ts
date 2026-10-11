import LZString from 'lz-string';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { BirthdayGift, PhotoItem } from '../types/birthday';
import { INITIAL_DRAFT } from './constants';

const LOCAL_STORAGE_PUBLISHED_KEY = 'velvet_published_gifts';

export function generatePublicSlug(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let result = 'vw_';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Compress gift to URL-safe string
export function compressGiftForUrl(gift: BirthdayGift): string {
  try {
    const minified = {
      s: gift.publicSlug,
      e: gift.experienceType,
      r: gift.recipientName,
      sn: gift.senderName,
      d: gift.birthdayDate,
      rel: gift.relationship,
      nk: gift.nickname,
      t: gift.messageTitle,
      m: gift.birthdayMessage,
      c: gift.closingNote,
      sg: gift.signature,
      p: gift.photos.map(p => ({
        u: p.url,
        c: p.caption,
        s: p.sortOrder,
        n: p.fileName,
      })),
      rl: gift.reasonsToLove || [],
      sm: gift.storyMilestones || [],
      wl: gift.wishesList || [],
      pl: gift.places || [],
      sd: gift.specialDate || '',
      sdl: gift.specialDateLabel || '',
      sc: gift.showCountdown ?? true,
      mu: gift.musicTrackId,
      ca: gift.customAudioData ? gift.customAudioData.slice(0, 1000) : undefined, // Light preview
      th: gift.themeId,
      fp: gift.fontPairing,
      ai: gift.animationIntensity,
    };
    return LZString.compressToEncodedURIComponent(JSON.stringify(minified));
  } catch (err) {
    console.error('Failed to compress gift:', err);
    return '';
  }
}

// Decompress gift from URL-safe string
export function decompressGiftFromUrl(encoded: string): BirthdayGift | null {
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(encoded);
    if (!jsonStr) return null;
    const minified = JSON.parse(jsonStr);

    return {
      id: minified.s || 'gift_loaded',
      publicSlug: minified.s || generatePublicSlug(),
      experienceType: minified.e || 'letter',
      recipientName: minified.r || '',
      senderName: minified.sn || '',
      birthdayDate: minified.d || new Date().toISOString().split('T')[0],
      relationship: minified.rel || 'friend',
      nickname: minified.nk || '',
      messageTitle: minified.t || 'Happy Birthday!',
      birthdayMessage: minified.m || '',
      closingNote: minified.c || '',
      signature: minified.sg || '',
      reasonsToLove: minified.rl || [],
      storyMilestones: minified.sm || [],
      wishesList: minified.wl || [],
      photos: (minified.p || []).map((p: any, index: number) => ({
        id: `photo_${index}`,
        url: p.u,
        caption: p.c,
        sortOrder: p.s ?? index,
        fileName: p.n,
      })),
      places: minified.pl || [],
      specialDate: minified.sd || '',
      specialDateLabel: minified.sdl || '',
      showCountdown: minified.sc ?? true,
      musicTrackId: minified.mu || 'velvet-lullaby',
      customAudioData: minified.ca,
      themeId: minified.th || 'purple-dreams',
      fontPairing: minified.fp || 'serif-elegant',
      animationIntensity: minified.ai || 'magical',
      termsAccepted: true,
      publishedStatus: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to decompress gift:', err);
    return null;
  }
}

export async function publishBirthdayGift(
  giftData: BirthdayGift
): Promise<{ success: boolean; slug: string; compressedData: string; error?: string }> {
  try {
    const slug = giftData.publicSlug || generatePublicSlug();
    const publishedGift: BirthdayGift = {
      ...giftData,
      id: giftData.id || crypto.randomUUID?.() || `id_${Date.now()}`,
      publicSlug: slug,
      publishedStatus: 'published',
      updatedAt: new Date().toISOString(),
    };

    // 1. Save to local storage for quick retrieval & offline safety
    try {
      const localGifts = getLocalPublishedGifts();
      localGifts[slug] = publishedGift;
      localStorage.setItem(LOCAL_STORAGE_PUBLISHED_KEY, JSON.stringify(localGifts));
    } catch {
      // LocalStorage quota fallback
    }

    // 2. Compress for universal cross-device URL sharing
    const compressedData = compressGiftForUrl(publishedGift);

    // 3. Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: giftError } = await supabase.from('birthday_gifts').upsert({
          public_slug: slug,
          experience_type: publishedGift.experienceType,
          recipient_name: publishedGift.recipientName,
          sender_name: publishedGift.senderName,
          birthday_date: publishedGift.birthdayDate,
          relationship: publishedGift.relationship,
          nickname: publishedGift.nickname,
          message_title: publishedGift.messageTitle,
          birthday_message: publishedGift.birthdayMessage,
          closing_note: publishedGift.closingNote,
          signature: publishedGift.signature,
          music_track_id: publishedGift.musicTrackId,
          custom_audio_data: publishedGift.customAudioData,
          custom_audio_name: publishedGift.customAudioName,
          theme_id: publishedGift.themeId,
          font_pairing: publishedGift.fontPairing,
          animation_intensity: publishedGift.animationIntensity,
          published_status: 'published',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'public_slug' });

        if (giftError) {
          console.warn('Supabase gift upsert warning:', giftError.message);
        } else if (publishedGift.photos.length > 0) {
          // Photos insert
          const photoInserts = publishedGift.photos.map((p, idx) => ({
            gift_id: publishedGift.id,
            photo_url: p.url,
            caption: p.caption || '',
            sort_order: p.sortOrder ?? idx,
            file_name: p.fileName || `photo_${idx}.jpg`,
          }));
          await supabase.from('birthday_photos').insert(photoInserts);
        }
      } catch (dbErr) {
        console.warn('Cloud DB save fallback active:', dbErr);
      }
    }

    return {
      success: true,
      slug,
      compressedData,
    };
  } catch (error: any) {
    console.error('Publishing failed:', error);
    return {
      success: false,
      slug: '',
      compressedData: '',
      error: error?.message || 'Failed to publish gift',
    };
  }
}

export async function fetchPublishedGift(
  slug: string,
  urlData?: string | null
): Promise<BirthdayGift | null> {
  // 1. Decompress from URL param if present (cross-device immediate share)
  if (urlData) {
    const decompressed = decompressGiftFromUrl(urlData);
    if (decompressed) {
      return decompressed;
    }
  }

  // 2. Fetch from Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('birthday_gifts')
        .select('*')
        .eq('public_slug', slug)
        .eq('published_status', 'published')
        .single();

      if (!error && data) {
        // Fetch photos
        let photos: PhotoItem[] = [];
        const { data: photoData } = await supabase
          .from('birthday_photos')
          .select('*')
          .eq('gift_id', data.id)
          .order('sort_order', { ascending: true });

        if (photoData) {
          photos = photoData.map((p: any) => ({
            id: p.id,
            url: p.photo_url,
            caption: p.caption,
            sortOrder: p.sort_order,
            fileName: p.file_name,
          }));
        }

        return {
          ...INITIAL_DRAFT,
          id: data.id,
          publicSlug: data.public_slug,
          experienceType: data.experience_type,
          recipientName: data.recipient_name,
          senderName: data.sender_name,
          birthdayDate: data.birthday_date,
          relationship: data.relationship,
          nickname: data.nickname,
          messageTitle: data.message_title,
          birthdayMessage: data.birthday_message,
          closingNote: data.closing_note,
          signature: data.signature,
          photos,
          musicTrackId: data.music_track_id,
          customAudioData: data.custom_audio_data,
          customAudioName: data.custom_audio_name,
          themeId: data.theme_id,
          fontPairing: data.font_pairing,
          animationIntensity: data.animation_intensity,
          publishedStatus: 'published',
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (err) {
      console.warn('Supabase fetch error:', err);
    }
  }

  // 3. Fallback to local storage
  const localGifts = getLocalPublishedGifts();
  if (localGifts[slug]) {
    return localGifts[slug];
  }

  return null;
}

export function getLocalPublishedGifts(): Record<string, BirthdayGift> {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_PUBLISHED_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
