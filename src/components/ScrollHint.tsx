import { motion } from 'framer-motion';

interface ScrollHintProps {
  onClick?: () => void;
}

/**
 * Bouncing chevron that hints "there's more below".
 * Fades in after 1.2 s so it doesn't compete with the main content.
 */
export const ScrollHint: React.FC<ScrollHintProps> = ({ onClick }) => (
  <motion.div
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.55 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: onClick ? 'pointer' : 'default',
      marginTop: '1.5rem',
      padding: '0.5rem',
    }}
    aria-label="Scroll down"
  >
    <motion.svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M2 2L14 13L26 2"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  </motion.div>
);

export default ScrollHint;
