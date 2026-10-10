export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type Gender = 'masculine' | 'feminine';
export type GrammaticalNumber = 'singular' | 'plural';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'pronoun'
  | 'conjunction'
  | 'expression'
  | 'article'
  | 'interjection'
  | 'number';

export interface VocabEntry {
  lemma: string;
  en: string;
  bn: string;
  pos: PartOfSpeech;
  note?: string;
  ttsText?: string; // Optional phonetic or expansion override for speech synthesis
  gender?: Gender;
  number?: GrammaticalNumber;
  person?: string; // e.g. '1st person singular', '3rd person singular', '2nd person plural'
  tense?: string; // e.g. 'present', 'imperfect', 'future', 'conditional', 'subjunctive', 'imperative', 'infinitive', 'past participle', 'present participle'
  lemmaWithArticle?: string; // Dictionary article for noun lemmas e.g. "le croissant", "la baguette", "l'ami"
  check?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string; // in simple English
  explanationBn: string; // in Bangla
}

export interface SentenceBreakdown {
  fr: string;
  en: string;
  bn?: string;
  ttsTextFr?: string;
  ttsTextEn?: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  level: CEFRLevel;
  topic: string;
  topics?: string[];
  series?: string;
  wordCount: number;
  estimatedMinutes: number;
  paragraphs: string[];
  paragraphTts?: string[]; // optional pronunciation overrides
  paragraphTranslations: string[];
  sentenceBreakdowns?: SentenceBreakdown[][];
  vocabulary: Record<string, VocabEntry>;
  quiz: QuizQuestion[];
}

export interface SavedWord {
  id: string;
  word: string;
  lemma: string;
  en: string;
  bn: string;
  pos: PartOfSpeech;
  sentence: string;
  storyId: string;
  storyTitle: string;
  dateAdded: string; // ISO date
  srsStage: number; // 1 to 5 (Leitner boxes)
  nextReviewDate: string; // ISO date string (YYYY-MM-DD or ISO)
  timesReviewed: number;
  timesCorrect: number;
  lastReviewedDate?: string;
  updatedAt?: string; // ISO date of latest update
  deletedAt?: string; // ISO date if tombstoned for cross-device sync
  ttsText?: string;
  gender?: Gender;
  number?: GrammaticalNumber;
  person?: string;
  tense?: string;
  lemmaWithArticle?: string;
}

export interface ReviewHistoryEntry {
  date: string; // YYYY-MM-DD
  cardsReviewed: number;
  cardsCorrect: number;
  accuracyPercentage: number;
}

export interface StoryQuizRecord {
  bestScore: number; // 0-100
  lastScore: number; // 0-100
  attempts: number;
  lastAttemptDate: string;
}

export interface DayActivity {
  reviews: number;
  storiesRead: number;
  quizzesTaken: number;
}

export interface PlacementResult {
  level: CEFRLevel;
  score: number;
  total: number;
  date: string;
}

export interface UserStats {
  storiesReadIds: string[];
  totalWordsRead: number;
  lastActiveDate: string;
  streakDays: number;
  longestStreak: number;
  quizScores: Record<string, number>;
  quizHistory: Record<string, StoryQuizRecord>;
  reviewHistory: ReviewHistoryEntry[];
  activityLog: Record<string, DayActivity>;
  placementResult?: PlacementResult;
  hasSeenPlacementPrompt?: boolean;
  recommendedLevel: CEFRLevel;
}

export interface UserProfile {
  id: string; // 'default' for original profile, or random/slug id for created profiles
  name: string; // Display name, e.g. "Me" or "Alice"
  createdAt: string;
}

export interface ProfilesState {
  profiles: UserProfile[];
  activeProfileId: string;
  hasPromptedInitialName?: boolean;
}

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'sepia';
export type FontSizeSetting = 'small' | 'medium' | 'large' | 'xlarge';
export type LineSpacingSetting = 'normal' | 'relaxed';

export interface AppSettings {
  playbackRate: number; // 0.7, 0.85, 1.0
  fontSize: FontSizeSetting;
  lineSpacing?: LineSpacingSetting; // 'normal' | 'relaxed'
  theme?: ThemeMode; // 'light' | 'dark' | 'sepia' (defaults to device preference if undefined)
  showParallelTranslation: boolean;
  activeLanguageTab: 'both' | 'bn' | 'en';
  dailyReviewLimit: number; // default 20
  dailyNewWordsLimit: number; // default 10
  preferredVoiceURI?: string; // custom selected browser voice
  playEnglishAudio: boolean; // toggle to auto-play or offer English translation audio
}

export type ReviewCardMode =
  | 'fr_to_meaning'
  | 'listen_to_meaning'
  | 'meaning_to_fr'
  | 'sentence_cloze';

export interface PlacementQuestion {
  id: number;
  level: CEFRLevel;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  explanationBn: string;
}

export interface StoryRecommendation {
  story: Story;
  matchedWords: string[];
  reason: string;
}

// Audio manifest entry for pre-generated neural MP3s
export interface AudioManifestEntry {
  hash: string;
  text: string;
  language: 'fr' | 'en' | 'bn';
  voice: string;
  speed: number;
  filePath: string; // relative to baseUrl, e.g. "audio/fr/abc12345.mp3"
  durationMs?: number;
}

export interface AudioManifest {
  version: number;
  generatedAt: string;
  provider: string;
  voiceFr: string;
  voiceEn: string;
  files: Record<string, AudioManifestEntry>; // hash -> entry
}
