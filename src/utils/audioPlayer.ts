/**
 * Unified Two-Layer Audio Player for LireFacile:
 * Layer A (Primary): Pre-generated Human Neural MP3s (loaded from audio/manifest.json)
 * Layer B (Fallback): Highest-quality browser SpeechSynthesis voice (prioritizing Natural/Neural/Google/Siri)
 */

import { AudioManifest, AudioManifestEntry } from '../types';

export type AudioSourceType = 'neural' | 'browser' | 'none';

class UnifiedAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private nextAudioElement: HTMLAudioElement | null = null; // for preloading
  private manifest: AudioManifest | null = null;
  private manifestLoaded = false;
  private currentSource: AudioSourceType = 'none';
  private isPlaying = false;
  private synth: SpeechSynthesis | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private selectedBrowserVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<(source: AudioSourceType, isPlaying: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.nextAudioElement = new Audio();
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadBrowserVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadBrowserVoices();
        }
      }
      this.loadManifest();
    }
  }

  // Load the pre-generated audio manifest
  public async loadManifest() {
    try {
      // Use relative path so it works with any base URL or subdirectory
      const res = await fetch('./audio/manifest.json');
      if (res.ok) {
        this.manifest = await res.json();
        this.manifestLoaded = true;
      }
    } catch {
      // manifest not generated yet or offline
      this.manifestLoaded = true;
    }
  }

  // Load and rank browser voices for Layer B
  private loadBrowserVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    this.availableVoices = voices;

    // Filter French voices and rank by naturalness
    const frenchVoices = voices.filter(v => v.lang.toLowerCase().startsWith('fr'));

    // Preference hierarchy: Natural/Neural > Online/Google > Premium/Enhanced/Siri > Standard
    const priorityKeywords = ['natural', 'neural', 'online', 'google', 'siri', 'premium', 'enhanced'];

    const ranked = [...frenchVoices].sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aScore = priorityKeywords.findIndex(k => aName.includes(k));
      const bScore = priorityKeywords.findIndex(k => bName.includes(k));

      const aRank = aScore >= 0 ? aScore : 99;
      const bRank = bScore >= 0 ? bScore : 99;
      return aRank - bRank;
    });

    if (ranked.length > 0) {
      this.selectedBrowserVoice = ranked[0];
    }
  }

  public getAvailableFrenchVoices(): SpeechSynthesisVoice[] {
    return this.availableVoices.filter(v => v.lang.toLowerCase().startsWith('fr'));
  }

  public getSelectedBrowserVoice(): SpeechSynthesisVoice | null {
    return this.selectedBrowserVoice;
  }

  public setSelectedBrowserVoice(voiceURI: string) {
    const found = this.availableVoices.find(v => v.voiceURI === voiceURI);
    if (found) {
      this.selectedBrowserVoice = found;
    }
  }

  public subscribe(cb: (source: AudioSourceType, isPlaying: boolean) => void) {
    this.listeners.add(cb);
    cb(this.currentSource, this.isPlaying);
    return () => this.listeners.delete(cb);
  }

  private notify(source: AudioSourceType, isPlaying: boolean) {
    this.currentSource = source;
    this.isPlaying = isPlaying;
    this.listeners.forEach(cb => cb(source, isPlaying));
  }

  // Deterministic hash matching scripts/generate-audio.ts
  public computeHash(text: string, voice: string = 'fr-FR-Neural2-A', speed: number = 1.0): string {
    const normalized = text.trim().toLowerCase();
    const str = `${normalized}_${voice}_${speed.toFixed(2)}`;
    // Simple fast 32-bit FNV-1a hash formatted to hex
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 12);
  }

  // Preload next audio file for seamless continuous story playback
  public preloadNext(text: string, speed: number = 1.0, lang: 'fr' | 'en' = 'fr') {
    if (!this.manifest || !this.nextAudioElement) return;

    // Check manifest for matching entry
    const entries = Object.values(this.manifest.files || {});
    const match = entries.find(
      e => e.language === lang && e.text.trim().toLowerCase() === text.trim().toLowerCase() && Math.abs(e.speed - speed) < 0.05
    );

    if (match) {
      this.nextAudioElement.src = `./${match.filePath}`;
      this.nextAudioElement.preload = 'auto';
    }
  }

  // Stop any active audio immediately
  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement.onended = null;
      this.audioElement.onerror = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.notify('none', false);
  }

  // Primary playback routine (Layer A with Layer B fallback)
  public async play(options: {
    text: string;
    speed?: number; // 1.0 or 0.8
    lang?: 'fr' | 'en';
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }): Promise<AudioSourceType> {
    const { text, speed = 1.0, lang = 'fr', onStart, onEnd, onError } = options;
    this.stop();

    if (!text || text.trim().length === 0) {
      if (onEnd) onEnd();
      return 'none';
    }

    // 1. Try Layer A: Manifest Neural MP3
    if (this.manifest?.files) {
      const entries = Object.values(this.manifest.files);
      const cleanTarget = text.trim().toLowerCase();

      // Look for pre-generated file matching language, text and speed
      const match = entries.find(
        e =>
          e.language === lang &&
          e.text.trim().toLowerCase() === cleanTarget &&
          Math.abs(e.speed - speed) < 0.1
      ) || entries.find(
        e => e.language === lang && e.text.trim().toLowerCase() === cleanTarget
      );

      if (match && this.audioElement) {
        try {
          this.notify('neural', true);
          if (onStart) onStart();

          this.audioElement.src = `./${match.filePath}`;
          this.audioElement.playbackRate = 1.0; // pitch is already pre-baked at speed
          
          this.audioElement.onended = () => {
            this.notify('none', false);
            if (onEnd) onEnd();
          };

          this.audioElement.onerror = (e) => {
            console.warn('Neural audio file playback failed, falling back to browser voice:', e);
            this.playBrowserVoice(text, speed, lang, onStart, onEnd, onError);
          };

          await this.audioElement.play();
          return 'neural';
        } catch (e) {
          console.warn('Audio element error, falling back:', e);
        }
      }
    }

    // 2. Layer B Fallback: High-Quality Browser Voice
    return this.playBrowserVoice(text, speed, lang, onStart, onEnd, onError);
  }

  // Browser voice fallback implementation
  private playBrowserVoice(
    text: string,
    speed: number,
    lang: 'fr' | 'en',
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): AudioSourceType {
    if (!this.synth) {
      if (onEnd) onEnd();
      return 'none';
    }

    this.notify('browser', true);
    if (onStart) onStart();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = Math.max(0.6, Math.min(1.2, speed));

    if (lang === 'fr' && this.selectedBrowserVoice) {
      utterance.voice = this.selectedBrowserVoice;
    } else if (lang === 'en') {
      const enVoice = this.availableVoices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onend = () => {
      this.notify('none', false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Browser speech synthesis error:', e);
      this.notify('none', false);
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
    return 'browser';
  }

  public getCurrentSource(): AudioSourceType {
    return this.currentSource;
  }
}

export const audioPlayer = new UnifiedAudioPlayer();
