import React from 'react';
import { motion } from 'framer-motion';
import { CatCharacter } from '../components/CatCharacter';
import { ConfettiEffect } from '../components/ConfettiEffect';

interface CelebrationSectionProps {
  active: boolean;
  onContinue: () => void;
}

export const CelebrationSection: React.FC<CelebrationSectionProps> = ({
  active,
  onContinue,
}) => {
  return (
    <section
      id="section-celebration"
      className="section-full"
      style={{ zIndex: 1 }}
    >
      <ConfettiEffect active={active} />

      <div style={{ textAlign: 'center', maxWidth: 480, width: '100%' }}>

        {/* Dancing cat */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <CatCharacter mood="dance" size={200} />
        </div>

        {/* Celebration heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
          className="gradient-text"
          style={{
            fontSize: 'clamp(2rem, 10vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '0.8rem',
          }}
        >
          Yayyy! 🎉
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          style={{
            fontSize: 'clamp(1rem, 4vw, 1.2rem)',
            fontWeight: 600,
            color: '#2d1a4a',
            marginBottom: '0.6rem',
          }}
        >
          It's a date then.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
          style={{
            fontSize: '1rem',
            color: '#6b5b8a',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          Twin Towers, Galta Ji — let's go make a memory. 🌄🐾
        </motion.p>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}
          onClick={onContinue}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.45)',
            borderRadius: 999,
            padding: '0.85rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#6b3fa0',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(168,85,247,0.18)',
            fontFamily: 'Inter, -apple-system, sans-serif',
            letterSpacing: '0.01em',
          }}
          id="btn-continue-to-food"
        >
          One more question... 🍱
        </motion.button>
      </div>
    </section>
  );
};

export default CelebrationSection;
