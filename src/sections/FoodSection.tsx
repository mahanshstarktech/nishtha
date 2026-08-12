import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodOptionCard } from '../components/FoodOptionCard';
import { FOOD_OPTIONS } from '../lib/stateTypes';

interface FoodSectionProps {
  foodChoice: string | null;
  onSelect: (id: string, label: string) => void;
}

export const FoodSection: React.FC<FoodSectionProps> = ({ foodChoice, onSelect }) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customText, setCustomText] = useState('');

  const selectedLabel =
    foodChoice === 'custom'
      ? customText
      : FOOD_OPTIONS.find(f => f.id === foodChoice)?.label ?? null;

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      onSelect('custom', customText.trim());
    }
  };

  return (
    <section
      id="section-food"
      className="section-full"
      style={{ zIndex: 1, padding: '2rem 1rem 3rem' }}
    >
      <div style={{ width: '100%', maxWidth: 560, textAlign: 'center' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍱</div>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 5vw, 1.65rem)',
            fontWeight: 800,
            color: '#2d1a4a',
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
            marginBottom: '0.4rem',
          }}>
            What should I pack for us?
          </h2>
          <p style={{
            fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
            color: '#6b5b8a',
            lineHeight: 1.5,
          }}>
            Pick one, or tell me what you'd like 🎒
          </p>
        </motion.div>

        {/* Food options grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.8rem',
          marginBottom: '0.8rem',
        }}>
          {FOOD_OPTIONS.map((option, i) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <FoodOptionCard
                id={`food-${option.id}`}
                emoji={option.emoji}
                label={option.label}
                selected={foodChoice === option.id}
                onSelect={() => {
                  setShowCustom(false);
                  onSelect(option.id, option.label);
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* "Something else" option */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.45 }}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowCustom(prev => !prev)}
          style={{
            width: '100%',
            background: showCustom
              ? 'rgba(168,85,247,0.12)'
              : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            border: showCustom
              ? '2px solid rgba(168,85,247,0.45)'
              : '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: 20,
            padding: '0.9rem 1.2rem',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)',
            fontWeight: 600,
            color: showCustom ? '#7c3aed' : '#5a4a7a',
            fontFamily: 'Inter, -apple-system, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 14px rgba(120,80,200,0.10)',
            transition: 'border-color 0.2s, background 0.2s',
            marginBottom: '0.8rem',
          }}
        >
          <span>✨</span>
          <span>Something else...</span>
        </motion.button>

        {/* Custom text input */}
        <AnimatePresence>
          {showCustom && !foodChoice && (
            <motion.div
              key="custom-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden', marginBottom: '1rem' }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.45)',
                borderRadius: 18,
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
              }}>
                <input
                  type="text"
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleCustomSubmit(); }}
                  placeholder="Type what you'd like..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 14,
                    border: '1.5px solid rgba(168,85,247,0.25)',
                    background: 'rgba(255,255,255,0.7)',
                    fontSize: '0.95rem',
                    fontFamily: 'Inter, -apple-system, sans-serif',
                    color: '#2d1a4a',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(120,80,200,0.08)',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCustomSubmit}
                  disabled={!customText.trim()}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: 14,
                    border: 'none',
                    background: customText.trim()
                      ? 'linear-gradient(135deg, #a855f7, #7c3aed)'
                      : 'rgba(168,85,247,0.2)',
                    color: customText.trim() ? 'white' : '#9080b0',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    fontFamily: 'Inter, -apple-system, sans-serif',
                    cursor: customText.trim() ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  Done 🐾
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation message */}
        <AnimatePresence>
          {selectedLabel && foodChoice && (
            <motion.div
              key="food-confirm"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(168,85,247,0.25)',
                borderRadius: 20,
                padding: '1rem 1.4rem',
                boxShadow: '0 4px 18px rgba(168,85,247,0.12)',
              }}
            >
              <p style={{
                fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
                fontWeight: 600,
                color: '#4a2d7a',
                lineHeight: 1.5,
              }}>
                Noted — <strong>{selectedLabel}</strong> it is 🐾
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FoodSection;
