import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CatMood } from '../lib/stateTypes';

interface CatCharacterProps {
  mood: CatMood;
  size?: number;
}

// ─── Mouth path data per mood ──────────────────────────────────────────────────
// All paths draw within a ~60×20 bounding box centered around cx=100, cy=148
const MOUTH_PATHS: Record<CatMood, string> = {
  'happy':       'M 76 148 Q 100 168 124 148',
  'content':     'M 80 150 Q 100 163 120 150',
  'small-smile': 'M 84 150 Q 100 160 116 150',
  'neutral':     'M 82 150 L 118 150',
  'sad':         'M 80 158 Q 100 145 120 158',
  'very-sad':    'M 76 162 Q 100 144 124 162',
  'dance':       'M 76 146 Q 100 170 124 146',
};

// ─── Pupil Y offset per mood (lower = more droopy) ────────────────────────────
const PUPIL_Y: Record<CatMood, number> = {
  'happy':       0,
  'content':     1,
  'small-smile': 2,
  'neutral':     3,
  'sad':         5,
  'very-sad':    7,
  'dance':       -2,
};

// ─── Eye squeeze (scaleY) per mood ────────────────────────────────────────────
const EYE_SCALE_Y: Record<CatMood, number> = {
  'happy':       1,
  'content':     0.9,
  'small-smile': 0.82,
  'neutral':     0.95,
  'sad':         0.85,
  'very-sad':    0.8,
  'dance':       0.88,
};

// ─── Eyebrow Y offset (higher number = sadder/more raised brow) ───────────────
const BROW_Y: Record<CatMood, number> = {
  'happy':       0,
  'content':     0,
  'small-smile': -2,
  'neutral':     3,
  'sad':         5,
  'very-sad':    8,
  'dance':       -3,
};

// ─── Blush opacity ────────────────────────────────────────────────────────────
const BLUSH_OPACITY: Record<CatMood, number> = {
  'happy':       0.7,
  'content':     0.5,
  'small-smile': 0.4,
  'neutral':     0.2,
  'sad':         0.35,
  'very-sad':    0.45,
  'dance':       0.8,
};

const spring = { type: 'spring' as const, stiffness: 260, damping: 22 };

