/* ==============================================================================
   KALAIURA — USE HOME MOTION HOOK
   Encapsulates scroll reveals, mouse spotlights, 3D card tilt & cursor interactions
   Exclusively active on the Home page route.
   ============================================================================== */

import { useEffect, useRef } from 'react';

export function useHomeMotion() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window);

    if (isFinePointer) {
      container.classList.add('has-pointer');
    }

    /* ---------------------------------------------------------------------------
       1. SCROLL REVEAL OBSERVER
       --------------------------------------------------------------------------- */
    const revealElements = container.querySelectorAll('[data-home-reveal]');

    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    } else if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.08
        }
      );

      revealElements.forEach((el) => observer.observe(el));

      // Backup: Reveal first elements after 200ms in case they are above the fold
      const initialTimer = setTimeout(() => {
        revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            el.classList.add('is-revealed');
          }
        });
      }, 250);

      // Store cleanup
      var cleanObserver = () => {
        clearTimeout(initialTimer);
        observer.disconnect();
      };
    } else {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    }

    /* ---------------------------------------------------------------------------
       2. AMBIENT MOUSE SPOTLIGHT & CARD 3D TILT (DESKTOP FINE-POINTER ONLY)
       --------------------------------------------------------------------------- */
    if (!isFinePointer || prefersReducedMotion) {
      return () => {
        if (cleanObserver) cleanObserver();
      };
    }

    let rafId = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth lerp loop for the global ambient spotlight
    const tick = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      container.style.setProperty('--spotlight-x', `${currentX}px`);
      container.style.setProperty('--spotlight-y', `${currentY}px`);

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    /* ---------------------------------------------------------------------------
       3. INTERACTIVE 3D TILT & SPECULAR REFLECTION ON CARDS
       --------------------------------------------------------------------------- */
    const cards = container.querySelectorAll('.prompt-card-hover, .bento-card');
    const cardCleanups = [];

    cards.forEach((card) => {
      const handleCardMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Specular coordinates
        card.style.setProperty('--card-mouse-x', `${x}px`);
        card.style.setProperty('--card-mouse-y', `${y}px`);

        // Subtle 3D tilt calculation (-4 to +4 degrees)
        const tiltX = ((y / rect.height) - 0.5) * -6;
        const tiltY = ((x / rect.width) - 0.5) * 6;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-6px) scale3d(1.01, 1.01, 1.01)`;
      };

      const handleCardLeave = () => {
        card.style.transform = '';
      };

      card.addEventListener('mousemove', handleCardMove, { passive: true });
      card.addEventListener('mouseleave', handleCardLeave, { passive: true });

      cardCleanups.push(() => {
        card.removeEventListener('mousemove', handleCardMove);
        card.removeEventListener('mouseleave', handleCardLeave);
      });
    });

    return () => {
      if (cleanObserver) cleanObserver();
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      cardCleanups.forEach((c) => c());
    };
  }, []);

  return containerRef;
}
