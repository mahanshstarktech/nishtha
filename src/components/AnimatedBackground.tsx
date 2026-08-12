import React from 'react';

/**
 * Animated background — five slow-drifting blurred gradient blobs
 * that create the Apple-glass pastel mesh effect.
 */
export const AnimatedBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fff5f0 0%, #f5eeff 40%, #eef5ff 100%)',
        pointerEvents: 'none',
      }}
    >
      {/* Blob 1 — Peach */}
      <div
        className="blob"
        style={{
          width: '55vw',
          height: '55vw',
          maxWidth: 600,
          maxHeight: 600,
          background: 'radial-gradient(circle, #FFD6C4 0%, #FFB3C6 60%, transparent 100%)',
          top: '-10%',
          left: '-10%',
          '--duration': '22s',
          '--tx1': '60px',  '--ty1': '40px',
          '--tx2': '-40px', '--ty2': '80px',
          '--tx3': '30px',  '--ty3': '-20px',
        } as React.CSSProperties}
      />
      {/* Blob 2 — Lavender */}
      <div
        className="blob"
        style={{
          width: '60vw',
          height: '60vw',
          maxWidth: 650,
          maxHeight: 650,
          background: 'radial-gradient(circle, #E8D5F5 0%, #d4b8f0 55%, transparent 100%)',
          top: '30%',
          right: '-15%',
          '--duration': '28s',
          '--tx1': '-80px', '--ty1': '60px',
          '--tx2': '50px',  '--ty2': '-40px',
          '--tx3': '-30px', '--ty3': '70px',
        } as React.CSSProperties}
      />
      {/* Blob 3 — Sky Blue */}
      <div
        className="blob"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: 550,
          maxHeight: 550,
          background: 'radial-gradient(circle, #C4E5FF 0%, #a8d4f5 55%, transparent 100%)',
          bottom: '-10%',
          left: '20%',
          '--duration': '25s',
          '--tx1': '30px',  '--ty1': '-60px',
          '--tx2': '-60px', '--ty2': '30px',
          '--tx3': '50px',  '--ty3': '-30px',
        } as React.CSSProperties}
      />
      {/* Blob 4 — Rose accent */}
      <div
        className="blob"
        style={{
          width: '35vw',
          height: '35vw',
          maxWidth: 380,
          maxHeight: 380,
          background: 'radial-gradient(circle, #FFB3C6 0%, #ff93af 50%, transparent 100%)',
          bottom: '20%',
          right: '5%',
          opacity: 0.45,
          '--duration': '32s',
          '--tx1': '-50px', '--ty1': '-40px',
          '--tx2': '60px',  '--ty2': '50px',
          '--tx3': '-20px', '--ty3': '-60px',
        } as React.CSSProperties}
      />
      {/* Blob 5 — Mint (subtle) */}
      <div
        className="blob"
        style={{
          width: '30vw',
          height: '30vw',
          maxWidth: 320,
          maxHeight: 320,
          background: 'radial-gradient(circle, #C4F0E8 0%, transparent 100%)',
          top: '60%',
          left: '5%',
          opacity: 0.4,
          '--duration': '18s',
          '--tx1': '40px',  '--ty1': '30px',
          '--tx2': '-30px', '--ty2': '-50px',
          '--tx3': '20px',  '--ty3': '40px',
        } as React.CSSProperties}
      />
    </div>
  );
};

export default AnimatedBackground;
