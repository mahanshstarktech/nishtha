import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth scroll and ties it to GSAP's ticker
 * so ScrollTrigger and Lenis stay in sync perfectly.
 * Returns the Lenis instance for external control (e.g. scrollTo).
 */
export function useSmootScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Tie Lenis raf to GSAP's ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Let ScrollTrigger know about the Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return lenisRef;
}

/**
 * Smoothly scrolls to a section element.
 */
export function scrollToSection(id: string, lenis?: Lenis | null) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
