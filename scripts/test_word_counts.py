#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
from stories_definitions import STORIES_A1
from stories_definitions_a2 import STORIES_A2

all_stories = STORIES_A1 + STORIES_A2
print(f"Total stories: {len(all_stories)}")

for s in all_stories:
    full_text = " ".join(s["paragraphs"])
    tokens = [w for w in re.split(r'\s+', full_text) if len(w) > 0]
    print(f"- [{s['id']}] ({s['level']}): {len(tokens)} words | paragraphs: {len(s['paragraphs'])} | trans: {len(s['paragraphTranslations'])}")
