import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CatMood } from '../lib/stateTypes';

interface CatCharacterProps {
  mood: CatMood;
  size?: number;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Bongo-Cat-style SVG — white peeking cat with thick outlines, pink paw beans,
   and the signature ω mouth.  Moods are expressed through:
     • eye ry  (squint ↔ round ↔ big puppy eyes)
     • mouth d (ω ↔ smile ↔ frown)
     • blush opacity
     • body tilt / bounce
     • optional tear
   ═══════════════════════════════════════════════════════════════════════════════ */

// ── Mouth paths per mood ──────────────────────────────────────────────────────
const MOUTH: Record<CatMood, string> = {
  happy:         'M 142,103 Q 151,117 159,107 Q 160,104 161,107 Q 169,117 178,103',
  content:       'M 145,104 Q 152,114 159,107 Q 160,105 161,107 Q 168,114 175,104',
  'small-smile': 'M 148,105 Q 154,112 160,108 Q 166,112 172,105',
  neutral:       'M 148,106 Q 160,108 172,106',
  sad:           'M 146,110 Q 160,100 174,110',
  'very-sad':    'M 144,113 Q 160,97 176,113',
  dance:         'M 140,102 Q 149,118 158,107 Q 160,103 162,107 Q 171,118 180,102',
};

// ── Eye ry (squint = small, normal = 7, puppy = big) ─────────────────────────
const EYE_RY: Record<CatMood, number> = {
  happy: 2.5, content: 6.5, 'small-smile': 6, neutral: 7,
  sad: 7, 'very-sad': 8.5, dance: 2,
};

// ── Blush opacity ─────────────────────────────────────────────────────────────
const BLUSH: Record<CatMood, number> = {
  happy: 0.55, content: 0.45, 'small-smile': 0.4, neutral: 0.2,
  sad: 0.3, 'very-sad': 0.35, dance: 0.65,
};

const spring = { type: 'spring' as const, stiffness: 220, damping: 20 };

export const CatCharacter: React.FC<CatCharacterProps> = ({ mood, size = 220 }) => {
  const isDancing = mood === 'dance';
  const isVerySad = mood === 'very-sad';
  const isSad     = mood === 'sad' || isVerySad;
  const height    = size * (170 / 320);           // keep bongo-cat aspect ratio

  return (
    <motion.div
      style={{ width: size, height }}
      animate={
        isDancing
          ? { y: [0, -8, 0, -5, 0], rotate: [0, -3, 0, 3, 0] }
          : isSad
            ? { rotate: -3 }
            : { rotate: 0 }
      }
      transition={
        isDancing
          ? { duration: 0.55, repeat: Infinity, ease: 'easeInOut' }
          : spring
      }
    >
      <svg
        viewBox="0 0 320 170"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Bongo cat feeling ${mood}`}
        role="img"
      >
        {/* ── Table / surface line ─────────────────────────────── */}
        <line
          x1="15" y1="128" x2="305" y2="128"
          stroke="#2d2d2d" strokeWidth="3.5" strokeLinecap="round"
        />

        {/* ── Head + body outline ──────────────────────────────── */}
        <path
          d="
            M 68,128
            C 46,126 36,112 38,94
            C 40,70 58,50 82,40
            L 97,10
            L 115,42
            C 132,52 150,56 160,56
            C 170,56 188,52 205,42
            L 223,10
            L 238,40
            C 262,50 280,70 282,94
            C 284,112 274,126 252,128
            Z
          "
          fill="white"
          stroke="#2d2d2d"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* ── Inner-ear pink ──────────────────────────────────── */}
        <path d="M 87,42 L 98,16 L 112,44 Z" fill="#ffb5c5" opacity="0.45" />
        <path d="M 208,44 L 222,16 L 233,42 Z" fill="#ffb5c5" opacity="0.45" />

        {/* ── Left paw (tilted) ────────────────────────────────── */}
        <g transform="rotate(-12 68 145)">
          <ellipse cx="68" cy="146" rx="15" ry="18"
            fill="white" stroke="#2d2d2d" strokeWidth="3" />
          <circle cx="60" cy="141" r="3.5" fill="#ffb5c5" />
          <circle cx="68" cy="138" r="3.5" fill="#ffb5c5" />
          <circle cx="76" cy="141" r="3.5" fill="#ffb5c5" />
          <circle cx="68" cy="150" r="5"   fill="#ffb5c5" />
        </g>

        {/* ── Right paw (tilted) ───────────────────────────────── */}
        <g transform="rotate(12 252 145)">
          <ellipse cx="252" cy="146" rx="15" ry="18"
            fill="white" stroke="#2d2d2d" strokeWidth="3" />
          <circle cx="244" cy="141" r="3.5" fill="#ffb5c5" />
          <circle cx="252" cy="138" r="3.5" fill="#ffb5c5" />
          <circle cx="260" cy="141" r="3.5" fill="#ffb5c5" />
          <circle cx="252" cy="150" r="5"   fill="#ffb5c5" />
        </g>

        {/* ── Blush marks ──────────────────────────────────────── */}
        <motion.ellipse
          cx="112" cy="100" rx="13" ry="7"
          fill="#ffb5c5"
          animate={{ opacity: BLUSH[mood] }}
          transition={spring}
        />
        <motion.ellipse
          cx="208" cy="100" rx="13" ry="7"
          fill="#ffb5c5"
          animate={{ opacity: BLUSH[mood] }}
          transition={spring}
        />

        {/* ── Left eye ─────────────────────────────────────────── */}
        <motion.ellipse
          cx="135" cy="85" rx="7"
          fill="#2d2d2d"
          animate={{ ry: EYE_RY[mood] }}
          transition={spring}
        />

        {/* ── Right eye ────────────────────────────────────────── */}
        <motion.ellipse
          cx="190" cy="85" rx="7"
          fill="#2d2d2d"
          animate={{ ry: EYE_RY[mood] }}
          transition={spring}
        />

        {/* ── Tear (very-sad) ──────────────────────────────────── */}
        <AnimatePresence>
          {isVerySad && (
            <motion.path
              key="tear"
              d="M 144,93 Q 141,102 144,108 Q 147,102 144,93"
              fill="#87ceeb"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        {/* ── Mouth (morphs per mood) ──────────────────────────── */}
        <motion.path
          d={MOUTH[mood]}
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ d: MOUTH[mood] }}
          transition={spring}
        />
      </svg>
    </motion.div>
  );
};

export default CatCharacter;
