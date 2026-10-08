import React from 'react';
import { GrammarDisplayInfo } from '../utils/grammarHelper';

interface GrammarChipsProps {
  grammar: GrammarDisplayInfo | null;
  compact?: boolean;
}

export const GrammarChips: React.FC<GrammarChipsProps> = ({ grammar, compact = false }) => {
  if (!grammar) return null;

  // 1. Plural articles "les" and "des" must show only "article · plural" (no gender chip)
  const isPluralArticle =
    grammar.pos === 'article' &&
    (grammar.number === 'plural' || grammar.lemmaDisplay === 'les' || grammar.lemmaDisplay === 'des');

  // 2. Numbers (deux, trois, etc.) must show "number" as POS, with no gender and no singular/plural chip
  const isNumber = grammar.pos === 'number';

  const showGender = !isPluralArticle && !isNumber && Boolean(grammar.gender);
  const showNumber = !isNumber && Boolean(grammar.number);

  const isMasculine = grammar.gender === 'masculine';
  const isFeminine = grammar.gender === 'feminine';

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${
        compact ? 'text-[10px]' : 'text-xs'
      }`}
    >
      {/* 1. Part of speech chip */}
      <span className="font-semibold px-2 py-0.5 rounded-md border bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700 sepia:bg-stone-200/80 sepia:text-stone-900 sepia:border-stone-400">
        {grammar.pos}
      </span>

      {/* 2. Gender chip (masculine / feminine) with accessible symbols, high dark-mode contrast, never color alone */}
      {showGender && (
        <span
          className={`font-semibold px-2 py-0.5 rounded-md border inline-flex items-center gap-1 ${
            isFeminine
              ? 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-700 sepia:bg-rose-200/80 sepia:text-rose-950 sepia:border-rose-400'
              : 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/80 dark:text-sky-200 dark:border-sky-700 sepia:bg-sky-200/80 sepia:text-sky-950 sepia:border-sky-400'
          }`}
          title={isFeminine ? 'Feminine gender' : 'Masculine gender'}
        >
          <span className="font-bold text-[11px]" aria-hidden="true">
            {isFeminine ? '♀' : '♂'}
          </span>
          <span>{grammar.gender}</span>
        </span>
      )}

      {/* 3. Number chip (singular / plural) */}
      {showNumber && (
        <span className="font-medium px-2 py-0.5 rounded-md border bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700 sepia:bg-stone-200/80 sepia:text-stone-800 sepia:border-stone-400">
          {grammar.number}
        </span>
      )}

      {/* 4. Verb Person chip */}
      {grammar.person && (
        <span className="font-medium px-2 py-0.5 rounded-md border bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/80 dark:text-teal-200 dark:border-teal-700 sepia:bg-teal-200/80 sepia:text-teal-950 sepia:border-teal-400">
          {grammar.person}
        </span>
      )}

      {/* 5. Verb Tense chip */}
      {grammar.tense && (
        <span className="font-medium px-2 py-0.5 rounded-md border bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/80 dark:text-teal-200 dark:border-teal-700 sepia:bg-teal-200/80 sepia:text-teal-950 sepia:border-teal-400">
          {grammar.tense}
        </span>
      )}

      {/* 6. Lemma with article (for nouns) or base lemma display */}
      {!isNumber && grammar.lemmaDisplay && (
        <span className="text-stone-600 dark:text-stone-400 sepia:text-stone-700 font-sans ml-0.5">
          (lemma: <span className="font-semibold text-stone-900 dark:text-stone-200 sepia:text-stone-950">{grammar.lemmaDisplay}</span>)
        </span>
      )}
    </div>
  );
};
