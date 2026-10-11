import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  Plus,
  Trash2,
  Mail,
  Heart,
  BookOpen,
  Camera,
  MapPin,
  Calendar,
  Music,
} from 'lucide-react';
import { BirthdayGift, SurpriseKey, StoryMilestone, SpecialPlace, PhotoItem } from '../../types/birthday';
import { PhotoUploader } from '../PhotoUploader';
import { MusicPlayer } from '../MusicPlayer';
import { SAMPLE_MESSAGES } from '../../lib/constants';

interface SurpriseEditorModalProps {
  surpriseKey: SurpriseKey | null;
  draft: BirthdayGift;
  onUpdateDraft: (fields: Partial<BirthdayGift>) => void;
  onClose: () => void;
}

export const SurpriseEditorModal: React.FC<SurpriseEditorModalProps> = ({
  surpriseKey,
  draft,
  onUpdateDraft,
  onClose,
}) => {
  if (!surpriseKey) return null;

  // Local state for Reasons (What I Love)
  const [newReason, setNewReason] = useState('');
  // Local state for Wishes
  const [newWish, setNewWish] = useState('');
  // Local state for Story
  const [storyTitle, setStoryTitle] = useState('');
  const [storyText, setStoryText] = useState('');
  const [storyYear, setStoryYear] = useState('');
  // Local state for Places
  const [placeName, setPlaceName] = useState('');
  const [placeDesc, setPlaceDesc] = useState('');

  // 1. Handlers for Reasons (What I Love)
  const handleAddReason = () => {
    if (!newReason.trim()) return;
    onUpdateDraft({
      reasonsToLove: [...draft.reasonsToLove, newReason.trim()],
    });
    setNewReason('');
  };

  const handleRemoveReason = (index: number) => {
    onUpdateDraft({
      reasonsToLove: draft.reasonsToLove.filter((_, i) => i !== index),
    });
  };

  // 2. Handlers for Wishes
  const handleAddWish = () => {
    if (!newWish.trim()) return;
    onUpdateDraft({
      wishesList: [...draft.wishesList, newWish.trim()],
    });
    setNewWish('');
  };

  const handleRemoveWish = (index: number) => {
    onUpdateDraft({
      wishesList: draft.wishesList.filter((_, i) => i !== index),
    });
  };

  // 3. Handlers for Story Milestones
  const handleAddStory = () => {
    if (!storyText.trim()) return;
    const milestone: StoryMilestone = {
      id: `story_${Date.now()}`,
      title: storyTitle.trim() || 'Our Memory',
      story: storyText.trim(),
      yearOrDate: storyYear.trim(),
    };
    onUpdateDraft({
      storyMilestones: [...draft.storyMilestones, milestone],
    });
    setStoryTitle('');
    setStoryText('');
    setStoryYear('');
  };

  const handleRemoveStory = (id: string) => {
    onUpdateDraft({
      storyMilestones: draft.storyMilestones.filter((s) => s.id !== id),
    });
  };

  // 4. Handlers for Special Places
  const handleAddPlace = () => {
    if (!placeName.trim()) return;
    const place: SpecialPlace = {
      id: `place_${Date.now()}`,
      name: placeName.trim(),
      description: placeDesc.trim(),
    };
    onUpdateDraft({
      places: [...draft.places, place],
    });
    setPlaceName('');
    setPlaceDesc('');
  };

  const handleRemovePlace = (id: string) => {
    onUpdateDraft({
      places: draft.places.filter((p) => p.id !== id),
    });
  };

  const handleClearSurprise = () => {
    switch (surpriseKey) {
      case 'letter':
        onUpdateDraft({ birthdayMessage: '', messageTitle: '', closingNote: '', signature: '' });
        break;
      case 'whatILove':
        onUpdateDraft({ reasonsToLove: [] });
        break;
      case 'ourStory':
        onUpdateDraft({ storyMilestones: [] });
        break;
      case 'wishes':
        onUpdateDraft({ wishesList: [] });
        break;
      case 'moments':
        onUpdateDraft({ photos: [] });
        break;
      case 'places':
        onUpdateDraft({ places: [] });
        break;
      case 'ourDate':
        onUpdateDraft({ specialDate: '', specialDateLabel: '', showCountdown: false });
        break;
      case 'ourSong':
        onUpdateDraft({ musicTrackId: 'none', customAudioData: undefined, customAudioName: undefined });
        break;
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0A0E2A]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 relative max-h-[90vh] overflow-y-auto text-left flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/25 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF6EB] text-[#C8102E] border border-[#D4AF37]/40 flex items-center justify-center font-bold">
              {surpriseKey === 'letter' && <Mail className="w-5 h-5 text-[#C8102E]" />}
              {surpriseKey === 'whatILove' && <Heart className="w-5 h-5 text-[#C8102E]" />}
              {surpriseKey === 'ourStory' && <BookOpen className="w-5 h-5 text-[#C8102E]" />}
              {surpriseKey === 'wishes' && <Sparkles className="w-5 h-5 text-[#D4AF37]" />}
              {surpriseKey === 'moments' && <Camera className="w-5 h-5 text-[#C8102E]" />}
              {surpriseKey === 'places' && <MapPin className="w-5 h-5 text-[#C8102E]" />}
              {surpriseKey === 'ourDate' && <Calendar className="w-5 h-5 text-[#C8102E]" />}
              {surpriseKey === 'ourSong' && <Music className="w-5 h-5 text-[#C8102E]" />}
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                {surpriseKey === 'letter' && 'The Letter'}
                {surpriseKey === 'whatILove' && 'What I Love'}
                {surpriseKey === 'ourStory' && 'Our Story'}
                {surpriseKey === 'wishes' && 'Birthday Wishes'}
                {surpriseKey === 'moments' && 'Photo Moments'}
                {surpriseKey === 'places' && 'Special Places'}
                {surpriseKey === 'ourDate' && 'Our Date & Countdown'}
                {surpriseKey === 'ourSong' && 'Our Song'}
              </h3>
              <p className="text-xs text-[#666666]">
                Customize this special surprise for {draft.recipientName || 'them'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#666666] hover:text-[#C8102E] hover:bg-[#FAF6EB] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* SURPRISE EDITORS CONTENT                                  */}
        {/* ========================================================= */}
        <div className="space-y-6 flex-1 py-1">
          {/* 1. THE LETTER */}
          {surpriseKey === 'letter' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  Quick Templates
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_MESSAGES.map((t) => (
                    <button
                      key={t.title}
                      type="button"
                      onClick={() => {
                        onUpdateDraft({
                          messageTitle: t.heading,
                          birthdayMessage: t.body,
                          closingNote: t.closing,
                          signature: t.signature,
                        });
                      }}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#FAF6EB] border border-[#D4AF37]/50 text-[#111111] hover:bg-[#F7E7B4] hover:text-[#C8102E] font-bold transition-colors cursor-pointer"
                    >
                      + {t.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111]">Letter Title</label>
                <input
                  type="text"
                  placeholder="e.g. Happy Birthday to My Light and Star"
                  value={draft.messageTitle}
                  onChange={(e) => onUpdateDraft({ messageTitle: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] text-[#111111]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111]">Birthday Message</label>
                <textarea
                  rows={6}
                  placeholder="Write your heartfelt birthday words..."
                  value={draft.birthdayMessage}
                  onChange={(e) => onUpdateDraft({ birthdayMessage: e.target.value })}
                  className="w-full text-sm p-4 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] leading-relaxed font-serif text-[#111111]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111111]">Closing Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Forever and always,"
                    value={draft.closingNote || draft.closing || ''}
                    onChange={(e) => onUpdateDraft({ closingNote: e.target.value, closing: e.target.value })}
                    className="w-full text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] text-[#111111]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111111]">Signature</label>
                  <input
                    type="text"
                    placeholder="e.g. With all my love, Liam"
                    value={draft.signature || ''}
                    onChange={(e) => onUpdateDraft({ signature: e.target.value })}
                    className="w-full text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] text-[#111111]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. WHAT I LOVE (REASONS LIST) */}
          {surpriseKey === 'whatILove' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666]">
                Add special reasons why {draft.recipientName || 'they'} mean the world to you.
              </p>

              {/* Add reason input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Your contagious laughter that brightens every room..."
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddReason())}
                  className="flex-1 text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] text-[#111111]"
                />
                <button
                  type="button"
                  onClick={handleAddReason}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer border border-[#D4AF37]/40"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* List of current reasons */}
              <div className="space-y-2 pt-2">
                {draft.reasonsToLove && draft.reasonsToLove.length > 0 ? (
                  draft.reasonsToLove.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] flex items-center justify-between gap-3 text-sm text-[#111111]"
                    >
                      <span className="font-bold text-[#C8102E] shrink-0">#{idx + 1}</span>
                      <span className="flex-1 font-serif">{reason}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveReason(idx)}
                        className="text-[#666666] hover:text-[#C8102E] p-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#888888] italic p-4 text-center bg-[#FAF6EB] rounded-2xl border border-dashed border-[#D4AF37]">
                    No reasons added yet. Type a reason above and click Add!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 3. OUR STORY (MILESTONES) */}
          {surpriseKey === 'ourStory' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666]">
                Build a memorable timeline of your journey together.
              </p>

              {/* Add Milestone Form */}
              <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Milestone Title (e.g. The Day We Met)"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    className="text-xs px-3.5 py-2.5 rounded-xl border border-[#EBD9A5] focus:border-[#C8102E] bg-white focus:outline-none text-[#111111]"
                  />
                  <input
                    type="text"
                    placeholder="Year or Date (e.g. Summer 2022)"
                    value={storyYear}
                    onChange={(e) => setStoryYear(e.target.value)}
                    className="text-xs px-3.5 py-2.5 rounded-xl border border-[#EBD9A5] focus:border-[#C8102E] bg-white focus:outline-none text-[#111111]"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Describe this special memory..."
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#EBD9A5] focus:border-[#C8102E] bg-white focus:outline-none text-[#111111]"
                />
                <button
                  type="button"
                  onClick={handleAddStory}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-[#D4AF37]/40"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F7E7B4]" />
                  <span>Add Memory to Timeline</span>
                </button>
              </div>

              {/* List of Milestones */}
              <div className="space-y-2 pt-2">
                {draft.storyMilestones && draft.storyMilestones.length > 0 ? (
                  draft.storyMilestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-2xl bg-white border border-[#EBD9A5] flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#111111]">{m.title}</span>
                          {m.yearOrDate && (
                            <span className="text-[10px] bg-[#FAF6EB] text-[#C8102E] border border-[#D4AF37]/50 px-2 py-0.5 rounded-full font-bold">
                              {m.yearOrDate}
                            </span>
                          )}
                        </div>
                        <p className="text-[#666666]">{m.story}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStory(m.id)}
                        className="text-[#666666] hover:text-[#C8102E] p-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#888888] italic p-4 text-center bg-[#FAF6EB] rounded-2xl border border-dashed border-[#D4AF37]">
                    No milestones added yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 4. WISHES */}
          {surpriseKey === 'wishes' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666]">
                Write heartfelt wishes and dreams for their upcoming year.
              </p>

              {/* Add wish */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. May this year bring endless adventure and happiness!"
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddWish())}
                  className="flex-1 text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] text-[#111111]"
                />
                <button
                  type="button"
                  onClick={handleAddWish}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer border border-[#D4AF37]/40"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Current wishes list */}
              <div className="space-y-2 pt-2">
                {draft.wishesList && draft.wishesList.length > 0 ? (
                  draft.wishesList.map((wish, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] flex items-center justify-between gap-3 text-sm text-[#111111]"
                    >
                      <span className="text-[#D4AF37]">✨</span>
                      <span className="flex-1 font-serif">{wish}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveWish(idx)}
                        className="text-[#666666] hover:text-[#C8102E] p-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#888888] italic p-4 text-center bg-[#FAF6EB] rounded-2xl border border-dashed border-[#D4AF37]">
                    No wishes added yet. Type your wish above and click Add!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 5. MOMENTS (PHOTOS) */}
          {surpriseKey === 'moments' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666]">
                Upload your favourite photos together. They will be framed in beautiful polaroids!
              </p>
              <PhotoUploader
                photos={draft.photos}
                onAddPhoto={(photo: PhotoItem) => {
                  onUpdateDraft({ photos: [...draft.photos, photo] });
                }}
                onRemovePhoto={(id: string) => {
                  onUpdateDraft({ photos: draft.photos.filter((p) => p.id !== id) });
                }}
                onReorderPhotos={(newPhotos: PhotoItem[]) => {
                  onUpdateDraft({ photos: newPhotos });
                }}
                onUpdateCaption={(id: string, caption: string) => {
                  onUpdateDraft({
                    photos: draft.photos.map((p) => (p.id === id ? { ...p, caption } : p)),
                  });
                }}
              />
            </div>
          )}

          {/* 6. PLACES */}
          {surpriseKey === 'places' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666]">
                Add meaningful places and special memories you share.
              </p>

              {/* Add Place */}
              <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] space-y-3">
                <input
                  type="text"
                  placeholder="Place Name (e.g. Sunset Point Cafe)"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EBD9A5] focus:border-[#C8102E] bg-white focus:outline-none text-[#111111]"
                />
                <input
                  type="text"
                  placeholder="Why is it special? (e.g. Where we had our first deep talk)"
                  value={placeDesc}
                  onChange={(e) => setPlaceDesc(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EBD9A5] focus:border-[#C8102E] bg-white focus:outline-none text-[#111111]"
                />
                <button
                  type="button"
                  onClick={handleAddPlace}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-[#D4AF37]/40"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F7E7B4]" />
                  <span>Add Place</span>
                </button>
              </div>

              {/* Places List */}
              <div className="space-y-2 pt-2">
                {draft.places && draft.places.length > 0 ? (
                  draft.places.map((place) => (
                    <div
                      key={place.id}
                      className="p-3 rounded-2xl bg-white border border-[#EBD9A5] flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#111111] block">{place.name}</span>
                        {place.description && (
                          <p className="text-[#666666]">{place.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePlace(place.id)}
                        className="text-[#666666] hover:text-[#C8102E] p-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#888888] italic p-4 text-center bg-[#FAF6EB] rounded-2xl border border-dashed border-[#D4AF37]">
                    No special places added yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 7. OUR DATE & COUNTDOWN */}
          {surpriseKey === 'ourDate' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666]">
                Configure the special celebration date and countdown timer.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111]">Special Date</label>
                <input
                  type="date"
                  value={draft.birthdayDate}
                  onChange={(e) => onUpdateDraft({ birthdayDate: e.target.value, specialDate: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] text-[#111111]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111]">Event Label</label>
                <input
                  type="text"
                  placeholder="e.g. The Big Day, Dinesh's Birthday"
                  value={draft.specialDateLabel || ''}
                  onChange={(e) => onUpdateDraft({ specialDateLabel: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-2xl border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#F7E7B4] text-[#111111]"
                />
              </div>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.showCountdown}
                  onChange={(e) => onUpdateDraft({ showCountdown: e.target.checked })}
                  className="w-4 h-4 rounded text-[#C8102E] focus:ring-[#C8102E] cursor-pointer"
                />
                <span className="text-xs font-bold text-[#111111]">
                  Show live countdown clock on the birthday page
                </span>
              </label>
            </div>
          )}

          {/* 8. OUR SONG */}
          {surpriseKey === 'ourSong' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666]">
                Select an ambient birthday melody or upload your own song.
              </p>
              <MusicPlayer
                selectedTrackId={draft.musicTrackId}
                customAudioData={draft.customAudioData}
                customAudioName={draft.customAudioName}
                onSelectTrack={(trackId, customData, customName) => {
                  onUpdateDraft({
                    musicTrackId: trackId,
                    customAudioData: customData,
                    customAudioName: customName,
                  });
                }}
              />
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="pt-6 border-t border-[#D4AF37]/30 flex items-center justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={handleClearSurprise}
            className="px-4 py-2 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 text-[#C8102E] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Clear content and leave this surprise out of the gift"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear / Leave Out</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer border border-[#D4AF37]/40"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save & Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};
