/* ==============================================================================
   KALAIURA — BUILD YOUR JOURNEY (TRIP PLANNER CTA)
   High-impact architectural invitation to synthesize bespoke day-by-day itineraries
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export function BuildJourneyCTA() {
  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      <div
        className="prompt-card-hover animate-parallax-fade-up"
        data-home-reveal
        style={{
          backgroundColor: 'var(--surface-elevated)',
          border: '1px solid rgba(224, 162, 77, 0.3)',
          borderRadius: '20px',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) var(--space-2xl)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.3fr) minmax(280px, 1fr)',
          gap: 'var(--space-2xl)',
          alignItems: 'center'
        }}
      >
        {/* Soft Radial Gold Background Highlight */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(224, 162, 77, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(30px)'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow">Trip Architecture</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: '400',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-md)'
            }}
          >
            Build Your <span className="animate-gradient-shift">Bespoke Voyage</span>
          </h2>

          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--lh-relaxed)',
              marginBottom: 'var(--space-xl)',
              maxWidth: '540px'
            }}
          >
            Leave behind disorganized travel spreadsheets. Select your dates, pace, and themes. KALAIURA generates a chronologically structured, day-by-day expedition architecture ready to save or export.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link to="/planner" className="btn btn-primary btn-lg">
              <Icon name="calendar" size={16} />
              <span>Launch Trip Planner</span>
            </Link>
            <Link to="/destinations" className="btn btn-secondary btn-lg">
              <span>Explore All Destinations</span>
            </Link>
          </div>
        </div>

        {/* Feature Visual Pills Showcase */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)'
          }}
        >
          {[
            { title: 'Diurnal Solar Tracking', desc: 'Arrive at monuments during soft golden hour illumination.' },
            { title: 'Verified Transit Geometry', desc: 'Realistic drive & toy train durations between hill stations.' },
            { title: 'Curated Cultural Pacing', desc: 'Balancing active exploration with unhurried tea terrace solitude.' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(8, 9, 12, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: 'var(--space-md) var(--space-lg)'
              }}
            >
              <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '2px' }}>
                {item.title}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
