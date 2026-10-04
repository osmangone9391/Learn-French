#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates:
1. /src/data/stories.ts (15 stories with full vocabulary maps)
2. /STORIES_REVIEW.md (Complete review sheet for user verification)
"""

import sys, re, json
sys.path.append('scripts')

from stories_definitions import STORIES_A1
from stories_definitions_a2 import STORIES_A2
from match_text_parser import tokenize_sentence, clean_french_word
from lexicon_part_a_c import LEXICON_A_C
from lexicon_part_d_l import LEXICON_D_L
from lexicon_part_m_r import LEXICON_M_R
from lexicon_part_s_z import LEXICON_S_Z
from merge_and_complete import CORE_EXTRA
from lexicon_final_batch import LEXICON_FINAL

with open('scripts/extracted_existing_vocab.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

MASTER = {}
MASTER.update(existing)
MASTER.update(LEXICON_A_C)
MASTER.update(LEXICON_D_L)
MASTER.update(LEXICON_M_R)
MASTER.update(LEXICON_S_Z)
MASTER.update(CORE_EXTRA)
MASTER.update(LEXICON_FINAL)

all_stories = STORIES_A1 + STORIES_A2

# Specific items flagged with CHECK for user review (Bangla nuances or administrative conventions)
CHECK_TERMS = {
    "angine": "CHECK: 'angine virale' in France usually means sore throat/tonsillitis, translated as 'গলার ইনফেকশন / টনসিল'",
    "brasserie": "CHECK: casual French traditional restaurant-bar, translated as 'ফরাসি রেস্তোরাঁ'",
    "vitale": "CHECK: Carte Vitale is the French national healthcare insurance card, translated as 'ফরাসি স্বাস্থ্যসেবা কার্ড'",
    "rib": "CHECK: Relevé d'Identité Bancaire (official bank account identification details for direct deposit)",
    "comparabilité": "CHECK: Attestation de comparabilité issued by ENIC-NARIC France for foreign degree recognition",
    "licence": "CHECK: Licence professionnelle is a 3-year vocational bachelor's degree in France (Bac+3)",
    "tri": "CHECK: Tri sélectif is domestic waste sorting/recycling in France",
}

print(f"Generating full dataset with {len(all_stories)} stories and {len(MASTER)} lexicon entries...")

final_stories = []

for s in all_stories:
    # 1. Calculate word count
    full_text = " ".join(s["paragraphs"])
    tokens = [w for w in re.split(r'\s+', full_text) if len(w) > 0]
    word_count = len(tokens)

    # 2. Extract and assign all vocabulary tokens for this story
    story_vocab = {}
    for p in s["paragraphs"]:
        # Extract full compound and regular words
        words_in_p = re.findall(r'[a-zA-ZÀ-ÖØ-öø-ÿ0-9\'’-]+', p)
        for w in words_in_p:
            clean = clean_french_word(w)
            if not clean:
                continue
            entry = None
            if clean in MASTER:
                entry = MASTER[clean]
            elif clean.replace('-', '') in MASTER:
                entry = MASTER[clean.replace('-', '')]
            elif clean.replace("'", "") in MASTER:
                entry = MASTER[clean.replace("'", "")]
            elif clean.replace('-', '').replace("'", "") in MASTER:
                entry = MASTER[clean.replace('-', '').replace("'", "")]

            if entry and clean not in story_vocab:
                story_vocab[clean] = {
                    "lemma": entry.get("lemma", clean),
                    "en": entry.get("en", ""),
                    "bn": entry.get("bn", ""),
                    "pos": entry.get("pos", "noun"),
                }
                if "ttsText" in entry:
                    story_vocab[clean]["ttsText"] = entry["ttsText"]

        # Also add individual token pieces from tokenize_sentence
        for raw, clean in tokenize_sentence(p):
            if clean not in story_vocab:
                entry = None
                if clean in MASTER:
                    entry = MASTER[clean]
                elif clean.replace('-', '') in MASTER:
                    entry = MASTER[clean.replace('-', '')]
                elif clean.replace("'", "") in MASTER:
                    entry = MASTER[clean.replace("'", "")]

                if entry:
                    story_vocab[clean] = {
                        "lemma": entry.get("lemma", clean),
                        "en": entry.get("en", ""),
                        "bn": entry.get("bn", ""),
                        "pos": entry.get("pos", "noun"),
                    }
                    if "ttsText" in entry:
                        story_vocab[clean]["ttsText"] = entry["ttsText"]

    story_obj = {
        "id": s["id"],
        "title": s["title"],
        "subtitle": s["subtitle"],
        "level": s["level"],
        "topic": s["topic"],
        "wordCount": word_count,
        "estimatedMinutes": s.get("estimatedMinutes", 3),
        "paragraphs": s["paragraphs"],
        "paragraphTranslations": s["paragraphTranslations"],
        "vocabulary": story_vocab,
        "quiz": s["quiz"],
    }
    final_stories.append(story_obj)

# 1. Output src/data/stories.ts
ts_content = """import { Story } from '../types';

