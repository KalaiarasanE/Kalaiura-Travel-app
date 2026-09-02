/* ==============================================================================
   AERORA — CINEMATIC HERO EXPERIENCE
   Looping atmospheric background video, editorial typography, and telemetry
   ============================================================================== */

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { useLocation } from '../hooks/useLocation';

export function Hero({ onExploreClick }) {
  const { currentLocation, weather } = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

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

  const weatherString = weather
    ? `${currentLocation.name}${currentLocation.country ? `, ${currentLocation.country}` : ''} · ${weather.temp}°C · ${weather.condition}`
    : `${currentLocation.name} · 24°C · Partly Cloudy`;

  return (
    <section
      className="hero-section"
      aria-label="Welcome to AERORA"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        paddingTop: 'var(--nav-height)',
        paddingBottom: 'var(--space-2xl)'
      }}
    >
      {/* Looping Cinematic Travel Video Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -2,
          overflow: 'hidden',
          backgroundColor: '#090a0e'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
            transform: 'scale(1.04)',
            transition: 'transform 8s ease-out',
            filter: 'brightness(0.75) contrast(1.1) saturate(0.9)'
          }}
        >
          {/* High-quality scenic alpine & ocean mist video streams */}
          <source
            src="https://cdn.coverr.co/videos/coverr-drone-shot-of-a-winding-mountain-road-5421/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Sophisticated Editorial Vignette Gradient Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(9, 10, 14, 0.2) 0%, rgba(9, 10, 14, 0.85) 85%)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(9, 10, 14, 0.4) 0%, transparent 40%, rgba(9, 10, 14, 0.95) 100%)',
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
          maxWidth: '920px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          alignItems: 'center',
          paddingTop: 'var(--space-2xl)'
        }}
      >
        {/* Dynamic Location / Weather Indicator in Hero */}
        <div
          className="hero-weather-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.15rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(19, 22, 30, 0.65)',
            border: '1px solid var(--color-border)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            marginBottom: 'var(--space-lg)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
            animation: 'hero-fade-down 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--color-accent)'
            }}
          />
          <span>{weatherString}</span>
        </div>

        {/* Hero Primary Headline */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: '300',
            lineHeight: '1.02',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-md)',
            animation: 'hero-slide-up 1.1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          Go where <br />
          <span style={{ fontStyle: 'italic', fontWeight: '400', color: 'var(--color-accent-light)' }}>
            your curiosity
          </span> <br />
          leads.
        </h1>

        {/* Hero Supporting Copy */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: '#cfd2db',
            maxWidth: '640px',
            lineHeight: 'var(--lh-relaxed)',
            marginBottom: 'var(--space-xl)',
            fontWeight: '300',
            animation: 'hero-slide-up 1.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          Discover extraordinary places, understand the world around you, and let intelligence shape the journey.
        </p>

        {/* Hero Action Buttons */}
        <div
          className="hero-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            animation: 'hero-slide-up 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <button
            onClick={onExploreClick}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '200px' }}
          >
            <span>Start Exploring</span>
            <Icon name="arrow-right" size={16} />
          </button>

          <Link
            to="/planner"
            className="btn btn-secondary btn-lg"
            style={{ minWidth: '200px' }}
          >
            <span>Plan a Journey</span>
            <Icon name="sparkles" size={15} style={{ color: 'var(--color-accent)' }} />
          </Link>
        </div>
      </div>

      {/* Bottom Controls: Video Toggle & Scroll Indicator */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
          paddingTop: 'var(--space-md)'
        }}
      >
        {/* Subtle Video Pause / Play Toggle */}
        <button
          onClick={toggleVideoPlayback}
          className="btn-icon"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: 'rgba(19, 22, 30, 0.65)',
            border: '1px solid var(--color-border)'
          }}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={14} />
        </button>

        {/* Subtle Scroll Indicator */}
        <button
          onClick={onExploreClick}
          aria-label="Scroll to discover destinations"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--color-text-secondary)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)'
          }}
        >
          <span>Scroll to Discover</span>
          <div
            style={{
              width: '18px',
              height: '28px',
              border: '1px solid rgba(245, 242, 235, 0.3)',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '5px'
            }}
          >
            <span
              style={{
                width: '3px',
                height: '6px',
                backgroundColor: 'var(--color-accent)',
                borderRadius: '1px',
                animation: 'scroll-wheel 1.8s infinite'
              }}
            />
          </div>
        </button>

        {/* Aesthetic Coordinate Monogram */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
            display: 'none'
          }}
        >
          AERORA · 2026
        </span>
      </div>

      <style>{`
        @keyframes hero-slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-down {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-wheel {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
