/**
 * Web Speech API wrapper for French pronunciation.
 * Works completely client-side and offline using system voices.
 */

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private frenchVoice: SpeechSynthesisVoice | null = null;
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onEndCallbacks: Set<() => void> = new Set();
  private onStartCallbacks: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize high-quality natural French voices (fr-FR or fr-CA)
    this.frenchVoice =
      voices.find(v => v.lang.toLowerCase() === 'fr-fr' && !v.name.includes('Google') === false) ||
      voices.find(v => v.lang.toLowerCase() === 'fr-fr') ||
      voices.find(v => v.lang.toLowerCase().startsWith('fr')) ||
      null;
  }

  public getAvailableFrenchVoice(): SpeechSynthesisVoice | null {
    if (!this.frenchVoice) {
      this.loadVoices();
    }
    return this.frenchVoice;
  }

  public stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public speak(
    text: string,
    rate: number = 0.85,
    onStart?: () => void,
    onEnd?: () => void
  ): boolean {
    if (!this.synth) return false;

    // Cancel any ongoing speech
    this.stop();

    if (!text || text.trim().length === 0) return false;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = Math.max(0.6, Math.min(1.2, rate)); // clamped to natural learner rate

    const voice = this.getAvailableFrenchVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  public getStatus(): { isAvailable: boolean; isSpeaking: boolean } {
    return {
      isAvailable: Boolean(this.synth),
      isSpeaking: this.isSpeaking
    };
  }
}

export const speechService = new SpeechService();
