// ─── App State Types ──────────────────────────────────────────────────────────

export type Phase =
  | 'ask'        // initial ask, noCount 0-5
  | 'pivot'      // 6th decline → "some other time?"
  | 'yes'        // celebration
  | 'day-select' // when do you want to go?
  | 'food'       // what food?
  | 'no-final'   // pivot declined → warm close
  | 'signoff';   // final screen

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
  noCount: number;
  dayChoice: string | null;   // e.g. "Thursday, Aug 14"
  foodChoice: string | null;
}

export type AppAction =
  | { type: 'CLICK_NO' }
  | { type: 'CLICK_YES' }
  | { type: 'CLICK_PIVOT_YES' }
  | { type: 'CLICK_PIVOT_NO' }
  | { type: 'GO_TO_DAY_SELECT' }
  | { type: 'SELECT_DAY'; choice: string }
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
  { id: 'pbj',       emoji: '🥜', label: 'PB & Jam Sandwich' },
  { id: 'mayo',      emoji: '🥪', label: 'Mayo & Veggie Sandwich' },
  { id: 'maggi',     emoji: '🍜', label: 'Maggi + Hot Chocolate' },
  { id: 'trail-mix', emoji: '🍫', label: 'Trail Mix & Chocolates' },
];

// ─── Day Utility ──────────────────────────────────────────────────────────────

export interface DayOption {
  dayName: string;     // e.g. "Thursday"
  shortDay: string;    // e.g. "Thu"
  dateLabel: string;   // e.g. "Aug 14"
  fullLabel: string;   // e.g. "Thursday, Aug 14"
}

/**
 * Compute available trek days:
 *  - If today is Sunday → show next Mon–Sun (7 days).
 *  - Otherwise → show tomorrow through this coming Sunday.
 */
export function getAvailableDays(): DayOption[] {
  const today = new Date();
  const dow = today.getDay(); // 0=Sun 1=Mon … 6=Sat

  let count: number;
  if (dow === 0) {
    // Sunday — show next Mon → Sun
    count = 7;
  } else {
    // days remaining until Sunday (exclusive of today)
    count = 7 - dow;
  }

  const days: DayOption[] = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);

    const dayName = d.toLocaleDateString('en-IN', { weekday: 'long' });
    const shortDay = d.toLocaleDateString('en-IN', { weekday: 'short' });
    const dateLabel = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

    days.push({
      dayName,
      shortDay,
      dateLabel,
      fullLabel: `${dayName}, ${dateLabel}`,
    });
  }

  return days;
}