export const CatCharacter: React.FC<CatCharacterProps> = ({ mood, size = 200 }) => {
  const isDancing = mood === 'dance';
  const isVerySad = mood === 'very-sad';
  const isSad     = mood === 'sad';

  return (
    <motion.div
      style={{ width: size, height: size }}
      className={isDancing ? 'cat-dance' : ''}
      animate={isDancing ? {} : { rotate: mood === 'small-smile' ? -4 : 0 }}
      transition={spring}
    >
      <svg
        viewBox="0 0 200 220"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Cat feeling ${mood}`}
        role="img"
      >
        <defs>
          {/* Eye shine gradient */}
          <radialGradient id="eye-shine-l" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4a2d7a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eye-shine-r" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4a2d7a" stopOpacity="0" />
          </radialGradient>
          {/* Body gradient — cream/warm white */}
          <radialGradient id="body-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff8f0" />
            <stop offset="100%" stopColor="#f5e8d5" />
          </radialGradient>
          {/* Patch gradient */}
          <radialGradient id="patch-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#e8a878" />
            <stop offset="100%" stopColor="#d4855a" />
          </radialGradient>
        </defs>

        {/* ── Tail ──────────────────────────────────────────────── */}
        <motion.path
          d="M 100 200 Q 145 210 155 185 Q 165 165 140 170"
          fill="none"
          stroke="#e8a878"
          strokeWidth="9"
          strokeLinecap="round"
          animate={{ rotate: isDancing ? [0, 18, -18, 12, -12, 0] : (mood === 'happy' ? [0, 10, -5, 8, 0] : 0) }}
          transition={isDancing
            ? { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          }
          style={{ transformOrigin: '100px 200px' }}
        />

        {/* ── Body (main circle) ─────────────────────────────────── */}
        <ellipse cx="100" cy="170" rx="52" ry="42" fill="url(#body-grad)" />

        {/* ── Orange patch on body ───────────────────────────────── */}
        <ellipse cx="115" cy="168" rx="28" ry="22" fill="url(#patch-grad)" opacity="0.55" />

        {/* ── Left ear ──────────────────────────────────────────── */}
        <motion.g
          animate={{ rotate: isVerySad ? -10 : (isSad ? -5 : 0) }}
          transition={spring}
          style={{ transformOrigin: '62px 68px' }}
        >
          <polygon points="62,68 48,38 80,52" fill="#f5e8d5" />
          <polygon points="62,68 53,47 74,55" fill="#f9b8c0" />
        </motion.g>

        {/* ── Right ear ─────────────────────────────────────────── */}
        <motion.g
          animate={{ rotate: isVerySad ? 10 : (isSad ? 5 : 0) }}
          transition={spring}
          style={{ transformOrigin: '138px 68px' }}
        >
          <polygon points="138,68 120,38 152,52" fill="#f5e8d5" />
          <polygon points="138,68 126,47 147,55" fill="#f9b8c0" />
        </motion.g>

        {/* ── Head ──────────────────────────────────────────────── */}
        <circle cx="100" cy="108" r="60" fill="url(#body-grad)" />

        {/* ── Orange head patch ─────────────────────────────────── */}
        <ellipse cx="118" cy="95" rx="32" ry="28" fill="url(#patch-grad)" opacity="0.4" />

        {/* ── Forehead spot ─────────────────────────────────────── */}
        <ellipse cx="100" cy="72" rx="10" ry="7" fill="#e8a878" opacity="0.5" />

        {/* ── Left eyebrow ──────────────────────────────────────── */}
        <motion.path
          d="M 70 88 Q 80 83 90 87"
          fill="none"
          stroke="#7a5c3a"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ y: BROW_Y[mood] }}
          transition={spring}
        />

        {/* ── Right eyebrow ─────────────────────────────────────── */}
        <motion.path
          d="M 110 87 Q 120 83 130 88"
          fill="none"
          stroke="#7a5c3a"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ y: BROW_Y[mood] }}
          transition={spring}
        />

        {/* ── Left eye white ────────────────────────────────────── */}
        <motion.ellipse
          cx="82" cy="108"
          rx="14" ry="14"
          fill="white"
          stroke="#e8c8a0"
          strokeWidth="1"
          animate={{ scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '82px 108px' }}
        />

        {/* ── Right eye white ───────────────────────────────────── */}
        <motion.ellipse
          cx="118" cy="108"
          rx="14" ry="14"
          fill="white"
          stroke="#e8c8a0"
          strokeWidth="1"
          animate={{ scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '118px 108px' }}
        />

        {/* ── Left pupil ────────────────────────────────────────── */}
        <motion.ellipse
          cx="82" cy="108"
          rx="8" ry="9"
          fill="#2a1a4a"
          animate={{ y: PUPIL_Y[mood], scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '82px 108px' }}
        />
        {/* Left pupil shine */}
        <motion.ellipse
          cx="79" cy="104"
          rx="3" ry="3.5"
          fill="white"
          opacity="0.9"
          animate={{ y: PUPIL_Y[mood], scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '79px 104px' }}
        />

        {/* ── Right pupil ───────────────────────────────────────── */}
        <motion.ellipse
          cx="118" cy="108"
          rx="8" ry="9"
          fill="#2a1a4a"
          animate={{ y: PUPIL_Y[mood], scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '118px 108px' }}
        />
        {/* Right pupil shine */}
        <motion.ellipse
          cx="115" cy="104"
          rx="3" ry="3.5"
          fill="white"
          opacity="0.9"
          animate={{ y: PUPIL_Y[mood], scaleY: EYE_SCALE_Y[mood] }}
          transition={spring}
          style={{ transformOrigin: '115px 104px' }}
        />

        {/* ── Tear drop (very-sad only) ──────────────────────────── */}
        <AnimatePresence>
          {isVerySad && (
            <motion.ellipse
              key="tear"
              cx="90" cy="122"
              rx="3" ry="5"
              fill="#a8d8f0"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 0.9, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        {/* ── Left blush ────────────────────────────────────────── */}
        <motion.ellipse
          cx="68" cy="122"
          rx="10" ry="6"
          fill="#f9b8c0"
          animate={{ opacity: BLUSH_OPACITY[mood] }}
          transition={spring}
        />

        {/* ── Right blush ───────────────────────────────────────── */}
        <motion.ellipse
          cx="132" cy="122"
          rx="10" ry="6"
          fill="#f9b8c0"
          animate={{ opacity: BLUSH_OPACITY[mood] }}
          transition={spring}
        />

        {/* ── Nose ──────────────────────────────────────────────── */}
        <polygon points="100,130 96,136 104,136" fill="#f4849e" />

        {/* ── Whiskers left ─────────────────────────────────────── */}
        <line x1="38" y1="132" x2="72" y2="136" stroke="#c8a888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <line x1="36" y1="140" x2="72" y2="140" stroke="#c8a888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

        {/* ── Whiskers right ────────────────────────────────────── */}
        <line x1="128" y1="136" x2="162" y2="132" stroke="#c8a888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <line x1="128" y1="140" x2="164" y2="140" stroke="#c8a888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

        {/* ── Mouth ──────────────────────────────────────────────── */}
        <motion.path
          d={MOUTH_PATHS[mood]}
          fill="none"
          stroke="#c8809a"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ d: MOUTH_PATHS[mood] }}
          transition={spring}
        />

        {/* ── Clasped paws (sad/very-sad) ────────────────────────── */}
        <AnimatePresence>
          {(isSad || isVerySad) && (
            <motion.g
              key="paws"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35 }}
            >
              {/* Left paw */}
              <ellipse cx="88" cy="205" rx="14" ry="10" fill="#f5e8d5" stroke="#e8c8a0" strokeWidth="1" />
              {/* Right paw */}
              <ellipse cx="112" cy="205" rx="14" ry="10" fill="#f5e8d5" stroke="#e8c8a0" strokeWidth="1" />
              {/* Overlap indication */}
              <ellipse cx="100" cy="203" rx="6" ry="5" fill="#f9b8c0" opacity="0.5" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── Wiping paw (very-sad) ──────────────────────────────── */}
        <AnimatePresence>
          {isVerySad && (
            <motion.g
              key="wipe-paw"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <ellipse cx="78" cy="118" rx="10" ry="8" fill="#f5e8d5" stroke="#e8c8a0" strokeWidth="1" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
};

export default CatCharacter;
