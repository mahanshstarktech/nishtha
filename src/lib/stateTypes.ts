// ─── App State Types ──────────────────────────────────────────────────────────

export type Phase =
  | 'ask'       // initial ask, noCount 0-5
  | 'pivot'     // 6th decline → "some other time?"
  | 'yes'       // any yes → celebration
  | 'food'      // food selection (after celebration)
  | 'no-final'  // pivot declined → warm close
  | 'signoff';  // after food selected

export type CatMood =
  | 'happy'
  | 'content'
  | 'small-smile'
  | 'neutral'
  | 'sad'
  | 'very-sad'
  | 'dance';

export interface AppState {
  phase: Phase;
  noCount: number;        // 0–5 during 'ask' phase
  foodChoice: string | null;
}

export type AppAction =
  | { type: 'CLICK_NO' }
  | { type: 'CLICK_YES' }
  | { type: 'CLICK_PIVOT_YES' }
  | { type: 'CLICK_PIVOT_NO' }
  | { type: 'GO_TO_FOOD' }
  | { type: 'SELECT_FOOD'; choice: string };

// ─── State Progression Table ──────────────────────────────────────────────────

export interface AskStageConfig {
  question: string;
  mood: CatMood;
  noScale: number;
  yesScale: number;
}

export const ASK_STAGES: AskStageConfig[] = [
  {
    question: "Will you go on your first trek... with me? 🐾",
    mood: 'happy',
    noScale: 1.0,
    yesScale: 1.0,
  },
  {
    question: "Please? 🥺",
    mood: 'content',
    noScale: 0.88,
    yesScale: 1.08,
  },
  {
    question: "Pleaseee? Just once? 🐱💭",
    mood: 'small-smile',
    noScale: 0.76,
    yesScale: 1.16,
  },
  {
    question: "Please please please? 🥹",
    mood: 'neutral',
    noScale: 0.64,
    yesScale: 1.24,
  },
  {
    question: "I'll even carry your bag the whole trek. Please? 🎒🥺",
    mood: 'sad',
    noScale: 0.52,
    yesScale: 1.32,
  },
  {
    question: "This is my last please, I promise. Pleeeease? 💗",
    mood: 'very-sad',
    noScale: 0.42,
    yesScale: 1.4,
  },
];

export const FOOD_OPTIONS = [
  { id: 'sandwiches', emoji: '🥪', label: 'Sandwiches' },
  { id: 'pasta',      emoji: '🍝', label: 'Pasta' },
  { id: 'maggi',      emoji: '🍜', label: 'Maggi + hot chocolate' },
  { id: 'trail-mix',  emoji: '🍫', label: 'Trail mix & chocolates' },
];
