import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Volume2,
  Sliders,
  Globe,
  Radio,
  FileDown,
  FileUp,
  Compass,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Sun,
  Moon,
  BookOpen,
  Type,
  AlignLeft,
  Palette,
  ShieldAlert,
  User,
  Users
} from 'lucide-react';
import { AppSettings, UserStats, ThemeMode, FontSizeSetting, LineSpacingSetting } from '../types';
import { audioPlayer } from '../utils/audioPlayer';
import { exportAllData, importAllData } from '../utils/storage';
import { INITIAL_STORIES } from '../data/stories';
import { i18n } from '../i18n/en';

interface SettingsModalProps {
  isOpen: boolean;
  settings: AppSettings;
  userStats: UserStats;
  currentTheme: ThemeMode;
  onClose: () => void;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onOpenPlacementQuiz: () => void;
  onDataRestored: () => void;
  onOpenPrivacy?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  userStats,
  currentTheme,
  onClose,
  onUpdateSettings,
  onOpenPlacementQuiz,
  onDataRestored,
  onOpenPrivacy
}) => {
  const [frenchVoices, setFrenchVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(
    settings.preferredVoiceURI || ''
  );
  const [importStatus, setImportStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Load available French voices from Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const fr = voices.filter(
          v => v.lang.startsWith('fr') || v.lang.startsWith('FR')
        );
        setFrenchVoices(fr);

        if (!selectedVoiceURI && fr.length > 0) {
          const defaultFr = fr[0].voiceURI;
          setSelectedVoiceURI(defaultFr);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoiceURI]);

  if (!isOpen) return null;

  // Handle Export Backup
  const handleExport = () => {
    try {
      const json = exportAllData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      a.download = `lirefacile-backup-${dateStr}.json`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export error:', e);
    }
  };

  // Handle Import Backup
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importAllData(content);
        setImportStatus(result);
        if (result.success) {
          onDataRestored();
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Test selected voice
  const handleTestVoice = () => {
    audioPlayer.stop();
    if (selectedVoiceURI) {
      audioPlayer.setSelectedBrowserVoice(selectedVoiceURI);
    }
    audioPlayer.play({
      text: i18n.settings.voiceTestingSentence,
      speed: settings.playbackRate,
      lang: 'fr'
    });
  };

  const isDeviceThemeActive = !settings.theme;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] overflow-hidden flex flex-col text-stone-900 dark:text-stone-100 sepia:text-[#382716]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
            <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
              {i18n.settings.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 sepia:hover:text-[#382716] hover:bg-stone-200/60 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[82vh]">
          {/* SECTION 1: READING COMFORT & THEME */}
          <div className="space-y-4 p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-900/40 sepia:bg-[#EDE3CB]/40 border border-amber-200/80 dark:border-stone-800 sepia:border-[#DDCFB6]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] flex items-center gap-1.5">
                <Palette size={15} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
                {i18n.settings.themeTitle}
              </label>
              {isDeviceThemeActive && (
                <span className="text-[10px] font-semibold text-amber-900 bg-amber-100 dark:bg-amber-950/70 dark:text-amber-300 sepia:bg-amber-200/80 sepia:text-amber-950 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 sepia:border-amber-400">
                  {i18n.settings.themeSystem}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] -mt-1 leading-relaxed">
              {i18n.settings.themeDesc}
            </p>

            {/* 3 Theme Choices */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Light (Cream) */}
              <button
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-20 ${
                  currentTheme === 'light'
                    ? 'border-amber-500 bg-[#FAF8F5] ring-2 ring-amber-400 text-stone-900 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-[#FAF8F5] text-stone-800 opacity-90 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Sun size={16} className="text-amber-700" />
                  {currentTheme === 'light' && (
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                  )}
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-stone-900">Light</div>
                  <div className="text-[10px] text-stone-500">Cream paper</div>
                </div>
              </button>

              {/* Dark (Charcoal) */}
              <button
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-20 ${
                  currentTheme === 'dark'
                    ? 'border-amber-400 bg-[#16171A] ring-2 ring-amber-400 text-stone-100 shadow-xs'
                    : 'border-stone-700 hover:border-stone-600 bg-[#16171A] text-stone-200 opacity-90 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Moon size={16} className="text-amber-400" />
                  {currentTheme === 'dark' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-stone-100">Dark</div>
                  <div className="text-[10px] text-stone-400">Charcoal (AA)</div>
                </div>
              </button>

              {/* Sepia */}
              <button
                onClick={() => onUpdateSettings({ theme: 'sepia' })}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-20 ${
                  currentTheme === 'sepia'
                    ? 'border-[#B45309] bg-[#F4ECD8] ring-2 ring-[#B45309] text-[#382716] shadow-xs'
                    : 'border-[#DDCFB6] hover:border-[#CDBDA2] bg-[#F4ECD8] text-[#382716] opacity-90 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <BookOpen size={16} className="text-[#8C4712]" />
                  {currentTheme === 'sepia' && (
                    <span className="w-2 h-2 rounded-full bg-[#8C4712]" />
                  )}
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-[#382716]">Sepia</div>
                  <div className="text-[10px] text-[#78644E]">Warm book</div>
                </div>
              </button>
            </div>

            {/* Typography Controls: Font Size & Line Spacing */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-stone-800 sepia:border-[#DDCFB6] space-y-3">
              {/* Font Size */}
              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] flex items-center gap-1.5 mb-1.5">
                  <Type size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
                  {i18n.settings.fontSizeTitle}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['small', 'medium', 'large', 'xlarge'] as FontSizeSetting[]).map((sz) => {
                    const isSelected = settings.fontSize === sz;
                    const labels: Record<FontSizeSetting, string> = {
                      small: i18n.settings.sizeSmall,
                      medium: i18n.settings.sizeMedium,
                      large: i18n.settings.sizeLarge,
                      xlarge: i18n.settings.sizeXLarge
                    };

                    return (
                      <button
                        key={sz}
                        onClick={() => onUpdateSettings({ fontSize: sz })}
                        className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400'
                            : 'bg-white dark:bg-stone-800 sepia:bg-[#FAF4E6] border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-50 dark:hover:bg-stone-750'
                        }`}
                      >
                        {labels[sz]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Line Spacing */}
              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] flex items-center gap-1.5 mb-1.5">
                  <AlignLeft size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
                  {i18n.settings.lineSpacingTitle}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['normal', 'relaxed'] as LineSpacingSetting[]).map((sp) => {
                    const isSelected = (settings.lineSpacing || 'normal') === sp;
                    const labels: Record<LineSpacingSetting, string> = {
                      normal: i18n.settings.spacingNormal,
                      relaxed: i18n.settings.spacingRelaxed
                    };

                    return (
                      <button
                        key={sp}
                        onClick={() => onUpdateSettings({ lineSpacing: sp })}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400'
                            : 'bg-white dark:bg-stone-800 sepia:bg-[#FAF4E6] border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-50 dark:hover:bg-stone-750'
                        }`}
                      >
                        {labels[sp]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Placement Test Shortcut */}
          <div className="p-4 bg-stone-50 dark:bg-stone-900/40 sepia:bg-[#EDE3CB]/40 border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] rounded-2xl flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] flex items-center gap-1">
                <Compass size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
                Level: {userStats.recommendedLevel || 'A1'}
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 sepia:text-[#644E35] mt-0.5">
                {userStats.placementResult
                  ? i18n.settings.placementScore.replace('{score}', String(userStats.placementResult.score)).replace('{total}', String(userStats.placementResult.total)).replace('{date}', userStats.placementResult.date)
                  : i18n.settings.placementNotTaken}
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPlacementQuiz();
              }}
              className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              {userStats.placementResult ? i18n.settings.retakePlacement : i18n.settings.takePlacement}
            </button>
          </div>

          {/* Meaning Language Preference */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 sepia:text-[#4A3825] block mb-2 flex items-center gap-1.5">
              <Globe size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
              {i18n.settings.translationDisplayTitle}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ activeLanguageTab: 'both' })}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.activeLanguageTab === 'both'
                    ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400'
                    : 'bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-100 dark:hover:bg-stone-750'
                }`}
              >
                বাংলা + English
              </button>
              <button
                onClick={() => onUpdateSettings({ activeLanguageTab: 'bn' })}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.activeLanguageTab === 'bn'
                    ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400'
                    : 'bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-100 dark:hover:bg-stone-750'
                }`}
              >
                বাংলা Only
              </button>
              <button
                onClick={() => onUpdateSettings({ activeLanguageTab: 'en' })}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.activeLanguageTab === 'en'
                    ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400'
                    : 'bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-100 dark:hover:bg-stone-750'
                }`}
              >
                English Only
              </button>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] mt-1.5">
              {i18n.settings.translationDesc}
            </p>
          </div>

          {/* Daily Review Limit */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 sepia:text-[#4A3825] flex items-center gap-1.5">
                <Sliders size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
                {i18n.settings.dailyReviewLimitTitle}
              </label>
              <span className="text-sm font-bold text-amber-900 bg-amber-50 dark:bg-amber-950/70 dark:text-amber-200 border border-amber-200 dark:border-amber-800 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400 px-2 py-0.5 rounded-lg">
                {settings.dailyReviewLimit} cards
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={settings.dailyReviewLimit}
              onChange={(e) => onUpdateSettings({ dailyReviewLimit: Number(e.target.value) })}
              className="w-full accent-amber-800 dark:accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Daily New Words Limit */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 sepia:text-[#4A3825] flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
                {i18n.settings.dailyNewWordsLimitTitle}
              </label>
              <span className="text-sm font-bold text-amber-900 bg-amber-50 dark:bg-amber-950/70 dark:text-amber-200 border border-amber-200 dark:border-amber-800 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400 px-2 py-0.5 rounded-lg">
                {settings.dailyNewWordsLimit} words
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={30}
              step={1}
              value={settings.dailyNewWordsLimit}
              onChange={(e) => onUpdateSettings({ dailyNewWordsLimit: Number(e.target.value) })}
              className="w-full accent-amber-800 dark:accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Speech Playback Speed */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7]">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 sepia:text-[#4A3825] block mb-2 flex items-center gap-1.5">
              <Volume2 size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
              {i18n.settings.speechSpeedTitle}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0.7, 0.85, 1.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => onUpdateSettings({ playbackRate: rate })}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    settings.playbackRate === rate
                      ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400'
                      : 'bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-100 dark:hover:bg-stone-750'
                  }`}
                >
                  {rate}x {rate === 0.7 ? i18n.settings.speedSlow : rate === 0.85 ? i18n.settings.speedNatural : i18n.settings.speedNative}
                </button>
              ))}
            </div>
          </div>

          {/* English Translation Audio Toggle */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] flex items-center justify-between">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] block">
                {i18n.settings.englishAudioTitle}
              </label>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] mt-0.5">
                {i18n.settings.englishAudioDesc}
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.playEnglishAudio}
              onChange={(e) => onUpdateSettings({ playEnglishAudio: e.target.checked })}
              className="w-4 h-4 accent-amber-800 dark:accent-amber-500 cursor-pointer rounded"
            />
          </div>

          {/* Browser Voice Fallback Picker & Test Voice */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 sepia:text-[#4A3825] flex items-center gap-1.5">
                <Radio size={14} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
                {i18n.settings.voiceProviderTitle}
              </label>
              <button
                onClick={handleTestVoice}
                className="px-2.5 py-1 text-xs bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 sepia:bg-indigo-200/80 sepia:text-indigo-950 rounded-lg border border-indigo-200 dark:border-indigo-800 sepia:border-indigo-400 font-medium transition-colors cursor-pointer"
              >
                {i18n.settings.testVoiceBtn}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] leading-relaxed">
              {i18n.settings.voiceProviderDesc}
            </p>

            {frenchVoices.length > 0 && (
              <select
                value={selectedVoiceURI}
                onChange={(e) => {
                  setSelectedVoiceURI(e.target.value);
                  onUpdateSettings({ preferredVoiceURI: e.target.value });
                  audioPlayer.setSelectedBrowserVoice(e.target.value);
                }}
                className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] rounded-xl text-stone-800 dark:text-stone-200 sepia:text-[#382716] focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {frenchVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            )}

            {/* Audio status line */}
            {(() => {
              const ratio = audioPlayer.getRecordedSentencesRatio(INITIAL_STORIES);
              return (
                <div className="flex items-center justify-between py-2 px-3 bg-stone-50 dark:bg-stone-800/60 sepia:bg-[#EDE3CB]/60 rounded-xl border border-stone-200/80 dark:border-stone-700/80 sepia:border-[#DDCFB6] text-xs">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 sepia:text-[#4A3825]">Audio status:</span>
                  <span className="font-medium text-stone-600 dark:text-stone-400 sepia:text-[#644E35]">
                    {ratio.recorded} of {ratio.total} sentences have recorded audio
                    {ratio.recorded === 0 && ' (using browser voice fallback)'}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Backup: Export & Import */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 sepia:text-[#4A3825] block">
                {i18n.settings.backupTitle}
              </label>
              {onOpenPrivacy && (
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-[11px] font-semibold text-amber-800 dark:text-amber-400 sepia:text-[#8C4712] hover:underline cursor-pointer"
                >
                  Privacy Policy & Data Security
                </button>
              )}
            </div>
            
            <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] leading-relaxed">
              {i18n.settings.backupDesc}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Export backup */}
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] hover:bg-stone-200 dark:hover:bg-stone-700 sepia:hover:bg-[#E5D7BD] text-stone-800 dark:text-stone-200 sepia:text-[#382716] rounded-xl text-xs font-semibold transition-colors border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] cursor-pointer"
                title="Export a complete JSON backup of your learning progress"
              >
                <FileDown size={14} />
                <span>{i18n.settings.exportBtn}</span>
              </button>

              {/* Import backup */}
              <label
                className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] hover:bg-stone-200 dark:hover:bg-stone-700 sepia:hover:bg-[#E5D7BD] text-stone-800 dark:text-stone-200 sepia:text-[#382716] rounded-xl text-xs font-semibold transition-colors border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] cursor-pointer"
                title="Import a previously saved JSON backup"
              >
                <FileUp size={14} />
                <span>{i18n.settings.importBtn}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                  importStatus.success
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 sepia:bg-emerald-100/70 border-emerald-300 dark:border-emerald-800 sepia:border-emerald-400 text-emerald-900 dark:text-emerald-200 sepia:text-emerald-950'
                    : 'bg-rose-50 dark:bg-rose-950/60 sepia:bg-rose-100/70 border-rose-300 dark:border-rose-800 sepia:border-rose-400 text-rose-900 dark:text-rose-200 sepia:text-rose-950'
                }`}
              >
                {importStatus.success ? (
                  <CheckCircle size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertCircle size={15} className="shrink-0 text-rose-600 dark:text-rose-400" />
                )}
                <span>{importStatus.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {i18n.settings.saveCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
