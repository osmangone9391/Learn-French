import * as fs from 'fs';
import * as path from 'path';
import { VocabEntry } from '../src/types';

interface LexiconEntry extends VocabEntry {
  status: 'reviewed' | 'new';
}

/**
 * Imports definitions from content/missing-words.csv into content/lexicon.json
 * with status "new".
 */
export function importMissingWords(): void {
  const contentDir = path.resolve('content');
  const lexiconFile = path.join(contentDir, 'lexicon.json');
  const csvFile = path.join(contentDir, 'missing-words.csv');

  if (!fs.existsSync(csvFile)) {
    console.log('No content/missing-words.csv file found to import.');
    return;
  }

  if (!fs.existsSync(lexiconFile)) {
    throw new Error('content/lexicon.json does not exist!');
  }

  const lexicon: Record<string, LexiconEntry> = JSON.parse(fs.readFileSync(lexiconFile, 'utf8'));
  const csvContent = fs.readFileSync(csvFile, 'utf8');

  // Simple CSV line parser supporting quoted fields
  const parseCsvLine = (line: string): string[] => {
    const fields: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        fields.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    fields.push(cur);
    return fields;
  };

  const lines = csvContent.split('\n').filter(l => l.trim().length > 0);
  if (lines.length <= 1) {
    console.log('content/missing-words.csv is empty.');
    return;
  }

  const header = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase());
  const colIndex = (name: string) => header.indexOf(name.toLowerCase());

  let importedCount = 0;
  let skippedCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const row = parseCsvLine(lines[i]);
    const form = row[colIndex('form')]?.trim().toLowerCase();
    const lemma = row[colIndex('lemma')]?.trim();
    const lemmaWithArticle = row[colIndex('lemmawitharticle')]?.trim();
    const en = row[colIndex('en')]?.trim();
    const bn = row[colIndex('bn')]?.trim();
    const pos = row[colIndex('pos')]?.trim() as any;
    const gender = row[colIndex('gender')]?.trim() as any;
    const number = row[colIndex('number')]?.trim() as any;
    const tense = row[colIndex('tense')]?.trim();
    const person = row[colIndex('person')]?.trim();
    const ttsText = row[colIndex('ttstext')]?.trim();

    if (!form || !lemma || !en || !bn || !pos) {
      skippedCount++;
      continue;
    }

    const entry: LexiconEntry = {
      lemma,
      en,
      bn,
      pos,
      status: 'new'
    };

    if (lemmaWithArticle) entry.lemmaWithArticle = lemmaWithArticle;
    if (gender) entry.gender = gender;
    if (number) entry.number = number;
    if (tense) entry.tense = tense;
    if (person) entry.person = person;
    if (ttsText) entry.ttsText = ttsText;

    lexicon[form] = entry;
    importedCount++;
  }

  // Sort lexicon keys alphabetically
  const sortedLexicon: Record<string, LexiconEntry> = {};
  Object.keys(lexicon).sort((a, b) => a.localeCompare(b, 'fr')).forEach(k => {
    sortedLexicon[k] = lexicon[k];
  });

  fs.writeFileSync(lexiconFile, JSON.stringify(sortedLexicon, null, 2) + '\n');
  console.log(`[content:import] Successfully imported ${importedCount} word(s) into content/lexicon.json with status "new".`);
  if (skippedCount > 0) {
    console.log(`[content:import] Skipped ${skippedCount} incomplete row(s).`);
  }

  // Remove missing-words.csv if all imported
  if (skippedCount === 0 && importedCount > 0) {
    fs.unlinkSync(csvFile);
    console.log(`[content:import] Removed content/missing-words.csv.`);
  }
}

if (process.argv[1]?.endsWith('import-missing-words.ts')) {
  importMissingWords();
}
