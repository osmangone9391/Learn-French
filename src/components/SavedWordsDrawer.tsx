import React, { useState } from 'react';
import { X, Volume2, Trash2, BookmarkCheck, BookOpen, Search } from 'lucide-react';
import { SavedWord } from '../types';
import { speechService } from '../utils/speech';

interface SavedWordsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: SavedWord[];
  onRemoveWord: (id: string) => void;
  playbackRate?: number;
}

export const SavedWordsDrawer: React.FC<SavedWordsDrawerProps> = ({
  isOpen,
  onClose,
  savedWords,
  onRemoveWord,
  playbackRate = 0.85
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filtered = savedWords.filter((w) => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      w.word.toLowerCase().includes(q) ||
      w.lemma.toLowerCase().includes(q) ||
      w.en.toLowerCase().includes(q) ||
      w.bn.toLowerCase().includes(q) ||
      w.storyTitle.toLowerCase().includes(q)
    );
  });

  const handlePlay = (text: string) => {
    speechService.speak(text, playbackRate);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col text-stone-800 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
              <BookmarkCheck size={18} />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-stone-900">
                My Saved Vocabulary
              </h2>
              <p className="text-xs text-stone-500">
                {savedWords.length} word{savedWords.length > 1 ? 's' : ''} to review
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search inside words */}
        <div className="p-3 border-b border-stone-100 bg-white">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search words, meanings, or stories..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500 text-stone-800"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedWords.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <BookOpen size={24} />
              </div>
              <h3 className="text-sm font-semibold text-stone-800">
                No words saved yet
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
                While reading stories, tap any word and click "Save word". They will appear here for review!
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-xs text-stone-400 py-8">
              No matching words found.
            </p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-stone-50/80 rounded-2xl border border-stone-200/80 hover:border-amber-300 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-serif font-bold text-stone-900">
                        {item.word}
                      </span>
                      {item.lemma && item.lemma.toLowerCase() !== item.word.toLowerCase() && (
                        <span className="text-xs text-stone-500">
                          ({item.lemma})
                        </span>
                      )}
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-200 text-stone-600 font-medium">
                        {item.pos}
                      </span>
                    </div>

                    {/* Translations */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs">
                      <span className="font-semibold text-amber-900 bg-amber-100/70 px-1.5 py-0.5 rounded">
                        {item.bn}
                      </span>
                      <span className="text-stone-600">
                        • {item.en}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handlePlay(item.word)}
                      className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="Listen to word"
                    >
                      <Volume2 size={16} />
                    </button>
                    <button
                      onClick={() => onRemoveWord(item.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Sentence context */}
                {item.sentence && (
                  <div className="pt-2 border-t border-stone-200/60 flex items-start gap-1.5 text-xs text-stone-600">
                    <span className="italic font-serif flex-1 line-clamp-2">
                      « {item.sentence} »
                    </span>
                    <button
                      onClick={() => handlePlay(item.sentence)}
                      className="text-stone-400 hover:text-stone-700 shrink-0 p-0.5"
                      title="Listen to sentence"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                )}

                {/* Source Story badge */}
                <div className="text-[10px] text-stone-400 font-medium">
                  Source: {item.storyTitle}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
