/**
 * Web Audio Synthesizer & Audio Controller for VelvetWishes
 * Provides gentle, ambient music-box / bell chords for birthday surprises
 * without requiring external copyrighted MP3 dependencies, plus custom audio support.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private volume = 0.65;
  private isMuted = false;
  private currentPreset: string = 'velvet-lullaby';
  private audioElement: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Frequency mapping for musical notes
  private readonly NOTE_FREQS: Record<string, number> = {
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
    'C6': 1046.50
  };

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', decay = 1.8) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const toneGain = this.ctx.createGain();
      
      // Soft overtone for bell/chime shimmer
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2.02, this.ctx.currentTime); // Slight harmonic detune for chime feel

      const now = this.ctx.currentTime;
      toneGain.gain.setValueAtTime(0.001, now);
      toneGain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      overtoneGain.gain.setValueAtTime(0.001, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + decay * 0.7);

      osc.connect(toneGain);
      overtone.connect(overtoneGain);

      toneGain.connect(this.masterGain);
      overtoneGain.connect(this.masterGain);

      osc.start(now);
      overtone.start(now);

      osc.stop(now + decay);
      overtone.stop(now + decay);
    } catch {
      // Audio node cleanup safeguard
    }
  }

  // Melodies for presets
  private getSequence(preset: string): { note: string; dur: number; delay: number }[] {
    switch (preset) {
      case 'birthday-serenade':
        // Gentle Celesta "Happy Birthday" celebration motif
        return [
          { note: 'G4', dur: 0.4, delay: 0 },
          { note: 'G4', dur: 0.4, delay: 400 },
          { note: 'A4', dur: 0.8, delay: 800 },
          { note: 'G4', dur: 0.8, delay: 1500 },
          { note: 'C5', dur: 0.8, delay: 2200 },
          { note: 'B4', dur: 1.4, delay: 2900 },
          { note: 'G4', dur: 0.4, delay: 4200 },
          { note: 'G4', dur: 0.4, delay: 4600 },
          { note: 'A4', dur: 0.8, delay: 5000 },
          { note: 'G4', dur: 0.8, delay: 5700 },
          { note: 'D5', dur: 0.8, delay: 6400 },
          { note: 'C5', dur: 1.5, delay: 7100 },
          { note: 'G4', dur: 0.4, delay: 8500 },
          { note: 'G4', dur: 0.4, delay: 8900 },
          { note: 'G5', dur: 0.9, delay: 9300 },
          { note: 'E5', dur: 0.9, delay: 10100 },
          { note: 'C5', dur: 0.8, delay: 10900 },
          { note: 'B4', dur: 0.8, delay: 11600 },
          { note: 'A4', dur: 1.2, delay: 12300 },
          { note: 'F5', dur: 0.5, delay: 13600 },
          { note: 'F5', dur: 0.5, delay: 14000 },
          { note: 'E5', dur: 0.9, delay: 14500 },
          { note: 'C5', dur: 0.9, delay: 15300 },
          { note: 'D5', dur: 0.9, delay: 16100 },
          { note: 'C5', dur: 2.0, delay: 16900 },
        ];

      case 'starlight-dreams':
        // Ethereal floating arpeggio
        return [
          { note: 'C4', dur: 1.0, delay: 0 },
          { note: 'G4', dur: 1.0, delay: 600 },
          { note: 'C5', dur: 1.2, delay: 1200 },
          { note: 'E5', dur: 1.4, delay: 1800 },
          { note: 'G5', dur: 1.8, delay: 2400 },
          { note: 'E5', dur: 1.2, delay: 3400 },
          { note: 'A4', dur: 1.0, delay: 4200 },
          { note: 'E5', dur: 1.2, delay: 4800 },
          { note: 'A5', dur: 1.6, delay: 5400 },
          { note: 'F4', dur: 1.0, delay: 6800 },
          { note: 'C5', dur: 1.2, delay: 7400 },
          { note: 'F5', dur: 1.6, delay: 8000 },
          { note: 'G4', dur: 1.0, delay: 9400 },
          { note: 'D5', dur: 1.2, delay: 10000 },
          { note: 'B4', dur: 1.5, delay: 10600 },
          { note: 'C5', dur: 2.2, delay: 11400 },
        ];

      case 'twilight-chimes':
        // Warm reflective harmony
        return [
          { note: 'F4', dur: 1.2, delay: 0 },
          { note: 'A4', dur: 1.2, delay: 800 },
          { note: 'C5', dur: 1.5, delay: 1600 },
          { note: 'E5', dur: 2.0, delay: 2400 },
          { note: 'D4', dur: 1.2, delay: 4000 },
          { note: 'F4', dur: 1.2, delay: 4800 },
          { note: 'A4', dur: 1.5, delay: 5600 },
          { note: 'C5', dur: 2.0, delay: 6400 },
          { note: 'G4', dur: 1.2, delay: 8000 },
          { note: 'B4', dur: 1.2, delay: 8800 },
          { note: 'D5', dur: 1.5, delay: 9600 },
          { note: 'C5', dur: 2.5, delay: 10800 },
        ];

      case 'velvet-lullaby':
      default:
        // Gentle lullaby music box loop
        return [
          { note: 'C4', dur: 1.0, delay: 0 },
          { note: 'E4', dur: 1.0, delay: 500 },
          { note: 'G4', dur: 1.2, delay: 1000 },
          { note: 'B4', dur: 1.4, delay: 1500 },
          { note: 'C5', dur: 1.8, delay: 2000 },
          { note: 'G4', dur: 1.0, delay: 3000 },
          { note: 'E4', dur: 1.0, delay: 3500 },
          { note: 'A4', dur: 1.2, delay: 4200 },
          { note: 'C5', dur: 1.4, delay: 4800 },
          { note: 'E5', dur: 2.0, delay: 5400 },
          { note: 'D5', dur: 1.2, delay: 6800 },
          { note: 'B4', dur: 1.2, delay: 7400 },
          { note: 'G4', dur: 1.5, delay: 8000 },
          { note: 'C5', dur: 2.4, delay: 9000 },
        ];
    }
  }

  public playPreset(preset: string) {
    this.initContext();
    this.stop();

    this.currentPreset = preset;
    this.isPlaying = true;

    const sequence = this.getSequence(preset);
    const totalLoopDuration = (sequence[sequence.length - 1]?.delay || 10000) + 2500;

    const playLoop = () => {
      if (!this.isPlaying) return;

      sequence.forEach(({ note, delay }) => {
        window.setTimeout(() => {
          if (!this.isPlaying) return;
          const freq = this.NOTE_FREQS[note];
          if (freq) {
            this.playTone(freq, 1.2, 'sine', 1.9);
          }
        }, delay);
      });

      this.timer = window.setTimeout(playLoop, totalLoopDuration);
    };

    playLoop();
  }

  public playCustomAudio(dataUrl: string) {
    this.stop();
    this.isPlaying = true;
    try {
      this.audioElement = new Audio(dataUrl);
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.play().catch(() => {
        // Autoplay policy prevented immediate playback
      });
    } catch {
      // Audio playback failed
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx?.currentTime || 0);
    }
    if (this.audioElement && !this.isMuted) {
      this.audioElement.volume = this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx?.currentTime || 0);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const audioSynth = new AudioSynthesizer();
