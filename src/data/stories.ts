import { Story } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    "id": "a-la-boulangerie",
    "title": "À la boulangerie du quartier",
    "subtitle": "Acheter du pain frais et des viennoiseries le matin",
    "level": "A1",
    "topic": "Vie quotidienne & Nourriture",
    "wordCount": 142,
    "estimatedMinutes": 2,
    "paragraphs": [
      "Chaque matin, Tariq marche dans sa rue à Paris. Il s'arrête devant la petite boulangerie artisanale. Une bonne odeur de pain chaud sort du magasin.",
      "Tariq entre et sourit à la boulangère. La boulangère dit poliment : « Bonjour monsieur ! Qu'est-ce que vous désirez aujourd'hui ? »",
      "Tariq répond calmement : « Bonjour madame. Je voudrais une baguette tradition pas trop cuite, s'il vous plaît. Et aussi un croissant au beurre. »",
      "La boulangère met les produits dans un sachet en papier. Elle annonce le prix : « Très bien. Cela fait deux euros et soixante centimes au total. »",
      "Tariq donne une pièce de deux euros et une pièce de un euro. La boulangère lui rend la monnaie avec le sourire. Tariq dit : « Merci beaucoup, bonne journée madame ! » et il rentre chez lui avec son petit-déjeuner."
    ],
    "paragraphTranslations": [
      "Every morning, Tariq walks along his street in Paris. He stops in front of the small artisan bakery. A good smell of hot bread comes out of the shop.",
      "Tariq enters and smiles at the baker. The baker says politely: \"Good morning sir! What would you like today?\"",
      "Tariq answers calmly: \"Good morning madam. I would like a traditional baguette not too well-done, please. And also a butter croissant.\"",
      "The baker puts the products in a paper bag. She announces the price: \"Very well. That is two euros and sixty cents in total.\"",
      "Tariq gives a two-euro coin and a one-euro coin. The baker gives him the change with a smile. Tariq says: \"Thank you very much, have a nice day madam!\" and he returns home with his breakfast."
    ],
    "vocabulary": {
      "chaque": {
        "lemma": "chaque",
        "en": "each / every",
        "bn": "প্রতিটি",
        "pos": "adjective"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "tariq": {
        "lemma": "Tariq",
        "en": "Tariq (first name)",
        "bn": "তারিক (নাম)",
        "pos": "noun"
      },
      "marche": {
        "lemma": "marcher",
        "en": "walks",
        "bn": "হাঁটে",
        "pos": "verb"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "rue": {
        "lemma": "rue",
        "en": "street",
        "bn": "রাস্তা",
        "pos": "noun"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "paris": {
        "lemma": "Paris",
        "en": "Paris",
        "bn": "প্যারিস",
        "pos": "noun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "arrête": {
        "lemma": "arrêter",
        "en": "stops",
        "bn": "থামে",
        "pos": "verb"
      },
      "devant": {
        "lemma": "devant",
        "en": "in front of",
        "bn": "সামনে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "petite": {
        "lemma": "petit",
        "en": "small (feminine)",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "boulangerie": {
        "lemma": "boulangerie",
        "en": "bakery",
        "bn": "বেকারি",
        "pos": "noun"
      },
      "artisanale": {
        "lemma": "artisanal",
        "en": "handcrafted / artisanal",
        "bn": "হাতে তৈরি",
        "pos": "adjective"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "bonne": {
        "lemma": "bon",
        "en": "good",
        "bn": "ভালো",
        "pos": "adjective"
      },
      "odeur": {
        "lemma": "odeur",
        "en": "smell / aroma",
        "bn": "গন্ধ / সুবাস",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "pain": {
        "lemma": "pain",
        "en": "bread",
        "bn": "পাউরুটি",
        "pos": "noun"
      },
      "chaud": {
        "lemma": "chaud",
        "en": "hot / warm",
        "bn": "গরম",
        "pos": "adjective"
      },
      "sort": {
        "lemma": "sortir",
        "en": "comes out / exits",
        "bn": "বের হয়",
        "pos": "verb"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "magasin": {
        "lemma": "magasin",
        "en": "shop / store",
        "bn": "দোকান",
        "pos": "noun"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "entre": {
        "lemma": "entrer",
        "en": "enters",
        "bn": "প্রবেশ করে",
        "pos": "verb"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "sourit": {
        "lemma": "sourire",
        "en": "smiles",
        "bn": "হাসে",
        "pos": "verb"
      },
      "boulangère": {
        "lemma": "boulangère",
        "en": "baker (female)",
        "bn": "মহিলা রুটি প্রস্তুতকারক",
        "pos": "noun"
      },
      "dit": {
        "lemma": "dire",
        "en": "says",
        "bn": "বলে",
        "pos": "verb"
      },
      "poliment": {
        "lemma": "poliment",
        "en": "politely",
        "bn": "ভদ্রভাবে",
        "pos": "adverb"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "est-ce": {
        "lemma": "est-ce que",
        "en": "is it / (question marker)",
        "bn": "কী / নাকি",
        "pos": "expression"
      },
      "que": {
        "lemma": "que",
        "en": "that / what",
        "bn": "কী / যে",
        "pos": "pronoun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "désirez": {
        "lemma": "désirer",
        "en": "desire / want",
        "bn": "চান",
        "pos": "verb"
      },
      "aujourd'hui": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "qu": {
        "lemma": "que",
        "en": "that / what (elision)",
        "bn": "যা / কী",
        "pos": "pronoun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "aujourd": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "hui": {
        "lemma": "aujourd'hui",
        "en": "today (part of aujourd'hui)",
        "bn": "আজ",
        "pos": "adverb"
      },
      "répond": {
        "lemma": "répondre",
        "en": "answers / replies",
        "bn": "উত্তর দেয়",
        "pos": "verb"
      },
      "calmement": {
        "lemma": "calmement",
        "en": "calmly",
        "bn": "শান্তভাবে",
        "pos": "adverb"
      },
      "madame": {
        "lemma": "madame",
        "en": "madam / ma'am",
        "bn": "ম্যাডাম / বেগম",
        "pos": "noun"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "voudrais": {
        "lemma": "vouloir",
        "en": "would like",
        "bn": "চাই / নিতে চাই",
        "pos": "verb"
      },
      "baguette": {
        "lemma": "baguette",
        "en": "baguette (French bread)",
        "bn": "বাগেট (ফরাসি লম্বা রুটি)",
        "pos": "noun"
      },
      "tradition": {
        "lemma": "tradition",
        "en": "traditional baguette",
        "bn": "ঐতিহ্যবাহী বাগেট",
        "pos": "noun"
      },
      "pas": {
        "lemma": "pas",
        "en": "step / footsteps / not",
        "bn": "পদক্ষেপ / পায়ের আওয়াজ / না",
        "pos": "noun"
      },
      "trop": {
        "lemma": "trop",
        "en": "too / overly",
        "bn": "বেশি / অতিরিক্ত",
        "pos": "adverb"
      },
      "cuite": {
        "lemma": "cuit",
        "en": "baked / cooked",
        "bn": "পোড়া / সেঁকা",
        "pos": "adjective"
      },
      "plaît": {
        "lemma": "plaire",
        "en": "pleases (s'il vous plaît)",
        "bn": "পছন্দ হয় / দয়া করে",
        "pos": "verb"
      },
      "aussi": {
        "lemma": "aussi",
        "en": "also / too",
        "bn": "আরও / ও",
        "pos": "adverb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "croissant": {
        "lemma": "croissant",
        "en": "croissant",
        "bn": "ক্রোয়াসাঁ (চাঁদের মতো মাখনের পেস্ট্রি)",
        "pos": "noun"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "beurre": {
        "lemma": "beurre",
        "en": "butter",
        "bn": "মাখন",
        "pos": "noun"
      },
      "met": {
        "lemma": "mettre",
        "en": "puts",
        "bn": "রাখে",
        "pos": "verb"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "produits": {
        "lemma": "produit",
        "en": "products / items",
        "bn": "জিনিসপত্র",
        "pos": "noun"
      },
      "sachet": {
        "lemma": "sachet",
        "en": "bag / pouch",
        "bn": "ছোট ব্যাগ / প্যাকেট",
        "pos": "noun"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "papier": {
        "lemma": "papier",
        "en": "paper",
        "bn": "কাগজ",
        "pos": "noun"
      },
      "elle": {
        "lemma": "elle",
        "en": "she",
        "bn": "সে (মহিলা)",
        "pos": "pronoun"
      },
      "annonce": {
        "lemma": "annoncer",
        "en": "announces / states",
        "bn": "জানায়",
        "pos": "verb"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "prix": {
        "lemma": "prix",
        "en": "price",
        "bn": "দাম / মূল্য",
        "pos": "noun"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "bien": {
        "lemma": "bien",
        "en": "well / good",
        "bn": "ভালো / ঠিক আছে",
        "pos": "adverb"
      },
      "cela": {
        "lemma": "cela",
        "en": "that / this",
        "bn": "এটা",
        "pos": "pronoun"
      },
      "fait": {
        "lemma": "faire",
        "en": "makes / does / fact",
        "bn": "করে / ঘটনা",
        "pos": "verb"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "euros": {
        "lemma": "euro",
        "en": "euros",
        "bn": "ইউরো",
        "pos": "noun"
      },
      "soixante": {
        "lemma": "soixante",
        "en": "sixty",
        "bn": "ষাট",
        "pos": "adjective"
      },
      "centimes": {
        "lemma": "centime",
        "en": "cents",
        "bn": "সেন্ট",
        "pos": "noun"
      },
      "total": {
        "lemma": "total",
        "en": "total",
        "bn": "মোট",
        "pos": "noun"
      },
      "donne": {
        "lemma": "donner",
        "en": "gives",
        "bn": "দেয়",
        "pos": "verb"
      },
      "pièce": {
        "lemma": "pièce",
        "en": "coin / room",
        "bn": "কয়েন / মুদ্রা",
        "pos": "noun"
      },
      "euro": {
        "lemma": "euro",
        "en": "euro (currency)",
        "bn": "ইউরো",
        "pos": "noun"
      },
      "lui": {
        "lemma": "lui",
        "en": "to him / her",
        "bn": "তাকে",
        "pos": "pronoun"
      },
      "rend": {
        "lemma": "rendre",
        "en": "returns / gives back",
        "bn": "ফেরত দেয়",
        "pos": "verb"
      },
      "monnaie": {
        "lemma": "monnaie",
        "en": "change / currency",
        "bn": "ভাঙতি টাকা / মুদ্রা",
        "pos": "noun"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "sourire": {
        "lemma": "sourire",
        "en": "smile",
        "bn": "হাসি",
        "pos": "noun"
      },
      "merci": {
        "lemma": "merci",
        "en": "thank you",
        "bn": "ধন্যবাদ",
        "pos": "expression"
      },
      "beaucoup": {
        "lemma": "beaucoup",
        "en": "a lot / very much",
        "bn": "অনেক",
        "pos": "adverb"
      },
      "journée": {
        "lemma": "journée",
        "en": "day (duration)",
        "bn": "দিন",
        "pos": "noun"
      },
      "rentre": {
        "lemma": "rentrer",
        "en": "returns / goes home",
        "bn": "ফেরে",
        "pos": "verb"
      },
      "chez": {
        "lemma": "chez",
        "en": "at the place of",
        "bn": "বাসায় / কাছে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "petit-déjeuner": {
        "lemma": "petit-déjeuner",
        "en": "breakfast",
        "bn": "সকালের নাস্তা",
        "pos": "noun"
      },
      "petit": {
        "lemma": "petit",
        "en": "small / short",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "déjeuner": {
        "lemma": "déjeuner",
        "en": "lunch / to have lunch",
        "bn": "দুপুরের খাবার",
        "pos": "noun"
      }
    },
    "quiz": [
      {
        "question": "Où va Tariq chaque matin ?",
        "options": [
          "À la pharmacie",
          "À la boulangerie",
          "Au supermarché",
          "À la gare"
        ],
        "answer": 1,
        "explanation": "The story states that Tariq walks every morning and stops in front of the small artisan bakery.",
        "explanationBn": "টেক্সটে বলা আছে যে তারিক প্রতিদিন সকালে ছোট কারিগরি বেকারির সামনে থামে।"
      },
      {
        "question": "Que commande Tariq pour le petit-déjeuner ?",
        "options": [
          "Un thé et un gâteau",
          "Une baguette tradition et un croissant",
          "Deux sandwichs",
          "Du pain complet seulement"
        ],
        "answer": 1,
        "explanation": "Tariq asks: \"Je voudrais une baguette tradition... et aussi un croissant au beurre\" (A traditional baguette and a butter croissant).",
        "explanationBn": "তারিক একটি ঐতিহ্যবাহী বাগেট এবং একটি মাখনের ক্রোয়াসাঁ অর্ডার করেছে।"
      },
      {
        "question": "Combien coûte la commande au total ?",
        "options": [
          "1 euro 50",
          "2 euros 60",
          "3 euros",
          "4 euros 20"
        ],
        "answer": 1,
        "explanation": "The baker announces: \"Cela fait deux euros et soixante centimes au total\" (That is 2.60 euros in total).",
        "explanationBn": "দোকানি বলেছে মোট দাম দুই ইউরো ষাট সেন্ট।"
      }
    ]
  },
  {
    "id": "trajet-en-metro",
    "title": "Mon trajet en métro",
    "subtitle": "Prendre les transports en commun à Paris en toute confiance",
    "level": "A1",
    "topic": "Transports & Ville",
    "wordCount": 163,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Aujourd'hui, Kabir doit aller à son école de français. La station de métro est à cinq minutes à pied de son studio. Il prend son sac à dos et ferme sa porte à clé.",
      "Devant l'entrée de la station, Kabir descend les escaliers. Il regarde la borne automatique pour acheter un titre de transport. L'écran tactile propose plusieurs langues, mais Kabir choisit le français pour s'entraîner.",
      "Il sélectionne l'option « Ticket de métro t+ ». Il paie avec sa carte bancaire sans contact. La machine délivre un petit ticket cartonné et un reçu.",
      "Kabir passe le portillon automatique. Il regarde les grands panneaux bleus sur le quai : la ligne 4 va en direction de « Porte de Clignancourt ». Le métro arrive avec un bruit sourd et régulier.",
      "Les portes coulissantes s'ouvrent. Kabir entre et trouve une place assise près de la sortie. La voix annonce la prochaine station : « Châtelet ». Kabir sourit, son voyage est simple et très rapide."
    ],
    "paragraphTranslations": [
      "Today, Kabir must go to his French school. The metro station is five minutes walk from his studio. He takes his backpack and locks his door.",
      "In front of the station entrance, Kabir goes down the stairs. He looks at the automatic ticket machine to buy a transport ticket. The touch screen offers several languages, but Kabir chooses French to practice.",
      "He selects the option \"Metro ticket t+\". He pays with his contactless bank card. The machine dispenses a small cardboard ticket and a receipt.",
      "Kabir goes through the automatic turnstile. He looks at the large blue signs on the platform: line 4 goes towards \"Porte de Clignancourt\". The subway train arrives with a steady, low rumble.",
      "The sliding doors open. Kabir enters and finds a seat near the exit. The voice announces the next station: \"Châtelet\". Kabir smiles, his trip is simple and very fast."
    ],
    "vocabulary": {
      "aujourd'hui": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "kabir": {
        "lemma": "Kabir",
        "en": "Kabir (first name)",
        "bn": "কবীর (নাম)",
        "pos": "noun"
      },
      "doit": {
        "lemma": "devoir",
        "en": "must / has to",
        "bn": "হবে / বাধ্য",
        "pos": "verb"
      },
      "aller": {
        "lemma": "aller",
        "en": "to go",
        "bn": "যাওয়া",
        "pos": "verb"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "école": {
        "lemma": "école",
        "en": "school",
        "bn": "স্কুল",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "français": {
        "lemma": "français",
        "en": "French",
        "bn": "ফরাসি",
        "pos": "noun"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "station": {
        "lemma": "station",
        "en": "station",
        "bn": "স্টেশন",
        "pos": "noun"
      },
      "métro": {
        "lemma": "métro",
        "en": "subway / underground train",
        "bn": "পাতালরেল / মেট্রো",
        "pos": "noun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "cinq": {
        "lemma": "cinq",
        "en": "five",
        "bn": "পাঁচ",
        "pos": "adjective"
      },
      "minutes": {
        "lemma": "minute",
        "en": "minutes",
        "bn": "মিনিট",
        "pos": "noun"
      },
      "pied": {
        "lemma": "pied",
        "en": "foot (à pied = on foot)",
        "bn": "পা (হাঁটা পথ)",
        "pos": "noun"
      },
      "studio": {
        "lemma": "studio",
        "en": "studio flat",
        "bn": "স্টুডিও অ্যাপার্টমেন্ট",
        "pos": "noun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "prend": {
        "lemma": "prendre",
        "en": "takes",
        "bn": "নেয়",
        "pos": "verb"
      },
      "sac": {
        "lemma": "sac",
        "en": "bag / backpack",
        "bn": "ব্যাগ / থলে",
        "pos": "noun"
      },
      "dos": {
        "lemma": "dos",
        "en": "back (backpack)",
        "bn": "পিঠ / কাঁধ",
        "pos": "noun"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "ferme": {
        "lemma": "fermer",
        "en": "locks / closes",
        "bn": "বন্ধ করে",
        "pos": "verb"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "porte": {
        "lemma": "porte",
        "en": "door",
        "bn": "দরজা",
        "pos": "noun"
      },
      "clé": {
        "lemma": "clé",
        "en": "key",
        "bn": "চাবি",
        "pos": "noun"
      },
      "aujourd": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "hui": {
        "lemma": "aujourd'hui",
        "en": "today (part of aujourd'hui)",
        "bn": "আজ",
        "pos": "adverb"
      },
      "devant": {
        "lemma": "devant",
        "en": "in front of",
        "bn": "সামনে",
        "pos": "preposition"
      },
      "entrée": {
        "lemma": "entrée",
        "en": "entrance / starter",
        "bn": "প্রবেশদ্বার",
        "pos": "noun"
      },
      "descend": {
        "lemma": "descendre",
        "en": "goes down",
        "bn": "নেমে যায়",
        "pos": "verb"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "escaliers": {
        "lemma": "escalier",
        "en": "stairs",
        "bn": "সিঁড়ি",
        "pos": "noun"
      },
      "regarde": {
        "lemma": "regarder",
        "en": "looks at / watches",
        "bn": "তাকায়",
        "pos": "verb"
      },
      "borne": {
        "lemma": "borne",
        "en": "terminal / kiosk machine",
        "bn": "মেশিন / কিয়স্ক",
        "pos": "noun"
      },
      "automatique": {
        "lemma": "automatique",
        "en": "automatic",
        "bn": "স্বয়ংক্রিয়",
        "pos": "adjective"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "acheter": {
        "lemma": "acheter",
        "en": "to buy",
        "bn": "কেনা",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "titre": {
        "lemma": "titre",
        "en": "transport ticket / title / permit",
        "bn": "টিকিট / কার্ড / শিরোনাম",
        "pos": "noun"
      },
      "transport": {
        "lemma": "transport",
        "en": "transportation",
        "bn": "যাতায়াত / পরিবহন",
        "pos": "noun"
      },
      "écran": {
        "lemma": "écran",
        "en": "screen / display",
        "bn": "পর্দা / স্ক্রিন",
        "pos": "noun"
      },
      "tactile": {
        "lemma": "tactile",
        "en": "touch (screen)",
        "bn": "স্পর্শকাতর / টাচস্ক্রিন",
        "pos": "adjective"
      },
      "propose": {
        "lemma": "proposer",
        "en": "offers / suggests",
        "bn": "প্রস্তাব দেয় / প্রদান করে",
        "pos": "verb"
      },
      "plusieurs": {
        "lemma": "plusieurs",
        "en": "several",
        "bn": "কয়েকটি",
        "pos": "adjective"
      },
      "langues": {
        "lemma": "langue",
        "en": "languages",
        "bn": "ভাষাসমূহ",
        "pos": "noun"
      },
      "mais": {
        "lemma": "mais",
        "en": "but",
        "bn": "কিন্তু",
        "pos": "conjunction"
      },
      "choisit": {
        "lemma": "choisir",
        "en": "chooses",
        "bn": "পছন্দ করে",
        "pos": "verb"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "entraîner": {
        "lemma": "entraîner",
        "en": "to practice / train",
        "bn": "অনুশীলন করা",
        "pos": "verb"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "sélectionne": {
        "lemma": "sélectionner",
        "en": "selects",
        "bn": "নির্বাচন করে",
        "pos": "verb"
      },
      "option": {
        "lemma": "option",
        "en": "option",
        "bn": "বিকল্প / অপশন",
        "pos": "noun"
      },
      "ticket": {
        "lemma": "ticket",
        "en": "ticket / token",
        "bn": "টিকিট / টোকেন",
        "pos": "noun"
      },
      "t": {
        "lemma": "te",
        "en": "you (elision)",
        "bn": "তোমাকে",
        "pos": "pronoun"
      },
      "paie": {
        "lemma": "payer",
        "en": "pays / pay slip",
        "bn": "অর্থ প্রদান করে / বেতন",
        "pos": "verb"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "carte": {
        "lemma": "carte",
        "en": "card / menu",
        "bn": "কার্ড / মেনু",
        "pos": "noun"
      },
      "bancaire": {
        "lemma": "bancaire",
        "en": "banking / bank-related",
        "bn": "ব্যাংক সংক্রান্ত",
        "pos": "adjective"
      },
      "sans": {
        "lemma": "sans",
        "en": "without",
        "bn": "ছাড়া / বিহীন",
        "pos": "preposition"
      },
      "contact": {
        "lemma": "contact",
        "en": "contact",
        "bn": "যোগাযোগ",
        "pos": "noun"
      },
      "machine": {
        "lemma": "machine",
        "en": "machine",
        "bn": "যন্ত্র / মেশিন",
        "pos": "noun"
      },
      "délivre": {
        "lemma": "délivrer",
        "en": "dispenses / issues",
        "bn": "প্রদান করে / বের করে",
        "pos": "verb"
      },
      "petit": {
        "lemma": "petit",
        "en": "small / short",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "cartonné": {
        "lemma": "cartonné",
        "en": "cardboard / paper-based",
        "bn": "কার্ডবোর্ডের",
        "pos": "adjective"
      },
      "reçu": {
        "lemma": "reçu",
        "en": "receipt / received",
        "bn": "রসিদ / পেয়েছে",
        "pos": "noun"
      },
      "passe": {
        "lemma": "passer",
        "en": "passes / goes through",
        "bn": "যায় / অতিক্রম করে",
        "pos": "verb"
      },
      "portillon": {
        "lemma": "portillon",
        "en": "turnstile / subway barrier",
        "bn": "মেট্রো গেট / ব্যারিয়ার",
        "pos": "noun"
      },
      "grands": {
        "lemma": "grand",
        "en": "large (plural)",
        "bn": "বড়",
        "pos": "adjective"
      },
      "panneaux": {
        "lemma": "panneau",
        "en": "signs / boards",
        "bn": "সাইনবোর্ডসমূহ",
        "pos": "noun"
      },
      "bleus": {
        "lemma": "bleu",
        "en": "blue",
        "bn": "নীল",
        "pos": "adjective"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "quai": {
        "lemma": "quai",
        "en": "platform",
        "bn": "প্ল্যাটফর্ম",
        "pos": "noun"
      },
      "ligne": {
        "lemma": "ligne",
        "en": "line (metro / telephone / online)",
        "bn": "লাইন / সংযোগ",
        "pos": "noun"
      },
      "va": {
        "lemma": "aller",
        "en": "goes",
        "bn": "যায়",
        "pos": "verb"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "direction": {
        "lemma": "direction",
        "en": "direction",
        "bn": "দিক / অভিমুখ",
        "pos": "noun"
      },
      "clignancourt": {
        "lemma": "Clignancourt",
        "en": "Clignancourt (place in Paris)",
        "bn": "ক্লিনিয়াঁকুর",
        "pos": "noun"
      },
      "arrive": {
        "lemma": "arriver",
        "en": "arrives",
        "bn": "পৌঁছায়",
        "pos": "verb"
      },
      "bruit": {
        "lemma": "bruit",
        "en": "noise / sound",
        "bn": "শব্দ",
        "pos": "noun"
      },
      "sourd": {
        "lemma": "sourd",
        "en": "deep (rumble) / deaf",
        "bn": "গম্ভীর (আওয়াজ) / বধির",
        "pos": "adjective"
      },
      "régulier": {
        "lemma": "régulier",
        "en": "steady / regular",
        "bn": "নিয়মিত / স্থির",
        "pos": "adjective"
      },
      "portes": {
        "lemma": "porte",
        "en": "doors",
        "bn": "দরজাগুলো",
        "pos": "noun"
      },
      "coulissantes": {
        "lemma": "coulissant",
        "en": "sliding (doors)",
        "bn": "স্লাইডিং (দরজা)",
        "pos": "adjective"
      },
      "ouvrent": {
        "lemma": "ouvrir",
        "en": "open (plural)",
        "bn": "খোলে",
        "pos": "verb"
      },
      "entre": {
        "lemma": "entrer",
        "en": "enters",
        "bn": "প্রবেশ করে",
        "pos": "verb"
      },
      "trouve": {
        "lemma": "trouver",
        "en": "finds",
        "bn": "পায়",
        "pos": "verb"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "place": {
        "lemma": "place",
        "en": "seat / space",
        "bn": "আসন / জায়গা",
        "pos": "noun"
      },
      "assise": {
        "lemma": "assis",
        "en": "seated / sitting",
        "bn": "বসার",
        "pos": "adjective"
      },
      "près": {
        "lemma": "près",
        "en": "near / close to",
        "bn": "কাছে / নিকটে",
        "pos": "preposition"
      },
      "sortie": {
        "lemma": "sortie",
        "en": "exit",
        "bn": "বের হওয়ার পথ / প্রস্থান",
        "pos": "noun"
      },
      "voix": {
        "lemma": "voix",
        "en": "voice",
        "bn": "কণ্ঠ / আওয়াজ",
        "pos": "noun"
      },
      "annonce": {
        "lemma": "annoncer",
        "en": "announces / states",
        "bn": "জানায়",
        "pos": "verb"
      },
      "prochaine": {
        "lemma": "prochain",
        "en": "next (feminine)",
        "bn": "পরবর্তী",
        "pos": "adjective"
      },
      "châtelet": {
        "lemma": "Châtelet",
        "en": "Châtelet (metro station)",
        "bn": "শাতলে (মেট্রো স্টেশন)",
        "pos": "noun"
      },
      "sourit": {
        "lemma": "sourire",
        "en": "smiles",
        "bn": "হাসে",
        "pos": "verb"
      },
      "voyage": {
        "lemma": "voyage",
        "en": "journey / trip",
        "bn": "ভ্রমণ / যাত্রা",
        "pos": "noun"
      },
      "simple": {
        "lemma": "simple",
        "en": "simple / easy",
        "bn": "সহজ / সাধারণ",
        "pos": "adjective"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "rapide": {
        "lemma": "rapide",
        "en": "fast / quick",
        "bn": "দ্রুত",
        "pos": "adjective"
      }
    },
    "quiz": [
      {
        "question": "Comment Kabir paie-t-il son ticket de métro ?",
        "options": [
          "Avec des pièces de monnaie",
          "Avec sa carte bancaire sans contact",
          "Par chèque postal",
          "Il ne paie pas"
        ],
        "answer": 1,
        "explanation": "The story states: \"Il paie avec sa carte bancaire sans contact\" (He pays with his contactless bank card).",
        "explanationBn": "গল্পে স্পষ্ট বলা আছে: সে তার স্পর্শহীন ব্যাংক কার্ড দিয়ে অর্থ প্রদান করে।"
      },
      {
        "question": "Quelle est la direction de la ligne de métro ?",
        "options": [
          "Gare de Lyon",
          "Aéroport Charles de Gaulle",
          "Porte de Clignancourt",
          "La Défense"
        ],
        "answer": 2,
        "explanation": "The text says line 4 goes in the direction of Porte de Clignancourt.",
        "explanationBn": "টেক্সটে উল্লেখ আছে ৪ নম্বর লাইনটি পোর্ত দ্য ক্লিনিয়াঁকুর অভিমুখে যায়।"
      },
      {
        "question": "Quelle station est annoncée par la voix automatique ?",
        "options": [
          "Montparnasse",
          "Châtelet",
          "Bastille",
          "République"
        ],
        "answer": 1,
        "explanation": "The automated voice announces the next station: \"Châtelet\".",
        "explanationBn": "স্বয়ংক্রিয় কণ্ঠ পরবর্তী স্টেশন হিসেবে 'শাতলে' ঘোষণা করে।"
      }
    ]
  },
  {
    "id": "rendez-vous-prefecture",
    "title": "Le rendez-vous pour les papiers",
    "subtitle": "Se présenter à la sous-préfecture avec son dossier",
    "level": "A1",
    "topic": "Démarches administratives",
    "wordCount": 156,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Ce matin, Rahim a un rendez-vous très important à la sous-préfecture. Il prépare une chemise cartonnée avec tous ses documents officiels : son passeport en cours de validité, un justificatif de domicile récent et des photos d'identité conformes.",
      "Rahim arrive quinze minutes avant l'heure fixée. À l'entrée du bâtiment public, un agent de sécurité contrôle son sac et regarde sa convocation papier.",
      "Rahim entre dans le hall d'accueil. Il prend un ticket avec un numéro d'ordre à la borne électronique. Il s'assoit calmement parmi les autres usagers et attend son tour.",
      "Un écran lumineux affiche son numéro : « Ticket A-42, guichet 3 ». Rahim se lève et s'avance vers le guichet avec politesse. Une dame souriante vérifie chaque pièce justificative de son dossier.",
      "La dame tamponne le formulaire officiel et lui remet un récépissé de demande : « Votre dossier est complet monsieur. Ce document provisoire est valable six mois. » Rahim remercie l'agent chaleureusement."
    ],
    "paragraphTranslations": [
      "This morning, Rahim has a very important appointment at the sub-prefecture. He prepares a cardboard folder with all his official documents: his valid passport, a recent proof of address, and compliant identity photos.",
      "Rahim arrives fifteen minutes before the scheduled time. At the entrance of the public building, a security officer checks his bag and looks at his printed summons notice.",
      "Rahim enters the reception hall. He takes a ticket with a sequence number at the electronic kiosk. He sits calmly among the other visitors and waits for his turn.",
      "A lighted screen displays his number: \"Ticket A-42, window 3\". Rahim gets up and walks to the counter politely. A smiling lady checks each supporting document in his file.",
      "The lady stamps the official form and hands him an application receipt: \"Your file is complete sir. This provisional document is valid for six months.\" Rahim thanks the officer warmly."
    ],
    "vocabulary": {
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "rahim": {
        "lemma": "Rahim",
        "en": "Rahim (first name)",
        "bn": "রহিম (নাম)",
        "pos": "noun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "rendez-vous": {
        "lemma": "rendez-vous",
        "en": "appointment / meeting",
        "bn": "সাক্ষাৎ / অ্যাপয়েন্টমেন্ট",
        "pos": "noun"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "important": {
        "lemma": "important",
        "en": "important",
        "bn": "গুরুত্বপূর্ণ",
        "pos": "adjective"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "sous-préfecture": {
        "lemma": "sous-préfecture",
        "en": "sub-prefecture",
        "bn": "সাব-প্রিফেকচার",
        "pos": "noun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "prépare": {
        "lemma": "préparer",
        "en": "prepares",
        "bn": "প্রস্তুত করে",
        "pos": "verb"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "chemise": {
        "lemma": "chemise",
        "en": "shirt / paper folder",
        "bn": "শার্ট / ফাইল ফোল্ডার",
        "pos": "noun"
      },
      "cartonnée": {
        "lemma": "cartonné",
        "en": "made of cardboard / stiff paper",
        "bn": "কার্ডবোর্ডের তৈরি",
        "pos": "adjective"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "tous": {
        "lemma": "tout",
        "en": "all",
        "bn": "সব",
        "pos": "adjective"
      },
      "ses": {
        "lemma": "son",
        "en": "his / her / its (plural)",
        "bn": "তার (বহুবচন)",
        "pos": "pronoun"
      },
      "documents": {
        "lemma": "document",
        "en": "documents",
        "bn": "নথিপত্র",
        "pos": "noun"
      },
      "officiels": {
        "lemma": "officiel",
        "en": "official (plural)",
        "bn": "দাপ্তরিক / অফিসিয়াল",
        "pos": "adjective"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "passeport": {
        "lemma": "passeport",
        "en": "passport",
        "bn": "পাসপোর্ট",
        "pos": "noun"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "cours": {
        "lemma": "cours",
        "en": "class / course / in progress",
        "bn": "ক্লাস / কোর্স / চলমান",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "validité": {
        "lemma": "validité",
        "en": "validity",
        "bn": "বৈধতা / মেয়াদ",
        "pos": "noun"
      },
      "justificatif": {
        "lemma": "justificatif",
        "en": "supporting document / proof",
        "bn": "প্রমাণপত্র / প্রত্যয়ন",
        "pos": "noun"
      },
      "domicile": {
        "lemma": "domicile",
        "en": "home / residence",
        "bn": "বাসস্থান / ঠিকানা",
        "pos": "noun"
      },
      "récent": {
        "lemma": "récent",
        "en": "recent",
        "bn": "সাম্প্রতিক",
        "pos": "adjective"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "photos": {
        "lemma": "photo",
        "en": "photos",
        "bn": "ছবি",
        "pos": "noun"
      },
      "identité": {
        "lemma": "identité",
        "en": "identity",
        "bn": "পরিচয়",
        "pos": "noun"
      },
      "conformes": {
        "lemma": "conforme",
        "en": "compliant (plural)",
        "bn": "যথাযথ",
        "pos": "adjective"
      },
      "rendez": {
        "lemma": "rendre",
        "en": "return / appointment (rendez-vous)",
        "bn": "সাক্ষাৎ / ফেরত দেওয়া",
        "pos": "noun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "sous": {
        "lemma": "sous",
        "en": "under / within (sous 48h)",
        "bn": "নিচে / এর মধ্যে",
        "pos": "preposition"
      },
      "préfecture": {
        "lemma": "préfecture",
        "en": "prefecture (government office)",
        "bn": "প্রিফেকচার (সরকারি অফিস)",
        "pos": "noun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "arrive": {
        "lemma": "arriver",
        "en": "arrives",
        "bn": "পৌঁছায়",
        "pos": "verb"
      },
      "quinze": {
        "lemma": "quinze",
        "en": "fifteen",
        "bn": "পনেরো",
        "pos": "adjective"
      },
      "minutes": {
        "lemma": "minute",
        "en": "minutes",
        "bn": "মিনিট",
        "pos": "noun"
      },
      "avant": {
        "lemma": "avant",
        "en": "before",
        "bn": "আগে",
        "pos": "preposition"
      },
      "heure": {
        "lemma": "heure",
        "en": "hour / time",
        "bn": "ঘণ্টা / সময়",
        "pos": "noun"
      },
      "fixée": {
        "lemma": "fixer",
        "en": "scheduled / fixed (feminine)",
        "bn": "নির্ধারিত",
        "pos": "adjective"
      },
      "entrée": {
        "lemma": "entrée",
        "en": "entrance / starter",
        "bn": "প্রবেশদ্বার",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "bâtiment": {
        "lemma": "bâtiment",
        "en": "building",
        "bn": "ভবন / বিল্ডিং",
        "pos": "noun"
      },
      "public": {
        "lemma": "public",
        "en": "public",
        "bn": "সরকারি / গণ",
        "pos": "adjective"
      },
      "agent": {
        "lemma": "agent",
        "en": "officer / agent",
        "bn": "কর্মকর্তা / কর্মী",
        "pos": "noun"
      },
      "sécurité": {
        "lemma": "sécurité",
        "en": "security",
        "bn": "নিরাপত্তা",
        "pos": "noun"
      },
      "contrôle": {
        "lemma": "contrôler",
        "en": "checks / inspects",
        "bn": "পরীক্ষা করে",
        "pos": "verb"
      },
      "sac": {
        "lemma": "sac",
        "en": "bag / backpack",
        "bn": "ব্যাগ / থলে",
        "pos": "noun"
      },
      "regarde": {
        "lemma": "regarder",
        "en": "looks at / watches",
        "bn": "তাকায়",
        "pos": "verb"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "convocation": {
        "lemma": "convocation",
        "en": "appointment summons letter",
        "bn": "সমন / হাজিরার চিঠি",
        "pos": "noun"
      },
      "papier": {
        "lemma": "papier",
        "en": "paper",
        "bn": "কাগজ",
        "pos": "noun"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "entre": {
        "lemma": "entrer",
        "en": "enters",
        "bn": "প্রবেশ করে",
        "pos": "verb"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "hall": {
        "lemma": "hall",
        "en": "entrance lobby / hall",
        "bn": "প্রবেশ লবি",
        "pos": "noun"
      },
      "accueil": {
        "lemma": "accueil",
        "en": "reception / welcome",
        "bn": "অভ্যর্থনা / স্বাগত",
        "pos": "noun"
      },
      "prend": {
        "lemma": "prendre",
        "en": "takes",
        "bn": "নেয়",
        "pos": "verb"
      },
      "ticket": {
        "lemma": "ticket",
        "en": "ticket / token",
        "bn": "টিকিট / টোকেন",
        "pos": "noun"
      },
      "numéro": {
        "lemma": "numéro",
        "en": "number / ticket number",
        "bn": "নম্বর",
        "pos": "noun"
      },
      "ordre": {
        "lemma": "ordre",
        "en": "order / in order",
        "bn": "ক্রম / শৃঙ্খলা",
        "pos": "noun"
      },
      "borne": {
        "lemma": "borne",
        "en": "terminal / kiosk machine",
        "bn": "মেশিন / কিয়স্ক",
        "pos": "noun"
      },
      "électronique": {
        "lemma": "électronique",
        "en": "electronic",
        "bn": "ইলেকট্রনিক",
        "pos": "adjective"
      },
      "assoit": {
        "lemma": "asseoir",
        "en": "sits",
        "bn": "বসে",
        "pos": "verb"
      },
      "calmement": {
        "lemma": "calmement",
        "en": "calmly",
        "bn": "শান্তভাবে",
        "pos": "adverb"
      },
      "parmi": {
        "lemma": "parmi",
        "en": "among / amidst",
        "bn": "মাঝে / মধ্যে",
        "pos": "preposition"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "autres": {
        "lemma": "autre",
        "en": "other / others",
        "bn": "অন্যান্য / অন্যরা",
        "pos": "adjective"
      },
      "usagers": {
        "lemma": "usager",
        "en": "service users / citizens",
        "bn": "সেবাগ্রহীতা / নাগরিক",
        "pos": "noun"
      },
      "attend": {
        "lemma": "attendre",
        "en": "waits for",
        "bn": "অপেক্ষা করে",
        "pos": "verb"
      },
      "tour": {
        "lemma": "tour",
        "en": "turn (waiting turn)",
        "bn": "পালা / সিরিয়াল",
        "pos": "noun"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "écran": {
        "lemma": "écran",
        "en": "screen / display",
        "bn": "পর্দা / স্ক্রিন",
        "pos": "noun"
      },
      "lumineux": {
        "lemma": "lumineux",
        "en": "bright / luminous",
        "bn": "উজ্জ্বল / আলোকময়",
        "pos": "adjective"
      },
      "affiche": {
        "lemma": "afficher",
        "en": "displays / shows",
        "bn": "প্রদর্শন করে",
        "pos": "verb"
      },
      "a-42": {
        "lemma": "A-42",
        "en": "ticket number A-42",
        "bn": "টিকেট নম্বর এ-৪২",
        "pos": "noun",
        "ttsText": "Ticket A quarante-deux"
      },
      "guichet": {
        "lemma": "guichet",
        "en": "counter / service window",
        "bn": "কাউন্টার / টিকিট জানালা",
        "pos": "noun"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "lève": {
        "lemma": "lever",
        "en": "stands up / rises",
        "bn": "ওঠে",
        "pos": "verb"
      },
      "avance": {
        "lemma": "avance",
        "en": "ahead / early",
        "bn": "আগে",
        "pos": "noun"
      },
      "vers": {
        "lemma": "vers",
        "en": "towards",
        "bn": "দিকে",
        "pos": "preposition"
      },
      "politesse": {
        "lemma": "politesse",
        "en": "courtesy / politeness",
        "bn": "ভদ্রতা / শিষ্টাচার",
        "pos": "noun"
      },
      "dame": {
        "lemma": "dame",
        "en": "lady / woman",
        "bn": "ভদ্রমহিলা",
        "pos": "noun"
      },
      "souriante": {
        "lemma": "souriant",
        "en": "smiling (feminine)",
        "bn": "হাস্যোজ্জ্বল",
        "pos": "adjective"
      },
      "vérifie": {
        "lemma": "vérifier",
        "en": "checks / verifies",
        "bn": "যাচাই করে",
        "pos": "verb"
      },
      "chaque": {
        "lemma": "chaque",
        "en": "each / every",
        "bn": "প্রতিটি",
        "pos": "adjective"
      },
      "pièce": {
        "lemma": "pièce",
        "en": "coin / room",
        "bn": "কয়েন / মুদ্রা",
        "pos": "noun"
      },
      "justificative": {
        "lemma": "justificatif",
        "en": "supporting (piece justificative)",
        "bn": "প্রমাণপত্রমূলক",
        "pos": "adjective"
      },
      "dossier": {
        "lemma": "dossier",
        "en": "application file / folder",
        "bn": "ফাইল / আবেদনপত্র",
        "pos": "noun"
      },
      "tamponne": {
        "lemma": "tamponner",
        "en": "stamps (seal)",
        "bn": "সিলমোহর মারে",
        "pos": "verb"
      },
      "formulaire": {
        "lemma": "formulaire",
        "en": "official form",
        "bn": "ফর্ম / আবেদনপত্র",
        "pos": "noun"
      },
      "officiel": {
        "lemma": "officiel",
        "en": "official",
        "bn": "সরকারি / দাপ্তরিক",
        "pos": "adjective"
      },
      "lui": {
        "lemma": "lui",
        "en": "to him / her",
        "bn": "তাকে",
        "pos": "pronoun"
      },
      "remet": {
        "lemma": "remettre",
        "en": "hands over / gives",
        "bn": "হস্তান্তর করে / দেয়",
        "pos": "verb"
      },
      "récépissé": {
        "lemma": "récépissé",
        "en": "official filing receipt / temporary permit",
        "bn": "প্রাপ্তিস্বীকার রসিদ / সাময়িক সনদ",
        "pos": "noun"
      },
      "demande": {
        "lemma": "demande",
        "en": "request / application",
        "bn": "অনুরোধ / আবেদন",
        "pos": "noun"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "complet": {
        "lemma": "complet",
        "en": "complete / full",
        "bn": "সম্পূর্ণ",
        "pos": "adjective"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "document": {
        "lemma": "document",
        "en": "document",
        "bn": "নথি / দলিল",
        "pos": "noun"
      },
      "provisoire": {
        "lemma": "provisoire",
        "en": "provisional / temporary",
        "bn": "সাময়িক / অস্থায়ী",
        "pos": "adjective"
      },
      "valable": {
        "lemma": "valable",
        "en": "valid",
        "bn": "বৈধ / মেয়াদযুক্ত",
        "pos": "adjective"
      },
      "six": {
        "lemma": "six",
        "en": "six",
        "bn": "ছয়",
        "pos": "adjective"
      },
      "mois": {
        "lemma": "mois",
        "en": "month / months",
        "bn": "মাস",
        "pos": "noun"
      },
      "remercie": {
        "lemma": "remercier",
        "en": "thanks",
        "bn": "ধন্যবাদ জানায়",
        "pos": "verb"
      },
      "chaleureusement": {
        "lemma": "chaleureusement",
        "en": "warmly",
        "bn": "উষ্ণভাবে / আন্তরিকভাবে",
        "pos": "adverb"
      }
    },
    "quiz": [
      {
        "question": "À quelle heure Rahim arrive-t-il à la sous-préfecture ?",
        "options": [
          "En retard de dix minutes",
          "Quinze minutes avant l'heure fixée",
          "Une heure après le rendez-vous",
          "À midi pile"
        ],
        "answer": 1,
        "explanation": "The story states: \"Rahim arrive quinze minutes avant l'heure\" (Rahim arrives 15 minutes before time).",
        "explanationBn": "গল্পে বলা আছে: রহিম নির্ধারিত সময়ের পনেরো মিনিট আগে পৌঁছায়।"
      },
      {
        "question": "À quel guichet Rahim doit-il se présenter ?",
        "options": [
          "Au guichet 1",
          "Au guichet 3",
          "Au guichet 7",
          "Au guichet 12"
        ],
        "answer": 1,
        "explanation": "The electronic display shows: \"Ticket A-42, guichet 3\" (Window / counter 3).",
        "explanationBn": "স্ক্রিনে ভেসে ওঠে: টিকেট এ-৪২, কাউন্টার ৩।"
      },
      {
        "question": "Combien de temps le récépissé provisoire est-il valable ?",
        "options": [
          "Un mois",
          "Trois mois",
          "Six mois",
          "Un an"
        ],
        "answer": 2,
        "explanation": "The administrative officer says: \"Il est valable six mois\" (It is valid for 6 months).",
        "explanationBn": "কর্মকর্তা বলেছেন: এই সাময়িক নথিটি ছয় মাসের জন্য বৈধ।"
      }
    ]
  },
  {
    "id": "au-supermarche",
    "title": "Faire les courses au supermarché",
    "subtitle": "Acheter des produits alimentaires et payer à la caisse",
    "level": "A1",
    "topic": "Vie quotidienne & Achats",
    "wordCount": 163,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Le samedi après-midi, Fahim fait ses courses dans un grand supermarché du centre-ville. Il a une petite liste sur son téléphone portable pour ne rien oublier.",
      "À l'entrée du magasin, Fahim prend un panier rouge. Il commence par le rayon des fruits et légumes frais. Il choisit six bananes jaunes, trois tomates rouges et un sachet de pommes de terre.",
      "Fahim pèse les tomates sur la balance automatique. La machine imprime une étiquette adhésive avec le code-barres et le prix exact. Il colle l'étiquette sur le sac transparent.",
      "Ensuite, Fahim va dans les allées des produits laitiers et de l'épicerie. Il prend deux briques de lait demi-écrémé, une boîte d'œufs frais et un paquet de riz blanc de bonne qualité.",
      "Fahim se dirige vers les caisses. La caissière passe chaque article sous le lecteur optique : « Bip ! Bip ! ». Fahim paie en espèces avec un billet de vingt euros et range ses achats dans un grand sac en toile réutilisable."
    ],
    "paragraphTranslations": [
      "On Saturday afternoon, Fahim does his grocery shopping in a large supermarket downtown. He has a short list on his mobile phone so he forgets nothing.",
      "At the shop entrance, Fahim takes a red basket. He starts with the fresh fruit and vegetable aisle. He chooses six yellow bananas, three red tomatoes, and a bag of potatoes.",
      "Fahim weighs the tomatoes on the automatic scale. The machine prints an adhesive label with the barcode and the exact price. He sticks the label on the clear plastic bag.",
      "Then, Fahim goes to the dairy and dry grocery aisles. He takes two cartons of semi-skimmed milk, a box of fresh eggs, and a packet of good quality white rice.",
      "Fahim heads to the checkouts. The cashier scans each item under the optical reader: \"Beep! Beep!\". Fahim pays in cash with a twenty-euro banknote and packs his groceries into a reusable canvas bag."
    ],
    "vocabulary": {
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "samedi": {
        "lemma": "samedi",
        "en": "Saturday",
        "bn": "শনিবার",
        "pos": "noun"
      },
      "après-midi": {
        "lemma": "après-midi",
        "en": "afternoon",
        "bn": "বিকাল / দুপুর",
        "pos": "noun"
      },
      "fahim": {
        "lemma": "Fahim",
        "en": "Fahim (first name)",
        "bn": "ফাহিম (নাম)",
        "pos": "noun"
      },
      "fait": {
        "lemma": "faire",
        "en": "makes / does / fact",
        "bn": "করে / ঘটনা",
        "pos": "verb"
      },
      "ses": {
        "lemma": "son",
        "en": "his / her / its (plural)",
        "bn": "তার (বহুবচন)",
        "pos": "pronoun"
      },
      "courses": {
        "lemma": "course",
        "en": "shopping / errands",
        "bn": "বাজার / কেনাকাটা",
        "pos": "noun"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "grand": {
        "lemma": "grand",
        "en": "large / big",
        "bn": "বড়",
        "pos": "adjective"
      },
      "supermarché": {
        "lemma": "supermarché",
        "en": "supermarket",
        "bn": "সুপারমার্কেট",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "centre-ville": {
        "lemma": "centre-ville",
        "en": "city centre / downtown",
        "bn": "শহরের কেন্দ্রস্থল",
        "pos": "noun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "petite": {
        "lemma": "petit",
        "en": "small (feminine)",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "liste": {
        "lemma": "liste",
        "en": "list",
        "bn": "তালিকা",
        "pos": "noun"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "téléphone": {
        "lemma": "téléphone",
        "en": "telephone / mobile phone",
        "bn": "টেলিফোন / ফোন",
        "pos": "noun"
      },
      "portable": {
        "lemma": "portable",
        "en": "mobile / laptop",
        "bn": "মোবাইল",
        "pos": "adjective"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "ne": {
        "lemma": "ne",
        "en": "not (part 1)",
        "bn": "না",
        "pos": "adverb"
      },
      "rien": {
        "lemma": "rien",
        "en": "nothing",
        "bn": "কিছু না",
        "pos": "pronoun"
      },
      "oublier": {
        "lemma": "oublier",
        "en": "to forget",
        "bn": "ভুলে যাওয়া",
        "pos": "verb"
      },
      "après": {
        "lemma": "après",
        "en": "after",
        "bn": "পরে",
        "pos": "preposition"
      },
      "midi": {
        "lemma": "midi",
        "en": "midday / noon",
        "bn": "দুপুর / মধ্যাহ্ন",
        "pos": "noun"
      },
      "centre": {
        "lemma": "centre",
        "en": "center",
        "bn": "কেন্দ্র",
        "pos": "noun"
      },
      "ville": {
        "lemma": "ville",
        "en": "city / town",
        "bn": "শহর",
        "pos": "noun"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "entrée": {
        "lemma": "entrée",
        "en": "entrance / starter",
        "bn": "প্রবেশদ্বার",
        "pos": "noun"
      },
      "magasin": {
        "lemma": "magasin",
        "en": "shop / store",
        "bn": "দোকান",
        "pos": "noun"
      },
      "prend": {
        "lemma": "prendre",
        "en": "takes",
        "bn": "নেয়",
        "pos": "verb"
      },
      "panier": {
        "lemma": "panier",
        "en": "shopping basket",
        "bn": "কেনাকাটার ঝুড়ি",
        "pos": "noun"
      },
      "rouge": {
        "lemma": "rouge",
        "en": "red",
        "bn": "লাল",
        "pos": "adjective"
      },
      "commence": {
        "lemma": "commencer",
        "en": "starts / begins",
        "bn": "শুরু হয়",
        "pos": "verb"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "rayon": {
        "lemma": "rayon",
        "en": "supermarket section / aisle",
        "bn": "বিভাগ / সেকশন",
        "pos": "noun"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "fruits": {
        "lemma": "fruit",
        "en": "fruits",
        "bn": "ফলমূল",
        "pos": "noun"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "légumes": {
        "lemma": "légume",
        "en": "vegetables",
        "bn": "শাকসবজি",
        "pos": "noun"
      },
      "frais": {
        "lemma": "frais",
        "en": "fresh / cool",
        "bn": "তাজা / ঠান্ডা",
        "pos": "adjective"
      },
      "choisit": {
        "lemma": "choisir",
        "en": "chooses",
        "bn": "পছন্দ করে",
        "pos": "verb"
      },
      "six": {
        "lemma": "six",
        "en": "six",
        "bn": "ছয়",
        "pos": "adjective"
      },
      "bananes": {
        "lemma": "banane",
        "en": "bananas",
        "bn": "কলা",
        "pos": "noun"
      },
      "jaunes": {
        "lemma": "jaune",
        "en": "yellow (plural)",
        "bn": "হলুদ",
        "pos": "adjective"
      },
      "trois": {
        "lemma": "trois",
        "en": "three",
        "bn": "তিন",
        "pos": "adjective"
      },
      "tomates": {
        "lemma": "tomate",
        "en": "tomatoes",
        "bn": "টমেটো",
        "pos": "noun"
      },
      "rouges": {
        "lemma": "rouge",
        "en": "red (plural)",
        "bn": "লাল",
        "pos": "adjective"
      },
      "sachet": {
        "lemma": "sachet",
        "en": "bag / pouch",
        "bn": "ছোট ব্যাগ / প্যাকেট",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "pommes": {
        "lemma": "pomme",
        "en": "apples / potatoes (pommes de terre)",
        "bn": "আলু / আপেল",
        "pos": "noun"
      },
      "terre": {
        "lemma": "terre",
        "en": "earth / potatoes (pommes de terre)",
        "bn": "মাটি / আলু",
        "pos": "noun"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "pèse": {
        "lemma": "peser",
        "en": "weighs",
        "bn": "ওজন করে",
        "pos": "verb"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "balance": {
        "lemma": "balance",
        "en": "scale / balance",
        "bn": "ওজন মাপার যন্ত্র",
        "pos": "noun"
      },
      "automatique": {
        "lemma": "automatique",
        "en": "automatic",
        "bn": "স্বয়ংক্রিয়",
        "pos": "adjective"
      },
      "machine": {
        "lemma": "machine",
        "en": "machine",
        "bn": "যন্ত্র / মেশিন",
        "pos": "noun"
      },
      "imprime": {
        "lemma": "imprimer",
        "en": "prints",
        "bn": "প্রিন্ট করে",
        "pos": "verb"
      },
      "étiquette": {
        "lemma": "étiquette",
        "en": "label / sticker",
        "bn": "লেবেল / স্টিকার",
        "pos": "noun"
      },
      "adhésive": {
        "lemma": "adhésif",
        "en": "adhesive / sticky",
        "bn": "আঠালো",
        "pos": "adjective"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "code-barres": {
        "lemma": "code-barres",
        "en": "barcode",
        "bn": "বারকোড",
        "pos": "noun"
      },
      "prix": {
        "lemma": "prix",
        "en": "price",
        "bn": "দাম / মূল্য",
        "pos": "noun"
      },
      "exact": {
        "lemma": "exact",
        "en": "exact / accurate",
        "bn": "সঠিক / নির্ভুল",
        "pos": "adjective"
      },
      "colle": {
        "lemma": "coller",
        "en": "sticks / glues",
        "bn": "আঠা দিয়ে লাগায়",
        "pos": "verb"
      },
      "sac": {
        "lemma": "sac",
        "en": "bag / backpack",
        "bn": "ব্যাগ / থলে",
        "pos": "noun"
      },
      "transparent": {
        "lemma": "transparent",
        "en": "transparent / clear",
        "bn": "স্বচ্ছ",
        "pos": "adjective"
      },
      "code": {
        "lemma": "code",
        "en": "PIN code / rule",
        "bn": "কোড / পিন নম্বর",
        "pos": "noun"
      },
      "barres": {
        "lemma": "barre",
        "en": "bars (code-barres)",
        "bn": "বারকোড",
        "pos": "noun"
      },
      "ensuite": {
        "lemma": "ensuite",
        "en": "then / next",
        "bn": "তারপর",
        "pos": "adverb"
      },
      "va": {
        "lemma": "aller",
        "en": "goes",
        "bn": "যায়",
        "pos": "verb"
      },
      "allées": {
        "lemma": "allée",
        "en": "aisles / walkways",
        "bn": "সারি / করিডোর",
        "pos": "noun"
      },
      "produits": {
        "lemma": "produit",
        "en": "products / items",
        "bn": "জিনিসপত্র",
        "pos": "noun"
      },
      "laitiers": {
        "lemma": "laitier",
        "en": "dairy (products)",
        "bn": "দুগ্ধজাত",
        "pos": "adjective"
      },
      "épicerie": {
        "lemma": "épicerie",
        "en": "grocery section",
        "bn": "মুদি দোকান বিভাগ",
        "pos": "noun"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "briques": {
        "lemma": "brique",
        "en": "cartons (of milk)",
        "bn": "দুধের প্যাকেট / কার্টন",
        "pos": "noun"
      },
      "lait": {
        "lemma": "lait",
        "en": "milk",
        "bn": "দুধ",
        "pos": "noun"
      },
      "demi-écrémé": {
        "lemma": "demi-écrémé",
        "en": "semi-skimmed (milk)",
        "bn": "সেমি-স্কিমড (দুধ)",
        "pos": "adjective"
      },
      "boîte": {
        "lemma": "boîte",
        "en": "box",
        "bn": "বাক্স",
        "pos": "noun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "ufs": {
        "lemma": "œuf",
        "en": "eggs (oeufs)",
        "bn": "ডিম",
        "pos": "noun"
      },
      "paquet": {
        "lemma": "paquet",
        "en": "packet / package",
        "bn": "প্যাকেট",
        "pos": "noun"
      },
      "riz": {
        "lemma": "riz",
        "en": "rice",
        "bn": "চাল / ভাত",
        "pos": "noun"
      },
      "blanc": {
        "lemma": "blanc",
        "en": "white (masculine)",
        "bn": "সাদা",
        "pos": "adjective"
      },
      "bonne": {
        "lemma": "bon",
        "en": "good",
        "bn": "ভালো",
        "pos": "adjective"
      },
      "qualité": {
        "lemma": "qualité",
        "en": "quality",
        "bn": "মান / গুণগত মান",
        "pos": "noun"
      },
      "demi": {
        "lemma": "demi",
        "en": "half",
        "bn": "অর্ধেক",
        "pos": "adjective"
      },
      "écrémé": {
        "lemma": "écrémé",
        "en": "semi-skimmed (milk)",
        "bn": "সেমি-স্কিমড (দুধ)",
        "pos": "adjective"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "dirige": {
        "lemma": "diriger",
        "en": "heads towards / directs",
        "bn": "অগ্রসর হয় / যায়",
        "pos": "verb"
      },
      "vers": {
        "lemma": "vers",
        "en": "towards",
        "bn": "দিকে",
        "pos": "preposition"
      },
      "caisses": {
        "lemma": "caisse",
        "en": "checkouts",
        "bn": "ক্যাশ কাউন্টারগুলো",
        "pos": "noun"
      },
      "caissière": {
        "lemma": "caissière",
        "en": "cashier (female)",
        "bn": "মহিলা ক্যাশিয়ার",
        "pos": "noun"
      },
      "passe": {
        "lemma": "passer",
        "en": "passes / goes through",
        "bn": "যায় / অতিক্রম করে",
        "pos": "verb"
      },
      "chaque": {
        "lemma": "chaque",
        "en": "each / every",
        "bn": "প্রতিটি",
        "pos": "adjective"
      },
      "article": {
        "lemma": "article",
        "en": "item / article",
        "bn": "পণ্য / জিনিস",
        "pos": "noun"
      },
      "sous": {
        "lemma": "sous",
        "en": "under / within (sous 48h)",
        "bn": "নিচে / এর মধ্যে",
        "pos": "preposition"
      },
      "lecteur": {
        "lemma": "lecteur",
        "en": "scanner / reader",
        "bn": "স্ক্যানার / রিডার",
        "pos": "noun"
      },
      "optique": {
        "lemma": "optique",
        "en": "optical (scanner)",
        "bn": "অপটিক্যাল / স্ক্যানার",
        "pos": "adjective"
      },
      "bip": {
        "lemma": "bip",
        "en": "beep sound",
        "bn": "বিপ আওয়াজ",
        "pos": "expression"
      },
      "paie": {
        "lemma": "payer",
        "en": "pays / pay slip",
        "bn": "অর্থ প্রদান করে / বেতন",
        "pos": "verb"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "espèces": {
        "lemma": "espèce",
        "en": "cash (en espèces)",
        "bn": "নগদ টাকা",
        "pos": "noun"
      },
      "billet": {
        "lemma": "billet",
        "en": "banknote / ticket",
        "bn": "টাকার নোট / টিকিট",
        "pos": "noun"
      },
      "vingt": {
        "lemma": "vingt",
        "en": "twenty",
        "bn": "বিশ",
        "pos": "adjective"
      },
      "euros": {
        "lemma": "euro",
        "en": "euros",
        "bn": "ইউরো",
        "pos": "noun"
      },
      "range": {
        "lemma": "ranger",
        "en": "packs / puts away",
        "bn": "গুছিয়ে রাখে",
        "pos": "verb"
      },
      "achats": {
        "lemma": "achat",
        "en": "purchases / shopping",
        "bn": "কেনাকাটা / পণ্য",
        "pos": "noun"
      },
      "toile": {
        "lemma": "toile",
        "en": "canvas / fabric",
        "bn": "ক্যানভাস কাপড়ের তৈরি",
        "pos": "noun"
      },
      "réutilisable": {
        "lemma": "réutilisable",
        "en": "reusable",
        "bn": "পুনর্ব্যবহারযোগ্য",
        "pos": "adjective"
      }
    },
    "quiz": [
      {
        "question": "Où Fahim a-t-il écrit sa liste de courses ?",
        "options": [
          "Sur un carnet en papier",
          "Sur son téléphone portable",
          "Sur un ticket de caisse",
          "Il n'a pas de liste"
        ],
        "answer": 1,
        "explanation": "The text says: \"Il a une petite liste sur son téléphone portable\" (He has a shopping list on his phone).",
        "explanationBn": "টেক্সটে বলা আছে: তার মোবাইল ফোনে একটি ছোট তালিকা আছে।"
      },
      {
        "question": "Pourquoi Fahim utilise-t-il la balance automatique ?",
        "options": [
          "Pour vérifier son propre poids",
          "Pour peser les légumes et imprimer l'étiquette",
          "Pour payer ses articles",
          "Pour nettoyer les fruits"
        ],
        "answer": 1,
        "explanation": "Fahim weighs the fruits and vegetables on the automatic scale to print the barcode sticker.",
        "explanationBn": "ফাহিম ওজন মাপার মেশিনে শাকসবজি ওজন করে বারকোড স্টিকার প্রিন্ট করে।"
      },
      {
        "question": "Comment Fahim paie-t-il ses courses à la caisse ?",
        "options": [
          "Par carte bancaire",
          "Par virement",
          "En espèces avec un billet de vingt euros",
          "Avec un chèque"
        ],
        "answer": 2,
        "explanation": "The story states: \"Il paie en espèces avec un billet de vingt euros\" (He pays in cash with a 20-euro banknote).",
        "explanationBn": "গল্পে বলা আছে: সে নগদ বিশ ইউরোর একটি নোট দিয়ে অর্থ প্রদান করে।"
      }
    ]
  },
  {
    "id": "pause-cafe-informatique",
    "title": "La pause café entre collègues",
    "subtitle": "Échanger sur le travail technique pendant la pause du matin",
    "level": "A1",
    "topic": "Travail & Entreprise",
    "wordCount": 171,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Il est dix heures et demie du matin dans les bureaux d'une société informatique. Samir travaille comme technicien support depuis deux semaines. C'est le moment de la pause café pour toute l'équipe technique.",
      "Samir va dans la salle de détente avec son collègue Thomas. La pièce est lumineuse et conviviale. Deux ingénieurs discutent calmement autour de la grande machine à café en métal.",
      "Thomas propose amicalement : « Samir, tu veux un café chaud ou un thé à la menthe ? » Samir répond avec un sourire : « Un café noir sans sucre, s'il te plaît Thomas ! »",
      "Thomas appuie sur le bouton de l'appareil. Le café coule avec une bonne odeur torréfiée. Thomas demande : « Comment se passe ta matinée sur le parc informatique ? »",
      "Samir explique avec enthousiasme : « Très bien ! Ce matin, je résous deux problèmes de réseau local et je change un mot de passe oublié pour un utilisateur. Les collègues sont très accueillants et m'aident quand j'ai une question. »"
    ],
    "paragraphTranslations": [
      "It is half past ten in the morning in the offices of an IT company. Samir has been working as a support technician for two weeks. It is time for the coffee break for the entire technical team.",
      "Samir goes to the break room with his colleague Thomas. The room is bright and friendly. Two engineers are chatting calmly around the large metal coffee machine.",
      "Thomas offers in a friendly way: \"Samir, do you want a hot coffee or a mint tea?\" Samir answers with a smile: \"A black coffee with no sugar, please Thomas!\"",
      "Thomas presses the machine's button. The coffee pours with a good roasted aroma. Thomas asks: \"How is your morning going on the computer workstations?\"",
      "Samir explains enthusiastically: \"Very well! This morning, I resolved two local network issues and changed a forgotten password for a user. The colleagues are very welcoming and help me whenever I have a question.\""
    ],
    "vocabulary": {
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "dix": {
        "lemma": "dix",
        "en": "ten",
        "bn": "দশ",
        "pos": "adjective"
      },
      "heures": {
        "lemma": "heure",
        "en": "hours / o'clock",
        "bn": "ঘণ্টা / টা",
        "pos": "noun"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "demie": {
        "lemma": "demi",
        "en": "half (hour)",
        "bn": "আধ / সাড়ে",
        "pos": "adjective"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "bureaux": {
        "lemma": "bureau",
        "en": "offices",
        "bn": "অফিসসমূহ",
        "pos": "noun"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "société": {
        "lemma": "société",
        "en": "company / society",
        "bn": "কোম্পানি / সমাজ",
        "pos": "noun"
      },
      "informatique": {
        "lemma": "informatique",
        "en": "IT / computing",
        "bn": "আইটি / কম্পিউটার বিজ্ঞান",
        "pos": "noun"
      },
      "samir": {
        "lemma": "Samir",
        "en": "Samir (first name)",
        "bn": "সমীর (নাম)",
        "pos": "noun"
      },
      "travaille": {
        "lemma": "travailler",
        "en": "works",
        "bn": "কাজ করে",
        "pos": "verb"
      },
      "comme": {
        "lemma": "comme",
        "en": "as / like",
        "bn": "হিসেবে",
        "pos": "preposition"
      },
      "technicien": {
        "lemma": "technicien",
        "en": "technician",
        "bn": "টেকনিশিয়ান / কারিগরি কর্মী",
        "pos": "noun"
      },
      "support": {
        "lemma": "support",
        "en": "support (IT)",
        "bn": "আইটি সহায়তা / সাপোর্ট",
        "pos": "noun"
      },
      "depuis": {
        "lemma": "depuis",
        "en": "since / for",
        "bn": "ধরে / যাবত",
        "pos": "preposition"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "semaines": {
        "lemma": "semaine",
        "en": "weeks",
        "bn": "সপ্তাহসমূহ",
        "pos": "noun"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "moment": {
        "lemma": "moment",
        "en": "moment / time",
        "bn": "মুহূর্ত / সময়",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "pause": {
        "lemma": "pause",
        "en": "break / pause",
        "bn": "বিরতি",
        "pos": "noun"
      },
      "café": {
        "lemma": "café",
        "en": "coffee / café",
        "bn": "কফি",
        "pos": "noun"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "toute": {
        "lemma": "tout",
        "en": "all / entire (feminine)",
        "bn": "পুরো / সমস্ত",
        "pos": "adjective"
      },
      "équipe": {
        "lemma": "équipe",
        "en": "team",
        "bn": "দল / টিম",
        "pos": "noun"
      },
      "technique": {
        "lemma": "technique",
        "en": "technical / technique",
        "bn": "কারিগরি / টেকনিক্যাল",
        "pos": "adjective"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "c": {
        "lemma": "ce",
        "en": "it / this (c'est)",
        "bn": "এটা / এই",
        "pos": "pronoun"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "va": {
        "lemma": "aller",
        "en": "goes",
        "bn": "যায়",
        "pos": "verb"
      },
      "salle": {
        "lemma": "salle",
        "en": "room / hall",
        "bn": "কক্ষ / রুম",
        "pos": "noun"
      },
      "détente": {
        "lemma": "détente",
        "en": "relaxation / break",
        "bn": "বিশ্রাম",
        "pos": "noun"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "collègue": {
        "lemma": "collègue",
        "en": "colleague",
        "bn": "সহকর্মী",
        "pos": "noun"
      },
      "thomas": {
        "lemma": "Thomas",
        "en": "Thomas (first name)",
        "bn": "টমাস (নাম)",
        "pos": "noun"
      },
      "pièce": {
        "lemma": "pièce",
        "en": "coin / room",
        "bn": "কয়েন / মুদ্রা",
        "pos": "noun"
      },
      "lumineuse": {
        "lemma": "lumineux",
        "en": "bright (feminine)",
        "bn": "উজ্জ্বল",
        "pos": "adjective"
      },
      "conviviale": {
        "lemma": "convivial",
        "en": "friendly / cozy (feminine)",
        "bn": "আন্তরিক ও প্রফুল্ল",
        "pos": "adjective"
      },
      "ingénieurs": {
        "lemma": "ingénieur",
        "en": "engineers",
        "bn": "প্রকৌশলীবৃন্দ",
        "pos": "noun"
      },
      "discutent": {
        "lemma": "discuter",
        "en": "chat / discuss",
        "bn": "কথা বলে / আলোচনা করে",
        "pos": "verb"
      },
      "calmement": {
        "lemma": "calmement",
        "en": "calmly",
        "bn": "শান্তভাবে",
        "pos": "adverb"
      },
      "autour": {
        "lemma": "autour",
        "en": "around",
        "bn": "চারপাশে / ঘিরে",
        "pos": "preposition"
      },
      "grande": {
        "lemma": "grand",
        "en": "large (feminine)",
        "bn": "বড়",
        "pos": "adjective"
      },
      "machine": {
        "lemma": "machine",
        "en": "machine",
        "bn": "যন্ত্র / মেশিন",
        "pos": "noun"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "métal": {
        "lemma": "métal",
        "en": "metal",
        "bn": "ধাতু",
        "pos": "noun"
      },
      "propose": {
        "lemma": "proposer",
        "en": "offers / suggests",
        "bn": "প্রস্তাব দেয় / প্রদান করে",
        "pos": "verb"
      },
      "amicalement": {
        "lemma": "amicalement",
        "en": "in a friendly manner",
        "bn": "বন্ধুত্বপূর্ণভাবে",
        "pos": "adverb"
      },
      "tu": {
        "lemma": "tu",
        "en": "you (informal)",
        "bn": "তুমি / তুই",
        "pos": "pronoun"
      },
      "veux": {
        "lemma": "vouloir",
        "en": "want (je/tu)",
        "bn": "চাই / চাও",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "chaud": {
        "lemma": "chaud",
        "en": "hot / warm",
        "bn": "গরম",
        "pos": "adjective"
      },
      "ou": {
        "lemma": "ou",
        "en": "or",
        "bn": "অথবা",
        "pos": "conjunction"
      },
      "thé": {
        "lemma": "thé",
        "en": "tea",
        "bn": "চা",
        "pos": "noun"
      },
      "menthe": {
        "lemma": "menthe",
        "en": "mint",
        "bn": "পুদিনা",
        "pos": "noun"
      },
      "répond": {
        "lemma": "répondre",
        "en": "answers / replies",
        "bn": "উত্তর দেয়",
        "pos": "verb"
      },
      "sourire": {
        "lemma": "sourire",
        "en": "smile",
        "bn": "হাসি",
        "pos": "noun"
      },
      "noir": {
        "lemma": "noir",
        "en": "black",
        "bn": "কালো",
        "pos": "adjective"
      },
      "sans": {
        "lemma": "sans",
        "en": "without",
        "bn": "ছাড়া / বিহীন",
        "pos": "preposition"
      },
      "sucre": {
        "lemma": "sucre",
        "en": "sugar",
        "bn": "চিনি",
        "pos": "noun"
      },
      "te": {
        "lemma": "te",
        "en": "you (to you)",
        "bn": "তোমাকে",
        "pos": "pronoun"
      },
      "plaît": {
        "lemma": "plaire",
        "en": "pleases (s'il vous plaît)",
        "bn": "পছন্দ হয় / দয়া করে",
        "pos": "verb"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "appuie": {
        "lemma": "appuyer",
        "en": "presses (a button)",
        "bn": "চাপ দেয়",
        "pos": "verb"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "bouton": {
        "lemma": "bouton",
        "en": "button",
        "bn": "বোতাম / বাটন",
        "pos": "noun"
      },
      "appareil": {
        "lemma": "appareil",
        "en": "device / appliance",
        "bn": "যন্ত্র / ডিভাইস",
        "pos": "noun"
      },
      "coule": {
        "lemma": "couler",
        "en": "pours / flows",
        "bn": "পড়ে / প্রবাহিত হয়",
        "pos": "verb"
      },
      "bonne": {
        "lemma": "bon",
        "en": "good",
        "bn": "ভালো",
        "pos": "adjective"
      },
      "odeur": {
        "lemma": "odeur",
        "en": "smell / aroma",
        "bn": "গন্ধ / সুবাস",
        "pos": "noun"
      },
      "torréfiée": {
        "lemma": "torréfier",
        "en": "roasted (feminine)",
        "bn": "রোস্ট করা",
        "pos": "adjective"
      },
      "demande": {
        "lemma": "demande",
        "en": "request / application",
        "bn": "অনুরোধ / আবেদন",
        "pos": "noun"
      },
      "comment": {
        "lemma": "comment",
        "en": "how / what",
        "bn": "কেমন / কীভাবে / কী",
        "pos": "adverb"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "passe": {
        "lemma": "passer",
        "en": "passes / goes through",
        "bn": "যায় / অতিক্রম করে",
        "pos": "verb"
      },
      "ta": {
        "lemma": "son",
        "en": "your (feminine)",
        "bn": "তোমার",
        "pos": "pronoun"
      },
      "matinée": {
        "lemma": "matinée",
        "en": "morning (duration)",
        "bn": "সকালবেলা",
        "pos": "noun"
      },
      "parc": {
        "lemma": "parc",
        "en": "park / computer workstation pool",
        "bn": "পার্ক / আইটি সিস্টেম পুল",
        "pos": "noun"
      },
      "explique": {
        "lemma": "expliquer",
        "en": "explains",
        "bn": "ব্যাখ্যা করে",
        "pos": "verb"
      },
      "enthousiasme": {
        "lemma": "enthousiasme",
        "en": "enthusiasm",
        "bn": "উদ্দীপনা / উৎসাহ",
        "pos": "noun"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "bien": {
        "lemma": "bien",
        "en": "well / good",
        "bn": "ভালো / ঠিক আছে",
        "pos": "adverb"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "résous": {
        "lemma": "résoudre",
        "en": "resolve / solve",
        "bn": "সমাধান করি",
        "pos": "verb"
      },
      "problèmes": {
        "lemma": "problème",
        "en": "problems / issues",
        "bn": "সমস্যাসমূহ",
        "pos": "noun"
      },
      "réseau": {
        "lemma": "réseau",
        "en": "network",
        "bn": "নেটওয়ার্ক",
        "pos": "noun"
      },
      "local": {
        "lemma": "local",
        "en": "local / storage room",
        "bn": "স্থানীয় / সাধারণ স্টোররুম",
        "pos": "noun"
      },
      "change": {
        "lemma": "changer",
        "en": "change / reset",
        "bn": "পরিবর্তন করি",
        "pos": "verb"
      },
      "mot": {
        "lemma": "mot",
        "en": "word",
        "bn": "শব্দ",
        "pos": "noun"
      },
      "oublié": {
        "lemma": "oublié",
        "en": "forgotten",
        "bn": "ভুলে যাওয়া",
        "pos": "adjective"
      },
      "utilisateur": {
        "lemma": "utilisateur",
        "en": "user (IT user)",
        "bn": "ব্যবহারকারী",
        "pos": "noun"
      },
      "collègues": {
        "lemma": "collègue",
        "en": "colleagues",
        "bn": "সহকর্মীবৃন্দ",
        "pos": "noun"
      },
      "sont": {
        "lemma": "être",
        "en": "are (plural)",
        "bn": "হয় / আছেন",
        "pos": "verb"
      },
      "accueillants": {
        "lemma": "accueillant",
        "en": "welcoming (plural)",
        "bn": "আন্তরিক / বন্ধুবৎসল",
        "pos": "adjective"
      },
      "aident": {
        "lemma": "aider",
        "en": "help (plural)",
        "bn": "সাহায্য করে",
        "pos": "verb"
      },
      "quand": {
        "lemma": "quand",
        "en": "when",
        "bn": "যখন",
        "pos": "conjunction"
      },
      "ai": {
        "lemma": "avoir",
        "en": "have (first person: j'ai)",
        "bn": "আছে (আমার আছে)",
        "pos": "verb"
      },
      "question": {
        "lemma": "question",
        "en": "question",
        "bn": "প্রশ্ন",
        "pos": "noun"
      },
      "m": {
        "lemma": "me",
        "en": "me (elision)",
        "bn": "আমাকে",
        "pos": "pronoun"
      },
      "j": {
        "lemma": "je",
        "en": "I (elision)",
        "bn": "আমি",
        "pos": "pronoun"
      }
    },
    "quiz": [
      {
        "question": "Quel est le métier de Samir dans l'entreprise ?",
        "options": [
          "Directeur général",
          "Technicien support informatique",
          "Comptable",
          "Cuisinier"
        ],
        "answer": 1,
        "explanation": "The story states that Samir works as an IT support technician (\"technicien support\") for two weeks.",
        "explanationBn": "গল্পে বলা আছে যে সমীর দুই সপ্তাহ ধরে আইটি সাপোর্ট টেকনিশিয়ান হিসেবে কাজ করছে।"
      },
      {
        "question": "Quelle boisson Samir choisit-il ?",
        "options": [
          "Un chocolat chaud",
          "Un café sans sucre",
          "Un jus d'orange",
          "Un grand thé sucré"
        ],
        "answer": 1,
        "explanation": "The story mentions: \"Samir prend un café sans sucre\" (Samir takes coffee without sugar).",
        "explanationBn": "গল্পে উল্লেখ আছে: সমীর চিনি ছাড়া একটি ব্ল্যাক কফি নেয়।"
      },
      {
        "question": "Quelles tâches techniques Samir a-t-il faites ce matin ?",
        "options": [
          "Acheter des écrans neufs",
          "Résoudre des problèmes réseau et changer un mot de passe",
          "Nettoyer les bureaux",
          "Faire une livraison"
        ],
        "answer": 1,
        "explanation": "Samir says: \"Ce matin, je résous deux problèmes de réseau et je change un mot de passe oublié\" (Resolved 2 network issues and reset a forgotten password).",
        "explanationBn": "সমীর বলেছে সে দুটি লোকাল নেটওয়ার্ক সমস্যার সমাধান করেছে এবং একটি ভুলে যাওয়া পাসওয়ার্ড রিসেট করেছে।"
      }
    ]
  },
  {
    "id": "chez-le-medecin",
    "title": "Chez le médecin",
    "subtitle": "Expliquer ses symptômes et obtenir une ordonnance",
    "level": "A1",
    "topic": "Santé & Vie quotidienne",
    "wordCount": 214,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Ce matin, Tariq ne se sent pas très bien dans son corps. Il a mal à la gorge depuis hier soir et il a un peu de fièvre. Il prend son téléphone pour réserver un rendez-vous chez le docteur Laurent dans son cabinet médical de quartier.",
      "Tariq arrive à l'heure précise et s'assoit calmement dans la salle d'attente. Quelques minutes plus tard, le médecin ouvre la porte et dit : « Bonjour monsieur, entrez je vous en prie. Asseyez-vous sur ce fauteuil confortable. »",
      "Le docteur pose des questions claires avec gentillesse : « Qu'est-ce qui ne va pas aujourd'hui ? Où avez-vous mal exactement ? » Tariq répond posément : « J'ai de la fièvre, mal à la tête et je tousse beaucoup la nuit. »",
      "Le médecin ausculte Tariq avec son stéthoscope moderne. Il regarde sa gorge rouge et prend sa température avec un petit thermomètre frontal : « Vous avez une petite angine virale. Ne vous inquiétez pas, ce n'est rien de grave. »",
      "Le praticien rédige une ordonnance avec du paracétamol pour calmer la douleur et un sirop doux pour la toux. Il conseille à Tariq de bien boire de l'eau tiède et de rester au lit pendant deux jours. Tariq le remercie chaleureusement et paie avec sa carte bancaire."
    ],
    "paragraphTranslations": [
      "This morning, Tariq does not feel very well in his body. He has had a sore throat since yesterday evening and has a slight fever. He takes his phone to book an appointment with Dr. Laurent in his neighbourhood medical clinic.",
      "Tariq arrives on time and sits down calmly in the waiting room. A few minutes later, the doctor opens the door and says: \"Good morning sir, please come in. Take a seat on this comfortable armchair.\"",
      "The doctor asks clear questions with kindness: \"What seems to be the problem today? Where does it hurt exactly?\" Tariq replies calmly: \"I have a fever, a headache, and I cough a lot at night.\"",
      "The doctor examines Tariq with his modern stethoscope. He looks at his red throat and takes his temperature with a small forehead thermometer: \"You have a mild viral throat infection. Don't worry, it is nothing serious.\"",
      "The practitioner writes a prescription with paracetamol to soothe the pain and a gentle syrup for the cough. He advises Tariq to drink plenty of warm water and stay in bed for two days. Tariq thanks him warmly and pays with his bank card."
    ],
    "vocabulary": {
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "tariq": {
        "lemma": "Tariq",
        "en": "Tariq (first name)",
        "bn": "তারিক (নাম)",
        "pos": "noun"
      },
      "ne": {
        "lemma": "ne",
        "en": "not (part 1)",
        "bn": "না",
        "pos": "adverb"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "sent": {
        "lemma": "sentir",
        "en": "feels",
        "bn": "অনুভব করে",
        "pos": "verb"
      },
      "pas": {
        "lemma": "pas",
        "en": "step / footsteps / not",
        "bn": "পদক্ষেপ / পায়ের আওয়াজ / না",
        "pos": "noun"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "bien": {
        "lemma": "bien",
        "en": "well / good",
        "bn": "ভালো / ঠিক আছে",
        "pos": "adverb"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "corps": {
        "lemma": "corps",
        "en": "body",
        "bn": "শরীর / দেহ",
        "pos": "noun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "mal": {
        "lemma": "mal",
        "en": "pain / difficulty / bad",
        "bn": "ব্যথা / কষ্ট",
        "pos": "noun"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "gorge": {
        "lemma": "gorge",
        "en": "throat",
        "bn": "গলা",
        "pos": "noun"
      },
      "depuis": {
        "lemma": "depuis",
        "en": "since / for",
        "bn": "ধরে / যাবত",
        "pos": "preposition"
      },
      "hier": {
        "lemma": "hier",
        "en": "yesterday",
        "bn": "গতকাল",
        "pos": "adverb"
      },
      "soir": {
        "lemma": "soir",
        "en": "evening",
        "bn": "সন্ধ্যা / রাত",
        "pos": "noun"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "peu": {
        "lemma": "peu",
        "en": "little / slight",
        "bn": "একটু / অল্প",
        "pos": "adverb"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "fièvre": {
        "lemma": "fièvre",
        "en": "fever",
        "bn": "জ্বর",
        "pos": "noun"
      },
      "prend": {
        "lemma": "prendre",
        "en": "takes",
        "bn": "নেয়",
        "pos": "verb"
      },
      "téléphone": {
        "lemma": "téléphone",
        "en": "telephone / mobile phone",
        "bn": "টেলিফোন / ফোন",
        "pos": "noun"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "réserver": {
        "lemma": "réserver",
        "en": "to book / reserve",
        "bn": "বুকিং করা / সময় নেওয়া",
        "pos": "verb"
      },
      "rendez-vous": {
        "lemma": "rendez-vous",
        "en": "appointment / meeting",
        "bn": "সাক্ষাৎ / অ্যাপয়েন্টমেন্ট",
        "pos": "noun"
      },
      "chez": {
        "lemma": "chez",
        "en": "at the place of",
        "bn": "বাসায় / কাছে",
        "pos": "preposition"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "docteur": {
        "lemma": "docteur",
        "en": "doctor",
        "bn": "ডাক্তার",
        "pos": "noun"
      },
      "laurent": {
        "lemma": "Laurent",
        "en": "Laurent (name)",
        "bn": "লরেন্ট (নাম)",
        "pos": "noun"
      },
      "cabinet": {
        "lemma": "cabinet",
        "en": "doctor's surgery / practice",
        "bn": "ডাক্তারখানা / চেম্বার",
        "pos": "noun"
      },
      "médical": {
        "lemma": "médical",
        "en": "medical",
        "bn": "চিকিৎসা সংক্রান্ত",
        "pos": "adjective"
      },
      "quartier": {
        "lemma": "quartier",
        "en": "neighbourhood / district",
        "bn": "মহল্লা / এলাকা",
        "pos": "noun"
      },
      "rendez": {
        "lemma": "rendre",
        "en": "return / appointment (rendez-vous)",
        "bn": "সাক্ষাৎ / ফেরত দেওয়া",
        "pos": "noun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "arrive": {
        "lemma": "arriver",
        "en": "arrives",
        "bn": "পৌঁছায়",
        "pos": "verb"
      },
      "heure": {
        "lemma": "heure",
        "en": "hour / time",
        "bn": "ঘণ্টা / সময়",
        "pos": "noun"
      },
      "précise": {
        "lemma": "préciser",
        "en": "specifies / exact (feminine)",
        "bn": "স্পষ্ট করে বলে / সঠিক",
        "pos": "verb"
      },
      "assoit": {
        "lemma": "asseoir",
        "en": "sits",
        "bn": "বসে",
        "pos": "verb"
      },
      "calmement": {
        "lemma": "calmement",
        "en": "calmly",
        "bn": "শান্তভাবে",
        "pos": "adverb"
      },
      "salle": {
        "lemma": "salle",
        "en": "room / hall",
        "bn": "কক্ষ / রুম",
        "pos": "noun"
      },
      "attente": {
        "lemma": "attente",
        "en": "waiting",
        "bn": "অপেক্ষা",
        "pos": "noun"
      },
      "quelques": {
        "lemma": "quelque",
        "en": "a few / some",
        "bn": "কয়েকটি / কিছু",
        "pos": "adjective"
      },
      "minutes": {
        "lemma": "minute",
        "en": "minutes",
        "bn": "মিনিট",
        "pos": "noun"
      },
      "plus": {
        "lemma": "plus",
        "en": "more / plus",
        "bn": "আরও",
        "pos": "adverb"
      },
      "tard": {
        "lemma": "tard",
        "en": "late (plus tard = later)",
        "bn": "দেরিতে (পরে)",
        "pos": "adverb"
      },
      "médecin": {
        "lemma": "médecin",
        "en": "doctor / physician",
        "bn": "চিকিৎসক / ডাক্তার",
        "pos": "noun"
      },
      "ouvre": {
        "lemma": "ouvrir",
        "en": "opens",
        "bn": "খোলে",
        "pos": "verb"
      },
      "porte": {
        "lemma": "porte",
        "en": "door",
        "bn": "দরজা",
        "pos": "noun"
      },
      "dit": {
        "lemma": "dire",
        "en": "says",
        "bn": "বলে",
        "pos": "verb"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "entrez": {
        "lemma": "entrer",
        "en": "come in / enter (formal)",
        "bn": "আসুন / ভেতরে আসুন",
        "pos": "verb"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "prie": {
        "lemma": "prier",
        "en": "please (je vous en prie)",
        "bn": "দয়া করে আসুন / অনুরোধ",
        "pos": "verb"
      },
      "asseyez-vous": {
        "lemma": "asseoir",
        "en": "take a seat / sit down",
        "bn": "বসুন",
        "pos": "verb"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "fauteuil": {
        "lemma": "fauteuil",
        "en": "armchair",
        "bn": "আরামদায়ক চেয়ার",
        "pos": "noun"
      },
      "confortable": {
        "lemma": "confortable",
        "en": "comfortable",
        "bn": "আরামদায়ক",
        "pos": "adjective"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "asseyez": {
        "lemma": "asseoir",
        "en": "sit (asseyez-vous)",
        "bn": "বসুন",
        "pos": "verb"
      },
      "pose": {
        "lemma": "poser",
        "en": "places / puts / asks",
        "bn": "রাখে / জিজ্ঞেস করে",
        "pos": "verb"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "questions": {
        "lemma": "question",
        "en": "questions",
        "bn": "প্রশ্নসমূহ",
        "pos": "noun"
      },
      "claires": {
        "lemma": "clair",
        "en": "clear (plural)",
        "bn": "সুস্পষ্ট",
        "pos": "adjective"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "gentillesse": {
        "lemma": "gentillesse",
        "en": "kindness",
        "bn": "সদয়তা / ভদ্রতা",
        "pos": "noun"
      },
      "est-ce": {
        "lemma": "est-ce que",
        "en": "is it / (question marker)",
        "bn": "কী / নাকি",
        "pos": "expression"
      },
      "qui": {
        "lemma": "qui",
        "en": "who / which",
        "bn": "যে / কে",
        "pos": "pronoun"
      },
      "va": {
        "lemma": "aller",
        "en": "goes",
        "bn": "যায়",
        "pos": "verb"
      },
      "aujourd'hui": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "où": {
        "lemma": "où",
        "en": "where",
        "bn": "কোথায় / যেখানে",
        "pos": "adverb"
      },
      "avez-vous": {
        "lemma": "avoir",
        "en": "do you have",
        "bn": "আপনার কি আছে",
        "pos": "verb"
      },
      "exactement": {
        "lemma": "exactement",
        "en": "exactly",
        "bn": "ঠিক / নিখুঁতভাবে",
        "pos": "adverb"
      },
      "répond": {
        "lemma": "répondre",
        "en": "answers / replies",
        "bn": "উত্তর দেয়",
        "pos": "verb"
      },
      "posément": {
        "lemma": "posément",
        "en": "composedly / calmly",
        "bn": "ধীরস্থিরভাবে",
        "pos": "adverb"
      },
      "ai": {
        "lemma": "avoir",
        "en": "have (first person: j'ai)",
        "bn": "আছে (আমার আছে)",
        "pos": "verb"
      },
      "tête": {
        "lemma": "tête",
        "en": "head / headache",
        "bn": "মাথা / মাথা ব্যথা",
        "pos": "noun"
      },
      "tousse": {
        "lemma": "tousser",
        "en": "coughs",
        "bn": "কাশি দেয়",
        "pos": "verb"
      },
      "beaucoup": {
        "lemma": "beaucoup",
        "en": "a lot / very much",
        "bn": "অনেক",
        "pos": "adverb"
      },
      "nuit": {
        "lemma": "nuit",
        "en": "night",
        "bn": "রাত",
        "pos": "noun"
      },
      "qu": {
        "lemma": "que",
        "en": "that / what (elision)",
        "bn": "যা / কী",
        "pos": "pronoun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "aujourd": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "hui": {
        "lemma": "aujourd'hui",
        "en": "today (part of aujourd'hui)",
        "bn": "আজ",
        "pos": "adverb"
      },
      "avez": {
        "lemma": "avoir",
        "en": "have (you have)",
        "bn": "আছে (আপনার আছে)",
        "pos": "verb"
      },
      "j": {
        "lemma": "je",
        "en": "I (elision)",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "ausculte": {
        "lemma": "ausculter",
        "en": "examines / listens with stethoscope",
        "bn": "স্টেথোস্কোপ দিয়ে পরীক্ষা করে",
        "pos": "verb"
      },
      "stéthoscope": {
        "lemma": "stéthoscope",
        "en": "stethoscope",
        "bn": "স্টেথোস্কোপ",
        "pos": "noun"
      },
      "moderne": {
        "lemma": "moderne",
        "en": "modern",
        "bn": "আধুনিক",
        "pos": "adjective"
      },
      "regarde": {
        "lemma": "regarder",
        "en": "looks at / watches",
        "bn": "তাকায়",
        "pos": "verb"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "rouge": {
        "lemma": "rouge",
        "en": "red",
        "bn": "লাল",
        "pos": "adjective"
      },
      "température": {
        "lemma": "température",
        "en": "temperature",
        "bn": "তাপমাত্রা",
        "pos": "noun"
      },
      "petit": {
        "lemma": "petit",
        "en": "small / short",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "thermomètre": {
        "lemma": "thermomètre",
        "en": "thermometer",
        "bn": "থার্মোমিটার",
        "pos": "noun"
      },
      "frontal": {
        "lemma": "frontal",
        "en": "forehead (thermometer)",
        "bn": "কপালে ধরার (থার্মোমিটার)",
        "pos": "adjective"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "petite": {
        "lemma": "petit",
        "en": "small (feminine)",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "angine": {
        "lemma": "angine",
        "en": "throat infection / angina",
        "bn": "গলার ইনফেকশন / টনসিল",
        "pos": "noun"
      },
      "virale": {
        "lemma": "viral",
        "en": "viral (infection)",
        "bn": "ভাইরাল",
        "pos": "adjective"
      },
      "inquiétez": {
        "lemma": "inquiéter",
        "en": "worry (ne vous inquiétez pas)",
        "bn": "চিন্তা করবেন না",
        "pos": "verb"
      },
      "rien": {
        "lemma": "rien",
        "en": "nothing",
        "bn": "কিছু না",
        "pos": "pronoun"
      },
      "grave": {
        "lemma": "grave",
        "en": "serious / severe",
        "bn": "গুরুতর",
        "pos": "adjective"
      },
      "n": {
        "lemma": "ne",
        "en": "not (elision)",
        "bn": "না",
        "pos": "adverb"
      },
      "praticien": {
        "lemma": "praticien",
        "en": "medical practitioner / doctor",
        "bn": "চিকিৎসক",
        "pos": "noun"
      },
      "rédige": {
        "lemma": "rédiger",
        "en": "writes / drafts (prescription)",
        "bn": "লেখে / প্রস্তুত করে",
        "pos": "verb"
      },
      "ordonnance": {
        "lemma": "ordonnance",
        "en": "prescription",
        "bn": "প্রেসক্রিপশন / ব্যবস্থাপত্র",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "paracétamol": {
        "lemma": "paracétamol",
        "en": "paracetamol",
        "bn": "প্যারাসিটামল",
        "pos": "noun"
      },
      "calmer": {
        "lemma": "calmer",
        "en": "to soothe / calm down",
        "bn": "উপশম করা / শান্ত করা",
        "pos": "verb"
      },
      "douleur": {
        "lemma": "douleur",
        "en": "pain / ache",
        "bn": "ব্যথা / যন্ত্রণা",
        "pos": "noun"
      },
      "sirop": {
        "lemma": "sirop",
        "en": "cough syrup",
        "bn": "কাশির সিরাপ",
        "pos": "noun"
      },
      "doux": {
        "lemma": "doux",
        "en": "gentle / sweet / mild",
        "bn": "মৃদু / মিষ্টি",
        "pos": "adjective"
      },
      "toux": {
        "lemma": "toux",
        "en": "cough",
        "bn": "কাশি",
        "pos": "noun"
      },
      "conseille": {
        "lemma": "conseiller",
        "en": "advises / recommends",
        "bn": "পরামর্শ দেয়",
        "pos": "verb"
      },
      "boire": {
        "lemma": "boire",
        "en": "to drink",
        "bn": "পান করা",
        "pos": "verb"
      },
      "eau": {
        "lemma": "eau",
        "en": "water",
        "bn": "পানি",
        "pos": "noun"
      },
      "tiède": {
        "lemma": "tiède",
        "en": "lukewarm / warm",
        "bn": "কুসুম গরম",
        "pos": "adjective"
      },
      "rester": {
        "lemma": "rester",
        "en": "to stay / remain",
        "bn": "থাকা",
        "pos": "verb"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "lit": {
        "lemma": "lire",
        "en": "reads / bed",
        "bn": "পড়ে / বিছানা",
        "pos": "verb"
      },
      "pendant": {
        "lemma": "pendant",
        "en": "during",
        "bn": "চলাকালীন / সময়ে",
        "pos": "preposition"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "jours": {
        "lemma": "jour",
        "en": "days",
        "bn": "দিনগুলো",
        "pos": "noun"
      },
      "remercie": {
        "lemma": "remercier",
        "en": "thanks",
        "bn": "ধন্যবাদ জানায়",
        "pos": "verb"
      },
      "chaleureusement": {
        "lemma": "chaleureusement",
        "en": "warmly",
        "bn": "উষ্ণভাবে / আন্তরিকভাবে",
        "pos": "adverb"
      },
      "paie": {
        "lemma": "payer",
        "en": "pays / pay slip",
        "bn": "অর্থ প্রদান করে / বেতন",
        "pos": "verb"
      },
      "carte": {
        "lemma": "carte",
        "en": "card / menu",
        "bn": "কার্ড / মেনু",
        "pos": "noun"
      },
      "bancaire": {
        "lemma": "bancaire",
        "en": "banking / bank-related",
        "bn": "ব্যাংক সংক্রান্ত",
        "pos": "adjective"
      }
    },
    "quiz": [
      {
        "question": "De quoi souffre Tariq dans cette histoire ?",
        "options": [
          "D'une jambe cassée",
          "D'une angine virale avec de la fièvre",
          "D'un mal de dents",
          "D'une allergie alimentaire"
        ],
        "answer": 1,
        "explanation": "The doctor examines him and diagnoses: \"Vous avez une petite angine virale\" (You have a mild viral throat infection).",
        "explanationBn": "ডাক্তার তাকে পরীক্ষা করে জানান যে তার সামান্য ভাইরাল অ্যানজাইনা বা গলার সংক্রমণ হয়েছে।"
      },
      {
        "question": "Quels médicaments le docteur prescrit-il sur l'ordonnance ?",
        "options": [
          "Des antibiotiques forts",
          "Du paracétamol et un sirop pour la toux",
          "Des vitamines seulement",
          "Des somnifères"
        ],
        "answer": 1,
        "explanation": "The text states: \"Le docteur rédige une ordonnance avec du paracétamol et un sirop pour la toux\".",
        "explanationBn": "টেক্সটে বলা আছে: ডাক্তার প্যারাসিটামল এবং কাশির সিরাপের প্রেসক্রিপশন লিখেছেন।"
      },
      {
        "question": "Que conseille le médecin pour guérir vite ?",
        "options": [
          "Faire du sport intensif",
          "Boire de l'eau tiède et se reposer au lit deux jours",
          "Manger des glaces froides",
          "Prendre le train"
        ],
        "answer": 1,
        "explanation": "The doctor advises Tariq to drink warm water and stay in bed for two days (\"boire de l'eau tiède et de rester au lit pendant deux jours\").",
        "explanationBn": "ডাক্তার কুসুম গরম পানি পান করতে এবং দুই দিন বিছানায় বিশ্রাম নিতে পরামর্শ দেন।"
      }
    ]
  },
  {
    "id": "au-restaurant",
    "title": "Au restaurant",
    "subtitle": "Commander un plat du jour et une carafe d'eau",
    "level": "A1",
    "topic": "Restauration & Vie quotidienne",
    "wordCount": 208,
    "estimatedMinutes": 3,
    "paragraphs": [
      "À midi, Kabir a très faim après son cours de français intensif. Il entre dans une petite brasserie conviviale près de la mairie. La salle est propre et les tables en bois sont élégamment dressées.",
      "Le serveur s'approche avec un carnet et un menu imprimé : « Bonjour monsieur, vous êtes seul pour déjeuner ? Choisissez une jolie table près de la grande fenêtre. » Kabir s'installe confortablement et pose son manteau.",
      "Le serveur revient rapidement : « Avez-vous choisi votre repas ? Qu'est-ce qui vous ferait plaisir aujourd'hui ? » Kabir regarde l'ardoise murale et répond : « Oui, je voudrais la formule du midi avec le plat du jour, s'il vous plaît. »",
      "Le serveur précise le menu : « Parfait. Aujourd'hui, notre chef prépare un délicieux poulet rôti avec du riz blanc parfumé et des légumes de saison. Et pour la boisson ? » Kabir demande poliment : « Une carafe d'eau fraîche, s'il vous plaît. »",
      "Le repas arrive fumant sur la table. La viande est tendre et savoureuse. À la fin du repas, Kabir fait un petit signe discret au serveur : « Excusez-moi monsieur, l'addition s'il vous plaît. » Kabir paie par carte bancaire et laisse une pièce de monnaie comme pourboire."
    ],
    "paragraphTranslations": [
      "At noon, Kabir is very hungry after his intensive French class. He enters a friendly little brasserie near the town hall. The room is clean and the wooden tables are elegantly set.",
      "The waiter comes over with a notepad and a printed menu: \"Good day sir, are you alone for lunch? Pick a nice table near the big window.\" Kabir settles in comfortably and puts down his coat.",
      "The waiter returns quickly: \"Have you chosen your meal? What would you like today?\" Kabir looks at the chalkboard menu on the wall and answers: \"Yes, I would like the lunch deal with the dish of the day, please.\"",
      "The waiter details the menu: \"Perfect. Today, our chef is preparing delicious roast chicken with fragrant white rice and seasonal vegetables. And for the drink?\" Kabir asks politely: \"A pitcher of fresh tap water, please.\"",
      "The meal arrives steaming on the table. The meat is tender and tasty. At the end of the meal, Kabir makes a small discreet sign to the waiter: \"Excuse me sir, the bill please.\" Kabir pays by bank card and leaves a coin as a tip."
    ],
    "vocabulary": {
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "midi": {
        "lemma": "midi",
        "en": "midday / noon",
        "bn": "দুপুর / মধ্যাহ্ন",
        "pos": "noun"
      },
      "kabir": {
        "lemma": "Kabir",
        "en": "Kabir (first name)",
        "bn": "কবীর (নাম)",
        "pos": "noun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "faim": {
        "lemma": "faim",
        "en": "hunger",
        "bn": "ক্ষুধা",
        "pos": "noun"
      },
      "après": {
        "lemma": "après",
        "en": "after",
        "bn": "পরে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "cours": {
        "lemma": "cours",
        "en": "class / course / in progress",
        "bn": "ক্লাস / কোর্স / চলমান",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "français": {
        "lemma": "français",
        "en": "French",
        "bn": "ফরাসি",
        "pos": "noun"
      },
      "intensif": {
        "lemma": "intensif",
        "en": "intensive",
        "bn": "নিবিড় / গভীর",
        "pos": "adjective"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "entre": {
        "lemma": "entrer",
        "en": "enters",
        "bn": "প্রবেশ করে",
        "pos": "verb"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "petite": {
        "lemma": "petit",
        "en": "small (feminine)",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "brasserie": {
        "lemma": "brasserie",
        "en": "brasserie / casual French restaurant",
        "bn": "ফরাসি রেস্তোরাঁ",
        "pos": "noun"
      },
      "conviviale": {
        "lemma": "convivial",
        "en": "friendly / cozy (feminine)",
        "bn": "আন্তরিক ও প্রফুল্ল",
        "pos": "adjective"
      },
      "près": {
        "lemma": "près",
        "en": "near / close to",
        "bn": "কাছে / নিকটে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "mairie": {
        "lemma": "mairie",
        "en": "town hall / mayor's office",
        "bn": "পৌরসভা / টাউন হল",
        "pos": "noun"
      },
      "salle": {
        "lemma": "salle",
        "en": "room / hall",
        "bn": "কক্ষ / রুম",
        "pos": "noun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "propre": {
        "lemma": "propre",
        "en": "clean / own",
        "bn": "পরিষ্কার / নিজস্ব",
        "pos": "adjective"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "tables": {
        "lemma": "table",
        "en": "tables",
        "bn": "টেবিলগুলো",
        "pos": "noun"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "bois": {
        "lemma": "bois",
        "en": "wood",
        "bn": "কাঠ",
        "pos": "noun"
      },
      "sont": {
        "lemma": "être",
        "en": "are (plural)",
        "bn": "হয় / আছেন",
        "pos": "verb"
      },
      "élégamment": {
        "lemma": "élégamment",
        "en": "elegantly",
        "bn": "মার্জিতভাবে",
        "pos": "adverb"
      },
      "dressées": {
        "lemma": "dresser",
        "en": "set (tables plural)",
        "bn": "সাজানো",
        "pos": "adjective"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "serveur": {
        "lemma": "serveur",
        "en": "waiter / server",
        "bn": "ওয়েটার / পরিবেশক",
        "pos": "noun"
      },
      "approche": {
        "lemma": "approcher",
        "en": "approaches / comes closer",
        "bn": "কাছে আসে",
        "pos": "verb"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "carnet": {
        "lemma": "carnet",
        "en": "notebook / notepad",
        "bn": "নোটবুক / খাতা",
        "pos": "noun"
      },
      "menu": {
        "lemma": "menu",
        "en": "menu",
        "bn": "খাবার তালিকা / মেনু",
        "pos": "noun"
      },
      "imprimé": {
        "lemma": "imprimer",
        "en": "printed",
        "bn": "মুদ্রিত / প্রিন্ট করা",
        "pos": "adjective"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "êtes": {
        "lemma": "être",
        "en": "are (vous)",
        "bn": "হন / আছেন",
        "pos": "verb"
      },
      "seul": {
        "lemma": "seul",
        "en": "alone / single",
        "bn": "একা",
        "pos": "adjective"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "déjeuner": {
        "lemma": "déjeuner",
        "en": "lunch / to have lunch",
        "bn": "দুপুরের খাবার",
        "pos": "noun"
      },
      "choisissez": {
        "lemma": "choisir",
        "en": "choose (formal)",
        "bn": "পছন্দ করুন",
        "pos": "verb"
      },
      "jolie": {
        "lemma": "joli",
        "en": "pretty (feminine)",
        "bn": "সুন্দর",
        "pos": "adjective"
      },
      "table": {
        "lemma": "table",
        "en": "table",
        "bn": "টেবিল",
        "pos": "noun"
      },
      "grande": {
        "lemma": "grand",
        "en": "large (feminine)",
        "bn": "বড়",
        "pos": "adjective"
      },
      "fenêtre": {
        "lemma": "fenêtre",
        "en": "window",
        "bn": "জানালা",
        "pos": "noun"
      },
      "installe": {
        "lemma": "installer",
        "en": "settles in / installs",
        "bn": "বসে / ইনস্টল করে",
        "pos": "verb"
      },
      "confortablement": {
        "lemma": "confortablement",
        "en": "comfortably",
        "bn": "আরামদায়কভাবে",
        "pos": "adverb"
      },
      "pose": {
        "lemma": "poser",
        "en": "places / puts / asks",
        "bn": "রাখে / জিজ্ঞেস করে",
        "pos": "verb"
      },
      "manteau": {
        "lemma": "manteau",
        "en": "coat / overcoat",
        "bn": "কোট / ওভারকোট",
        "pos": "noun"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "revient": {
        "lemma": "revenir",
        "en": "comes back / returns",
        "bn": "ফিরে আসে",
        "pos": "verb"
      },
      "rapidement": {
        "lemma": "rapidement",
        "en": "promptly / quickly",
        "bn": "দ্রুততার সাথে",
        "pos": "adverb"
      },
      "avez-vous": {
        "lemma": "avoir",
        "en": "do you have",
        "bn": "আপনার কি আছে",
        "pos": "verb"
      },
      "choisi": {
        "lemma": "choisir",
        "en": "chosen",
        "bn": "পছন্দ করেছে",
        "pos": "verb"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "repas": {
        "lemma": "repas",
        "en": "meal",
        "bn": "খাবার",
        "pos": "noun"
      },
      "est-ce": {
        "lemma": "est-ce que",
        "en": "is it / (question marker)",
        "bn": "কী / নাকি",
        "pos": "expression"
      },
      "qui": {
        "lemma": "qui",
        "en": "who / which",
        "bn": "যে / কে",
        "pos": "pronoun"
      },
      "ferait": {
        "lemma": "faire",
        "en": "would do / please (plaisir)",
        "bn": "করবে / পছন্দ হবে",
        "pos": "verb"
      },
      "plaisir": {
        "lemma": "plaisir",
        "en": "pleasure",
        "bn": "আনন্দ (avec plaisir = আনন্দের সাথে)",
        "pos": "noun"
      },
      "aujourd'hui": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "regarde": {
        "lemma": "regarder",
        "en": "looks at / watches",
        "bn": "তাকায়",
        "pos": "verb"
      },
      "ardoise": {
        "lemma": "ardoise",
        "en": "chalkboard / slate menu",
        "bn": "কালো স্লেট বোর্ড / মেন্যু বোর্ড",
        "pos": "noun"
      },
      "murale": {
        "lemma": "mural",
        "en": "wall-mounted / on the wall",
        "bn": "দেয়ালে ঝুলানো",
        "pos": "adjective"
      },
      "répond": {
        "lemma": "répondre",
        "en": "answers / replies",
        "bn": "উত্তর দেয়",
        "pos": "verb"
      },
      "oui": {
        "lemma": "oui",
        "en": "yes",
        "bn": "হ্যাঁ",
        "pos": "expression"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "voudrais": {
        "lemma": "vouloir",
        "en": "would like",
        "bn": "চাই / নিতে চাই",
        "pos": "verb"
      },
      "formule": {
        "lemma": "formule",
        "en": "set deal / package",
        "bn": "প্যাকেজ / সেট মেনু",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "plat": {
        "lemma": "plat",
        "en": "dish / main course",
        "bn": "খাবারের পদ / ডিশ",
        "pos": "noun"
      },
      "jour": {
        "lemma": "jour",
        "en": "day",
        "bn": "দিন",
        "pos": "noun"
      },
      "plaît": {
        "lemma": "plaire",
        "en": "pleases (s'il vous plaît)",
        "bn": "পছন্দ হয় / দয়া করে",
        "pos": "verb"
      },
      "avez": {
        "lemma": "avoir",
        "en": "have (you have)",
        "bn": "আছে (আপনার আছে)",
        "pos": "verb"
      },
      "qu": {
        "lemma": "que",
        "en": "that / what (elision)",
        "bn": "যা / কী",
        "pos": "pronoun"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "aujourd": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "hui": {
        "lemma": "aujourd'hui",
        "en": "today (part of aujourd'hui)",
        "bn": "আজ",
        "pos": "adverb"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "précise": {
        "lemma": "préciser",
        "en": "specifies / exact (feminine)",
        "bn": "স্পষ্ট করে বলে / সঠিক",
        "pos": "verb"
      },
      "parfait": {
        "lemma": "parfait",
        "en": "perfect",
        "bn": "নিখুঁত / চমৎকার",
        "pos": "adjective"
      },
      "notre": {
        "lemma": "notre",
        "en": "our",
        "bn": "আমাদের",
        "pos": "pronoun"
      },
      "chef": {
        "lemma": "chef",
        "en": "chef / boss",
        "bn": "প্রধান বাবুর্চি / প্রধান",
        "pos": "noun"
      },
      "prépare": {
        "lemma": "préparer",
        "en": "prepares",
        "bn": "প্রস্তুত করে",
        "pos": "verb"
      },
      "délicieux": {
        "lemma": "délicieux",
        "en": "delicious",
        "bn": "সুস্বাদু / মজাদার",
        "pos": "adjective"
      },
      "poulet": {
        "lemma": "poulet",
        "en": "chicken",
        "bn": "মুরগির মাংস",
        "pos": "noun"
      },
      "rôti": {
        "lemma": "rôtir",
        "en": "roasted",
        "bn": "রোস্ট করা",
        "pos": "adjective"
      },
      "riz": {
        "lemma": "riz",
        "en": "rice",
        "bn": "চাল / ভাত",
        "pos": "noun"
      },
      "blanc": {
        "lemma": "blanc",
        "en": "white (masculine)",
        "bn": "সাদা",
        "pos": "adjective"
      },
      "parfumé": {
        "lemma": "parfumer",
        "en": "fragrant / scented",
        "bn": "সুগন্ধযুক্ত",
        "pos": "adjective"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "légumes": {
        "lemma": "légume",
        "en": "vegetables",
        "bn": "শাকসবজি",
        "pos": "noun"
      },
      "saison": {
        "lemma": "saison",
        "en": "season",
        "bn": "ঋতু / মৌসুম",
        "pos": "noun"
      },
      "boisson": {
        "lemma": "boisson",
        "en": "drink / beverage",
        "bn": "পানীয়",
        "pos": "noun"
      },
      "demande": {
        "lemma": "demande",
        "en": "request / application",
        "bn": "অনুরোধ / আবেদন",
        "pos": "noun"
      },
      "poliment": {
        "lemma": "poliment",
        "en": "politely",
        "bn": "ভদ্রভাবে",
        "pos": "adverb"
      },
      "carafe": {
        "lemma": "carafe",
        "en": "pitcher / water jug",
        "bn": "পানির জগ",
        "pos": "noun"
      },
      "eau": {
        "lemma": "eau",
        "en": "water",
        "bn": "পানি",
        "pos": "noun"
      },
      "fraîche": {
        "lemma": "frais",
        "en": "fresh / cool (feminine)",
        "bn": "তাজা / ঠান্ডা",
        "pos": "adjective"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "arrive": {
        "lemma": "arriver",
        "en": "arrives",
        "bn": "পৌঁছায়",
        "pos": "verb"
      },
      "fumant": {
        "lemma": "fumer",
        "en": "steaming hot",
        "bn": "ধোঁয়া ওঠা গরম",
        "pos": "adjective"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "viande": {
        "lemma": "viande",
        "en": "meat",
        "bn": "মাংস",
        "pos": "noun"
      },
      "tendre": {
        "lemma": "tendre",
        "en": "tender / soft",
        "bn": "নরম / কোমল",
        "pos": "adjective"
      },
      "savoureuse": {
        "lemma": "savoureux",
        "en": "tasty / flavourful",
        "bn": "সুস্বাদু",
        "pos": "adjective"
      },
      "fin": {
        "lemma": "fin",
        "en": "end",
        "bn": "শেষ",
        "pos": "noun"
      },
      "fait": {
        "lemma": "faire",
        "en": "makes / does / fact",
        "bn": "করে / ঘটনা",
        "pos": "verb"
      },
      "petit": {
        "lemma": "petit",
        "en": "small / short",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "signe": {
        "lemma": "signe",
        "en": "sign / signal",
        "bn": "ইশারা / সংকেত",
        "pos": "noun"
      },
      "discret": {
        "lemma": "discret",
        "en": "discreet",
        "bn": "বিচক্ষণ / শান্ত",
        "pos": "adjective"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "excusez-moi": {
        "lemma": "excuser",
        "en": "excuse me",
        "bn": "মাফ করবেন",
        "pos": "expression"
      },
      "addition": {
        "lemma": "addition",
        "en": "restaurant bill",
        "bn": "খাবারের বিল",
        "pos": "noun"
      },
      "paie": {
        "lemma": "payer",
        "en": "pays / pay slip",
        "bn": "অর্থ প্রদান করে / বেতন",
        "pos": "verb"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "carte": {
        "lemma": "carte",
        "en": "card / menu",
        "bn": "কার্ড / মেনু",
        "pos": "noun"
      },
      "bancaire": {
        "lemma": "bancaire",
        "en": "banking / bank-related",
        "bn": "ব্যাংক সংক্রান্ত",
        "pos": "adjective"
      },
      "laisse": {
        "lemma": "laisser",
        "en": "leaves (behind)",
        "bn": "রেখে যায়",
        "pos": "verb"
      },
      "pièce": {
        "lemma": "pièce",
        "en": "coin / room",
        "bn": "কয়েন / মুদ্রা",
        "pos": "noun"
      },
      "monnaie": {
        "lemma": "monnaie",
        "en": "change / currency",
        "bn": "ভাঙতি টাকা / মুদ্রা",
        "pos": "noun"
      },
      "comme": {
        "lemma": "comme",
        "en": "as / like",
        "bn": "হিসেবে",
        "pos": "preposition"
      },
      "pourboire": {
        "lemma": "pourboire",
        "en": "tip / gratuity",
        "bn": "বকশিশ / টিপস",
        "pos": "noun"
      },
      "excusez": {
        "lemma": "excuser",
        "en": "excuse (excusez-moi)",
        "bn": "ক্ষমা করবেন",
        "pos": "verb"
      },
      "moi": {
        "lemma": "moi",
        "en": "me",
        "bn": "আমাকে / আমি",
        "pos": "pronoun"
      }
    },
    "quiz": [
      {
        "question": "Quel plat Kabir choisit-il pour son déjeuner ?",
        "options": [
          "Un plat de pâtes au fromage",
          "Le plat du jour : poulet rôti avec du riz et légumes",
          "Une pizza quatre saisons",
          "Un bol de soupe froide"
        ],
        "answer": 1,
        "explanation": "The waiter describes the dish of the day: \"notre chef prépare un délicieux poulet rôti avec du riz blanc et des légumes\".",
        "explanationBn": "ওয়েটার দিনের প্রধান খাবার সম্পর্কে জানায়: শেফ রোস্ট চিকেন সাথে সাদা ভাত ও শাকসবজি তৈরি করেছেন।"
      },
      {
        "question": "Quelle boisson Kabir demande-t-il au serveur ?",
        "options": [
          "Un soda très sucré",
          "Une bouteille de jus d'orange",
          "Une carafe d'eau fraîche",
          "Un café glacé"
        ],
        "answer": 2,
        "explanation": "Kabir requests: \"Une carafe d'eau fraîche, s'il vous plaît\" (A pitcher of cool tap water, please).",
        "explanationBn": "কবীর বিনীতভাবে এক জগ ঠান্ডা সাধারণ খাবার পানি চেয়েছেন।"
      },
      {
        "question": "Que laisse Kabir sur la table avant de partir ?",
        "options": [
          "Son téléphone portable",
          "Une pièce de monnaie pour le pourboire",
          "Son écharpe en laine",
          "Son parapluie"
        ],
        "answer": 1,
        "explanation": "The text states: \"Kabir paie par carte bancaire et laisse une pièce de monnaie comme pourboire\" (leaves a coin as a tip).",
        "explanationBn": "টেক্সটে বলা আছে: কবীর বকশিশ (tips) হিসেবে টেবিলে একটি মুদ্রা রেখে যায়।"
      }
    ]
  },
  {
    "id": "a-la-pharmacie",
    "title": "À la pharmacie",
    "subtitle": "Présenter une ordonnance et demander conseil",
    "level": "A1",
    "topic": "Santé & Achats",
    "wordCount": 194,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Rahim sort du cabinet médical avec son ordonnance pliée dans la poche de sa veste. Dans l'avenue principale, il aperçoit la grande croix verte lumineuse qui indique une pharmacie de garde ouverte.",
      "Les portes vitrées s'ouvrent silencieusement. Rahim entre dans une officine claire, propre et impeccablement rangée. Deux préparatrices en pharmacie vêtues d'une blouse blanche accueillent les clients derrière le comptoir vitré.",
      "Une pharmacienne sourit aimablement à Rahim : « Bonjour monsieur, comment puis-je vous aider ce matin ? » Rahim pose son document médical sur le comptoir : « Bonjour madame, voici l'ordonnance que le docteur vient de me donner. »",
      "La professionnelle lit la prescription avec attention. Elle va chercher les boîtes requises dans les tiroirs métalliques : « Voici votre paracétamol et votre sirop. Prenez un comprimé trois fois par jour après les repas, et une cuillère de sirop le soir avant de dormir. »",
      "Elle écrit la posologie clairement au feutre noir sur le carton de chaque médicament. Rahim présente sa carte Vitale et règle le reste à payer. La pharmacienne met tout dans un petit sachet en papier : « Bon rétablissement monsieur ! » Rahim la remercie poliment."
    ],
    "paragraphTranslations": [
      "Rahim leaves the doctor's office with his prescription folded in his jacket pocket. Along the main avenue, he spots the large illuminated green cross that indicates an open duty pharmacy.",
      "The glass sliding doors open silently. Rahim enters a bright, clean, and impeccably organized pharmacy store. Two pharmacy assistants in white coats welcome customers behind the glass counter.",
      "A pharmacist smiles kindly at Rahim: \"Good morning sir, how may I help you this morning?\" Rahim places his medical document on the counter: \"Good morning ma'am, here is the prescription the doctor just gave me.\"",
      "The professional reads the prescription carefully. She retrieves the required boxes from the metal drawers: \"Here is your paracetamol and your syrup. Take one tablet three times a day after meals, and a spoonful of syrup in the evening before sleeping.\"",
      "She writes the dosage clearly with a black felt pen on each medicine box. Rahim presents his health insurance card (carte Vitale) and pays the remaining amount. The pharmacist places everything into a small paper bag: \"Get well soon sir!\" Rahim thanks her politely."
    ],
    "vocabulary": {
      "rahim": {
        "lemma": "Rahim",
        "en": "Rahim (first name)",
        "bn": "রহিম (নাম)",
        "pos": "noun"
      },
      "sort": {
        "lemma": "sortir",
        "en": "comes out / exits",
        "bn": "বের হয়",
        "pos": "verb"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "cabinet": {
        "lemma": "cabinet",
        "en": "doctor's surgery / practice",
        "bn": "ডাক্তারখানা / চেম্বার",
        "pos": "noun"
      },
      "médical": {
        "lemma": "médical",
        "en": "medical",
        "bn": "চিকিৎসা সংক্রান্ত",
        "pos": "adjective"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "ordonnance": {
        "lemma": "ordonnance",
        "en": "prescription",
        "bn": "প্রেসক্রিপশন / ব্যবস্থাপত্র",
        "pos": "noun"
      },
      "pliée": {
        "lemma": "plier",
        "en": "folded",
        "bn": "ভাঁজ করা",
        "pos": "adjective"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "poche": {
        "lemma": "poche",
        "en": "pocket",
        "bn": "পকেট",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "veste": {
        "lemma": "veste",
        "en": "jacket",
        "bn": "জ্যাকেট / কোট",
        "pos": "noun"
      },
      "avenue": {
        "lemma": "avenue",
        "en": "avenue / wide street",
        "bn": "প্রধান প্রশস্ত রাস্তা",
        "pos": "noun"
      },
      "principale": {
        "lemma": "principal",
        "en": "main / principal",
        "bn": "প্রধান",
        "pos": "adjective"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "aperçoit": {
        "lemma": "apercevoir",
        "en": "spots / notices / catches sight of",
        "bn": "দেখতে পায় / চোখে পড়ে",
        "pos": "verb"
      },
      "grande": {
        "lemma": "grand",
        "en": "large (feminine)",
        "bn": "বড়",
        "pos": "adjective"
      },
      "croix": {
        "lemma": "croix",
        "en": "cross",
        "bn": "ক্রস চিহ্ন",
        "pos": "noun"
      },
      "verte": {
        "lemma": "vert",
        "en": "green (feminine)",
        "bn": "সবুজ",
        "pos": "adjective"
      },
      "lumineuse": {
        "lemma": "lumineux",
        "en": "bright (feminine)",
        "bn": "উজ্জ্বল",
        "pos": "adjective"
      },
      "qui": {
        "lemma": "qui",
        "en": "who / which",
        "bn": "যে / কে",
        "pos": "pronoun"
      },
      "indique": {
        "lemma": "indiquer",
        "en": "indicates / shows",
        "bn": "নির্দেশ করে",
        "pos": "verb"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "pharmacie": {
        "lemma": "pharmacie",
        "en": "pharmacy / chemist",
        "bn": "ফার্মেসি / ওষুধের দোকান",
        "pos": "noun"
      },
      "garde": {
        "lemma": "garde",
        "en": "duty (pharmacie de garde)",
        "bn": "ডিউটি / জরুরি সেবা",
        "pos": "noun"
      },
      "ouverte": {
        "lemma": "ouvert",
        "en": "open (feminine)",
        "bn": "খোলা",
        "pos": "adjective"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "portes": {
        "lemma": "porte",
        "en": "doors",
        "bn": "দরজাগুলো",
        "pos": "noun"
      },
      "vitrées": {
        "lemma": "vitré",
        "en": "glass (doors)",
        "bn": "কাঁচের তৈরি",
        "pos": "adjective"
      },
      "ouvrent": {
        "lemma": "ouvrir",
        "en": "open (plural)",
        "bn": "খোলে",
        "pos": "verb"
      },
      "silencieusement": {
        "lemma": "silencieusement",
        "en": "silently",
        "bn": "নীরবে",
        "pos": "adverb"
      },
      "entre": {
        "lemma": "entrer",
        "en": "enters",
        "bn": "প্রবেশ করে",
        "pos": "verb"
      },
      "officine": {
        "lemma": "officine",
        "en": "dispensary / pharmacy premises",
        "bn": "ফার্মেসি দোকান / ডিসপেনসারি",
        "pos": "noun"
      },
      "claire": {
        "lemma": "clair",
        "en": "clear (feminine)",
        "bn": "পরিষ্কার / সুস্পষ্ট",
        "pos": "adjective"
      },
      "propre": {
        "lemma": "propre",
        "en": "clean / own",
        "bn": "পরিষ্কার / নিজস্ব",
        "pos": "adjective"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "impeccablement": {
        "lemma": "impeccablement",
        "en": "impeccably",
        "bn": "নিখুঁতভাবে",
        "pos": "adverb"
      },
      "rangée": {
        "lemma": "ranger",
        "en": "tidy / organized",
        "bn": "পরিপাটি / সাজানো",
        "pos": "adjective"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "préparatrices": {
        "lemma": "préparateur",
        "en": "pharmacy assistants",
        "bn": "ফার্মেসি সহকারীগণ",
        "pos": "noun"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "vêtues": {
        "lemma": "vêtir",
        "en": "dressed (feminine plural)",
        "bn": "পরিহিত / পোশাক পরিধানকারী",
        "pos": "adjective"
      },
      "blouse": {
        "lemma": "blouse",
        "en": "lab coat / medical coat",
        "bn": "মেডিকেল কোট / অ্যাপ্রোন",
        "pos": "noun"
      },
      "blanche": {
        "lemma": "blanc",
        "en": "white (feminine)",
        "bn": "সাদা",
        "pos": "adjective"
      },
      "accueillent": {
        "lemma": "accueillir",
        "en": "welcome (plural)",
        "bn": "স্বাগত জানায়",
        "pos": "verb"
      },
      "clients": {
        "lemma": "client",
        "en": "customers",
        "bn": "গ্রাহকগণ",
        "pos": "noun"
      },
      "derrière": {
        "lemma": "derrière",
        "en": "behind",
        "bn": "পেছনে",
        "pos": "preposition"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "comptoir": {
        "lemma": "comptoir",
        "en": "counter",
        "bn": "কাউন্টার",
        "pos": "noun"
      },
      "vitré": {
        "lemma": "vitré",
        "en": "glass (counter)",
        "bn": "কাঁচের",
        "pos": "adjective"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "pharmacienne": {
        "lemma": "pharmacien",
        "en": "pharmacist (female)",
        "bn": "ফার্মাসিস্ট (মহিলা)",
        "pos": "noun"
      },
      "sourit": {
        "lemma": "sourire",
        "en": "smiles",
        "bn": "হাসে",
        "pos": "verb"
      },
      "aimablement": {
        "lemma": "aimablement",
        "en": "kindly / pleasantly",
        "bn": "অমায়িকতার সাথে",
        "pos": "adverb"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "comment": {
        "lemma": "comment",
        "en": "how / what",
        "bn": "কেমন / কীভাবে / কী",
        "pos": "adverb"
      },
      "puis-je": {
        "lemma": "pouvoir",
        "en": "may I / can I",
        "bn": "আমি কি পারি",
        "pos": "verb"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "aider": {
        "lemma": "aider",
        "en": "to help / assist",
        "bn": "সাহায্য করা",
        "pos": "verb"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "pose": {
        "lemma": "poser",
        "en": "places / puts / asks",
        "bn": "রাখে / জিজ্ঞেস করে",
        "pos": "verb"
      },
      "document": {
        "lemma": "document",
        "en": "document",
        "bn": "নথি / দলিল",
        "pos": "noun"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "madame": {
        "lemma": "madame",
        "en": "madam / ma'am",
        "bn": "ম্যাডাম / বেগম",
        "pos": "noun"
      },
      "voici": {
        "lemma": "voici",
        "en": "here is / here are",
        "bn": "এই যে / এখানে",
        "pos": "preposition"
      },
      "que": {
        "lemma": "que",
        "en": "that / what",
        "bn": "কী / যে",
        "pos": "pronoun"
      },
      "docteur": {
        "lemma": "docteur",
        "en": "doctor",
        "bn": "ডাক্তার",
        "pos": "noun"
      },
      "vient": {
        "lemma": "venir",
        "en": "comes / has just (vient de)",
        "bn": "আসে / এইমাত্র",
        "pos": "verb"
      },
      "me": {
        "lemma": "me",
        "en": "me / to me",
        "bn": "আমাকে",
        "pos": "pronoun"
      },
      "donner": {
        "lemma": "donner",
        "en": "to give",
        "bn": "দেওয়া",
        "pos": "verb"
      },
      "puis": {
        "lemma": "puis",
        "en": "then",
        "bn": "তারপর",
        "pos": "adverb"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "professionnelle": {
        "lemma": "professionnel",
        "en": "professional (feminine)",
        "bn": "পেশাদার",
        "pos": "adjective"
      },
      "lit": {
        "lemma": "lire",
        "en": "reads / bed",
        "bn": "পড়ে / বিছানা",
        "pos": "verb"
      },
      "prescription": {
        "lemma": "prescription",
        "en": "medical prescription",
        "bn": "প্রেসক্রিপশন / নির্দেশপত্র",
        "pos": "noun"
      },
      "attention": {
        "lemma": "attention",
        "en": "attention / care",
        "bn": "মনোযোগ",
        "pos": "noun"
      },
      "elle": {
        "lemma": "elle",
        "en": "she",
        "bn": "সে (মহিলা)",
        "pos": "pronoun"
      },
      "va": {
        "lemma": "aller",
        "en": "goes",
        "bn": "যায়",
        "pos": "verb"
      },
      "chercher": {
        "lemma": "chercher",
        "en": "to look for / fetch",
        "bn": "খোঁজা / নিয়ে আসা",
        "pos": "verb"
      },
      "boîtes": {
        "lemma": "boîte",
        "en": "boxes / mailboxes",
        "bn": "বাক্সগুলো / চিঠির বাক্স",
        "pos": "noun"
      },
      "requises": {
        "lemma": "requis",
        "en": "required (plural)",
        "bn": "প্রয়োজনীয় / আবশ্যকীয়",
        "pos": "adjective"
      },
      "tiroirs": {
        "lemma": "tiroir",
        "en": "drawers",
        "bn": "ড্রয়ারসমূহ",
        "pos": "noun"
      },
      "métalliques": {
        "lemma": "métallique",
        "en": "metallic (plural)",
        "bn": "ধাতব",
        "pos": "adjective"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "paracétamol": {
        "lemma": "paracétamol",
        "en": "paracetamol",
        "bn": "প্যারাসিটামল",
        "pos": "noun"
      },
      "sirop": {
        "lemma": "sirop",
        "en": "cough syrup",
        "bn": "কাশির সিরাপ",
        "pos": "noun"
      },
      "prenez": {
        "lemma": "prendre",
        "en": "take (imperative/formal)",
        "bn": "নিন / গ্রহণ করুন",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "comprimé": {
        "lemma": "comprimé",
        "en": "tablet / pill",
        "bn": "ট্যাবলেট / বড়ি",
        "pos": "noun"
      },
      "trois": {
        "lemma": "trois",
        "en": "three",
        "bn": "তিন",
        "pos": "adjective"
      },
      "fois": {
        "lemma": "fois",
        "en": "time / times (trois fois)",
        "bn": "বার (তিন বার)",
        "pos": "noun"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "jour": {
        "lemma": "jour",
        "en": "day",
        "bn": "দিন",
        "pos": "noun"
      },
      "après": {
        "lemma": "après",
        "en": "after",
        "bn": "পরে",
        "pos": "preposition"
      },
      "repas": {
        "lemma": "repas",
        "en": "meal",
        "bn": "খাবার",
        "pos": "noun"
      },
      "cuillère": {
        "lemma": "cuillère",
        "en": "spoon / spoonful",
        "bn": "চামচ / এক চামচ",
        "pos": "noun"
      },
      "soir": {
        "lemma": "soir",
        "en": "evening",
        "bn": "সন্ধ্যা / রাত",
        "pos": "noun"
      },
      "avant": {
        "lemma": "avant",
        "en": "before",
        "bn": "আগে",
        "pos": "preposition"
      },
      "dormir": {
        "lemma": "dormir",
        "en": "to sleep",
        "bn": "ঘুমানো",
        "pos": "verb"
      },
      "écrit": {
        "lemma": "écrire",
        "en": "writes / written",
        "bn": "লেখে / লিখিত",
        "pos": "verb"
      },
      "posologie": {
        "lemma": "posologie",
        "en": "dosage / medicine instructions",
        "bn": "ওষুধ সেবনের নিয়ম ও মাত্রা",
        "pos": "noun"
      },
      "clairement": {
        "lemma": "clairement",
        "en": "clearly",
        "bn": "পরিষ্কারভাবে / স্পষ্টভাবে",
        "pos": "adverb"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "feutre": {
        "lemma": "feutre",
        "en": "felt pen / marker",
        "bn": "মার্কার কলম",
        "pos": "noun"
      },
      "noir": {
        "lemma": "noir",
        "en": "black",
        "bn": "কালো",
        "pos": "adjective"
      },
      "carton": {
        "lemma": "carton",
        "en": "cardboard box",
        "bn": "কার্ডবোর্ড / শক্ত কাগজ",
        "pos": "noun"
      },
      "chaque": {
        "lemma": "chaque",
        "en": "each / every",
        "bn": "প্রতিটি",
        "pos": "adjective"
      },
      "médicament": {
        "lemma": "médicament",
        "en": "medicine / drug",
        "bn": "ওষুধ",
        "pos": "noun"
      },
      "présente": {
        "lemma": "présenter",
        "en": "presents / introduces",
        "bn": "উপস্থাপন করে",
        "pos": "verb"
      },
      "carte": {
        "lemma": "carte",
        "en": "card / menu",
        "bn": "কার্ড / মেনু",
        "pos": "noun"
      },
      "vitale": {
        "lemma": "vital",
        "en": "vital (carte Vitale: French healthcare card)",
        "bn": "ফরাসি স্বাস্থ্যসেবা কার্ড",
        "pos": "adjective"
      },
      "règle": {
        "lemma": "régler",
        "en": "pays / settles / adjusts",
        "bn": "পরিশোধ করে / মেটায়",
        "pos": "verb"
      },
      "reste": {
        "lemma": "reste",
        "en": "remainder / balance / stays",
        "bn": "অবশিষ্টাংশ / থাকে",
        "pos": "noun"
      },
      "payer": {
        "lemma": "payer",
        "en": "to pay",
        "bn": "টাকা দেওয়া / পরিশোধ করা",
        "pos": "verb"
      },
      "met": {
        "lemma": "mettre",
        "en": "puts",
        "bn": "রাখে",
        "pos": "verb"
      },
      "tout": {
        "lemma": "tout",
        "en": "all / everything",
        "bn": "সবকিছু",
        "pos": "pronoun"
      },
      "petit": {
        "lemma": "petit",
        "en": "small / short",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "sachet": {
        "lemma": "sachet",
        "en": "bag / pouch",
        "bn": "ছোট ব্যাগ / প্যাকেট",
        "pos": "noun"
      },
      "papier": {
        "lemma": "papier",
        "en": "paper",
        "bn": "কাগজ",
        "pos": "noun"
      },
      "bon": {
        "lemma": "bon",
        "en": "good / fine",
        "bn": "ঠিক / ভালো",
        "pos": "adjective"
      },
      "rétablissement": {
        "lemma": "rétablissement",
        "en": "recovery (bon rétablissement)",
        "bn": "আরোগ্য / সুস্থতা",
        "pos": "noun"
      },
      "remercie": {
        "lemma": "remercier",
        "en": "thanks",
        "bn": "ধন্যবাদ জানায়",
        "pos": "verb"
      },
      "poliment": {
        "lemma": "poliment",
        "en": "politely",
        "bn": "ভদ্রভাবে",
        "pos": "adverb"
      }
    },
    "quiz": [
      {
        "question": "Quel signe visuel indique l'emplacement de la pharmacie dans la rue ?",
        "options": [
          "Un panneau rouge avec un cercle",
          "Une grande croix verte lumineuse",
          "Un drapeau bleu et blanc",
          "Une horloge dorée"
        ],
        "answer": 1,
        "explanation": "The story mentions: \"il aperçoit la grande croix verte lumineuse qui indique une pharmacie\".",
        "explanationBn": "গল্পে উল্লেখ আছে: সে একটি বড় আলোকিত সবুজ ক্রস দেখতে পায় যা ফার্মেসি নির্দেশ করে।"
      },
      {
        "question": "Comment Rahim doit-il prendre ses comprimés de paracétamol ?",
        "options": [
          "À jeun le matin",
          "Un comprimé trois fois par jour après les repas",
          "Deux comprimés avant de courir",
          "Une seule fois par semaine"
        ],
        "answer": 1,
        "explanation": "The pharmacist explains: \"Prenez un comprimé trois fois par jour après les repas\".",
        "explanationBn": "ফার্মাসিস্ট বুঝিয়ে বলেন: খাবারের পর দিনে তিনবার একটি করে ট্যাবলেট খাবেন।"
      },
      {
        "question": "Quelle carte Rahim présente-t-il avec son moyen de paiement ?",
        "options": [
          "Sa carte de bibliothèque",
          "Sa carte de transport Navigo",
          "Sa carte Vitale",
          "Sa carte étudiante étrangère"
        ],
        "answer": 2,
        "explanation": "The text states: \"Rahim présente sa carte Vitale et règle le reste à payer\".",
        "explanationBn": "টেক্সটে বলা হয়েছে: রহিম তার স্বাস্থ্যসেবা কার্ড (carte Vitale) জমা দেয়।"
      }
    ]
  },
  {
    "id": "acheter-carte-sim",
    "title": "Acheter une carte SIM",
    "subtitle": "Choisir un forfait mobile prépayé dans une boutique",
    "level": "A1",
    "topic": "Téléphonie & Vie pratique",
    "wordCount": 193,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Fahim vient d'arriver en France pour poursuivre ses études supérieures. Sa première priorité pratique est d'obtenir un numéro de téléphone mobile français et une bonne connexion internet pour contacter ses proches et s'orienter dans la ville.",
      "Il se rend dans une boutique d'opérateur téléphonique située dans une grande galerie marchande. Un conseiller commercial souriant s'avance vers lui : « Bonjour monsieur ! Bienvenue dans notre boutique. Que désirez-vous aujourd'hui ? »",
      "Fahim expose son besoin avec simplicité : « Bonjour. Je cherche une carte SIM prépayée sans engagement de durée, avec une bonne quantité de données internet pour mon smartphone. »",
      "Le vendeur consulte les forfaits disponibles sur son écran tactile : « Nous avons une formule idéale à quinze euros par mois. Vous avez les appels illimités en France et cinquante gigaoctets de données 4G et 5G. » Fahim trouve cette offre tout à fait adaptée à son budget.",
      "Le conseiller demande une pièce d'identité officielle. Fahim présente son passeport original. En quelques minutes, le vendeur active la ligne téléphonique et insère la puce nano-SIM dans l'appareil. Fahim compose le numéro de son frère pour essayer : la tonalité sonne immédiatement !"
    ],
    "paragraphTranslations": [
      "Fahim has just arrived in France to pursue his higher education studies. His first practical priority is getting a French mobile phone number and a reliable internet connection to stay in touch with his family and navigate the city.",
      "He goes to a telecom operator store located inside a large shopping mall. A smiling sales advisor approaches him: \"Hello sir! Welcome to our store. What are you looking for today?\"",
      "Fahim explains his need straightforwardly: \"Hello. I am looking for a prepaid SIM card with no contract commitment, featuring a generous amount of mobile internet data for my smartphone.\"",
      "The salesman checks the available plans on his touch screen: \"We have an ideal package for fifteen euros per month. You get unlimited calls in France and fifty gigabytes of 4G and 5G data.\" Fahim finds this offer completely suited to his budget.",
      "The advisor asks for an official piece of identification. Fahim presents his original passport. Within minutes, the salesman activates the phone line and inserts the nano-SIM chip into the device. Fahim dials his brother's number to test: the ringtone sounds right away!"
    ],
    "vocabulary": {
      "fahim": {
        "lemma": "Fahim",
        "en": "Fahim (first name)",
        "bn": "ফাহিম (নাম)",
        "pos": "noun"
      },
      "vient": {
        "lemma": "venir",
        "en": "comes / has just (vient de)",
        "bn": "আসে / এইমাত্র",
        "pos": "verb"
      },
      "arriver": {
        "lemma": "arriver",
        "en": "to arrive",
        "bn": "পৌঁছানো",
        "pos": "verb"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "france": {
        "lemma": "France",
        "en": "France",
        "bn": "ফ্রান্স",
        "pos": "noun"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "poursuivre": {
        "lemma": "poursuivre",
        "en": "to pursue / continue",
        "bn": "অব্যাহত রাখা / চালিয়ে যাওয়া",
        "pos": "verb"
      },
      "ses": {
        "lemma": "son",
        "en": "his / her / its (plural)",
        "bn": "তার (বহুবচন)",
        "pos": "pronoun"
      },
      "études": {
        "lemma": "étude",
        "en": "studies / degree",
        "bn": "পড়াশোনা / উচ্চশিক্ষা",
        "pos": "noun"
      },
      "supérieures": {
        "lemma": "supérieur",
        "en": "higher (education)",
        "bn": "উচ্চ (শিক্ষা)",
        "pos": "adjective"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "première": {
        "lemma": "premier",
        "en": "first (feminine)",
        "bn": "প্রথম",
        "pos": "adjective"
      },
      "priorité": {
        "lemma": "priorité",
        "en": "priority",
        "bn": "অগ্রাধিকার",
        "pos": "noun"
      },
      "pratique": {
        "lemma": "pratique",
        "en": "practical / practice",
        "bn": "বাস্তবমুখী / ব্যবহারিক",
        "pos": "adjective"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "obtenir": {
        "lemma": "obtenir",
        "en": "to obtain / get",
        "bn": "পাওয়া / অর্জন করা",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "numéro": {
        "lemma": "numéro",
        "en": "number / ticket number",
        "bn": "নম্বর",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "téléphone": {
        "lemma": "téléphone",
        "en": "telephone / mobile phone",
        "bn": "টেলিফোন / ফোন",
        "pos": "noun"
      },
      "mobile": {
        "lemma": "mobile",
        "en": "mobile (phone/network)",
        "bn": "মোবাইল",
        "pos": "adjective"
      },
      "français": {
        "lemma": "français",
        "en": "French",
        "bn": "ফরাসি",
        "pos": "noun"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "bonne": {
        "lemma": "bon",
        "en": "good",
        "bn": "ভালো",
        "pos": "adjective"
      },
      "connexion": {
        "lemma": "connexion",
        "en": "internet connection",
        "bn": "সংযোগ / কানেকশন",
        "pos": "noun"
      },
      "internet": {
        "lemma": "internet",
        "en": "internet",
        "bn": "ইন্টারনেট",
        "pos": "noun"
      },
      "contacter": {
        "lemma": "contacter",
        "en": "to contact",
        "bn": "যোগাযোগ করা",
        "pos": "verb"
      },
      "proches": {
        "lemma": "proche",
        "en": "close relatives / family",
        "bn": "নিকটাত্মীয় / পরিবার",
        "pos": "noun"
      },
      "orienter": {
        "lemma": "orienter",
        "en": "to find one's way / navigate",
        "bn": "দিক ঠিক করা / পথ খোঁজা",
        "pos": "verb"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "ville": {
        "lemma": "ville",
        "en": "city / town",
        "bn": "শহর",
        "pos": "noun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "rend": {
        "lemma": "rendre",
        "en": "returns / gives back",
        "bn": "ফেরত দেয়",
        "pos": "verb"
      },
      "boutique": {
        "lemma": "boutique",
        "en": "store / boutique",
        "bn": "দোকান",
        "pos": "noun"
      },
      "opérateur": {
        "lemma": "opérateur",
        "en": "telecom operator",
        "bn": "টেলিকম অপারেটর",
        "pos": "noun"
      },
      "téléphonique": {
        "lemma": "téléphonique",
        "en": "telephone (line)",
        "bn": "টেলিফোন সংক্রান্ত",
        "pos": "adjective"
      },
      "située": {
        "lemma": "situer",
        "en": "located / situated",
        "bn": "অবস্থিত",
        "pos": "adjective"
      },
      "grande": {
        "lemma": "grand",
        "en": "large (feminine)",
        "bn": "বড়",
        "pos": "adjective"
      },
      "galerie": {
        "lemma": "galerie",
        "en": "shopping mall / gallery",
        "bn": "মার্কেট / গ্যালারি",
        "pos": "noun"
      },
      "marchande": {
        "lemma": "marchand",
        "en": "commercial (mall)",
        "bn": "বাণিজ্যিক",
        "pos": "adjective"
      },
      "conseiller": {
        "lemma": "conseiller",
        "en": "advisor / counselor",
        "bn": "পরামর্শক / কর্মকর্তা",
        "pos": "noun"
      },
      "commercial": {
        "lemma": "commercial",
        "en": "sales / commercial",
        "bn": "বাণিজ্যিক / বিক্রয় প্রতিনিধি",
        "pos": "adjective"
      },
      "souriant": {
        "lemma": "sourire",
        "en": "smiling",
        "bn": "হেসে",
        "pos": "verb"
      },
      "avance": {
        "lemma": "avance",
        "en": "ahead / early",
        "bn": "আগে",
        "pos": "noun"
      },
      "vers": {
        "lemma": "vers",
        "en": "towards",
        "bn": "দিকে",
        "pos": "preposition"
      },
      "lui": {
        "lemma": "lui",
        "en": "to him / her",
        "bn": "তাকে",
        "pos": "pronoun"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "bienvenue": {
        "lemma": "bienvenue",
        "en": "welcome",
        "bn": "স্বাগতম",
        "pos": "expression"
      },
      "notre": {
        "lemma": "notre",
        "en": "our",
        "bn": "আমাদের",
        "pos": "pronoun"
      },
      "que": {
        "lemma": "que",
        "en": "that / what",
        "bn": "কী / যে",
        "pos": "pronoun"
      },
      "désirez-vous": {
        "lemma": "désirer",
        "en": "would you like",
        "bn": "আপনি কি চান",
        "pos": "verb"
      },
      "aujourd'hui": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "désirez": {
        "lemma": "désirer",
        "en": "desire / want",
        "bn": "চান",
        "pos": "verb"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "aujourd": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "hui": {
        "lemma": "aujourd'hui",
        "en": "today (part of aujourd'hui)",
        "bn": "আজ",
        "pos": "adverb"
      },
      "expose": {
        "lemma": "exposer",
        "en": "lays out / states",
        "bn": "তুলে ধরে",
        "pos": "verb"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "besoin": {
        "lemma": "besoin",
        "en": "need",
        "bn": "প্রয়োজন",
        "pos": "noun"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "simplicité": {
        "lemma": "simplicité",
        "en": "simplicity",
        "bn": "সরলতা / অনাড়ম্বর",
        "pos": "noun"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "cherche": {
        "lemma": "chercher",
        "en": "searches / looks for",
        "bn": "খোঁজে",
        "pos": "verb"
      },
      "carte": {
        "lemma": "carte",
        "en": "card / menu",
        "bn": "কার্ড / মেনু",
        "pos": "noun"
      },
      "sim": {
        "lemma": "SIM",
        "en": "SIM card",
        "bn": "সিম কার্ড",
        "pos": "noun"
      },
      "prépayée": {
        "lemma": "prépayé",
        "en": "prepaid",
        "bn": "প্রিপেইড",
        "pos": "adjective"
      },
      "sans": {
        "lemma": "sans",
        "en": "without",
        "bn": "ছাড়া / বিহীন",
        "pos": "preposition"
      },
      "engagement": {
        "lemma": "engagement",
        "en": "commitment / contract obligation",
        "bn": "চুক্তিবদ্ধতা / বাধ্যবাধকতা",
        "pos": "noun"
      },
      "durée": {
        "lemma": "durée",
        "en": "duration / length",
        "bn": "মেয়াদ / সময়কাল",
        "pos": "noun"
      },
      "quantité": {
        "lemma": "quantité",
        "en": "quantity / amount",
        "bn": "পরিমাণ",
        "pos": "noun"
      },
      "données": {
        "lemma": "donnée",
        "en": "data (gigabytes)",
        "bn": "মোবাইল ডেটা / ইন্টারনেট",
        "pos": "noun"
      },
      "mon": {
        "lemma": "son",
        "en": "my (masculine)",
        "bn": "আমার",
        "pos": "pronoun"
      },
      "smartphone": {
        "lemma": "smartphone",
        "en": "smartphone",
        "bn": "স্মার্টফোন",
        "pos": "noun"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "vendeur": {
        "lemma": "vendeur",
        "en": "salesperson / clerk",
        "bn": "বিক্রেতা",
        "pos": "noun"
      },
      "consulte": {
        "lemma": "consulter",
        "en": "checks / consults",
        "bn": "দেখে / পরামর্শ নেয়",
        "pos": "verb"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "forfaits": {
        "lemma": "forfait",
        "en": "mobile plans",
        "bn": "মোবাইল প্যাকেজসমূহ",
        "pos": "noun"
      },
      "disponibles": {
        "lemma": "disponible",
        "en": "available (plural)",
        "bn": "উপলব্ধ",
        "pos": "adjective"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "écran": {
        "lemma": "écran",
        "en": "screen / display",
        "bn": "পর্দা / স্ক্রিন",
        "pos": "noun"
      },
      "tactile": {
        "lemma": "tactile",
        "en": "touch (screen)",
        "bn": "স্পর্শকাতর / টাচস্ক্রিন",
        "pos": "adjective"
      },
      "nous": {
        "lemma": "nous",
        "en": "we / us",
        "bn": "আমরা / আমাদের",
        "pos": "pronoun"
      },
      "avons": {
        "lemma": "avoir",
        "en": "have (we have)",
        "bn": "আছে (আমাদের আছে)",
        "pos": "verb"
      },
      "formule": {
        "lemma": "formule",
        "en": "set deal / package",
        "bn": "প্যাকেজ / সেট মেনু",
        "pos": "noun"
      },
      "idéale": {
        "lemma": "idéal",
        "en": "ideal (feminine)",
        "bn": "আদর্শ",
        "pos": "adjective"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "quinze": {
        "lemma": "quinze",
        "en": "fifteen",
        "bn": "পনেরো",
        "pos": "adjective"
      },
      "euros": {
        "lemma": "euro",
        "en": "euros",
        "bn": "ইউরো",
        "pos": "noun"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "mois": {
        "lemma": "mois",
        "en": "month / months",
        "bn": "মাস",
        "pos": "noun"
      },
      "avez": {
        "lemma": "avoir",
        "en": "have (you have)",
        "bn": "আছে (আপনার আছে)",
        "pos": "verb"
      },
      "appels": {
        "lemma": "appel",
        "en": "phone calls",
        "bn": "ফোন কল",
        "pos": "noun"
      },
      "illimités": {
        "lemma": "illimité",
        "en": "unlimited",
        "bn": "সীমাহীন / আনলিমিটেড",
        "pos": "adjective"
      },
      "cinquante": {
        "lemma": "cinquante",
        "en": "fifty",
        "bn": "পঞ্চাশ",
        "pos": "adjective"
      },
      "gigaoctets": {
        "lemma": "gigaoctet",
        "en": "gigabytes (GB)",
        "bn": "গিগাবাইট (জিবি)",
        "pos": "noun"
      },
      "4g": {
        "lemma": "4G",
        "en": "4G mobile network",
        "bn": "৪জি মোবাইল নেটওয়ার্ক",
        "pos": "noun"
      },
      "5g": {
        "lemma": "5G",
        "en": "5G mobile network",
        "bn": "৫জি মোবাইল নেটওয়ার্ক",
        "pos": "noun"
      },
      "trouve": {
        "lemma": "trouver",
        "en": "finds",
        "bn": "পায়",
        "pos": "verb"
      },
      "cette": {
        "lemma": "ce",
        "en": "this (feminine)",
        "bn": "এই",
        "pos": "adjective"
      },
      "offre": {
        "lemma": "offre",
        "en": "offer / job offer",
        "bn": "অফার / চাকরির সুযোগ",
        "pos": "noun"
      },
      "tout": {
        "lemma": "tout",
        "en": "all / everything",
        "bn": "সবকিছু",
        "pos": "pronoun"
      },
      "fait": {
        "lemma": "faire",
        "en": "makes / does / fact",
        "bn": "করে / ঘটনা",
        "pos": "verb"
      },
      "adaptée": {
        "lemma": "adapter",
        "en": "adapted / suited",
        "bn": "উপযোগী / উপযুক্ত",
        "pos": "adjective"
      },
      "budget": {
        "lemma": "budget",
        "en": "budget",
        "bn": "বাজেট",
        "pos": "noun"
      },
      "g": {
        "lemma": "gigaoctet",
        "en": "gigabyte / G (4G, 5G)",
        "bn": "জিবি / জি",
        "pos": "noun"
      },
      "demande": {
        "lemma": "demande",
        "en": "request / application",
        "bn": "অনুরোধ / আবেদন",
        "pos": "noun"
      },
      "pièce": {
        "lemma": "pièce",
        "en": "coin / room",
        "bn": "কয়েন / মুদ্রা",
        "pos": "noun"
      },
      "identité": {
        "lemma": "identité",
        "en": "identity",
        "bn": "পরিচয়",
        "pos": "noun"
      },
      "officielle": {
        "lemma": "officiel",
        "en": "official (feminine)",
        "bn": "দাপ্তরিক",
        "pos": "adjective"
      },
      "présente": {
        "lemma": "présenter",
        "en": "presents / introduces",
        "bn": "উপস্থাপন করে",
        "pos": "verb"
      },
      "passeport": {
        "lemma": "passeport",
        "en": "passport",
        "bn": "পাসপোর্ট",
        "pos": "noun"
      },
      "original": {
        "lemma": "original",
        "en": "original",
        "bn": "আসল / মূল",
        "pos": "adjective"
      },
      "quelques": {
        "lemma": "quelque",
        "en": "a few / some",
        "bn": "কয়েকটি / কিছু",
        "pos": "adjective"
      },
      "minutes": {
        "lemma": "minute",
        "en": "minutes",
        "bn": "মিনিট",
        "pos": "noun"
      },
      "active": {
        "lemma": "activer",
        "en": "activates",
        "bn": "সক্রিয় করে",
        "pos": "verb"
      },
      "ligne": {
        "lemma": "ligne",
        "en": "line (metro / telephone / online)",
        "bn": "লাইন / সংযোগ",
        "pos": "noun"
      },
      "insère": {
        "lemma": "insérer",
        "en": "inserts",
        "bn": "প্রবেশ করায় / ঢোকায়",
        "pos": "verb"
      },
      "puce": {
        "lemma": "puce",
        "en": "SIM chip / microchip",
        "bn": "সিম চিপ",
        "pos": "noun"
      },
      "nano-sim": {
        "lemma": "nano-SIM",
        "en": "nano-SIM card",
        "bn": "ন্যানো সিম",
        "pos": "noun"
      },
      "appareil": {
        "lemma": "appareil",
        "en": "device / appliance",
        "bn": "যন্ত্র / ডিভাইস",
        "pos": "noun"
      },
      "compose": {
        "lemma": "composer",
        "en": "dials (a phone number)",
        "bn": "ডায়াল করে",
        "pos": "verb"
      },
      "frère": {
        "lemma": "frère",
        "en": "brother",
        "bn": "ভাই",
        "pos": "noun"
      },
      "essayer": {
        "lemma": "essayer",
        "en": "to try / test",
        "bn": "চেষ্টা করা / পরীক্ষা করা",
        "pos": "verb"
      },
      "tonalité": {
        "lemma": "tonalité",
        "en": "dial tone / ringtone",
        "bn": "রিংটোন / ডায়াল টোন",
        "pos": "noun"
      },
      "sonne": {
        "lemma": "sonner",
        "en": "rings / sounds",
        "bn": "বেজে ওঠে",
        "pos": "verb"
      },
      "immédiatement": {
        "lemma": "immédiatement",
        "en": "immediately",
        "bn": "তাৎক্ষণিকভাবে",
        "pos": "adverb"
      },
      "nano": {
        "lemma": "nano",
        "en": "nano (SIM)",
        "bn": "ন্যানো",
        "pos": "adjective"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      }
    },
    "quiz": [
      {
        "question": "Quel type d'offre téléphonique Fahim recherche-t-il ?",
        "options": [
          "Un abonnement avec engagement de deux ans",
          "Une carte SIM prépayée sans engagement",
          "Un téléphone fixe pour sa chambre",
          "Une boîte postale"
        ],
        "answer": 1,
        "explanation": "Fahim says: \"Je cherche une carte SIM prépayée sans engagement de durée\" (a prepaid SIM without commitment).",
        "explanationBn": "ফাহিম বলে: আমি কোনো দীর্ঘমেয়াদি চুক্তি ছাড়া একটি প্রিপেইড সিম কার্ড খুঁজছি।"
      },
      {
        "question": "Quel document d'identité Fahim montre-t-il au vendeur ?",
        "options": [
          "Son permis de conduire étranger",
          "Son passeport original",
          "Une carte de bus scolaire",
          "Un certificat de naissance"
        ],
        "answer": 1,
        "explanation": "The text states: \"Fahim présente son passeport original\" (Fahim presents his original passport).",
        "explanationBn": "টেক্সটে স্পষ্টভাবে বলা হয়েছে: ফাহিম তার মূল পাসপোর্ট উপস্থাপন করে।"
      },
      {
        "question": "Que fait Fahim pour vérifier que sa nouvelle ligne fonctionne ?",
        "options": [
          "Il redémarre son ordinateur portable",
          "Il compose le numéro de son frère pour faire un appel test",
          "Il regarde une vidéo longue",
          "Il envoie un courrier postal"
        ],
        "answer": 1,
        "explanation": "The story concludes: \"Fahim compose le numéro de son frère pour essayer : la tonalité sonne immédiatement !\".",
        "explanationBn": "ফাহিম লাইনটি সচল হয়েছে কিনা পরীক্ষা করার জন্য তার ভাইয়ের ফোন নম্বরে কল করে।"
      }
    ]
  },
  {
    "id": "bonjour-voisin",
    "title": "Bonjour, voisin !",
    "subtitle": "Faire connaissance dans le couloir de l'immeuble",
    "level": "A1",
    "topic": "Logement & Voisinage",
    "wordCount": 231,
    "estimatedMinutes": 3,
    "paragraphs": [
      "Tariq descend lentement les marches de son nouvel immeuble résidentiel pour relever son courrier quotidien. Dans le hall d'entrée lumineux, un monsieur d'une cinquantaine d'années ouvre sa boîte aux lettres avec sa petite clé.",
      "L'homme entend des pas, se retourne et sourit chaleureusement à Tariq : « Bonjour ! Vous devez être notre nouveau voisin du troisième étage, n'est-ce pas ? Soyez le bienvenu dans notre petite résidence calme ! »",
      "Tariq répond avec une politesse naturelle : « Bonjour monsieur ! Oui, tout à fait, je m'appelle Tariq. Je viens d'emménager il y a trois jours à peine. Je suis très heureux de faire votre connaissance. » L'homme lui serre la main : « Enchanté Tariq, moi c'est Pierre, j'habite juste en dessous au deuxième. »",
      "Pierre donne alors quelques conseils pratiques et précieux : « Le local pour les vélos et les poubelles se trouve au sous-sol. Les éboueurs ramassent le bac vert le mardi et le bac jaune pour le tri sélectif le jeudi. Si vous avez besoin d'un outil pour monter un meuble, n'hésitez surtout pas à frapper chez moi. »",
      "Tariq est sincèrement touché par cette gentillesse spontanée : « C'est extrêmement aimable à vous Pierre, merci mille fois pour toutes ces explications claires. Je vous souhaite une excellente journée ! » Tariq remonte chez lui avec la certitude d'avoir trouvé un environnement paisible et accueillant."
    ],
    "paragraphTranslations": [
      "Tariq walks slowly down the stairs of his new residential building to collect his daily mail. In the bright entrance hall, a man in his fifties is opening his mailbox with his small key.",
      "The man hears footsteps, turns around, and smiles warmly at Tariq: \"Hello! You must be our new neighbour from the third floor, aren't you? Welcome to our quiet little residence!\"",
      "Tariq responds with natural courtesy: \"Hello sir! Yes, indeed, my name is Tariq. I moved in just three days ago. I am very pleased to meet you.\" The man shakes his hand: \"Pleased to meet you Tariq, I'm Pierre, I live right below on the second floor.\"",
      "Pierre then provides some valuable practical advice: \"The storage room for bikes and trash bins is in the basement. The collectors pick up the green bin on Tuesday and the yellow bin for recycling on Thursday. If you need any tool to assemble furniture, please don't hesitate to knock on my door.\"",
      "Tariq is genuinely touched by this spontaneous kindness: \"That is extremely kind of you Pierre, thank you so much for all these clear explanations. Have a wonderful day!\" Tariq heads back up to his apartment feeling certain he has found a peaceful and welcoming environment."
    ],
    "vocabulary": {
      "tariq": {
        "lemma": "Tariq",
        "en": "Tariq (first name)",
        "bn": "তারিক (নাম)",
        "pos": "noun"
      },
      "descend": {
        "lemma": "descendre",
        "en": "goes down",
        "bn": "নেমে যায়",
        "pos": "verb"
      },
      "lentement": {
        "lemma": "lentement",
        "en": "slowly",
        "bn": "ধীরে ধীরে",
        "pos": "adverb"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "marches": {
        "lemma": "marche",
        "en": "steps / stairs",
        "bn": "সিঁড়ির ধাপ",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "nouvel": {
        "lemma": "nouveau",
        "en": "new (before vowel)",
        "bn": "নতুন",
        "pos": "adjective"
      },
      "immeuble": {
        "lemma": "immeuble",
        "en": "apartment building",
        "bn": "বিল্ডিং / বহুতল ভবন",
        "pos": "noun"
      },
      "résidentiel": {
        "lemma": "résidentiel",
        "en": "residential",
        "bn": "আবাসিক",
        "pos": "adjective"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "relever": {
        "lemma": "relever",
        "en": "to collect (mail)",
        "bn": "তুলে নেওয়া / সংগ্রহ করা",
        "pos": "verb"
      },
      "courrier": {
        "lemma": "courrier",
        "en": "mail / letters",
        "bn": "চিঠিপত্র / ডাক",
        "pos": "noun"
      },
      "quotidien": {
        "lemma": "quotidien",
        "en": "daily",
        "bn": "দৈনন্দিন",
        "pos": "adjective"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "hall": {
        "lemma": "hall",
        "en": "entrance lobby / hall",
        "bn": "প্রবেশ লবি",
        "pos": "noun"
      },
      "entrée": {
        "lemma": "entrée",
        "en": "entrance / starter",
        "bn": "প্রবেশদ্বার",
        "pos": "noun"
      },
      "lumineux": {
        "lemma": "lumineux",
        "en": "bright / luminous",
        "bn": "উজ্জ্বল / আলোকময়",
        "pos": "adjective"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "cinquantaine": {
        "lemma": "cinquantaine",
        "en": "about fifty years old",
        "bn": "পঞ্চাশোর্ধ্ব / প্রায় পঞ্চাশ",
        "pos": "noun"
      },
      "années": {
        "lemma": "année",
        "en": "years",
        "bn": "বছরগুলো",
        "pos": "noun"
      },
      "ouvre": {
        "lemma": "ouvrir",
        "en": "opens",
        "bn": "খোলে",
        "pos": "verb"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "boîte": {
        "lemma": "boîte",
        "en": "box",
        "bn": "বাক্স",
        "pos": "noun"
      },
      "aux": {
        "lemma": "à + les",
        "en": "to the / at the (plural)",
        "bn": "তে / প্রতি",
        "pos": "preposition"
      },
      "lettres": {
        "lemma": "lettre",
        "en": "letters / mail",
        "bn": "চিঠিপত্র",
        "pos": "noun"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "petite": {
        "lemma": "petit",
        "en": "small (feminine)",
        "bn": "ছোট",
        "pos": "adjective"
      },
      "clé": {
        "lemma": "clé",
        "en": "key",
        "bn": "চাবি",
        "pos": "noun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "homme": {
        "lemma": "homme",
        "en": "man",
        "bn": "পুরুষ / মানুষ",
        "pos": "noun"
      },
      "entend": {
        "lemma": "entendre",
        "en": "hears",
        "bn": "শোনে",
        "pos": "verb"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "pas": {
        "lemma": "pas",
        "en": "step / footsteps / not",
        "bn": "পদক্ষেপ / পায়ের আওয়াজ / না",
        "pos": "noun"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "retourne": {
        "lemma": "retourner",
        "en": "turns around / returns",
        "bn": "ঘোরে / ফেরে",
        "pos": "verb"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "sourit": {
        "lemma": "sourire",
        "en": "smiles",
        "bn": "হাসে",
        "pos": "verb"
      },
      "chaleureusement": {
        "lemma": "chaleureusement",
        "en": "warmly",
        "bn": "উষ্ণভাবে / আন্তরিকভাবে",
        "pos": "adverb"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "devez": {
        "lemma": "devoir",
        "en": "must / have to (vous)",
        "bn": "আপনাকে অবশ্যই হবে",
        "pos": "verb"
      },
      "être": {
        "lemma": "être",
        "en": "to be",
        "bn": "হওয়া",
        "pos": "verb"
      },
      "notre": {
        "lemma": "notre",
        "en": "our",
        "bn": "আমাদের",
        "pos": "pronoun"
      },
      "nouveau": {
        "lemma": "nouveau",
        "en": "new (masculine)",
        "bn": "নতুন",
        "pos": "adjective"
      },
      "voisin": {
        "lemma": "voisin",
        "en": "neighbour (masculine)",
        "bn": "প্রতিবেশী",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "troisième": {
        "lemma": "troisième",
        "en": "third",
        "bn": "তৃতীয়",
        "pos": "adjective"
      },
      "étage": {
        "lemma": "étage",
        "en": "floor / storey",
        "bn": "তলা / ফ্লোর",
        "pos": "noun"
      },
      "est-ce": {
        "lemma": "est-ce que",
        "en": "is it / (question marker)",
        "bn": "কী / নাকি",
        "pos": "expression"
      },
      "soyez": {
        "lemma": "être",
        "en": "be (subjunctive/imperative)",
        "bn": "হোন",
        "pos": "verb"
      },
      "bienvenu": {
        "lemma": "bienvenu",
        "en": "welcome",
        "bn": "স্বাগত",
        "pos": "adjective"
      },
      "résidence": {
        "lemma": "résidence",
        "en": "residence / housing building",
        "bn": "আবাসন ভবন / বাসভবন",
        "pos": "noun"
      },
      "calme": {
        "lemma": "calme",
        "en": "calm / quiet",
        "bn": "শান্ত",
        "pos": "adjective"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "n": {
        "lemma": "ne",
        "en": "not (elision)",
        "bn": "না",
        "pos": "adverb"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "répond": {
        "lemma": "répondre",
        "en": "answers / replies",
        "bn": "উত্তর দেয়",
        "pos": "verb"
      },
      "politesse": {
        "lemma": "politesse",
        "en": "courtesy / politeness",
        "bn": "ভদ্রতা / শিষ্টাচার",
        "pos": "noun"
      },
      "naturelle": {
        "lemma": "naturel",
        "en": "natural (feminine)",
        "bn": "স্বাভাবিক",
        "pos": "adjective"
      },
      "oui": {
        "lemma": "oui",
        "en": "yes",
        "bn": "হ্যাঁ",
        "pos": "expression"
      },
      "tout": {
        "lemma": "tout",
        "en": "all / everything",
        "bn": "সবকিছু",
        "pos": "pronoun"
      },
      "fait": {
        "lemma": "faire",
        "en": "makes / does / fact",
        "bn": "করে / ঘটনা",
        "pos": "verb"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "appelle": {
        "lemma": "appeler",
        "en": "calls / names",
        "bn": "ডাকে / নাম",
        "pos": "verb"
      },
      "viens": {
        "lemma": "venir",
        "en": "come / have just (vient de)",
        "bn": "আসি / এইমাত্র",
        "pos": "verb"
      },
      "emménager": {
        "lemma": "emménager",
        "en": "to move in (housing)",
        "bn": "নতুন বাসায় ওঠা",
        "pos": "verb"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "y": {
        "lemma": "y",
        "en": "there",
        "bn": "সেখানে",
        "pos": "pronoun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "trois": {
        "lemma": "trois",
        "en": "three",
        "bn": "তিন",
        "pos": "adjective"
      },
      "jours": {
        "lemma": "jour",
        "en": "days",
        "bn": "দিনগুলো",
        "pos": "noun"
      },
      "peine": {
        "lemma": "peine",
        "en": "scarcely / barely (à peine)",
        "bn": "মাত্র / সবেমাত্র",
        "pos": "noun"
      },
      "suis": {
        "lemma": "être",
        "en": "am (je suis)",
        "bn": "হই / আছি",
        "pos": "verb"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "heureux": {
        "lemma": "heureux",
        "en": "happy / pleased",
        "bn": "খুশি / আনন্দিত",
        "pos": "adjective"
      },
      "faire": {
        "lemma": "faire",
        "en": "to do / make",
        "bn": "করা",
        "pos": "verb"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "connaissance": {
        "lemma": "connaissance",
        "en": "acquaintance / knowledge",
        "bn": "পরিচয় / জ্ঞান",
        "pos": "noun"
      },
      "lui": {
        "lemma": "lui",
        "en": "to him / her",
        "bn": "তাকে",
        "pos": "pronoun"
      },
      "serre": {
        "lemma": "serrer",
        "en": "shakes (hand)",
        "bn": "হাতে হাত মেলায়",
        "pos": "verb"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "main": {
        "lemma": "main",
        "en": "hand",
        "bn": "হাত",
        "pos": "noun"
      },
      "enchanté": {
        "lemma": "enchanté",
        "en": "pleased to meet you",
        "bn": "পরিচিত হয়ে আনন্দিত",
        "pos": "expression"
      },
      "moi": {
        "lemma": "moi",
        "en": "me",
        "bn": "আমাকে / আমি",
        "pos": "pronoun"
      },
      "pierre": {
        "lemma": "Pierre",
        "en": "Pierre (first name)",
        "bn": "পিয়ের (ফরাসি নাম)",
        "pos": "noun"
      },
      "habite": {
        "lemma": "habiter",
        "en": "lives",
        "bn": "বাস করে",
        "pos": "verb"
      },
      "juste": {
        "lemma": "juste",
        "en": "just / right",
        "bn": "ঠিক / মাত্র",
        "pos": "adverb"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "dessous": {
        "lemma": "dessous",
        "en": "below / underneath",
        "bn": "নিচে",
        "pos": "adverb"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "deuxième": {
        "lemma": "deuxième",
        "en": "second",
        "bn": "দ্বিতীয়",
        "pos": "adjective"
      },
      "m": {
        "lemma": "me",
        "en": "me (elision)",
        "bn": "আমাকে",
        "pos": "pronoun"
      },
      "c": {
        "lemma": "ce",
        "en": "it / this (c'est)",
        "bn": "এটা / এই",
        "pos": "pronoun"
      },
      "j": {
        "lemma": "je",
        "en": "I (elision)",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "donne": {
        "lemma": "donner",
        "en": "gives",
        "bn": "দেয়",
        "pos": "verb"
      },
      "alors": {
        "lemma": "alors",
        "en": "then / so",
        "bn": "তখন / তাহলে",
        "pos": "conjunction"
      },
      "quelques": {
        "lemma": "quelque",
        "en": "a few / some",
        "bn": "কয়েকটি / কিছু",
        "pos": "adjective"
      },
      "conseils": {
        "lemma": "conseil",
        "en": "advice / tips",
        "bn": "পরামর্শসমূহ",
        "pos": "noun"
      },
      "pratiques": {
        "lemma": "pratique",
        "en": "practical (plural)",
        "bn": "ব্যবহারিক",
        "pos": "adjective"
      },
      "précieux": {
        "lemma": "précieux",
        "en": "precious / valuable",
        "bn": "মূল্যবান",
        "pos": "adjective"
      },
      "local": {
        "lemma": "local",
        "en": "local / storage room",
        "bn": "স্থানীয় / সাধারণ স্টোররুম",
        "pos": "noun"
      },
      "vélos": {
        "lemma": "vélo",
        "en": "bicycles / bikes",
        "bn": "সাইকেলগুলো",
        "pos": "noun"
      },
      "poubelles": {
        "lemma": "poubelle",
        "en": "trash bins",
        "bn": "ময়লার পাত্রগুলো",
        "pos": "noun"
      },
      "trouve": {
        "lemma": "trouver",
        "en": "finds",
        "bn": "পায়",
        "pos": "verb"
      },
      "sous-sol": {
        "lemma": "sous-sol",
        "en": "basement",
        "bn": "বেজমেন্ট",
        "pos": "noun"
      },
      "éboueurs": {
        "lemma": "éboueur",
        "en": "garbage collectors",
        "bn": "পরিচ্ছন্নতাকর্মী",
        "pos": "noun"
      },
      "ramassent": {
        "lemma": "ramasser",
        "en": "collect (garbage)",
        "bn": "সংগ্রহ করে",
        "pos": "verb"
      },
      "bac": {
        "lemma": "bac",
        "en": "recycling bin / container",
        "bn": "ময়লার বিন / পাত্র",
        "pos": "noun"
      },
      "vert": {
        "lemma": "vert",
        "en": "green",
        "bn": "সবুজ",
        "pos": "adjective"
      },
      "mardi": {
        "lemma": "mardi",
        "en": "Tuesday",
        "bn": "মঙ্গলবার",
        "pos": "noun"
      },
      "jaune": {
        "lemma": "jaune",
        "en": "yellow",
        "bn": "হলুদ",
        "pos": "adjective"
      },
      "tri": {
        "lemma": "tri",
        "en": "sorting / recycling",
        "bn": "বাছাইকরণ / রিসাইক্লিং",
        "pos": "noun"
      },
      "sélectif": {
        "lemma": "sélectif",
        "en": "selective (recycling)",
        "bn": "বাছাইকরণ (রিসাইক্লিং)",
        "pos": "adjective"
      },
      "jeudi": {
        "lemma": "jeudi",
        "en": "Thursday",
        "bn": "বৃহস্পতিবার",
        "pos": "noun"
      },
      "si": {
        "lemma": "si",
        "en": "if",
        "bn": "যদি",
        "pos": "conjunction"
      },
      "avez": {
        "lemma": "avoir",
        "en": "have (you have)",
        "bn": "আছে (আপনার আছে)",
        "pos": "verb"
      },
      "besoin": {
        "lemma": "besoin",
        "en": "need",
        "bn": "প্রয়োজন",
        "pos": "noun"
      },
      "outil": {
        "lemma": "outil",
        "en": "tool",
        "bn": "টুলস / হাতিয়ার",
        "pos": "noun"
      },
      "monter": {
        "lemma": "monter",
        "en": "to assemble / go up",
        "bn": "জোড়া লাগানো / ওঠা",
        "pos": "verb"
      },
      "meuble": {
        "lemma": "meuble",
        "en": "piece of furniture",
        "bn": "আসবাবপত্র",
        "pos": "noun"
      },
      "hésitez": {
        "lemma": "hésiter",
        "en": "hesitate",
        "bn": "দ্বিধা করা",
        "pos": "verb"
      },
      "surtout": {
        "lemma": "surtout",
        "en": "above all / especially",
        "bn": "বিশেষ করে",
        "pos": "adverb"
      },
      "frapper": {
        "lemma": "frapper",
        "en": "to knock (on door)",
        "bn": "দরজায় কড়া নাড়া",
        "pos": "verb"
      },
      "chez": {
        "lemma": "chez",
        "en": "at the place of",
        "bn": "বাসায় / কাছে",
        "pos": "preposition"
      },
      "sous": {
        "lemma": "sous",
        "en": "under / within (sous 48h)",
        "bn": "নিচে / এর মধ্যে",
        "pos": "preposition"
      },
      "sol": {
        "lemma": "sol",
        "en": "ground / floor",
        "bn": "মেঝে / মাটি",
        "pos": "noun"
      },
      "sincèrement": {
        "lemma": "sincèrement",
        "en": "sincerely",
        "bn": "আন্তরিকভাবে",
        "pos": "adverb"
      },
      "touché": {
        "lemma": "toucher",
        "en": "touched / moved emotionally",
        "bn": "অভিভূত / আবেগাপ্লুত",
        "pos": "adjective"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "cette": {
        "lemma": "ce",
        "en": "this (feminine)",
        "bn": "এই",
        "pos": "adjective"
      },
      "gentillesse": {
        "lemma": "gentillesse",
        "en": "kindness",
        "bn": "সদয়তা / ভদ্রতা",
        "pos": "noun"
      },
      "spontanée": {
        "lemma": "spontané",
        "en": "spontaneous",
        "bn": "স্বতঃস্ফূর্ত",
        "pos": "adjective"
      },
      "extrêmement": {
        "lemma": "extrêmement",
        "en": "extremely",
        "bn": "অত্যন্ত / খুব",
        "pos": "adverb"
      },
      "aimable": {
        "lemma": "aimable",
        "en": "kind / amiable",
        "bn": "দয়ালু / অমায়িক",
        "pos": "adjective"
      },
      "merci": {
        "lemma": "merci",
        "en": "thank you",
        "bn": "ধন্যবাদ",
        "pos": "expression"
      },
      "mille": {
        "lemma": "mille",
        "en": "thousand (merci mille fois)",
        "bn": "হাজার",
        "pos": "adjective"
      },
      "fois": {
        "lemma": "fois",
        "en": "time / times (trois fois)",
        "bn": "বার (তিন বার)",
        "pos": "noun"
      },
      "toutes": {
        "lemma": "tout",
        "en": "all (feminine plural)",
        "bn": "সবগুলো",
        "pos": "adjective"
      },
      "ces": {
        "lemma": "ce",
        "en": "these / those",
        "bn": "এইসব",
        "pos": "adjective"
      },
      "explications": {
        "lemma": "explication",
        "en": "explanations",
        "bn": "ব্যাখ্যাসমূহ",
        "pos": "noun"
      },
      "claires": {
        "lemma": "clair",
        "en": "clear (plural)",
        "bn": "সুস্পষ্ট",
        "pos": "adjective"
      },
      "souhaite": {
        "lemma": "souhaiter",
        "en": "wishes / desires",
        "bn": "কামনা করে / চায়",
        "pos": "verb"
      },
      "excellente": {
        "lemma": "excellent",
        "en": "excellent (feminine)",
        "bn": "চমৎকার",
        "pos": "adjective"
      },
      "journée": {
        "lemma": "journée",
        "en": "day (duration)",
        "bn": "দিন",
        "pos": "noun"
      },
      "remonte": {
        "lemma": "remonter",
        "en": "goes back up",
        "bn": "উপরে উঠে যায়",
        "pos": "verb"
      },
      "certitude": {
        "lemma": "certitude",
        "en": "certainty",
        "bn": "নিশ্চয়তা",
        "pos": "noun"
      },
      "avoir": {
        "lemma": "avoir",
        "en": "to have",
        "bn": "থাকা / পাওয়া",
        "pos": "verb"
      },
      "trouvé": {
        "lemma": "trouver",
        "en": "found",
        "bn": "পেয়েছে",
        "pos": "verb"
      },
      "environnement": {
        "lemma": "environnement",
        "en": "environment / surroundings",
        "bn": "পরিবেশ",
        "pos": "noun"
      },
      "paisible": {
        "lemma": "paisible",
        "en": "peaceful",
        "bn": "শান্তিপূর্ণ / নিরিবিলি",
        "pos": "adjective"
      },
      "accueillant": {
        "lemma": "accueillant",
        "en": "welcoming / friendly",
        "bn": "উষ্ণ অভ্যর্থনাকারী",
        "pos": "adjective"
      }
    },
    "quiz": [
      {
        "question": "À quel étage habite le voisin Pierre par rapport à Tariq ?",
        "options": [
          "Au cinquième étage sous le toit",
          "Juste au deuxième étage en dessous de Tariq",
          "Au rez-de-chaussée dans la cour",
          "Dans un autre immeuble voisin"
        ],
        "answer": 1,
        "explanation": "Pierre explains: \"j'habite juste en dessous au deuxième\" (I live right below on the second floor).",
        "explanationBn": "পিয়ের জানায়: আমি ঠিক তারিকের নিচে দ্বিতীয় তলায় থাকি।"
      },
      {
        "question": "Quel jour de la semaine les éboueurs ramassent-ils le bac jaune de recyclage ?",
        "options": [
          "Le lundi matin",
          "Le jeudi",
          "Le samedi soir",
          "Le dimanche"
        ],
        "answer": 1,
        "explanation": "Pierre notes: \"et le bac jaune pour le tri sélectif le jeudi\" (yellow bin on Thursday).",
        "explanationBn": "পিয়ের বুঝিয়ে দেয় যে পুনর্ব্যবহারযোগ্য হলুদ বিন বৃহস্পতিবার সংগ্রহ করা হয়।"
      },
      {
        "question": "Que propose généreusement Pierre si Tariq a besoin d'aide ?",
        "options": [
          "De lui prêter sa voiture",
          "De lui prêter un outil pour monter un meuble",
          "De payer son loyer",
          "De faire ses devoirs"
        ],
        "answer": 1,
        "explanation": "Pierre offers: \"Si vous avez besoin d'un outil pour monter un meuble, n'hésitez pas\" (If you need a tool to assemble furniture).",
        "explanationBn": "পিয়ের আসবাবপত্র সাজানোর জন্য দরকার হলে টুলস ধার দেওয়ার প্রস্তাব দেয়।"
      }
    ]
  },
  {
    "id": "chercher-appartement",
    "title": "Chercher un appartement",
    "subtitle": "Visiter un studio et préparer son dossier de location",
    "level": "A2",
    "topic": "Logement & Démarches",
    "wordCount": 281,
    "estimatedMinutes": 4,
    "paragraphs": [
      "Depuis plusieurs semaines, Samir cherche activement un studio à louer pour se rapprocher de son travail d'informaticien. Tous les soirs, il consulte les annonces immobilières en ligne, compare les prix des loyers et contacte les propriétaires. Hier matin, une agence immobilière du quartier l'a finalement appelé pour lui proposer une visite.",
      "Cet après-midi, Samir arrive devant l'immeuble dix minutes en avance. L'agent immobilier, monsieur Dupont, l'accueille avec une poignée de main professionnelle. Ensemble, ils prennent l'ascenseur jusqu'au quatrième étage pour découvrir le logement. L'appartement est un studio meublé de vingt-cinq mètres carrés, très lumineux et bien agencé.",
      "Pendant la visite, Samir observe chaque détail avec attention. La pièce principale possède une grande fenêtre double vitrage qui donne sur une cour intérieure calme. La cuisine ouverte est équipée d'un réfrigérateur, de plaques de cuisson électriques et de nombreux rangements pratiques. Samir vérifie également la pression de l'eau dans la salle de bain et le fonctionnement des radiateurs.",
      "L'agent immobilier lui explique les conditions financières : « Le loyer mensuel est de six cent cinquante euros, charges comprises. Cela inclut le chauffage collectif et l'entretien des parties communes de l'immeuble. Si ce logement vous intéresse, vous devez déposer un dossier de location complet le plus rapidement possible. »",
      "Samir a déjà préparé tous ses justificatifs dans une pochette soignée : sa pièce d'identité en cours de validité, son contrat de travail dans l'entreprise informatique, ses trois derniers bulletins de salaire et l'attestation de son garant. Il remet les copies au conseiller : « Mon dossier est prêt et complet monsieur. J'espère vraiment que ma candidature sera retenue ! » L'agent le félicite pour son sérieux et promet de lui répondre sous quarante-huit heures."
    ],
    "paragraphTranslations": [
      "For several weeks, Samir has been actively looking for a studio apartment to rent in order to be closer to his IT job. Every evening, he browses online real estate listings, compares rental prices, and contacts landlords. Yesterday morning, a local real estate agency finally called him to offer a viewing.",
      "This afternoon, Samir arrives in front of the building ten minutes early. The estate agent, Mr. Dupont, welcomes him with a professional handshake. Together, they take the elevator up to the fourth floor to explore the accommodation. The apartment is a furnished twenty-five square metre studio, very bright and well laid out.",
      "During the visit, Samir observes every detail attentively. The main living room features a large double-glazed window overlooking a quiet inner courtyard. The open-plan kitchen is equipped with a refrigerator, electric cooking hobs, and plenty of practical storage space. Samir also checks the water pressure in the bathroom and the heating radiators.",
      "The real estate agent explains the financial terms to him: \"The monthly rent is six hundred and fifty euros, charges included. That covers communal central heating and the maintenance of the building's common areas. If you are interested in this apartment, you must submit a complete rental application file as quickly as possible.\"",
      "Samir has already assembled all his supporting documents inside a neat folder: his valid ID document, his employment contract with the IT company, his three most recent pay slips, and his guarantor's certificate. He hands the copies over to the agent: \"My application is ready and complete sir. I truly hope my candidacy will be accepted!\" The agent compliments him on his thoroughness and promises an answer within forty-eight hours."
    ],
    "vocabulary": {
      "depuis": {
        "lemma": "depuis",
        "en": "since / for",
        "bn": "ধরে / যাবত",
        "pos": "preposition"
      },
      "plusieurs": {
        "lemma": "plusieurs",
        "en": "several",
        "bn": "কয়েকটি",
        "pos": "adjective"
      },
      "semaines": {
        "lemma": "semaine",
        "en": "weeks",
        "bn": "সপ্তাহসমূহ",
        "pos": "noun"
      },
      "samir": {
        "lemma": "Samir",
        "en": "Samir (first name)",
        "bn": "সমীর (নাম)",
        "pos": "noun"
      },
      "cherche": {
        "lemma": "chercher",
        "en": "searches / looks for",
        "bn": "খোঁজে",
        "pos": "verb"
      },
      "activement": {
        "lemma": "activement",
        "en": "actively",
        "bn": "সক্রিয়ভাবে",
        "pos": "adverb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "studio": {
        "lemma": "studio",
        "en": "studio flat",
        "bn": "স্টুডিও অ্যাপার্টমেন্ট",
        "pos": "noun"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "louer": {
        "lemma": "louer",
        "en": "to rent",
        "bn": "ভাড়া নেওয়া / ভাড়া দেওয়া",
        "pos": "verb"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "rapprocher": {
        "lemma": "rapprocher",
        "en": "to get closer to",
        "bn": "কাছে আসা / কাছাকাছি হওয়া",
        "pos": "verb"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "travail": {
        "lemma": "France Travail",
        "en": "France Travail (national employment agency)",
        "bn": "ফ্রান্স ত্রাভাই (কর্মসংস্থান সংস্থা)",
        "pos": "noun"
      },
      "informaticien": {
        "lemma": "informaticien",
        "en": "IT professional / computer scientist",
        "bn": "কম্পিউটার বিশেষজ্ঞ / আইটি কর্মী",
        "pos": "noun"
      },
      "tous": {
        "lemma": "tout",
        "en": "all",
        "bn": "সব",
        "pos": "adjective"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "soirs": {
        "lemma": "soir",
        "en": "evenings",
        "bn": "সন্ধ্যাগুলো",
        "pos": "noun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "consulte": {
        "lemma": "consulter",
        "en": "checks / consults",
        "bn": "দেখে / পরামর্শ নেয়",
        "pos": "verb"
      },
      "annonces": {
        "lemma": "annonce",
        "en": "listings / advertisements",
        "bn": "বিজ্ঞাপন / তালিকা",
        "pos": "noun"
      },
      "immobilières": {
        "lemma": "immobilier",
        "en": "real estate (listings)",
        "bn": "আবাসন সংক্রান্ত",
        "pos": "adjective"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "ligne": {
        "lemma": "ligne",
        "en": "line (metro / telephone / online)",
        "bn": "লাইন / সংযোগ",
        "pos": "noun"
      },
      "compare": {
        "lemma": "comparer",
        "en": "compares",
        "bn": "তুলনা করে",
        "pos": "verb"
      },
      "prix": {
        "lemma": "prix",
        "en": "price",
        "bn": "দাম / মূল্য",
        "pos": "noun"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "loyers": {
        "lemma": "loyer",
        "en": "rents",
        "bn": "বাড়িভাড়াগুলো",
        "pos": "noun"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "contacte": {
        "lemma": "contacter",
        "en": "contacts",
        "bn": "যোগাযোগ করে",
        "pos": "verb"
      },
      "propriétaires": {
        "lemma": "propriétaire",
        "en": "landlords / owners",
        "bn": "বাড়িওয়ালাগণ",
        "pos": "noun"
      },
      "hier": {
        "lemma": "hier",
        "en": "yesterday",
        "bn": "গতকাল",
        "pos": "adverb"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "agence": {
        "lemma": "agence",
        "en": "agency / branch",
        "bn": "সংস্থা / এজেন্সি / শাখা",
        "pos": "noun"
      },
      "immobilière": {
        "lemma": "immobilier",
        "en": "real estate (agency)",
        "bn": "রিয়েল এস্টেট / আবাসন",
        "pos": "adjective"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "quartier": {
        "lemma": "quartier",
        "en": "neighbourhood / district",
        "bn": "মহল্লা / এলাকা",
        "pos": "noun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "finalement": {
        "lemma": "finalement",
        "en": "finally / eventually",
        "bn": "অবশেষে",
        "pos": "adverb"
      },
      "appelé": {
        "lemma": "appeler",
        "en": "called (past participle)",
        "bn": "ডেকেছিল / কল করেছিল",
        "pos": "verb"
      },
      "lui": {
        "lemma": "lui",
        "en": "to him / her",
        "bn": "তাকে",
        "pos": "pronoun"
      },
      "proposer": {
        "lemma": "proposer",
        "en": "to offer / propose",
        "bn": "প্রস্তাব দেওয়া",
        "pos": "verb"
      },
      "visite": {
        "lemma": "visite",
        "en": "visit / property viewing",
        "bn": "পরিদর্শন / দেখা",
        "pos": "noun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "cet": {
        "lemma": "ce",
        "en": "this (masculine vowel)",
        "bn": "এই",
        "pos": "adjective"
      },
      "après-midi": {
        "lemma": "après-midi",
        "en": "afternoon",
        "bn": "বিকাল / দুপুর",
        "pos": "noun"
      },
      "arrive": {
        "lemma": "arriver",
        "en": "arrives",
        "bn": "পৌঁছায়",
        "pos": "verb"
      },
      "devant": {
        "lemma": "devant",
        "en": "in front of",
        "bn": "সামনে",
        "pos": "preposition"
      },
      "immeuble": {
        "lemma": "immeuble",
        "en": "apartment building",
        "bn": "বিল্ডিং / বহুতল ভবন",
        "pos": "noun"
      },
      "dix": {
        "lemma": "dix",
        "en": "ten",
        "bn": "দশ",
        "pos": "adjective"
      },
      "minutes": {
        "lemma": "minute",
        "en": "minutes",
        "bn": "মিনিট",
        "pos": "noun"
      },
      "avance": {
        "lemma": "avance",
        "en": "ahead / early",
        "bn": "আগে",
        "pos": "noun"
      },
      "agent": {
        "lemma": "agent",
        "en": "officer / agent",
        "bn": "কর্মকর্তা / কর্মী",
        "pos": "noun"
      },
      "immobilier": {
        "lemma": "immobilier",
        "en": "real estate agent",
        "bn": "রিয়েল এস্টেট এজেন্ট",
        "pos": "noun"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "dupont": {
        "lemma": "Dupont",
        "en": "Dupont (surname)",
        "bn": "ডুপন্ট (পদবি)",
        "pos": "noun"
      },
      "accueille": {
        "lemma": "accueillir",
        "en": "welcomes / receives",
        "bn": "স্বাগত জানায়",
        "pos": "verb"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "poignée": {
        "lemma": "poignée",
        "en": "handshake / handle",
        "bn": "করমর্দন / হাতল",
        "pos": "noun"
      },
      "main": {
        "lemma": "main",
        "en": "hand",
        "bn": "হাত",
        "pos": "noun"
      },
      "professionnelle": {
        "lemma": "professionnel",
        "en": "professional (feminine)",
        "bn": "পেশাদার",
        "pos": "adjective"
      },
      "ensemble": {
        "lemma": "ensemble",
        "en": "together",
        "bn": "একসাথে",
        "pos": "adverb"
      },
      "ils": {
        "lemma": "il",
        "en": "they (masculine)",
        "bn": "তারা",
        "pos": "pronoun"
      },
      "prennent": {
        "lemma": "prendre",
        "en": "take (plural)",
        "bn": "নেয়",
        "pos": "verb"
      },
      "ascenseur": {
        "lemma": "ascenseur",
        "en": "elevator / lift",
        "bn": "লিফট / এলিভেটর",
        "pos": "noun"
      },
      "jusqu'au": {
        "lemma": "jusque",
        "en": "up to / until",
        "bn": "পর্যন্ত",
        "pos": "preposition"
      },
      "quatrième": {
        "lemma": "quatrième",
        "en": "fourth",
        "bn": "চতুর্থ",
        "pos": "adjective"
      },
      "étage": {
        "lemma": "étage",
        "en": "floor / storey",
        "bn": "তলা / ফ্লোর",
        "pos": "noun"
      },
      "découvrir": {
        "lemma": "découvrir",
        "en": "to discover / explore",
        "bn": "আবিষ্কার করা / দেখা",
        "pos": "verb"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "logement": {
        "lemma": "logement",
        "en": "housing / accommodation",
        "bn": "বাসস্থান / থাকার ঘর",
        "pos": "noun"
      },
      "appartement": {
        "lemma": "appartement",
        "en": "apartment / flat",
        "bn": "অ্যাপার্টমেন্ট / ফ্ল্যাট",
        "pos": "noun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "meublé": {
        "lemma": "meublé",
        "en": "furnished (studio)",
        "bn": "আসবাবপত্র সজ্জিত",
        "pos": "adjective"
      },
      "vingt-cinq": {
        "lemma": "vingt-cinq",
        "en": "twenty-five",
        "bn": "পঁচিশ",
        "pos": "adjective"
      },
      "mètres": {
        "lemma": "mètre",
        "en": "metres",
        "bn": "মিটার",
        "pos": "noun"
      },
      "carrés": {
        "lemma": "carré",
        "en": "square (metres)",
        "bn": "বর্গ (মিটার)",
        "pos": "adjective"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "lumineux": {
        "lemma": "lumineux",
        "en": "bright / luminous",
        "bn": "উজ্জ্বল / আলোকময়",
        "pos": "adjective"
      },
      "bien": {
        "lemma": "bien",
        "en": "well / good",
        "bn": "ভালো / ঠিক আছে",
        "pos": "adverb"
      },
      "agencé": {
        "lemma": "agencer",
        "en": "laid out / organized",
        "bn": "সাজানো / বিন্যস্ত",
        "pos": "adjective"
      },
      "après": {
        "lemma": "après",
        "en": "after",
        "bn": "পরে",
        "pos": "preposition"
      },
      "midi": {
        "lemma": "midi",
        "en": "midday / noon",
        "bn": "দুপুর / মধ্যাহ্ন",
        "pos": "noun"
      },
      "jusqu": {
        "lemma": "jusque",
        "en": "until / up to",
        "bn": "পর্যন্ত",
        "pos": "preposition"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "vingt": {
        "lemma": "vingt",
        "en": "twenty",
        "bn": "বিশ",
        "pos": "adjective"
      },
      "cinq": {
        "lemma": "cinq",
        "en": "five",
        "bn": "পাঁচ",
        "pos": "adjective"
      },
      "pendant": {
        "lemma": "pendant",
        "en": "during",
        "bn": "চলাকালীন / সময়ে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "observe": {
        "lemma": "observer",
        "en": "observes / inspects",
        "bn": "পর্যবেক্ষণ করে",
        "pos": "verb"
      },
      "chaque": {
        "lemma": "chaque",
        "en": "each / every",
        "bn": "প্রতিটি",
        "pos": "adjective"
      },
      "détail": {
        "lemma": "détail",
        "en": "detail",
        "bn": "খুঁটিনাটি / বিশদ",
        "pos": "noun"
      },
      "attention": {
        "lemma": "attention",
        "en": "attention / care",
        "bn": "মনোযোগ",
        "pos": "noun"
      },
      "pièce": {
        "lemma": "pièce",
        "en": "coin / room",
        "bn": "কয়েন / মুদ্রা",
        "pos": "noun"
      },
      "principale": {
        "lemma": "principal",
        "en": "main / principal",
        "bn": "প্রধান",
        "pos": "adjective"
      },
      "possède": {
        "lemma": "posséder",
        "en": "features / owns",
        "bn": "রয়েছে / আছে",
        "pos": "verb"
      },
      "grande": {
        "lemma": "grand",
        "en": "large (feminine)",
        "bn": "বড়",
        "pos": "adjective"
      },
      "fenêtre": {
        "lemma": "fenêtre",
        "en": "window",
        "bn": "জানালা",
        "pos": "noun"
      },
      "double": {
        "lemma": "double",
        "en": "double (glazing)",
        "bn": "দ্বিগুণ / ডাবল",
        "pos": "adjective"
      },
      "vitrage": {
        "lemma": "vitrage",
        "en": "glazing (double vitrage)",
        "bn": "কাঁচের জানালা (ডাবল গ্লেজিং)",
        "pos": "noun"
      },
      "qui": {
        "lemma": "qui",
        "en": "who / which",
        "bn": "যে / কে",
        "pos": "pronoun"
      },
      "donne": {
        "lemma": "donner",
        "en": "gives",
        "bn": "দেয়",
        "pos": "verb"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "cour": {
        "lemma": "cour",
        "en": "courtyard",
        "bn": "আঙিনা / উঠান",
        "pos": "noun"
      },
      "intérieure": {
        "lemma": "intérieur",
        "en": "inner / interior (courtyard)",
        "bn": "অভ্যন্তরীণ",
        "pos": "adjective"
      },
      "calme": {
        "lemma": "calme",
        "en": "calm / quiet",
        "bn": "শান্ত",
        "pos": "adjective"
      },
      "cuisine": {
        "lemma": "cuisine",
        "en": "kitchen",
        "bn": "রান্নাঘর",
        "pos": "noun"
      },
      "ouverte": {
        "lemma": "ouvert",
        "en": "open (feminine)",
        "bn": "খোলা",
        "pos": "adjective"
      },
      "équipée": {
        "lemma": "équiper",
        "en": "equipped (feminine)",
        "bn": "সুসজ্জিত",
        "pos": "adjective"
      },
      "réfrigérateur": {
        "lemma": "réfrigérateur",
        "en": "refrigerator / fridge",
        "bn": "রেফ্রিজারেটর / ফ্রিজ",
        "pos": "noun"
      },
      "plaques": {
        "lemma": "plaque",
        "en": "hobs / hotplates",
        "bn": "চুলা / কুকিং হব",
        "pos": "noun"
      },
      "cuisson": {
        "lemma": "cuisson",
        "en": "cooking",
        "bn": "রান্না",
        "pos": "noun"
      },
      "électriques": {
        "lemma": "électrique",
        "en": "electric",
        "bn": "বৈদ্যুতিক",
        "pos": "adjective"
      },
      "nombreux": {
        "lemma": "nombreux",
        "en": "numerous / many",
        "bn": "অনেক / প্রচুর",
        "pos": "adjective"
      },
      "rangements": {
        "lemma": "rangement",
        "en": "storage cupboards",
        "bn": "আলমারি / স্টোরেজ",
        "pos": "noun"
      },
      "pratiques": {
        "lemma": "pratique",
        "en": "practical (plural)",
        "bn": "ব্যবহারিক",
        "pos": "adjective"
      },
      "vérifie": {
        "lemma": "vérifier",
        "en": "checks / verifies",
        "bn": "যাচাই করে",
        "pos": "verb"
      },
      "également": {
        "lemma": "également",
        "en": "also / equally",
        "bn": "এছাড়াও",
        "pos": "adverb"
      },
      "pression": {
        "lemma": "pression",
        "en": "pressure (water)",
        "bn": "চাপ (পানির চাপ)",
        "pos": "noun"
      },
      "eau": {
        "lemma": "eau",
        "en": "water",
        "bn": "পানি",
        "pos": "noun"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "salle": {
        "lemma": "salle",
        "en": "room / hall",
        "bn": "কক্ষ / রুম",
        "pos": "noun"
      },
      "bain": {
        "lemma": "bain",
        "en": "bath",
        "bn": "গোসল",
        "pos": "noun"
      },
      "fonctionnement": {
        "lemma": "fonctionnement",
        "en": "operation / functioning",
        "bn": "কার্যক্ষমতা",
        "pos": "noun"
      },
      "radiateurs": {
        "lemma": "radiateur",
        "en": "radiators",
        "bn": "হিটারগুলো",
        "pos": "noun"
      },
      "explique": {
        "lemma": "expliquer",
        "en": "explains",
        "bn": "ব্যাখ্যা করে",
        "pos": "verb"
      },
      "conditions": {
        "lemma": "condition",
        "en": "terms / conditions",
        "bn": "শর্তাবলী / অবস্থা",
        "pos": "noun"
      },
      "financières": {
        "lemma": "financier",
        "en": "financial (plural)",
        "bn": "আর্থিক",
        "pos": "adjective"
      },
      "loyer": {
        "lemma": "loyer",
        "en": "rent (monthly)",
        "bn": "মাসিক বাড়িভাড়া",
        "pos": "noun"
      },
      "mensuel": {
        "lemma": "mensuel",
        "en": "monthly",
        "bn": "মাসিক",
        "pos": "adjective"
      },
      "six": {
        "lemma": "six",
        "en": "six",
        "bn": "ছয়",
        "pos": "adjective"
      },
      "cent": {
        "lemma": "cent",
        "en": "hundred",
        "bn": "একশত",
        "pos": "adjective"
      },
      "cinquante": {
        "lemma": "cinquante",
        "en": "fifty",
        "bn": "পঞ্চাশ",
        "pos": "adjective"
      },
      "euros": {
        "lemma": "euro",
        "en": "euros",
        "bn": "ইউরো",
        "pos": "noun"
      },
      "charges": {
        "lemma": "charge",
        "en": "utility charges / maintenance fees",
        "bn": "ইউটিলিটি চার্জ / সার্ভিস চার্জ",
        "pos": "noun"
      },
      "comprises": {
        "lemma": "comprendre",
        "en": "included (charges comprises)",
        "bn": "অন্তর্ভুক্ত",
        "pos": "adjective"
      },
      "cela": {
        "lemma": "cela",
        "en": "that / this",
        "bn": "এটা",
        "pos": "pronoun"
      },
      "inclut": {
        "lemma": "inclure",
        "en": "includes",
        "bn": "অন্তর্ভুক্ত করে",
        "pos": "verb"
      },
      "chauffage": {
        "lemma": "chauffage",
        "en": "heating",
        "bn": "হিটিং ব্যবস্থা",
        "pos": "noun"
      },
      "collectif": {
        "lemma": "collectif",
        "en": "collective / communal",
        "bn": "সম্মিলিত / কেন্দ্রীয়",
        "pos": "adjective"
      },
      "entretien": {
        "lemma": "entretien",
        "en": "interview / maintenance",
        "bn": "ইন্টারভিউ / রক্ষণাবেক্ষণ",
        "pos": "noun"
      },
      "parties": {
        "lemma": "partie",
        "en": "parts / common areas",
        "bn": "অংশসমূহ",
        "pos": "noun"
      },
      "communes": {
        "lemma": "commun",
        "en": "shared / common (parts)",
        "bn": "সাধারণ / সবার ব্যবহার্য",
        "pos": "adjective"
      },
      "si": {
        "lemma": "si",
        "en": "if",
        "bn": "যদি",
        "pos": "conjunction"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "intéresse": {
        "lemma": "intéresser",
        "en": "interests",
        "bn": "আগ্রহী করে",
        "pos": "verb"
      },
      "devez": {
        "lemma": "devoir",
        "en": "must / have to (vous)",
        "bn": "আপনাকে অবশ্যই হবে",
        "pos": "verb"
      },
      "déposer": {
        "lemma": "déposer",
        "en": "to submit / lodge (file)",
        "bn": "জমা দেওয়া",
        "pos": "verb"
      },
      "dossier": {
        "lemma": "dossier",
        "en": "application file / folder",
        "bn": "ফাইল / আবেদনপত্র",
        "pos": "noun"
      },
      "location": {
        "lemma": "location",
        "en": "rental",
        "bn": "ভাড়া",
        "pos": "noun"
      },
      "complet": {
        "lemma": "complet",
        "en": "complete / full",
        "bn": "সম্পূর্ণ",
        "pos": "adjective"
      },
      "plus": {
        "lemma": "plus",
        "en": "more / plus",
        "bn": "আরও",
        "pos": "adverb"
      },
      "rapidement": {
        "lemma": "rapidement",
        "en": "promptly / quickly",
        "bn": "দ্রুততার সাথে",
        "pos": "adverb"
      },
      "possible": {
        "lemma": "possible",
        "en": "possible",
        "bn": "সম্ভব",
        "pos": "adjective"
      },
      "déjà": {
        "lemma": "déjà",
        "en": "already",
        "bn": "ইতিমধ্যে",
        "pos": "adverb"
      },
      "préparé": {
        "lemma": "préparer",
        "en": "prepared",
        "bn": "প্রস্তুত করেছে",
        "pos": "verb"
      },
      "ses": {
        "lemma": "son",
        "en": "his / her / its (plural)",
        "bn": "তার (বহুবচন)",
        "pos": "pronoun"
      },
      "justificatifs": {
        "lemma": "justificatif",
        "en": "supporting documents",
        "bn": "প্রমাণপত্রসমূহ",
        "pos": "noun"
      },
      "pochette": {
        "lemma": "pochette",
        "en": "folder / wallet file",
        "bn": "ফাইল ফোল্ডার",
        "pos": "noun"
      },
      "soignée": {
        "lemma": "soigner",
        "en": "neat / tidy (folder)",
        "bn": "পরিপাটি / যত্নসহকারে তৈরি",
        "pos": "adjective"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "identité": {
        "lemma": "identité",
        "en": "identity",
        "bn": "পরিচয়",
        "pos": "noun"
      },
      "cours": {
        "lemma": "cours",
        "en": "class / course / in progress",
        "bn": "ক্লাস / কোর্স / চলমান",
        "pos": "noun"
      },
      "validité": {
        "lemma": "validité",
        "en": "validity",
        "bn": "বৈধতা / মেয়াদ",
        "pos": "noun"
      },
      "contrat": {
        "lemma": "contrat",
        "en": "contract / agreement",
        "bn": "চুক্তিপত্র",
        "pos": "noun"
      },
      "entreprise": {
        "lemma": "entreprise",
        "en": "company / enterprise",
        "bn": "প্রতিষ্ঠান / কোম্পানি",
        "pos": "noun"
      },
      "informatique": {
        "lemma": "informatique",
        "en": "IT / computing",
        "bn": "আইটি / কম্পিউটার বিজ্ঞান",
        "pos": "noun"
      },
      "trois": {
        "lemma": "trois",
        "en": "three",
        "bn": "তিন",
        "pos": "adjective"
      },
      "derniers": {
        "lemma": "dernier",
        "en": "last / recent (plural)",
        "bn": "শেষ / সাম্প্রতিক",
        "pos": "adjective"
      },
      "bulletins": {
        "lemma": "bulletin",
        "en": "pay slips / report cards",
        "bn": "বেতন স্লিপ / বিবরণী",
        "pos": "noun"
      },
      "salaire": {
        "lemma": "salaire",
        "en": "salary / wages",
        "bn": "বেতন",
        "pos": "noun"
      },
      "attestation": {
        "lemma": "attestation",
        "en": "certificate / formal proof",
        "bn": "প্রত্যয়নপত্র / সনদ",
        "pos": "noun"
      },
      "garant": {
        "lemma": "garant",
        "en": "rental guarantor",
        "bn": "জামিনদার / গ্যারান্টর",
        "pos": "noun"
      },
      "remet": {
        "lemma": "remettre",
        "en": "hands over / gives",
        "bn": "হস্তান্তর করে / দেয়",
        "pos": "verb"
      },
      "copies": {
        "lemma": "copie",
        "en": "photocopies / copies",
        "bn": "ফটোকপি / অনুলিপি",
        "pos": "noun"
      },
      "conseiller": {
        "lemma": "conseiller",
        "en": "advisor / counselor",
        "bn": "পরামর্শক / কর্মকর্তা",
        "pos": "noun"
      },
      "mon": {
        "lemma": "son",
        "en": "my (masculine)",
        "bn": "আমার",
        "pos": "pronoun"
      },
      "prêt": {
        "lemma": "prêt",
        "en": "ready / loan",
        "bn": "প্রস্তুত / ঋণ",
        "pos": "adjective"
      },
      "espère": {
        "lemma": "espérer",
        "en": "hopes",
        "bn": "আশা করে",
        "pos": "verb"
      },
      "vraiment": {
        "lemma": "vraiment",
        "en": "truly / really",
        "bn": "সত্যিই / প্রকৃতপক্ষে",
        "pos": "adverb"
      },
      "que": {
        "lemma": "que",
        "en": "that / what",
        "bn": "কী / যে",
        "pos": "pronoun"
      },
      "ma": {
        "lemma": "son",
        "en": "my (feminine)",
        "bn": "আমার",
        "pos": "pronoun"
      },
      "candidature": {
        "lemma": "candidature",
        "en": "application / candidacy",
        "bn": "আবেদন / প্রার্থিতা",
        "pos": "noun"
      },
      "sera": {
        "lemma": "être",
        "en": "will be",
        "bn": "হবে",
        "pos": "verb"
      },
      "retenue": {
        "lemma": "retenir",
        "en": "accepted / selected (candidacy)",
        "bn": "মনোনীত / গৃহীত",
        "pos": "adjective"
      },
      "félicite": {
        "lemma": "féliciter",
        "en": "compliments / congratulates",
        "bn": "প্রশংসা করে",
        "pos": "verb"
      },
      "sérieux": {
        "lemma": "sérieux",
        "en": "seriousness / reliability",
        "bn": "দায়িত্বশীলতা / আন্তরিকতা",
        "pos": "noun"
      },
      "promet": {
        "lemma": "promettre",
        "en": "promises",
        "bn": "প্রতিশ্রুতি দেয়",
        "pos": "verb"
      },
      "répondre": {
        "lemma": "répondre",
        "en": "to answer / reply",
        "bn": "উত্তর দেওয়া",
        "pos": "verb"
      },
      "sous": {
        "lemma": "sous",
        "en": "under / within (sous 48h)",
        "bn": "নিচে / এর মধ্যে",
        "pos": "preposition"
      },
      "quarante-huit": {
        "lemma": "quarante-huit",
        "en": "forty-eight",
        "bn": "আটচল্লিশ",
        "pos": "adjective"
      },
      "heures": {
        "lemma": "heure",
        "en": "hours / o'clock",
        "bn": "ঘণ্টা / টা",
        "pos": "noun"
      },
      "j": {
        "lemma": "je",
        "en": "I (elision)",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "quarante": {
        "lemma": "quarante",
        "en": "forty",
        "bn": "চল্লিশ",
        "pos": "adjective"
      },
      "huit": {
        "lemma": "huit",
        "en": "eight",
        "bn": "আট",
        "pos": "adjective"
      }
    },
    "quiz": [
      {
        "question": "Pourquoi Samir cherche-t-il un nouvel appartement ?",
        "options": [
          "Pour partir en vacances à la mer",
          "Pour se rapprocher de son travail de technicien informatique",
          "Pour ouvrir un restaurant",
          "Pour acheter des meubles neufs"
        ],
        "answer": 1,
        "explanation": "The text states: \"Samir cherche activement un studio à louer pour se rapprocher de son travail d'informaticien\".",
        "explanationBn": "টেক্সটে বলা আছে: সমীর তার আইটি চাকরির কাছাকাছি থাকার জন্য সক্রিয়ভাবে একটি স্টুডিও বাসা খুঁজছে।"
      },
      {
        "question": "Que comprend le loyer mensuel de six cent cinquante euros ?",
        "options": [
          "L'électricité privée seulement",
          "Les charges, le chauffage collectif et l'entretien des parties communes",
          "Les repas du restaurant",
          "L'abonnement de transport en commun"
        ],
        "answer": 1,
        "explanation": "The agent specifies that charges are included (\"charges comprises\"), covering communal heating and building maintenance.",
        "explanationBn": "রিয়েল এস্টেট এজেন্ট জানায় ভাড়ার মধ্যে বিল্ডিংয়ের সাধারণ মেইনটেন্যান্স ও হিটিং অন্তর্ভুক্ত রয়েছে।"
      },
      {
        "question": "Quels documents Samir a-t-il préparés dans son dossier de location ?",
        "options": [
          "Juste une photo d'identité",
          "Sa pièce d'identité, contrat de travail, fiches de paie et garant",
          "Une facture de supermarché",
          "Son carnet de santé de naissance"
        ],
        "answer": 1,
        "explanation": "The text enumerates: \"sa pièce d'identité, son contrat de travail, ses trois derniers bulletins de salaire et l'attestation de son garant\".",
        "explanationBn": "নথির তালিকায় পরিচয়পত্র, কাজের চুক্তিপত্র, বেতন স্লিপ ও গ্যারান্টারের প্রত্যয়নপত্র রয়েছে।"
      }
    ]
  },
  {
    "id": "ouvrir-compte-bancaire",
    "title": "Ouvrir un compte bancaire",
    "subtitle": "Obtenir un compte courant et un relevé d'identité bancaire",
    "level": "A2",
    "topic": "Banque & Démarches",
    "wordCount": 287,
    "estimatedMinutes": 4,
    "paragraphs": [
      "Après avoir signé son premier contrat professionnel en France, Kabir doit impérativement ouvrir un compte bancaire pour percevoir son salaire et régler ses dépenses du quotidien. Il a pris rendez-vous en ligne sur le portail internet d'une grande banque de détail située à deux pas de chez lui.",
      "Le matin convenu, Kabir se présente à l'agence bancaire à l'heure exacte. La conseillère clientèle, madame Martin, l'invite chaleureusement à entrer dans son bureau vitré. Kabir s'assoit en face d'elle et explique l'objet de sa visite : il souhaite ouvrir un compte de dépôt standard avec les services bancaires de base.",
      "La conseillère examine avec soin les pièces justificatives apportées par Kabir. Elle contrôle son passeport original avec son visa en cours de validité, un justificatif de domicile récent attestant de son adresse postale, ainsi que son attestation d'embauche. Tout est parfaitement en ordre et conforme aux exigences réglementaires.",
      "Madame Martin lui présente les différentes options de compte : « Nous proposons un compte courant avec une carte bancaire internationale à débit immédiat et un accès illimité à notre application mobile sécurisée. Vous pourrez ainsi suivre vos dépenses en temps réel, bloquer temporairement votre carte si nécessaire et effectuer des virements instantanés gratuitement. » Kabir valide cette formule moderne et pratique.",
      "Après avoir signé électroniquement la convention de compte sur une tablette tactile, la conseillère imprime un document essentiel : « Voici votre Relevé d'Identité Bancaire, qu'on appelle couramment le RIB. Vous devez transmettre ce document à votre employeur pour le versement automatique de votre salaire à la fin du mois. Votre carte physique et votre code confidentiel arriveront par courrier sécurisé d'ici une semaine. » Kabir repart ravi et serein pour la suite de ses démarches en France."
    ],
    "paragraphTranslations": [
      "After signing his first employment contract in France, Kabir urgently needs to open a bank account to receive his salary and handle his everyday expenses. He scheduled an appointment online on the web portal of a major retail bank situated just steps away from his home.",
      "On the agreed morning, Kabir turns up at the bank branch right on time. The customer advisor, Mrs. Martin, warmly invites him into her glass office. Kabir sits down across from her and explains the purpose of his visit: he wishes to open a standard checking account with basic banking services.",
      "The advisor examines with care the supporting documents brought by Kabir. She checks his original passport with his valid visa, a recent proof of address verifying his postal domicile, as well as his hiring certificate. Everything is in perfect order and complies with standard regulations.",
      "Mrs. Martin introduces the various account options to him: \"We offer a current checking account paired with an international debit card and unlimited access to our secure mobile banking app. You will be able to monitor your spending in real time, temporarily freeze your card if necessary, and make instant money transfers free of charge.\" Kabir approves this modern, practical package.",
      "After electronically signing the account agreement on a touch tablet, the advisor prints out an essential document: \"Here is your bank identity statement, commonly called the RIB. You must hand this document to your employer for the automatic deposit of your wages at the end of the month. Your physical card and confidential PIN code will arrive by secure post within a week.\" Kabir leaves delighted and confident for his upcoming life in France."
    ],
    "vocabulary": {
      "après": {
        "lemma": "après",
        "en": "after",
        "bn": "পরে",
        "pos": "preposition"
      },
      "avoir": {
        "lemma": "avoir",
        "en": "to have",
        "bn": "থাকা / পাওয়া",
        "pos": "verb"
      },
      "signé": {
        "lemma": "signer",
        "en": "signed",
        "bn": "স্বাক্ষর করেছে",
        "pos": "verb"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "premier": {
        "lemma": "premier",
        "en": "first",
        "bn": "প্রথম",
        "pos": "adjective"
      },
      "contrat": {
        "lemma": "contrat",
        "en": "contract / agreement",
        "bn": "চুক্তিপত্র",
        "pos": "noun"
      },
      "professionnel": {
        "lemma": "professionnel",
        "en": "professional",
        "bn": "পেশাদার",
        "pos": "adjective"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "france": {
        "lemma": "France",
        "en": "France",
        "bn": "ফ্রান্স",
        "pos": "noun"
      },
      "kabir": {
        "lemma": "Kabir",
        "en": "Kabir (first name)",
        "bn": "কবীর (নাম)",
        "pos": "noun"
      },
      "doit": {
        "lemma": "devoir",
        "en": "must / has to",
        "bn": "হবে / বাধ্য",
        "pos": "verb"
      },
      "impérativement": {
        "lemma": "impérativement",
        "en": "imperatively / urgently",
        "bn": "অবশ্যই / অত্যন্ত জরুরিভাবে",
        "pos": "adverb"
      },
      "ouvrir": {
        "lemma": "ouvrir",
        "en": "to open",
        "bn": "খোলা",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "compte": {
        "lemma": "compte",
        "en": "bank account / count",
        "bn": "অ্যাকাউন্ট / হিসাব",
        "pos": "noun"
      },
      "bancaire": {
        "lemma": "bancaire",
        "en": "banking / bank-related",
        "bn": "ব্যাংক সংক্রান্ত",
        "pos": "adjective"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "percevoir": {
        "lemma": "percevoir",
        "en": "to receive / collect (salary)",
        "bn": "গ্রহণ করা (বেতন)",
        "pos": "verb"
      },
      "salaire": {
        "lemma": "salaire",
        "en": "salary / wages",
        "bn": "বেতন",
        "pos": "noun"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "régler": {
        "lemma": "régler",
        "en": "to settle / pay / adjust",
        "bn": "পরিশোধ করা",
        "pos": "verb"
      },
      "ses": {
        "lemma": "son",
        "en": "his / her / its (plural)",
        "bn": "তার (বহুবচন)",
        "pos": "pronoun"
      },
      "dépenses": {
        "lemma": "dépense",
        "en": "expenses",
        "bn": "খরচসমূহ",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "quotidien": {
        "lemma": "quotidien",
        "en": "daily",
        "bn": "দৈনন্দিন",
        "pos": "adjective"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "pris": {
        "lemma": "prendre",
        "en": "taken / scheduled",
        "bn": "নিয়েছে / করেছে",
        "pos": "verb"
      },
      "rendez-vous": {
        "lemma": "rendez-vous",
        "en": "appointment / meeting",
        "bn": "সাক্ষাৎ / অ্যাপয়েন্টমেন্ট",
        "pos": "noun"
      },
      "ligne": {
        "lemma": "ligne",
        "en": "line (metro / telephone / online)",
        "bn": "লাইন / সংযোগ",
        "pos": "noun"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "portail": {
        "lemma": "portail",
        "en": "web portal / gate",
        "bn": "ওয়েব পোর্টাল / গেট",
        "pos": "noun"
      },
      "internet": {
        "lemma": "internet",
        "en": "internet",
        "bn": "ইন্টারনেট",
        "pos": "noun"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "grande": {
        "lemma": "grand",
        "en": "large (feminine)",
        "bn": "বড়",
        "pos": "adjective"
      },
      "banque": {
        "lemma": "banque",
        "en": "bank",
        "bn": "ব্যাংক",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "détail": {
        "lemma": "détail",
        "en": "detail",
        "bn": "খুঁটিনাটি / বিশদ",
        "pos": "noun"
      },
      "située": {
        "lemma": "situer",
        "en": "located / situated",
        "bn": "অবস্থিত",
        "pos": "adjective"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "pas": {
        "lemma": "pas",
        "en": "step / footsteps / not",
        "bn": "পদক্ষেপ / পায়ের আওয়াজ / না",
        "pos": "noun"
      },
      "chez": {
        "lemma": "chez",
        "en": "at the place of",
        "bn": "বাসায় / কাছে",
        "pos": "preposition"
      },
      "lui": {
        "lemma": "lui",
        "en": "to him / her",
        "bn": "তাকে",
        "pos": "pronoun"
      },
      "rendez": {
        "lemma": "rendre",
        "en": "return / appointment (rendez-vous)",
        "bn": "সাক্ষাৎ / ফেরত দেওয়া",
        "pos": "noun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "convenu": {
        "lemma": "convenir",
        "en": "agreed / scheduled (time)",
        "bn": "নির্ধারিত / সম্মত",
        "pos": "adjective"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "présente": {
        "lemma": "présenter",
        "en": "presents / introduces",
        "bn": "উপস্থাপন করে",
        "pos": "verb"
      },
      "agence": {
        "lemma": "agence",
        "en": "agency / branch",
        "bn": "সংস্থা / এজেন্সি / শাখা",
        "pos": "noun"
      },
      "heure": {
        "lemma": "heure",
        "en": "hour / time",
        "bn": "ঘণ্টা / সময়",
        "pos": "noun"
      },
      "exacte": {
        "lemma": "exact",
        "en": "exact (feminine)",
        "bn": "সঠিক",
        "pos": "adjective"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "conseillère": {
        "lemma": "conseiller",
        "en": "advisor (female)",
        "bn": "পরামর্শক (মহিলা)",
        "pos": "noun"
      },
      "clientèle": {
        "lemma": "clientèle",
        "en": "clientele / customers",
        "bn": "গ্রাহকবৃন্দ",
        "pos": "noun"
      },
      "madame": {
        "lemma": "madame",
        "en": "madam / ma'am",
        "bn": "ম্যাডাম / বেগম",
        "pos": "noun"
      },
      "martin": {
        "lemma": "Martin",
        "en": "Martin (surname)",
        "bn": "মার্টিন (পদবি)",
        "pos": "noun"
      },
      "invite": {
        "lemma": "inviter",
        "en": "invites",
        "bn": "আমন্ত্রণ জানায়",
        "pos": "verb"
      },
      "chaleureusement": {
        "lemma": "chaleureusement",
        "en": "warmly",
        "bn": "উষ্ণভাবে / আন্তরিকভাবে",
        "pos": "adverb"
      },
      "entrer": {
        "lemma": "entrer",
        "en": "to enter / come in",
        "bn": "প্রবেশ করা",
        "pos": "verb"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "bureau": {
        "lemma": "bureau",
        "en": "office / desk",
        "bn": "অফিস / পড়ার টেবিল",
        "pos": "noun"
      },
      "vitré": {
        "lemma": "vitré",
        "en": "glass (counter)",
        "bn": "কাঁচের",
        "pos": "adjective"
      },
      "assoit": {
        "lemma": "asseoir",
        "en": "sits",
        "bn": "বসে",
        "pos": "verb"
      },
      "face": {
        "lemma": "face",
        "en": "in front of / across",
        "bn": "মুখোমুখি",
        "pos": "noun"
      },
      "elle": {
        "lemma": "elle",
        "en": "she",
        "bn": "সে (মহিলা)",
        "pos": "pronoun"
      },
      "explique": {
        "lemma": "expliquer",
        "en": "explains",
        "bn": "ব্যাখ্যা করে",
        "pos": "verb"
      },
      "objet": {
        "lemma": "objet",
        "en": "object / purpose",
        "bn": "উদ্দেশ্য / বিষয়",
        "pos": "noun"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "visite": {
        "lemma": "visite",
        "en": "visit / property viewing",
        "bn": "পরিদর্শন / দেখা",
        "pos": "noun"
      },
      "souhaite": {
        "lemma": "souhaiter",
        "en": "wishes / desires",
        "bn": "কামনা করে / চায়",
        "pos": "verb"
      },
      "dépôt": {
        "lemma": "dépôt",
        "en": "deposit (account)",
        "bn": "আমানত / সঞ্চয়",
        "pos": "noun"
      },
      "standard": {
        "lemma": "standard",
        "en": "standard",
        "bn": "মানসম্মত / সাধারণ",
        "pos": "adjective"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "services": {
        "lemma": "service",
        "en": "services",
        "bn": "সেবাসমূহ",
        "pos": "noun"
      },
      "bancaires": {
        "lemma": "bancaire",
        "en": "banking (plural)",
        "bn": "ব্যাংক সংক্রান্ত",
        "pos": "adjective"
      },
      "base": {
        "lemma": "base",
        "en": "base / basis / foundation",
        "bn": "ভিত্তি / মৌলিক",
        "pos": "noun"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "examine": {
        "lemma": "examiner",
        "en": "examines / reviews",
        "bn": "পরীক্ষা করে",
        "pos": "verb"
      },
      "soin": {
        "lemma": "soin",
        "en": "care / diligence",
        "bn": "যত্ন / মনোযোগ",
        "pos": "noun"
      },
      "pièces": {
        "lemma": "pièce",
        "en": "documents / coins / rooms",
        "bn": "নথিপত্র / মুদ্রা / কক্ষ",
        "pos": "noun"
      },
      "justificatives": {
        "lemma": "justificatif",
        "en": "supporting (plural)",
        "bn": "প্রমাণপত্রমূলক",
        "pos": "adjective"
      },
      "apportées": {
        "lemma": "apporter",
        "en": "brought (feminine plural)",
        "bn": "আনা / নিয়ে আসা",
        "pos": "adjective"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "contrôle": {
        "lemma": "contrôler",
        "en": "checks / inspects",
        "bn": "পরীক্ষা করে",
        "pos": "verb"
      },
      "passeport": {
        "lemma": "passeport",
        "en": "passport",
        "bn": "পাসপোর্ট",
        "pos": "noun"
      },
      "original": {
        "lemma": "original",
        "en": "original",
        "bn": "আসল / মূল",
        "pos": "adjective"
      },
      "visa": {
        "lemma": "visa",
        "en": "visa / entry permit",
        "bn": "ভিসা",
        "pos": "noun"
      },
      "cours": {
        "lemma": "cours",
        "en": "class / course / in progress",
        "bn": "ক্লাস / কোর্স / চলমান",
        "pos": "noun"
      },
      "validité": {
        "lemma": "validité",
        "en": "validity",
        "bn": "বৈধতা / মেয়াদ",
        "pos": "noun"
      },
      "justificatif": {
        "lemma": "justificatif",
        "en": "supporting document / proof",
        "bn": "প্রমাণপত্র / প্রত্যয়ন",
        "pos": "noun"
      },
      "domicile": {
        "lemma": "domicile",
        "en": "home / residence",
        "bn": "বাসস্থান / ঠিকানা",
        "pos": "noun"
      },
      "récent": {
        "lemma": "récent",
        "en": "recent",
        "bn": "সাম্প্রতিক",
        "pos": "adjective"
      },
      "attestant": {
        "lemma": "attester",
        "en": "attesting / certifying",
        "bn": "প্রত্যয়নকারী / প্রমাণকারী",
        "pos": "verb"
      },
      "adresse": {
        "lemma": "adresse",
        "en": "address",
        "bn": "ঠিকানা",
        "pos": "noun"
      },
      "postale": {
        "lemma": "postal",
        "en": "postal",
        "bn": "ডাক সংক্রান্ত",
        "pos": "adjective"
      },
      "ainsi": {
        "lemma": "ainsi",
        "en": "thus / in this way",
        "bn": "এভাবে / সুতরাং",
        "pos": "adverb"
      },
      "que": {
        "lemma": "que",
        "en": "that / what",
        "bn": "কী / যে",
        "pos": "pronoun"
      },
      "attestation": {
        "lemma": "attestation",
        "en": "certificate / formal proof",
        "bn": "প্রত্যয়নপত্র / সনদ",
        "pos": "noun"
      },
      "embauche": {
        "lemma": "embauche",
        "en": "hiring / employment",
        "bn": "চাকরি নিয়োগ / নিয়োগ",
        "pos": "noun"
      },
      "tout": {
        "lemma": "tout",
        "en": "all / everything",
        "bn": "সবকিছু",
        "pos": "pronoun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "parfaitement": {
        "lemma": "parfaitement",
        "en": "perfectly",
        "bn": "নিখুঁতভাবে",
        "pos": "adverb"
      },
      "ordre": {
        "lemma": "ordre",
        "en": "order / in order",
        "bn": "ক্রম / শৃঙ্খলা",
        "pos": "noun"
      },
      "conforme": {
        "lemma": "conforme",
        "en": "compliant / conforming",
        "bn": "যথাযথ / মানসম্মত",
        "pos": "adjective"
      },
      "aux": {
        "lemma": "à + les",
        "en": "to the / at the (plural)",
        "bn": "তে / প্রতি",
        "pos": "preposition"
      },
      "exigences": {
        "lemma": "exigence",
        "en": "requirements",
        "bn": "শর্তাবলী / প্রয়োজনীয়তা",
        "pos": "noun"
      },
      "réglementaires": {
        "lemma": "réglementaire",
        "en": "regulatory / legal",
        "bn": "আইনসম্মত / নিয়ন্ত্রণমূলক",
        "pos": "adjective"
      },
      "différentes": {
        "lemma": "différent",
        "en": "different (plural)",
        "bn": "বিভিন্ন / নানা ধরনের",
        "pos": "adjective"
      },
      "options": {
        "lemma": "option",
        "en": "options",
        "bn": "বিকল্পসমূহ",
        "pos": "noun"
      },
      "nous": {
        "lemma": "nous",
        "en": "we / us",
        "bn": "আমরা / আমাদের",
        "pos": "pronoun"
      },
      "proposons": {
        "lemma": "proposer",
        "en": "offer (nous)",
        "bn": "অফার করি / দিই",
        "pos": "verb"
      },
      "courant": {
        "lemma": "courant",
        "en": "current (account) / everyday",
        "bn": "চলতি (হিসাব) / সাধারণ",
        "pos": "adjective"
      },
      "carte": {
        "lemma": "carte",
        "en": "card / menu",
        "bn": "কার্ড / মেনু",
        "pos": "noun"
      },
      "internationale": {
        "lemma": "international",
        "en": "international (feminine)",
        "bn": "আন্তর্জাতিক",
        "pos": "adjective"
      },
      "débit": {
        "lemma": "débit",
        "en": "debit (immediate)",
        "bn": "ডেবিট",
        "pos": "noun"
      },
      "immédiat": {
        "lemma": "immédiat",
        "en": "immediate",
        "bn": "তাৎক্ষণিক",
        "pos": "adjective"
      },
      "accès": {
        "lemma": "accès",
        "en": "access / entrance",
        "bn": "প্রবেশাধিকার / অ্যাক্সেস",
        "pos": "noun"
      },
      "illimité": {
        "lemma": "illimité",
        "en": "unlimited",
        "bn": "সীমাহীন / আনলিমিটেড",
        "pos": "adjective"
      },
      "notre": {
        "lemma": "notre",
        "en": "our",
        "bn": "আমাদের",
        "pos": "pronoun"
      },
      "application": {
        "lemma": "application",
        "en": "app / application",
        "bn": "অ্যাপ্লিকেশন / অ্যাপ",
        "pos": "noun"
      },
      "mobile": {
        "lemma": "mobile",
        "en": "mobile (phone/network)",
        "bn": "মোবাইল",
        "pos": "adjective"
      },
      "sécurisée": {
        "lemma": "sécuriser",
        "en": "secured / secure (feminine)",
        "bn": "সুরক্ষিত",
        "pos": "adjective"
      },
      "pourrez": {
        "lemma": "pouvoir",
        "en": "will be able to (vous)",
        "bn": "পারবেন",
        "pos": "verb"
      },
      "suivre": {
        "lemma": "suivre",
        "en": "to follow / track",
        "bn": "অনুসরণ করা / পর্যবেক্ষণ",
        "pos": "verb"
      },
      "vos": {
        "lemma": "votre",
        "en": "your (plural)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "temps": {
        "lemma": "temps",
        "en": "time / weather / real-time",
        "bn": "সময় / আবহাওয়া",
        "pos": "noun"
      },
      "réel": {
        "lemma": "réel",
        "en": "real / live",
        "bn": "বাস্তব",
        "pos": "adjective"
      },
      "bloquer": {
        "lemma": "bloquer",
        "en": "to block / freeze (card)",
        "bn": "ব্লক করা / সাময়িক বন্ধ করা",
        "pos": "verb"
      },
      "temporairement": {
        "lemma": "temporairement",
        "en": "temporarily",
        "bn": "সাময়িকভাবে",
        "pos": "adverb"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "si": {
        "lemma": "si",
        "en": "if",
        "bn": "যদি",
        "pos": "conjunction"
      },
      "nécessaire": {
        "lemma": "nécessaire",
        "en": "necessary",
        "bn": "প্রয়োজনীয়",
        "pos": "adjective"
      },
      "effectuer": {
        "lemma": "effectuer",
        "en": "to carry out / make (transfer)",
        "bn": "সম্পন্ন করা / পাঠানো",
        "pos": "verb"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "virements": {
        "lemma": "virement",
        "en": "bank transfers",
        "bn": "ব্যাংক ট্রান্সফারসমূহ",
        "pos": "noun"
      },
      "instantanés": {
        "lemma": "instantané",
        "en": "instant (transfers)",
        "bn": "তাৎক্ষণিক",
        "pos": "adjective"
      },
      "gratuitement": {
        "lemma": "gratuitement",
        "en": "free of charge",
        "bn": "বিনামূল্যে",
        "pos": "adverb"
      },
      "valide": {
        "lemma": "valider",
        "en": "validates / valid",
        "bn": "অনুমোদন করে / বৈধ",
        "pos": "verb"
      },
      "cette": {
        "lemma": "ce",
        "en": "this (feminine)",
        "bn": "এই",
        "pos": "adjective"
      },
      "formule": {
        "lemma": "formule",
        "en": "set deal / package",
        "bn": "প্যাকেজ / সেট মেনু",
        "pos": "noun"
      },
      "moderne": {
        "lemma": "moderne",
        "en": "modern",
        "bn": "আধুনিক",
        "pos": "adjective"
      },
      "pratique": {
        "lemma": "pratique",
        "en": "practical / practice",
        "bn": "বাস্তবমুখী / ব্যবহারিক",
        "pos": "adjective"
      },
      "électroniquement": {
        "lemma": "électroniquement",
        "en": "electronically",
        "bn": "ইলেকট্রনিকভাবে",
        "pos": "adverb"
      },
      "convention": {
        "lemma": "convention",
        "en": "agreement / convention",
        "bn": "চুক্তি / সনদ",
        "pos": "noun"
      },
      "tablette": {
        "lemma": "tablette",
        "en": "tablet computer",
        "bn": "ট্যাবলেট কম্পিউটার",
        "pos": "noun"
      },
      "tactile": {
        "lemma": "tactile",
        "en": "touch (screen)",
        "bn": "স্পর্শকাতর / টাচস্ক্রিন",
        "pos": "adjective"
      },
      "imprime": {
        "lemma": "imprimer",
        "en": "prints",
        "bn": "প্রিন্ট করে",
        "pos": "verb"
      },
      "document": {
        "lemma": "document",
        "en": "document",
        "bn": "নথি / দলিল",
        "pos": "noun"
      },
      "essentiel": {
        "lemma": "essentiel",
        "en": "essential / vital",
        "bn": "অত্যাবশ্যকীয় / মূল",
        "pos": "adjective"
      },
      "voici": {
        "lemma": "voici",
        "en": "here is / here are",
        "bn": "এই যে / এখানে",
        "pos": "preposition"
      },
      "relevé": {
        "lemma": "relevé",
        "en": "statement (RIB / bank / grades)",
        "bn": "বিবরণী / স্টেটমেন্ট",
        "pos": "noun"
      },
      "identité": {
        "lemma": "identité",
        "en": "identity",
        "bn": "পরিচয়",
        "pos": "noun"
      },
      "on": {
        "lemma": "on",
        "en": "one / we / people",
        "bn": "আমরা / মানুষ",
        "pos": "pronoun"
      },
      "appelle": {
        "lemma": "appeler",
        "en": "calls / names",
        "bn": "ডাকে / নাম",
        "pos": "verb"
      },
      "couramment": {
        "lemma": "couramment",
        "en": "commonly / fluently",
        "bn": "সাধারণভাবে / সাবলীলভাবে",
        "pos": "adverb"
      },
      "rib": {
        "lemma": "RIB",
        "en": "bank account details statement",
        "bn": "আরআইবি (ব্যাংক বিবরণী)",
        "pos": "noun",
        "ttsText": "Relevé d'identité bancaire"
      },
      "devez": {
        "lemma": "devoir",
        "en": "must / have to (vous)",
        "bn": "আপনাকে অবশ্যই হবে",
        "pos": "verb"
      },
      "transmettre": {
        "lemma": "transmettre",
        "en": "to transmit / hand over",
        "bn": "জমা দেওয়া / পাঠানো",
        "pos": "verb"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "employeur": {
        "lemma": "employeur",
        "en": "employer",
        "bn": "নিয়োগকর্তা",
        "pos": "noun"
      },
      "versement": {
        "lemma": "versement",
        "en": "payment / deposit (wages)",
        "bn": "টাকা জমা / বেতন প্রদান",
        "pos": "noun"
      },
      "automatique": {
        "lemma": "automatique",
        "en": "automatic",
        "bn": "স্বয়ংক্রিয়",
        "pos": "adjective"
      },
      "fin": {
        "lemma": "fin",
        "en": "end",
        "bn": "শেষ",
        "pos": "noun"
      },
      "mois": {
        "lemma": "mois",
        "en": "month / months",
        "bn": "মাস",
        "pos": "noun"
      },
      "physique": {
        "lemma": "physique",
        "en": "physical (card)",
        "bn": "বাস্তব / দৃশ্যমান কার্ড",
        "pos": "adjective"
      },
      "code": {
        "lemma": "code",
        "en": "PIN code / rule",
        "bn": "কোড / পিন নম্বর",
        "pos": "noun"
      },
      "confidentiel": {
        "lemma": "confidentiel",
        "en": "confidential",
        "bn": "গোপনীয়",
        "pos": "adjective"
      },
      "arriveront": {
        "lemma": "arriver",
        "en": "will arrive",
        "bn": "পৌঁছাবে",
        "pos": "verb"
      },
      "courrier": {
        "lemma": "courrier",
        "en": "mail / letters",
        "bn": "চিঠিপত্র / ডাক",
        "pos": "noun"
      },
      "sécurisé": {
        "lemma": "sécuriser",
        "en": "secure",
        "bn": "সুরক্ষিত",
        "pos": "adjective"
      },
      "ici": {
        "lemma": "ici",
        "en": "here",
        "bn": "এখানে",
        "pos": "adverb"
      },
      "semaine": {
        "lemma": "semaine",
        "en": "week",
        "bn": "সপ্তাহ",
        "pos": "noun"
      },
      "repart": {
        "lemma": "repartir",
        "en": "leaves / goes away",
        "bn": "প্রস্থান করে / চলে যায়",
        "pos": "verb"
      },
      "ravi": {
        "lemma": "ravi",
        "en": "delighted / thrilled",
        "bn": "আনন্দিত / সন্তুষ্ট",
        "pos": "adjective"
      },
      "serein": {
        "lemma": "serein",
        "en": "serene / confident",
        "bn": "নিশ্চিন্ত / প্রশান্ত",
        "pos": "adjective"
      },
      "suite": {
        "lemma": "suite",
        "en": "following / next steps",
        "bn": "পরবর্তী ধাপ / ধারাবাহিকতা",
        "pos": "noun"
      },
      "démarches": {
        "lemma": "démarche",
        "en": "procedures / steps",
        "bn": "প্রশাসনিক পদক্ষেপসমূহ",
        "pos": "noun"
      },
      "qu": {
        "lemma": "que",
        "en": "that / what (elision)",
        "bn": "যা / কী",
        "pos": "pronoun"
      }
    },
    "quiz": [
      {
        "question": "Pourquoi l'ouverture d'un compte bancaire est-elle indispensable pour Kabir ?",
        "options": [
          "Pour acheter une voiture de luxe",
          "Pour recevoir son salaire professionnel et payer ses dépenses quotidiennes",
          "Pour voyager sans passeport",
          "Pour changer de numéro de téléphone"
        ],
        "answer": 1,
        "explanation": "The text explains: \"pour percevoir son salaire et régler ses dépenses du quotidien\" (to receive his wages and pay everyday expenses).",
        "explanationBn": "টেক্সটে বলা আছে: বেতন গ্রহণ করার জন্য এবং দৈনন্দিন খরচ মেটানোর জন্য ব্যাংক অ্যাকাউন্ট প্রয়োজন।"
      },
      {
        "question": "Quel document financier très important la conseillère remet-elle immédiatement à Kabir ?",
        "options": [
          "Un chéquier de voyage",
          "Le Relevé d'Identité Bancaire (RIB)",
          "Un prêt immobilier",
          "Une carte d'assurance auto"
        ],
        "answer": 1,
        "explanation": "The advisor prints the RIB: \"Voici votre Relevé d'Identité Bancaire, qu'on appelle couramment le RIB\".",
        "explanationBn": "ব্যাংক কর্মকর্তা তাকে তাৎক্ষণিকভাবে আরআইবি (RIB - ব্যাংক অ্যাকাউন্ট বিবরণী) প্রদান করেন।"
      },
      {
        "question": "À qui Kabir doit-il transmettre son Relevé d'Identité Bancaire (RIB) ?",
        "options": [
          "À son propriétaire d'hôtel",
          "À son employeur pour le virement de son salaire",
          "À la boulangère du quartier",
          "Au chauffeur de taxi"
        ],
        "answer": 1,
        "explanation": "The advisor states: \"Vous devez transmettre ce document à votre employeur pour le versement automatique de votre salaire\".",
        "explanationBn": "বেতন সরাসরি জমা হওয়ার জন্য এই নথিটি নিজ নিয়োগকর্তা বা প্রতিষ্ঠানে জমা দিতে হয়।"
      }
    ]
  },
  {
    "id": "entretien-embauche-informatique",
    "title": "Entretien d'embauche : technicien informatique",
    "subtitle": "Présenter son parcours et ses compétences techniques",
    "level": "A2",
    "topic": "Travail & Emploi",
    "wordCount": 317,
    "estimatedMinutes": 4,
    "paragraphs": [
      "Aujourd'hui est un grand jour pour Rahim. Après avoir répondu à une offre d'emploi sur un site spécialisé, il a été convoqué pour un entretien d'embauche au siège d'une entreprise de services numériques à Paris. Le poste proposé est un contrat à durée indéterminée en tant que technicien de support informatique de proximité.",
      "Rahim arrive vêtu d'une chemise propre et d'un pantalon élégant. À l'accueil, il annonce son arrivée à l'hôtesse qui prévient le recruteur. Deux minutes plus tard, monsieur Bernard, le responsable du support technique, vient le chercher et le conduit dans une salle de réunion lumineuse. Après les salutations d'usage, l'entretien commence dans une ambiance bienveillante.",
      "Le recruteur invite Rahim à retracer son parcours : « Parlez-moi un peu de vos études et de votre expérience technique. » Rahim s'exprime avec clarté et assurance : « J'ai obtenu un diplôme d'ingénierie en technologie informatique d'une durée de quatre ans. Au cours de ma formation pratique, j'ai appris à configurer des réseaux locaux, installer des systèmes d'exploitation Windows et Linux, et diagnostiquer des pannes matérielles sur des ordinateurs de bureau. »",
      "Monsieur Bernard pose ensuite une question sur la relation avec les utilisateurs : « Comment réagissez-vous lorsqu'un employé panique à cause d'un ordinateur bloqué avant une réunion urgente ? » Rahim répond avec calme : « Je l'écoute d'abord attentivement pour le rassurer. Ensuite, j'identifie le problème avec méthode sans précipitation, puis je propose une solution rapide ou un poste de remplacement provisoire. L'écoute et la patience sont indispensables dans le support client. »",
      "Le responsable technique hoche la tête, visiblement conquis par cette attitude professionnelle : « Très bonne réponse. Votre profil technique correspond tout à fait à nos besoins actuels. Nous terminons les entretiens cette semaine et nous vous contacterons lundi prochain pour vous donner notre réponse définitive. » Rahim remercie chaleureusement son interlocuteur et quitte l'immeuble le cœur léger et plein d'espoir."
    ],
    "paragraphTranslations": [
      "Today is a major day for Rahim. After applying to a job listing on a specialized platform, he was invited for a job interview at the headquarters of a digital services company in Paris. The position being offered is an open-ended permanent contract as an on-site IT support technician.",
      "Rahim arrives dressed in a clean collared shirt and tailored trousers. At the reception desk, he announces his arrival to the receptionist who notifies the recruiter. Two minutes later, Mr. Bernard, the technical support manager, comes down to meet him and leads him into a bright meeting room. After standard greetings, the interview begins in a supportive atmosphere.",
      "The recruiter invites Rahim to outline his background: \"Tell me a bit about your studies and your technical background.\" Rahim speaks with clarity and confidence: \"I completed a four-year diploma in computer technology engineering. During my hands-on training, I learned how to set up local networks, deploy Windows and Linux operating systems, and troubleshoot hardware failures on desktop computers.\"",
      "Mr. Bernard then asks a question regarding user interaction: \"How do you handle a situation where an employee is panicking because their workstation crashed right before an urgent meeting?\" Rahim answers calmly: \"First, I listen attentively to reassure them. Next, I diagnose the root issue methodically without rushing, and then offer an immediate fix or a temporary loan workstation. Empathy and patience are fundamental in user support.\"",
      "The technical manager nods, visibly impressed by this professional mindset: \"Very good answer. Your technical profile aligns perfectly with our present needs. We finish interviews this week and will get back to you next Monday with our final decision.\" Rahim thanks his host warmly and leaves the building with high spirits and optimism."
    ],
    "vocabulary": {
      "aujourd'hui": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "grand": {
        "lemma": "grand",
        "en": "large / big",
        "bn": "বড়",
        "pos": "adjective"
      },
      "jour": {
        "lemma": "jour",
        "en": "day",
        "bn": "দিন",
        "pos": "noun"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "rahim": {
        "lemma": "Rahim",
        "en": "Rahim (first name)",
        "bn": "রহিম (নাম)",
        "pos": "noun"
      },
      "après": {
        "lemma": "après",
        "en": "after",
        "bn": "পরে",
        "pos": "preposition"
      },
      "avoir": {
        "lemma": "avoir",
        "en": "to have",
        "bn": "থাকা / পাওয়া",
        "pos": "verb"
      },
      "répondu": {
        "lemma": "répondre",
        "en": "answered / applied",
        "bn": "উত্তর দিয়েছে / আবেদন করেছে",
        "pos": "verb"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "offre": {
        "lemma": "offre",
        "en": "offer / job offer",
        "bn": "অফার / চাকরির সুযোগ",
        "pos": "noun"
      },
      "emploi": {
        "lemma": "emploi",
        "en": "job / employment",
        "bn": "চাকরি / কর্মসংস্থান",
        "pos": "noun"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "site": {
        "lemma": "site",
        "en": "website / site",
        "bn": "ওয়েবসাইট",
        "pos": "noun"
      },
      "spécialisé": {
        "lemma": "spécialiser",
        "en": "specialized",
        "bn": "বিশেষায়িত",
        "pos": "adjective"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "été": {
        "lemma": "être",
        "en": "been (past participle) / summer",
        "bn": "হয়েছে / গ্রীষ্ম",
        "pos": "verb"
      },
      "convoqué": {
        "lemma": "convoquer",
        "en": "summoned / invited",
        "bn": "আমন্ত্রিত / তলব করা",
        "pos": "adjective"
      },
      "entretien": {
        "lemma": "entretien",
        "en": "interview / maintenance",
        "bn": "ইন্টারভিউ / রক্ষণাবেক্ষণ",
        "pos": "noun"
      },
      "embauche": {
        "lemma": "embauche",
        "en": "hiring / employment",
        "bn": "চাকরি নিয়োগ / নিয়োগ",
        "pos": "noun"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "siège": {
        "lemma": "siège",
        "en": "headquarters / seat",
        "bn": "প্রধান কার্যালয় / হেডকোয়ার্টার",
        "pos": "noun"
      },
      "entreprise": {
        "lemma": "entreprise",
        "en": "company / enterprise",
        "bn": "প্রতিষ্ঠান / কোম্পানি",
        "pos": "noun"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "services": {
        "lemma": "service",
        "en": "services",
        "bn": "সেবাসমূহ",
        "pos": "noun"
      },
      "numériques": {
        "lemma": "numérique",
        "en": "digital (services)",
        "bn": "ডিজিটাল",
        "pos": "adjective"
      },
      "paris": {
        "lemma": "Paris",
        "en": "Paris",
        "bn": "প্যারিস",
        "pos": "noun"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "poste": {
        "lemma": "poste",
        "en": "job position / workstation / mail",
        "bn": "পদ / ওয়ার্কস্টেশন / ডাক",
        "pos": "noun"
      },
      "proposé": {
        "lemma": "proposer",
        "en": "offered / proposed",
        "bn": "প্রস্তাবিত",
        "pos": "adjective"
      },
      "contrat": {
        "lemma": "contrat",
        "en": "contract / agreement",
        "bn": "চুক্তিপত্র",
        "pos": "noun"
      },
      "durée": {
        "lemma": "durée",
        "en": "duration / length",
        "bn": "মেয়াদ / সময়কাল",
        "pos": "noun"
      },
      "indéterminée": {
        "lemma": "indéterminé",
        "en": "permanent (contract CDI)",
        "bn": "স্থায়ী (চাকরির চুক্তি)",
        "pos": "adjective"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "tant": {
        "lemma": "tant",
        "en": "as (en tant que)",
        "bn": "হিসেবে",
        "pos": "adverb"
      },
      "que": {
        "lemma": "que",
        "en": "that / what",
        "bn": "কী / যে",
        "pos": "pronoun"
      },
      "technicien": {
        "lemma": "technicien",
        "en": "technician",
        "bn": "টেকনিশিয়ান / কারিগরি কর্মী",
        "pos": "noun"
      },
      "support": {
        "lemma": "support",
        "en": "support (IT)",
        "bn": "আইটি সহায়তা / সাপোর্ট",
        "pos": "noun"
      },
      "informatique": {
        "lemma": "informatique",
        "en": "IT / computing",
        "bn": "আইটি / কম্পিউটার বিজ্ঞান",
        "pos": "noun"
      },
      "proximité": {
        "lemma": "proximité",
        "en": "proximity / on-site (support de proximité)",
        "bn": "নিকটবর্তী / অন-সাইট",
        "pos": "noun"
      },
      "aujourd": {
        "lemma": "aujourd'hui",
        "en": "today",
        "bn": "আজ",
        "pos": "adverb"
      },
      "hui": {
        "lemma": "aujourd'hui",
        "en": "today (part of aujourd'hui)",
        "bn": "আজ",
        "pos": "adverb"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "arrive": {
        "lemma": "arriver",
        "en": "arrives",
        "bn": "পৌঁছায়",
        "pos": "verb"
      },
      "vêtu": {
        "lemma": "vêtir",
        "en": "dressed",
        "bn": "পোশাক পরিহিত",
        "pos": "adjective"
      },
      "chemise": {
        "lemma": "chemise",
        "en": "shirt / paper folder",
        "bn": "শার্ট / ফাইল ফোল্ডার",
        "pos": "noun"
      },
      "propre": {
        "lemma": "propre",
        "en": "clean / own",
        "bn": "পরিষ্কার / নিজস্ব",
        "pos": "adjective"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "pantalon": {
        "lemma": "pantalon",
        "en": "trousers / pants",
        "bn": "প্যান্ট",
        "pos": "noun"
      },
      "élégant": {
        "lemma": "élégant",
        "en": "smart / elegant",
        "bn": "মার্জিত",
        "pos": "adjective"
      },
      "accueil": {
        "lemma": "accueil",
        "en": "reception / welcome",
        "bn": "অভ্যর্থনা / স্বাগত",
        "pos": "noun"
      },
      "annonce": {
        "lemma": "annoncer",
        "en": "announces / states",
        "bn": "জানায়",
        "pos": "verb"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "arrivée": {
        "lemma": "arrivée",
        "en": "arrival",
        "bn": "আগমন",
        "pos": "noun"
      },
      "hôtesse": {
        "lemma": "hôte",
        "en": "receptionist / hostess",
        "bn": "অভ্যর্থনাকারী",
        "pos": "noun"
      },
      "qui": {
        "lemma": "qui",
        "en": "who / which",
        "bn": "যে / কে",
        "pos": "pronoun"
      },
      "prévient": {
        "lemma": "prévenir",
        "en": "notifies / informs",
        "bn": "জানায় / অবহিত করে",
        "pos": "verb"
      },
      "recruteur": {
        "lemma": "recruteur",
        "en": "recruiter / hiring manager",
        "bn": "নিয়োগকারী",
        "pos": "noun"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "minutes": {
        "lemma": "minute",
        "en": "minutes",
        "bn": "মিনিট",
        "pos": "noun"
      },
      "plus": {
        "lemma": "plus",
        "en": "more / plus",
        "bn": "আরও",
        "pos": "adverb"
      },
      "tard": {
        "lemma": "tard",
        "en": "late (plus tard = later)",
        "bn": "দেরিতে (পরে)",
        "pos": "adverb"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "bernard": {
        "lemma": "Bernard",
        "en": "Bernard (name)",
        "bn": "বার্নার্ড (নাম)",
        "pos": "noun"
      },
      "responsable": {
        "lemma": "responsable",
        "en": "manager / coordinator / responsible",
        "bn": "প্রধান কর্মকর্তা / দায়িত্বপ্রাপ্ত",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "technique": {
        "lemma": "technique",
        "en": "technical / technique",
        "bn": "কারিগরি / টেকনিক্যাল",
        "pos": "adjective"
      },
      "vient": {
        "lemma": "venir",
        "en": "comes / has just (vient de)",
        "bn": "আসে / এইমাত্র",
        "pos": "verb"
      },
      "chercher": {
        "lemma": "chercher",
        "en": "to look for / fetch",
        "bn": "খোঁজা / নিয়ে আসা",
        "pos": "verb"
      },
      "conduit": {
        "lemma": "conduire",
        "en": "leads / guides",
        "bn": "নিয়ে যায় / পরিচালনা করে",
        "pos": "verb"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "salle": {
        "lemma": "salle",
        "en": "room / hall",
        "bn": "কক্ষ / রুম",
        "pos": "noun"
      },
      "réunion": {
        "lemma": "réunion",
        "en": "meeting",
        "bn": "সভা / মিটিং",
        "pos": "noun"
      },
      "lumineuse": {
        "lemma": "lumineux",
        "en": "bright (feminine)",
        "bn": "উজ্জ্বল",
        "pos": "adjective"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "salutations": {
        "lemma": "salutation",
        "en": "greetings",
        "bn": "অভিবাদন / সম্ভাষণ",
        "pos": "noun"
      },
      "usage": {
        "lemma": "usage",
        "en": "customary / usage (d'usage)",
        "bn": "প্রচলিত রীতি / ব্যবহার",
        "pos": "noun"
      },
      "commence": {
        "lemma": "commencer",
        "en": "starts / begins",
        "bn": "শুরু হয়",
        "pos": "verb"
      },
      "ambiance": {
        "lemma": "ambiance",
        "en": "atmosphere / mood",
        "bn": "পরিবেশ / আবহ",
        "pos": "noun"
      },
      "bienveillante": {
        "lemma": "bienveillant",
        "en": "benevolent / kind / caring",
        "bn": "সহানুভূতিশীল / অমায়িক",
        "pos": "adjective"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "invite": {
        "lemma": "inviter",
        "en": "invites",
        "bn": "আমন্ত্রণ জানায়",
        "pos": "verb"
      },
      "retracer": {
        "lemma": "retracer",
        "en": "to recount / trace back",
        "bn": "তুলে ধরা / বর্ণনা করা",
        "pos": "verb"
      },
      "parcours": {
        "lemma": "parcours",
        "en": "career path / background",
        "bn": "অভিজ্ঞতার পথ / ক্যারিয়ার",
        "pos": "noun"
      },
      "parlez-moi": {
        "lemma": "parler",
        "en": "tell me",
        "bn": "আমাকে বলুন",
        "pos": "verb"
      },
      "peu": {
        "lemma": "peu",
        "en": "little / slight",
        "bn": "একটু / অল্প",
        "pos": "adverb"
      },
      "vos": {
        "lemma": "votre",
        "en": "your (plural)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "études": {
        "lemma": "étude",
        "en": "studies / degree",
        "bn": "পড়াশোনা / উচ্চশিক্ষা",
        "pos": "noun"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "expérience": {
        "lemma": "expérience",
        "en": "experience",
        "bn": "অভিজ্ঞতা",
        "pos": "noun"
      },
      "exprime": {
        "lemma": "exprimer",
        "en": "expresses oneself",
        "bn": "ব্যক্ত করে / প্রকাশ করে",
        "pos": "verb"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "clarté": {
        "lemma": "clarté",
        "en": "clarity",
        "bn": "স্পষ্টতা",
        "pos": "noun"
      },
      "assurance": {
        "lemma": "assurance",
        "en": "confidence / insurance",
        "bn": "আত্মবিশ্বাস / নিশ্চয়তা",
        "pos": "noun"
      },
      "ai": {
        "lemma": "avoir",
        "en": "have (first person: j'ai)",
        "bn": "আছে (আমার আছে)",
        "pos": "verb"
      },
      "obtenu": {
        "lemma": "obtenir",
        "en": "obtained / completed",
        "bn": "অর্জন করেছে / পেয়েছে",
        "pos": "verb"
      },
      "diplôme": {
        "lemma": "diplôme",
        "en": "diploma / degree",
        "bn": "সনদ / ডিপ্লোমা",
        "pos": "noun"
      },
      "ingénierie": {
        "lemma": "ingénierie",
        "en": "engineering",
        "bn": "প্রকৌশল / ইঞ্জিনিয়ারিং",
        "pos": "noun"
      },
      "technologie": {
        "lemma": "technologie",
        "en": "technology",
        "bn": "প্রযুক্তি",
        "pos": "noun"
      },
      "quatre": {
        "lemma": "quatre",
        "en": "four",
        "bn": "চার",
        "pos": "adjective"
      },
      "ans": {
        "lemma": "an",
        "en": "years",
        "bn": "বছর",
        "pos": "noun"
      },
      "cours": {
        "lemma": "cours",
        "en": "class / course / in progress",
        "bn": "ক্লাস / কোর্স / চলমান",
        "pos": "noun"
      },
      "ma": {
        "lemma": "son",
        "en": "my (feminine)",
        "bn": "আমার",
        "pos": "pronoun"
      },
      "formation": {
        "lemma": "formation",
        "en": "training course / studies",
        "bn": "প্রশিক্ষণ / কোর্স",
        "pos": "noun"
      },
      "pratique": {
        "lemma": "pratique",
        "en": "practical / practice",
        "bn": "বাস্তবমুখী / ব্যবহারিক",
        "pos": "adjective"
      },
      "appris": {
        "lemma": "apprendre",
        "en": "learned",
        "bn": "শিখেছে",
        "pos": "verb"
      },
      "configurer": {
        "lemma": "configurer",
        "en": "to configure / set up",
        "bn": "কনফিগার করা / সেটআপ করা",
        "pos": "verb"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "réseaux": {
        "lemma": "réseau",
        "en": "networks",
        "bn": "নেটওয়ার্কসমূহ",
        "pos": "noun"
      },
      "locaux": {
        "lemma": "local",
        "en": "premises / local (plural)",
        "bn": "কক্ষসমূহ / স্থানীয়",
        "pos": "noun"
      },
      "installer": {
        "lemma": "installer",
        "en": "to install / deploy",
        "bn": "ইনস্টল করা",
        "pos": "verb"
      },
      "systèmes": {
        "lemma": "système",
        "en": "systems",
        "bn": "সিস্টেমসমূহ",
        "pos": "noun"
      },
      "exploitation": {
        "lemma": "système d'exploitation",
        "en": "operating system",
        "bn": "অপারেটিং সিস্টেম",
        "pos": "noun"
      },
      "windows": {
        "lemma": "Windows",
        "en": "Microsoft Windows OS",
        "bn": "উইন্ডোজ অপারেটিং সিস্টেম",
        "pos": "noun"
      },
      "linux": {
        "lemma": "Linux",
        "en": "Linux operating system",
        "bn": "লিনাক্স অপারেটিং সিস্টেম",
        "pos": "noun"
      },
      "diagnostiquer": {
        "lemma": "diagnostiquer",
        "en": "to troubleshoot / diagnose",
        "bn": "ত্রুটি চিহ্নিত করা / নির্ণয় করা",
        "pos": "verb"
      },
      "pannes": {
        "lemma": "panne",
        "en": "breakdowns / hardware failures",
        "bn": "হার্ডওয়্যার ত্রুটিসমূহ",
        "pos": "noun"
      },
      "matérielles": {
        "lemma": "matériel",
        "en": "hardware (failures)",
        "bn": "হার্ডওয়্যার সংক্রান্ত",
        "pos": "adjective"
      },
      "ordinateurs": {
        "lemma": "ordinateur",
        "en": "computers",
        "bn": "কম্পিউটারসমূহ",
        "pos": "noun"
      },
      "bureau": {
        "lemma": "bureau",
        "en": "office / desk",
        "bn": "অফিস / পড়ার টেবিল",
        "pos": "noun"
      },
      "parlez": {
        "lemma": "parler",
        "en": "speak / tell (parlez-moi)",
        "bn": "বলুন",
        "pos": "verb"
      },
      "moi": {
        "lemma": "moi",
        "en": "me",
        "bn": "আমাকে / আমি",
        "pos": "pronoun"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "j": {
        "lemma": "je",
        "en": "I (elision)",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "pose": {
        "lemma": "poser",
        "en": "places / puts / asks",
        "bn": "রাখে / জিজ্ঞেস করে",
        "pos": "verb"
      },
      "ensuite": {
        "lemma": "ensuite",
        "en": "then / next",
        "bn": "তারপর",
        "pos": "adverb"
      },
      "question": {
        "lemma": "question",
        "en": "question",
        "bn": "প্রশ্ন",
        "pos": "noun"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "relation": {
        "lemma": "relation",
        "en": "relationship / interaction",
        "bn": "সম্পর্ক / যোগাযোগ",
        "pos": "noun"
      },
      "utilisateurs": {
        "lemma": "utilisateur",
        "en": "users",
        "bn": "ব্যবহারকারীগণ",
        "pos": "noun"
      },
      "comment": {
        "lemma": "comment",
        "en": "how / what",
        "bn": "কেমন / কীভাবে / কী",
        "pos": "adverb"
      },
      "réagissez-vous": {
        "lemma": "réagir",
        "en": "how do you react",
        "bn": "আপনি কীভাবে প্রতিক্রিয়া জানান",
        "pos": "verb"
      },
      "lorsqu'un": {
        "lemma": "lorsque",
        "en": "when a / when an",
        "bn": "যখন একজন",
        "pos": "conjunction"
      },
      "employé": {
        "lemma": "employé",
        "en": "employee",
        "bn": "কর্মচারী",
        "pos": "noun"
      },
      "panique": {
        "lemma": "paniquer",
        "en": "panics",
        "bn": "আতঙ্কিত হয়",
        "pos": "verb"
      },
      "cause": {
        "lemma": "cause",
        "en": "cause / reason",
        "bn": "কারণ",
        "pos": "noun"
      },
      "ordinateur": {
        "lemma": "ordinateur",
        "en": "computer",
        "bn": "কম্পিউটার",
        "pos": "noun"
      },
      "bloqué": {
        "lemma": "bloquer",
        "en": "blocked / frozen / stuck",
        "bn": "আটকে যাওয়া / বন্ধ",
        "pos": "adjective"
      },
      "avant": {
        "lemma": "avant",
        "en": "before",
        "bn": "আগে",
        "pos": "preposition"
      },
      "urgente": {
        "lemma": "urgent",
        "en": "urgent (feminine)",
        "bn": "জরুরি",
        "pos": "adjective"
      },
      "répond": {
        "lemma": "répondre",
        "en": "answers / replies",
        "bn": "উত্তর দেয়",
        "pos": "verb"
      },
      "calme": {
        "lemma": "calme",
        "en": "calm / quiet",
        "bn": "শান্ত",
        "pos": "adjective"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "écoute": {
        "lemma": "écouter",
        "en": "listens / active listening",
        "bn": "শোনে / মনোযোগ দিয়ে শোনা",
        "pos": "verb"
      },
      "abord": {
        "lemma": "d'abord",
        "en": "first of all",
        "bn": "প্রথমে / শুরুতে",
        "pos": "adverb"
      },
      "attentivement": {
        "lemma": "attentivement",
        "en": "attentively / carefully",
        "bn": "মনোযোগ সহকারে",
        "pos": "adverb"
      },
      "rassurer": {
        "lemma": "rassurer",
        "en": "to reassure",
        "bn": "আশ্বস্ত করা / সাহস দেওয়া",
        "pos": "verb"
      },
      "identifie": {
        "lemma": "identifier",
        "en": "identifies / detects",
        "bn": "চিহ্নিত করে",
        "pos": "verb"
      },
      "problème": {
        "lemma": "problème",
        "en": "problem / issue",
        "bn": "সমস্যা",
        "pos": "noun"
      },
      "méthode": {
        "lemma": "méthode",
        "en": "method / structured way",
        "bn": "পদ্ধতি / নিয়ম",
        "pos": "noun"
      },
      "sans": {
        "lemma": "sans",
        "en": "without",
        "bn": "ছাড়া / বিহীন",
        "pos": "preposition"
      },
      "précipitation": {
        "lemma": "précipitation",
        "en": "haste / rushing",
        "bn": "তাড়াহুড়ো",
        "pos": "noun"
      },
      "puis": {
        "lemma": "puis",
        "en": "then",
        "bn": "তারপর",
        "pos": "adverb"
      },
      "propose": {
        "lemma": "proposer",
        "en": "offers / suggests",
        "bn": "প্রস্তাব দেয় / প্রদান করে",
        "pos": "verb"
      },
      "solution": {
        "lemma": "solution",
        "en": "solution",
        "bn": "সমাধান",
        "pos": "noun"
      },
      "rapide": {
        "lemma": "rapide",
        "en": "fast / quick",
        "bn": "দ্রুত",
        "pos": "adjective"
      },
      "ou": {
        "lemma": "ou",
        "en": "or",
        "bn": "অথবা",
        "pos": "conjunction"
      },
      "remplacement": {
        "lemma": "remplacement",
        "en": "replacement (loan machine)",
        "bn": "প্রতিস্থাপন / বিকল্প",
        "pos": "noun"
      },
      "provisoire": {
        "lemma": "provisoire",
        "en": "provisional / temporary",
        "bn": "সাময়িক / অস্থায়ী",
        "pos": "adjective"
      },
      "patience": {
        "lemma": "patience",
        "en": "patience",
        "bn": "ধৈর্য",
        "pos": "noun"
      },
      "sont": {
        "lemma": "être",
        "en": "are (plural)",
        "bn": "হয় / আছেন",
        "pos": "verb"
      },
      "indispensables": {
        "lemma": "indispensable",
        "en": "indispensable (plural)",
        "bn": "অপরিহার্য",
        "pos": "adjective"
      },
      "client": {
        "lemma": "client",
        "en": "customer / client",
        "bn": "গ্রাহক",
        "pos": "noun"
      },
      "réagissez": {
        "lemma": "réagir",
        "en": "react (vous)",
        "bn": "প্রতিক্রিয়া জানান",
        "pos": "verb"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "lorsqu": {
        "lemma": "lorsque",
        "en": "when / whenever (before vowel)",
        "bn": "যখন",
        "pos": "conjunction"
      },
      "hoche": {
        "lemma": "hocher",
        "en": "nods (head)",
        "bn": "মাথা নাড়ায়",
        "pos": "verb"
      },
      "tête": {
        "lemma": "tête",
        "en": "head / headache",
        "bn": "মাথা / মাথা ব্যথা",
        "pos": "noun"
      },
      "visiblement": {
        "lemma": "visiblement",
        "en": "visibly / clearly",
        "bn": "দৃশ্যমানভাবে / স্পষ্টতই",
        "pos": "adverb"
      },
      "conquis": {
        "lemma": "conquérir",
        "en": "won over / impressed",
        "bn": "মুগ্ধ / সন্তুষ্ট",
        "pos": "adjective"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "cette": {
        "lemma": "ce",
        "en": "this (feminine)",
        "bn": "এই",
        "pos": "adjective"
      },
      "attitude": {
        "lemma": "attitude",
        "en": "attitude / mindset",
        "bn": "মনোভাব / আচরণ",
        "pos": "noun"
      },
      "professionnelle": {
        "lemma": "professionnel",
        "en": "professional (feminine)",
        "bn": "পেশাদার",
        "pos": "adjective"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "bonne": {
        "lemma": "bon",
        "en": "good",
        "bn": "ভালো",
        "pos": "adjective"
      },
      "réponse": {
        "lemma": "réponse",
        "en": "answer / reply / decision",
        "bn": "উত্তর / সিদ্ধান্ত",
        "pos": "noun"
      },
      "profil": {
        "lemma": "profil",
        "en": "profile / background",
        "bn": "প্রোফাইল / যোগ্যতা",
        "pos": "noun"
      },
      "correspond": {
        "lemma": "correspondre",
        "en": "matches / corresponds",
        "bn": "মিলে যায় / মানানসই হয়",
        "pos": "verb"
      },
      "tout": {
        "lemma": "tout",
        "en": "all / everything",
        "bn": "সবকিছু",
        "pos": "pronoun"
      },
      "fait": {
        "lemma": "faire",
        "en": "makes / does / fact",
        "bn": "করে / ঘটনা",
        "pos": "verb"
      },
      "nos": {
        "lemma": "notre",
        "en": "our (plural)",
        "bn": "আমাদের",
        "pos": "pronoun"
      },
      "besoins": {
        "lemma": "besoin",
        "en": "needs / requirements",
        "bn": "প্রয়োজনীয়তা",
        "pos": "noun"
      },
      "actuels": {
        "lemma": "actuel",
        "en": "current / present",
        "bn": "বর্তমান / চলমান",
        "pos": "adjective"
      },
      "nous": {
        "lemma": "nous",
        "en": "we / us",
        "bn": "আমরা / আমাদের",
        "pos": "pronoun"
      },
      "terminons": {
        "lemma": "terminer",
        "en": "finish (nous)",
        "bn": "শেষ করছি",
        "pos": "verb"
      },
      "entretiens": {
        "lemma": "entretien",
        "en": "interviews",
        "bn": "ইন্টারভিউগুলো",
        "pos": "noun"
      },
      "semaine": {
        "lemma": "semaine",
        "en": "week",
        "bn": "সপ্তাহ",
        "pos": "noun"
      },
      "contacterons": {
        "lemma": "contacter",
        "en": "will contact (future)",
        "bn": "যোগাযোগ করব",
        "pos": "verb"
      },
      "lundi": {
        "lemma": "lundi",
        "en": "Monday",
        "bn": "সোমবার",
        "pos": "noun"
      },
      "prochain": {
        "lemma": "prochain",
        "en": "next",
        "bn": "পরবর্তী",
        "pos": "adjective"
      },
      "donner": {
        "lemma": "donner",
        "en": "to give",
        "bn": "দেওয়া",
        "pos": "verb"
      },
      "notre": {
        "lemma": "notre",
        "en": "our",
        "bn": "আমাদের",
        "pos": "pronoun"
      },
      "définitive": {
        "lemma": "définitif",
        "en": "final / definitive",
        "bn": "চূড়ান্ত",
        "pos": "adjective"
      },
      "remercie": {
        "lemma": "remercier",
        "en": "thanks",
        "bn": "ধন্যবাদ জানায়",
        "pos": "verb"
      },
      "chaleureusement": {
        "lemma": "chaleureusement",
        "en": "warmly",
        "bn": "উষ্ণভাবে / আন্তরিকভাবে",
        "pos": "adverb"
      },
      "interlocuteur": {
        "lemma": "interlocuteur",
        "en": "interviewer / conversational partner",
        "bn": "কথোপকথনকারী / কর্মকর্তা",
        "pos": "noun"
      },
      "quitte": {
        "lemma": "quitter",
        "en": "leaves / exits",
        "bn": "বের হয় / ছেড়ে যায়",
        "pos": "verb"
      },
      "immeuble": {
        "lemma": "immeuble",
        "en": "apartment building",
        "bn": "বিল্ডিং / বহুতল ভবন",
        "pos": "noun"
      },
      "c": {
        "lemma": "ce",
        "en": "it / this (c'est)",
        "bn": "এটা / এই",
        "pos": "pronoun"
      },
      "ur": {
        "lemma": "heure",
        "en": "hour",
        "bn": "ঘণ্টা",
        "pos": "noun"
      },
      "léger": {
        "lemma": "léger",
        "en": "light / carefree",
        "bn": "হালকা / ভারমুক্ত",
        "pos": "adjective"
      },
      "plein": {
        "lemma": "plein",
        "en": "full",
        "bn": "পূর্ণ / ভরা",
        "pos": "adjective"
      },
      "espoir": {
        "lemma": "espoir",
        "en": "hope",
        "bn": "আশা",
        "pos": "noun"
      }
    },
    "quiz": [
      {
        "question": "Pour quel poste informatique Rahim passe-t-il cet entretien ?",
        "options": [
          "Développeur d'applications mobiles senior",
          "Technicien de support informatique de proximité",
          "Directeur financier de l'entreprise",
          "Vendeur de téléphones en magasin"
        ],
        "answer": 1,
        "explanation": "The text states: \"Le poste proposé est un contrat à durée indéterminée en tant que technicien de support informatique de proximité\".",
        "explanationBn": "গল্পে স্পষ্ট উল্লেখ আছে: পদটি হলো অন-সাইট আইটি সাপোর্ট টেকনিশিয়ান।"
      },
      {
        "question": "Quelle formation académique Rahim a-t-il suivie avant d'arriver en France ?",
        "options": [
          "Des études de médecine",
          "Un diplôme d'ingénierie en technologie informatique de quatre ans",
          "Une école de cuisine gastronomique",
          "Une formation en droit international"
        ],
        "answer": 1,
        "explanation": "Rahim explains: \"J'ai obtenu un diplôme d'ingénierie en technologie informatique d'une durée de quatre ans\".",
        "explanationBn": "রহিম জানায়: সে চার বছর মেয়াদি কম্পিউটার টেকনোলজি ইঞ্জিনিয়ারিং ডিপ্লোমা সম্পন্ন করেছে।"
      },
      {
        "question": "Quelle attitude Rahim privilégie-t-il face à un utilisateur paniqué ?",
        "options": [
          "L'ignorer et fermer le ticket",
          "L'écouter patiemment, le rassurer et trouver une solution avec méthode",
          "Lui demander de réparer lui-même son ordinateur",
          "Quitter la pièce"
        ],
        "answer": 1,
        "explanation": "Rahim highlights listening calmly and using a structured method: \"L'écoute et la patience sont indispensables dans le support client\".",
        "explanationBn": "রহিম জানায় ধৈর্য সহকারে কথা শুনে শান্ত করা এবং নিয়মতান্ত্রিকভাবে দ্রুত সমাধান দেওয়াই তার নীতি।"
      }
    ]
  },
  {
    "id": "rendez-vous-france-travail",
    "title": "Rendez-vous à France Travail",
    "subtitle": "Faire le point sur son projet professionnel avec un conseiller",
    "level": "A2",
    "topic": "Emploi & Formation",
    "wordCount": 292,
    "estimatedMinutes": 4,
    "paragraphs": [
      "Installé en France depuis quelques mois, Fahim s'est inscrit en ligne sur le portail national de France Travail pour bénéficier d'un accompagnement personnalisé dans sa recherche d'emploi. Ce matin, il se rend à son premier entretien obligatoire dans l'agence locale de sa circonscription.",
      "À l'accueil de l'agence, Fahim tape son numéro d'identifiant à huit chiffres sur la borne interactive et s'installe dans l'espace d'attente. Quelques instants plus tard, un conseiller pour l'emploi, monsieur Vasseur, vient à sa rencontre avec un sourire encourageant : « Bonjour monsieur Fahim, bienvenue. Venez avec moi dans mon bureau pour que nous fassions le point ensemble sur votre situation. »",
      "L'entretien débute par l'analyse du projet professionnel. Fahim remet son curriculum vitae imprimé au conseiller : « J'ai une formation solide de quatre ans en technologie informatique et j'aimerais beaucoup travailler dans la maintenance de réseaux ou l'assistance aux utilisateurs. Cependant, j'ai parfois du mal à comprendre tous les codes du marché du travail français. »",
      "Monsieur Vasseur étudie le CV avec grand intérêt : « Vos compétences techniques sont très appréciées par les recruteurs du secteur informatique. Pour maximiser vos chances d'embauche, nous allons organiser une demande d'attestation de comparabilité pour faire reconnaître officiellement votre diplôme étranger. De plus, je vous inscris à un atelier de deux demi-journées pour adapter votre CV aux standards français et vous entraîner aux entretiens oraux. »",
      "Le conseiller paramètre également l'espace personnel de Fahim sur l'application mobile pour qu'il reçoive des alertes d'offres ciblées chaque matin : « Vous avez un excellent profil et votre motivation est remarquable. Avec ces démarches et cet accompagnement, vous allez trouver une opportunité intéressante très prochainement. » Fahim quitte l'agence avec une feuille de route claire et une confiance renforcée pour son avenir professionnel."
    ],
    "paragraphTranslations": [
      "Having settled in France a few months ago, Fahim registered online on the France Travail national portal to benefit from tailored guidance in his job search. This morning, he attends his first mandatory interview at the local agency in his district.",
      "At the agency reception, Fahim types his eight-digit user identification number on the interactive kiosk and sits down in the waiting area. Moments later, an employment advisor, Mr. Vasseur, comes out to greet him with an encouraging smile: \"Good morning Mr. Fahim, welcome. Come with me to my office so we can assess your situation together.\"",
      "The meeting begins with an analysis of his professional goals. Fahim hands his printed resume over to the advisor: \"I have a solid four-year training in computer technology and I would love to work in network maintenance or user support. However, I sometimes struggle to navigate all the unwritten norms of the French job market.\"",
      "Mr. Vasseur reviews the resume with great interest: \"Your technical skills are highly sought after by IT recruiters. To maximize your hiring chances, we will arrange an application for an official comparability certificate to formally recognize your foreign diploma. Additionally, I am signing you up for a two-half-day workshop to tailor your CV to French standards and practice oral interviews.\"",
      "The advisor also configures Fahim's online dashboard on the mobile app so he receives targeted job alerts every morning: \"You have an excellent profile and remarkable motivation. With these steps and this coaching, you will find an exciting opportunity very soon.\" Fahim leaves the branch with a clear roadmap and strengthened confidence for his professional future."
    ],
    "vocabulary": {
      "installé": {
        "lemma": "installer",
        "en": "settled in / installed",
        "bn": "বসবাস শুরু করেছে",
        "pos": "verb"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "france": {
        "lemma": "France",
        "en": "France",
        "bn": "ফ্রান্স",
        "pos": "noun"
      },
      "depuis": {
        "lemma": "depuis",
        "en": "since / for",
        "bn": "ধরে / যাবত",
        "pos": "preposition"
      },
      "quelques": {
        "lemma": "quelque",
        "en": "a few / some",
        "bn": "কয়েকটি / কিছু",
        "pos": "adjective"
      },
      "mois": {
        "lemma": "mois",
        "en": "month / months",
        "bn": "মাস",
        "pos": "noun"
      },
      "fahim": {
        "lemma": "Fahim",
        "en": "Fahim (first name)",
        "bn": "ফাহিম (নাম)",
        "pos": "noun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "inscrit": {
        "lemma": "inscrire",
        "en": "enrolled / registered",
        "bn": "নিবন্ধিত করেছে",
        "pos": "verb"
      },
      "ligne": {
        "lemma": "ligne",
        "en": "line (metro / telephone / online)",
        "bn": "লাইন / সংযোগ",
        "pos": "noun"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "portail": {
        "lemma": "portail",
        "en": "web portal / gate",
        "bn": "ওয়েব পোর্টাল / গেট",
        "pos": "noun"
      },
      "national": {
        "lemma": "national",
        "en": "national",
        "bn": "জাতীয়",
        "pos": "adjective"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "travail": {
        "lemma": "France Travail",
        "en": "France Travail (national employment agency)",
        "bn": "ফ্রান্স ত্রাভাই (কর্মসংস্থান সংস্থা)",
        "pos": "noun"
      },
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "bénéficier": {
        "lemma": "bénéficier",
        "en": "to benefit / receive",
        "bn": "সুবিধা পাওয়া / লাভ করা",
        "pos": "verb"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "accompagnement": {
        "lemma": "accompagnement",
        "en": "guidance / support / coaching",
        "bn": "দিকনির্দেশনা / সহায়তা",
        "pos": "noun"
      },
      "personnalisé": {
        "lemma": "personnaliser",
        "en": "personalized / tailored",
        "bn": "ব্যক্তিমাফিক / নিজস্বকৃত",
        "pos": "adjective"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "recherche": {
        "lemma": "recherche",
        "en": "search / job hunting",
        "bn": "অনুসন্ধান / খোঁজা",
        "pos": "noun"
      },
      "emploi": {
        "lemma": "emploi",
        "en": "job / employment",
        "bn": "চাকরি / কর্মসংস্থান",
        "pos": "noun"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "rend": {
        "lemma": "rendre",
        "en": "returns / gives back",
        "bn": "ফেরত দেয়",
        "pos": "verb"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "premier": {
        "lemma": "premier",
        "en": "first",
        "bn": "প্রথম",
        "pos": "adjective"
      },
      "entretien": {
        "lemma": "entretien",
        "en": "interview / maintenance",
        "bn": "ইন্টারভিউ / রক্ষণাবেক্ষণ",
        "pos": "noun"
      },
      "obligatoire": {
        "lemma": "obligatoire",
        "en": "mandatory / compulsory",
        "bn": "বাধ্যতামূলক",
        "pos": "adjective"
      },
      "agence": {
        "lemma": "agence",
        "en": "agency / branch",
        "bn": "সংস্থা / এজেন্সি / শাখা",
        "pos": "noun"
      },
      "locale": {
        "lemma": "local",
        "en": "local (feminine)",
        "bn": "স্থানীয়",
        "pos": "adjective"
      },
      "circonscription": {
        "lemma": "circonscription",
        "en": "district / area",
        "bn": "এলাকা / প্রশাসনিক এলাকা",
        "pos": "noun"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "accueil": {
        "lemma": "accueil",
        "en": "reception / welcome",
        "bn": "অভ্যর্থনা / স্বাগত",
        "pos": "noun"
      },
      "tape": {
        "lemma": "taper",
        "en": "types / keys in",
        "bn": "টাইপ করে",
        "pos": "verb"
      },
      "numéro": {
        "lemma": "numéro",
        "en": "number / ticket number",
        "bn": "নম্বর",
        "pos": "noun"
      },
      "identifiant": {
        "lemma": "identifiant",
        "en": "user ID / login number",
        "bn": "ব্যবহারকারী নম্বর / আইডি",
        "pos": "noun"
      },
      "huit": {
        "lemma": "huit",
        "en": "eight",
        "bn": "আট",
        "pos": "adjective"
      },
      "chiffres": {
        "lemma": "chiffre",
        "en": "digits / figures",
        "bn": "সংখ্যা / ডিজিট",
        "pos": "noun"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "borne": {
        "lemma": "borne",
        "en": "terminal / kiosk machine",
        "bn": "মেশিন / কিয়স্ক",
        "pos": "noun"
      },
      "interactive": {
        "lemma": "interactif",
        "en": "interactive (feminine)",
        "bn": "ইন্টারেক্টিভ",
        "pos": "adjective"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "installe": {
        "lemma": "installer",
        "en": "settles in / installs",
        "bn": "বসে / ইনস্টল করে",
        "pos": "verb"
      },
      "espace": {
        "lemma": "espace",
        "en": "space / area / user dashboard",
        "bn": "জায়গা / ড্যাশবোর্ড",
        "pos": "noun"
      },
      "attente": {
        "lemma": "attente",
        "en": "waiting",
        "bn": "অপেক্ষা",
        "pos": "noun"
      },
      "instants": {
        "lemma": "instant",
        "en": "moments",
        "bn": "মুহূর্তগুলো",
        "pos": "noun"
      },
      "plus": {
        "lemma": "plus",
        "en": "more / plus",
        "bn": "আরও",
        "pos": "adverb"
      },
      "tard": {
        "lemma": "tard",
        "en": "late (plus tard = later)",
        "bn": "দেরিতে (পরে)",
        "pos": "adverb"
      },
      "conseiller": {
        "lemma": "conseiller",
        "en": "advisor / counselor",
        "bn": "পরামর্শক / কর্মকর্তা",
        "pos": "noun"
      },
      "monsieur": {
        "lemma": "monsieur",
        "en": "sir / gentleman",
        "bn": "জনাব / মহাশয়",
        "pos": "noun"
      },
      "vasseur": {
        "lemma": "Vasseur",
        "en": "Vasseur (surname)",
        "bn": "ভাসুর (পদবি)",
        "pos": "noun"
      },
      "vient": {
        "lemma": "venir",
        "en": "comes / has just (vient de)",
        "bn": "আসে / এইমাত্র",
        "pos": "verb"
      },
      "rencontre": {
        "lemma": "rencontre",
        "en": "meeting / encounter",
        "bn": "সাক্ষাৎ",
        "pos": "noun"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "sourire": {
        "lemma": "sourire",
        "en": "smile",
        "bn": "হাসি",
        "pos": "noun"
      },
      "encourageant": {
        "lemma": "encourager",
        "en": "encouraging",
        "bn": "উৎসাহব্যঞ্জক",
        "pos": "adjective"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "bienvenue": {
        "lemma": "bienvenue",
        "en": "welcome",
        "bn": "স্বাগতম",
        "pos": "expression"
      },
      "venez": {
        "lemma": "venir",
        "en": "come (imperative/formal)",
        "bn": "আসুন",
        "pos": "verb"
      },
      "moi": {
        "lemma": "moi",
        "en": "me",
        "bn": "আমাকে / আমি",
        "pos": "pronoun"
      },
      "mon": {
        "lemma": "son",
        "en": "my (masculine)",
        "bn": "আমার",
        "pos": "pronoun"
      },
      "bureau": {
        "lemma": "bureau",
        "en": "office / desk",
        "bn": "অফিস / পড়ার টেবিল",
        "pos": "noun"
      },
      "que": {
        "lemma": "que",
        "en": "that / what",
        "bn": "কী / যে",
        "pos": "pronoun"
      },
      "nous": {
        "lemma": "nous",
        "en": "we / us",
        "bn": "আমরা / আমাদের",
        "pos": "pronoun"
      },
      "fassions": {
        "lemma": "faire",
        "en": "make / do (subjunctive: que nous fassions)",
        "bn": "করি",
        "pos": "verb"
      },
      "point": {
        "lemma": "point",
        "en": "point / assessment (faire le point)",
        "bn": "পর্যালোচনা / বিন্দু",
        "pos": "noun"
      },
      "ensemble": {
        "lemma": "ensemble",
        "en": "together",
        "bn": "একসাথে",
        "pos": "adverb"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "situation": {
        "lemma": "situation",
        "en": "situation / circumstances",
        "bn": "পরিস্থিতি / অবস্থা",
        "pos": "noun"
      },
      "débute": {
        "lemma": "débuter",
        "en": "begins / starts",
        "bn": "শুরু হয়",
        "pos": "verb"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "analyse": {
        "lemma": "analyse",
        "en": "analysis / review",
        "bn": "বিশ্লেষণ",
        "pos": "noun"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "projet": {
        "lemma": "projet",
        "en": "project / professional plan",
        "bn": "প্রকল্প / পরিকল্পনা",
        "pos": "noun"
      },
      "professionnel": {
        "lemma": "professionnel",
        "en": "professional",
        "bn": "পেশাদার",
        "pos": "adjective"
      },
      "remet": {
        "lemma": "remettre",
        "en": "hands over / gives",
        "bn": "হস্তান্তর করে / দেয়",
        "pos": "verb"
      },
      "curriculum": {
        "lemma": "curriculum vitae",
        "en": "curriculum (CV)",
        "bn": "সিভি / জীবনবৃত্তান্ত",
        "pos": "noun"
      },
      "vitae": {
        "lemma": "curriculum vitae",
        "en": "vitae (CV)",
        "bn": "জীবনবৃত্তান্ত",
        "pos": "noun"
      },
      "imprimé": {
        "lemma": "imprimer",
        "en": "printed",
        "bn": "মুদ্রিত / প্রিন্ট করা",
        "pos": "adjective"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "ai": {
        "lemma": "avoir",
        "en": "have (first person: j'ai)",
        "bn": "আছে (আমার আছে)",
        "pos": "verb"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "formation": {
        "lemma": "formation",
        "en": "training course / studies",
        "bn": "প্রশিক্ষণ / কোর্স",
        "pos": "noun"
      },
      "solide": {
        "lemma": "solide",
        "en": "solid / sturdy",
        "bn": "শক্তিশালী / মজবুত",
        "pos": "adjective"
      },
      "quatre": {
        "lemma": "quatre",
        "en": "four",
        "bn": "চার",
        "pos": "adjective"
      },
      "ans": {
        "lemma": "an",
        "en": "years",
        "bn": "বছর",
        "pos": "noun"
      },
      "technologie": {
        "lemma": "technologie",
        "en": "technology",
        "bn": "প্রযুক্তি",
        "pos": "noun"
      },
      "informatique": {
        "lemma": "informatique",
        "en": "IT / computing",
        "bn": "আইটি / কম্পিউটার বিজ্ঞান",
        "pos": "noun"
      },
      "aimerais": {
        "lemma": "aimer",
        "en": "would like",
        "bn": "চাই / পছন্দ করব",
        "pos": "verb"
      },
      "beaucoup": {
        "lemma": "beaucoup",
        "en": "a lot / very much",
        "bn": "অনেক",
        "pos": "adverb"
      },
      "travailler": {
        "lemma": "travailler",
        "en": "to work",
        "bn": "কাজ করা",
        "pos": "verb"
      },
      "maintenance": {
        "lemma": "maintenance",
        "en": "maintenance (IT)",
        "bn": "রক্ষণাবেক্ষণ",
        "pos": "noun"
      },
      "réseaux": {
        "lemma": "réseau",
        "en": "networks",
        "bn": "নেটওয়ার্কসমূহ",
        "pos": "noun"
      },
      "ou": {
        "lemma": "ou",
        "en": "or",
        "bn": "অথবা",
        "pos": "conjunction"
      },
      "assistance": {
        "lemma": "assistance",
        "en": "support / assistance",
        "bn": "সহায়তা / সাপোর্ট",
        "pos": "noun"
      },
      "aux": {
        "lemma": "à + les",
        "en": "to the / at the (plural)",
        "bn": "তে / প্রতি",
        "pos": "preposition"
      },
      "utilisateurs": {
        "lemma": "utilisateur",
        "en": "users",
        "bn": "ব্যবহারকারীগণ",
        "pos": "noun"
      },
      "cependant": {
        "lemma": "cependant",
        "en": "however / nevertheless",
        "bn": "তবে / তা সত্ত্বেও",
        "pos": "conjunction"
      },
      "parfois": {
        "lemma": "parfois",
        "en": "sometimes",
        "bn": "মাঝে মাঝে",
        "pos": "adverb"
      },
      "mal": {
        "lemma": "mal",
        "en": "pain / difficulty / bad",
        "bn": "ব্যথা / কষ্ট",
        "pos": "noun"
      },
      "comprendre": {
        "lemma": "comprendre",
        "en": "to understand",
        "bn": "বোঝা",
        "pos": "verb"
      },
      "tous": {
        "lemma": "tout",
        "en": "all",
        "bn": "সব",
        "pos": "adjective"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "codes": {
        "lemma": "code",
        "en": "codes / social norms",
        "bn": "নিয়মাবলী / অলিখিত নিয়ম",
        "pos": "noun"
      },
      "marché": {
        "lemma": "marché",
        "en": "market (job market)",
        "bn": "বাজার (চাকরির বাজার)",
        "pos": "noun"
      },
      "français": {
        "lemma": "français",
        "en": "French",
        "bn": "ফরাসি",
        "pos": "noun"
      },
      "j": {
        "lemma": "je",
        "en": "I (elision)",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "étudie": {
        "lemma": "étudier",
        "en": "studies / reviews",
        "bn": "পড়ে / পর্যবেক্ষণ করে",
        "pos": "verb"
      },
      "cv": {
        "lemma": "CV",
        "en": "curriculum vitae / resume",
        "bn": "জীবনবৃত্তান্ত / সিভি",
        "pos": "noun",
        "ttsText": "cé vé"
      },
      "grand": {
        "lemma": "grand",
        "en": "large / big",
        "bn": "বড়",
        "pos": "adjective"
      },
      "intérêt": {
        "lemma": "intérêt",
        "en": "interest",
        "bn": "আগ্রহ",
        "pos": "noun"
      },
      "vos": {
        "lemma": "votre",
        "en": "your (plural)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "compétences": {
        "lemma": "compétence",
        "en": "skills / competencies",
        "bn": "দক্ষতা",
        "pos": "noun"
      },
      "techniques": {
        "lemma": "technique",
        "en": "technical (plural)",
        "bn": "কারিগরি",
        "pos": "adjective"
      },
      "sont": {
        "lemma": "être",
        "en": "are (plural)",
        "bn": "হয় / আছেন",
        "pos": "verb"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "appréciées": {
        "lemma": "apprécier",
        "en": "appreciated (plural)",
        "bn": "সমাদৃত",
        "pos": "adjective"
      },
      "recruteurs": {
        "lemma": "recruteur",
        "en": "recruiters",
        "bn": "নিয়োগকারীগণ",
        "pos": "noun"
      },
      "secteur": {
        "lemma": "secteur",
        "en": "sector / industry",
        "bn": "খাত / সেক্টর",
        "pos": "noun"
      },
      "maximiser": {
        "lemma": "maximiser",
        "en": "to maximize",
        "bn": "সর্বোচ্চ করা",
        "pos": "verb"
      },
      "chances": {
        "lemma": "chance",
        "en": "chances / luck",
        "bn": "সুযোগ / সম্ভাবনা",
        "pos": "noun"
      },
      "embauche": {
        "lemma": "embauche",
        "en": "hiring / employment",
        "bn": "চাকরি নিয়োগ / নিয়োগ",
        "pos": "noun"
      },
      "allons": {
        "lemma": "aller",
        "en": "are going (nous)",
        "bn": "যাচ্ছি",
        "pos": "verb"
      },
      "organiser": {
        "lemma": "organiser",
        "en": "to arrange / organize",
        "bn": "আয়োজন করা / ব্যবস্থা করা",
        "pos": "verb"
      },
      "demande": {
        "lemma": "demande",
        "en": "request / application",
        "bn": "অনুরোধ / আবেদন",
        "pos": "noun"
      },
      "attestation": {
        "lemma": "attestation",
        "en": "certificate / formal proof",
        "bn": "প্রত্যয়নপত্র / সনদ",
        "pos": "noun"
      },
      "comparabilité": {
        "lemma": "comparabilité",
        "en": "comparability (diploma recognition)",
        "bn": "সমতাকরণ / সমমান",
        "pos": "noun"
      },
      "faire": {
        "lemma": "faire",
        "en": "to do / make",
        "bn": "করা",
        "pos": "verb"
      },
      "reconnaître": {
        "lemma": "reconnaître",
        "en": "to recognize officially",
        "bn": "স্বীকৃতি দেওয়া",
        "pos": "verb"
      },
      "officiellement": {
        "lemma": "officiellement",
        "en": "officially",
        "bn": "আনুষ্ঠানিকভাবে",
        "pos": "adverb"
      },
      "diplôme": {
        "lemma": "diplôme",
        "en": "diploma / degree",
        "bn": "সনদ / ডিপ্লোমা",
        "pos": "noun"
      },
      "étranger": {
        "lemma": "étranger",
        "en": "foreign / abroad",
        "bn": "বিদেশি",
        "pos": "adjective"
      },
      "je": {
        "lemma": "je",
        "en": "I",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "inscris": {
        "lemma": "inscrire",
        "en": "enroll / sign up (j'inscris)",
        "bn": "নিবন্ধন করি / যুক্ত করি",
        "pos": "verb"
      },
      "atelier": {
        "lemma": "atelier",
        "en": "workshop",
        "bn": "কর্মশালা / ওয়ার্কশপ",
        "pos": "noun"
      },
      "deux": {
        "lemma": "deux",
        "en": "two",
        "bn": "দুই",
        "pos": "adjective"
      },
      "demi-journées": {
        "lemma": "demi-journée",
        "en": "half-days",
        "bn": "অর্ধ-দিবস",
        "pos": "noun"
      },
      "adapter": {
        "lemma": "adapter",
        "en": "to adapt / tailor",
        "bn": "উপযোগী করা / মানিয়ে নেওয়া",
        "pos": "verb"
      },
      "standards": {
        "lemma": "standard",
        "en": "standards / norms",
        "bn": "মানদণ্ড",
        "pos": "noun"
      },
      "entraîner": {
        "lemma": "entraîner",
        "en": "to practice / train",
        "bn": "অনুশীলন করা",
        "pos": "verb"
      },
      "entretiens": {
        "lemma": "entretien",
        "en": "interviews",
        "bn": "ইন্টারভিউগুলো",
        "pos": "noun"
      },
      "oraux": {
        "lemma": "oral",
        "en": "oral (interviews plural)",
        "bn": "মৌখিক",
        "pos": "adjective"
      },
      "demi": {
        "lemma": "demi",
        "en": "half",
        "bn": "অর্ধেক",
        "pos": "adjective"
      },
      "journées": {
        "lemma": "journée",
        "en": "days (demi-journées)",
        "bn": "দিনসমূহ",
        "pos": "noun"
      },
      "paramètre": {
        "lemma": "paramétrer",
        "en": "sets up / configures",
        "bn": "সেটআপ করে / কনফিগার করে",
        "pos": "verb"
      },
      "également": {
        "lemma": "également",
        "en": "also / equally",
        "bn": "এছাড়াও",
        "pos": "adverb"
      },
      "personnel": {
        "lemma": "personnel",
        "en": "personal / staff",
        "bn": "ব্যক্তিগত / কর্মী",
        "pos": "adjective"
      },
      "application": {
        "lemma": "application",
        "en": "app / application",
        "bn": "অ্যাপ্লিকেশন / অ্যাপ",
        "pos": "noun"
      },
      "mobile": {
        "lemma": "mobile",
        "en": "mobile (phone/network)",
        "bn": "মোবাইল",
        "pos": "adjective"
      },
      "reçoive": {
        "lemma": "recevoir",
        "en": "receives (subjunctive)",
        "bn": "পায়",
        "pos": "verb"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "alertes": {
        "lemma": "alerte",
        "en": "alerts / notifications",
        "bn": "সতর্কবার্তা / নোটিফিকেশন",
        "pos": "noun"
      },
      "offres": {
        "lemma": "offre",
        "en": "offers / job listings",
        "bn": "চাকরির বিজ্ঞাপনসমূহ",
        "pos": "noun"
      },
      "ciblées": {
        "lemma": "cibler",
        "en": "targeted (alerts)",
        "bn": "লক্ষ্যভিত্তিক / সুনির্দিষ্ট",
        "pos": "adjective"
      },
      "chaque": {
        "lemma": "chaque",
        "en": "each / every",
        "bn": "প্রতিটি",
        "pos": "adjective"
      },
      "avez": {
        "lemma": "avoir",
        "en": "have (you have)",
        "bn": "আছে (আপনার আছে)",
        "pos": "verb"
      },
      "excellent": {
        "lemma": "excellent",
        "en": "excellent",
        "bn": "চমৎকার",
        "pos": "adjective"
      },
      "profil": {
        "lemma": "profil",
        "en": "profile / background",
        "bn": "প্রোফাইল / যোগ্যতা",
        "pos": "noun"
      },
      "motivation": {
        "lemma": "motivation",
        "en": "motivation",
        "bn": "প্রেরণা / উৎসাহ",
        "pos": "noun"
      },
      "remarquable": {
        "lemma": "remarquable",
        "en": "remarkable / outstanding",
        "bn": "অসাধারণ / প্রশংসনীয়",
        "pos": "adjective"
      },
      "ces": {
        "lemma": "ce",
        "en": "these / those",
        "bn": "এইসব",
        "pos": "adjective"
      },
      "démarches": {
        "lemma": "démarche",
        "en": "procedures / steps",
        "bn": "প্রশাসনিক পদক্ষেপসমূহ",
        "pos": "noun"
      },
      "cet": {
        "lemma": "ce",
        "en": "this (masculine vowel)",
        "bn": "এই",
        "pos": "adjective"
      },
      "allez": {
        "lemma": "aller",
        "en": "go / are going (vous)",
        "bn": "যাচ্ছেন",
        "pos": "verb"
      },
      "trouver": {
        "lemma": "trouver",
        "en": "to find",
        "bn": "খুঁজে পাওয়া",
        "pos": "verb"
      },
      "opportunité": {
        "lemma": "opportunité",
        "en": "opportunity / job opening",
        "bn": "সুযোগ",
        "pos": "noun"
      },
      "intéressante": {
        "lemma": "intéressant",
        "en": "interesting / attractive",
        "bn": "আকর্ষণীয়",
        "pos": "adjective"
      },
      "prochainement": {
        "lemma": "prochainement",
        "en": "very soon",
        "bn": "খুব শীঘ্রই",
        "pos": "adverb"
      },
      "quitte": {
        "lemma": "quitter",
        "en": "leaves / exits",
        "bn": "বের হয় / ছেড়ে যায়",
        "pos": "verb"
      },
      "feuille": {
        "lemma": "feuille",
        "en": "sheet (of paper) / roadmap",
        "bn": "কাগজ / রোডম্যাপ",
        "pos": "noun"
      },
      "route": {
        "lemma": "route",
        "en": "roadmap / road",
        "bn": "রোডম্যাপ / পথ",
        "pos": "noun"
      },
      "claire": {
        "lemma": "clair",
        "en": "clear (feminine)",
        "bn": "পরিষ্কার / সুস্পষ্ট",
        "pos": "adjective"
      },
      "confiance": {
        "lemma": "confiance",
        "en": "confidence / trust",
        "bn": "আত্মবিশ্বাস / ভরসা",
        "pos": "noun"
      },
      "renforcée": {
        "lemma": "renforcer",
        "en": "reinforced / strengthened",
        "bn": "দৃঢ় / জোরদার",
        "pos": "adjective"
      },
      "avenir": {
        "lemma": "avenir",
        "en": "future",
        "bn": "ভবিষ্যত",
        "pos": "noun"
      },
      "qu": {
        "lemma": "que",
        "en": "that / what (elision)",
        "bn": "যা / কী",
        "pos": "pronoun"
      }
    },
    "quiz": [
      {
        "question": "Quel est le but de la visite de Fahim à France Travail ?",
        "options": [
          "Renouveler son passeport",
          "Bénéficier d'un accompagnement personnalisé pour sa recherche d'emploi en informatique",
          "Prendre un billet d'avion",
          "Acheter un ordinateur portable"
        ],
        "answer": 1,
        "explanation": "The text explains that Fahim visits France Travail to get personalized guidance for his job search (\"bénéficier d'un accompagnement personnalisé dans sa recherche d'emploi\").",
        "explanationBn": "টেক্সটে বলা আছে: ফাহিম তার কর্মসংস্থান সন্ধানে ব্যক্তিগত পরামর্শ ও দিকনির্দেশনা পাওয়ার জন্য ফ্রঁস ত্রাভাইয়ে যায়।"
      },
      {
        "question": "Que propose le conseiller pour valoriser le diplôme étranger de Fahim ?",
        "options": [
          "D'oublier son diplôme",
          "De faire une demande d'attestation de comparabilité",
          "De retourner à l'école primaire",
          "De payer une amende"
        ],
        "answer": 1,
        "explanation": "The advisor suggests: \"nous allons organiser une demande d'attestation de comparabilité pour faire reconnaître officiellement votre diplôme étranger\".",
        "explanationBn": "পরামর্শক তার বিদেশি ডিগ্রির সমতাকরণ প্রত্যয়নপত্র (attestation de comparabilité) আবেদনের পরামর্শ দেন।"
      },
      {
        "question": "À quel atelier pratique le conseiller inscrit-il Fahim ?",
        "options": [
          "Un cours de natation",
          "Un atelier pour adapter son CV aux normes françaises et préparer les entretiens",
          "Un cours de musique",
          "Un concours de cuisine"
        ],
        "answer": 1,
        "explanation": "The advisor signs him up for a workshop to adapt his resume to French standards and practice interviews.",
        "explanationBn": "পরামর্শক তাকে ফরাসি নিয়মে সিভি তৈরি ও মৌখিক ইন্টারভিউ অনুশীলনের একটি কর্মশালায় যুক্ত করেন।"
      }
    ]
  },
  {
    "id": "sinscrire-formation",
    "title": "S'inscrire à une formation",
    "subtitle": "Préparer son admission pour une licence professionnelle",
    "level": "A2",
    "topic": "Études & Université",
    "wordCount": 270,
    "estimatedMinutes": 4,
    "paragraphs": [
      "Pour valoriser son diplôme technique étranger et accélérer sa carrière dans l'ingénierie en France, Tariq a décidé de reprendre ses études en s'inscrivant à une licence professionnelle en administration et sécurité des réseaux informatiques. Ce cursus universitaire d'un an offre une formation pointue très appréciée des entreprises technologiques.",
      "Ce matin, Tariq se rend sur le campus universitaire pour son rendez-vous avec la responsable pédagogique du département informatique. Le campus est vaste, verdoyant et animé par des centaines d'étudiants de toutes nationalités. Tariq trouve facilement le secrétariat des inscriptions au deuxième étage du bâtiment des sciences appliquées.",
      "La coordinatrice de la formation, madame Leroux, le reçoit cordialement dans son bureau : « Bonjour Tariq, j'ai examiné avec intérêt votre dossier de candidature préalable. Vos bases techniques en informatique sont solides, mais nous devons vérifier ensemble le volet administratif pour finaliser votre inscription officielle. »",
      "Tariq présente son dossier complet qui contient toutes les pièces requises : les photocopies certifiées de ses diplômes accompagnées d'une traduction assermentée en français, ses relevés de notes détaillés, une lettre de motivation rédigée avec soin et son justificatif de séjour légal. Madame Leroux vérifie scrupuleusement chaque document et valide l'équivalence des crédits académiques.",
      "Elle lui explique ensuite le déroulement passionnant de l'année universitaire : « Les cours théoriques auront lieu le matin et les travaux pratiques en laboratoire informatique l'après-midi. Au second semestre, vous effectuerez un stage professionnel de quatre mois en entreprise pour mettre en pratique vos connaissances sur des infrastructures réelles. » Tariq signe son contrat pédagogique avec une fierté immense. Il est prêt à commencer cette nouvelle aventure universitaire avec détermination et enthousiasme."
    ],
    "paragraphTranslations": [
      "To build upon his foreign technical diploma and fast-track his engineering career in France, Tariq decided to resume his studies by enrolling in a vocational bachelor's degree (licence professionnelle) in computer network administration and security. This one-year university program offers specialized training that is highly valued by tech companies.",
      "This morning, Tariq heads to the university campus for his appointment with the academic director of the computer science department. The campus is vast, green, and buzzing with hundreds of students of all nationalities. Tariq easily locates the admissions office on the second floor of the applied sciences building.",
      "The program coordinator, Mrs. Leroux, welcomes him warmly into her office: \"Good morning Tariq, I reviewed your preliminary application file with great interest. Your foundational technical skills in computing are solid, but we must review the administrative requirements together to finalize your formal enrollment.\"",
      "Tariq presents his comprehensive file containing all required documents: certified copies of his diplomas accompanied by a sworn translation into French, his detailed grade transcripts, a carefully written cover letter, and his legal residence permit. Mrs. Leroux scrupulously checks each document and validates his academic credit equivalencies.",
      "She then outlines the exciting roadmap for the academic year: \"Theoretical lectures will take place in the morning and hands-on laboratory sessions in the afternoon. In the second semester, you will complete a four-month internship in a company to apply your knowledge to live infrastructure.\" Tariq signs his learning agreement with tremendous pride. He is ready to embark on this new university journey with determination and enthusiasm."
    ],
    "vocabulary": {
      "pour": {
        "lemma": "pour",
        "en": "for / in order to",
        "bn": "জন্য",
        "pos": "preposition"
      },
      "valoriser": {
        "lemma": "valoriser",
        "en": "to enhance / showcase (skills)",
        "bn": "মর্যাদা বৃদ্ধি করা / কাজে লাগানো",
        "pos": "verb"
      },
      "son": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "diplôme": {
        "lemma": "diplôme",
        "en": "diploma / degree",
        "bn": "সনদ / ডিপ্লোমা",
        "pos": "noun"
      },
      "technique": {
        "lemma": "technique",
        "en": "technical / technique",
        "bn": "কারিগরি / টেকনিক্যাল",
        "pos": "adjective"
      },
      "étranger": {
        "lemma": "étranger",
        "en": "foreign / abroad",
        "bn": "বিদেশি",
        "pos": "adjective"
      },
      "et": {
        "lemma": "et",
        "en": "and",
        "bn": "এবং",
        "pos": "conjunction"
      },
      "accélérer": {
        "lemma": "accélérer",
        "en": "to accelerate / speed up",
        "bn": "গতিশীল করা / ত্বরান্বিত করা",
        "pos": "verb"
      },
      "sa": {
        "lemma": "son",
        "en": "his / her",
        "bn": "তার",
        "pos": "pronoun"
      },
      "carrière": {
        "lemma": "carrière",
        "en": "career",
        "bn": "কর্মজীবন / ক্যারিয়ার",
        "pos": "noun"
      },
      "dans": {
        "lemma": "dans",
        "en": "in / inside",
        "bn": "মধ্যে",
        "pos": "preposition"
      },
      "ingénierie": {
        "lemma": "ingénierie",
        "en": "engineering",
        "bn": "প্রকৌশল / ইঞ্জিনিয়ারিং",
        "pos": "noun"
      },
      "en": {
        "lemma": "en",
        "en": "in / made of",
        "bn": "তৈরি / দিয়ে",
        "pos": "preposition"
      },
      "france": {
        "lemma": "France",
        "en": "France",
        "bn": "ফ্রান্স",
        "pos": "noun"
      },
      "tariq": {
        "lemma": "Tariq",
        "en": "Tariq (first name)",
        "bn": "তারিক (নাম)",
        "pos": "noun"
      },
      "a": {
        "lemma": "avoir",
        "en": "has",
        "bn": "আছে",
        "pos": "verb"
      },
      "décidé": {
        "lemma": "décider",
        "en": "decided",
        "bn": "সিদ্ধান্ত নিয়েছে",
        "pos": "verb"
      },
      "de": {
        "lemma": "de",
        "en": "of / from",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "reprendre": {
        "lemma": "reprendre",
        "en": "to resume (studies)",
        "bn": "পুনরায় শুরু করা",
        "pos": "verb"
      },
      "ses": {
        "lemma": "son",
        "en": "his / her / its (plural)",
        "bn": "তার (বহুবচন)",
        "pos": "pronoun"
      },
      "études": {
        "lemma": "étude",
        "en": "studies / degree",
        "bn": "পড়াশোনা / উচ্চশিক্ষা",
        "pos": "noun"
      },
      "inscrivant": {
        "lemma": "inscrire",
        "en": "enrolling (by enrolling)",
        "bn": "ভর্তি হয়ে / নিবন্ধন করে",
        "pos": "verb"
      },
      "à": {
        "lemma": "à",
        "en": "to / at",
        "bn": "প্রতি / দিকে",
        "pos": "preposition"
      },
      "une": {
        "lemma": "un",
        "en": "a / an (feminine)",
        "bn": "একটি",
        "pos": "article"
      },
      "licence": {
        "lemma": "licence",
        "en": "bachelor's degree (3-year)",
        "bn": "স্নাতক ডিগ্রি (লাইসেন্স)",
        "pos": "noun"
      },
      "professionnelle": {
        "lemma": "professionnel",
        "en": "professional (feminine)",
        "bn": "পেশাদার",
        "pos": "adjective"
      },
      "administration": {
        "lemma": "administration",
        "en": "administration / public office",
        "bn": "প্রশাসন / ব্যবস্থাপনা",
        "pos": "noun"
      },
      "sécurité": {
        "lemma": "sécurité",
        "en": "security",
        "bn": "নিরাপত্তা",
        "pos": "noun"
      },
      "des": {
        "lemma": "un",
        "en": "some / of the",
        "bn": "কিছু / গুলির",
        "pos": "article"
      },
      "réseaux": {
        "lemma": "réseau",
        "en": "networks",
        "bn": "নেটওয়ার্কসমূহ",
        "pos": "noun"
      },
      "informatiques": {
        "lemma": "informatique",
        "en": "computer / IT (plural)",
        "bn": "কম্পিউটার সংক্রান্ত",
        "pos": "adjective"
      },
      "ce": {
        "lemma": "ce",
        "en": "this",
        "bn": "এই",
        "pos": "pronoun"
      },
      "cursus": {
        "lemma": "cursus",
        "en": "degree program / curriculum",
        "bn": "শিক্ষাক্রম / পাঠ্যক্রম",
        "pos": "noun"
      },
      "universitaire": {
        "lemma": "universitaire",
        "en": "university (campus/studies)",
        "bn": "বিশ্ববিদ্যালয় সংক্রান্ত",
        "pos": "adjective"
      },
      "un": {
        "lemma": "un",
        "en": "a / an (masculine)",
        "bn": "একটি",
        "pos": "article"
      },
      "an": {
        "lemma": "an",
        "en": "year",
        "bn": "বছর",
        "pos": "noun"
      },
      "offre": {
        "lemma": "offre",
        "en": "offer / job offer",
        "bn": "অফার / চাকরির সুযোগ",
        "pos": "noun"
      },
      "formation": {
        "lemma": "formation",
        "en": "training course / studies",
        "bn": "প্রশিক্ষণ / কোর্স",
        "pos": "noun"
      },
      "pointue": {
        "lemma": "pointu",
        "en": "advanced / sharp (training)",
        "bn": "উন্নত / বিশেষায়িত",
        "pos": "adjective"
      },
      "très": {
        "lemma": "très",
        "en": "very",
        "bn": "খুব",
        "pos": "adverb"
      },
      "appréciée": {
        "lemma": "apprécier",
        "en": "appreciated / valued",
        "bn": "প্রশংসিত / সমাদৃত",
        "pos": "adjective"
      },
      "entreprises": {
        "lemma": "entreprise",
        "en": "companies",
        "bn": "কোম্পানিসমূহ",
        "pos": "noun"
      },
      "technologiques": {
        "lemma": "technologique",
        "en": "technology (companies)",
        "bn": "প্রযুক্তিগত",
        "pos": "adjective"
      },
      "l": {
        "lemma": "le",
        "en": "the (elision)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "s": {
        "lemma": "se",
        "en": "himself / herself (elision)",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "d": {
        "lemma": "de",
        "en": "of / from (elision)",
        "bn": "এর / থেকে",
        "pos": "preposition"
      },
      "matin": {
        "lemma": "matin",
        "en": "morning",
        "bn": "সকাল",
        "pos": "noun"
      },
      "se": {
        "lemma": "se",
        "en": "himself / herself / oneself",
        "bn": "নিজেকে",
        "pos": "pronoun"
      },
      "rend": {
        "lemma": "rendre",
        "en": "returns / gives back",
        "bn": "ফেরত দেয়",
        "pos": "verb"
      },
      "sur": {
        "lemma": "sur",
        "en": "on / upon",
        "bn": "উপর",
        "pos": "preposition"
      },
      "le": {
        "lemma": "le",
        "en": "the (masculine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "campus": {
        "lemma": "campus",
        "en": "university campus",
        "bn": "ক্যাম্পাস",
        "pos": "noun"
      },
      "rendez-vous": {
        "lemma": "rendez-vous",
        "en": "appointment / meeting",
        "bn": "সাক্ষাৎ / অ্যাপয়েন্টমেন্ট",
        "pos": "noun"
      },
      "avec": {
        "lemma": "avec",
        "en": "with",
        "bn": "সাথে",
        "pos": "preposition"
      },
      "la": {
        "lemma": "le",
        "en": "the (feminine)",
        "bn": "টি / টা",
        "pos": "article"
      },
      "responsable": {
        "lemma": "responsable",
        "en": "manager / coordinator / responsible",
        "bn": "প্রধান কর্মকর্তা / দায়িত্বপ্রাপ্ত",
        "pos": "noun"
      },
      "pédagogique": {
        "lemma": "pédagogique",
        "en": "educational / academic",
        "bn": "শিক্ষাগত / পাঠদান সংক্রান্ত",
        "pos": "adjective"
      },
      "du": {
        "lemma": "de + le",
        "en": "of the / from the",
        "bn": "দোকানের",
        "pos": "article"
      },
      "département": {
        "lemma": "département",
        "en": "department (academic)",
        "bn": "বিভাগ (বিশ্ববিদ্যালয়)",
        "pos": "noun"
      },
      "informatique": {
        "lemma": "informatique",
        "en": "IT / computing",
        "bn": "আইটি / কম্পিউটার বিজ্ঞান",
        "pos": "noun"
      },
      "est": {
        "lemma": "être",
        "en": "is",
        "bn": "হয় / আছে",
        "pos": "verb"
      },
      "vaste": {
        "lemma": "vaste",
        "en": "vast / spacious",
        "bn": "বিশাল / প্রশস্ত",
        "pos": "adjective"
      },
      "verdoyant": {
        "lemma": "verdoyant",
        "en": "green / lush",
        "bn": "সবুজ ঘেরা",
        "pos": "adjective"
      },
      "animé": {
        "lemma": "animer",
        "en": "lively / buzzing",
        "bn": "প্রাণবন্ত / মুখরিত",
        "pos": "adjective"
      },
      "par": {
        "lemma": "par",
        "en": "by",
        "bn": "দ্বারা / দিয়ে",
        "pos": "preposition"
      },
      "centaines": {
        "lemma": "centaine",
        "en": "hundreds",
        "bn": "শত শত",
        "pos": "noun"
      },
      "étudiants": {
        "lemma": "étudiant",
        "en": "students",
        "bn": "শিক্ষার্থীবৃন্দ",
        "pos": "noun"
      },
      "toutes": {
        "lemma": "tout",
        "en": "all (feminine plural)",
        "bn": "সবগুলো",
        "pos": "adjective"
      },
      "nationalités": {
        "lemma": "nationalité",
        "en": "nationalities",
        "bn": "জাতীয়তাসমূহ",
        "pos": "noun"
      },
      "trouve": {
        "lemma": "trouver",
        "en": "finds",
        "bn": "পায়",
        "pos": "verb"
      },
      "facilement": {
        "lemma": "facilement",
        "en": "easily",
        "bn": "সহজে",
        "pos": "adverb"
      },
      "secrétariat": {
        "lemma": "secrétariat",
        "en": "secretariat / administration office",
        "bn": "সেক্রেটারিয়েট / প্রশাসনিক দপ্তর",
        "pos": "noun"
      },
      "inscriptions": {
        "lemma": "inscription",
        "en": "admissions",
        "bn": "ভর্তি কার্যক্রম",
        "pos": "noun"
      },
      "au": {
        "lemma": "à + le",
        "en": "with / to the",
        "bn": "দিয়ে",
        "pos": "preposition"
      },
      "deuxième": {
        "lemma": "deuxième",
        "en": "second",
        "bn": "দ্বিতীয়",
        "pos": "adjective"
      },
      "étage": {
        "lemma": "étage",
        "en": "floor / storey",
        "bn": "তলা / ফ্লোর",
        "pos": "noun"
      },
      "bâtiment": {
        "lemma": "bâtiment",
        "en": "building",
        "bn": "ভবন / বিল্ডিং",
        "pos": "noun"
      },
      "sciences": {
        "lemma": "science",
        "en": "sciences",
        "bn": "বিজ্ঞান",
        "pos": "noun"
      },
      "appliquées": {
        "lemma": "appliquer",
        "en": "applied (sciences)",
        "bn": "ফলিত (বিজ্ঞান)",
        "pos": "adjective"
      },
      "rendez": {
        "lemma": "rendre",
        "en": "return / appointment (rendez-vous)",
        "bn": "সাক্ষাৎ / ফেরত দেওয়া",
        "pos": "noun"
      },
      "vous": {
        "lemma": "vous",
        "en": "you (formal/plural)",
        "bn": "আপনি / আপনারা",
        "pos": "pronoun"
      },
      "coordinatrice": {
        "lemma": "coordinateur",
        "en": "program coordinator (female)",
        "bn": "সমন্বয়কারী (মহিলা)",
        "pos": "noun"
      },
      "madame": {
        "lemma": "madame",
        "en": "madam / ma'am",
        "bn": "ম্যাডাম / বেগম",
        "pos": "noun"
      },
      "leroux": {
        "lemma": "Leroux",
        "en": "Leroux (surname)",
        "bn": "লারু (পদবি)",
        "pos": "noun"
      },
      "reçoit": {
        "lemma": "recevoir",
        "en": "receives / welcomes",
        "bn": "গ্রহণ করে / স্বাগত জানায়",
        "pos": "verb"
      },
      "cordialement": {
        "lemma": "cordialement",
        "en": "cordially / warmly",
        "bn": "আন্তরিকভাবে",
        "pos": "adverb"
      },
      "bureau": {
        "lemma": "bureau",
        "en": "office / desk",
        "bn": "অফিস / পড়ার টেবিল",
        "pos": "noun"
      },
      "bonjour": {
        "lemma": "bonjour",
        "en": "hello / good day",
        "bn": "শুভ সকাল / নমস্কার",
        "pos": "expression"
      },
      "ai": {
        "lemma": "avoir",
        "en": "have (first person: j'ai)",
        "bn": "আছে (আমার আছে)",
        "pos": "verb"
      },
      "examiné": {
        "lemma": "examiner",
        "en": "reviewed / examined",
        "bn": "পর্যালোচনা করেছে",
        "pos": "verb"
      },
      "intérêt": {
        "lemma": "intérêt",
        "en": "interest",
        "bn": "আগ্রহ",
        "pos": "noun"
      },
      "votre": {
        "lemma": "votre",
        "en": "your (formal)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "dossier": {
        "lemma": "dossier",
        "en": "application file / folder",
        "bn": "ফাইল / আবেদনপত্র",
        "pos": "noun"
      },
      "candidature": {
        "lemma": "candidature",
        "en": "application / candidacy",
        "bn": "আবেদন / প্রার্থিতা",
        "pos": "noun"
      },
      "préalable": {
        "lemma": "préalable",
        "en": "preliminary / prior",
        "bn": "প্রাথমিক / পূর্ববর্তী",
        "pos": "adjective"
      },
      "vos": {
        "lemma": "votre",
        "en": "your (plural)",
        "bn": "আপনার",
        "pos": "pronoun"
      },
      "bases": {
        "lemma": "base",
        "en": "foundations / basics",
        "bn": "মৌলিক বিষয়সমূহ",
        "pos": "noun"
      },
      "techniques": {
        "lemma": "technique",
        "en": "technical (plural)",
        "bn": "কারিগরি",
        "pos": "adjective"
      },
      "sont": {
        "lemma": "être",
        "en": "are (plural)",
        "bn": "হয় / আছেন",
        "pos": "verb"
      },
      "solides": {
        "lemma": "solide",
        "en": "solid (plural)",
        "bn": "মজবুত",
        "pos": "adjective"
      },
      "mais": {
        "lemma": "mais",
        "en": "but",
        "bn": "কিন্তু",
        "pos": "conjunction"
      },
      "nous": {
        "lemma": "nous",
        "en": "we / us",
        "bn": "আমরা / আমাদের",
        "pos": "pronoun"
      },
      "devons": {
        "lemma": "devoir",
        "en": "must / have to (nous)",
        "bn": "আমাদের অবশ্যই হবে",
        "pos": "verb"
      },
      "vérifier": {
        "lemma": "vérifier",
        "en": "to check / verify",
        "bn": "যাচাই করা",
        "pos": "verb"
      },
      "ensemble": {
        "lemma": "ensemble",
        "en": "together",
        "bn": "একসাথে",
        "pos": "adverb"
      },
      "volet": {
        "lemma": "volet",
        "en": "aspect / section / component",
        "bn": "দিক / অংশ",
        "pos": "noun"
      },
      "administratif": {
        "lemma": "administratif",
        "en": "administrative",
        "bn": "প্রশাসনিক",
        "pos": "adjective"
      },
      "finaliser": {
        "lemma": "finaliser",
        "en": "to finalize",
        "bn": "চূড়ান্ত করা",
        "pos": "verb"
      },
      "inscription": {
        "lemma": "inscription",
        "en": "enrollment / registration",
        "bn": "ভর্তি / নিবন্ধন",
        "pos": "noun"
      },
      "officielle": {
        "lemma": "officiel",
        "en": "official (feminine)",
        "bn": "দাপ্তরিক",
        "pos": "adjective"
      },
      "j": {
        "lemma": "je",
        "en": "I (elision)",
        "bn": "আমি",
        "pos": "pronoun"
      },
      "présente": {
        "lemma": "présenter",
        "en": "presents / introduces",
        "bn": "উপস্থাপন করে",
        "pos": "verb"
      },
      "complet": {
        "lemma": "complet",
        "en": "complete / full",
        "bn": "সম্পূর্ণ",
        "pos": "adjective"
      },
      "qui": {
        "lemma": "qui",
        "en": "who / which",
        "bn": "যে / কে",
        "pos": "pronoun"
      },
      "contient": {
        "lemma": "contenir",
        "en": "contains",
        "bn": "ধারণ করে / রয়েছে",
        "pos": "verb"
      },
      "les": {
        "lemma": "les",
        "en": "the (plural)",
        "bn": "গুলি / গুলো",
        "pos": "article"
      },
      "pièces": {
        "lemma": "pièce",
        "en": "documents / coins / rooms",
        "bn": "নথিপত্র / মুদ্রা / কক্ষ",
        "pos": "noun"
      },
      "requises": {
        "lemma": "requis",
        "en": "required (plural)",
        "bn": "প্রয়োজনীয় / আবশ্যকীয়",
        "pos": "adjective"
      },
      "photocopies": {
        "lemma": "photocopie",
        "en": "photocopies",
        "bn": "ফটোকপি",
        "pos": "noun"
      },
      "certifiées": {
        "lemma": "certifier",
        "en": "certified (plural)",
        "bn": "সত্যায়িত",
        "pos": "adjective"
      },
      "diplômes": {
        "lemma": "diplôme",
        "en": "diplomas / degrees",
        "bn": "সনদসমূহ",
        "pos": "noun"
      },
      "accompagnées": {
        "lemma": "accompagner",
        "en": "accompanied (feminine plural)",
        "bn": "সংযুক্ত / সাথে থাকা",
        "pos": "adjective"
      },
      "traduction": {
        "lemma": "traduction",
        "en": "translation",
        "bn": "অনুবাদ",
        "pos": "noun"
      },
      "assermentée": {
        "lemma": "assermenter",
        "en": "sworn / certified (translation)",
        "bn": "অনুমোদিত / শপথবদ্ধ (অনুবাদ)",
        "pos": "adjective"
      },
      "français": {
        "lemma": "français",
        "en": "French",
        "bn": "ফরাসি",
        "pos": "noun"
      },
      "relevés": {
        "lemma": "relevé",
        "en": "statements / transcripts",
        "bn": "বিবরণীসমূহ",
        "pos": "noun"
      },
      "notes": {
        "lemma": "note",
        "en": "grades / transcripts / notes",
        "bn": "নম্বর / মার্কশিট",
        "pos": "noun"
      },
      "détaillés": {
        "lemma": "détailler",
        "en": "detailed (transcripts)",
        "bn": "বিস্তারিত",
        "pos": "adjective"
      },
      "lettre": {
        "lemma": "lettre",
        "en": "letter / cover letter",
        "bn": "চিঠি / আবেদনপত্র",
        "pos": "noun"
      },
      "motivation": {
        "lemma": "motivation",
        "en": "motivation",
        "bn": "প্রেরণা / উৎসাহ",
        "pos": "noun"
      },
      "rédigée": {
        "lemma": "rédiger",
        "en": "written / drafted",
        "bn": "লিখিত",
        "pos": "adjective"
      },
      "soin": {
        "lemma": "soin",
        "en": "care / diligence",
        "bn": "যত্ন / মনোযোগ",
        "pos": "noun"
      },
      "justificatif": {
        "lemma": "justificatif",
        "en": "supporting document / proof",
        "bn": "প্রমাণপত্র / প্রত্যয়ন",
        "pos": "noun"
      },
      "séjour": {
        "lemma": "séjour",
        "en": "residence / stay (permit)",
        "bn": "বসবাস / অবস্থান (পারমিট)",
        "pos": "noun"
      },
      "légal": {
        "lemma": "légal",
        "en": "legal / lawful",
        "bn": "আইনসম্মত / বৈধ",
        "pos": "adjective"
      },
      "vérifie": {
        "lemma": "vérifier",
        "en": "checks / verifies",
        "bn": "যাচাই করে",
        "pos": "verb"
      },
      "scrupuleusement": {
        "lemma": "scrupuleusement",
        "en": "scrupulously / thoroughly",
        "bn": "পুঙ্খানুপুঙ্খভাবে",
        "pos": "adverb"
      },
      "chaque": {
        "lemma": "chaque",
        "en": "each / every",
        "bn": "প্রতিটি",
        "pos": "adjective"
      },
      "document": {
        "lemma": "document",
        "en": "document",
        "bn": "নথি / দলিল",
        "pos": "noun"
      },
      "valide": {
        "lemma": "valider",
        "en": "validates / valid",
        "bn": "অনুমোদন করে / বৈধ",
        "pos": "verb"
      },
      "équivalence": {
        "lemma": "équivalence",
        "en": "equivalency",
        "bn": "সমমান / সমতাকরণ",
        "pos": "noun"
      },
      "crédits": {
        "lemma": "crédit",
        "en": "academic credits / credit",
        "bn": "ক্রেডিট / পয়েন্ট",
        "pos": "noun"
      },
      "académiques": {
        "lemma": "académique",
        "en": "academic",
        "bn": "একাডেমিক / শিক্ষাগত",
        "pos": "adjective"
      },
      "elle": {
        "lemma": "elle",
        "en": "she",
        "bn": "সে (মহিলা)",
        "pos": "pronoun"
      },
      "lui": {
        "lemma": "lui",
        "en": "to him / her",
        "bn": "তাকে",
        "pos": "pronoun"
      },
      "explique": {
        "lemma": "expliquer",
        "en": "explains",
        "bn": "ব্যাখ্যা করে",
        "pos": "verb"
      },
      "ensuite": {
        "lemma": "ensuite",
        "en": "then / next",
        "bn": "তারপর",
        "pos": "adverb"
      },
      "déroulement": {
        "lemma": "déroulement",
        "en": "process / sequence / course",
        "bn": "ধারাবাহিকতা / প্রক্রিয়া",
        "pos": "noun"
      },
      "passionnant": {
        "lemma": "passionnant",
        "en": "exciting / fascinating",
        "bn": "উত্তেজনাপূর্ণ / চিত্তাকর্ষক",
        "pos": "adjective"
      },
      "année": {
        "lemma": "année",
        "en": "year (duration)",
        "bn": "বছর",
        "pos": "noun"
      },
      "cours": {
        "lemma": "cours",
        "en": "class / course / in progress",
        "bn": "ক্লাস / কোর্স / চলমান",
        "pos": "noun"
      },
      "théoriques": {
        "lemma": "théorique",
        "en": "theoretical (classes)",
        "bn": "তাত্ত্বিক",
        "pos": "adjective"
      },
      "auront": {
        "lemma": "avoir",
        "en": "will have (plural)",
        "bn": "থাকবে",
        "pos": "verb"
      },
      "lieu": {
        "lemma": "lieu",
        "en": "place / take place",
        "bn": "স্থান / অনুষ্ঠিত হওয়া",
        "pos": "noun"
      },
      "travaux": {
        "lemma": "travail",
        "en": "lab work / hands-on sessions (TP)",
        "bn": "বাস্তব কাজ / ল্যাব প্র্যাকটিক্যাল",
        "pos": "noun"
      },
      "pratiques": {
        "lemma": "pratique",
        "en": "practical (plural)",
        "bn": "ব্যবহারিক",
        "pos": "adjective"
      },
      "laboratoire": {
        "lemma": "laboratoire",
        "en": "laboratory / computer lab",
        "bn": "ল্যাবরেটরি / ল্যাব",
        "pos": "noun"
      },
      "après-midi": {
        "lemma": "après-midi",
        "en": "afternoon",
        "bn": "বিকাল / দুপুর",
        "pos": "noun"
      },
      "second": {
        "lemma": "second",
        "en": "second",
        "bn": "দ্বিতীয়",
        "pos": "adjective"
      },
      "semestre": {
        "lemma": "semestre",
        "en": "semester / term",
        "bn": "সেমিস্টার",
        "pos": "noun"
      },
      "effectuerez": {
        "lemma": "effectuer",
        "en": "will carry out (future)",
        "bn": "সম্পন্ন করবেন",
        "pos": "verb"
      },
      "stage": {
        "lemma": "stage",
        "en": "internship / practical training",
        "bn": "ইন্টার্নশিপ / বাস্তব প্রশিক্ষণ",
        "pos": "noun"
      },
      "professionnel": {
        "lemma": "professionnel",
        "en": "professional",
        "bn": "পেশাদার",
        "pos": "adjective"
      },
      "quatre": {
        "lemma": "quatre",
        "en": "four",
        "bn": "চার",
        "pos": "adjective"
      },
      "mois": {
        "lemma": "mois",
        "en": "month / months",
        "bn": "মাস",
        "pos": "noun"
      },
      "entreprise": {
        "lemma": "entreprise",
        "en": "company / enterprise",
        "bn": "প্রতিষ্ঠান / কোম্পানি",
        "pos": "noun"
      },
      "mettre": {
        "lemma": "mettre",
        "en": "to put / apply",
        "bn": "রাখা / প্রয়োগ করা",
        "pos": "verb"
      },
      "pratique": {
        "lemma": "pratique",
        "en": "practical / practice",
        "bn": "বাস্তবমুখী / ব্যবহারিক",
        "pos": "adjective"
      },
      "connaissances": {
        "lemma": "connaissance",
        "en": "knowledge / expertise",
        "bn": "জ্ঞান / অভিজ্ঞতা",
        "pos": "noun"
      },
      "infrastructures": {
        "lemma": "infrastructure",
        "en": "infrastructure / hardware systems",
        "bn": "অবকাঠামো / আইটি সিস্টেম",
        "pos": "noun"
      },
      "réelles": {
        "lemma": "réel",
        "en": "real / live (systems)",
        "bn": "বাস্তব",
        "pos": "adjective"
      },
      "signe": {
        "lemma": "signe",
        "en": "sign / signal",
        "bn": "ইশারা / সংকেত",
        "pos": "noun"
      },
      "contrat": {
        "lemma": "contrat",
        "en": "contract / agreement",
        "bn": "চুক্তিপত্র",
        "pos": "noun"
      },
      "fierté": {
        "lemma": "fierté",
        "en": "pride",
        "bn": "গর্ব / আত্মতৃপ্তি",
        "pos": "noun"
      },
      "immense": {
        "lemma": "immense",
        "en": "immense / huge",
        "bn": "বিশাল / অগাধ",
        "pos": "adjective"
      },
      "il": {
        "lemma": "il",
        "en": "he",
        "bn": "সে",
        "pos": "pronoun"
      },
      "prêt": {
        "lemma": "prêt",
        "en": "ready / loan",
        "bn": "প্রস্তুত / ঋণ",
        "pos": "adjective"
      },
      "commencer": {
        "lemma": "commencer",
        "en": "to start / begin",
        "bn": "শুরু করা",
        "pos": "verb"
      },
      "cette": {
        "lemma": "ce",
        "en": "this (feminine)",
        "bn": "এই",
        "pos": "adjective"
      },
      "nouvelle": {
        "lemma": "nouveau",
        "en": "new (feminine) / news",
        "bn": "নতুন",
        "pos": "adjective"
      },
      "aventure": {
        "lemma": "aventure",
        "en": "adventure / journey",
        "bn": "অভিযান / রোমাঞ্চকর যাত্রা",
        "pos": "noun"
      },
      "détermination": {
        "lemma": "détermination",
        "en": "determination",
        "bn": "দৃঢ় সংকল্প",
        "pos": "noun"
      },
      "enthousiasme": {
        "lemma": "enthousiasme",
        "en": "enthusiasm",
        "bn": "উদ্দীপনা / উৎসাহ",
        "pos": "noun"
      },
      "après": {
        "lemma": "après",
        "en": "after",
        "bn": "পরে",
        "pos": "preposition"
      },
      "midi": {
        "lemma": "midi",
        "en": "midday / noon",
        "bn": "দুপুর / মধ্যাহ্ন",
        "pos": "noun"
      }
    },
    "quiz": [
      {
        "question": "À quelle formation universitaire Tariq s'inscrit-il pour progresser dans sa carrière ?",
        "options": [
          "Une licence professionnelle en administration et sécurité des réseaux informatiques",
          "Un diplôme d'art dramatique",
          "Une école de commerce international",
          "Un certificat de langue anglaise"
        ],
        "answer": 0,
        "explanation": "The text states: \"en s'inscrivant à une licence professionnelle en administration et sécurité des réseaux informatiques\".",
        "explanationBn": "টেক্সটে স্পষ্টভাবে বলা আছে: কম্পিউটার নেটওয়ার্ক প্রশাসন ও সুরক্ষার উপর ভোকেশনাল ডিগ্রি (licence professionnelle)।"
      },
      {
        "question": "Quels documents traduits en français Tariq fournit-il pour son inscription ?",
        "options": [
          "Des coupures de journaux",
          "Les copies certifiées de ses diplômes avec une traduction assermentée",
          "Une lettre manuscrite de son voisin",
          "Un ticket de cinéma"
        ],
        "answer": 1,
        "explanation": "The text specifies: \"les photocopies certifiées de ses diplômes accompagnées d'une traduction assermentée en français\".",
        "explanationBn": "তালিকায় আছে মূল সনদের সত্যায়িত কপি ও ফরাসি ভাষায় অনুমোদিত অনুবাদ (traduction assermentée)।"
      },
      {
        "question": "Que prévoit le cursus au second semestre pour acquérir de l'expérience pratique ?",
        "options": [
          "Un stage professionnel de quatre mois en entreprise",
          "Des vacances prolongées",
          "Des examens oraux quotidiens sans pratique",
          "Des cours du soir en ligne uniquement"
        ],
        "answer": 0,
        "explanation": "The academic coordinator explains that the second semester includes a 4-month corporate internship (\"un stage professionnel de quatre mois en entreprise\").",
        "explanationBn": "শিক্ষাবর্ষের দ্বিতীয় সেমিস্টারে বাস্তব কাজের অভিজ্ঞতার জন্য চার মাসের বাধ্যতামূলক ইন্টার্নশিপ রয়েছে।"
      }
    ]
  }
];
