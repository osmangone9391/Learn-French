import re

def clean_french_word(raw):
    if not raw:
        return ''
    cleaned = re.sub(r'^[«"\'(—\s]+', '', raw)
    cleaned = re.sub(r'[»"\'),.;:!?—\s]+$', '', cleaned)
    if re.match(r'^[ldjcsnmt]\'|^qu\'', cleaned, flags=re.I):
        after_apo = re.sub(r'^[ldjcsnmt]\'|^qu\'', '', cleaned, flags=re.I)
        if len(after_apo) > 0:
            cleaned = after_apo
    return cleaned.strip().lower()

def tokenize_sentence(sentence):
    # Regex from textParser.ts:
    token_regex = r'([a-zA-ZÀ-ÖØ-öø-ÿ]+[\'’]|[a-zA-ZÀ-ÖØ-öø-ÿ]+|[^a-zA-ZÀ-ÖØ-öø-ÿ\s]+|\s+)'
    raw_tokens = re.findall(token_regex, sentence)
    words = []
    for raw in raw_tokens:
        is_word = bool(re.search(r'[a-zA-ZÀ-ÖØ-öø-ÿ]', raw))
        if is_word:
            clean = clean_french_word(raw)
            if clean:
                words.append((raw, clean))
    return words

print("Tokenizer ready.")
