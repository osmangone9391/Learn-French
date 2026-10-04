#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build Full Dataset for LireFacile (15 Stories: 5 Verified A1 + 5 New A1 + 5 New A2)
Generates:
1. /src/data/stories.ts
2. /STORIES_REVIEW.md
"""

import re
import os
import json

# Utility to clean French tokens matching textParser.ts
def clean_token(token):
    cleaned = re.sub(r'^[«"\'(—\s]+', '', token)
    cleaned = re.sub(r'[»"\'),.;:!?—\s]+$', '', cleaned)
    cleaned = re.sub(r'^[ldjcsnmt]\'|^qu\'', '', cleaned, flags=re.IGNORECASE)
    return cleaned.strip().lower()

# Word counter matching textParser / validation
def count_words(paragraphs):
    text = " ".join(paragraphs)
    tokens = [w for w in re.split(r'\s+', text) if len(w) > 0]
    return len(tokens)

print("Utility functions initialized.")
