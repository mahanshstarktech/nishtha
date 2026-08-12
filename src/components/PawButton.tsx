import React from 'react';
import { motion } from 'framer-motion';

interface PawButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'yes' | 'no' | 'neutral';
  /** Visual scale — the clickable area stays 44×44 regardless */
  scale?: number;
  id?: string;
  disabled?: boolean;
}

const VARIANT_STYLES = {
  yes: {
    body: '#a855f7',
    bodyLight: '#c084fc',
    text: '#ffffff',
    shadow: '0 6px 24px rgba(168,85,247,0.40)',
    hoverShadow: '0 10px 36px rgba(168,85,247,0.55)',
  },
  no: {
    body: 'rgba(255,255,255,0.55)',
    bodyLight: 'rgba(255,255,255,0.75)',
    text: '#6b5b8a',
    shadow: '0 4px 14px rgba(120,80,200,0.14)',
    hoverShadow: '0 6px 20px rgba(120,80,200,0.22)',
  },
  neutral: {
    body: 'rgba(255,255,255,0.6)',
    bodyLight: 'rgba(255,255,255,0.8)',
    text: '#5a4a7a',
    shadow: '0 4px 14px rgba(120,80,200,0.12)',
    hoverShadow: '0 6px 20px rgba(120,80,200,0.20)',
  },
};

/**
 * Paw-shaped SVG button.
 * The invisible hit-target wrapper ensures ≥44×44px tap area
 * even when the visual scale shrinks (for the No button escalation).
 */
export const PawButton: React.FC<PawButtonProps & { width?: number }> = ({
  label,
  onClick,
  variant = 'neutral',
  scale = 1,
  id,
  disabled = false,
  width = 160,
}) => {
  const v = VARIANT_STYLES[variant];

  // Dynamic layout calculations based on requested width
  const padWidth = width - 28;
  const t1x = 14 + padWidth * 0.16;
  const t2x = 14 + padWidth * 0.38;
  const t3x = 14 + padWidth * 0.62;
  const t4x = 14 + padWidth * 0.84;
  const cx = width / 2;

  return (
    /* Outer wrapper — keeps the real tap area large */
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        minWidth: 44,
        minHeight: 44,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={disabled ? undefined : onClick}
      role="button"
      aria-label={label}
      id={id}
      tabIndex={0}
      onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick(); }}
    >
      {/* Visual scaled element */}
      <motion.div
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        whileHover={{ scale: scale * 1.08 }}
        whileTap={{ scale: scale * 0.93 }}
        style={{ display: 'inline-block', transformOrigin: 'center' }}
      >
        {/* Paw SVG shape as button background */}
        <svg
          viewBox={`0 0 ${width} 80`}
          width={scale > 1 ? Math.round(width * Math.min(scale, 1.6)) : width}
          height={scale > 1 ? Math.round(80 * Math.min(scale, 1.6)) : 80}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', filter: `drop-shadow(${v.shadow})` }}
        >
          <defs>
            <linearGradient id={`paw-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={v.bodyLight} />
              <stop offset="100%" stopColor={v.body} />
            </linearGradient>
            <filter id={`paw-blur-${variant}`}>
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>

          {/* Main pad */}
          <rect
            x="14" y="18" width={padWidth} height="54"
            rx="27" ry="27"
            fill={`url(#paw-grad-${variant})`}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
          />

          {/* Toe 1 */}
          <ellipse cx={t1x} cy="18" rx="13" ry="11"
            fill={`url(#paw-grad-${variant})`}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Toe 2 */}
          <ellipse cx={t2x} cy="11" rx="13" ry="11"
            fill={`url(#paw-grad-${variant})`}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Toe 3 */}
          <ellipse cx={t3x} cy="11" rx="13" ry="11"
            fill={`url(#paw-grad-${variant})`}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Toe 4 */}
          <ellipse cx={t4x} cy="18" rx="13" ry="11"
            fill={`url(#paw-grad-${variant})`}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />

          {/* Button label text */}
          <text
            x={cx} y="51"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={v.text}
            fontSize={width > 160 ? "17" : "18"}
            fontFamily="Inter, -apple-system, sans-serif"
            fontWeight="600"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {label}
          </text>

          {/* Inner highlight stroke for glass feel */}
          <rect
            x="15" y="19" width={padWidth - 2} height="52"
            rx="26" ry="26"
            fill="none"
            stroke="rgba(255,255,255,0.30)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default PawButton;
