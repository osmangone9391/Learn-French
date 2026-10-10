# Content Pipeline & Story Format Guide

This directory contains the content sources for the **LireFacile** library.
All stories are maintained in individual markdown files under `content/stories/`, and all word definitions live in the shared vocabulary lexicon `content/lexicon.json`.

---

## 1. Directory Structure

```
content/
├── README.md               # This guide and specification
├── lexicon.json            # Shared dictionary of all French word forms
├── missing-words.csv       # Automatically generated when words need definitions
└── stories/                # One Markdown file per story
    ├── a-la-boulangerie.md
    ├── trajet-en-metro.md
    └── ...
```

---

## 2. Story Source Format (`content/stories/<id>.md`)

Each file consists of a YAML frontmatter header followed by 3 standard markdown sections:
`## French`, `## Translation`, and `## Quiz`.

### Complete Example:

```markdown
---
id: "a-la-boulangerie"
title: "À la boulangerie du quartier"
subtitle: "Acheter du pain frais et des viennoiseries le matin"
level: A1
topics:
  - "daily life"
  - "food"
  - "shopping"
# Optional series identifier for interconnected stories
series: "Vie parisienne"
# Optional per-occurrence overrides for context-dependent words
# (e.g., words whose gender or number depends on context, like "chaque", "mois", "prix")
overrides:
  "chaque":
    lemma: "chaque"
    en: "each / every"
    bn: "প্রতিটি"
    pos: "adjective"
    gender: "masculine"
    number: "singular"
---

## French

Chaque matin, Tariq marche dans sa rue à Paris. Il s'arrête devant la petite boulangerie artisanale. Une bonne odeur de pain chaud sort du magasin.

Tariq entre et sourit à la boulangère. La boulangère dit poliment : « Bonjour monsieur ! Qu'est-ce que vous désirez aujourd'hui ? »

## Translation

Every morning, Tariq walks along his street in Paris. He stops in front of the small artisan bakery. A good smell of hot bread comes out of the shop.

Tariq enters and smiles at the baker. The baker says politely: "Good morning sir! What would you like today?"

## Quiz

### Q1: Où va Tariq chaque matin ?

- [ ] À la pharmacie
- [x] À la boulangerie
- [ ] Au supermarché
- [ ] À la gare

**Explanation**: The story states that Tariq walks every morning and stops in front of the small artisan bakery.

**Explanation (Bangla)**: টেক্সটে বলা আছে যে তারিক প্রতিদিন সকালে ছোট কারিগরি বেকারির সামনে থামে।

### Q2: Que commande Tariq pour le petit-déjeuner ?

- [ ] Un thé et un gâteau
- [x] Une baguette tradition et un croissant
- [ ] Deux sandwichs
- [ ] Du pain complet seulement

**Explanation**: Tariq asks for a traditional baguette and a butter croissant.

**Explanation (Bangla)**: তারিক একটি ঐতিহ্যবাহী বাগেট এবং একটি মাখনের ক্রোয়াসাঁ অর্ডার করেছে।

### Q3: Combien coûte la commande au total ?

- [ ] 1 euro 50
- [x] 2 euros 60
- [ ] 3 euros
- [ ] 4 euros 20

**Explanation**: The baker announces that the total price is 2.60 euros.

**Explanation (Bangla)**: দোকানি বলেছে মোট দাম দুই ইউরো ষাট সেন্ট।
```

---

## 3. Shared Lexicon Entry Schema (`content/lexicon.json`)

Each key is the normalized lowercase French word form (e.g., `"croissant"`, `"mangeons"`, `"boulangerie"`):

```json
"croissant": {
  "lemma": "croissant",
  "en": "croissant",
  "bn": "ক্রোয়াসাঁ",
  "pos": "noun",
  "gender": "masculine",
  "number": "singular",
  "lemmaWithArticle": "le croissant",
  "status": "reviewed"
}
```

### Grammar Tagging Rules:
- **Nouns**: Require `lemma`, `en`, `bn`, `pos: "noun"`, `gender` ("masculine"|"feminine"), `number` ("singular"|"plural"), and `lemmaWithArticle` (e.g., "le croissant", "la gare", "l'ami [m.]").
- **Adjectives**: Require `gender` and `number`.
- **Articles**: Singular articles ("le", "la", "un", "une", "du") have gender. Plural articles ("les", "des") must **never** have a gender chip (only `number: "plural"`).
- **Numbers / Numerals**: `pos: "number"`. Must **not** have gender or number chips.
- **Verbs**: Require `tense` and `person` (for finite tenses). Verbs must **never** have gender or number tags.
- **Status**: `"reviewed"` for verified dictionary items, `"new"` for newly imported items pending editorial review.

---

## 4. How to Add a Story in 5 Steps

1. **Create the Story File**:
   Create a new `.md` file in `content/stories/<new-story-id>.md` with the required metadata, French paragraphs, English translations, and 3 quiz questions.
2. **Run Content Build**:
   Run `npm run content:build`.
   - If all words exist in the lexicon, `src/data/stories.ts` is generated automatically.
   - If any new French words appear, the build halts and writes `content/missing-words.csv`.
3. **Fill in Missing Words**:
   Open `content/missing-words.csv` in any spreadsheet editor or text editor. Fill in `lemma`, `en`, `bn`, `pos`, `gender`, `number`, `tense`, and `person`.
4. **Import Missing Words**:
   Run `npm run content:import`. The new definitions are added to `content/lexicon.json` with status `"new"`.
5. **Validate & Build**:
   Run `npm run build` and `npm run validate:stories`. All pedagogical and structural checks will run and generate a review report under `docs/review-<date>.md`.
