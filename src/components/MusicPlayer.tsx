import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Upload, Check, AlertCircle, Info } from 'lucide-react';
import { MUSIC_OPTIONS } from '../lib/constants';
import { audioSynth } from '../lib/audioSynthesizer';

interface MusicPlayerProps {
  selectedTrackId: string;
  customAudioData?: string;
  customAudioName?: string;
  onSelectTrack: (trackId: string, customData?: string, customName?: string) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  selectedTrackId,
  customAudioData,
  customAudioName,
  onSelectTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      audioSynth.stop();
    };
  }, []);

  const handleTogglePlay = (trackId: string) => {
    if (isPlaying && selectedTrackId === trackId) {
      audioSynth.stop();
      setIsPlaying(false);
      return;
    }

    if (trackId === 'none') {
      audioSynth.stop();
      setIsPlaying(false);
      return;
    }

    if (trackId === 'custom' && customAudioData) {
      audioSynth.playCustomAudio(customAudioData);
      setIsPlaying(true);
      return;
    }

    // Play preset
    const track = MUSIC_OPTIONS.find((t) => t.id === trackId);
    if (track) {
      audioSynth.playPreset(track.synthPreset);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (trackId: string) => {
    onSelectTrack(trackId, customAudioData, customAudioName);
    if (trackId === 'none') {
      audioSynth.stop();
      setIsPlaying(false);
    } else if (isPlaying) {
      handleTogglePlay(trackId);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    audioSynth.setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setAudioError('Please select a valid audio file (MP3, WAV, OGG).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setAudioError('Audio file must be under 8MB.');
      return;
    }

    setAudioError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onSelectTrack('custom', result, file.name);
      audioSynth.playCustomAudio(result);
      setIsPlaying(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Active Track Player Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#D4AF37]/50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C8102E] to-[#A00C24] text-[#D4AF37] flex items-center justify-center shadow-xs">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
              <span>Selected Track:</span>
              <span className="text-[#C8102E]">
                {selectedTrackId === 'none'
                  ? 'No Music'
                  : selectedTrackId === 'custom'
                  ? customAudioName || 'Custom Audio'
                  : MUSIC_OPTIONS.find((t) => t.id === selectedTrackId)?.name || 'Velvet Lullaby'}
              </span>
            </div>
            <div className="text-[11px] text-[#666666]">
              {isPlaying ? '♪ Playing preview now...' : 'Click play to hear sample melody'}
            </div>
          </div>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-2 rounded-lg text-[#C8102E] hover:bg-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 accent-[#C8102E] cursor-pointer"
          />
        </div>
      </div>

      {/* Track Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {MUSIC_OPTIONS.map((track) => {
          const isSelected = selectedTrackId === track.id;
          const isCurrentPlaying = isPlaying && isSelected;

          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(track.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-white border-[#C8102E] shadow-sm ring-1 ring-[#D4AF37]'
                  : 'bg-white/80 hover:bg-white border-[#EBD9A5] hover:border-[#D4AF37]'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#111111]">{track.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FAF6EB] text-[#C8102E] border border-[#D4AF37]/40">
                    {track.mood}
                  </span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">{track.description}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTrack(track.id);
                    handleTogglePlay(track.id);
                  }}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isCurrentPlaying
                      ? 'bg-[#C8102E] text-white shadow-sm'
                      : 'bg-[#FAF6EB] text-[#C8102E] hover:bg-[#F7E7B4]'
                  }`}
                  title={isCurrentPlaying ? 'Pause track' : 'Play track'}
                >
                  {isCurrentPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                {isSelected && <Check className="w-4 h-4 text-[#C8102E]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Audio & No Music options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
        {/* Custom Upload */}
        <div
          onClick={() => audioInputRef.current?.click()}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
            selectedTrackId === 'custom'
              ? 'bg-white border-[#C8102E] shadow-sm ring-1 ring-[#D4AF37]'
              : 'bg-white/80 hover:bg-white border-[#EBD9A5]'
          }`}
        >
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleCustomAudioUpload}
          />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FAF6EB] text-[#C8102E] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#111111] block">
                {customAudioName ? customAudioName : 'Upload Custom Song'}
              </span>
              <span className="text-xs text-[#666666]">MP3, WAV, or OGG up to 8MB</span>
            </div>
          </div>
          {selectedTrackId === 'custom' && <Check className="w-4 h-4 text-[#C8102E]" />}
        </div>

        {/* No Music */}
        <div
          onClick={() => handleSelectTrack('none')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
            selectedTrackId === 'none'
              ? 'bg-white border-[#C8102E] shadow-sm ring-1 ring-[#D4AF37]'
              : 'bg-white/80 hover:bg-white border-[#EBD9A5]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
              <Music className="w-4 h-4 opacity-40" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#111111] block">No Music</span>
              <span className="text-xs text-[#666666]">Play surprise in peaceful silence</span>
            </div>
          </div>
          {selectedTrackId === 'none' && <Check className="w-4 h-4 text-[#C8102E]" />}
        </div>
      </div>

      {audioError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[#C8102E] text-xs flex items-center gap-2 font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{audioError}</span>
        </div>
      )}

      {/* Autoplay restriction tip notice */}
      <div className="p-3.5 rounded-xl bg-[#FAF6EB] border border-[#D4AF37]/40 text-xs text-[#4A4A4A] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#111111] font-bold">How audio plays for the recipient:</strong> Due to web browser security policies, music starts playing as soon as the birthday person interacts with the page (such as clicking "Open Your Surprise" or "Light Candles").
        </div>
      </div>
    </div>
  );
};
