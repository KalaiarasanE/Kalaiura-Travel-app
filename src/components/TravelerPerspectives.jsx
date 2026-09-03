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
      <div className="section-header centered" data-home-reveal>
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
            data-home-reveal
            data-home-reveal-delay={idx + 1}
            style={{
              padding: 'var(--space-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              animationDelay: `${idx * 0.12}s`
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--gold)',
                  marginBottom: 'var(--space-lg)'
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="sparkles" size={14} />
                ))}
              </div>

              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  lineHeight: 'var(--lh-relaxed)',
                  color: 'var(--text-primary)',
                  fontWeight: '300',
                  fontStyle: 'italic',
                  margin: '0 0 var(--space-xl) 0'
                }}
              >
                “{ref.quote}”
              </blockquote>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {ref.author}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  {ref.role}
                </div>
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  backgroundColor: 'rgba(224, 162, 77, 0.08)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(224, 162, 77, 0.2)'
                }}
              >
                {ref.location}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
