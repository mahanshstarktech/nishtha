import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CatCharacter } from '../components/CatCharacter';
import { PawButton } from '../components/PawButton';
import { GlassCard } from '../components/GlassCard';
import { ASK_STAGES } from '../lib/stateTypes';
import type { AppState } from '../lib/stateTypes';

interface AskSectionProps {
  state: AppState;
  onYes: () => void;
  onNo: () => void;
  onPivotYes: () => void;
  onPivotNo: () => void;
}

const springText = { type: 'spring' as const, stiffness: 280, damping: 26 };

export const AskSection: React.FC<AskSectionProps> = ({
  state,
  onYes,
  onNo,
  onPivotYes,
  onPivotNo,
}) => {
  const { phase, noCount } = state;

  const stage = ASK_STAGES[Math.min(noCount, ASK_STAGES.length - 1)];
  const isPivot = phase === 'pivot';

  const questionText = isPivot
    ? "Okay okay, I'll stop bugging you about today 😅 But for real — would you want to go on a trek together sometime, whenever works for you?"
    : stage.question;

  const catMood = isPivot ? 'content' : stage.mood;
  const noScale = isPivot ? 1.0 : stage.noScale;
  const yesScale = isPivot ? 1.0 : stage.yesScale;

  return (
    <section
      id="section-ask"
      className="section-full"
      style={{ zIndex: 1, paddingTop: '2rem', paddingBottom: '3rem' }}
    >
      <div style={{ width: '100%', maxWidth: 560, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Trek info card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '2.2rem', flexShrink: 0, marginTop: 2 }}>🏔️</span>
              <div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#2d1a4a',
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.01em',
                }}>
                  Twin Towers, Galta Ji
                </h2>
                <p style={{
                  fontSize: '0.93rem',
                  lineHeight: 1.65,
                  color: '#5a4a7a',
                }}>
                  An easy-to-moderate trail through the Aravalli hills, starting from
                  Galta Gate — right next to the Monkey Temple — about 10 km from central
                  Jaipur. Panoramic views over the city, a half-day outing, best in cool
                  mornings. ☀️🌿
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main interaction card */}
        <GlassCard id="ask-card" style={{ textAlign: 'center', padding: '2rem 1.75rem' }}>

          {/* Cat */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <CatCharacter mood={catMood} size={180} />
          </div>

          {/* Question text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={questionText}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={springText}
              style={{
                fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                fontWeight: 600,
                color: '#2d1a4a',
                lineHeight: 1.55,
                marginBottom: '1.75rem',
                minHeight: '3.5rem',
              }}
            >
              {questionText}
            </motion.p>
          </AnimatePresence>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}>
            {isPivot ? (
              <>
                <PawButton
                  id="btn-pivot-yes"
                  label="Yes, sometime 🌄"
                  variant="yes"
                  onClick={onPivotYes}
                  scale={1.0}
                />
                <PawButton
                  id="btn-pivot-no"
                  label="No, not really"
                  variant="no"
                  onClick={onPivotNo}
                  scale={1.0}
                />
              </>
            ) : (
              <>
                <PawButton
                  id="btn-yes"
                  label="Yes! 🐾"
                  variant="yes"
                  onClick={onYes}
                  scale={yesScale}
                />
                <PawButton
                  id="btn-no"
                  label="No"
                  variant="no"
                  onClick={onNo}
                  scale={noScale}
                />
              </>
            )}
          </div>

          {/* No count hint (subtle) */}
          <AnimatePresence>
            {!isPivot && noCount > 0 && (
              <motion.p
                key={`nc-${noCount}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  marginTop: '1.2rem',
                  fontSize: '0.75rem',
                  color: '#9080b0',
                  letterSpacing: '0.04em',
                }}
              >
                {'🐾'.repeat(noCount)}
              </motion.p>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
};

export default AskSection;
