/* ==============================================================================
   KALAIURA — CINEMATIC HERO EXPERIENCE (MOTIONSITES AI UPGRADE)
   Luxury editorial travel hero with ambient radial gold lighting,
   interactive 3D mouse parallax, spring entrance animations & video atmosphere
   ============================================================================== */

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { useLocation } from '../hooks/useLocation';

export function Hero({ onExploreClick }) {
  const { currentLocation, weather } = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Weather telemetry format for pill
  const weatherPillText = weather
    ? `${currentLocation.name.toUpperCase()}${currentLocation.country ? `, ${currentLocation.country.toUpperCase()}` : ''} · ${weather.temp}°C · ${weather.condition.toUpperCase()}`
    : `${currentLocation.name.toUpperCase()}, INDIA · 30°C · TROPICAL WARMTH`;

  // Interactive 3D mouse parallax effect (desktop fine-pointer only)
  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;

    const hero = heroRef.current;
    if (!hero) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x;
      mouseY = y;
    };

    const updateParallax = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      // Video subtle opposite parallax
      hero.style.setProperty('--hero-parallax-x', `${(currentX * -18).toFixed(1)}px`);
      hero.style.setProperty('--hero-parallax-y', `${(currentY * -18).toFixed(1)}px`);

      // Ambient radial glow parallax
      hero.style.setProperty('--hero-glow-x', `${(currentX * 45).toFixed(1)}px`);
      hero.style.setProperty('--hero-glow-y', `${(currentY * 45).toFixed(1)}px`);

      rafId = requestAnimationFrame(updateParallax);
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section"
      aria-label="Welcome to KALAIURA"
    >
      {/* Looping Cinematic Travel Video Background */}
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop"
          className="hero-video-element"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-drone-shot-of-a-winding-mountain-road-5421/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft Gold Radial Ambient Light Glow (Motionsites Inspiration) */}
        <div className="hero-ambient-glow" />

        {/* Vignette Multi-Stop Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(8, 9, 12, 0.1) 0%, rgba(8, 9, 12, 0.72) 75%, #08090C 100%)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8, 9, 12, 0.4) 0%, transparent 35%, rgba(8, 9, 12, 0.85) 75%, #08090C 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Hero Body Content */}
      <div
        className="container hero-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          alignItems: 'center',
          paddingTop: 'var(--space-3xl)'
        }}
      >
        {/* 1. Location / Weather Pill */}
        <div className="hero-weather-badge">
          <span className="pulse-radar-dot" />
          <span style={{ fontWeight: '500' }}>{weatherPillText}</span>
        </div>

        {/* 2. Large Editorial Headline */}
        <h1 className="hero-headline">
          GO WHERE <br />
          <span className="animate-gradient-shift" style={{ fontStyle: 'italic', fontWeight: '400' }}>
            YOUR CURIOSITY
          </span> <br />
          LEADS.
        </h1>

        {/* 3. Supporting Description */}
        <p className="hero-subtitle">
          Discover extraordinary places, understand the world around you, and let intelligence shape the journey.
        </p>

        {/* 4. Action Buttons */}
        <div className="hero-actions">
          <button
            onClick={onExploreClick}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '220px' }}
          >
            <span>Start Exploring</span>
            <Icon name="arrow-right" size={16} />
          </button>

          <Link
            to="/planner"
            className="btn btn-secondary btn-lg"
            style={{ minWidth: '220px' }}
          >
            <span>Plan a Journey</span>
            <Icon name="sparkles" size={15} style={{ color: 'var(--gold)' }} />
          </Link>
        </div>
      </div>

      {/* Bottom Controls: Video Toggle & Scroll Indicator */}
      <div
        className="container hero-bottom-controls"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 2,
          paddingTop: 'var(--space-md)'
        }}
      >
        {/* Ambient Video Pause / Play Toggle */}
        <button
          onClick={toggleVideoPlayback}
          className="btn-icon hero-video-toggle"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(13, 15, 19, 0.8)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-primary)'
          }}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={14} />
        </button>

        {/* Subtle Scroll Indicator */}
        <button
          onClick={onExploreClick}
          className="hero-scroll-btn"
          aria-label="Scroll to discover destinations"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: '4px'
          }}
        >
          <span>Scroll to Discover</span>
          <div
            className="hero-scroll-pill"
            style={{
              width: '20px',
              height: '32px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '9999px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px'
            }}
          >
            <span
              style={{
                width: '3px',
                height: '7px',
                backgroundColor: 'var(--gold)',
                borderRadius: '2px',
                boxShadow: '0 0 8px var(--gold)',
                animation: 'hero-scroll-wheel 1.9s infinite ease-in-out'
              }}
            />
          </div>
        </button>

        <div style={{ width: '42px' }} />
      </div>

      <style>{`
        @keyframes hero-scroll-wheel {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(11px); opacity: 0; }
          51% { transform: translateY(-3px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
