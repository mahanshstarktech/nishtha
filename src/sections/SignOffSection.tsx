import React from 'react';
import { motion } from 'framer-motion';
import { CatCharacter } from '../components/CatCharacter';
import type { Phase } from '../lib/stateTypes';

interface SignOffSectionProps {
  phase: Phase;
  foodChoice: string | null;
}

const MESSAGES: Record<string, { heading: string; sub: string; mood: 'happy' | 'content' | 'sad' }> = {
  'signoff-yes': {
    heading: "Can't wait! 🌄",
    sub: "Twin Towers, Galta Ji — it's going to be a great day. I'll sort everything out. Just show up. 🐾",
    mood: 'happy',
  },
  'signoff-no-final': {
    heading: "No worries at all 🐾",
    sub: "Thanks for humoring me. The offer stands whenever you're up for it — no pressure, ever.",
    mood: 'content',
  },
};

export const SignOffSection: React.FC<SignOffSectionProps> = ({ phase, foodChoice }) => {
  const isNoFinal = phase === 'no-final';
  const msgKey = isNoFinal ? 'signoff-no-final' : 'signoff-yes';
  const msg = MESSAGES[msgKey];

  return (
    <section
      id="section-signoff"
      className="section-full"
      style={{ zIndex: 1, paddingBottom: '4rem' }}
    >
      <div style={{ textAlign: 'center', maxWidth: 460, width: '100%' }}>

        {/* Cat */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <CatCharacter mood={msg.mood} size={160} />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={!isNoFinal ? 'gradient-text' : ''}
          style={{
            fontSize: 'clamp(1.6rem, 7vw, 2.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
            color: isNoFinal ? '#4a3a6a' : undefined,
          }}
        >
          {msg.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontSize: '1rem',
            color: '#6b5b8a',
            lineHeight: 1.65,
            marginBottom: '2rem',
          }}
        >
          {msg.sub}
        </motion.p>

        {/* Food choice recap (if yes path) */}
        {!isNoFinal && foodChoice && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 18,
              padding: '0.9rem 1.4rem',
              boxShadow: '0 4px 14px rgba(120,80,200,0.10)',
              marginBottom: '2rem',
              fontSize: '0.93rem',
              color: '#5a4a7a',
            }}
          >
            🍱 Food locked in. All I need now is you. 🐾
          </motion.div>
        )}

        {/* Closing paw row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontSize: '1.6rem',
            letterSpacing: '0.3rem',
            color: '#c084fc',
          }}
        >
          🐾🐾🐾
        </motion.div>
      </div>
    </section>
  );
};

export default SignOffSection;
