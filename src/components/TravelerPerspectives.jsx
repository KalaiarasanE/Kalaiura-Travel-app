/* ==============================================================================
   AERORA — TRAVELER PERSPECTIVES (EDITORIAL REFLECTIONS)
   Luxury testimonials and cultural memoirs from expeditions across the globe
   ============================================================================== */

import React from 'react';
import { Icon } from './Icons';

export function TravelerPerspectives() {
  const reflections = [
    {
      author: 'Evelyn St. Claire',
      role: 'Architectural Historian',
      location: 'Kyoto, Japan',
      quote: 'KALAIURA’s dawn timing recommendation for Fushimi Inari Taisha allowed me to experience the vermilion torii tunnels in complete solitude as rain brushed the cedar needles.',
      destinationId: 'kyoto'
    },
    {
      author: 'Marcus Vance',
      role: 'Documentary Cinematographer',
      location: 'Reykjavik, Iceland',
      quote: 'The real-time atmospheric telemetry accurately flagged an aurora window above Thingvellir. The difference between guessing and intelligent travel was night and day.',
      destinationId: 'reykjavik'
    },
    {
      author: 'Sophia Al-Mansoor',
      role: 'Cultural Essayist',
      location: 'Santorini, Greece',
      quote: 'Instead of the congested sunset terraces of Oia, the guide pointed me to Skaros Rock at twilight. It was the most transcendent Aegean vantage I have ever seen.',
      destinationId: 'santorini'
    }
  ];

  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="section-header centered">
        <span className="eyebrow">Dispatches & Memoirs</span>
        <h2 className="section-title">
          Traveler <span className="animate-gradient-shift">Perspectives</span>
        </h2>
        <p className="section-subtitle">
          Reflections from authors, photographers, and architects who navigate the earth with intentional stillness.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-xl)'
        }}
      >
        {reflections.map((ref, idx) => (
          <article
            key={idx}
            className="prompt-card-hover animate-parallax-fade-up"
            style={{
              padding: 'var(--space-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              animationDelay: `${idx * 0.15}s`,
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Quote Mark Icon */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  lineHeight: '0.8',
                  color: 'rgba(224, 162, 77, 0.25)',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                “
              </div>

              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: '300',
                  lineHeight: '1.5',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-xl)'
                }}
              >
                {ref.quote}
              </blockquote>
            </div>

            {/* Author Metadata */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'var(--space-md)',
                borderTop: '1px solid var(--border)'
              }}
            >
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {ref.author}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {ref.role}
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--gold)',
                  letterSpacing: '0.05em'
                }}
              >
                <Icon name="map-pin" size={12} />
                <span>{ref.location}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
