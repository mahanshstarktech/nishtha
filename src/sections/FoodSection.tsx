import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodOptionCard } from '../components/FoodOptionCard';
import { FOOD_OPTIONS } from '../lib/stateTypes';

interface FoodSectionProps {
  foodChoice: string | null;
  onSelect: (id: string, label: string) => void;
}

export const FoodSection: React.FC<FoodSectionProps> = ({ foodChoice, onSelect }) => {
  const selectedOption = FOOD_OPTIONS.find(f => f.id === foodChoice);

  return (
    <section
      id="section-food"
      className="section-full"
      style={{ zIndex: 1, paddingTop: '2.5rem', paddingBottom: '3rem' }}
    >
      <div style={{ width: '100%', maxWidth: 520, textAlign: 'center' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '1.8rem' }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>🍱</div>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 5vw, 1.75rem)',
            fontWeight: 800,
            color: '#2d1a4a',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            marginBottom: '0.5rem',
          }}>
            One more thing...
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b5b8a',
            lineHeight: 1.6,
          }}>
            What should I pack/make for our trek? 🎒
          </p>
        </motion.div>

        {/* Food options grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.9rem',
          marginBottom: '1.5rem',
        }}>
          {FOOD_OPTIONS.map((option, i) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <FoodOptionCard
                id={`food-${option.id}`}
                emoji={option.emoji}
                label={option.label}
                selected={foodChoice === option.id}
                onSelect={() => onSelect(option.id, option.label)}
              />
            </motion.div>
          ))}
        </div>

        {/* Confirmation message */}
        <AnimatePresence>
          {selectedOption && (
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
                fontSize: '1rem',
                fontWeight: 600,
                color: '#4a2d7a',
                lineHeight: 1.5,
              }}>
                Noted — {selectedOption.emoji} <strong>{selectedOption.label}</strong> it is.
                <br />
                <span style={{ fontWeight: 400, color: '#6b5b8a' }}>
                  See you at Galta Ji 🐾🌄
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FoodSection;
