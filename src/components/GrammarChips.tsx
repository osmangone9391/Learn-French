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
      <span className="font-semibold px-2 py-0.5 rounded-md border bg-stone-100 text-stone-700 border-stone-200">
        {grammar.pos}
      </span>

      {/* 2. Gender chip (masculine / feminine) with distinct soft colors */}
      {showGender && (
        <span
          className={`font-semibold px-2 py-0.5 rounded-md border ${
            isFeminine
              ? 'bg-rose-50 text-rose-800 border-rose-200 ring-1 ring-rose-200/60'
              : 'bg-sky-50 text-sky-800 border-sky-200 ring-1 ring-sky-200/60'
          }`}
        >
          {grammar.gender}
        </span>
      )}

      {/* 3. Number chip (singular / plural) */}
      {showNumber && (
        <span className="font-medium px-2 py-0.5 rounded-md border bg-stone-100 text-stone-600 border-stone-200">
          {grammar.number}
        </span>
      )}

      {/* 4. Verb Person chip */}
      {grammar.person && (
        <span className="font-medium px-2 py-0.5 rounded-md border bg-emerald-50 text-emerald-800 border-emerald-200">
          {grammar.person}
        </span>
      )}

      {/* 5. Verb Tense chip */}
      {grammar.tense && (
        <span className="font-medium px-2 py-0.5 rounded-md border bg-emerald-50 text-emerald-800 border-emerald-200">
          {grammar.tense}
        </span>
      )}

      {/* 6. Lemma with article (for nouns) or base lemma display */}
      {!isNumber && grammar.lemmaDisplay && (
        <span className="text-stone-500 font-sans ml-0.5">
          (lemma: <span className="font-semibold text-stone-800">{grammar.lemmaDisplay}</span>)
        </span>
      )}
    </div>
  );
};
