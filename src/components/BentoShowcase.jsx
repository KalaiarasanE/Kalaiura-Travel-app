/* ==============================================================================
   AERORA — BENTO INTELLIGENCE SHOWCASE
   Multi-column intelligence matrix inspired by reference design language
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export function BentoShowcase() {
  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      {/* Section Header */}
      <div className="section-header centered" data-home-reveal>
        <span className="eyebrow">Intelligence Architecture</span>
        <h2 className="section-title">
          Engineered for the <span className="animate-gradient-shift">Curious Mind</span>
        </h2>
        <p className="section-subtitle">
          Merging classical travel journalism with algorithmic rigor. Four pillars that transform how you experience the world.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--space-lg)'
        }}
      >
        {/* Card 1: Live Climate Telemetry (Span 7) */}
        <div
          className="bento-card prompt-card-hover animate-parallax-fade-up"
          data-home-reveal
          data-home-reveal-delay="1"
          style={{
            gridColumn: 'span 7',
            padding: 'var(--space-2xl)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle gold radial background glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(224, 162, 77, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            className="bento-icon-badge"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'rgba(224, 162, 77, 0.1)',
              border: '1px solid rgba(224, 162, 77, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold)',
              marginBottom: 'var(--space-lg)'
            }}
          >
            <Icon name="sun" size={20} />
          </div>

          <span className="eyebrow" style={{ marginBottom: '4px' }}>
            Telemetry Sensor Feeds
          </span>

          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: '400',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-sm)'
            }}
          >
            Real-Time Climate Precision
          </h3>

          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--lh-relaxed)',
              marginBottom: 'var(--space-xl)',
              maxWidth: '520px'
            }}
          >
            Direct telemetry integration tracks diurnal temperature swings, solar angles, morning mist, and seasonal crowd densities so you arrive at the golden hour.
          </p>

          {/* Micro Telemetry Widget Mock */}
          <div
            style={{
              backgroundColor: 'rgba(8, 9, 12, 0.65)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xs)',
              padding: 'var(--space-md) var(--space-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-md)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Active Station
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--text-primary)' }}>
                Kyoto Higashiyama Sensor 04
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Atmosphere</span>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: '500' }}>18°C · Gentle Mist</div>
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Humidity</span>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)', fontWeight: '500' }}>62%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Neural Travel Guide (Span 5) */}
        <div
          className="bento-card prompt-card-hover animate-parallax-fade-up"
          data-home-reveal
          data-home-reveal-delay="2"
          style={{
            gridColumn: 'span 5',
            padding: 'var(--space-2xl)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div
              className="bento-icon-badge"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(224, 162, 77, 0.1)',
                border: '1px solid rgba(224, 162, 77, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                marginBottom: 'var(--space-lg)'
              }}
            >
              <Icon name="sparkles" size={20} />
            </div>

            <span className="eyebrow" style={{ marginBottom: '4px' }}>
              Generative Intelligence
            </span>

            <h3
              style={{
                fontSize: '1.75rem',
                fontWeight: '400',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-sm)'
              }}
            >
              KALAIURA Guide
            </h3>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--lh-relaxed)'
              }}
            >
              Ask the place anything. Our cultural concierge reveals sacred etiquette, quiet sanctuaries, and off-map culinary rituals with poetic clarity.
            </p>
          </div>

          <Link
            to="/guide"
            className="btn btn-secondary btn-sm"
            style={{ alignSelf: 'flex-start', marginTop: 'var(--space-xl)' }}
          >
            <span>Consult Guide</span>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>

        {/* Card 3: Cartographic Routing (Span 5) */}
        <div
          className="bento-card prompt-card-hover animate-parallax-fade-up"
          data-home-reveal
          data-home-reveal-delay="3"
          style={{
            gridColumn: 'span 5',
            padding: 'var(--space-2xl)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            className="bento-icon-badge"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'rgba(224, 162, 77, 0.1)',
              border: '1px solid rgba(224, 162, 77, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold)',
              marginBottom: 'var(--space-lg)'
            }}
          >
            <Icon name="compass" size={20} />
          </div>

          <span className="eyebrow" style={{ marginBottom: '4px' }}>
            Expedition Geometry
          </span>

          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: '400',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-sm)'
            }}
          >
            Cartographic Waypoints
          </h3>

          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--lh-relaxed)'
            }}
          >
            Traverse interconnected arcs from the Deccan Plateau to Alpine ridgelines with verified altitudes, flight transit times, and waypoint coordinates.
          </p>
        </div>

        {/* Card 4: Curated Perspective Memoirs (Span 7) */}
        <div
          className="bento-card prompt-card-hover animate-parallax-fade-up"
          data-home-reveal
          data-home-reveal-delay="4"
          style={{
            gridColumn: 'span 7',
            padding: 'var(--space-2xl)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div
              className="bento-icon-badge"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(224, 162, 77, 0.1)',
                border: '1px solid rgba(224, 162, 77, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                marginBottom: 'var(--space-lg)'
              }}
            >
              <Icon name="calendar" size={20} />
            </div>

            <span className="eyebrow" style={{ marginBottom: '4px' }}>
              Bespoke Timelines
            </span>

            <h3
              style={{
                fontSize: '1.75rem',
                fontWeight: '400',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-sm)'
              }}
            >
              Day-by-Day Voyage Architecture
            </h3>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--lh-relaxed)',
                maxWidth: '560px'
              }}
            >
              Never an unformatted block of chatbot text. Structured, chronologically timestamped travel plans with duration estimates, milestones, and instant export.
            </p>
          </div>

          <Link
            to="/planner"
            className="btn btn-primary btn-sm"
            style={{ alignSelf: 'flex-start', marginTop: 'var(--space-xl)' }}
          >
            <span>Launch Trip Planner</span>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
