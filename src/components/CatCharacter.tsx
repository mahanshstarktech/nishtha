import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CatMood } from '../lib/stateTypes';

interface CatCharacterProps {
  mood: CatMood;
  size?: number;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Bongo Cat — matched to the reference image (reference.png).
   White peeking cat, thick black outlines, large round eyes with highlight,
   signature ω mouth, pink paw beans, and concave "waist" silhouette.

   Moods expressed via:  eye ry · mouth d · highlight opacity · blush · tear · tilt
   ═══════════════════════════════════════════════════════════════════════════════ */

// ── Mouth paths (ω ↔ smile ↔ frown) ──────────────────────────────────────────
const MOUTH: Record<CatMood, string> = {
  happy:         'M 155,106 Q 163,122 172,110 Q 176,106 180,110 Q 189,122 197,106',
  content:       'M 158,108 Q 165,120 172,111 Q 176,107 180,111 Q 187,120 194,108',
  'small-smile': 'M 160,109 Q 167,117 174,111 Q 177,109 180,111 Q 187,117 194,109',
  neutral:       'M 162,110 Q 177,112 192,110',
  sad:           'M 158,114 Q 177,104 196,114',
  'very-sad':    'M 156,117 Q 177,100 198,117',
  dance:         'M 153,105 Q 162,124 171,110 Q 176,105 181,110 Q 190,124 199,105',
};

// ── Eye ry — rx is fixed at 14; ry squints/rounds/dilates ─────────────────────
const EYE_RY: Record<CatMood, number> = {
  happy: 3,
  content: 12,
  'small-smile': 11,
  neutral: 14,
  sad: 14,
  'very-sad': 15.5,
  dance: 2.5,
};

// ── Eye highlight opacity (hide when squinting) ──────────────────────────────
const HL_OP: Record<CatMood, number> = {
  happy: 0,  content: 0.95, 'small-smile': 0.9, neutral: 0.95,
  sad: 0.9,  'very-sad': 0.95,  dance: 0,
};

// ── Blush opacity ─────────────────────────────────────────────────────────────
const BLUSH: Record<CatMood, number> = {
  happy: 0.45, content: 0.35, 'small-smile': 0.3, neutral: 0,
  sad: 0.2,  'very-sad': 0.25,  dance: 0.5,
};

const spring = { type: 'spring' as const, stiffness: 220, damping: 20 };

export const CatCharacter: React.FC<CatCharacterProps> = ({ mood, size = 220 }) => {
  const isDancing = mood === 'dance';
  const isVerySad = mood === 'very-sad';
  const isSad     = mood === 'sad' || isVerySad;
  const height    = size * (180 / 340);   // wide bongo-cat aspect ratio

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
        viewBox="0 0 340 180"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Bongo cat feeling ${mood}`}
        role="img"
      >
        {/* ── Table / surface line ─────────────────────────────── */}
        <line
          x1="10" y1="138" x2="330" y2="138"
          stroke="#2d2d2d" strokeWidth="4.5" strokeLinecap="round"
        />

        {/* ── Head + body outline ──────────────────────────────── */}
        <path
          d="
            M 52,138
            C 28,136 16,118 20,96
            C 24,72 48,52 78,42
            L 100,10
            L 122,44
            C 142,54 158,58 170,58
            C 182,58 198,54 218,44
            L 240,10
            L 262,42
            C 292,52 316,72 320,96
            C 324,118 312,136 288,138
            Z
          "
          fill="white"
          stroke="#2d2d2d"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* ── Left inner ear (pink) ───────────────────────────── */}
        <path d="M 86,44 L 101,16 L 118,44 Z" fill="#ffb5c5" opacity="0.6" />

        {/* ── Right inner ear (pink) ──────────────────────────── */}
        <path d="M 222,44 L 239,16 L 254,44 Z" fill="#ffb5c5" opacity="0.6" />

        {/* ── Left paw ────────────────────────────────────────── */}
        <g transform="rotate(-15 58 152)">
          <ellipse cx="58" cy="152" rx="22" ry="26"
            fill="white" stroke="#2d2d2d" strokeWidth="4.5" />
          {/* Toe beans */}
          <circle cx="47" cy="144" r="4.5" fill="#ffb5c5" />
          <circle cx="58" cy="140" r="4.5" fill="#ffb5c5" />
          <circle cx="69" cy="144" r="4.5" fill="#ffb5c5" />
          {/* Big pad */}
          <circle cx="58" cy="156" r="7.5" fill="#ffb5c5" />
        </g>

        {/* ── Right paw ───────────────────────────────────────── */}
        <g transform="rotate(15 282 152)">
          <ellipse cx="282" cy="152" rx="22" ry="26"
            fill="white" stroke="#2d2d2d" strokeWidth="4.5" />
          {/* Toe beans */}
          <circle cx="271" cy="144" r="4.5" fill="#ffb5c5" />
          <circle cx="282" cy="140" r="4.5" fill="#ffb5c5" />
          <circle cx="293" cy="144" r="4.5" fill="#ffb5c5" />
          {/* Big pad */}
          <circle cx="282" cy="156" r="7.5" fill="#ffb5c5" />
        </g>

        {/* ── Blush (subtle, mood-driven) ──────────────────────── */}
        <motion.ellipse
          cx="120" cy="104" rx="14" ry="7"
          fill="#ffb5c5"
          animate={{ opacity: BLUSH[mood] }}
          transition={spring}
          style={{ opacity: BLUSH[mood] }}
        />
        <motion.ellipse
          cx="230" cy="104" rx="14" ry="7"
          fill="#ffb5c5"
          animate={{ opacity: BLUSH[mood] }}
          transition={spring}
          style={{ opacity: BLUSH[mood] }}
        />

        {/* ══════════════════════════════════════════════════════════
            EYES — Large circles with white highlights (reference style)
            ══════════════════════════════════════════════════════════ */}

        {/* Left eye */}
        <motion.ellipse
          cx="148" cy="92" rx="14"
          fill="#2d2d2d"
          animate={{ ry: EYE_RY[mood] }}
          transition={spring}
        />
        {/* Left eye highlight */}
        <motion.circle
          cx="141" cy="83" r="5"
          fill="white"
          animate={{ opacity: HL_OP[mood] }}
          transition={spring}
        />

        {/* Right eye */}
        <motion.ellipse
          cx="205" cy="92" rx="14"
          fill="#2d2d2d"
          animate={{ ry: EYE_RY[mood] }}
          transition={spring}
        />
        {/* Right eye highlight */}
        <motion.circle
          cx="198" cy="83" r="5"
          fill="white"
          animate={{ opacity: HL_OP[mood] }}
          transition={spring}
        />

        {/* ── Tear (very-sad) ──────────────────────────────────── */}
        <AnimatePresence>
          {isVerySad && (
            <motion.path
              key="tear"
              d="M 162,100 Q 159,110 162,118 Q 165,110 162,100"
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
          strokeWidth="3.5"
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