export const INITIAL_STORIES: Story[] = """ + json.dumps(final_stories, ensure_ascii=False, indent=2) + ";\n"

with open("src/data/stories.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"✓ Successfully wrote src/data/stories.ts ({len(final_stories)} stories)")

# 2. Output STORIES_REVIEW.md
md_lines = []
md_lines.append("# LireFacile — Stories & Vocabulary Review Sheet\n")
md_lines.append("> **Note for Learner Review:** This document contains the complete bilingual text and vocabulary mappings for all 15 stories (5 existing A1 stories + 5 new original A1 stories + 5 new original A2 stories).\n")
md_lines.append("> Any terms involving administrative terminology, French cultural context, or specific Bangla nuances are marked with **`CHECK`** for your verification.\n\n")

for idx, s in enumerate(final_stories, 1):
    md_lines.append(f"## Story {idx}: {s['title']} ({s['level']})\n")
    md_lines.append(f"- **ID:** `{s['id']}`")
    md_lines.append(f"- **Level:** {s['level']} | **Word Count:** {s['wordCount']} words | **Estimated Reading Time:** {s['estimatedMinutes']} min")
    md_lines.append(f"- **Topic:** {s['topic']}")
    md_lines.append(f"- **Subtitle:** {s['subtitle']}\n")

    md_lines.append("### 1. French Text & English Translation\n")
    for p_idx, p_text in enumerate(s['paragraphs']):
        en_text = s['paragraphTranslations'][p_idx]
        md_lines.append(f"**Paragraph {p_idx + 1}:**\n")
        md_lines.append(f"> 🇫🇷 **French:** {p_text}\n>")
        md_lines.append(f"> 🇬🇧 **English:** {en_text}\n")

    md_lines.append("### 2. Comprehension Quiz Questions\n")
    for q_idx, q in enumerate(s['quiz'], 1):
        md_lines.append(f"**Q{q_idx}: {q['question']}**")
        for opt_idx, opt in enumerate(q['options']):
            is_correct = "✓ (Correct)" if opt_idx == q['answer'] else ""
            md_lines.append(f"  - [{opt_idx}] {opt} {is_correct}")
        md_lines.append(f"  - *English Explanation:* {q['explanation']}")
        md_lines.append(f"  - *বাংলা ব্যাখ্যা:* {q['explanationBn']}\n")

    md_lines.append("### 3. Complete Vocabulary List\n")
    md_lines.append("| French Token | Lemma (Base) | POS | English Meaning | Bangla Meaning (বাংলা) | Notes / Check |")
    md_lines.append("| :--- | :--- | :--- | :--- | :--- | :--- |")

    for word_key, v in sorted(s['vocabulary'].items(), key=lambda x: x[0]):
        check_note = ""
        for ck, desc in CHECK_TERMS.items():
            if ck == word_key or ck == v['lemma'].lower():
                check_note = f"**{desc}**"
                break

        md_lines.append(f"| `{word_key}` | `{v['lemma']}` | *{v['pos']}* | {v['en']} | {v['bn']} | {check_note} |")

    md_lines.append("\n---\n")

with open("STORIES_REVIEW.md", "w", encoding="utf-8") as f:
    f.write("\n".join(md_lines))

print(f"✓ Successfully generated STORIES_REVIEW.md")
