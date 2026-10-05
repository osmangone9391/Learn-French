import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  MessageSquare,
  Key,
  Compass,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Story, SavedWord, CEFRLevel, StoryGenerationSettings } from '../types';
import {
  generatePersonalizedStory,
  QUICK_TOPIC_SUGGESTIONS,
  GenerationError
} from '../utils/geminiStoryGenerator';
import {
  getGeminiApiKey,
  saveGeminiApiKey,
  getWordsForPersonalizedStory
} from '../utils/storage';

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

  // API Key in-modal management
  const [apiKey, setApiKey] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [isKeyVisible, setIsKeyVisible] = useState<boolean>(false);

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [generationError, setGenerationError] = useState<{ message: string; details?: string } | null>(null);

  // Preview state
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<any>(null);

  // Check API key on mount and when modal opens
  useEffect(() => {
    if (isOpen) {
      const key = getGeminiApiKey();
      if (key && key.trim()) {
        setHasApiKey(true);
        setApiKey(key);
        setShowKeyInput(false);
      } else {
        setHasApiKey(false);
        setApiKey('');
        setShowKeyInput(true);
      }

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
        setElapsedSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGenerating]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      saveGeminiApiKey(apiKey.trim());
      setHasApiKey(true);
      setShowKeyInput(false);
      setGenerationError(null);
    }
  };

  const handleStartGeneration = async () => {
    const currentKey = getGeminiApiKey();
    if (!currentKey && !apiKey.trim()) {
      setShowKeyInput(true);
      setGenerationError({
        message: 'Please provide your Gemini API key to generate personalized stories.'
      });
      return;
    }

    if (!currentKey && apiKey.trim()) {
      saveGeminiApiKey(apiKey.trim());
      setHasApiKey(true);
    }

    const finalTopic = topic.trim() || 'À la boulangerie : acheter du pain et des croissants';

    setIsGenerating(true);
    setGenerationError(null);
    setProgressStep('Preparing story generation...');

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
    } catch (err: any) {
      if (err.name === 'AbortError' || err.code === 'ABORTED') {
        // user cancelled
        return;
      }
      setGenerationError({
        message: err.message || 'Generation failed. Please try again.',
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
              <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                Create My Story
              </h2>
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
                  {progressStep || 'Designing storyline and characters...'}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-full text-xs text-stone-500 font-mono">
                  <Clock size={12} />
                  <span>{elapsedSeconds}s elapsed (usually ~15–25s)</span>
                </div>
              </div>

              {/* Progress Steps checklist */}
              <div className="max-w-xs mx-auto text-left space-y-2 pt-2 text-xs text-stone-600">
                <div className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Topic & narrative structure selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${elapsedSeconds > 3 ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-stone-300'}`}>
                    {elapsedSeconds > 3 && <Check size={10} />}
                  </span>
                  <span>Integrating {useMyWords ? `${eligibleWords.length} active words` : 'vocabulary'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${elapsedSeconds > 8 ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-stone-300'}`}>
                    {elapsedSeconds > 8 && <Check size={10} />}
                  </span>
                  <span>Generating bilingual grammar annotations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${elapsedSeconds > 14 ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-stone-300'}`}>
                    {elapsedSeconds > 14 && <Check size={10} />}
                  </span>
                  <span>Strict linguistic validation & quiz generation</span>
                </div>
              </div>

              <button
                onClick={handleCancelGeneration}
                className="px-5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel Generation
              </button>
            </div>
          ) : generatedStory ? (
            /* STATE 2: PREVIEW STORY */
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-200 text-purple-900">
                      {generatedStory.level}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {generatedStory.wordCount} words • ~{generatedStory.estimatedMinutes} min
                    </span>
                    <span className="px-2 py-0.5 bg-white text-purple-700 border border-purple-200 text-[10px] font-bold rounded-md uppercase">
                      AI Generated
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    {generatedStory.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {generatedStory.subtitle}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  <button
                    onClick={handleStartGeneration}
                    className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
                    title="Regenerate with same settings"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              {/* Reused words highlight */}
              {generatedStory.reusedWords && generatedStory.reusedWords.length > 0 && (
                <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-1.5">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Flame size={13} className="text-amber-700" />
                    Reused {generatedStory.reusedWords.length} words from your learning list:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedStory.reusedWords.map((w) => (
                      <span
                        key={w}
                        className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-900 font-semibold text-xs shadow-2xs"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Paragraphs preview */}
              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-sm leading-relaxed font-serif">
                {generatedStory.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-stone-900">
                    {p}
                  </p>
                ))}
              </div>

              {/* Quiz questions preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Comprehension Quiz ({generatedStory.quiz.length} Questions)
                </span>
                <div className="space-y-2">
                  {generatedStory.quiz.map((q, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                      <p className="font-semibold text-stone-900">
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
              {/* API Key Banner / Input */}
              {!hasApiKey || showKeyInput ? (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <Key size={14} className="text-purple-600" />
                      Gemini API Key
                    </label>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-purple-700 hover:text-purple-900 font-medium underline"
                    >
                      Get free key at Google AI Studio ↗
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type={isKeyVisible ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Paste your Gemini API key (AIzaSy...)"
                        className="w-full text-xs p-2.5 pr-8 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setIsKeyVisible(!isKeyVisible)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                      >
                        {isKeyVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <button
                      onClick={handleSaveKey}
                      disabled={!apiKey.trim()}
                      className="px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Save Key
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Stored strictly in your browser's localStorage. Never sent to our servers, never logged, and never included in backup files.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-purple-50/60 border border-purple-200/80 rounded-2xl text-xs text-purple-950">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <span>Gemini API Key configured</span>
                  </div>
                  <button
                    onClick={() => setShowKeyInput(true)}
                    className="text-[11px] text-purple-700 hover:text-purple-900 font-medium underline cursor-pointer"
                  >
                    Change key
                  </button>
                </div>
              )}

              {/* Topic Input & Suggestions */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Story Topic or Daily Situation
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Commander du pain à la boulangerie, demander son chemin..."
                  className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 placeholder-stone-400"
                />

                {/* Quick Suggestion Chips */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] text-stone-400 font-medium block">
                    Quick suggestions from daily life in France:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_TOPIC_SUGGESTIONS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTopic(item.fr)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          topic === item.fr
                            ? 'bg-purple-600 text-white border-purple-600 font-semibold shadow-2xs'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level & Length Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Level */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    CEFR Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLevel('A1')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        level === 'A1'
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-400/50'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-sm font-semibold">A1 Beginner</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Present tense, short sentences</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLevel('A2')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        level === 'A2'
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-400/50'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-sm font-semibold">A2 Elementary</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Passé composé & futur proche</div>
                    </button>
                  </div>
                </div>

                {/* Length */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Target Length
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['short', 'medium', 'long'] as const).map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setLength(len)}
                        className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                          length === len
                            ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold ring-1 ring-purple-400/50'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <div className="text-xs capitalize font-semibold">{len}</div>
                        <div className="text-[10px] text-stone-500 mt-0.5">
                          {len === 'short' ? '100–180w' : len === 'medium' ? '180–300w' : '300–450w'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style & Grammar Focus Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Style */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Story Format
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStyle('dialogue')}
                      className={`p-2.5 rounded-2xl border flex items-center gap-2 transition-all cursor-pointer ${
                        style === 'dialogue'
                          ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <MessageSquare size={15} />
                      <span className="text-xs">Dialogue</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStyle('narrative')}
                      className={`p-2.5 rounded-2xl border flex items-center gap-2 transition-all cursor-pointer ${
                        style === 'narrative'
                          ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <BookOpen size={15} />
                      <span className="text-xs">Narrative</span>
                    </button>
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
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  >
                    <option value="none">None (Natural variety)</option>
                    <option value="présent de l'indicatif">Présent de l'indicatif</option>
                    <option value="futur proche (aller + infinitif)">Futur proche (aller + infinitif)</option>
                    <option value="passé composé avec avoir et être">Passé composé (avoir / être)</option>
                    <option value="verbes pronominaux du quotidien">Verbes pronominaux (se lever, s'habiller...)</option>
                    <option value="formules de politesse et impératif">Formules de politesse et impératif</option>
                  </select>
                </div>
              </div>

              {/* Use My Words Toggle */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <Layers size={14} className="text-amber-700" />
                      Reuse my active vocabulary (Box 1 & 2)
                    </span>
                    <p className="text-[11px] text-stone-500">
                      Incorporate words you are currently reviewing to strengthen retention
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useMyWords}
                      onChange={(e) => setUseMyWords(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {useMyWords && (
                  <div className="pt-2 border-t border-stone-200/80">
                    {eligibleWords.length > 0 ? (
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          Words that will be included ({eligibleWords.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
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
                  className="px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
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
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
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
