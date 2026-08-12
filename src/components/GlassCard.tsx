import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Reusable frosted glass card wrapper.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  style,
  id,
}) => {
  return (
    <div
      id={id}
      className={`glass-card ${className}`}
      style={{
        padding: '2rem 2.25rem',
        width: '100%',
        maxWidth: 520,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
