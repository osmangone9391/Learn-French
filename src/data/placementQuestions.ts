import { PlacementQuestion } from '../types';

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // --- A1 Level (Questions 1 to 5) ---
  {
    id: 1,
    level: 'A1',
    question: "Complétez : « Bonjour ! Comment vous vous ______ ? »",
    options: ["appelle", "appelez", "appelles", "appeler"],
    answer: 1,
    explanation: "With the formal pronoun 'vous', the regular present verb ending for 's'appeler' is '-ez' : vous vous appelez (What is your name?).",
    explanationBn: "'vous' সর্বনামের সাথে 's'appeler' ক্রিয়ার শেষে '-ez' যুক্ত হয়: vous vous appelez (আপনার নাম কী)।"
  },
  {
    id: 2,
    level: 'A1',
    question: "Choisissez l'article correct : « Je voudrais ______ baguette tradition, s'il vous plaît. »",
    options: ["un", "une", "des", "du"],
    answer: 1,
    explanation: "The word 'baguette' is a feminine singular noun in French, so we use the indefinite article 'une' (une baguette).",
    explanationBn: "'baguette' একটি স্ত্রীলিঙ্গ (féminin) শব্দ, তাই এর পূর্বে 'une' ব্যবহৃত হয়: une baguette।"
  },
  {
    id: 3,
    level: 'A1',
    question: "Quelle phrase est correcte au présent ?",
    options: [
      "Ils ont des passeports valables.",
      "Ils sont des passeports valables.",
      "Ils ont être des passeports.",
      "Ils a des passeports."
    ],
    answer: 0,
    explanation: "For third-person plural 'ils' (they), the verb 'avoir' (to have) is 'ont' : Ils ont des passeports (They have valid passports).",
    explanationBn: "'Ils' (তারা) এর সাথে 'avoir' ক্রিয়াটি হয় 'ont' (তাদের বৈধ পাসপোর্ট আছে)।"
  },
  {
    id: 4,
    level: 'A1',
    question: "Où achète-t-on un ticket de métro ?",
    options: [
      "À la borne automatique ou au guichet",
      "À la boucherie",
      "À la pharmacie de garde",
      "Dans une boîte aux lettres"
    ],
    answer: 0,
    explanation: "You buy metro and train tickets at automatic ticket kiosks (borne automatique) or at station ticket counters (guichet).",
    explanationBn: "মেট্রো টিকিট অটোমেটিক মেশিন (borne) অথবা টিকিট কাউন্টার (guichet) থেকে কেনা হয়।"
  },
  {
    id: 5,
    level: 'A1',
    question: "Complétez : « Tariq ______ à la boulangerie à pied. »",
    options: ["va", "allez", "vont", "vais"],
    answer: 0,
    explanation: "The subject 'Tariq' is third-person singular (he / il). In the present tense, 'aller' is conjugated as: il va (Tariq goes).",
    explanationBn: "Tariq (তৃতীয় পুরুষ একবচন) এর সাথে 'aller' (যাওয়া) ক্রিয়াটি 'va' হবে (Tariq va)।"
  },

  // --- A2 Level (Questions 6 to 10) ---
  {
    id: 6,
    level: 'A2',
    question: "Complétez au passé composé : « Hier matin, nous ______ nos documents à la préfecture. »",
    options: [
      "avons déposé",
      "sommes déposés",
      "avons déposer",
      "déposons"
    ],
    answer: 0,
    explanation: "The past tense (passé composé) of 'déposer' takes the auxiliary verb 'avoir': nous avons déposé (we submitted).",
    explanationBn: "'déposer' ক্রিয়ার অতীত কাল গঠিত হয় 'avoir' দিয়ে: nous avons déposé (আমরা গতকাল কাগজপত্র জমা দিয়েছিলাম)।"
  },
  {
    id: 7,
    level: 'A2',
    question: "Choisissez la bonne préposition : « J'habite en France ______ six mois. »",
    options: ["depuis", "pendant", "pour", "dans"],
    answer: 0,
    explanation: "Use 'depuis' (since / for) for an ongoing situation that began in the past and continues into the present.",
    explanationBn: "অতীত থেকে শুরু হয়ে বর্তমানে চলমান সময়ের জন্য 'depuis' (যাবত / ধরে) ব্যবহৃত হয়।"
  },
  {
    id: 8,
    level: 'A2',
    question: "Quelle phrase exprime une demande polie au guichet ?",
    options: [
      "Pourriez-vous vérifier mon dossier, s'il vous plaît ?",
      "Tu vérifies mon dossier vite.",
      "Donne-moi mon papier maintenant.",
      "Vérifie ça !"
    ],
    answer: 0,
    explanation: "'Pourriez-vous...' (polite conditional) is standard courteous French when speaking to officials and customer service.",
    explanationBn: "অফিসিয়াল বা সরকারি কাজে ভদ্রভাবে অনুরোধ করতে 'Pourriez-vous...' (অনুগ্রহ করে আপনি কি পারবেন) বলা হয়।"
  },
  {
    id: 9,
    level: 'A2',
    question: "Que signifie : « Il n'y a plus de monnaie dans la machine » ?",
    options: [
      "La machine ne rend plus de pièces / d'espèces",
      "La machine fonctionne parfaitement",
      "La machine est éteinte pour la nuit",
      "La machine vend des cafés gratuits"
    ],
    answer: 0,
    explanation: "'La monnaie' refers to loose change (coins). This message means the ticket machine cannot give back change in coins.",
    explanationBn: "'Monnaie' মানে খুচরো বা ভাঙতি পয়সা। মেশিনে আর কোনো খুচরো কয়েন নেই।"
  },
  {
    id: 10,
    level: 'A2',
    question: "Complétez : « Si tu as un problème d'ordinateur, Julien ______ t'aider. »",
    options: ["peut", "pouvons", "peux", "pouvez"],
    answer: 0,
    explanation: "'Julien' is third-person singular (he). The present tense of 'pouvoir' (can / to be able to) is: il peut.",
    explanationBn: "Julien (তৃতীয় পুরুষ একবচন) এর সাথে pouvoir ক্রিয়া হবে 'peut' (সাহায্য করতে পারে)।"
  },

  // --- B1 Level (Questions 11 to 15) ---
  {
    id: 11,
    level: 'B1',
    question: "Complétez avec le bon pronom : « Tu vas souvent au laboratoire informatique ? – Oui, j'______ vais tous les jours. »",
    options: ["y", "en", "le", "lui"],
    answer: 0,
    explanation: "The adverbial pronoun 'y' replaces a place introduced by 'à' or 'au' (au laboratoire -> j'y vais = I go there).",
    explanationBn: "'à + স্থান' (ল্যাবে) বোঝাতে 'y' সর্বনাম ব্যবহার করা হয়: j'y vais (আমি সেখানে যাই)।"
  },
  {
    id: 12,
    level: 'B1',
    question: "Choisissez le connecteur logique : « Le serveur est inaccessible, ______ nous devons redémarrer le routeur. »",
    options: ["par conséquent", "bien que", "pourtant", "malgré"],
    answer: 0,
    explanation: "'Par conséquent' means 'therefore' or 'consequently', expressing a logical result.",
    explanationBn: "'Par conséquent' মানে অতএব বা ফলস্বরূপ (সার্ভার ডাউন, তাই আমাদের রাউটার রিস্টার্ট করতে হবে)।"
  },
  {
    id: 13,
    level: 'B1',
    question: "Dans un courriel professionnel, comment termine-t-on formellement ?",
    options: [
      "Restant à votre entière disposition, je vous prie d'agréer mes salutations distinguées.",
      "Bisous et à plus tard !",
      "Ciao mec, merci bien !",
      "Salut, réponds vite !"
    ],
    answer: 0,
    explanation: "This is the classic formal closing phrase for professional workplace and administrative emails in France.",
    explanationBn: "ফরাসি পেশাদার বা প্রাতিষ্ঠানিক ইমেইলের বিদায় সম্ভাষণ হিসেবে এই পূর্ণাঙ্গ ভদ্র রীতি ব্যবহার করা হয়।"
  },
  {
    id: 14,
    level: 'B1',
    question: "Complétez au subjonctif : « Il est indispensable que vous ______ vos identifiants avant lundi. »",
    options: ["mettiez à jour", "mettez à jour", "mettrez à jour", "avez mis à jour"],
    answer: 0,
    explanation: "The impersonal phrase of obligation 'Il est indispensable que...' requires the present subjunctive: que vous mettiez.",
    explanationBn: "'Il est indispensable que' এর পর subjonctif প্রয়োজন হয়, তাই 'mettiez' হবে।"
  },
  {
    id: 15,
    level: 'B1',
    question: "Que signifie l'expression professionnelle : « Faire le point sur un projet » ?",
    options: [
      "Analyser l'avancement et faire le bilan de la situation",
      "Annuler définitivement la réunion",
      "Écrire un point à la fin de chaque phrase",
      "Prendre des congés payés"
    ],
    answer: 0,
    explanation: "'Faire le point' is a standard French workplace idiom meaning to review current progress and check what is accomplished.",
    explanationBn: "'Faire le point' একটি পরিচিত ফরাসি কর্মক্ষেত্রের বাগধারা, যার অর্থ প্রকল্পের বর্তমান অগ্রগতি মূল্যায়ন করা।"
  }
];

