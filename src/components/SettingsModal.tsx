import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Settings,
  Sliders,
  Volume2,
  Globe,
  Sparkles,
  Download,
  Upload,
  Compass,
  CheckCircle2,
  AlertCircle,
  Radio,
  Key,
  Eye,
  EyeOff,
  Trash2,
  Flag
} from 'lucide-react';
import { AppSettings, UserStats, ReportedVocabItem } from '../types';
import { INITIAL_STORIES } from '../data/stories';
import {
  exportAllData,
  importAllData,
  getGeminiApiKey,
  saveGeminiApiKey,
  deleteGeminiApiKey,
  getReportedVocab,
  deleteReportedVocabItem
} from '../utils/storage';
import { audioPlayer } from '../utils/audioPlayer';
import { i18n } from '../i18n/en';

interface SettingsModalProps {
  isOpen: boolean;
  settings: AppSettings;
  userStats: UserStats;
  onClose: () => void;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onOpenPlacementQuiz: () => void;
  onDataRestored: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  userStats,
  onClose,
  onUpdateSettings,
  onOpenPlacementQuiz,
  onDataRestored
}) => {
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [frenchVoices, setFrenchVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(settings.preferredVoiceURI || '');
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isKeyVisible, setIsKeyVisible] = useState<boolean>(false);
  const [apiKeySavedNotice, setApiKeySavedNotice] = useState<string | null>(null);
  const [reportedList, setReportedList] = useState<ReportedVocabItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const voices = audioPlayer.getAvailableFrenchVoices();
      setFrenchVoices(voices);
      const current = audioPlayer.getSelectedBrowserVoice();
      if (current) {
        setSelectedVoiceURI(current.voiceURI);
      }
      const key = getGeminiApiKey();
      setHasApiKey(Boolean(key));
      setApiKeyInput(key || '');
      setReportedList(getReportedVocab());
      setApiKeySavedNotice(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      saveGeminiApiKey(apiKeyInput.trim());
      setHasApiKey(true);
      setApiKeySavedNotice('✓ API key saved securely in your browser');
      setTimeout(() => setApiKeySavedNotice(null), 3000);
    }
  };

  const handleDeleteApiKey = () => {
    deleteGeminiApiKey();
    setApiKeyInput('');
    setHasApiKey(false);
    setApiKeySavedNotice('API key removed');
    setTimeout(() => setApiKeySavedNotice(null), 3000);
  };

  const handleDeleteReported = (id: string) => {
    deleteReportedVocabItem(id);
    setReportedList(getReportedVocab());
  };

  // Handle Export Backup
  const handleExport = () => {
    try {
      const json = exportAllData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `learn-french-backup-${dateStr}.json`;
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-stone-700" />
            <h3 className="text-base font-serif font-bold text-stone-900">
              {i18n.settings.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Placement Test Shortcut */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                <Compass size={14} /> Level: {userStats.recommendedLevel || 'A1'}
              </span>
              <p className="text-[11px] text-stone-600 mt-0.5">
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
              className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              {userStats.placementResult ? i18n.settings.retakePlacement : i18n.settings.takePlacement}
            </button>
          </div>

          {/* Meaning Language Preference */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2 flex items-center gap-1.5">
              <Globe size={14} className="text-amber-800" />
              {i18n.settings.translationDisplayTitle}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ activeLanguageTab: 'both' })}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.activeLanguageTab === 'both'
                    ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                বাংলা + English
              </button>
              <button
                onClick={() => onUpdateSettings({ activeLanguageTab: 'bn' })}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.activeLanguageTab === 'bn'
                    ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                বাংলা Only
              </button>
              <button
                onClick={() => onUpdateSettings({ activeLanguageTab: 'en' })}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.activeLanguageTab === 'en'
                    ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                English Only
              </button>
            </div>
            <p className="text-[11px] text-stone-500 mt-1.5">
              {i18n.settings.translationDesc}
            </p>
          </div>

          {/* Daily Review Limit */}
          <div className="pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Sliders size={14} className="text-amber-800" />
                {i18n.settings.dailyReviewLimitTitle}
              </label>
              <span className="text-sm font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
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
              className="w-full accent-amber-800 cursor-pointer"
            />
          </div>

          {/* Daily New Words Limit */}
          <div className="pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-800" />
                {i18n.settings.dailyNewWordsLimitTitle}
              </label>
              <span className="text-sm font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
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
              className="w-full accent-amber-800 cursor-pointer"
            />
          </div>

          {/* Speech Playback Speed */}
          <div className="pt-4 border-t border-stone-100">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2 flex items-center gap-1.5">
              <Volume2 size={14} className="text-amber-800" />
              {i18n.settings.speechSpeedTitle}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0.7, 0.85, 1.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => onUpdateSettings({ playbackRate: rate })}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    settings.playbackRate === rate
                      ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {rate}x {rate === 0.7 ? i18n.settings.speedSlow : rate === 0.85 ? i18n.settings.speedNatural : i18n.settings.speedNative}
                </button>
              ))}
            </div>
          </div>

          {/* English Translation Audio Toggle */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                {i18n.settings.englishAudioTitle}
              </label>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {i18n.settings.englishAudioDesc}
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.playEnglishAudio}
              onChange={(e) => onUpdateSettings({ playEnglishAudio: e.target.checked })}
              className="w-4 h-4 accent-amber-800 cursor-pointer rounded"
            />
          </div>

          {/* Browser Voice Fallback Picker & Test Voice */}
          <div className="pt-4 border-t border-stone-100 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Radio size={14} className="text-amber-800" />
                {i18n.settings.voiceProviderTitle}
              </label>
              <button
                onClick={handleTestVoice}
                className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg border border-indigo-200 font-medium transition-colors cursor-pointer"
              >
                {i18n.settings.testVoiceBtn}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
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
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
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
                <div className="flex items-center justify-between py-2 px-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                  <span className="font-semibold text-stone-700">Audio status:</span>
                  <span className="font-medium text-stone-600">
                    {ratio.recorded} of {ratio.total} sentences have recorded audio
                    {ratio.recorded === 0 && ' (using browser voice fallback)'}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Gemini API Key (for personalized AI stories) */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
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
                Get free key ↗
              </a>
            </div>

            <p className="text-[11px] text-stone-500 leading-relaxed">
              Required for the "Create my story" personalized AI stories. Stored strictly in your browser's localStorage. Never sent to any server, never logged, and excluded from backup files.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type={isKeyVisible ? 'text' : 'password'}
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full text-xs p-2.5 pr-8 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-mono"
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
                  onClick={handleSaveApiKey}
                  disabled={!apiKeyInput.trim()}
                  className="px-3 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Save
                </button>

                {hasApiKey && (
                  <button
                    onClick={handleDeleteApiKey}
                    className="p-2.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                    title="Remove API Key"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {apiKeySavedNotice && (
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  {apiKeySavedNotice}
                </p>
              )}

              {hasApiKey && !apiKeySavedNotice && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 size={13} />
                  <span>Key configured and ready for personalized story creation</span>
                </div>
              )}
            </div>
          </div>

          {/* Reported AI Meanings (if any) */}
          {reportedList.length > 0 && (
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Flag size={14} className="text-amber-600" />
                  Reported Meanings ({reportedList.length})
                </label>
                <span className="text-[11px] text-stone-400">
                  Flagged by you in AI stories
                </span>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {reportedList.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-stone-900">
                        {item.word} <span className="text-stone-500 font-normal">({item.en})</span>
                      </div>
                      <p className="text-[11px] text-stone-500 italic">
                        « {item.sentence} »
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {item.storyTitle} • {new Date(item.dateReported).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteReported(item.id)}
                      className="p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer shrink-0"
                      title="Clear flag"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Backup: Export & Import */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              {i18n.settings.backupTitle}
            </label>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              {i18n.settings.backupDesc}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors border border-stone-200 cursor-pointer"
              >
                <Download size={14} />
                <span>{i18n.settings.exportBtn}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors border border-stone-200 cursor-pointer"
              >
                <Upload size={14} />
                <span>{i18n.settings.importBtn}</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />

            {importStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  importStatus.success
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                {importStatus.success ? (
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-rose-600 shrink-0" />
                )}
                <span>{importStatus.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-stone-100 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            {i18n.settings.saveCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
