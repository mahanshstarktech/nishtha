import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CatMood } from '../lib/stateTypes';

interface CatCharacterProps {
  mood: CatMood;
  size?: number;
}

// ─── Pixar-Style Mouth Paths ──────────────────────────────────────────────────
// Positioned relative to a face centered at (100, 100) with nose at y≈120
const MOUTH_PATHS: Record<CatMood, string> = {
  'happy':       'M 86 128 Q 93 138 100 136 Q 107 138 114 128',
  'content':     'M 88 130 Q 94 136 100 134 Q 106 136 112 130',
  'small-smile': 'M 90 131 Q 95 135 100 133 Q 105 135 110 131',
  'neutral':     'M 90 131 Q 100 132 110 131',
  'sad':         'M 88 136 Q 100 128 112 136',
  'very-sad':    'M 86 138 Q 100 126 114 138',
  'dance':       'M 84 128 Q 92 140 100 137 Q 108 140 116 128',
};

// ─── Pupil Y offset per mood ──────────────────────────────────────────────────
const PUPIL_Y: Record<CatMood, number> = {
  'happy': 0, 'content': 0, 'small-smile': 1, 'neutral': 2,
  'sad': 3, 'very-sad': 4, 'dance': -1,
};

// ─── Eye openness (scaleY of eye white) ───────────────────────────────────────
const EYE_SCALE_Y: Record<CatMood, number> = {
  'happy': 1, 'content': 0.92, 'small-smile': 0.85, 'neutral': 1,
  'sad': 0.88, 'very-sad': 0.82, 'dance': 0.78,
};

// ─── Iris size (scale of iris) ────────────────────────────────────────────────
const IRIS_SCALE: Record<CatMood, number> = {
  'happy': 1, 'content': 1, 'small-smile': 1, 'neutral': 1.12,
  'sad': 1.15, 'very-sad': 1.2, 'dance': 0.95,
};

// ─── Eyebrow rotation ────────────────────────────────────────────────────────
const BROW_ANGLE: Record<CatMood, { left: number; right: number }> = {
  'happy':       { left: 0, right: 0 },
  'content':     { left: 0, right: 0 },
  'small-smile': { left: -3, right: 3 },
  'neutral':     { left: 8, right: -8 },
  'sad':         { left: 12, right: -12 },
  'very-sad':    { left: 16, right: -16 },
  'dance':       { left: -5, right: 5 },
};

// ─── Blush opacity ────────────────────────────────────────────────────────────
const BLUSH_OP: Record<CatMood, number> = {
  'happy': 0.6, 'content': 0.45, 'small-smile': 0.4, 'neutral': 0.2,
  'sad': 0.35, 'very-sad': 0.4, 'dance': 0.7,
};

const spring = { type: 'spring' as const, stiffness: 240, damping: 22 };

