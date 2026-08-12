import { motion } from 'framer-motion';
import { CatCharacter } from '../components/CatCharacter';
import type { Phase } from '../lib/stateTypes';

interface SignOffSectionProps {
  phase: Phase;
  dayChoice: string | null;
  foodChoice: string | null;
}

export const SignOffSection: React.FC<SignOffSectionProps> = ({
  phase,
  dayChoice,
  foodChoice,
}) => {
  const isNoFinal = phase === 'no-final';

  // Extract just the day name (e.g. "Thursday" from "Thursday, Aug 14")
  const dayName = dayChoice?.split(',')[0] ?? 'the trek';

  return (
    <section
      id="section-signoff"
      className="section-full"
      style={{ zIndex: 1, padding: '2.5rem 1rem 4rem' }}
    >
      <div style={{ textAlign: 'center', maxWidth: 480, width: '100%' }}>

        {/* Cat */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <CatCharacter mood={isNoFinal ? 'content' : 'happy'} size={240} />
        </div>

        {isNoFinal ? (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontSize: 'clamp(1.5rem, 6vw, 2.2rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#4a3a6a',
                marginBottom: '0.75rem',
              }}
            >
              No worries at all 🐾
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
                color: '#6b5b8a',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              Thanks for humoring me. The offer stands whenever you're up for it — no pressure, ever. 💜
            </motion.p>
          </>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="gradient-text"
              style={{
                fontSize: 'clamp(1.6rem, 7vw, 2.6rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              See you on {dayName} ✨
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
              style={{
                fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
                color: '#5a4a7a',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
              }}
            >
              <p style={{ marginBottom: '0.7rem' }}>
                Every adventure is better with you.
              </p>
              <p style={{ marginBottom: '0.7rem' }}>
                I can already picture us at the top,
                <br />
                looking at the city together. 🌄
              </p>
              <p style={{ fontWeight: 600, color: '#4a2d7a' }}>
                Thank you for saying yes.
                <br />
                My heart hasn't stopped smiling since. 💗
              </p>
            </motion.div>

            {/* Recap card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.45)',
                borderRadius: 22,
                padding: '1.1rem 1.4rem',
                boxShadow: '0 4px 18px rgba(120,80,200,0.12)',
                marginBottom: '1.5rem',
              }}
            >
              <p style={{
                fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                color: '#5a4a7a',
                lineHeight: 1.6,
              }}>
                📅 <strong>{dayChoice}</strong>
                {foodChoice && (
                  <><br />🍱 <strong>{foodChoice}</strong> packed</>
                )}
                <br />📍 Twin Towers, Galta Ji
                <br /><br />
                <span style={{ color: '#7c3aed', fontWeight: 600 }}>
                  All I need now is you. 🐾
                </span>
              </p>
            </motion.div>
          </>
        )}

        {/* Paw trail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontSize: '1.4rem',
            letterSpacing: '0.4rem',
            color: '#c084fc',
          }}
        >
          🐾🐾🐾
        </motion.div>
      </div>

      {/* Made with love footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          fontSize: '0.75rem',
          color: '#8a7a9a',
          letterSpacing: '0.02em',
          textAlign: 'center',
          width: '100%',
        }}
      >
        Made with ❤️ By Mahansh Gaur
      </motion.div>
    </section>
  );
};

export default SignOffSection;
