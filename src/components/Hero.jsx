/* ==============================================================================
   AERORA — CINEMATIC HERO EXPERIENCE
   Luxury editorial travel hero with ambient radial gold lighting & video atmosphere
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

  // Weather telemetry format for pill
  const weatherPillText = weather
    ? `${currentLocation.name.toUpperCase()}${currentLocation.country ? `, ${currentLocation.country.toUpperCase()}` : ''} · ${weather.temp}°C · ${weather.condition.toUpperCase()}`
    : `${currentLocation.name.toUpperCase()}, INDIA · 27°C · TROPICAL WARMTH`;

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
        paddingBottom: 'var(--space-2xl)',
        backgroundColor: 'var(--background)'
      }}
    >
      {/* Looping Cinematic Travel Video Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -2,
          overflow: 'hidden',
          backgroundColor: '#08090C'
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
            opacity: 0.42,
            transform: 'scale(1.03)',
            filter: 'brightness(0.68) contrast(1.15) saturate(0.92)'
          }}
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-drone-shot-of-a-winding-mountain-road-5421/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft Gold Radial Ambient Light Glow (Motionsites Inspiration) */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            width: '800px',
            height: '550px',
            background: 'radial-gradient(ellipse at center, rgba(224, 162, 77, 0.16) 0%, rgba(224, 162, 77, 0.04) 45%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(30px)'
          }}
        />

        {/* Vignette Multi-Stop Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(8, 9, 12, 0.15) 0%, rgba(8, 9, 12, 0.75) 75%, #08090C 100%)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8, 9, 12, 0.5) 0%, transparent 35%, rgba(8, 9, 12, 0.8) 70%, #08090C 100%)',
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
          zIndex: 1,
          textAlign: 'center',
          alignItems: 'center',
          paddingTop: 'var(--space-3xl)'
        }}
      >
        {/* 1. Location / Weather Pill */}
        <div
          className="hero-weather-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.5rem 1.35rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(13, 15, 19, 0.8)',
            border: '1px solid rgba(224, 162, 77, 0.32)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            marginBottom: 'var(--space-xl)',
            fontSize: '0.76rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(224, 162, 77, 0.1)',
            animation: 'hero-fade-down 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span
            className="pulse-radar-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--gold)',
              display: 'inline-block'
            }}
          />
          <span style={{ fontWeight: '500' }}>{weatherPillText}</span>
        </div>

        {/* 2. Large Editorial Headline */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: '300',
            lineHeight: '1.02',
            letterSpacing: '0.015em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-lg)',
            animation: 'hero-slide-up 1.05s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          GO WHERE <br />
          <span
            className="animate-gradient-shift"
            style={{
              fontStyle: 'italic',
              fontWeight: '400',
              textShadow: '0 0 35px rgba(224, 162, 77, 0.3)'
            }}
          >
            YOUR CURIOSITY
          </span> <br />
          LEADS.
        </h1>

        {/* 3. Supporting Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.9vw, 1.3rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            lineHeight: 'var(--lh-relaxed)',
            marginBottom: 'var(--space-2xl)',
            fontWeight: '300',
            animation: 'hero-slide-up 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          Discover extraordinary places, understand the world around you, and let intelligence shape the journey.
        </p>

        {/* 4. Action Buttons */}
        <div
          className="hero-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            animation: 'hero-slide-up 1.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
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
        {/* Ambient Video Pause / Play Toggle */}
        <button
          onClick={toggleVideoPlayback}
          className="btn-icon"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(13, 15, 19, 0.75)',
            border: '1px solid var(--border)'
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
            color: 'var(--text-secondary)',
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
              border: '1px solid rgba(255, 255, 255, 0.25)',
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
                backgroundColor: 'var(--gold)',
                borderRadius: '1px',
                boxShadow: '0 0 6px var(--gold)',
                animation: 'scroll-wheel 1.8s infinite'
              }}
            />
          </div>
        </button>

        <div style={{ width: '40px' }} />
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
