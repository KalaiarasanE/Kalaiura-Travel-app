/* ==============================================================================
   AERORA — EDITORIAL CTA BANNER
   High-impact pre-footer invitation with radial gold ambient lighting
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export function EditorialCTA() {
  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      <div
        style={{
          backgroundColor: 'var(--surface-elevated)',
          border: '1px solid rgba(224, 162, 77, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: 'clamp(3rem, 6vw, 5.5rem) var(--space-2xl)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-elevated)'
        }}
      >
        {/* Soft Gold Radial Illumination */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '650px',
            height: '450px',
            background: 'radial-gradient(ellipse at center, rgba(224, 162, 77, 0.18) 0%, rgba(224, 162, 77, 0.04) 50%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(30px)'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            The Infinite Horizon
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: '300',
              lineHeight: '1.05',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-md)'
            }}
          >
            The world waits <br />
            <span className="animate-gradient-shift" style={{ fontStyle: 'italic' }}>
              beyond the map.
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              margin: '0 auto var(--space-2xl)',
              lineHeight: 'var(--lh-relaxed)',
              fontWeight: '300'
            }}
          >
            Leave behind transactional travel checklists. Immerse yourself in living history, elemental silence, and intelligent journey planning.
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
            <Link to="/destinations" className="btn btn-primary btn-lg" style={{ minWidth: '200px' }}>
              <span>Start Exploring</span>
              <Icon name="arrow-right" size={16} />
            </Link>

            <Link to="/planner" className="btn btn-secondary btn-lg" style={{ minWidth: '200px' }}>
              <span>Plan a Journey</span>
              <Icon name="sparkles" size={15} style={{ color: 'var(--gold)' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
