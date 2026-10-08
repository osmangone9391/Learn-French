# LireFacile - French Story Reader

A fast, self-contained web application for learning French through graded, interactive short stories with bilingual glossaries, natural audio, spaced repetition (SRS), comprehension quizzes, and placement testing.

---

## Features

- **15 Handcrafted Graded Stories**: Curated A1 and A2 French stories with sentence-aligned translations in English and Bangla.
- **Tap-a-Word Interactive Glossaries**: Instant grammatical breakdowns, parts of speech, gender/number, and bilingual meanings.
- **Natural Audio & Web Speech Fallback**: High-quality pre-recorded French audio with browser Web Speech API fallback.
- **Spaced Repetition System (SRS)**: 5-box Leitner system for tracking vocabulary acquisition and scheduling reviews.
- **Reading Comprehension Quizzes**: Multiple-choice quizzes testing story comprehension.
- **CEFR Placement Test**: Placement test to evaluate current level and recommend starting stories.
- **Offline Storage & Backups**: All progress, saved words, and settings are saved locally with JSON export and import support.

---

## Local Development & Testing

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript check
npm run lint

# Validate built-in story dataset integrity
npm run validate:stories

# Build for production
npm run build
```

---

## Deployment

The application is a standard static Single Page Application (Vite + React) that can be hosted on Netlify, Vercel, Cloudflare Pages, or any static hosting service.
