/* ==============================================================================
   KALAIURA — USE HOME MOTION HOOK (OPTIMIZED FOR 60FPS SCROLLING)
   Lightweight, GPU-friendly IntersectionObserver reveals and non-blocking interactions
   ============================================================================== */

import { useEffect, useRef } from 'react';

export function useHomeMotion() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window);

    if (isFinePointer) {
      container.classList.add('has-pointer');
    }

    /* ---------------------------------------------------------------------------
       1. FAST, LIGHTWEIGHT SCROLL REVEAL (INTERSECTION OBSERVER)
       --------------------------------------------------------------------------- */
    const revealElements = container.querySelectorAll('[data-home-reveal]');

    if (prefersReducedMotion || !window.IntersectionObserver) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target); // Instant release to free memory
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -30px 0px',
          threshold: 0.05
        }
      );

      revealElements.forEach((el) => observer.observe(el));

      // Fast check: reveal elements already in view immediately
      const initialTimer = setTimeout(() => {
        revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            el.classList.add('is-revealed');
            observer.unobserve(el);
          }
        });
      }, 100);

      var cleanObserver = () => {
        clearTimeout(initialTimer);
        observer.disconnect();
      };
    }

    /* ---------------------------------------------------------------------------
       2. LIGHTWEIGHT MOUSE SPOTLIGHT (DESKTOP FINE-POINTER ONLY, NO INFINITE RAF)
       --------------------------------------------------------------------------- */
    if (!isFinePointer || prefersReducedMotion) {
      return () => {
        if (cleanObserver) cleanObserver();
      };
    }

    let isUpdating = false;

    const onMouseMove = (e) => {
      if (isUpdating) return;
      isUpdating = true;

      requestAnimationFrame(() => {
        container.style.setProperty('--spotlight-x', `${e.clientX}px`);
        container.style.setProperty('--spotlight-y', `${e.clientY}px`);
        isUpdating = false;
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      if (cleanObserver) cleanObserver();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return containerRef;
}
