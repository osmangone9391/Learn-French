import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  MessageSquare,
  Compass,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Check,
  ChevronRight,
  Flame,
  HelpCircle,
  ShieldAlert,
  Info
} from 'lucide-react';
import { Story, SavedWord, CEFRLevel, StoryGenerationSettings } from '../types';
import {
  generatePersonalizedStory,
  getStoryQuotaStatus,
  StoryQuotaInfo,
  QUICK_TOPIC_SUGGESTIONS,
  GenerationError
} from '../utils/geminiStoryGenerator';
import { getWordsForPersonalizedStory } from '../utils/storage';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: SavedWord[];
  recommendedLevel: CEFRLevel;
  onStoryCreated: (story: Story) => void;
  onOpenSettings: () => void;
  initialSettings?: StoryGenerationSettings;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  isOpen,
  onClose,
  savedWords,
  recommendedLevel,
  onStoryCreated,
  onOpenSettings,
  initialSettings
}) => {
  // Form State
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<CEFRLevel>(recommendedLevel || 'A1');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('short');
  const [style, setStyle] = useState<'dialogue' | 'narrative'>('dialogue');
  const [grammarFocus, setGrammarFocus] = useState<string>('none');
  const [useMyWords, setUseMyWords] = useState<boolean>(true);

  // Daily Quota State
  const [quota, setQuota] = useState<StoryQuotaInfo | null>(null);
  const [isLoadingQuota, setIsLoadingQuota] = useState<boolean>(false);

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [generationError, setGenerationError] = useState<{ message: string; details?: string } | null>(null);

  // Preview state
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<any>(null);

  // Load quota and initialize inputs when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoadingQuota(true);
      getStoryQuotaStatus()
        .then((q) => {
          setQuota(q);
        })
        .finally(() => {
          setIsLoadingQuota(false);
        });

      if (initialSettings) {
        setTopic(initialSettings.topic || '');
        setLevel(initialSettings.level || recommendedLevel || 'A1');
        setLength(initialSettings.length || 'short');
        setStyle(initialSettings.style || 'dialogue');
        setGrammarFocus(initialSettings.grammarFocus || 'none');
        setUseMyWords(initialSettings.useMyWords ?? true);
      } else {
        setLevel(recommendedLevel || 'A1');
      }

      setGenerationError(null);
      setGeneratedStory(null);
    }
  }, [isOpen, recommendedLevel, initialSettings]);

  // Compute eligible Box 1-2 words
  const eligibleWords = useMemo(() => {
    return getWordsForPersonalizedStory(savedWords, 8);
  }, [savedWords]);

  // Timer while generating
  useEffect(() => {
    if (isGenerating) {
      setElapsedSeconds(0);
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGenerating]);

  if (!isOpen) return null;

  const isCreationBlocked =
    Boolean(quota && (!quota.enabled || quota.globalPaused || quota.userRemaining <= 0));

  const handleStartGeneration = async () => {
    if (isCreationBlocked) return;

    const finalTopic = topic.trim() || 'À la boulangerie : acheter du pain et des croissants';

    setIsGenerating(true);
    setGenerationError(null);
    setProgressStep('Preparing story narrative outline...');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const story = await generatePersonalizedStory({
        topic: finalTopic,
        level,
        length,
        style,
        grammarFocus: grammarFocus !== 'none' ? grammarFocus : undefined,
        useMyWords,
        userWords: useMyWords ? eligibleWords : [],
        onProgress: (step) => setProgressStep(step),
        signal: controller.signal
      });

      setGeneratedStory(story);

      // Refresh remaining quota
      getStoryQuotaStatus().then(setQuota);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.code === 'ABORTED') {
        // user cancelled
        return;
      }
      setGenerationError({
        message: err.message || 'Story generation failed. Please try again.',
        details: err.details
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
    setProgressStep('');
  };

  const handleSaveToLibrary = () => {
    if (generatedStory) {
      onStoryCreated(generatedStory);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col text-stone-900 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Sparkles size={17} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                  Create My Story
                </h2>
                {quota && quota.enabled && !quota.globalPaused && quota.userRemaining > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                    Stories left today: {quota.userRemaining}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Personalized French stories made for your level and active vocabulary
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* STATE 1: GENERATING PROGRESS */}
          {isGenerating ? (
            <div className="py-12 px-4 text-center space-y-6 animate-in fade-in">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={24} className="text-purple-600 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Crafting Your Original Story...
                </h3>
                <p className="text-xs sm:text-sm text-purple-700 font-medium min-h-[20px] transition-all">
                  {progressStep || 'Writing story narrative and vocabulary...'}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-full text-xs text-stone-500 font-mono">
                  <Clock size={12} />
                  <span>{elapsedSeconds}s elapsed</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCancelGeneration}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel Generation
                </button>
              </div>
            </div>
          ) : generatedStory ? (
            /* STATE 2: PREVIEW STORY */
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 size={18} className="text-purple-600 shrink-0 mt-0.5" />
                <div className="text-xs text-purple-950 space-y-0.5">
                  <p className="font-semibold">Story successfully crafted and verified!</p>
                  <p className="text-purple-800/80">
                    Review your story below before adding it to your reading library.
                  </p>
                </div>
              </div>

              {/* Preview Box */}
              <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white">
                      {generatedStory.level}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                      <Sparkles size={10} /> AI-Generated
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    {generatedStory.title}
                  </h3>
                  {generatedStory.subtitle && (
                    <p className="text-xs text-stone-500 italic mt-0.5">
                      {generatedStory.subtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-stone-800 font-serif leading-relaxed border-t border-stone-200/60 pt-3">
                  {generatedStory.paragraphs.map((p, idx) => (
                    <p key={idx} className="indent-4">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Vocabulary Coverage */}
                <div className="border-t border-stone-200/60 pt-3 flex flex-wrap items-center gap-3 text-xs text-stone-500">
                  <span>📖 {generatedStory.wordCount} words</span>
                  <span>⏱ ~{generatedStory.estimatedMinutes} min read</span>
                  <span>
                    🏷 {Object.keys(generatedStory.vocabulary).length} words annotated
                  </span>
                  {generatedStory.reusedWords && generatedStory.reusedWords.length > 0 && (
                    <span className="text-emerald-700 font-medium">
                      🎯 Reused {generatedStory.reusedWords.length} of your saved words
                    </span>
                  )}
                </div>

                {/* Quiz Preview */}
                <div className="border-t border-stone-200/60 pt-3 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Comprehension Quiz (3 Questions Included)
                  </h4>
                  {generatedStory.quiz.map((q, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-stone-200 text-xs">
                      <p className="font-semibold text-stone-800">
                        {idx + 1}. {q.question}
                      </p>
                      <p className="text-stone-500 italic text-[11px]">
                        Correct answer: {q.options[q.answer]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* STATE 3: CONFIGURATION FORM */
            <div className="space-y-6">
              {/* Daily Limit & Status Banners */}
              {quota && !quota.enabled && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-2.5">
                  <ShieldAlert size={16} className="text-amber-600 shrink-0" />
                  <span>Story creation is temporarily unavailable.</span>
                </div>
              )}

              {quota && quota.enabled && quota.globalPaused && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-2.5">
                  <Clock size={16} className="text-amber-600 shrink-0" />
                  <span>Story creation is paused for today, please come back tomorrow.</span>
                </div>
              )}

              {quota && quota.enabled && !quota.globalPaused && quota.userRemaining <= 0 && (
                <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-900 flex items-center gap-2.5">
                  <Info size={16} className="text-purple-600 shrink-0" />
                  <span>
                    You have reached your limit of {quota.userLimit} stories for today. Please come back tomorrow!
                  </span>
                </div>
              )}

              {/* Privacy Notice */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-2.5 text-[11px] text-stone-600">
                <Info size={14} className="text-stone-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Your topic and a few of your saved words are sent to an AI service to write the story. Don't include personal information.
                </p>
              </div>

              {/* Topic Input & Suggestions */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Story Topic or Daily Situation
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value.slice(0, 150))}
                  maxLength={150}
                  disabled={isCreationBlocked}
                  placeholder="e.g., Demander son chemin dans le métro de Paris..."
                  className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-50"
                />
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span>Quick inspiration:</span>
                  <span>{topic.length} / 150 characters</span>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1">
                  {QUICK_TOPIC_SUGGESTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isCreationBlocked}
                      onClick={() => setTopic(item.fr)}
                      className="px-2.5 py-1 text-xs rounded-lg border border-stone-200 bg-white hover:border-purple-300 hover:bg-purple-50 text-stone-700 transition-colors cursor-pointer shrink-0 disabled:opacity-40"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level & Length Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Level */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    CEFR Level
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['A1', 'A2', 'B1'] as CEFRLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        disabled={isCreationBlocked}
                        onClick={() => setLevel(lvl)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-40 ${
                          level === lvl
                            ? 'bg-stone-900 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {level === 'A1' && 'A1: Present tense, short simple phrases, basic everyday words'}
                    {level === 'A2' && 'A2: Routine conversations, passé composé, common verbs'}
                    {level === 'B1' && 'B1: Connected stories, past tenses contrast, opinions'}
                  </p>
                </div>

                {/* Length */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Story Length
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'short', label: 'Short', desc: '~100 words' },
                      { id: 'medium', label: 'Medium', desc: '~170 words' },
                      { id: 'long', label: 'Long', desc: '~250 words' }
                    ].map((len) => (
                      <button
                        key={len.id}
                        type="button"
                        disabled={isCreationBlocked}
                        onClick={() => setLength(len.id as any)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center disabled:opacity-40 ${
                          length === len.id
                            ? 'bg-purple-700 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <div>{len.label}</div>
                        <div className="text-[10px] opacity-75 font-normal">{len.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style & Grammar Focus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Style */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Style & Format
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'dialogue', label: 'Dialogue', icon: MessageSquare },
                      { id: 'narrative', label: 'Narrative', icon: BookOpen }
                    ].map((st) => {
                      const Icon = st.icon;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          disabled={isCreationBlocked}
                          onClick={() => setStyle(st.id as any)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40 ${
                            style === st.id
                              ? 'bg-stone-900 text-white shadow-xs'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          <Icon size={13} />
                          <span>{st.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grammar Focus */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Grammar Focus (Optional)
                  </label>
                  <select
                    value={grammarFocus}
                    onChange={(e) => setGrammarFocus(e.target.value)}
                    disabled={isCreationBlocked}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-40"
                  >
                    <option value="none">Natural mix (Recommended)</option>
                    <option value="present">Présent de l'indicatif (Present)</option>
                    <option value="passe_compose">Passé Composé (Completed past)</option>
                    <option value="imparfait">Imparfait (Habitual/descriptions)</option>
                    <option value="futur_proche">Futur Proche (Aller + infinitive)</option>
                    <option value="futur_simple">Futur Simple (Future)</option>
                    <option value="subjonctif">Subjonctif Présent</option>
                    <option value="reflexive">Verbes Pronominaux (Reflexive)</option>
                  </select>
                </div>
              </div>

              {/* Reused Vocabulary Toggle */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame size={15} className="text-amber-600" />
                    <span className="text-xs font-bold text-stone-800">
                      Practice My Saved Words
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={useMyWords}
                    onChange={(e) => setUseMyWords(e.target.checked)}
                    disabled={isCreationBlocked}
                    className="w-4 h-4 text-purple-600 rounded-md border-stone-300 focus:ring-purple-500 cursor-pointer disabled:opacity-40"
                  />
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Weaves up to 8 of your learning vocabulary words (Box 1 & 2) into the story for natural spaced practice.
                </p>

                {useMyWords && (
                  <div className="pt-2">
                    {eligibleWords.length > 0 ? (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-stone-400">
                          Selected for this story ({eligibleWords.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {eligibleWords.map((w) => (
                            <span
                              key={w.id}
                              className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-800 text-xs font-medium"
                            >
                              {w.word} <span className="text-[10px] text-stone-400">({w.en})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-stone-400 italic">
                        No words currently in Box 1 or 2. The story will use level-appropriate vocabulary.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {generationError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-1">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle size={15} className="text-rose-600 shrink-0" />
                    <span>{generationError.message}</span>
                  </div>
                  {generationError.details && (
                    <pre className="text-[10px] text-rose-700 bg-rose-100/50 p-2 rounded-lg whitespace-pre-wrap font-mono mt-1 max-h-24 overflow-y-auto">
                      {generationError.details}
                    </pre>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-stone-100 bg-stone-50/80 flex items-center justify-between gap-3">
          {generatedStory ? (
            <>
              <button
                onClick={() => setGeneratedStory(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Settings
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartGeneration}
                  disabled={isCreationBlocked}
                  className="px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 disabled:opacity-40 text-purple-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Regenerate</span>
                </button>
                <button
                  onClick={handleSaveToLibrary}
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={14} />
                  <span>Save to My Library</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleStartGeneration}
                disabled={isGenerating || isCreationBlocked}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Sparkles size={14} />
                <span>Generate Story</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
