/* ==============================================================================
   KALAIURA — FINAL CALL TO ACTION
   "WHERE WILL YOUR CURIOSITY TAKE YOU NEXT?"
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export function FinalCTA() {
  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      <div
        className="prompt-card-hover animate-parallax-fade-up"
        data-home-reveal
        style={{
          backgroundColor: 'var(--surface-elevated)',
          border: '1px solid rgba(224, 162, 77, 0.35)',
          borderRadius: '24px',
          padding: 'clamp(3.5rem, 7vw, 6rem) var(--space-2xl)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.9)'
        }}
      >
        {/* Soft Gold Radial Illumination Core */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '720px',
            height: '480px',
            background: 'radial-gradient(ellipse at center, rgba(224, 162, 77, 0.22) 0%, rgba(224, 162, 77, 0.05) 50%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(35px)'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            The Infinite Subcontinent
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              fontWeight: '300',
              lineHeight: '1.05',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-md)'
            }}
          >
            Where will your curiosity <br />
            <span className="animate-gradient-shift" style={{ fontStyle: 'italic' }}>
              take you next?
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0 auto var(--space-2xl)',
              lineHeight: 'var(--lh-relaxed)',
              fontWeight: '300'
            }}
          >
            Step beyond transactional travel checklists. Discover emerald backwaters, trans-Himalayan silence, and living royal architecture tailored by intelligent journey planning.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-md)',
              flexWrap: 'wrap'
            }}
          >
            <Link to="/destinations" className="btn btn-primary btn-lg" style={{ minWidth: '220px' }}>
              <span>Explore All Destinations</span>
              <Icon name="arrow-right" size={16} />
            </Link>

            <Link to="/planner" className="btn btn-secondary btn-lg" style={{ minWidth: '220px' }}>
              <span>Plan an Itinerary</span>
              <Icon name="sparkles" size={15} style={{ color: 'var(--gold)' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
