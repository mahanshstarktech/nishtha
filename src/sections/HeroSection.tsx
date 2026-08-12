import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollHintClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollHintClick }) => {
  return (
    <section
      id="section-hero"
      className="section-full"
      style={{ zIndex: 1 }}
    >
      <div style={{ textAlign: 'center', maxWidth: 560, width: '100%' }}>
        {/* Small paw icon above headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ fontSize: '2rem', marginBottom: '1rem' }}
        >
          🐾
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="gradient-text"
          style={{
            fontSize: 'clamp(3rem, 14vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.2rem',
          }}
        >
          Hi Nishtha
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
            fontWeight: 400,
            color: '#6b5b8a',
            letterSpacing: '0.01em',
            lineHeight: 1.55,
          }}
        >
          The prettiest girl I know.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          style={{
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(59,130,246,0.4), transparent)',
            borderRadius: 999,
            margin: '2rem auto',
            maxWidth: 280,
          }}
        />

        {/* Scroll hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          onClick={onScrollHintClick}
          className="scroll-hint"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#9080b0',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '1rem',
          }}
          aria-label="Scroll down to see more"
        >
          <span style={{ fontSize: '1.1rem' }}>🐾</span>
          <ChevronDown size={22} strokeWidth={2} />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
