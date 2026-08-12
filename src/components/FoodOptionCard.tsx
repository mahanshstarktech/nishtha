import React from 'react';
import { motion } from 'framer-motion';

interface FoodOptionCardProps {
  emoji: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  id?: string;
}

export const FoodOptionCard: React.FC<FoodOptionCardProps> = ({
  emoji,
  label,
  selected,
  onSelect,
  id,
}) => {
  return (
    <motion.button
      id={id}
      onClick={onSelect}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      animate={selected ? { scale: 1.06 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: selected
          ? 'rgba(168,85,247,0.15)'
          : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        border: selected
          ? '2px solid rgba(168,85,247,0.55)'
          : '1.5px solid rgba(255,255,255,0.4)',
        borderRadius: 24,
        padding: '1.4rem 1.2rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        boxShadow: selected
          ? '0 8px 28px rgba(168,85,247,0.22)'
          : '0 4px 16px rgba(120,80,200,0.10)',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        minHeight: 110,
        width: '100%',
      }}
      aria-pressed={selected}
      aria-label={label}
    >
      <span style={{ fontSize: '2.4rem', lineHeight: 1 }}>{emoji}</span>
      <span style={{
        fontSize: '0.9rem',
        fontWeight: 600,
        color: selected ? '#7c3aed' : '#4a3a6a',
        textAlign: 'center',
        lineHeight: 1.3,
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}>
        {label}
      </span>
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ fontSize: '1rem' }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
};

export default FoodOptionCard;
