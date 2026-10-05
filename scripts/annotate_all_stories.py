#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full Grammar Annotation Pipeline for Learn French by Reading.
Annotates all 15 stories and 2,193 vocabulary entries.
Produces:
1. updated stories in temp_annotated_stories.json
2. docs/grammar-check-review.md
"""

import json
import re
import os
import sys

# Add scripts directory to path
sys.path.append(os.path.dirname(__file__))
from noun_dictionary import NOUN_DATA

with open('temp_stories.json') as f:
    stories = json.load(f)

# Track CHECK items for review file
check_items = []

def record_check(story_id, key, lemma, pos, tags, sentence, reason):
    check_items.append({
        "story": story_id,
        "french": key,
        "lemma": lemma,
        "pos": pos,
        "tags": tags,
        "sentence": sentence,
        "reason": reason
    })

def get_sentence_context(story, word_key):
    for p in story['paragraphs']:
        for sent in re.split(r'(?<=[.!?])\s+', p):
            if re.search(rf'\b{re.escape(word_key)}\b', sent, re.IGNORECASE):
                return sent.strip()
    return story['paragraphs'][0].strip()

# -------------------------------------------------------------
# ADJECTIVE CLASSIFICATION
# -------------------------------------------------------------
# Exact mapping for adjectives where form is context-dependent or irregular:
# key: (gender, number, is_check, check_reason)
ADJ_MAP = {
    # a-la-boulangerie
    ("a-la-boulangerie", "chaque"): ("masculine", "singular", False, ""),
    ("a-la-boulangerie", "petite"): ("feminine", "singular", False, ""),
    ("a-la-boulangerie", "artisanale"): ("feminine", "singular", False, ""),
    ("a-la-boulangerie", "bonne"): ("feminine", "singular", False, ""),
    ("a-la-boulangerie", "chaud"): ("masculine", "singular", False, ""),
    ("a-la-boulangerie", "cuite"): ("feminine", "singular", False, ""),
    ("a-la-boulangerie", "deux"): ("masculine", "plural", True, "Numeral modifying euros (masculine plural)"),
    ("a-la-boulangerie", "soixante"): ("masculine", "plural", True, "Numeral modifying centimes (masculine plural)"),
    ("a-la-boulangerie", "petit"): ("masculine", "singular", False, ""),

    # trajet-en-metro
    ("trajet-en-metro", "cinq"): ("feminine", "plural", True, "Numeral modifying minutes (feminine plural)"),
    ("trajet-en-metro", "automatique"): ("feminine", "singular", False, ""),
    ("trajet-en-metro", "tactile"): ("masculine", "singular", False, ""),
    ("trajet-en-metro", "plusieurs"): ("feminine", "plural", False, ""),
    ("trajet-en-metro", "bancaire"): ("feminine", "singular", False, ""),
    ("trajet-en-metro", "petit"): ("masculine", "singular", False, ""),
    ("trajet-en-metro", "cartonné"): ("masculine", "singular", False, ""),
    ("trajet-en-metro", "grands"): ("masculine", "plural", False, ""),
    ("trajet-en-metro", "bleus"): ("masculine", "plural", False, ""),
    ("trajet-en-metro", "sourd"): ("masculine", "singular", False, ""),
    ("trajet-en-metro", "régulier"): ("masculine", "singular", False, ""),
    ("trajet-en-metro", "coulissantes"): ("feminine", "plural", False, ""),
    ("trajet-en-metro", "assise"): ("feminine", "singular", False, ""),
    ("trajet-en-metro", "prochaine"): ("feminine", "singular", False, ""),
    ("trajet-en-metro", "simple"): ("masculine", "singular", False, ""),
    ("trajet-en-metro", "rapide"): ("masculine", "singular", False, ""),

    # rendez-vous-prefecture
    ("rendez-vous-prefecture", "important"): ("masculine", "singular", False, ""),
    ("rendez-vous-prefecture", "cartonnée"): ("feminine", "singular", False, ""),
    ("rendez-vous-prefecture", "tous"): ("masculine", "plural", False, ""),
    ("rendez-vous-prefecture", "ses"): ("masculine", "plural", False, ""),
    ("rendez-vous-prefecture", "officiels"): ("masculine", "plural", False, ""),
    ("rendez-vous-prefecture", "son"): ("masculine", "singular", False, ""),
    ("rendez-vous-prefecture", "récent"): ("masculine", "singular", False, ""),
    ("rendez-vous-prefecture", "conformes"): ("feminine", "plural", True, "Modifies photos (feminine plural)"),
    ("rendez-vous-prefecture", "quinze"): ("feminine", "plural", True, "Numeral modifying minutes"),
    ("rendez-vous-prefecture", "fixée"): ("feminine", "singular", False, ""),
    ("rendez-vous-prefecture", "autres"): ("masculine", "plural", False, ""),
    ("rendez-vous-prefecture", "seul"): ("masculine", "singular", False, ""),
    ("rendez-vous-prefecture", "provisoire"): ("masculine", "singular", False, ""),
    ("rendez-vous-prefecture", "valable"): ("masculine", "singular", False, ""),
    ("rendez-vous-prefecture", "six"): ("masculine", "plural", True, "Numeral modifying mois"),

    # au-supermarche
    ("au-supermarche", "grand"): ("masculine", "singular", False, ""),
    ("au-supermarche", "rouge"): ("masculine", "singular", False, ""),
    ("au-supermarche", "frais"): ("masculine", "plural", False, ""),
    ("au-supermarche", "belles"): ("feminine", "plural", False, ""),
    ("au-supermarche", "rouges"): ("feminine", "plural", False, ""),
    ("au-supermarche", "mûres"): ("feminine", "plural", False, ""),
    ("au-supermarche", "automatique"): ("feminine", "singular", False, ""),
    ("au-supermarche", "imprimée"): ("feminine", "singular", False, ""),
    ("au-supermarche", "entier"): ("masculine", "singular", False, ""),
    ("au-supermarche", "quelques"): ("masculine", "plural", False, ""),
    ("au-supermarche", "rapide"): ("feminine", "singular", False, ""),
    ("au-supermarche", "vert"): ("masculine", "singular", False, ""),
    ("au-supermarche", "exact"): ("masculine", "singular", False, ""),
    ("au-supermarche", "propre"): ("masculine", "singular", False, ""),

    # pause-cafe-informatique
    ("pause-cafe-informatique", "dix"): ("feminine", "plural", True, "Numeral modifying heures"),
    ("pause-cafe-informatique", "informatique"): ("feminine", "singular", False, ""),
    ("pause-cafe-informatique", "toute"): ("feminine", "singular", False, ""),
    ("pause-cafe-informatique", "technique"): ("feminine", "singular", False, ""),
    ("pause-cafe-informatique", "nouveau"): ("masculine", "singular", False, ""),
    ("pause-cafe-informatique", "prochain"): ("masculine", "singular", False, ""),
    ("pause-cafe-informatique", "bonne"): ("feminine", "singular", False, ""),
    ("pause-cafe-informatique", "agréable"): ("feminine", "singular", False, ""),
    ("pause-cafe-informatique", "prêt"): ("masculine", "singular", False, ""),

    # chez-le-medecin
    ("chez-le-medecin", "précise"): ("feminine", "singular", False, ""),
    ("chez-le-medecin", "blanche"): ("feminine", "singular", False, ""),
    ("chez-le-medecin", "chaleureux"): ("masculine", "singular", False, ""),
    ("chez-le-medecin", "fort"): ("feminine", "singular", True, "Modifies toux (feminine singular)"),
    ("chez-le-medecin", "gros"): ("masculine", "singular", False, ""),
    ("chez-le-medecin", "claires"): ("feminine", "plural", False, ""),
    ("chez-le-medecin", "profondément"): ("masculine", "singular", False, ""), # if tagged adj
    ("chez-le-medecin", "légère"): ("feminine", "singular", False, ""),
    ("chez-le-medecin", "chaud"): ("masculine", "singular", False, ""),
    ("chez-le-medecin", "trois"): ("feminine", "plural", True, "Numeral modifying fois"),
    ("chez-le-medecin", "chaque"): ("masculine", "singular", False, ""),
    ("chez-le-medecin", "complet"): ("masculine", "singular", False, ""),
    ("chez-le-medecin", "rassuré"): ("masculine", "singular", False, ""),

    # au-restaurant
    ("au-restaurant", "propre"): ("feminine", "singular", False, ""),
    ("au-restaurant", "dressées"): ("feminine", "plural", False, ""),
    ("au-restaurant", "murale"): ("feminine", "singular", False, ""),
    ("au-restaurant", "délicieux"): ("masculine", "singular", False, ""),
    ("au-restaurant", "rôti"): ("masculine", "singular", False, ""),
    ("au-restaurant", "blanc"): ("masculine", "singular", False, ""),
    ("au-restaurant", "parfumé"): ("masculine", "singular", False, ""),
    ("au-restaurant", "parfait"): ("masculine", "singular", False, ""),
    ("au-restaurant", "fraîche"): ("feminine", "singular", False, ""),
    ("au-restaurant", "gazeuse"): ("feminine", "singular", False, ""),
    ("au-restaurant", "chaud"): ("masculine", "singular", False, ""),
    ("au-restaurant", "savoureux"): ("masculine", "singular", False, ""),
    ("au-restaurant", "gourmand"): ("masculine", "singular", False, ""),
    ("au-restaurant", "excellent"): ("masculine", "singular", False, ""),

    # a-la-pharmacie
    ("a-la-pharmacie", "principale"): ("feminine", "singular", False, ""),
    ("a-la-pharmacie", "grande"): ("feminine", "singular", False, ""),
    ("a-la-pharmacie", "verte"): ("feminine", "singular", False, ""),
    ("a-la-pharmacie", "lumineuse"): ("feminine", "singular", False, ""),
    ("a-la-pharmacie", "ouverte"): ("feminine", "singular", False, ""),
    ("a-la-pharmacie", "vitrées"): ("feminine", "plural", False, ""),
    ("a-la-pharmacie", "calme"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "lumineux"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "médicale"): ("feminine", "singular", False, ""),
    ("a-la-pharmacie", "attentivement"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "disponible"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "noir"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "chaque"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "deux"): ("feminine", "plural", True, "Numeral modifying fois"),
    ("a-la-pharmacie", "matin"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "soir"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "simple"): ("masculine", "singular", False, ""),
    ("a-la-pharmacie", "précieux"): ("masculine", "plural", False, ""),

    # acheter-carte-sim
    ("acheter-carte-sim", "moderne"): ("feminine", "singular", False, ""),
    ("acheter-carte-sim", "mobile"): ("masculine", "singular", False, ""),
    ("acheter-carte-sim", "nombreux"): ("masculine", "plural", False, ""),
    ("acheter-carte-sim", "différents"): ("masculine", "plural", False, ""),
    ("acheter-carte-sim", "disponibles"): ("masculine", "plural", False, ""),
    ("acheter-carte-sim", "tactile"): ("masculine", "singular", False, ""),
    ("acheter-carte-sim", "idéale"): ("feminine", "singular", False, ""),
    ("acheter-carte-sim", "quinze"): ("masculine", "plural", True, "Numeral modifying euros"),
    ("acheter-carte-sim", "illimités"): ("masculine", "plural", False, ""),
    ("acheter-carte-sim", "valable"): ("feminine", "singular", False, ""),
    ("acheter-carte-sim", "toute"): ("feminine", "singular", False, ""),
    ("acheter-carte-sim", "bancaire"): ("feminine", "singular", False, ""),
    ("acheter-carte-sim", "quelques"): ("feminine", "plural", False, ""),
    ("acheter-carte-sim", "téléphonique"): ("feminine", "singular", False, ""),
    ("acheter-carte-sim", "parfaitement"): ("masculine", "singular", False, ""),
    ("acheter-carte-sim", "connecté"): ("masculine", "singular", False, ""),
    ("acheter-carte-sim", "rassuré"): ("masculine", "singular", False, ""),

    # bonjour-voisin
    ("bonjour-voisin", "nouvel"): ("masculine", "singular", True, "Form of nouveau before vowel (nouvel immeuble)"),
    ("bonjour-voisin", "résidentiel"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "quotidien"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "cinquante"): ("masculine", "plural", True, "Numeral modifying ans"),
    ("bonjour-voisin", "troisième"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "deuxième"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "gauche"): ("feminine", "singular", False, ""),
    ("bonjour-voisin", "calme"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "agréable"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "bonne"): ("feminine", "singular", False, ""),
    ("bonjour-voisin", "sympathique"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "chaleureuse"): ("feminine", "singular", False, ""),
    ("bonjour-voisin", "heureux"): ("masculine", "singular", False, ""),
    ("bonjour-voisin", "intégré"): ("masculine", "singular", False, ""),

    # chercher-appartement
    ("chercher-appartement", "immobilier"): ("masculine", "singular", False, ""),
    ("chercher-appartement", "tous"): ("masculine", "plural", False, ""),
    ("chercher-appartement", "immobilières"): ("feminine", "plural", False, ""),
    ("chercher-appartement", "première"): ("feminine", "singular", False, ""),
    ("chercher-appartement", "lumineux"): ("masculine", "singular", False, ""),
    ("chercher-appartement", "équipée"): ("feminine", "singular", False, ""),
    ("chercher-appartement", "parfait"): ("masculine", "singular", False, ""),
    ("chercher-appartement", "individuel"): ("masculine", "singular", False, ""),
    ("chercher-appartement", "solide"): ("masculine", "singular", False, ""),
    ("chercher-appartement", "complet"): ("masculine", "singular", False, ""),
    ("chercher-appartement", "récentes"): ("feminine", "plural", False, ""),
    ("chercher-appartement", "professionnelle"): ("feminine", "singular", False, ""),
    ("chercher-appartement", "bancaires"): ("masculine", "plural", False, ""),
    ("chercher-appartement", "conforme"): ("masculine", "singular", False, ""),
    ("chercher-appartement", "prochaine"): ("feminine", "singular", False, ""),
    ("chercher-appartement", "déterminé"): ("masculine", "singular", False, ""),

    # ouvrir-compte-bancaire
    ("ouvrir-compte-bancaire", "convenu"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "bancaire"): ("feminine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "exacte"): ("feminine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "professionnelle"): ("feminine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "standard"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "bancaires"): ("masculine", "plural", False, ""),
    ("ouvrir-compte-bancaire", "valide"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "récent"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "professionnel"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "parfait"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "sécurisée"): ("feminine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "réel"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "instantanés"): ("masculine", "plural", False, ""),
    ("ouvrir-compte-bancaire", "électronique"): ("feminine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "officiel"): ("masculine", "singular", False, ""),
    ("ouvrir-compte-bancaire", "bancaires"): ("masculine", "plural", False, ""),
    ("ouvrir-compte-bancaire", "essentielle"): ("feminine", "singular", False, ""),

    # entretien-embauche-informatique
    ("entretien-embauche-informatique", "technique"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "informatique"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "propre"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "soigné"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "bienveillante"): ("feminine", "singular", False, ""),
    ("entretien-embauche-informatique", "pratique"): ("feminine", "singular", False, ""),
    ("entretien-embauche-informatique", "locaux"): ("masculine", "plural", False, ""),
    ("entretien-embauche-informatique", "matérielles"): ("feminine", "plural", False, ""),
    ("entretien-embauche-informatique", "technique"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "complexe"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "méthodique"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "calme"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "positif"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "complémentaire"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "dynamique"): ("feminine", "singular", False, ""),
    ("entretien-embauche-informatique", "très"): ("masculine", "singular", False, ""),
    ("entretien-embauche-informatique", "confiant"): ("masculine", "singular", False, ""),

    # rendez-vous-france-travail
    ("rendez-vous-france-travail", "premier"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "obligatoire"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "locale"): ("feminine", "singular", False, ""),
    ("rendez-vous-france-travail", "professionnel"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "actuel"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "étrangère"): ("feminine", "singular", False, ""),
    ("rendez-vous-france-travail", "solide"): ("feminine", "singular", False, ""),
    ("rendez-vous-france-travail", "français"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "personnalisé"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "mensuelle"): ("feminine", "singular", False, ""),
    ("rendez-vous-france-travail", "collectifs"): ("masculine", "plural", False, ""),
    ("rendez-vous-france-travail", "personnel"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "mobile"): ("feminine", "singular", False, ""),
    ("rendez-vous-france-travail", "ciblées"): ("feminine", "plural", False, ""),
    ("rendez-vous-france-travail", "excellent"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "remarquable"): ("feminine", "singular", False, ""),
    ("rendez-vous-france-travail", "pleinement"): ("masculine", "singular", False, ""),
    ("rendez-vous-france-travail", "soutenu"): ("masculine", "singular", False, ""),

    # sinscrire-formation
    ("sinscrire-formation", "technique"): ("masculine", "singular", False, ""),
    ("sinscrire-formation", "étranger"): ("masculine", "singular", False, ""),
    ("sinscrire-formation", "professionnelle"): ("feminine", "singular", False, ""),
    ("sinscrire-formation", "informatiques"): ("masculine", "plural", False, ""),
    ("sinscrire-formation", "complet"): ("masculine", "singular", False, ""),
    ("sinscrire-formation", "toutes"): ("feminine", "plural", False, ""),
    ("sinscrire-formation", "requises"): ("feminine", "plural", False, ""),
    ("sinscrire-formation", "certifiées"): ("feminine", "plural", False, ""),
    ("sinscrire-formation", "ses"): ("feminine", "plural", False, ""),
    ("sinscrire-formation", "assermentée"): ("feminine", "singular", False, ""),
    ("sinscrire-formation", "français"): ("masculine", "singular", False, ""),
    ("sinscrire-formation", "détaillés"): ("masculine", "plural", False, ""),
    ("sinscrire-formation", "rédigée"): ("feminine", "singular", False, ""),
    ("sinscrire-formation", "légal"): ("masculine", "singular", False, ""),
    ("sinscrire-formation", "pédagogique"): ("feminine", "singular", False, ""),
    ("sinscrire-formation", "universitaire"): ("masculine", "singular", False, ""),
    ("sinscrire-formation", "pratiques"): ("masculine", "plural", False, ""),
    ("sinscrire-formation", "satisfait"): ("masculine", "singular", False, ""),
}

# -------------------------------------------------------------
# VERB CLASSIFICATION
# -------------------------------------------------------------
# Common verb patterns
FINITE_PERSONS = {
    # 1st person singular
    'ai': ('1st person singular', 'present'),
    'suis': ('1st person singular', 'present'),
    'vais': ('1st person singular', 'present'),
    'veux': ('1st person singular', 'present'),
    'peux': ('1st person singular', 'present'),
    'sais': ('1st person singular', 'present'),
    'vois': ('1st person singular', 'present'),
    'dois': ('1st person singular', 'present'),
    'viens': ('1st person singular', 'present'),
    'voudrais': ('1st person singular', 'conditional'),
    'aimerais': ('1st person singular', 'conditional'),
    'souhaite': ('1st person singular', 'present'),
    'cherche': ('1st person singular', 'present'),
    'habite': ('1st person singular', 'present'),
    'travaille': ('1st person singular', 'present'),
    'prends': ('1st person singular', 'present'),

    # 2nd person plural (polite vous or plural vous)
    'avez': ('2nd person plural', 'present'),
    'êtes': ('2nd person plural', 'present'),
    'allez': ('2nd person plural', 'present'),
    'voulez': ('2nd person plural', 'present'),
    'pouvez': ('2nd person plural', 'present'),
    'savez': ('2nd person plural', 'present'),
    'pourrez': ('2nd person plural', 'future'),
    'désirez': ('2nd person plural', 'present'),
    'prenez': ('2nd person plural', 'present'),
    'souhaitez': ('2nd person plural', 'present'),
    'venez': ('2nd person plural', 'present'),
    'voyez': ('2nd person plural', 'present'),

    # 3rd person plural
    'ont': ('3rd person plural', 'present'),
    'sont': ('3rd person plural', 'present'),
    'vont': ('3rd person plural', 'present'),
    'veulent': ('3rd person plural', 'present'),
    'peuvent': ('3rd person plural', 'present'),
    'comparent': ('3rd person plural', 'present'),
    'ouvrent': ('3rd person plural', 'present'),
    'finissent': ('3rd person plural', 'present'),
    'contiennent': ('3rd person plural', 'present'),

    # Imperfect
    'avait': ('3rd person singular', 'imperfect'),
    'était': ('3rd person singular', 'imperfect'),
    'faisait': ('3rd person singular', 'imperfect'),
    'pouvait': ('3rd person singular', 'imperfect'),
    'voulait': ('3rd person singular', 'imperfect'),
    'semblait': ('3rd person singular', 'imperfect'),

    # Subjunctive
    'reçoive': ('3rd person singular', 'subjunctive'),
    'puisse': ('3rd person singular', 'subjunctive'),
    'soit': ('3rd person singular', 'subjunctive'),
}

# -------------------------------------------------------------
# MAIN ANNOTATION LOOP
# -------------------------------------------------------------
annotated_count = 0
noun_count = 0
adj_count = 0
verb_count = 0
art_count = 0

for story in stories:
    s_id = story['id']
    for k, v in list(story['vocabulary'].items()):
        pos = v['pos']
        lem = v.get('lemma', k)
        ctx = get_sentence_context(story, k)
        annotated_count += 1

        # 1. NOUNS
        if pos == 'noun':
            noun_count += 1
            if lem in NOUN_DATA:
                gender, lemma_with_art = NOUN_DATA[lem]
            else:
                # Fallback for compound / special
                gender = "masculine"
                lemma_with_art = f"le {lem}"
                record_check(s_id, k, lem, pos, f"gender: {gender}", ctx, "Noun lemma not in standard dictionary")

            # Determine number
            is_plural = False
            if lem in ('temps', 'prix', 'cours', 'mois', 'fois', 'pas', 'frais', 'voix', 'repas', 'français', 'dos', 'Paris'):
                if k == 'mois' and s_id in ('rendez-vous-prefecture', 'sinscrire-formation'): is_plural = True
                elif k == 'prix' and s_id in ('chercher-appartement',): is_plural = True
                elif k == 'pas' and s_id in ('bonjour-voisin',): is_plural = True
                elif k == 'cours' and s_id in ('sinscrire-formation',): is_plural = True
                elif k == 'fois' and s_id in ('chez-le-medecin', 'a-la-pharmacie'): is_plural = True
                elif k == 'frais': is_plural = True
                else: is_plural = False
                record_check(s_id, k, lem, pos, f"{gender} · {'plural' if is_plural else 'singular'}", ctx, f"Invariable noun ending in s/x: resolved as {'plural' if is_plural else 'singular'} from context")
            elif (k.endswith('s') or k.endswith('x')) and not (lem.endswith('s') or lem.endswith('x')):
                is_plural = True
            number = 'plural' if is_plural else 'singular'

            v['gender'] = gender
            v['number'] = number
            v['lemmaWithArticle'] = lemma_with_art

        # 2. ADJECTIVES
        elif pos == 'adjective':
            adj_count += 1
            lookup = ADJ_MAP.get((s_id, k))
            if lookup:
                g, num, is_chk, chk_reason = lookup
                v['gender'] = g
                v['number'] = num
                if is_chk:
                    record_check(s_id, k, lem, pos, f"{g} · {num}", ctx, chk_reason)
            else:
                # Default heuristics
                is_plural = k.endswith('s') or k.endswith('x')
                is_fem = k.endswith('e') or k.endswith('es') or k.endswith('ée') or k.endswith('ère') or k.endswith('euse') or k.endswith('ienne') or k.endswith('elle')
                g = 'feminine' if is_fem else 'masculine'
                num = 'plural' if is_plural else 'singular'
                v['gender'] = g
                v['number'] = num

        # 3. ARTICLES
        elif pos == 'article':
            art_count += 1
            if k == 'un':
                v['gender'] = 'masculine'
                v['number'] = 'singular'
            elif k == 'une':
                v['gender'] = 'feminine'
                v['number'] = 'singular'
            elif k == 'le' or k == 'du':
                v['gender'] = 'masculine'
                v['number'] = 'singular'
            elif k == 'la':
                v['gender'] = 'feminine'
                v['number'] = 'singular'
            elif k == 'l':
                # Determine gender of following noun from context
                # E.g. l'entrée (fem), l'heure (fem), l'équipe (fem), l'ardoise (fem), l'avenue (fem), l'agence (fem), l'ambiance (fem)
                # l'appareil (masc), l'homme (masc), l'accueil (masc), l'espace (masc), l'escalier (masc), l'accès (masc), l'entretien (masc)
                fem_vowel_nouns = ('entrée', 'heure', 'équipe', 'ardoise', 'avenue', 'agence', 'ambiance', 'ingénierie', 'application', 'activité', 'offre', 'officine', 'eau', 'identité')
                is_fem = any(noun in ctx.lower() for noun in fem_vowel_nouns)
                v['gender'] = 'feminine' if is_fem else 'masculine'
                v['number'] = 'singular'
                record_check(s_id, "l'", lem, pos, f"{v['gender']} · singular", ctx, f"Elided article l' before vowel: resolved gender as {v['gender']} from modified noun")
            elif k in ('les', 'des'):
                v['number'] = 'plural'
                # Check gender of modified plural noun
                fem_plural_nouns = ('tables', 'portes', 'langues', 'photos', 'marches', 'annonces', 'dépenses', 'salutations', 'pannes', 'alertes', 'offres', 'pièces', 'photocopies', 'notes', 'études', 'questions', 'affaires')
                is_fem = any(noun in ctx.lower() for noun in fem_plural_nouns)
                v['gender'] = 'feminine' if is_fem else 'masculine'
                record_check(s_id, k, lem, pos, f"{v['gender']} · plural", ctx, f"Plural article {k}: determined gender as {v['gender']} from noun in sentence")

        # 4. VERBS
        elif pos == 'verb':
            verb_count += 1
            # Check infinitive
            inf_endings = ('er', 'ir', 're', 'oir')
            is_inf = k == lem or (any(k.endswith(end) for end in inf_endings) and not k.endswith(('ant', 'ent', 'ait', 'ais')))
            # Past participles
            is_pp = k.endswith(('é', 'ée', 'és', 'ées', 'i', 'is', 'it', 'u', 'us', 'ert')) and (
                'a ' in ctx or 'ont ' in ctx or 'est ' in ctx or 'sont ' in ctx or 'ai ' in ctx or 'avons ' in ctx or 'avez ' in ctx or 'après ' in ctx
            ) and k != 'est' and k != 'dit' and k != 'met' and k != 'fait'

            # Present participles
            is_prp = k.endswith('ant') and ('en ' in ctx or 'inscrivant' in k or 'attendant' in k)

            if is_prp:
                v['tense'] = 'present participle'
            elif is_inf and k not in ('met', 'sort', 'dit', 'fait', 'sourit', 'prend', 'rend', 'doit', 'peut', 'veut', 'sait', 'voit', 'est'):
                v['tense'] = 'infinitive'
            elif is_pp and k not in ('met', 'dit', 'fait', 'sourit', 'prend', 'rend', 'doit', 'peut', 'veut', 'sait', 'voit', 'est'):
                v['tense'] = 'past participle'
            else:
                # Finite verb
                lookup = FINITE_PERSONS.get(k)
                if lookup:
                    v['person'] = lookup[0]
                    v['tense'] = lookup[1]
                else:
                    # 3rd person singular present default for French story narration
                    v['person'] = '3rd person singular'
                    v['tense'] = 'present'

        # 5. PRONOUNS
        elif pos == 'pronoun':
            if k == 'il' or k == 'lui':
                v['gender'] = 'masculine'
                v['number'] = 'singular'
            elif k == 'elle':
                v['gender'] = 'feminine'
                v['number'] = 'singular'
            elif k == 'ils':
                v['gender'] = 'masculine'
                v['number'] = 'plural'
            elif k == 'elles':
                v['gender'] = 'feminine'
                v['number'] = 'plural'
            elif k == 'celui-ci':
                v['gender'] = 'masculine'
                v['number'] = 'singular'
            elif k == 'celle-ci':
                v['gender'] = 'feminine'
                v['number'] = 'singular'

print(f"Annotated: {annotated_count} entries ({noun_count} nouns, {adj_count} adjs, {verb_count} verbs, {art_count} articles).")
print(f"CHECK review items logged: {len(check_items)}")

# Save updated stories
with open('temp_annotated_stories.json', 'w') as out:
    json.dump(stories, out, indent=2, ensure_ascii=False)

# Generate docs/grammar-check-review.md
os.makedirs('docs', exist_ok=True)
with open('docs/grammar-check-review.md', 'w') as f:
    f.write("# French Grammar Annotations — Verification & Review Sheet\n\n")
    f.write("This review document lists all vocabulary entries where grammatical properties (gender, number, ambiguous spelling, elision, or part of speech) were context-dependent, resolved from the sentence, or flagged with `CHECK` for human verification.\n\n")
    f.write(f"Total entries reviewed and flagged: **{len(check_items)}**\n\n")
    f.write("| # | Story | French Word | Lemma | Part of Speech | Assigned Tags | Context Sentence | Decision Reason |\n")
    f.write("|---|---|---|---|---|---|---|---|\n")
    for i, item in enumerate(check_items, 1):
        clean_sent = item['sentence'].replace('|', '—').replace('\n', ' ')
        f.write(f"| {i} | `{item['story']}` | **{item['french']}** | `{item['lemma']}` | {item['pos']} | `{item['tags']}` | *« {clean_sent} »* | {item['reason']} |\n")

print("Generated docs/grammar-check-review.md successfully.")
