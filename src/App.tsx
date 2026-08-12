import { useReducer, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeroSection } from './sections/HeroSection';
import { AskSection } from './sections/AskSection';
import { CelebrationSection } from './sections/CelebrationSection';
import { DaySelectSection } from './sections/DaySelectSection';
import { FoodSection } from './sections/FoodSection';
import { SignOffSection } from './sections/SignOffSection';
import { useSmootScroll, scrollToSection } from './hooks/useScrollSections';
import { fireEvent } from './lib/notifications';
import type { AppState, AppAction } from './lib/stateTypes';

// ─── Reducer ──────────────────────────────────────────────────────────────────

const initialState: AppState = {
  phase: 'ask',
  noCount: 0,
  dayChoice: null,
  foodChoice: null,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CLICK_NO': {
      if (state.phase !== 'ask') return state;
      const next = state.noCount + 1;
      if (next > 5) return { ...state, phase: 'pivot' };
      return { ...state, noCount: next };
    }
    case 'CLICK_YES':
      if (state.phase !== 'ask') return state;
      return { ...state, phase: 'yes' };
    case 'CLICK_PIVOT_YES':
      if (state.phase !== 'pivot') return state;
      return { ...state, phase: 'yes' };
    case 'CLICK_PIVOT_NO':
      if (state.phase !== 'pivot') return state;
      return { ...state, phase: 'no-final' };
    case 'GO_TO_DAY_SELECT':
      if (state.phase !== 'yes') return state;
      return { ...state, phase: 'day-select' };
    case 'SELECT_DAY':
      if (state.phase !== 'day-select') return state;
      return { ...state, dayChoice: action.choice, phase: 'food' };
    case 'SELECT_FOOD':
      if (state.phase !== 'food') return state;
      return { ...state, foodChoice: action.choice, phase: 'signoff' };
    default:
      return state;
  }
}

// ─── Food label lookup ────────────────────────────────────────────────────────
const FOOD_LABELS: Record<string, string> = {
  pbj: 'PB & Jam Sandwich',
  mayo: 'Mayo & Veggie Sandwich',
  maggi: 'Maggi + Hot Chocolate',
  'trail-mix': 'Trail Mix & Chocolates',
};

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lenisRef = useSmootScroll();
  const answerNotifiedRef = useRef(false);
  const dayNotifiedRef    = useRef(false);
  const foodNotifiedRef   = useRef(false);
  const allDoneNotifiedRef = useRef(false);

  const { phase, noCount, dayChoice, foodChoice } = state;

  // ── Scroll on phase change ───────────────────────────────────────────────
  useEffect(() => {
    const targets: Record<string, string> = {
      'yes':        'section-celebration',
      'day-select': 'section-day-select',
      'food':       'section-food',
      'no-final':   'section-signoff',
      'signoff':    'section-signoff',
    };
    const target = targets[phase];
    if (target) {
      setTimeout(() => scrollToSection(target, lenisRef.current), 350);
    }
  }, [phase]);

  // ── Notify: final answer ─────────────────────────────────────────────────
  useEffect(() => {
    if (answerNotifiedRef.current) return;
    if (phase === 'yes' || phase === 'no-final') {
      answerNotifiedRef.current = true;
      fireEvent({
        answer: phase === 'yes' ? 'yes' : 'no-final',
        noCount,
      });
    }
  }, [phase, noCount]);

  // ── Notify: day choice ───────────────────────────────────────────────────
  useEffect(() => {
    if (dayNotifiedRef.current || !dayChoice) return;
    dayNotifiedRef.current = true;
    fireEvent({ answer: 'day-choice', noCount, dayChoice });
  }, [dayChoice, noCount]);

  // ── Notify: food choice + all-done summary ──────────────────────────────
  useEffect(() => {
    if (foodNotifiedRef.current || !foodChoice) return;
    foodNotifiedRef.current = true;
    const foodLabel = FOOD_LABELS[foodChoice] ?? foodChoice;
    fireEvent({ answer: 'food-choice', noCount, foodChoice: foodLabel });

    // Fire the combined "all-done" summary a moment later
    if (!allDoneNotifiedRef.current && dayChoice) {
      allDoneNotifiedRef.current = true;
      setTimeout(() => {
        fireEvent({
          answer: 'all-done',
          noCount,
          dayChoice,
          foodChoice: foodLabel,
        });
      }, 1500);
    }
  }, [foodChoice, noCount, dayChoice]);

  // ── Section visibility ───────────────────────────────────────────────────
  const showAsk         = phase === 'ask' || phase === 'pivot';
  const showCelebration = ['yes', 'day-select', 'food', 'signoff'].includes(phase);
  const showDaySelect   = ['day-select', 'food', 'signoff'].includes(phase);
  const showFood        = ['food', 'signoff'].includes(phase);
  const showSignoff     = phase === 'signoff' || phase === 'no-final';

  // Resolve food label for sign-off display
  const foodLabel = foodChoice ? (FOOD_LABELS[foodChoice] ?? foodChoice) : null;

  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <HeroSection
          onScrollHintClick={() => scrollToSection('section-ask', lenisRef.current)}
        />

        {/* ── Ask / Pivot ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showAsk && (
            <motion.div key="ask" exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }}>
              <AskSection
                state={state}
                onYes={() => dispatch({ type: 'CLICK_YES' })}
                onNo={() => dispatch({ type: 'CLICK_NO' })}
                onPivotYes={() => dispatch({ type: 'CLICK_PIVOT_YES' })}
                onPivotNo={() => dispatch({ type: 'CLICK_PIVOT_NO' })}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Celebration ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <CelebrationSection
                active={showCelebration}
                onContinue={() => dispatch({ type: 'GO_TO_DAY_SELECT' })}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Day Selection ────────────────────────────────────────── */}
        <AnimatePresence>
          {showDaySelect && (
            <motion.div
              key="day-select"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <DaySelectSection
                dayChoice={dayChoice}
                onSelect={(fullLabel) => {
                  dispatch({ type: 'SELECT_DAY', choice: fullLabel });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Food ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {showFood && (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <FoodSection
                foodChoice={foodChoice}
                onSelect={(id, label) => {
                  dispatch({ type: 'SELECT_FOOD', choice: id === 'custom' ? label : id });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sign-off ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {showSignoff && (
            <motion.div
              key="signoff"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <SignOffSection
                phase={phase}
                dayChoice={dayChoice}
                foodChoice={foodLabel}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;
