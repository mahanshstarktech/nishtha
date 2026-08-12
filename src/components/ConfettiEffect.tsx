import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  active: boolean;
}

/**
 * Fires a burst of paw-print shaped confetti particles
 * whenever `active` flips to true.
 */
export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active }) => {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!active || firedRef.current) return;
    firedRef.current = true;

    // Draw a simple paw-print shape on a tiny canvas
    const pawShape = confetti.shapeFromPath({
      path: 'M 25 50 Q 25 20 50 20 Q 75 20 75 50 Q 75 70 50 75 Q 25 70 25 50 Z M 15 15 Q 15 5 25 5 Q 35 5 35 15 Q 35 25 25 25 Q 15 25 15 15 Z M 40 8 Q 40 0 50 0 Q 60 0 60 8 Q 60 16 50 16 Q 40 16 40 8 Z M 65 15 Q 65 5 75 5 Q 85 5 85 15 Q 85 25 75 25 Q 65 25 65 15 Z',
    });

    const heart = confetti.shapeFromText({ text: '🐾', scalar: 2 });
    const catFace = confetti.shapeFromText({ text: '🐱', scalar: 2 });

    const colors = ['#ff6eb4', '#a855f7', '#3b82f6', '#FFD6C4', '#E8D5F5', '#FFB3C6'];

    // Initial big burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes: [pawShape, heart, catFace],
      scalar: 1.4,
      gravity: 0.9,
      drift: 0.2,
      ticks: 220,
    });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.15, y: 0.55 },
        colors,
        shapes: [heart, pawShape],
        scalar: 1.2,
        angle: 60,
        gravity: 0.8,
      });
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.85, y: 0.55 },
        colors,
        shapes: [catFace, pawShape],
        scalar: 1.2,
        angle: 120,
        gravity: 0.8,
      });
    }, 250);

    // Trailing sparkle
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 140,
        origin: { x: 0.5, y: 0.3 },
        colors,
        shapes: [pawShape],
        scalar: 1,
        gravity: 0.6,
        ticks: 280,
      });
    }, 600);
  }, [active]);

  return null; // No DOM — confetti uses its own canvas
};

export default ConfettiEffect;