export function evaluatePlacementScore(score: number): {
  level: 'A1' | 'A2' | 'B1';
  title: string;
  description: string;
  descriptionBn: string;
} {
  if (score <= 6) {
    return {
      level: 'A1',
      title: 'Recommended Level: A1 Beginner',
      description: 'You understand basic greetings and polite daily phrases. A1 stories will help solidify present-tense verbs, numbers, shopping, and everyday navigation in France.',
      descriptionBn: 'আপনার জন্য A1 লেভেল সুপারিশ করা হলো। দৈনন্দিন প্রয়োজনীয় শব্দভাণ্ডার ও বর্তমান কালের বাক্য পড়ার মাধ্যমে ভিত্তি আরও মজবুত হবে।'
    };
  } else if (score <= 11) {
    return {
      level: 'A2',
      title: 'Recommended Level: A2 Elementary',
      description: 'Solid foundation! You understand the past tense (passé composé), administrative visits, public transport, and polite work requests in France.',
      descriptionBn: 'আপনার স্তর A2 (প্রাথমিক-উচ্চ)। আপনি অতীত কাল ও সরকারি/প্রশাসনিক কথোপকথন ভালো বোঝেন।'
    };
  } else {
    return {
      level: 'B1',
      title: 'Recommended Level: B1 Intermediate',
      description: 'Great proficiency! You handle indirect pronouns, IT workplace email conventions, and logical connecting nuances in French.',
      descriptionBn: 'চমৎকার ফলাফল! আপনি B1 (ইন্টারমিডিয়েট) স্তরে আছেন। আইটি কর্মক্ষেত্র ও জটিল ফরাসি অভিব্যক্তিতে আপনার দারুণ দক্ষতা রয়েছে।'
    };
  }
}
