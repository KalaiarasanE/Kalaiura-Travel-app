/* ==============================================================================
   KALAIURA — HOME CURSOR COMPONENT
   Refined luxury cursor aura & precision dot active only on Home page desktop
   ============================================================================== */

import React, { useEffect, useState, useRef } from 'react';

export function HomeCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isFine = window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFine || prefersReduced) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = null;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!visible) setVisible(true);

      // Fast direct dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = Boolean(
        target.closest('button, a, input, select, .btn, .prompt-card-hover, .bento-card, .capsule-filter-pill, .btn-icon')
      );
      setIsHovering(isInteractive);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    // Smooth dampening loop for the ring follower
    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        className="home-cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`home-cursor-ring ${isHovering ? 'is-hovering' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />
    </>
  );
}
