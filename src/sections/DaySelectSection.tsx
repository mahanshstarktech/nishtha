import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { CatCharacter } from '../components/CatCharacter';
import { getAvailableDays } from '../lib/stateTypes';

interface DaySelectSectionProps {
  dayChoice: string | null;
  onSelect: (fullLabel: string) => void;
}

export const DaySelectSection: React.FC<DaySelectSectionProps> = ({
  dayChoice,
  onSelect,
}) => {
  const days = useMemo(() => getAvailableDays(), []);

  return (
    <section
      id="section-day-select"
      className="section-full"
      style={{ zIndex: 1, padding: '2rem 1rem' }}
    >
      <div style={{ width: '100%', maxWidth: 560, textAlign: 'center' }}>

        {/* Cat */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <CatCharacter mood="content" size={140} />
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.3rem, 5vw, 1.75rem)',
            fontWeight: 800,
            color: '#2d1a4a',
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
            marginBottom: '0.5rem',
          }}>
            When works for you? 📅
          </h2>
          <p style={{
            fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
            color: '#6b5b8a',
            lineHeight: 1.5,
          }}>
            Pick a day and I'll make it happen ✨
          </p>
        </motion.div>

        {/* Day options grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${days.length <= 4 ? '120px' : '100px'}, 1fr))`,
          gap: '0.7rem',
          marginBottom: '1.5rem',
          width: '100%',
        }}>
          {days.map((day, i) => (
            <motion.button
              key={day.fullLabel}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(day.fullLabel)}
              aria-pressed={dayChoice === day.fullLabel}
              style={{
                background: dayChoice === day.fullLabel
                  ? 'rgba(168,85,247,0.15)'
                  : 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(16px) saturate(160%)',
                WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                border: dayChoice === day.fullLabel
                  ? '2px solid rgba(168,85,247,0.55)'
                  : '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 20,
                padding: '1rem 0.6rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: dayChoice === day.fullLabel
                  ? '0 8px 28px rgba(168,85,247,0.22)'
                  : '0 4px 16px rgba(120,80,200,0.10)',
                transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                fontFamily: 'Inter, -apple-system, sans-serif',
                minHeight: 80,
                width: '100%',
              }}
            >
              <span style={{
                fontSize: 'clamp(1rem, 4vw, 1.15rem)',
                fontWeight: 700,
                color: dayChoice === day.fullLabel ? '#7c3aed' : '#2d1a4a',
              }}>
                {day.shortDay}
              </span>
              <span style={{
                fontSize: 'clamp(0.7rem, 2.8vw, 0.8rem)',
                fontWeight: 500,
                color: dayChoice === day.fullLabel ? '#7c3aed' : '#6b5b8a',
              }}>
                {day.dateLabel}
              </span>
              {dayChoice === day.fullLabel && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ fontSize: '0.8rem' }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Selection confirmation */}
        <AnimatePresence>
          {dayChoice && (
            <motion.div
              key="day-confirm"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <GlassCard style={{ textAlign: 'center', padding: '1rem 1.4rem' }}>
                <p style={{
                  fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
                  fontWeight: 600,
                  color: '#4a2d7a',
                  lineHeight: 1.5,
                }}>
                  {dayChoice} it is! 🐾
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DaySelectSection;