export const CatCharacter: React.FC<CatCharacterProps> = ({ mood, size = 200 }) => {
  const isDancing = mood === 'dance';
  const isVerySad = mood === 'very-sad';
  const isSadOrWorse = mood === 'sad' || mood === 'very-sad';

  return (
    <motion.div
      style={{ width: size, height: size * 1.15 }}
      className={isDancing ? 'cat-dance' : ''}
      animate={isDancing ? {} : { rotate: mood === 'small-smile' ? -3 : 0 }}
      transition={spring}
    >
      <svg
        viewBox="0 0 200 230"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Cat feeling ${mood}`}
        role="img"
      >
        <defs>
          {/* Head gradient — warm cream */}
          <radialGradient id="head-fill" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff5eb" />
            <stop offset="70%" stopColor="#ffe8d0" />
            <stop offset="100%" stopColor="#f5d4b0" />
          </radialGradient>

          {/* Body gradient */}
          <radialGradient id="body-fill" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff0e0" />
            <stop offset="100%" stopColor="#f0d5b5" />
          </radialGradient>

          {/* Iris gradient — warm amber/golden */}
          <radialGradient id="iris-grad" cx="42%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#e8b84a" />
            <stop offset="50%" stopColor="#c8952e" />
            <stop offset="100%" stopColor="#8b6914" />
          </radialGradient>

          {/* Orange patch gradient */}
          <radialGradient id="patch-fill" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f0b878" />
            <stop offset="100%" stopColor="#d9975a" />
          </radialGradient>

          {/* Soft shadow */}
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" />
            <feComponentTransfer><feFuncA type="linear" slope="0.12" /></feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Tail ──────────────────────────────────────────────────── */}
        <motion.path
          d="M 112 198 Q 148 210 158 188 Q 166 168 145 174"
          fill="none"
          stroke="#e0a06a"
          strokeWidth="7"
          strokeLinecap="round"
          animate={{
            rotate: isDancing
              ? [0, 20, -20, 15, -15, 0]
              : (mood === 'happy' ? [0, 12, -6, 10, 0] : 0),
          }}
          transition={isDancing
            ? { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          }
          style={{ transformOrigin: '112px 198px' }}
        />

        {/* ── Body (small — Pixar proportions) ───────────────────────── */}
        <ellipse cx="100" cy="195" rx="36" ry="28" fill="url(#body-fill)" filter="url(#soft-shadow)" />
        {/* Body stripe */}
        <ellipse cx="108" cy="193" rx="20" ry="16" fill="url(#patch-fill)" opacity="0.35" />

        {/* ── Front paws ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {isSadOrWorse ? (
            <motion.g
              key="paws-clasped"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ellipse cx="88" cy="218" rx="12" ry="8" fill="#ffe8d0" stroke="#e8c8a0" strokeWidth="1" />
              <ellipse cx="112" cy="218" rx="12" ry="8" fill="#ffe8d0" stroke="#e8c8a0" strokeWidth="1" />
            </motion.g>
          ) : (
            <motion.g
              key="paws-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ellipse cx="78" cy="218" rx="11" ry="7" fill="#ffe8d0" stroke="#e8c8a0" strokeWidth="1" />
              <ellipse cx="122" cy="218" rx="11" ry="7" fill="#ffe8d0" stroke="#e8c8a0" strokeWidth="1" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── Left ear ──────────────────────────────────────────────── */}
        <motion.g
          animate={{ rotate: isVerySad ? -8 : (mood === 'sad' ? -4 : 0) }}
          transition={spring}
          style={{ transformOrigin: '60px 60px' }}
        >
          <path d="M 60 62 L 42 22 L 78 48 Z" fill="#f5d4b0" />
          <path d="M 60 62 L 48 32 L 74 50 Z" fill="#f7b8c4" opacity="0.7" />
        </motion.g>

        {/* ── Right ear ─────────────────────────────────────────────── */}
        <motion.g
          animate={{ rotate: isVerySad ? 8 : (mood === 'sad' ? 4 : 0) }}
          transition={spring}
          style={{ transformOrigin: '140px 60px' }}
        >
          <path d="M 140 62 L 158 22 L 122 48 Z" fill="#f5d4b0" />
          <path d="M 140 62 L 152 32 L 126 50 Z" fill="#f7b8c4" opacity="0.7" />
        </motion.g>

        {/* ── Head (BIG — Pixar proportions) ──────────────────────────── */}
        <circle cx="100" cy="100" r="66" fill="url(#head-fill)" filter="url(#soft-shadow)" />

        {/* ── Forehead orange patch ───────────────────────────────────── */}
        <ellipse cx="112" cy="78" rx="28" ry="22" fill="url(#patch-fill)" opacity="0.3" />

        {/* ── Left eyebrow ──────────────────────────────────────────── */}
        <motion.line
          x1="56" y1="72" x2="78" y2="70"
          stroke="#b08860"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ rotate: BROW_ANGLE[mood].left }}
          transition={spring}
          style={{ transformOrigin: '67px 71px' }}
        />

        {/* ── Right eyebrow ─────────────────────────────────────────── */}
        <motion.line
          x1="122" y1="70" x2="144" y2="72"
          stroke="#b08860"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ rotate: BROW_ANGLE[mood].right }}
          transition={spring}
          style={{ transformOrigin: '133px 71px' }}
        />

        {/* ══════════════════════════════════════════════════════════════
            LEFT EYE — BIG (the Pixar magic)
            ══════════════════════════════════════════════════════════════ */}
        <motion.ellipse
          cx="75" cy="95"
          rx="22" ry="22"
          fill="white"
          stroke="#e0c8a8"
          strokeWidth="1.2"
          animate={{ scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '75px 95px' }}
        />
        {/* Left iris */}
        <motion.circle
          cx="77" cy="97"
          r="14"
          fill="url(#iris-grad)"
          animate={{
            y: PUPIL_Y[mood],
            scaleY: EYE_SCALE_Y[mood],
            scale: IRIS_SCALE[mood],
          }}
          transition={spring}
          style={{ transformOrigin: '77px 97px' }}
        />
        {/* Left pupil */}
        <motion.circle
          cx="77" cy="97"
          r="7"
          fill="#1a0e2e"
          animate={{ y: PUPIL_Y[mood], scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '77px 97px' }}
        />
        {/* Left eye — primary highlight (large, top-left) */}
        <motion.circle
          cx="70" cy="89"
          r="6"
          fill="white"
          opacity="0.95"
          animate={{ y: PUPIL_Y[mood] * 0.5 }}
          transition={spring}
        />
        {/* Left eye — secondary highlight (small, bottom-right) */}
        <motion.circle
          cx="83" cy="103"
          r="3"
          fill="white"
          opacity="0.7"
          animate={{ y: PUPIL_Y[mood] * 0.5 }}
          transition={spring}
        />

        {/* ══════════════════════════════════════════════════════════════
            RIGHT EYE — BIG (the Pixar magic)
            ══════════════════════════════════════════════════════════════ */}
        <motion.ellipse
          cx="125" cy="95"
          rx="22" ry="22"
          fill="white"
          stroke="#e0c8a8"
          strokeWidth="1.2"
          animate={{ scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '125px 95px' }}
        />
        {/* Right iris */}
        <motion.circle
          cx="123" cy="97"
          r="14"
          fill="url(#iris-grad)"
          animate={{
            y: PUPIL_Y[mood],
            scaleY: EYE_SCALE_Y[mood],
            scale: IRIS_SCALE[mood],
          }}
          transition={spring}
          style={{ transformOrigin: '123px 97px' }}
        />
        {/* Right pupil */}
        <motion.circle
          cx="123" cy="97"
          r="7"
          fill="#1a0e2e"
          animate={{ y: PUPIL_Y[mood], scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '123px 97px' }}
        />
        {/* Right eye — primary highlight */}
        <motion.circle
          cx="116" cy="89"
          r="6"
          fill="white"
          opacity="0.95"
          animate={{ y: PUPIL_Y[mood] * 0.5 }}
          transition={spring}
        />
        {/* Right eye — secondary highlight */}
        <motion.circle
          cx="129" cy="103"
          r="3"
          fill="white"
          opacity="0.7"
          animate={{ y: PUPIL_Y[mood] * 0.5 }}
          transition={spring}
        />

        {/* ── Tear (very-sad) ────────────────────────────────────────── */}
        <AnimatePresence>
          {isVerySad && (
            <motion.path
              key="tear"
              d="M 62 108 Q 60 116 62 122 Q 64 116 62 108"
              fill="#9dd4f0"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        {/* ── Left blush ────────────────────────────────────────────── */}
        <motion.ellipse
          cx="55" cy="112"
          rx="10" ry="5.5"
          fill="#f7a8b8"
          animate={{ opacity: BLUSH_OP[mood] }}
          transition={spring}
        />

        {/* ── Right blush ───────────────────────────────────────────── */}
        <motion.ellipse
          cx="145" cy="112"
          rx="10" ry="5.5"
          fill="#f7a8b8"
          animate={{ opacity: BLUSH_OP[mood] }}
          transition={spring}
        />

        {/* ── Nose (tiny, cute) ──────────────────────────────────────── */}
        <path
          d="M 97 120 L 100 124 L 103 120 Z"
          fill="#f08095"
          stroke="#e06878"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* ── Whiskers ──────────────────────────────────────────────── */}
        <line x1="40" y1="116" x2="62" y2="118" stroke="#d4b898" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="38" y1="124" x2="62" y2="123" stroke="#d4b898" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="138" y1="118" x2="160" y2="116" stroke="#d4b898" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="138" y1="123" x2="162" y2="124" stroke="#d4b898" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

        {/* ── Mouth (morphs between moods) ───────────────────────────── */}
        <motion.path
          d={MOUTH_PATHS[mood]}
          fill="none"
          stroke="#c07080"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ d: MOUTH_PATHS[mood] }}
          transition={spring}
        />

        {/* ── Wiping-eye paw (very-sad) ──────────────────────────────── */}
        <AnimatePresence>
          {isVerySad && (
            <motion.ellipse
              key="wipe"
              cx="60" cy="107"
              rx="9" ry="7"
              fill="#ffe8d0"
              stroke="#e0c8a0"
              strokeWidth="1"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            />
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
};

export default CatCharacter;
