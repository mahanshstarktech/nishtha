import { useReducer, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeroSection } from './sections/HeroSection';
import { AskSection } from './sections/AskSection';
import { CelebrationSection } from './sections/CelebrationSection';
import { FoodSection } from './sections/FoodSection';
import { SignOffSection } from './sections/SignOffSection';
import { useSmootScroll, scrollToSection } from './hooks/useScrollSections';
import { fireEvent } from './lib/notifications';
import type { AppState, AppAction } from './lib/stateTypes';

// ─── Reducer ─────────────────────────────────────────────────────────────────

const initialState: AppState = {
  phase: 'ask',
  noCount: 0,
  foodChoice: null,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CLICK_NO': {
      if (state.phase !== 'ask') return state;
      const nextCount = state.noCount + 1;
      if (nextCount > 5) {
        return { ...state, phase: 'pivot' };
      }
      return { ...state, noCount: nextCount };
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
    case 'GO_TO_FOOD':
      if (state.phase !== 'yes') return state;
      return { ...state, phase: 'food' };
    case 'SELECT_FOOD':
      if (state.phase !== 'food') return state;
      return { ...state, foodChoice: action.choice, phase: 'signoff' };
    default:
      return state;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lenisRef = useSmootScroll();
  const answerNotifiedRef = useRef(false);
  const foodNotifiedRef   = useRef(false);

  const { phase, noCount, foodChoice } = state;

  // Scroll on phase change
  useEffect(() => {
    if (phase === 'yes') {
      setTimeout(() => scrollToSection('section-celebration', lenisRef.current), 150);
    }
    if (phase === 'food') {
      setTimeout(() => scrollToSection('section-food', lenisRef.current), 150);
    }
    if (phase === 'no-final') {
      setTimeout(() => scrollToSection('section-signoff', lenisRef.current), 150);
    }
    if (phase === 'signoff') {
      setTimeout(() => scrollToSection('section-signoff', lenisRef.current), 300);
    }
  }, [phase]);

  // Notify on final answer (yes or no-final)
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

  // Notify on food choice
  useEffect(() => {
    if (foodNotifiedRef.current || !foodChoice) return;
    foodNotifiedRef.current = true;
    const option = FOOD_OPTIONS_LABELS[foodChoice] ?? foodChoice;
    fireEvent({
      answer: 'food-choice',
      noCount,
      foodChoice: option,
    });
  }, [foodChoice, noCount]);

  // Derived visibility flags
  const showAsk         = phase === 'ask' || phase === 'pivot';
  const showCelebration = phase === 'yes' || phase === 'food' || phase === 'signoff';
  const showFood        = phase === 'food' || phase === 'signoff';
  const showSignoff     = phase === 'signoff' || phase === 'no-final';

  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <HeroSection
          onScrollHintClick={() => scrollToSection('section-ask', lenisRef.current)}
        />

        {/* ── Ask / Pivot ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {showAsk && (
            <motion.div
              key="ask"
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45 }}
            >
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

        {/* ── Celebration ──────────────────────────────────────────────── */}
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
                onContinue={() => dispatch({ type: 'GO_TO_FOOD' })}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Food ──────────────────────────────────────────────────────── */}
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
                onSelect={(id) => {
                  dispatch({ type: 'SELECT_FOOD', choice: id });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sign-off ─────────────────────────────────────────────────── */}
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
                foodChoice={foodChoice}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Label map for notifications
const FOOD_OPTIONS_LABELS: Record<string, string> = {
  sandwiches: 'Sandwiches',
  pasta: 'Pasta',
  maggi: 'Maggi + hot chocolate',
  'trail-mix': 'Trail mix & chocolates',
};

export default App;
