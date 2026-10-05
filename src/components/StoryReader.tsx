import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Square,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Languages,
  Type,
  Gauge,
  VolumeX
} from 'lucide-react';
import { Story, SavedWord, AppSettings, VocabEntry, StoryQuizRecord } from '../types';
import { parseParagraph, ParagraphStructure, WordToken, lookupWord } from '../utils/textParser';
import { audioPlayer } from '../utils/audioPlayer';
import { WordPopup } from './WordPopup';
import { QuizModal } from './QuizModal';
import { i18n } from '../i18n/en';

interface StoryReaderProps {
  story: Story;
  isRead: boolean;
  savedWords: SavedWord[];
  settings: AppSettings;
  quizRecord?: StoryQuizRecord;
  onBack: () => void;
  onToggleRead: (storyId: string, wordCount: number) => void;
  onSaveWord: (item: {
    word: string;
    lemma: string;
    en: string;
    bn: string;
    pos: SavedWord['pos'];
    sentence: string;
    storyId: string;
    storyTitle: string;
    gender?: SavedWord['gender'];
    number?: SavedWord['number'];
    person?: string;
    tense?: string;
    lemmaWithArticle?: string;
  }) => void;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onQuizCompleted: (scorePercentage: number) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  story,
  isRead,
  savedWords,
  settings,
  quizRecord,
  onBack,
  onToggleRead,
  onSaveWord,
  onUpdateSettings,
  onQuizCompleted
}) => {
  // Parsing paragraphs and sentences
  const parsedParagraphs: ParagraphStructure[] = useMemo(() => {
    return story.paragraphs.map((p, idx) => parseParagraph(p, story.vocabulary, idx));
  }, [story]);

  // Selected word for popup
  const [selectedWordToken, setSelectedWordToken] = useState<WordToken | null>(null);

  // Audio playback state
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<{
    paragraphIndex: number;
    sentenceIndex: number;
  } | null>(null);

  // Quiz modal
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Active playback rate: 0.8 (slow) or 1.0 (normal)
  const playbackRate = settings.playbackRate === 0.7 || settings.playbackRate === 0.85 ? 0.8 : 1.0;

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioPlayer.stop();
    };
  }, []);

  // Quick lookup for already saved words
  const savedWordKeys = useMemo(() => {
    const set = new Set<string>();
    savedWords.forEach((sw) => {
      set.add(sw.word.toLowerCase().trim());
      if (sw.lemma) set.add(sw.lemma.toLowerCase().trim());
    });
    return set;
  }, [savedWords]);

  // Handle tapping a word
  const handleWordClick = (token: WordToken) => {
    if (!token.isWord) return;
    setSelectedWordToken(token);
  };

  // Handle tapping individual sentence audio
  const handlePlaySentence = (
    sentenceText: string,
    paragraphIndex: number,
    sentenceIndex: number
  ) => {
    if (isPlayingStory) {
      audioPlayer.stop();
      setIsPlayingStory(false);
    }

    setCurrentPlayingIndex({ paragraphIndex, sentenceIndex });
    audioPlayer.play({
      text: sentenceText,
      speed: playbackRate,
      lang: 'fr',
      onEnd: () => setCurrentPlayingIndex(null),
      onError: () => setCurrentPlayingIndex(null)
    });
  };

  // Play English translation sentence audio
  const handlePlayEnglishTranslation = (enText: string) => {
    audioPlayer.stop();
    audioPlayer.play({
      text: enText,
      speed: 1.0,
      lang: 'en'
    });
  };

  // Stop full story audio
  const stopFullStoryAudio = () => {
    audioPlayer.stop();
    setIsPlayingStory(false);
    setCurrentPlayingIndex(null);
  };

  // Play full story sequentially with preloading
  const playFullStory = () => {
    if (isPlayingStory) {
      stopFullStoryAudio();
      return;
    }

    const allSentences: { text: string; pIdx: number; sIdx: number }[] = [];
    parsedParagraphs.forEach((para, pIdx) => {
      para.sentences.forEach((sent, sIdx) => {
        allSentences.push({ text: sent.text, pIdx, sIdx });
      });
    });

    if (allSentences.length === 0) return;

    setIsPlayingStory(true);
    let step = 0;

    const playNext = () => {
      if (step >= allSentences.length) {
        setIsPlayingStory(false);
        setCurrentPlayingIndex(null);
        return;
      }

      const current = allSentences[step];
      setCurrentPlayingIndex({ paragraphIndex: current.pIdx, sentenceIndex: current.sIdx });

      // Preload next sentence in background
      if (step + 1 < allSentences.length) {
        audioPlayer.preloadNext(allSentences[step + 1].text, playbackRate, 'fr');
      }

      audioPlayer.play({
        text: current.text,
        speed: playbackRate,
        lang: 'fr',
        onEnd: () => {
          step++;
          setTimeout(playNext, 250);
        },
        onError: () => {
          step++;
          setTimeout(playNext, 250);
        }
      });
    };

    playNext();
  };

  // Font size classes
  const getFontSizeClasses = () => {
    switch (settings.fontSize) {
      case 'small':
        return 'text-base sm:text-lg leading-relaxed';
      case 'large':
        return 'text-xl sm:text-2xl leading-loose';
      case 'xlarge':
        return 'text-2xl sm:text-3xl leading-loose';
      case 'medium':
      default:
        return 'text-lg sm:text-xl leading-loose';
    }
  };

  const cycleFontSize = () => {
    const sizes: AppSettings['fontSize'][] = ['small', 'medium', 'large', 'xlarge'];
    const nextIdx = (sizes.indexOf(settings.fontSize) + 1) % sizes.length;
    onUpdateSettings({ fontSize: sizes[nextIdx] });
  };

  const toggleSpeed = () => {
    // Toggle between 0.8x (slow) and 1.0x (normal)
    const newRate = playbackRate === 1.0 ? 0.8 : 1.0;
    onUpdateSettings({ playbackRate: newRate });
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24 text-stone-900 selection:bg-amber-200">
      {/* Top sticky navigation & audio controls */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          {/* Back button */}
          <button
            onClick={() => {
              audioPlayer.stop();
              onBack();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">{i18n.reader.backBtn}</span>
          </button>

          {/* Quick Reader Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Speed toggle */}
            <button
              onClick={toggleSpeed}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Toggle audio speed (Normal 1.0x / Slow 0.8x)"
            >
              <Gauge size={13} />
              <span>{playbackRate === 0.8 ? '0.8x (Slow)' : '1.0x'}</span>
            </button>

            {/* Font size toggle */}
            <button
              onClick={cycleFontSize}
              className="p-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center gap-0.5 cursor-pointer"
              title={i18n.reader.fontSize}
            >
              <Type size={14} />
              <span className="text-[10px] uppercase font-bold">{settings.fontSize[0]}</span>
            </button>

            {/* Parallel translation toggle */}
            <button
              onClick={() =>
                onUpdateSettings({
                  showParallelTranslation: !settings.showParallelTranslation
                })
              }
              className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                settings.showParallelTranslation
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                  : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
              }`}
              title="Show parallel translation"
            >
              <Languages size={15} />
              <span className="hidden sm:inline">{i18n.reader.parallelTranslation}</span>
            </button>

            {/* Play story audio */}
            <button
              onClick={playFullStory}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                isPlayingStory
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {isPlayingStory ? (
                <>
                  <Square size={13} fill="currentColor" />
                  <span>{i18n.reader.stopAudio}</span>
                </>
              ) : (
                <>
                  <Play size={13} fill="currentColor" />
                  <span>{i18n.reader.listenStory}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Story Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Story Metadata Card */}
        <div className="mb-8 pb-6 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Level {story.level}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {story.topic}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500">
              {story.wordCount} words
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-950 tracking-tight leading-snug">
            {story.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {story.subtitle}
          </p>

          {/* Interactive instruction pill */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs bg-amber-50/80 text-amber-900 border border-amber-200/70 px-3 py-1.5 rounded-xl">
            <span className="font-bold">Tip:</span>
            <span>{i18n.reader.hintTapWord}</span>
          </div>
        </div>

        {/* Paragraphs and Sentences */}
        <article className="space-y-8 font-serif">
          {parsedParagraphs.map((para, pIdx) => {
            const hasParallelTranslation = settings.showParallelTranslation;
            const paragraphTranslation = story.paragraphTranslations[pIdx];

            return (
              <div
                key={para.id}
                className="group relative bg-white/70 p-4 sm:p-6 rounded-2xl border border-stone-200/80 hover:border-amber-200 transition-colors shadow-2xs"
              >
                {/* Paragraph Content */}
                <div className={`${getFontSizeClasses()} text-stone-900 tracking-normal`}>
                  {para.sentences.map((sent, sIdx) => {
                    const isSentencePlaying =
                      currentPlayingIndex?.paragraphIndex === pIdx &&
                      currentPlayingIndex?.sentenceIndex === sIdx;

                    return (
                      <span
                        key={sent.id}
                        className={`inline transition-colors rounded-sm px-0.5 ${
                          isSentencePlaying ? 'bg-amber-200/70 ring-2 ring-amber-300' : ''
                        }`}
                      >
                        {/* Sentence audio play button */}
                        <button
                          onClick={() => handlePlaySentence(sent.text, pIdx, sIdx)}
                          className="inline-flex items-center justify-center align-middle mx-1 p-1 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer"
                          title="Listen to this sentence"
                        >
                          <Volume2 size={15} />
                        </button>

                        {/* Words */}
                        {sent.tokens.map((token) => {
                          if (!token.isWord) {
                            return (
                              <span key={token.id} className="text-stone-700 select-none">
                                {token.rawText}
                              </span>
                            );
                          }

                          const isSaved =
                            savedWordKeys.has(token.cleanWord) ||
                            (token.vocab && savedWordKeys.has(token.vocab.lemma.toLowerCase()));

                          return (
                            <button
                              key={token.id}
                              onClick={() => handleWordClick(token)}
                              className={`cursor-pointer inline-block rounded-sm px-0.5 hover:bg-amber-100 hover:text-stone-950 transition-all active:scale-95 text-stone-900 ${
                                isSaved
                                  ? 'underline decoration-amber-500 decoration-2 underline-offset-4 font-medium'
                                  : 'hover:underline underline-offset-2'
                              }`}
                            >
                              {token.rawText}
                            </button>
                          );
                        })}

                        {/* Space between sentences */}
                        {' '}
                      </span>
                    );
                  })}
                </div>

                {/* Parallel Translation Display */}
                {hasParallelTranslation && paragraphTranslation && (
                  <div className="mt-4 pt-3 border-t border-stone-200/60 font-sans text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/80 p-3 rounded-xl flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-semibold text-stone-800 uppercase tracking-wider text-[10px] block">
                        English Translation
                      </span>
                      <p>{paragraphTranslation}</p>
                    </div>

                    {settings.playEnglishAudio && (
                      <button
                        onClick={() => handlePlayEnglishTranslation(paragraphTranslation)}
                        className="p-1.5 rounded-lg text-sky-700 hover:bg-sky-50 transition-colors shrink-0 cursor-pointer"
                        title="Listen to English translation"
                      >
                        <Volume2 size={15} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </article>

        {/* Reader Completion Bar */}
        <div className="mt-12 p-6 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">
              {i18n.reader.storyFinished}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {i18n.reader.storyFinishedDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Mark as read toggle */}
            <button
              onClick={() => onToggleRead(story.id, story.wordCount)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                isRead
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
              }`}
            >
              <CheckCircle2 size={16} className={isRead ? 'text-emerald-600' : 'text-stone-400'} />
              <span>{isRead ? i18n.reader.markedAsRead : i18n.reader.markAsRead}</span>
            </button>

            {/* Open Quiz Button */}
            {story.quiz && story.quiz.length > 0 && (
              <button
                onClick={() => setIsQuizOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-amber-800 hover:bg-amber-900 text-white shadow-xs transition-colors cursor-pointer"
              >
                <HelpCircle size={16} />
                <span>{i18n.reader.takeQuizBtn} ({story.quiz.length})</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Word Popup Modal */}
      {selectedWordToken && (
        <WordPopup
          word={selectedWordToken.rawText.trim()}
          lemma={selectedWordToken.vocab?.lemma || selectedWordToken.cleanWord}
          vocab={selectedWordToken.vocab}
          sentenceContext={selectedWordToken.sentenceContext}
          isSaved={
            savedWordKeys.has(selectedWordToken.cleanWord) ||
            Boolean(selectedWordToken.vocab &&
              savedWordKeys.has(selectedWordToken.vocab.lemma.toLowerCase()))
          }
          playbackRate={playbackRate}
          onSave={() => {
            const entry = selectedWordToken.vocab || {
              lemma: selectedWordToken.cleanWord,
              en: 'Saved vocabulary item',
              bn: 'সংরক্ষিত শব্দ',
              pos: 'noun' as const
            };

            onSaveWord({
              word: selectedWordToken.rawText.trim(),
              lemma: entry.lemma,
              en: entry.en,
              bn: entry.bn,
              pos: entry.pos,
              sentence: selectedWordToken.sentenceContext,
              storyId: story.id,
              storyTitle: story.title,
              gender: entry.gender,
              number: entry.number,
              person: entry.person,
              tense: entry.tense,
              lemmaWithArticle: entry.lemmaWithArticle
            });
          }}
          onClose={() => setSelectedWordToken(null)}
        />
      )}

      {/* Quiz Modal */}
      {isQuizOpen && (
        <QuizModal
          story={story}
          previousRecord={quizRecord}
          onClose={() => setIsQuizOpen(false)}
          onQuizComplete={(score) => {
            onQuizCompleted(score);
          }}
        />
      )}
    </div>
  );
};
