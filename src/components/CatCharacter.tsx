import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CatMood } from '../lib/stateTypes';

interface CatCharacterProps {
  mood: CatMood;
  size?: number;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Bongo Cat — precisely traced from reference.png

   Key proportions (reference):
     • Head is a WIDE, LOW blob — much wider than tall
     • Ears are SHORT stubby triangles (≈25% of total height)
     • Dome between ears is nearly FLAT
     • Body sides bulge outward BEYOND the ear bases
     • Eyes are large circles with white highlights
     • Signature ω mouth
     • Round paws with pink toe beans

   ViewBox: 0 0 360 180
   Table line at y=140
   ═══════════════════════════════════════════════════════════════════════════════ */

// ── Mouth paths ───────────────────────────────────────────────────────────────
const MOUTH: Record<CatMood, string> = {
  happy:         'M 160,107 Q 168,122 177,112 Q 180,108 183,112 Q 192,122 200,107',
  content:       'M 162,108 Q 169,119 177,112 Q 180,109 183,112 Q 191,119 198,108',
  'small-smile': 'M 164,109 Q 170,116 177,112 Q 180,110 183,112 Q 190,116 196,109',
  neutral:       'M 166,110 Q 180,112 194,110',
  sad:           'M 162,115 Q 180,104 198,115',
  'very-sad':    'M 160,118 Q 180,100 200,118',
  dance:         'M 158,106 Q 166,124 176,112 Q 180,107 184,112 Q 194,124 202,106',
};

// ── Eye ry (rx fixed at 14) ───────────────────────────────────────────────────
const EYE_RY: Record<CatMood, number> = {
  happy: 3,  content: 12,  'small-smile': 11,  neutral: 14,
  sad: 14,   'very-sad': 15.5,  dance: 2.5,
};

// ── Eye highlight opacity (hidden when squinting) ─────────────────────────────
const HL_OP: Record<CatMood, number> = {
  happy: 0,  content: 0.95,  'small-smile': 0.9,  neutral: 0.95,
  sad: 0.9,  'very-sad': 0.95,  dance: 0,
};

// ── Blush opacity ─────────────────────────────────────────────────────────────
const BLUSH: Record<CatMood, number> = {
  happy: 0.45,  content: 0.35,  'small-smile': 0.3,  neutral: 0,
  sad: 0.2,     'very-sad': 0.25,  dance: 0.5,
};

const spring = { type: 'spring' as const, stiffness: 220, damping: 20 };

export const CatCharacter: React.FC<CatCharacterProps> = ({ mood, size = 220 }) => {
  const isDancing = mood === 'dance';
  const isVerySad = mood === 'very-sad';
  const isSad     = mood === 'sad' || isVerySad;
  const height    = size * (180 / 360);

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
        viewBox="0 0 360 180"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Bongo cat feeling ${mood}`}
        role="img"
      >
        {/* ── Table / surface line ─────────────────────────────── */}
        <line
          x1="5" y1="140" x2="355" y2="140"
          stroke="#2d2d2d" strokeWidth="4.5" strokeLinecap="round"
        />

        {/* ══════════════════════════════════════════════════════════
            HEAD — wide low blob, short ears, flat dome, bulging sides
            ══════════════════════════════════════════════════════════ */}
        <path
          d="
            M 48,140
            C 20,138 10,118 14,96
            C 18,72  44,54  76,45
            L 94,14
            L 116,47
            Q 148,38 180,38
            Q 212,38 244,47
            L 266,14
            L 284,45
            C 316,54 342,72 346,96
            C 350,118 340,138 312,140
            Z
          "
          fill="white"
          stroke="#2d2d2d"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* ── Left inner ear (pink) ───────────────────────────── */}
        <path d="M 84,46 L 95,22 L 110,46 Z" fill="#ffb5c5" opacity="0.6" />

        {/* ── Right inner ear (pink) ──────────────────────────── */}
        <path d="M 250,46 L 265,22 L 276,46 Z" fill="#ffb5c5" opacity="0.6" />

        {/* ── Left paw ────────────────────────────────────────── */}
        <g transform="rotate(-12 52 150)">
          <ellipse cx="52" cy="150" rx="20" ry="24"
            fill="white" stroke="#2d2d2d" strokeWidth="4.5" />
          <circle cx="43" cy="143" r="4"   fill="#ffb5c5" />
          <circle cx="52" cy="139" r="4"   fill="#ffb5c5" />
          <circle cx="61" cy="143" r="4"   fill="#ffb5c5" />
          <circle cx="52" cy="154" r="6.5" fill="#ffb5c5" />
        </g>

        {/* ── Right paw ───────────────────────────────────────── */}
        <g transform="rotate(12 308 150)">
          <ellipse cx="308" cy="150" rx="20" ry="24"
            fill="white" stroke="#2d2d2d" strokeWidth="4.5" />
          <circle cx="299" cy="143" r="4"   fill="#ffb5c5" />
          <circle cx="308" cy="139" r="4"   fill="#ffb5c5" />
          <circle cx="317" cy="143" r="4"   fill="#ffb5c5" />
          <circle cx="308" cy="154" r="6.5" fill="#ffb5c5" />
        </g>

        {/* ── Blush marks ──────────────────────────────────────── */}
        <motion.ellipse
          cx="122" cy="104" rx="14" ry="7"
          fill="#ffb5c5"
          animate={{ opacity: BLUSH[mood] }}
          transition={spring}
        />
        <motion.ellipse
          cx="243" cy="104" rx="14" ry="7"
          fill="#ffb5c5"
          animate={{ opacity: BLUSH[mood] }}
          transition={spring}
        />

        {/* ══════════════════════════════════════════════════════════
            EYES — Large circles (r=14) with white highlight dots
            ══════════════════════════════════════════════════════════ */}

        {/* Left eye */}
        <motion.ellipse
          cx="150" cy="90" rx="14"
          fill="#2d2d2d"
          animate={{ ry: EYE_RY[mood] }}
          transition={spring}
        />
        {/* Left highlight */}
        <motion.circle
          cx="143" cy="82" r="5"
          fill="white"
          animate={{ opacity: HL_OP[mood] }}
          transition={spring}
        />

        {/* Right eye */}
        <motion.ellipse
          cx="215" cy="90" rx="14"
          fill="#2d2d2d"
          animate={{ ry: EYE_RY[mood] }}
          transition={spring}
        />
        {/* Right highlight */}
        <motion.circle
          cx="208" cy="82" r="5"
          fill="white"
          animate={{ opacity: HL_OP[mood] }}
          transition={spring}
        />

        {/* ── Tear (very-sad) ──────────────────────────────────── */}
        <AnimatePresence>
          {isVerySad && (
            <motion.path
              key="tear"
              d="M 164,98 Q 161,108 164,116 Q 167,108 164,98"
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
